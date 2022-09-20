const initState = {}

const blogReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_BLOG_SUCCESS':
            return state;
        case 'CREATE_BLOG_ERROR':
            return state;
        default:
            return state;
    }
};

export default blogReducer;