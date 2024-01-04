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

const StartNode: React.FC<IProps> = ({ data, isConnectable }) => {
	return (
		<div className="node">
			<div className="node-content"></div>
			<CustomSelect componentId={data.componentId} />
			<Handle type="source" position={Position.Bottom} id="a" isConnectable={isConnectable} />
		</div>
	);
};

export default StartNode;
