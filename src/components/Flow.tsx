import { useCallback, useEffect, useState } from "react";
import ReactFlow, {
	MiniMap,
	Controls,
	Background,
	useNodesState,
	useEdgesState,
	addEdge,
	MarkerType,
	NodeTypes,
	OnConnect,
	Edge,
	useReactFlow,
	ReactFlowInstance,
} from "reactflow";
import StartNode from "./StartNode";

import "reactflow/dist/style.css";
import Node from "./Node";
import EndNode from "./EndNode";

const flowKey = "example-flow";

const nodeTypes: NodeTypes = { startNode: StartNode, node: Node, endNode: EndNode };

const initialNodes = [
	{ id: "node-1", type: "startNode", position: { x: 0, y: 0 }, data: { componentId: 0 } },
	{ id: "node-2", type: "node", position: { x: 250, y: 250 }, data: { componentId: 1 } },
	{ id: "node-3", type: "node", position: { x: 500, y: 500 }, data: { componentId: 2 } },
	{ id: "node-4", type: "endNode", position: { x: 750, y: 750 }, data: { componentId: 3 } },
];
const initialEdges: Edge[] = [
	{
		id: "e1-2",
		type: "smoothstep",
		markerEnd: {
			type: MarkerType.Arrow,
		},
		source: "node-1",
		target: "node-2",
	},
	{
		id: "e2-3",
		type: "smoothstep",
		markerEnd: {
			type: MarkerType.Arrow,
		},
		source: "node-2",
		target: "node-3",
	},
	{
		id: "e3-4",
		type: "smoothstep",
		markerEnd: {
			type: MarkerType.Arrow,
		},
		source: "node-3",
		target: "node-4",
	},
];

const Flow = () => {
	const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
	const [rfInstance, setRfInstance] = useState<ReactFlowInstance | null>(null);
	const { setViewport } = useReactFlow();

	const onConnect: OnConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

	const onSave = useCallback(() => {
		if (rfInstance) {
			const flow = rfInstance.toObject();
			localStorage.setItem(flowKey, JSON.stringify(flow));
		}
	}, [rfInstance]);

	const onRestore = useCallback(() => {
		const restoreFlow = async () => {
			const flow = JSON.parse(localStorage.getItem(flowKey) as "string");

			if (flow) {
				const { x = 0, y = 0, zoom = 1 } = flow.viewport;
				setNodes(flow.nodes || []);
				setEdges(flow.edges || []);
				setViewport({ x, y, zoom });
			}
		};

		restoreFlow();
	}, [setNodes, setViewport]);

	useEffect(() => {
		window.addEventListener("beforeunload", onSave);
		onRestore();

		return () => {
			window.removeEventListener("beforeunload", onSave);
		};
	}, [onSave]);

	return (
		<div style={{ width: "100vw", height: "100vh" }}>
			<ReactFlow
				nodes={nodes}
				edges={edges}
				nodeTypes={nodeTypes}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				onInit={setRfInstance}
			>
				<Controls />
				<MiniMap />
				<Background gap={12} size={1} />
			</ReactFlow>
		</div>
	);
};

export default Flow;
