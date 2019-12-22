import { combineReducers } from 'redux';

const isClickedReducer = (isClicked = false, action) => {
    if (action.type === 'SOLVE_BUTTON_CLICKED') {
        return action.payload;
    } 
    return isClicked;
}

export default combineReducers({
    isClicked: isClickedReducer,
});