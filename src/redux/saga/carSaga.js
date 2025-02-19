import { put, select, takeLeading } from 'redux-saga/effects';
import * as actionTypes from '../actionTypes';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { getRequest, postRequest } from '../../utils/apiRequest';
import { api_url, get_cars, delete_car, create_car, get_Car_by_id, update_car } from '../../config/constant';




function* getCarById(actions) {
    try {
        const { id } = actions.payload || {};
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const response = yield postRequest({
            url: api_url + get_Car_by_id,
            data: { _id: id }
        });

        if (response?.success) {
            yield put({
                type: actionTypes.SET_CAR_DETAILS,
                payload: response.data
            });
            if (typeof onSuccess === 'function') {
                onSuccess(response.data);
            }
        }

    } catch (e) {
        console.error('Error in getCarById:', e);
        if (typeof onError === 'function') {
            onError("Something went wrong.");
        }
    } finally {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* createCar(actions) {
    try {
        const { values, onNavigate } = actions.payload || {};

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const response = yield postRequest({
            url: api_url + create_car,
            data: values,
            header: "form"
        });

        if (response?.success) {
            const authToken = Cookies.get('jwt');
            console.log('Token:', authToken);
            toast.success('Car Created Successfully!');
            if (typeof onNavigate === 'function') {
                onNavigate();
            }
        }

    } catch (e) {
        console.error('Error in createCar:', e);
        toast.error('Something went wrong!')
    } finally {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* getCars(actions) {
    try {
        const { onNavigate } = actions.payload || {};
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const response = yield getRequest({
            url: api_url + get_cars
        });

        if (response?.success) {

            yield put({
                type: actionTypes.SET_CARS,
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

function* deleteCar(actions) {
    try {
        const { id, onNavigate } = actions.payload || {};
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const response = yield postRequest({
            url: api_url + delete_car,
            data: { _id: id }
        });

        if (response?.success) {
            const cars = yield select(state => state.carReducer.cars)
            toast.success('Car deleted successfully')
            const carD = cars.filter(car => car._id !== id)

            yield put({ type: actionTypes.SET_CARS, payload: carD });

            if (typeof onNavigate === 'function') {
                onNavigate();
            }
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (e) {
        console.error('Error in ', e);
        toast.error('Something  went wrong')
    } finally {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* updateCar(actions) {
    try {
        const { values, onNavigate } = actions.payload || {};

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const response = yield postRequest({
            url: api_url + update_car,
            data: values,
            header: "form"
        });

        if (response?.success) {
            const authToken = Cookies.get('jwt');
            console.log('Token:', authToken);
            toast.success('Card Updated Successfully!');
            if (typeof onNavigate === 'function') {
                onNavigate();
            }
        }

    } catch (e) {
        console.error('Error in updateCar:', e);
    } finally {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}



export default function* carSaga() {
    yield takeLeading(actionTypes.CREATE_CAR, createCar);
    yield takeLeading(actionTypes.DELETE_CAR, deleteCar);
    yield takeLeading(actionTypes.GET_CARS, getCars);
    yield takeLeading(actionTypes.GET_CAR_BY_ID, getCarById);
    yield takeLeading(actionTypes.UPDATE_CAR, updateCar)
}
