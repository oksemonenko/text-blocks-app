import {ActionTypeEnum} from "../enums/ActionType.enum";
import {BlockColorEnum} from "../enums/BlockColor.enum";


const reducer = (state = [], action) => {
    switch (action.type) {
        case ActionTypeEnum.ADD_BLOCK:
            return [...state, action.payload];
        case ActionTypeEnum.REMOVE_BLOCK:
            return [
                ...state.slice(0, action.payload),
                ...state.slice(action.payload + 1),
            ];
        case ActionTypeEnum.TOGGLE_SELECT_BLOCK:
            const blockToToggleSelect = state[action.payload];
            blockToToggleSelect.selected = !blockToToggleSelect.selected;
            return [
                ...state.slice(0, action.payload),
                blockToToggleSelect,
                ...state.slice(action.payload + 1),
            ];
        case ActionTypeEnum.CHANGE_COLOR:
            const blockToChangeColor = state[action.payload];
            blockToChangeColor.color =
                blockToChangeColor.color === BlockColorEnum.GREEN ?
                    BlockColorEnum.RED : BlockColorEnum.GREEN;
            return [
                ...state.slice(0, action.payload),
                blockToChangeColor,
                ...state.slice(action.payload + 1),
            ];

    }
};

export default reducer;
