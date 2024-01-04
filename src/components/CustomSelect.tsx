import React, { useMemo, useState } from "react";
import "./CustomSelect.css";
import { selectOption } from "../store/SelectSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/rootReducer";

interface IProps {
	componentId: number;
}

const options = [
	{ id: 0, text: "варіант 1", value: 1 },
	{ id: 1, text: "варіант 2", value: 2 },
	{ id: 2, text: "варіант 3", value: 3 },
	{ id: 3, text: "варіант 4", value: 4 },
	{ id: 4, text: "варіант 5", value: 5 },
	{ id: 5, text: "варіант 6", value: 6 },
];

const CustomSelect: React.FC<IProps> = ({ componentId }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedCheckbox, setSelectedCheckbox] = useState<number | null>(null);

	const dispatch = useDispatch();

	const selectedOptions = useSelector((state: RootState) => state.customSelect.selectedOptions[componentId] || []);

	const selectedOptionsString = useMemo(() => {
		return `варіант ${selectedOptions.join("-")}`;
	}, [selectedOptions]);

	const toggleSelect = () => {
		setIsOpen(!isOpen);
	};

	const handleOptionClick = (option: number) => {
		dispatch(selectOption({ componentId, option }));
		setSelectedCheckbox(option);
		setIsOpen(false);
	};

	return (
		<div className={`custom-select ${isOpen ? "open" : ""}`}>
			<div className="select-header" onClick={toggleSelect}>
				<span>{selectedCheckbox ? selectedOptionsString : "виберіть значення"}</span>
				{isOpen ? <span>&#9652;</span> : <span>&#9662;</span>}
			</div>
			<div className="select-options">
				{options.map((option) => (
					<div key={option.id} className="custom-select-option" onClick={() => handleOptionClick(option.value)}>
						<label>
							<input type="checkbox" checked={selectedCheckbox === option.value} readOnly />
							{option.text}
						</label>
					</div>
				))}
			</div>
		</div>
	);
};

export default CustomSelect;
