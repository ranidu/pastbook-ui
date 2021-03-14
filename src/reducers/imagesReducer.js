import {
  RETRIEVE_IMAGES_STARTED,
  RETRIEVE_IMAGES_COMPLETED,
  RETRIEVE_IMAGES_FAILED,
  SAVE_LIST_STARTED,
  SAVE_LIST_COMPLETED,
  SAVE_LIST_FAILED,
  RETRIEVE_LIST_STARTED,
  RETRIEVE_LIST_COMPLETED,
  RETRIEVE_LIST_FAILED
} from "../actions/types";

const INIT_STATE = {
    images: [],
    list: [],
    loading: false,
    error: false,
    errors: null
}

export default function imageReducer(state = INIT_STATE, action) {
    switch(action.type) {
        case RETRIEVE_IMAGES_STARTED:
            return ({ ...state, loading: true, error: false })
        case RETRIEVE_IMAGES_COMPLETED:
            return ({ ...state, loading: false, error: false, images: action.images })
        case RETRIEVE_IMAGES_FAILED:
            return ({ ...state, loading: false, error: true, errors: action.error })     
        case SAVE_LIST_STARTED:
            return ({ ...state, loading: true, error: false, list: [] })
        case SAVE_LIST_COMPLETED:
            return ({ ...state, loading: false, error: false, list: action.list })
        case SAVE_LIST_FAILED:
            return ({ ...state, loading: false, error: true, errors: action.error, list: [] })     
        case RETRIEVE_LIST_STARTED:
            return ({ ...state, loading: true, error: false, list: null })
        case RETRIEVE_LIST_COMPLETED:
            return ({ ...state, loading: false, error: false, list: action.list })
        case RETRIEVE_LIST_FAILED:
            return ({ ...state, loading: false, error: true, errors: action.error, list: [] })     
        default:
            return state;       
    }
}