
import { ILSSchematic } from "@/src/cpu/ImportExport";
export const comparitor_4WaySchematic: ILSSchematic = {"id":"c-xnugx31i","name":"Comparitor 4-way","compArgs":{"w":4,"h":4,"ports":[{"id":"eq_i","name":"Equals","type":1,"x":0,"y":1,"width":4},{"id":"lt_i","name":"Less Than","type":1,"x":0,"y":3,"width":4},{"id":"eq_o","name":"Equals Out","type":2,"x":4,"y":1,"width":1},{"id":"lt_o","name":"Less Than Out","type":2,"x":4,"y":3,"width":1}]},"model":{"wires":[{"nodes":[{"id":0,"x":30,"y":55,"edges":[1,2]},{"id":1,"x":30,"y":67,"edges":[0,3]},{"id":2,"x":37,"y":55,"edges":[0],"ref":{"type":3,"id":"3","compNodeId":"i"}},{"id":3,"x":26,"y":67,"edges":[1],"ref":{"type":3,"id":"1","compNodeId":"a"}}]},{"nodes":[{"id":0,"x":30,"y":34,"edges":[1,2]},{"id":1,"x":30,"y":53,"edges":[0,3]},{"id":2,"x":26,"y":34,"edges":[0],"ref":{"type":3,"id":"0","compNodeId":"a"}},{"id":3,"x":33,"y":53,"edges":[1],"ref":{"type":3,"id":"2","compNodeId":"i"}}]},{"nodes":[{"id":0,"x":45,"y":36,"edges":[1,2,3]},{"id":1,"x":45,"y":49,"edges":[0,4,5]},{"id":2,"x":36,"y":36,"edges":[0],"ref":{"type":3,"id":"2","compNodeId":"o_0_0"}},{"id":3,"x":54,"y":36,"edges":[0,6]},{"id":4,"x":48,"y":49,"edges":[1],"ref":{"type":3,"id":"18","compNodeId":"i1"}},{"id":5,"x":45,"y":57,"edges":[1,7,8]},{"id":6,"x":54,"y":32,"edges":[3,9]},{"id":7,"x":48,"y":57,"edges":[5],"ref":{"type":3,"id":"17","compNodeId":"i1"}},{"id":8,"x":45,"y":66,"edges":[5,10]},{"id":9,"x":65,"y":32,"edges":[6],"ref":{"type":3,"id":"24","compNodeId":"i0"}},{"id":10,"x":48,"y":66,"edges":[8],"ref":{"type":3,"id":"19","compNodeId":"i1"}}]},{"nodes":[{"id":0,"x":52,"y":57,"edges":[1],"ref":{"type":3,"id":"17","compNodeId":"o"}},{"id":1,"x":61,"y":57,"edges":[0,2]},{"id":2,"x":61,"y":68,"edges":[1,3]},{"id":3,"x":65,"y":68,"edges":[2],"ref":{"type":3,"id":"16","compNodeId":"i2"}}]},{"nodes":[{"id":0,"x":52,"y":67,"edges":[1],"ref":{"type":3,"id":"19","compNodeId":"o"}},{"id":1,"x":60,"y":67,"edges":[0,2]},{"id":2,"x":60,"y":69,"edges":[1,3]},{"id":3,"x":65,"y":69,"edges":[2],"ref":{"type":3,"id":"16","compNodeId":"i3"}}]},{"nodes":[{"id":0,"x":65,"y":66,"edges":[1],"ref":{"type":3,"id":"16","compNodeId":"i1"}},{"id":1,"x":62,"y":66,"edges":[0,2]},{"id":2,"x":62,"y":48,"edges":[1,3]},{"id":3,"x":52,"y":48,"edges":[2],"ref":{"type":3,"id":"18","compNodeId":"o"}}]},{"nodes":[{"id":0,"x":69,"y":67,"edges":[1],"ref":{"type":3,"id":"16","compNodeId":"o"}},{"id":1,"x":72,"y":67,"edges":[0],"ref":{"type":3,"id":"26","compNodeId":"a"}}]},{"nodes":[{"id":0,"x":73,"y":34,"edges":[1],"ref":{"type":3,"id":"25","compNodeId":"a"}},{"id":1,"x":69,"y":34,"edges":[0],"ref":{"type":3,"id":"24","compNodeId":"o"}}]},{"nodes":[{"id":0,"x":36,"y":45,"edges":[1],"ref":{"type":3,"id":"2","compNodeId":"o_0_1"}},{"id":1,"x":44,"y":45,"edges":[0,2,3]},{"id":2,"x":44,"y":58,"edges":[1,4,5]},{"id":3,"x":55,"y":45,"edges":[1,6]},{"id":4,"x":48,"y":58,"edges":[2],"ref":{"type":3,"id":"17","compNodeId":"i2"}},{"id":5,"x":44,"y":68,"edges":[2,7]},{"id":6,"x":55,"y":33,"edges":[3,8]},{"id":7,"x":48,"y":68,"edges":[5],"ref":{"type":3,"id":"19","compNodeId":"i2"}},{"id":8,"x":65,"y":33,"edges":[6],"ref":{"type":3,"id":"24","compNodeId":"i1"}}]},{"nodes":[{"id":0,"x":36,"y":54,"edges":[1],"ref":{"type":3,"id":"2","compNodeId":"o_0_2"}},{"id":1,"x":43,"y":54,"edges":[0,2,3]},{"id":2,"x":43,"y":69,"edges":[1,4]},{"id":3,"x":56,"y":54,"edges":[1,5]},{"id":4,"x":48,"y":69,"edges":[2],"ref":{"type":3,"id":"19","compNodeId":"i3"}},{"id":5,"x":56,"y":35,"edges":[3,6]},{"id":6,"x":65,"y":35,"edges":[5],"ref":{"type":3,"id":"24","compNodeId":"i2"}}]},{"nodes":[{"id":0,"x":36,"y":63,"edges":[1],"ref":{"type":3,"id":"2","compNodeId":"o_0_3"}},{"id":1,"x":57,"y":63,"edges":[0,2]},{"id":2,"x":57,"y":36,"edges":[1,3]},{"id":3,"x":65,"y":36,"edges":[2],"ref":{"type":3,"id":"24","compNodeId":"i3"}}]},{"nodes":[{"id":0,"x":40,"y":56,"edges":[1],"ref":{"type":3,"id":"3","compNodeId":"o_0_2"}},{"id":1,"x":48,"y":56,"edges":[0],"ref":{"type":3,"id":"17","compNodeId":"i0"}}]},{"nodes":[{"id":0,"x":40,"y":47,"edges":[1],"ref":{"type":3,"id":"3","compNodeId":"o_0_1"}},{"id":1,"x":48,"y":47,"edges":[0],"ref":{"type":3,"id":"18","compNodeId":"i0"}}]},{"nodes":[{"id":0,"x":40,"y":38,"edges":[1],"ref":{"type":3,"id":"3","compNodeId":"o_0_0"}},{"id":1,"x":63,"y":38,"edges":[0,2]},{"id":2,"x":63,"y":65,"edges":[1,3]},{"id":3,"x":65,"y":65,"edges":[2],"ref":{"type":3,"id":"16","compNodeId":"i0"}}]},{"nodes":[{"id":0,"x":40,"y":65,"edges":[1],"ref":{"type":3,"id":"3","compNodeId":"o_0_3"}},{"id":1,"x":48,"y":65,"edges":[0],"ref":{"type":3,"id":"19","compNodeId":"i0"}}]}],"comps":[{"id":"0","defId":"core/comp/port","x":20,"y":32,"r":0,"args":{"portId":"eq_i","name":"EQ 4","w":6,"h":4,"type":1,"portPos":0,"rotate":0,"bitWidth":4,"signed":false,"tristateOrder":0,"flags":0,"valueMode":1,"inputOverride":false,"inputValueOverride":15}},{"id":"1","defId":"core/comp/port","x":20,"y":65,"r":0,"args":{"portId":"lt_i","name":"LT 4","w":6,"h":4,"type":1,"portPos":0,"rotate":0,"bitWidth":4,"signed":false,"tristateOrder":0,"flags":0,"valueMode":1,"inputOverride":false,"inputValueOverride":0}},{"id":"2","defId":"core/bits/expand-multi","x":33,"y":35,"r":0,"args":{"bitWidth":4,"bitRange":[{"start":0,"end":3,"individual":true,"showBits":true,"id":0,"stepsPerBit":9}],"collapse":false,"reverse":false,"rotate":0}},{"id":"3","defId":"core/bits/expand-multi","x":37,"y":37,"r":0,"args":{"bitWidth":4,"bitRange":[{"start":0,"end":3,"individual":true,"showBits":true,"id":0,"stepsPerBit":9}],"collapse":false,"reverse":false,"rotate":0}},{"id":"16","defId":"core/gate/or-multi","x":65,"y":64,"r":0,"args":{"rotate":0,"bitWidth":1,"numInPorts":4}},{"id":"17","defId":"core/gate/and-multi","x":48,"y":55,"r":0,"args":{"rotate":0,"bitWidth":1,"numInPorts":3}},{"id":"18","defId":"core/gate/and-multi","x":48,"y":46,"r":0,"args":{"rotate":0,"bitWidth":1,"numInPorts":2}},{"id":"19","defId":"core/gate/and-multi","x":48,"y":64,"r":0,"args":{"rotate":0,"bitWidth":1,"numInPorts":4}},{"id":"24","defId":"core/gate/and-multi","x":65,"y":31,"r":0,"args":{"rotate":0,"bitWidth":1,"numInPorts":4}},{"id":"25","defId":"core/comp/port","x":79,"y":36,"r":2,"args":{"portId":"eq_o","name":"EQ 1","w":6,"h":4,"type":2,"portPos":0,"rotate":0,"bitWidth":1,"signed":false,"tristateOrder":0,"flags":0,"valueMode":1,"inputOverride":false,"inputValueOverride":0}},{"id":"26","defId":"core/comp/port","x":78,"y":69,"r":2,"args":{"portId":"lt_o","name":"LT 1","w":6,"h":4,"type":2,"portPos":0,"rotate":0,"bitWidth":1,"signed":false,"tristateOrder":0,"flags":0,"valueMode":1,"inputOverride":false,"inputValueOverride":0}}]}};

export const comparitor_4WaySchematicStr = `#wire-schema 1
C 0 core/comp/port p:20,32,0 c:{"portId":"eq_i","name":"EQ 4","w":6,"h":4,"type":1,"portPos":0,"rotate":0,"bitWidth":4,"signed":false,"tristateOrder":0,"flags":0,"valueMode":1,"inputOverride":false,"inputValueOverride":15}
C 1 core/comp/port p:20,65,0 c:{"portId":"lt_i","name":"LT 4","w":6,"h":4,"type":1,"portPos":0,"rotate":0,"bitWidth":4,"signed":false,"tristateOrder":0,"flags":0,"valueMode":1,"inputOverride":false,"inputValueOverride":0}
C 2 core/bits/expand-multi p:33,35,0 c:{"bitWidth":4,"bitRange":[{"start":0,"end":3,"individual":true,"showBits":true,"id":0,"stepsPerBit":9}],"collapse":false,"reverse":false,"rotate":0}
C 3 core/bits/expand-multi p:37,37,0 c:{"bitWidth":4,"bitRange":[{"start":0,"end":3,"individual":true,"showBits":true,"id":0,"stepsPerBit":9}],"collapse":false,"reverse":false,"rotate":0}
C 16 core/gate/or-multi p:65,64,0 c:{"rotate":0,"bitWidth":1,"numInPorts":4}
C 17 core/gate/and-multi p:48,55,0 c:{"rotate":0,"bitWidth":1,"numInPorts":3}
C 18 core/gate/and-multi p:48,46,0 c:{"rotate":0,"bitWidth":1,"numInPorts":2}
C 19 core/gate/and-multi p:48,64,0 c:{"rotate":0,"bitWidth":1,"numInPorts":4}
C 24 core/gate/and-multi p:65,31,0 c:{"rotate":0,"bitWidth":1,"numInPorts":4}
C 25 core/comp/port p:79,36,2 c:{"portId":"eq_o","name":"EQ 1","w":6,"h":4,"type":2,"portPos":0,"rotate":0,"bitWidth":1,"signed":false,"tristateOrder":0,"flags":0,"valueMode":1,"inputOverride":false,"inputValueOverride":0}
C 26 core/comp/port p:78,69,2 c:{"portId":"lt_o","name":"LT 1","w":6,"h":4,"type":2,"portPos":0,"rotate":0,"bitWidth":1,"signed":false,"tristateOrder":0,"flags":0,"valueMode":1,"inputOverride":false,"inputValueOverride":0}
W 0 ns:[30,55|30,67,0|37,55,0 p:3/i|26,67,1 p:1/a]
W 1 ns:[30,34|30,53,0|26,34,0 p:0/a|33,53,1 p:2/i]
W 2 ns:[45,36|45,49,0|36,36,0 p:2/o_0_0|54,36,0|48,49,1 p:18/i1|45,57,1|54,32,3|48,57,5 p:17/i1|45,66,5|65,32,6 p:24/i0|48,66,8 p:19/i1]
W 3 ns:[52,57 p:17/o|61,57,0|61,68,1|65,68,2 p:16/i2]
W 4 ns:[52,67 p:19/o|60,67,0|60,69,1|65,69,2 p:16/i3]
W 5 ns:[65,66 p:16/i1|62,66,0|62,48,1|52,48,2 p:18/o]
W 6 ns:[69,67 p:16/o|72,67,0 p:26/a]
W 7 ns:[73,34 p:25/a|69,34,0 p:24/o]
W 8 ns:[36,45 p:2/o_0_1|44,45,0|44,58,1|55,45,1|48,58,2 p:17/i2|44,68,2|55,33,3|48,68,5 p:19/i2|65,33,6 p:24/i1]
W 9 ns:[36,54 p:2/o_0_2|43,54,0|43,69,1|56,54,1|48,69,2 p:19/i3|56,35,3|65,35,5 p:24/i2]
W 10 ns:[36,63 p:2/o_0_3|57,63,0|57,36,1|65,36,2 p:24/i3]
W 11 ns:[40,56 p:3/o_0_2|48,56,0 p:17/i0]
W 12 ns:[40,47 p:3/o_0_1|48,47,0 p:18/i0]
W 13 ns:[40,38 p:3/o_0_0|63,38,0|63,65,1|65,65,2 p:16/i0]
W 14 ns:[40,65 p:3/o_0_3|48,65,0 p:19/i0]
`;
