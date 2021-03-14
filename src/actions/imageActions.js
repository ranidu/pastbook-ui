import axios from "axios";
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
} from "./types";
import { API_URL, AMS_API_URL } from "../config/local";

var config = {
    headers: {'Access-Control-Allow-Origin': '*'},
    crossDomain: true
};

export const getImages = () => {
    return (dispatch) => {
        dispatch({ type: RETRIEVE_IMAGES_STARTED });
        axios.get(`${AMS_API_URL}/collection/CHhASmTpKjaHyAsSaauThRqMMjWanYkQ.json`, config)
        .then((resp) => {
            const {entries} = resp.data;
            dispatch({ type: RETRIEVE_IMAGES_COMPLETED, images: entries });
        })
        .catch((e) => {
            dispatch({ type: RETRIEVE_IMAGES_FAILED, error: e })
        })
    }
}

export const saveList = (args) => {
    return (dispatch) => {
        dispatch({ type: SAVE_LIST_STARTED })
        axios.post(`${API_URL}/image`, args)
        .then((resp) => {
            const { images } = resp.data;
            dispatch({ type: SAVE_LIST_COMPLETED, list: images});
        })
        .catch((e) => {
            dispatch({ type: SAVE_LIST_FAILED, error: e });
        })
    }
}

export const getList = () => {
    return (dispatch) => {
        dispatch({ type: RETRIEVE_LIST_STARTED })
        axios.get(`${API_URL}/images`)
        .then((resp) => {
            const { images } = resp.data;
            dispatch({ type: RETRIEVE_LIST_COMPLETED, list: images});
        })
        .catch((e) => {
            dispatch({ type: RETRIEVE_LIST_FAILED, error: e });
        })
    }
}