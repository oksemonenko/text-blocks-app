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

        case ActionTypeEnum.TOGGLE_SELECTION:
            return state.map((block, i) => {
                if (i !== action.payload) {
                    return block;
                }
                return {
                    ...block,
                    selected: !block.selected
                }
            });

        case ActionTypeEnum.CHANGE_COLOR:
            return state.map((block, i) => {
                if (i !== action.payload) {
                    return block;
                }
                return {
                    ...block,
                    color: block.color === BlockColorEnum.GREEN ?
                        BlockColorEnum.RED : BlockColorEnum.GREEN
                }
            });

        default:
            return state;
    }
};

export default reducer;

