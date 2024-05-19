import {
    LOAD_PROFILE,
    CREATE_PROFILE,
    UPDATE_PROFILE,
    CLEAR_PROFILE,
    ADD_ACTIONS,
    ADD_POST,
    COMMENT_POST,
    LIKE_POST
} from '../types';

const profileReducer = (state, action) => {
    switch (action.type) {
        case LOAD_PROFILE:
            return {
                ...state,
                name: action.payload.name,
                bio: action.payload.bio,
                interests: action.payload.interests,
                ecoFriendlyActions: action.payload.ecoFriendlyActions,
                posts: action.payload.posts,
                followers: action.payload.followers
                
            };
        case UPDATE_PROFILE:
            return {
                ...state,
                ...action.payload
            };
        case CREATE_PROFILE:
            return {
                ...state,
                ...action.payload
            };
        case CLEAR_PROFILE:
            return {
                ...state,
                name: '',
                bio: '',
                interests: []
            };
            case ADD_ACTIONS:
                return {
                    ...state,
                    ...action.payload
                };
            case ADD_POST:
                return {
                    ...state,
                    ...action.payload
                };
            case LIKE_POST:
                return {
                    ...state,
                    ...action.payload
                };
            case COMMENT_POST:
                return {
                    ...state,
                    ...action.payload
                };
        default:
            return state;
    }
};

export default profileReducer;
