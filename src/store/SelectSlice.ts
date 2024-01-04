import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ISelectState {
	selectedOptions: number[][];
}

const initialState: ISelectState = {
	selectedOptions: [[], [], [], []],
};

const customSelectSlice = createSlice({
	name: "customSelect",
	initialState,
	reducers: {
		selectOption: (state, action: PayloadAction<{ componentId: number; option: number }>) => {
			const { componentId, option } = action.payload;

			if (!state.selectedOptions[componentId]) {
				state.selectedOptions[componentId] = [];
			}

			if (componentId == 0) {
				state.selectedOptions[componentId].pop();
			}

			if (componentId > 0) {
				state.selectedOptions[componentId] = [...state.selectedOptions[componentId - 1]];
			}

			state.selectedOptions[componentId].push(option);
		},
		resetOptions: (state, action: PayloadAction<number>) => {
			const componentId = action.payload;
			state.selectedOptions[componentId] = [];
		},
	},
});

export const { selectOption, resetOptions } = customSelectSlice.actions;
export default customSelectSlice.reducer;
