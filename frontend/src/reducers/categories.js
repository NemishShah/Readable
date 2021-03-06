import { GET_CATEGORIES } from "../actions/types";
import initialStates from './initialStates';

export default function categories(state = initialStates.categories, action) {
    switch (action.type) {
        case GET_CATEGORIES:
            return action.categories;
        default:
            return state;
    }
}