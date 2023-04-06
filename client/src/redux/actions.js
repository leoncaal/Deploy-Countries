import axios from 'axios';
import {GETALLCOUNTRIES, 
    GETCOUNTRYDETAIL, 
    GETCOUNTRYBYNAME, 
    CLEANCOUNTRYSEARCH, 
    CLEANCOUNTRYDETAIL, 
    ADDACTIVITY, 
    GETACTIVITIES, 
    ORDER, 
    FILTER, 
    //FILTERBYDIF, 
    RESETFILTERS, 
    CURRENTPAGE} from './actions.types';

export const getAllCountries = () => {
    return async function (dispatch) {
        try {
            const response = await axios('/countries/');
            return dispatch({type: GETALLCOUNTRIES , payload: response.data});
        } catch (error) {
            window.alert (error.response.data);
        }
    } 
}

export const getCountryDetail = (id) => {
    return async function (dispatch) {
        try {
            const response = await axios(`/countries/${id}`);
            return dispatch({type:GETCOUNTRYDETAIL, payload: response.data});
        } catch (error) {
            window.alert (error.response.data);
        }
    }
}

export const getCountryByName = (country) => {
    return async function (dispatch) {
        try {
            const response = await axios(`/countries/?name=${country}`);
            return dispatch({type:GETCOUNTRYBYNAME, payload: response.data});
        } catch (error) {
            window.alert(error.response.data);
        }
    }
}

export const addActivity = (activity) => {
    return async function (dispatch) {
        try {
            const response = await axios.post("/activities/", activity);
            return dispatch({ type: ADDACTIVITY, payload: response.data });
        } catch (error) {
            window.alert(error.response.data)
        }
    };
  };

  export const getActivities = () => {
    return async function (dispatch) {
        try {
            const response = await axios("/activities/");
            return dispatch({type: GETACTIVITIES, payload:response.data})
        } catch (error) {
            //window.alert(error.response.data);
        }
    }
  }

export const orderCountries = (value) => {
    return ({type: ORDER, payload: value});
}
export const filter = (value) => {
    return ({type: FILTER, payload: value});
}

/* export const filterByDif = (value) => {
    return ({type: FILTERBYDIF, payload: value});
} */

export const resetFilters = () => {
    return ({type: RESETFILTERS});
}

export const cleanCountryDetail = () => {
    return ({type: CLEANCOUNTRYDETAIL});
}

export const cleanCountrySearch = () => {
    return ({type: CLEANCOUNTRYSEARCH});
}

export const currentPage = (value) => {
    return ({type:CURRENTPAGE, payload: value });
};