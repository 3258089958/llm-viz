import React, { SetStateAction } from "react";
import { Vec3 } from "@/src/utils/vector";
import { IComp, IEditContext, IExePort, PortType } from "../CpuModel";
import { CompDefFlags, IBaseCompConfig, ICompBuilderArgs, ICompDef } from "./CompBuilder";
import { createBitWidthMask } from "./CompHelpers";
import { FontType, makeCanvasFont } from "../CanvasRenderHelpers";
import { editCompConfig, useEditorContext } from "../Editor";
import { applySetter, assignImm, isNil, makeArrayRange } from "@/src/utils/data";
import { HexValueEditor, HexValueInputType } from "../displayTools/HexValueEditor";
import { CheckboxMenuTitle } from "./RenderHelpers";
import { ButtonStandard } from "../EditorControls";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { palleteColors } from "../palette";
import clsx from "clsx";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

interface IBitExpanderMultiConfig extends IBaseCompConfig {
    // rotate: number; // 0, 1, 2, 3
    bitWidth: number; // input bit width
    bitRange: IBitRange[];
}

interface IBitRange {
    id: number; // stable
    start: number;
    end: number; // inclusive numbers
    showBits: boolean; // render bits in this range
    individual: boolean; // if true, each bit in this range is a separate output
}

interface IBitExpanderMultiData {
    inPort: IExePort;
    outPorts: IExePort[];
}

export function createBitExpanderComps(_args: ICompBuilderArgs): ICompDef<any>[] {
    let initialW = 4;
    let initialH = 2;

    function computeWidth(args: IBitExpanderMultiConfig) {
        let width = 1;
        for (let range of args.bitRange) {
            width += rangeWidth(range);
        }

        return Math.max(2, width);
    }

    function rangeWidth(range: IBitRange) {
        let nBits = range.end - range.start + 1;

        if (range.individual || range.showBits) {
            return nBits;
        }

        let nBitsRendered = Math.ceil(nBits / 4);
        return Math.min(Math.ceil(2 + (nBitsRendered / 2)), nBits);
    }

    let bitExpanderMulti: ICompDef<IBitExpanderMultiData, IBitExpanderMultiConfig> = {
        defId: 'bits/expand-multi',
        name: "Bit Expand Multi",
        size: new Vec3(initialW, initialH),
        flags: CompDefFlags.HasBitWidth,
        ports: (args) => {
            let width = computeWidth(args);

            let ports = [
                { id: 'a', name: '', pos: new Vec3(width / 2, 0).round(), type: PortType.In, width: args.bitWidth },
            ];

            let offset = 1;
            let outId = 0;
            for (let range of args.bitRange) {
                let nBits = range.end - range.start + 1;
                let width = rangeWidth(range);
                let center = offset + width / 2 - 1.0;

                if (range.individual) {
                    let j = 0;
                    for (let i = range.start; i <= range.end; i++) {
                        let xPos = offset + i - range.start;
                        ports.push({ id: `o_${range.id}_${j++}`, name: '', pos: new Vec3(xPos, 2), type: PortType.Out, width: 1 });
                    }
                } else {
                    ports.push({ id: `o_${range.id}_0`, name: '', pos: new Vec3(center, 2).round(), type: PortType.Out, width: nBits });
                }

                offset += width;
            }

            return ports;
        },
        initConfig: () => ({ bitWidth: 32, bitRange: [{ start: 0, end: 31, individual: false, showBits: true, id: 0 }] }),
        applyConfig(comp, args) {
            let maxId = Math.max(...args.bitRange.map(r => r.id ?? 0), 0) + 1;
            for (let range of args.bitRange) {
                if (isNil(range.id)) {
                    range.id = maxId++;
                }
            }
            let width = computeWidth(args);
            comp.size = new Vec3(width, initialH);
        },
        build: (builder) => {

            let data = builder.addData({
                inPort: builder.getPort('a'),
                outPorts: builder.ports.filter(p => p.type === PortType.Out),
            });

            let ports = builder.comp.args.bitRange.map(r => {
                return {
                    start: r.start,
                    end: r.end,
                    individual: r.individual,
                    mask: createBitWidthMask(r.end - r.start + 1),
                };
            });

            builder.addPhase(({ data: { inPort, outPorts } }) => {
                let inPortVal = inPort.value;
                let outPortIdx = 0;
                for (let port of ports) {
                    if (port.individual) {
                        for (let i = port.end; i >= port.start; i--) {
                            outPorts[outPortIdx++].value = (inPortVal >> i) & 1;
                        }
                    } else {
                        outPorts[outPortIdx++].value = (inPortVal >> port.start) & port.mask;
                    }
                }
                // outPort.value = inPort.value ? mask : 0;
            }, [data.inPort], data.outPorts);

            return builder.build();
        },
        renderCanvasPath({ comp, ctx }) {
            ctx.save();

            // basic structure is a trapezoid, narrower on the right
            // slope passes through (1, 1) i.e. the select button, but doesn't need to be 45deg
            let slope = 0.7;
            let x = comp.pos.x;
            let y = comp.pos.y;
            let w = comp.size.x;
            let h = comp.size.y;
            let midX = x + w / 2;

            ctx.moveTo(x, y + slope);
            ctx.lineTo(x + 1, y);
            ctx.lineTo(x + w - 1, y);
            ctx.lineTo(x + w, y + slope);
            ctx.lineTo(x + w, y + h);
            ctx.lineTo(x, y + h);
            ctx.closePath();

            ctx.restore();
        },
        renderOptions({ editCtx, comp }) {
            return <BitExpandMultiOptions editCtx={editCtx} comp={comp} />;
        },
        render({ ctx, comp, exeComp, cvs, styles }) {

            ctx.font = makeCanvasFont(1, FontType.Mono);
            let singleW = ctx.measureText('0 ').width;
            let numCanvasFont = makeCanvasFont(1 / singleW, FontType.Mono);

            let inValue = exeComp?.data.inPort.value ?? 0x00;
            let allBits = [...inValue.toString(2).padStart(comp.args.bitWidth, '0')];

            let rangeDrawOffset = 0;
            let rangeId = 0;
            let prevEnd = 0;

            for (let range of comp.args.bitRange) {

                let rangeStart = 32 - range.end - 1;
                let rangeEnd = 32 - range.start - 1;

                let nBits = rangeEnd - rangeStart + 1;
                let rangeW = rangeWidth(range);

                ctx.font = numCanvasFont;
                ctx.fillStyle = rangeColors[rangeId % 4];
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';

                if (rangeW === nBits) {

                    let nGroups = Math.ceil(rangeW / 4);
                    for (let groupIdx = 0; groupIdx < nGroups; groupIdx++) {
                        let startIdx = rangeStart + groupIdx * 4;
                        let endIdx = Math.min(startIdx + 4, rangeEnd + 1);
                        let textBin = allBits.slice(startIdx, endIdx).join(' ');
                        let centerOffset = groupIdx * 4 + (endIdx - startIdx) / 2 + 0.5;
                        ctx.fillText(textBin, comp.pos.x + rangeDrawOffset + centerOffset, comp.pos.y + comp.size.y - 0.1);
                    }
                } else {
                    let textBin = allBits.slice(rangeStart, rangeEnd + 1).join('');
                    let text = '0x' + parseInt(textBin, 2).toString(16).padStart(Math.ceil(nBits / 4), '0');
                    ctx.fillText(text, comp.pos.x + rangeDrawOffset + rangeW / 2 + 0.5, comp.pos.y + comp.size.y - 0.1);
                }

                let lineXStart = comp.pos.x + rangeDrawOffset + 0.5;

                if (prevEnd > 0) {
                    ctx.strokeStyle = '#777';
                    ctx.lineWidth = styles.lineWidth;
                    ctx.beginPath();
                    ctx.moveTo(lineXStart, comp.pos.y + 0.4);
                    ctx.lineTo(lineXStart, comp.pos.y + comp.size.y - 0.1);
                    ctx.stroke();
                }

                ctx.font = makeCanvasFont(0.6, FontType.Mono);
                ctx.fillStyle = '#777';
                ctx.textAlign = 'center';
                ctx.fillText(range.end.toString(), Math.round(lineXStart + 0.5), comp.pos.y + 1.0);

                // ctx.textAlign = '';
                ctx.fillText(range.start.toString(), Math.round(lineXStart + rangeW - 0.5), comp.pos.y + 1.0);

                rangeId += 1;
                rangeDrawOffset += rangeW;
                prevEnd = rangeEnd;
            }
        },
    };

    return [bitExpanderMulti];
}

function getNextRangeId(ranges: IBitRange[]) {
    let maxId = Math.max(...ranges.map(r => r.id ?? 0), 0) + 1;
    let potentialIds = new Set(makeArrayRange(maxId, 0, maxId - 1));
    ranges.forEach(r => potentialIds.delete(r.id));
    return potentialIds.values().next().value;
}

const BitExpandMultiOptions: React.FC<{
    editCtx: IEditContext;
    comp: IComp<IBitExpanderMultiConfig>;
}> = ({ editCtx, comp }) => {
    let { setEditorState } = useEditorContext();

    let insertBitRange = (index: number, range: IBitRange) => setEditorState(editCompConfig(editCtx, true, comp, a => {
        let bitRange = [...a.bitRange];
        bitRange.splice(index, 0, range);
        return assignImm(a, { bitRange });
    }));

    let removeBitRange = (index: number) => setEditorState(editCompConfig(editCtx, true, comp, a => {
        let bitRange = [...a.bitRange];
        bitRange.splice(index, 1);
        return assignImm(a, { bitRange });
    }));

    let editBitRange = (end: boolean, index: number, range: SetStateAction<IBitRange>) => setEditorState(editCompConfig(editCtx, end, comp, a => {
        let bitRange = [...a.bitRange];
        bitRange[index] = applySetter(range, bitRange[index]);
        return assignImm(a, { bitRange });
    }));

    return <div className="flex flex-col">
        <div className="mb-1">Bit Ranges</div>
        <div className="flelx flex-col items-center">
            {comp.args.bitRange.map((range, i) => {
                return <div key={i} className="flex bg-slate-100 py-2 px-2 items-center flex-auto">
                    <div className={clsx("rounded-full w-2 h-2")} style={{ backgroundColor: rangeColors[i % 4] }} />

                    <HexValueEditor
                        className="w-[2rem] bg-slate-200 mx-2 rounded"
                        inputClassName="text-center active:bg-slate-300"
                        value={range.end}
                        update={(end, v) => editBitRange(end, i, r => assignImm(r, { end: v }))}
                        inputType={HexValueInputType.Dec}
                        hidePrefix
                        fixedInputType
                        minimalBackground
                    />
                    {":"}
                    <HexValueEditor
                        className="w-[2rem] bg-slate-200 mx-2 rounded"
                        inputClassName="text-center active:bg-slate-300"
                        value={range.start}
                        update={(end, v) => editBitRange(end, i, r => assignImm(r, { start: v }))}
                        inputType={HexValueInputType.Dec}
                        hidePrefix
                        fixedInputType
                        minimalBackground
                    />

                    <CheckboxMenuTitle title="Show Bits" className="mx-2 text-base" value={range.showBits} update={(end, v) => editBitRange(end, i, r => assignImm(r, { showBits: v }))} />
                    <CheckboxMenuTitle title="Individual" className="text-base" value={range.individual} update={(end, v) => editBitRange(end, i, r => assignImm(r, { individual: v }))} />

                    <ButtonStandard className="ml-auto" onClick={() => removeBitRange(i)}>
                        <FontAwesomeIcon icon={faTrash} className="text-gray-600" />
                    </ButtonStandard>
                    <ButtonStandard className="ml-2" onClick={() => insertBitRange(i, { start: range.end, end: range.end, individual: false, showBits: true, id: getNextRangeId(comp.args.bitRange) })}>
                        <FontAwesomeIcon icon={faPlus} className="text-gray-600" />
                    </ButtonStandard>

                    {range.id}
                </div>;
            })}
            <div className="flex justify-center">
                <ButtonStandard onClick={() => {
                    let lastRange = comp.args.bitRange[comp.args.bitRange.length - 1];
                    let start = Math.min((lastRange?.end ?? -1) + 1, comp.args.bitWidth - 1);
                    let end = Math.min(start + 3, comp.args.bitWidth - 1);
                    insertBitRange(comp.args.bitRange.length, { start, end, showBits: true, individual: false, id: getNextRangeId(comp.args.bitRange) });
                }}>Add Range</ButtonStandard>
            </div>
        </div>
    </div>;
};

let rangeColors = [
    palleteColors.amber[700],
    palleteColors.green[700],
    palleteColors.blue[700],
    palleteColors.orange[700],
];