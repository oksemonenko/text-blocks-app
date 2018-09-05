import {ActionTypeEnum} from "../enums/ActionType.enum";

export const addBlock = block => ({
    type: ActionTypeEnum.ADD_BLOCK,
    payload: block
});

export const removeBlock = index => ({
    type: ActionTypeEnum.REMOVE_BLOCK,
    payload: index
});

export const toggleSelectBlock = index => ({
    type: ActionTypeEnum.TOGGLE_SELECTION,
    payload: index
});

export const changeColor = index => ({
    type: ActionTypeEnum.CHANGE_COLOR,
    payload: index
});
