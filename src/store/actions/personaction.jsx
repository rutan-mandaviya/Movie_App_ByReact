import axios from "../../utils/axios";
import { loadperson } from "../reducers/personSlice";

export const asyncloadperson = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/person/${id}`);
    const externalid = await axios.get(`/person/${id}/external_ids`);
    const combined_credits = await axios.get(`/person/${id}/combined_credits`);
    const tv_credits = await axios.get(`/person/${id}/tv_credits`);
    const movie_credits = await axios.get(`/person/${id}/movie_credits`);

    let theultimatedata = {
      detail: detail.data,
      externalid: externalid.data,
      combined_credits: combined_credits.data,
      tv_credits: tv_credits.data,
      movie_credits: movie_credits.data,
    };

   
    dispatch(loadperson(theultimatedata));
  } catch (error) {
    console.log("Error :", error);
  }
};
