export const initialState = {
    reaminingCards: 69,
    mistakes: 0,
    foundSets: 0,
    gameDifficulty: "easy",

};

const reducer = (state, action) => {
    //
    switch (action.type) {
        case "SET_REMAINING_CARDS":
            return {
                ...state,
                reaminingCards: action.item,
            };

        case "SET_MISTAKES":
            return {
                ...state,
                mistakes: action.item,
            };

        case "SET_FOUND_SETS":
            return {
                ...state,
                foundSets: action.item,
            };

        case "SET_GAME_DIFFICULTY":
            return {
                ...state,
                gameDifficulty: action.item,
            };

        default:
            return state;
    }
};

export default reducer;