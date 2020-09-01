const INITIAL_STATE = {
    allBooks: [],
    articleDetails: {}
};
const DashBoardReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'AUTHOR_RECORD_DEATILS': return { ...state, allBooks: action.payload }
        case 'ARTICLE_RECORD_DEATILS': return { ...state, articleDetails: action.payload }
        default:
            return state;
    }
};
export default DashBoardReducer;