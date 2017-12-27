import * as api from "../utils/api";
import { GET_CATEGORIES } from "./types";

export const getAllCategories = () => dispatch => (
        api
            .getAllCategories()
            .then(categories => dispatch(getCategories(categories))
    )
);

export const getCategories = categories => ({
    type: GET_CATEGORIES,
    categories: categories
});