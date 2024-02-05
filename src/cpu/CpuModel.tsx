import { AffineMat2d } from "../utils/AffineMat2d";
import { BoundingBox3d, Vec3 } from "../utils/vector";
import { ICompDef } from "./comps/CompBuilder";
import { CompLibrary } from "./library/CompLibrary";
import { ICompPortConfig } from "./comps/CompPort";
import { CodeSuiteManager } from "./library/CodeSuiteManager";
import { ISharedContext } from "./library/SharedContext";
import { SchematicLibrary } from "./library/SchematicLibrary";

/* All components & schematics and each version of them is represented by a separate ILibraryItem.

Schematics are usually the top-level entities that users build with, with a set of wires & components.
Schematics can also be used within other schematics by also having an associated component (in the same
ILibraryItem). In that case, there are components within the schematic which map onto the ports of the
component. That way, schematics can be nested arbitrarily.

Components within a given schematic reference library-items from our library via a string id. There is
a global namespace of ids, where each maps to our ILibraryItem. In some cases, to allow for id-renaming,
an ILibraryItem can have multiple ids. On write, all schematics are updated to use the primary id.
*/

export interface ILibraryItem {
    id: string;
    altIds?: string[];

    name: string;
    notes?: string;
    compDef?: ICompDef<any>;
    schematic?: ISchematic;
}

export interface IExeRunArgs {
    halt: boolean;
}

export interface IExeSystem {
    comps: IExeComp[];
    nets: IExeNet[];
    executionBlocks: IExeBlock[];
    executionSteps: IExeStep[];
    latchSteps: IExeStep[]; // latches are done just prior to the next round of execution steps (it's useful to pause prior to latching)
    lookup: IExeSystemLookup;
    runArgs: IExeRunArgs;
    compLibrary: CompLibrary;
}

/* map full ids (e.g. "compA|innerCompB") to indexes into IExeSystem.comps & IExeSystem.nets */
export interface IExeSystemLookup {
    compIdToIdx: Map<string, number>;
    wireIdToNetIdx: Map<string, number>;
}

export interface IExeBlock {
    enabled: boolean;

    resolvedInitial: number[];
    decrBlockTargets: IDecrBlockTarget[];

    executionSteps: IExeStep[];

    executed: boolean;
    resolvedRemaining: number[];
    // include latchSteps here??
}

export interface IDecrBlockTarget {
    blockIdx: number;
    counterIdx: number;
}

export interface IExeStep {
    compIdx: number; // -1 for nets
    phaseIdx: number; // -1 for nets

    netIdx: number; // -1 for comps
}

export interface IExeComp<T = any> {
    idx: number;
    comp: IComp; // a (maybe) rendered component
    ports: IExePort[];
    data: T;
    phases: IExePhase<T>[];
    subSystem?: IExeSystem;
    compFullId: string;
}

export interface IExePhase<T = any> {
    exeBlockIdx: number;
    readPortIdxs: number[]; // index into IExeComp.ports[i] (the comp phase will read from these ports)
    writePortIdxs: number[]; // index into IExeComp.ports[i] (the comp phase will write to these ports)
    requiresOnePortIdxs: number[] | null; // index into IExeComp.ports[i] (at least one of these ports must be resolved)
    func: (comp: IExeComp<T>, args: IExeRunArgs) => void;
    isLatch: boolean;

    portsHaveDecrBlockTargets: boolean;
}

export interface IExePort {
    portIdx: number; // into IExeComp.ports[i]
    netIdx: number;
    width: number;
    type: PortType;
    ioEnabled: boolean; // for tristate (true otherwise). For inputs, false means the input is ignored (e.g. an inactive mux input). The latter is useful for rendering
    ioDir: IoDir; // for rendering. Only needed to be set when is a bidirectional port
    dataUsed: boolean; // for rendering, and involves back-propagation (but typically follows ioEnabled)
    value: number;
    hasFloatingValue: boolean;
    floating: boolean; // no value has been set on a tristate wire. can either be a circuit error, or allow ports to later write a value to the net
    resolved: boolean;
    nestedPort?: IExePortRef; // for back-prop

    // as this port is resolved (via the comp), we'll decrement the remaining count on the block at index waitingCounterId. When they all hit zero, we can execute the block
    waitingBlockIdx: number;
    waitingCounterIdx: number;
}

export enum IoDir {
    None, // check flag in PortDir
    In,
    Out,
}

export interface IExeNet {
    exeBlockIdx: number;
    idx: number;
    wire: IWireGraph; // a (maybe) rendered wire

    /** The full wire id including a nested path.
     *
     * The IExeNet.wire ref above may be shared among a number of IExeNet's (such as a duplicated
     * component), but the wireFullId is unique across IExeNet's. */
    wireFullId: string;

    /** Ports that write to the net ("src" is from the net's PoV).
     *
     * Should only have multiple srcs if:
     *   - it's a tristate net, and
     *   - all the inputs are tristate (& only 1 may be enabled at runtime). */
    srcs: IExePortRef[];

    /** Ports that read from the net ("dest" is from the net's PoV).
     *
     * There can be many dests in the common case.
     *
     * For tristate nets, a dest can also be a src (for InOutTri ports).
    */
    dests: IExePortRef[];

    tristate: boolean;
    width: number;
    type: PortType;
    value: number;
    enabledCount: number;
}

// in our execution data model, we use indexes rather than ids for perf (?)
export interface IExePortRef {
    comp: IComp;
    portIdx: number;
    exeComp: IExeComp
    exePort: IExePort;
    valid: boolean;
    nestedPort: boolean;
}

// We're adding a new level of state, which tracks all editors (tabs), and they each have their own state (mostly).
// Keep some global state like the comp library here.
export interface IProgramState {
    compLibrary: CompLibrary;
    schematicLibrary: SchematicLibrary;

    activeEditorIdx: number;
    editors: IEditorState[];
}

export interface IEditorState {
    mtx: AffineMat2d;
    targetScale?: number;
    scaleModelPt?: Vec3;

    snapshot: IEditSnapshot;
    snapshotTemp: IEditSnapshot | null;

    undoStack: IEditSnapshot[];
    redoStack: IEditSnapshot[];

    desiredSchematicId: string | null;
    activeSchematicId: string | null;

    sharedContext: ISharedContext;
    compLibrary: CompLibrary;
    schematicLibrary: SchematicLibrary;
    codeLibrary: CodeSuiteManager;
    wireRenderCache: IWireRenderCache;

    exeModel: IExeSystem | null;
    exeModelUpdateCntr: number;

    selectRegion: ISelectRegion | null;
    hovered: IHitTest | null;
    maskHover: string | null;
    addLine: boolean
    showExeOrder: boolean;
    transparentComps: boolean;
    compLibraryVisible: boolean;
    needsZoomExtent: boolean;

    dragCreateComp?: IDragCreateComp;

    stepSpeed?: number;
}

export interface ISelectRegion {
    idPrefix: string;
    bbox: BoundingBox3d;
}

export interface IDragCreateComp {
    compOrig?: IComp;
    wireLabel?: IWireLabel;

    applyFunc?: (a : IEditSnapshot) => IEditSnapshot;
}

export interface IHitTest {
    ref: IElRef;
    distPx: number;
    modelPt: Vec3;
}

export interface ICanvasState {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    region: BoundingBox3d;
    size: Vec3; // derived
    scale: number; // derived
    mtx: AffineMat2d; // derived
    // mtxLocal: AffineMat2d; // derived
    tileCanvases: Map<string, HTMLCanvasElement>;

    t: number;
    rafHandle: number;
}

export interface IWireRenderCache {
    lookupWire(editorState: IEditorState, idPrefix: string, wire: IWireGraph): IWireRenderInfo;
    lookupCompPort(editorState: IEditorState, idPrefix: string, comp: IComp, portId: number): [wire: IWireRenderInfo, nodeId: number] | null;
}

// Things that are calculated by traversing the graph, based on the exeModel
// this is used in multiple places besides just rendering the wires themselves (requiring caching)
// e.g. drawing extra wire segments at the comp-ports that match the style, or manually drawing wires
// within other components, like a mux or wire expander (that aren't sub-schematics).
export interface IWireRenderInfo {
    isCtrl: boolean;
    isData: boolean;
    isAddr: boolean;

    exeNet: IExeNet | null;

    isNonZero: boolean;
    portBindings: Map<string, IWirePortBinding>; // key is the "compId:portId", matching the ref id on the node (ids local to the schematic)
    flowSegs: Set<string>; // the direction of flow is given by id0 -> id1 in "id0:id1"
    flowNodes: Set<number>; // nodes that are part of the flow (key is node index)

    width: number;

    bitWidth: number;
    wireValue: number;

    isHover: boolean;
    isSelected: boolean;
    selectedNodes: Set<number>; // key is node index
    selectedSegs: Set<string>; // key is seg key ("id0:id1")

    activeDestNodeCount: number;
    activeSrcNodeCount: number;

    destNodeCount: number;
    srcNodeCount: number;

    enabledCount: number;
}

export interface IWirePortBinding {
    comp: IComp;
    port: ICompPort;
    exePort: IExePort;
    nodeId: number;
}

export enum ToolbarTypes {
    PlayPause = "PlayPause",
    Viewport = "Viewport",
}

export interface IElRef {
    type: RefType;
    id: string;
    compNodeId?: string;
    wireNode0Id?: number;
    wireNode1Id?: number;
}


export enum RefType {
    Comp,
    WireSeg,
    WireNode,
    CompNode,
    WireLabelAnchor
}

export type IElement = IComp | ICompPort;

export interface IWireGraph {
    id: string;
    nodes: IWireGraphNode[];
}

export interface IWireGraphNode {
    id: number;
    pos: Vec3;
    edges: number[]; // index into IWireGraph.nodes; bi-directional edges
    ref?: IElRef;
}

export enum NumberRenderFlags {
    None = 0,
    Dec = 1 << 0,
    Hex = 1 << 1,
    Bin = 1 << 2,

    Signed = 1 << 3,
    Pad = 1 << 4, // pad with zeros, based on the wire bit-width
}

export interface IWireLabel {
    id: string;
    wireId: string;
    anchorPos: Vec3;
    rectRelPos: Vec3;
    rectSize: Vec3;

    text: string;
    numRenderFlags: NumberRenderFlags;
}

export interface ICompRenderArgs<T, A = any> {
    cvs: ICanvasState;
    ctx: CanvasRenderingContext2D;
    editCtx: IEditContext;
    comp: IComp<A>;
    exeComp: IExeComp<T>;
    styles: IRenderStyles;
    isActive: boolean;
    portBindingLookup: Map<string, IWirePortInfo>;
    bb: BoundingBox3d;
}

export interface IWirePortInfo {
    wireInfo: IWireRenderInfo;
    portInfo: IWirePortBinding;
}

export interface ICompOptsRenderArgs<T, A = any> {
    editCtx: IEditContext;
    comp: IComp<A>;
    exeComp: IExeComp<T> | null;
}

export interface IEditContext {
    idPrefix: string;
}

export interface IRenderStyles {
    lineHeight: number;
    fontSize: number;
    lineWidth: number;
    strokeColor: string;
    fillColor: string;
}


export enum CompDefFlags {
    None = 0,

    // Actually all components must rotate now!
    CanRotate = 1 << 0,

    // Has a well-defined bit-width, along with the bitWidth field in args
    HasBitWidth = 1 << 1,

    // Can't be broken down further into sub-components
    IsAtomic = 1 << 2,

    // doesn't contain any gates
    WiresOnly = 1 << 3,
}

export interface IComp<A = any> {
    id: string;
    defId: string;
    name: string;
    extId?: string; // an id that can be referenced "externally"
    subSchematicId?: string;
    pos: Vec3;
    size: Vec3;
    rotation: number; // 0 = right, 1 = down, 2 = left, 3 = up
    ports: ICompPort[];
    args: A;
    flags: CompDefFlags;
    resolved: boolean;
    hasSubSchematic: boolean;
    bb: BoundingBox3d;
}

export interface ICompPort {
    id: string;
    pos: Vec3; // relative to comp
    name: string;
    type: PortType;
    width?: number;
}

export enum RectSide {
    Right = 0,
    Bottom = 1,
    Left = 2,
    Top = 3,
}

export enum PortType {
    None = 0,
    In = 1 << 0,
    Out = 1 << 1,
    Tristate = 1 << 2,

    // these ones propagate onto the wire/net for display
    Data = 1 << 3,
    Addr = 1 << 4,
    Ctrl = 1 << 5,

    Hidden = 1 << 6,

    OutTri = Out | Tristate,
    InOutTri = In | Out | Tristate,
}

export interface ISchematic {
    comps: IComp[];
    wires: IWireGraph[];
    wireLabels: IWireLabel[];
    compBbox: BoundingBox3d;
    parentCompDefId?: string;
    parentComp?: IComp;
}

export interface IEditSnapshot {
    focusedIdPrefix: string | null; // where pastes will go, etc, and should point to a subSchematic. null means the top-level, mainSchematic
    selected: IElRef[];
    selectionRotateCenter: Vec3 | null; // when rotating comps, we want the pivot point to be stable (it also has to be at integer coords), so we store it here
    mainSchematic: IEditSchematic;
    subSchematics: Record<string, IEditSchematic>;
}

/**
 * OK, how do we manage our components that are builtin, but we want to add schematics for?
 * We want the multiple schematics to map to a builtin comp, and select the given schematic
 * for a given comp. Mostly we want to edit the schematic from within a parent schematic, and then
 * save it, ideally to that parent schematic (unless we want it to live on its own).
 *
 * Probably start with it living on its own. (since we can't save to the parent schematic yet)
 * We'll have a field on the realized comp which says which schematic we're using underneath.
 *
 * So we click on a comp, and UI shows up to a) select from some pre-existing schematics, or b) create a new one.
 * This will be on the RHS, and also have things like the extId of the component & other details.
 *
 * The schematic is tied to a particular comp, but sort of weakly, and it's clear that the comp ports
 * are the source-of-truth. Probably have ability to disable/hide/ignore not-connected ports, which is defined by the
 * presence of the port in the schematic.
*/

export interface IEditSchematic {
    id: string;
    name: string;
    comps: IComp[];
    wires: IWireGraph[];
    wireLabels: IWireLabel[];

    nextCompId: number;
    nextWireId: number;
    nextWireLabelId: number;

    // this schematic uses a component from the compLibrary as its parent component
    parentCompDefId?: string;
    parentComp?: IComp; // with some args

    compBbox: BoundingBox3d;
    innerDisplayBbox?: BoundingBox3d;

    // -- or --

    // this schematic has component definitions supplied explicitly
    compSize: Vec3;
    compPorts: ICompPort[];
}



export interface ISchematicDef {
    id: string;
    name: string;
    snapshot: IEditSnapshot;
    compArgs?: ISchematicCompArgs; // a schematic may get wrapped into a component

    hasEdits: boolean;
    // when we switch between models, want to keep as much state around as possible
    undoStack?: IEditSnapshot[];
    redoStack?: IEditSnapshot[];
    mtx?: AffineMat2d;
    schematicStr?: string; // for LS update detection
}

export interface ISchematicCompArgs {
    size: Vec3;
    ports: ISubLayoutPort[];
}

export interface ISubLayoutPort {
    id: string;
    name: string
    type: PortType;
    pos: Vec3;
    width?: number;
}

export interface IParentCompInfo {
    parentToInnerMtx: AffineMat2d;
    comp: IComp;
    linkedCompPorts: Map<string, { compPort: IComp<ICompPortConfig>, port: ICompPort, innerPos: Vec3 }>;
}
