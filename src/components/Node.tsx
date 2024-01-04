import React from "react";
import { Handle, Position } from "reactflow";
import "./node.css";
import CustomSelect from "./CustomSelect";

interface IProps {
	data: {
		componentId: number;
	};
	isConnectable: boolean;
}

const Node: React.FC<IProps> = ({ data, isConnectable }) => {
	return (
		<div className="node">
			<div className="node-content"></div>
			<CustomSelect componentId={data.componentId} />
			<Handle type="target" position={Position.Top} isConnectable={isConnectable} />
			<Handle type="source" position={Position.Right} id="a" isConnectable={isConnectable} />
		</div>
	);
};

export default Node;
