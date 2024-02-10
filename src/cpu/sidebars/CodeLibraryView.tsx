import React, { memo, useContext, useEffect, useState } from "react";
import { notifyExeModelUpdated, useEditorContext } from "../Editor";
import { IRomExeData } from "../comps/SimpleMemory";
import { IExeComp } from "../CpuModel";
import { ICompDataRegFile, ICompDataSingleReg } from "../comps/Registers";
import { resetExeModel, stepExecutionCombinatorial } from "../CpuExecution";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImport } from "@fortawesome/free-solid-svg-icons";
import { ICodeEntry } from "../library/CodeSuiteManager";
import { SharedContextContext } from "../library/SharedContext";
import { useSubscriptions } from "../../utils/hooks";
import clsx from "clsx";

export const CodeLibraryView: React.FC = memo(function CompExampleView() {
    let { codeLibrary } = useContext(SharedContextContext)!;
    let [{ exeModel }, setEditorState] = useEditorContext();
    useSubscriptions(codeLibrary.subs);

    useEffect(() => {
        for (let suite of codeLibrary.suites.values()) {
            codeLibrary.getSuite(suite.fileName);
        }
    }, [codeLibrary]);

    function handleEntryClick(example: ICodeEntry) {
        if (exeModel) {
            loadEntryData(example);
            resetExeModel(exeModel, { hardReset: false });
            stepExecutionCombinatorial(exeModel);
            setEditorState(notifyExeModelUpdated);
        }
    }

    function loadEntryData(example: ICodeEntry) {
        let romComp = getRomComp();
        if (romComp) {
            let romArr = romComp.data.rom;
            romArr.set(example.elfSection.arr);
            romArr.fill(0, example.elfSection.arr.length);
            romComp.data.updateCntr += 1;
        }
    }

    /*
    function onRunAllTestsClicked() {
        console.log('Running all tests...');
        let startTime = performance.now();
        let successCount = 0;
        let totalCount = 0;
        let insCount = 0;
        let repeatCount = 0;
        for (; repeatCount < 100 && successCount === totalCount; repeatCount++) {
            for (let test of examples) {
                loadEntryData(test);
                resetExeModel(exeModel, { hardReset: false });
                stepExecutionCombinatorial(exeModel, true);

                totalCount += 1;
                let completed = false;

                for (let i = 0; i < 400; i++) {
                    if (exeModel.runArgs.halt) {
                        let regs = getRegsComp();
                        let resRegValue = regs?.data.file[10] ?? 0;
                        let testNumValue = regs?.data.file[11] ?? 0;

                        if (resRegValue !== 44 && resRegValue !== 911) {
                            console.log(`--- test '${test.name}' halted with unknown result in reg[a0]: ${ensureSigned32Bit(resRegValue)} ---`);
                        } else {
                            let isSuccess = (resRegValue === 44) !== test.expectFail;

                            if (isSuccess) {
                                successCount += 1;
                                // console.log(`--- halted with success ---`);
                            } else {
                                console.log(`--- test '${test.name}' halted with FAILURE (test ${testNumValue}) ---`);
                            }
                        }
                        completed = true;
                        break;
                    }

                    insCount += 1;
                    stepExecutionLatch(exeModel);
                    stepExecutionCombinatorial(exeModel, true);
                }

                if (!completed) {
                    console.log(`--- test '${test.name}' halted after too many instructions ---`);
                }
            }
        }
        let endTime = performance.now();
        let timeMs = endTime - startTime;
        console.log(`All tests done in ${timeMs.toFixed(1)}ms. Success: ${successCount}/${totalCount} (repeats=${repeatCount}). Instructions: ${insCount} (${(insCount / timeMs).toFixed(0)} kHz)`);

        stepExecutionCombinatorial(exeModel);
        setEditorState(a => ({ ...a }));
    }

    async function runTestsQuickly() {
        for (let test of examples) {
            loadEntryData(test);
            resetExeModel(exeModel, { hardReset: false });
            stepExecutionCombinatorial(exeModel);

            let completed = false;

            for (let i = 0; i < 200; i++) {
                await new Promise(resolve => setTimeout(resolve, 10));
                setEditorState(a => ({ ...a }));

                stepExecutionCombinatorial(exeModel);
                if (exeModel.runArgs.halt) {
                    let regs = getRegsComp();
                    let resRegValue = regs?.data.file[10] ?? 0;
                    let testNumValue = regs?.data.file[11] ?? 0;

                    if (resRegValue !== 44 && resRegValue !== 911) {
                        console.log(`--- test '${test.name}' halted with unknown result in reg[a0]: ${ensureSigned32Bit(resRegValue)} ---`);
                    } else {
                        let isSuccess = (resRegValue === 44) !== test.expectFail;

                        if (isSuccess) {
                            // console.log(`--- halted with success ---`);
                        } else {
                            console.log(`--- test '${test.name}' halted with FAILURE (test ${testNumValue}) ---`);
                        }
                    }
                    completed = true;
                    break;
                }

                stepExecutionLatch(exeModel);
            }

            if (!completed) {
                console.log(`--- test '${test.name}' halted after too many instructions ---`);
            }
        }
    }
    */

    function findCompByDefId(defId: string) {
        return exeModel?.comps.find(comp => comp.comp.defId === defId);
    }

    function getPcComp() {
        return findCompByDefId('core/flipflop/reg1') as IExeComp<ICompDataSingleReg> | undefined;
    }
    function getRegsComp() {
        return findCompByDefId('core/riscv/reg32') as IExeComp<ICompDataRegFile> | undefined;
    }
    function getRomComp() {
        return findCompByDefId('core/mem/rom0') as IExeComp<IRomExeData> | undefined;
    }

    // function onResetClicked() {
    //     resetExeModel(exeModel, { hardReset: false });
    //     stepExecutionCombinatorial(exeModel);
    //     setEditorState(a => ({ ...a }));
    // }

    return <div>
        <div className={"overflow-y-auto"}>
            {[...codeLibrary.suites.values()].map((suite, sidx) => {

                let hasEntries = suite.entries.length > 0;
                let firstEntry = suite.entries.length === 1 ? suite.entries[0] : null;

                function playIcon() {
                    return <div className="text-slate-200 group-hover:text-slate-300 ml-auto">
                        <FontAwesomeIcon icon={faFileImport} />
                    </div>;
                }

                return <div key={sidx} className="flex flex-col my-1">
                    <div
                        className={clsx("font-bold px-2", firstEntry && "cursor-pointer hover:bg-blue-300 group flex rounded", !firstEntry && "text-gray-500")}
                        onClick={() => firstEntry && handleEntryClick(firstEntry)}
                    >
                        {suite.title}
                        {firstEntry && playIcon()}
                    </div>
                    <div className="ml-1 flex flex-col">
                        {!firstEntry && suite.entries.map((entry, eidx) => {
                            return <div
                                className="cursor-pointer hover:bg-blue-300 group flex rounded px-2"
                                onClick={() => handleEntryClick(entry)}
                                key={eidx}
                            >
                                {entry.name}
                                {playIcon()}
                            </div>;
                        })}
                    </div>
                </div>;
            })}
        </div>
    </div>;
});