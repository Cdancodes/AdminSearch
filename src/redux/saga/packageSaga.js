import { put, select, takeLeading } from 'redux-saga/effects';
import * as actionTypes from '../actionTypes';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { getRequest, postRequest } from '../../utils/apiRequest';
import { api_url, create_package, delete_package, get_all_packages, get_package_by_id, update_package } from '../../config/constant';



function* getPackageById(actions) {
    try {
        const { id } = actions.payload || {};
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const response = yield postRequest({
            url: api_url + get_package_by_id,
            data: { id: id }
        });

        if (response?.success) {
            yield put({
                type: actionTypes.SET_PACKAGE_DETAILS,
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

function* createPackage(actions) {
    try {
        const { values, onNavigate } = actions.payload || {};

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const response = yield postRequest({
            url: api_url + create_package,
            data: values
        });

        if (response?.success) {
            const authToken = Cookies.get('jwt');
            console.log('Token:', authToken);
            toast.success('Package Created Successfully!');
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

function* getPackages(actions) {
    try {
        const { onNavigate } = actions.payload || {};
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const response = yield getRequest({
            url: api_url + get_all_packages
        });

        if (response?.success) {

            yield put({
                type: actionTypes.SET_PACKAGES,
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

function* deletePackage(actions) {
    try {
        const { id, onNavigate } = actions.payload || {};
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const response = yield postRequest({
            url: api_url + delete_package,
            data: { id: id }
        });

        if (response?.success) {
            const pack = yield select(state => state.packageReducer.packages)

            const packgs = pack.filter(dd => dd._id !== id)

            yield put({ type: actionTypes.SET_PACKAGES, payload: packgs });

            toast.success('Package delete Successfully!');
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

function* updatePackage(actions) {
    try {
        const { values, onNavigate } = actions.payload || {};

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const response = yield postRequest({
            url: api_url + update_package,
            data: values
        });

        if (response?.success) {
            const authToken = Cookies.get('jwt');
            console.log('Token:', authToken);
            toast.success('Package Updated Successfully!');
            if (typeof onNavigate === 'function') {
                onNavigate();
            }
        }

    } catch (e) {
        console.error('Error in updateCar:', e);
        toast.error('Something went wrong!');
    } finally {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}



export default function* carSaga() {
    yield takeLeading(actionTypes.CREATE_PACKAGE, createPackage);
    yield takeLeading(actionTypes.DELETE_PACKAGE, deletePackage);
    yield takeLeading(actionTypes.GET_PACKAGES, getPackages);
    yield takeLeading(actionTypes.GET_PACKAGE_BY_ID, getPackageById);
    yield takeLeading(actionTypes.UPDATE_PACKAGE, updatePackage)
}
