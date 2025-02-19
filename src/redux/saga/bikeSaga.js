import { put, select, takeLeading } from 'redux-saga/effects';
import * as actionTypes from '../actionTypes';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { getRequest, postRequest } from '../../utils/apiRequest';
import { api_url, create_bike, get_bikes, delete_bike, get_bike_by_id, update_bike } from '../../config/constant';




function* createBike(actions) {
    try {
        const { values, onNavigate } = actions.payload || {};
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const response = yield postRequest({
            url: api_url + create_bike,
            data: values,
            header: "form"
        });

        if (response?.success) {
            const authToken = Cookies.get('jwt');
            console.log('Token:', authToken);
            toast.success('Bike Created Successfully!');
            if (typeof onNavigate === 'function') {
                onNavigate();
            }
        }

    } catch (e) {
        console.error('Error in createCar:', e);
        toast.error('Something went wrong!');
    } finally {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* getBikes(actions) {
    try {
        const {  onNavigate } = actions.payload || {};
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const response = yield getRequest({
            url: api_url + get_bikes
        });

        if (response?.success) {

            yield put({
                type: actionTypes.SET_BIKES,
                payload: response.data
            });
            
            if (typeof onNavigate === 'function') {
                onNavigate();
            }
        }

    } catch (e) {
        console.error('Error in updateBanner:', e);
    } finally {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* getBikeById(actions) {
    try {
        const { id } = actions.payload || {};
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const response = yield postRequest({
            url: api_url + get_bike_by_id, 
            data: { _id : id }
        });

        if (response?.success) {
            yield put({
                type: actionTypes.SET_BIKE_DETAILS,
                payload: response.data
            });

            if (typeof onSuccess === 'function') {
                onSuccess(response.data);
            }
        } 

    } catch (e) {
        console.error('Error in getBikeById:', e);
        if (typeof onError === 'function') {
            onError("Something went wrong.");
        }
    } finally {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* updateBike(actions) {
    try {
        const { values, onNavigate } = actions.payload || {};

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const response = yield postRequest({
            url: api_url + update_bike,
            data: values,
            header: "form"
        });

        if (response?.success) {
            const authToken = Cookies.get('jwt');
            console.log('Token:', authToken);
            toast.success('Bike Updated Successfully!');
            if (typeof onNavigate === 'function') {
                onNavigate();
            }
        }

    } catch (e) {
        console.error('Error in updateCustomer:', e);
        toast.error('Something went wrong!');
        if (typeof onError === 'function') {
            onError("Something went wrong.");
        }
    } finally {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* deleteBike(actions) {
    try {
        const { id, onNavigate } = actions.payload || {};
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const response = yield postRequest({
            url: api_url + delete_bike,
            data: { _id : id } 
        });

        if (response?.success) {
             const bikes = yield select(state => state.bikeReducer.bikes)
            toast.success('bike deleted Successfully!');
             const updateBike = bikes.filter(bike => bike._id !== id)
             
             yield put({ type: actionTypes.SET_BIKES, payload: updateBike });

            if (typeof onNavigate === 'function') {
                onNavigate();
            }
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (e) {
        console.error('Error in ', e);
        toast.error('Something went wrong!');
    } finally {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}



export default function* bikeSaga() {
    yield takeLeading(actionTypes.CREATE_BIKE, createBike);
    yield takeLeading(actionTypes.DELETE_BIKE, deleteBike);
    yield takeLeading(actionTypes.GET_BIKES, getBikes);
    yield takeLeading(actionTypes.GET_BIKE_BY_ID, getBikeById);
    yield takeLeading(actionTypes.UPDATE_BIKE, updateBike)
}
