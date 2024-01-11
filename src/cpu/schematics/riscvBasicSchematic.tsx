
import { ILSSchematic } from "@/src/cpu/ImportExport";
export const riscvBasicSchematic: ILSSchematic = {"id":"riscv-basic","name":"RISCV Basic","model":{"wires":[{"nodes":[{"id":0,"x":-6,"y":35,"edges":[1],"ref":{"type":3,"id":"1","compNodeId":"in"}},{"id":1,"x":-8,"y":35,"edges":[0],"ref":{"type":3,"id":"7","compNodeId":"out"}}]},{"nodes":[{"id":0,"x":-2,"y":32,"edges":[1],"ref":{"type":3,"id":"1","compNodeId":"ctrl"}},{"id":1,"x":-2,"y":14,"edges":[0],"ref":{"type":3,"id":"5","compNodeId":"regCtrl"}}]},{"nodes":[{"id":0,"x":34,"y":-5,"edges":[1],"ref":{"type":3,"id":"5","compNodeId":"loadStoreCtrl"}},{"id":1,"x":46,"y":-5,"edges":[0],"ref":{"type":3,"id":"14","compNodeId":"ctrl"}}]},{"nodes":[{"id":0,"x":16,"y":19,"edges":[1,2,3]},{"id":1,"x":-10,"y":19,"edges":[0,4]},{"id":2,"x":16,"y":25,"edges":[0,5,6]},{"id":3,"x":42,"y":19,"edges":[0],"ref":{"type":3,"id":"10","compNodeId":"a"}},{"id":4,"x":-10,"y":-4,"edges":[1,7]},{"id":5,"x":27,"y":25,"edges":[2],"ref":{"type":3,"id":"9","compNodeId":"b"}},{"id":6,"x":14,"y":25,"edges":[2],"ref":{"type":3,"id":"3","compNodeId":"out"}},{"id":7,"x":-15,"y":-4,"edges":[4],"ref":{"type":3,"id":"11","compNodeId":"addr"}}]},{"nodes":[{"id":0,"x":-9,"y":33,"edges":[1],"ref":{"type":3,"id":"7","compNodeId":"sel"}},{"id":1,"x":-7,"y":33,"edges":[0,2]},{"id":2,"x":-7,"y":23,"edges":[1,3,4]},{"id":3,"x":-9,"y":23,"edges":[2],"ref":{"type":3,"id":"8","compNodeId":"sel"}},{"id":4,"x":-7,"y":17,"edges":[2,5]},{"id":5,"x":-5,"y":17,"edges":[4,6]},{"id":6,"x":-5,"y":14,"edges":[5],"ref":{"type":3,"id":"5","compNodeId":"pcRegMuxCtrl"}}]},{"nodes":[{"id":0,"x":-57,"y":27,"edges":[1],"ref":{"type":3,"id":"16","compNodeId":"busCtrl"}},{"id":1,"x":-59,"y":27,"edges":[0,2,3]},{"id":2,"x":-59,"y":-8,"edges":[1,4]},{"id":3,"x":-59,"y":58,"edges":[1,5]},{"id":4,"x":50,"y":-8,"edges":[2,6]},{"id":5,"x":-57,"y":58,"edges":[3],"ref":{"type":3,"id":"17","compNodeId":"busCtrl"}},{"id":6,"x":50,"y":-6,"edges":[4],"ref":{"type":3,"id":"14","compNodeId":"busCtrl"}}]},{"nodes":[{"id":0,"x":-57,"y":29,"edges":[1],"ref":{"type":3,"id":"16","compNodeId":"busAddr"}},{"id":1,"x":-60,"y":29,"edges":[0,2,3]},{"id":2,"x":-60,"y":-9,"edges":[1,4]},{"id":3,"x":-60,"y":60,"edges":[1,5]},{"id":4,"x":54,"y":-9,"edges":[2,6]},{"id":5,"x":-57,"y":60,"edges":[3],"ref":{"type":3,"id":"17","compNodeId":"busAddr"}},{"id":6,"x":54,"y":-6,"edges":[4],"ref":{"type":3,"id":"14","compNodeId":"busAddr"}}]},{"nodes":[{"id":0,"x":-57,"y":31,"edges":[1],"ref":{"type":3,"id":"16","compNodeId":"busData"}},{"id":1,"x":-61,"y":31,"edges":[0,2,3]},{"id":2,"x":-61,"y":-10,"edges":[1,4]},{"id":3,"x":-61,"y":62,"edges":[1,5]},{"id":4,"x":58,"y":-10,"edges":[2,6]},{"id":5,"x":-57,"y":62,"edges":[3],"ref":{"type":3,"id":"17","compNodeId":"busData"}},{"id":6,"x":58,"y":-6,"edges":[4],"ref":{"type":3,"id":"14","compNodeId":"busData"}}]},{"nodes":[{"id":0,"x":-49,"y":27,"edges":[1],"ref":{"type":3,"id":"16","compNodeId":"localCtrl"}},{"id":1,"x":-47,"y":27,"edges":[0],"ref":{"type":3,"id":"15","compNodeId":"ctrl"}}]},{"nodes":[{"id":0,"x":-49,"y":29,"edges":[1],"ref":{"type":3,"id":"16","compNodeId":"localAddr"}},{"id":1,"x":-47,"y":29,"edges":[0],"ref":{"type":3,"id":"15","compNodeId":"addr"}}]},{"nodes":[{"id":0,"x":-49,"y":31,"edges":[1],"ref":{"type":3,"id":"16","compNodeId":"localData"}},{"id":1,"x":-47,"y":31,"edges":[0],"ref":{"type":3,"id":"15","compNodeId":"data"}}]},{"nodes":[{"id":0,"x":-49,"y":58,"edges":[1],"ref":{"type":3,"id":"17","compNodeId":"localCtrl"}},{"id":1,"x":-47,"y":58,"edges":[0],"ref":{"type":3,"id":"18","compNodeId":"busCtrl"}}]},{"nodes":[{"id":0,"x":-49,"y":60,"edges":[1],"ref":{"type":3,"id":"17","compNodeId":"localAddr"}},{"id":1,"x":-47,"y":60,"edges":[0],"ref":{"type":3,"id":"18","compNodeId":"busAddr"}}]},{"nodes":[{"id":0,"x":-49,"y":62,"edges":[1],"ref":{"type":3,"id":"17","compNodeId":"localData"}},{"id":1,"x":-47,"y":62,"edges":[0],"ref":{"type":3,"id":"18","compNodeId":"busData"}}]},{"nodes":[{"id":0,"x":44,"y":9,"edges":[1],"ref":{"type":3,"id":"19","compNodeId":"out"}},{"id":1,"x":58,"y":9,"edges":[0,2,3]},{"id":2,"x":58,"y":6,"edges":[1],"ref":{"type":3,"id":"14","compNodeId":"dataIn"}},{"id":3,"x":61,"y":9,"edges":[1,4]},{"id":4,"x":61,"y":15,"edges":[3],"ref":{"type":3,"id":"2","compNodeId":"rhs"}}]},{"nodes":[{"id":0,"x":40,"y":38,"edges":[1,2]},{"id":1,"x":34,"y":38,"edges":[0],"ref":{"type":3,"id":"1","compNodeId":"outB"}},{"id":2,"x":40,"y":10,"edges":[0,3]},{"id":3,"x":42,"y":10,"edges":[2],"ref":{"type":3,"id":"19","compNodeId":"b"}}]},{"nodes":[{"id":0,"x":43,"y":2,"edges":[1,2]},{"id":1,"x":34,"y":2,"edges":[0],"ref":{"type":3,"id":"5","compNodeId":"rhsSel"}},{"id":2,"x":43,"y":7,"edges":[0],"ref":{"type":3,"id":"19","compNodeId":"sel"}}]},{"nodes":[{"id":0,"x":9,"y":14,"edges":[1],"ref":{"type":3,"id":"5","compNodeId":"lhsSel"}},{"id":1,"x":9,"y":15,"edges":[0,2]},{"id":2,"x":43,"y":15,"edges":[1,3]},{"id":3,"x":43,"y":18,"edges":[2],"ref":{"type":3,"id":"10","compNodeId":"sel"}}]},{"nodes":[{"id":0,"x":-15,"y":-5,"edges":[1],"ref":{"type":3,"id":"11","compNodeId":"data"}},{"id":1,"x":-6,"y":-5,"edges":[0],"ref":{"type":3,"id":"5","compNodeId":"ins"}}]},{"nodes":[{"id":0,"x":51,"y":6,"edges":[1],"ref":{"type":3,"id":"14","compNodeId":"addrBase"}},{"id":1,"x":51,"y":12,"edges":[0,2,3]},{"id":2,"x":45,"y":12,"edges":[1,4]},{"id":3,"x":51,"y":15,"edges":[1],"ref":{"type":3,"id":"2","compNodeId":"lhs"}},{"id":4,"x":45,"y":20,"edges":[2,5]},{"id":5,"x":44,"y":20,"edges":[4],"ref":{"type":3,"id":"10","compNodeId":"out"}}]},{"nodes":[{"id":0,"x":47,"y":16,"edges":[1,2]},{"id":1,"x":47,"y":18,"edges":[0,3,4]},{"id":2,"x":12,"y":16,"edges":[0,5]},{"id":3,"x":48,"y":18,"edges":[1],"ref":{"type":3,"id":"2","compNodeId":"ctrl"}},{"id":4,"x":47,"y":33,"edges":[1,6]},{"id":5,"x":12,"y":14,"edges":[2],"ref":{"type":3,"id":"5","compNodeId":"aluCtrl"}},{"id":6,"x":50,"y":33,"edges":[4],"ref":{"type":3,"id":"21","compNodeId":"i"}}]},{"nodes":[{"id":0,"x":64,"y":0,"edges":[1],"ref":{"type":3,"id":"14","compNodeId":"dataOut"}},{"id":1,"x":65,"y":0,"edges":[0,2]},{"id":2,"x":65,"y":31,"edges":[1,3]},{"id":3,"x":55,"y":31,"edges":[2],"ref":{"type":3,"id":"20","compNodeId":"a"}}]},{"nodes":[{"id":0,"x":34,"y":35,"edges":[1],"ref":{"type":3,"id":"1","compNodeId":"outA"}},{"id":1,"x":37,"y":35,"edges":[0,2]},{"id":2,"x":37,"y":21,"edges":[1,3]},{"id":3,"x":42,"y":21,"edges":[2],"ref":{"type":3,"id":"10","compNodeId":"b"}}]},{"nodes":[{"id":0,"x":25,"y":23,"edges":[1],"ref":{"type":3,"id":"13","compNodeId":"out"}},{"id":1,"x":27,"y":23,"edges":[0],"ref":{"type":3,"id":"9","compNodeId":"a"}}]},{"nodes":[{"id":0,"x":36,"y":17,"edges":[1,2]},{"id":1,"x":36,"y":12,"edges":[0,3,4]},{"id":2,"x":22,"y":17,"edges":[0,5]},{"id":3,"x":36,"y":8,"edges":[1,6,7]},{"id":4,"x":34,"y":12,"edges":[1],"ref":{"type":3,"id":"5","compNodeId":"imm"}},{"id":5,"x":22,"y":24,"edges":[2,8]},{"id":6,"x":36,"y":-4,"edges":[3,9]},{"id":7,"x":42,"y":8,"edges":[3],"ref":{"type":3,"id":"19","compNodeId":"a"}},{"id":8,"x":23,"y":24,"edges":[5],"ref":{"type":3,"id":"13","compNodeId":"b"}},{"id":9,"x":46,"y":-4,"edges":[6],"ref":{"type":3,"id":"14","compNodeId":"addrOffset"}}]},{"nodes":[{"id":0,"x":24,"y":21,"edges":[1],"ref":{"type":3,"id":"13","compNodeId":"sel"}},{"id":1,"x":24,"y":20,"edges":[0,2]},{"id":2,"x":34,"y":20,"edges":[1,3]},{"id":3,"x":34,"y":28,"edges":[2,4]},{"id":4,"x":52,"y":28,"edges":[3,5]},{"id":5,"x":52,"y":27,"edges":[4],"ref":{"type":3,"id":"2","compNodeId":"branch"}}]},{"nodes":[{"id":0,"x":21,"y":22,"edges":[1],"ref":{"type":3,"id":"12","compNodeId":"out"}},{"id":1,"x":23,"y":22,"edges":[0],"ref":{"type":3,"id":"13","compNodeId":"a"}}]},{"nodes":[{"id":0,"x":-8,"y":25,"edges":[1],"ref":{"type":3,"id":"8","compNodeId":"out"}},{"id":1,"x":-6,"y":25,"edges":[0],"ref":{"type":3,"id":"3","compNodeId":"in"}}]},{"nodes":[{"id":0,"x":-11,"y":28,"edges":[1,2,3]},{"id":1,"x":-11,"y":26,"edges":[0,4]},{"id":2,"x":-11,"y":34,"edges":[0,5]},{"id":3,"x":32,"y":28,"edges":[0,6]},{"id":4,"x":-10,"y":26,"edges":[1],"ref":{"type":3,"id":"8","compNodeId":"b"}},{"id":5,"x":-10,"y":34,"edges":[2],"ref":{"type":3,"id":"7","compNodeId":"a"}},{"id":6,"x":32,"y":25,"edges":[3,7]},{"id":7,"x":31,"y":25,"edges":[6],"ref":{"type":3,"id":"9","compNodeId":"out"}}]},{"nodes":[{"id":0,"x":56,"y":27,"edges":[1],"ref":{"type":3,"id":"2","compNodeId":"result"}},{"id":1,"x":56,"y":29,"edges":[0,2]},{"id":2,"x":55,"y":29,"edges":[1],"ref":{"type":3,"id":"20","compNodeId":"b"}}]},{"nodes":[{"id":0,"x":53,"y":30,"edges":[1],"ref":{"type":3,"id":"20","compNodeId":"out"}},{"id":1,"x":-13,"y":30,"edges":[0,2,3]},{"id":2,"x":-13,"y":36,"edges":[1,4]},{"id":3,"x":-13,"y":24,"edges":[1,5]},{"id":4,"x":-10,"y":36,"edges":[2],"ref":{"type":3,"id":"7","compNodeId":"b"}},{"id":5,"x":-10,"y":24,"edges":[3],"ref":{"type":3,"id":"8","compNodeId":"a"}}]},{"nodes":[{"id":0,"x":53,"y":33,"edges":[1],"ref":{"type":3,"id":"21","compNodeId":"o_0_0"}},{"id":1,"x":54,"y":33,"edges":[0,2]},{"id":2,"x":54,"y":32,"edges":[1],"ref":{"type":3,"id":"20","compNodeId":"sel"}}]}],"comps":[{"id":"1","defId":"core/riscv/reg32","x":-6,"y":32,"r":0},{"id":"2","defId":"core/riscv/alu0","x":48,"y":15,"r":0,"subSchematicId":"c-99bxrqes"},{"id":"3","defId":"core/flipflop/reg1","x":-6,"y":23,"r":0},{"id":"5","defId":"core/riscv/insDecode0","x":-6,"y":-6,"r":0,"args":{"name":"RISCV 32-bit Instruction Decoder"},"subSchematicId":"c-bdo4jd5a"},{"id":"7","defId":"core/flow/mux2","x":-10,"y":33,"r":0,"args":{"bitWidth":32,"rotate":0,"reverse":false},"subSchematicId":"c-6f4cdt0t"},{"id":"8","defId":"core/flow/mux2","x":-10,"y":23,"r":0,"args":{"bitWidth":32,"rotate":0,"reverse":false},"subSchematicId":"c-6f4cdt0t"},{"id":"9","defId":"core/math/adder","x":27,"y":21,"r":0,"subSchematicId":"c-63zedesz"},{"id":"10","defId":"core/flow/mux2","x":42,"y":18,"r":0,"args":{"bitWidth":32,"rotate":0,"reverse":false},"subSchematicId":"c-6f4cdt0t"},{"id":"11","defId":"core/mem/rom0","x":-47,"y":-6,"r":0},{"id":"12","defId":"core/io/const32","x":18,"y":21,"r":0,"args":{"value":4,"valueMode":0,"bitWidth":32,"h":2,"w":3,"portPos":1,"rotate":0,"signed":false}},{"id":"13","defId":"core/flow/mux2","x":23,"y":21,"r":0,"args":{"bitWidth":32,"rotate":0,"reverse":false},"subSchematicId":"c-6f4cdt0t"},{"id":"14","defId":"core/riscv/loadStore0","x":46,"y":-6,"r":0,"subSchematicId":"c-4xavnavm"},{"id":"15","defId":"core/mem/ram0","x":-47,"y":25,"r":0},{"id":"16","defId":"core/bus/addrMap","x":-57,"y":26,"r":0,"args":{"addrOffset":65536,"addrMask":65535}},{"id":"17","defId":"core/bus/addrMap","x":-57,"y":57,"r":0,"args":{"addrOffset":1073872896,"addrMask":65535}},{"id":"18","defId":"core/io/ledOutput0","x":-47,"y":56,"r":0},{"id":"19","defId":"core/flow/mux2","x":42,"y":7,"r":0,"args":{"bitWidth":32,"rotate":0,"reverse":false},"subSchematicId":"c-6f4cdt0t"},{"id":"20","defId":"core/flow/mux2","x":55,"y":32,"r":2,"args":{"bitWidth":32,"rotate":0,"reverse":false},"subSchematicId":"c-6f4cdt0t"},{"id":"21","defId":"core/bits/expand-multi","x":50,"y":32,"r":0,"args":{"bitWidth":32,"bitRange":[{"start":0,"end":0,"individual":false,"showBits":true,"id":0}],"collapse":false,"reverse":false,"rotate":0}}]}};

export const riscvBasicSchematicStr = `#wire-schema 1
C 1 core/riscv/reg32 p:-6,32,0 c:{}
C 2 core/riscv/alu0 p:48,15,0 c:{}
C 3 core/flipflop/reg1 p:-6,23,0 c:{}
C 5 core/riscv/insDecode0 p:-6,-6,0 c:{"name":"RISCV 32-bit Instruction Decoder"}
C 7 core/flow/mux2 p:-10,33,0 c:{"bitWidth":32,"rotate":0,"reverse":false}
C 8 core/flow/mux2 p:-10,23,0 c:{"bitWidth":32,"rotate":0,"reverse":false}
C 9 core/math/adder p:27,21,0 c:{}
C 10 core/flow/mux2 p:42,18,0 c:{"bitWidth":32,"rotate":0,"reverse":false}
C 11 core/mem/rom0 p:-47,-6,0 c:{}
C 12 core/io/const32 p:18,21,0 c:{"value":4,"valueMode":0,"bitWidth":32,"h":2,"w":3,"portPos":1,"rotate":0,"signed":false}
C 13 core/flow/mux2 p:23,21,0 c:{"bitWidth":32,"rotate":0,"reverse":false}
C 14 core/riscv/loadStore0 p:46,-6,0 c:{}
C 15 core/mem/ram0 p:-47,25,0 c:{}
C 16 core/bus/addrMap p:-57,26,0 c:{"addrOffset":65536,"addrMask":65535}
C 17 core/bus/addrMap p:-57,57,0 c:{"addrOffset":1073872896,"addrMask":65535}
C 18 core/io/ledOutput0 p:-47,56,0 c:{}
C 19 core/flow/mux2 p:42,7,0 c:{"bitWidth":32,"rotate":0,"reverse":false}
C 20 core/flow/mux2 p:55,32,2 c:{"bitWidth":32,"rotate":0,"reverse":false}
C 21 core/bits/expand-multi p:50,32,0 c:{"bitWidth":32,"bitRange":[{"start":0,"end":0,"individual":false,"showBits":true,"id":0}],"collapse":false,"reverse":false,"rotate":0}
W 0 ns:[-6,35 p:1/in|-8,35,0 p:7/out]
W 1 ns:[-2,32 p:1/ctrl|-2,14,0 p:5/regCtrl]
W 2 ns:[34,-5 p:5/loadStoreCtrl|46,-5,0 p:14/ctrl]
W 3 ns:[16,19|-10,19,0|16,25,0|42,19,0 p:10/a|-10,-4,1|27,25,2 p:9/b|14,25,2 p:3/out|-15,-4,4 p:11/addr]
W 4 ns:[-9,33 p:7/sel|-7,33,0|-7,23,1|-9,23,2 p:8/sel|-7,17,2|-5,17,4|-5,14,5 p:5/pcRegMuxCtrl]
W 5 ns:[-57,27 p:16/busCtrl|-59,27,0|-59,-8,1|-59,58,1|50,-8,2|-57,58,3 p:17/busCtrl|50,-6,4 p:14/busCtrl]
W 6 ns:[-57,29 p:16/busAddr|-60,29,0|-60,-9,1|-60,60,1|54,-9,2|-57,60,3 p:17/busAddr|54,-6,4 p:14/busAddr]
W 7 ns:[-57,31 p:16/busData|-61,31,0|-61,-10,1|-61,62,1|58,-10,2|-57,62,3 p:17/busData|58,-6,4 p:14/busData]
W 8 ns:[-49,27 p:16/localCtrl|-47,27,0 p:15/ctrl]
W 9 ns:[-49,29 p:16/localAddr|-47,29,0 p:15/addr]
W 10 ns:[-49,31 p:16/localData|-47,31,0 p:15/data]
W 11 ns:[-49,58 p:17/localCtrl|-47,58,0 p:18/busCtrl]
W 12 ns:[-49,60 p:17/localAddr|-47,60,0 p:18/busAddr]
W 13 ns:[-49,62 p:17/localData|-47,62,0 p:18/busData]
W 14 ns:[44,9 p:19/out|58,9,0|58,6,1 p:14/dataIn|61,9,1|61,15,3 p:2/rhs]
W 15 ns:[40,38|34,38,0 p:1/outB|40,10,0|42,10,2 p:19/b]
W 16 ns:[43,2|34,2,0 p:5/rhsSel|43,7,0 p:19/sel]
W 17 ns:[9,14 p:5/lhsSel|9,15,0|43,15,1|43,18,2 p:10/sel]
W 18 ns:[-15,-5 p:11/data|-6,-5,0 p:5/ins]
W 19 ns:[51,6 p:14/addrBase|51,12,0|45,12,1|51,15,1 p:2/lhs|45,20,2|44,20,4 p:10/out]
W 20 ns:[47,16|47,18,0|12,16,0|48,18,1 p:2/ctrl|47,33,1|12,14,2 p:5/aluCtrl|50,33,4 p:21/i]
W 21 ns:[64,0 p:14/dataOut|65,0,0|65,31,1|55,31,2 p:20/a]
W 22 ns:[34,35 p:1/outA|37,35,0|37,21,1|42,21,2 p:10/b]
W 23 ns:[25,23 p:13/out|27,23,0 p:9/a]
W 24 ns:[36,17|36,12,0|22,17,0|36,8,1|34,12,1 p:5/imm|22,24,2|36,-4,3|42,8,3 p:19/a|23,24,5 p:13/b|46,-4,6 p:14/addrOffset]
W 25 ns:[24,21 p:13/sel|24,20,0|34,20,1|34,28,2|52,28,3|52,27,4 p:2/branch]
W 26 ns:[21,22 p:12/out|23,22,0 p:13/a]
W 27 ns:[-8,25 p:8/out|-6,25,0 p:3/in]
W 28 ns:[-11,28|-11,26,0|-11,34,0|32,28,0|-10,26,1 p:8/b|-10,34,2 p:7/a|32,25,3|31,25,6 p:9/out]
W 29 ns:[56,27 p:2/result|56,29,0|55,29,1 p:20/b]
W 30 ns:[53,30 p:20/out|-13,30,0|-13,36,1|-13,24,1|-10,36,2 p:7/b|-10,24,3 p:8/a]
W 31 ns:[53,33 p:21/o_0_0|54,33,0|54,32,1 p:20/sel]
`;
