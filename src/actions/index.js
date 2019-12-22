// Action Creator
export const clickOnSolveButton = (isClicked) => {
    return {
        type: 'SOLVE_BUTTON_CLICKED',
        payload: isClicked
    };
};