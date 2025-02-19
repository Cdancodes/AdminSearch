import { put, select, takeLeading } from 'redux-saga/effects';
import * as actionTypes from '../actionTypes';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { postRequest } from '../../utils/apiRequest';
import { api_url, create_banner, delete_banner, get_banners, update_banner } from '../../config/constant';

function* createBanner(actions) {
    try {
        const { values, onNavigate } = actions.payload || {};
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const response = yield postRequest({
            url: api_url + create_banner,
            data: values,
            header: "form"
        });

        if (response?.success) {
            const authToken = Cookies.get('jwt');
            console.log('Token:', authToken);
            toast.success('Banner Created Successfully!');
            if (typeof onNavigate === 'function') {
                onNavigate();
            }
        }

    } catch (e) {
        console.error('Error in createBanner:', e);
        toast.error('Something went wrong!');
    } finally {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* updateBanner(actions) {
    try {
        const { values, onNavigate } = actions.payload || {};
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const response = yield postRequest({
            url: api_url + update_banner,
            data: values
        });

        if (response?.success) {
            const authToken = Cookies.get('jwt');
            console.log('Token:', authToken);
            toast.success('Banner Updated Successfully!');
            if (typeof onNavigate === 'function') {
                onNavigate();
            }
        }

    } catch (e) {
        console.error('Error in updateBanner:', e);
        toast.error('Something went wrong')
    } finally {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* deleteBanner(actions) {
    try {
        const { id, onNavigate } = actions.payload || {};
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const response = yield postRequest({
            url: api_url + delete_banner,
            data: { bannerId : id } 
        });

        if (response?.success) {
             const banners = yield select(state => state.bannerReducer.banners)
            toast.success('Banner delete Successfully!');
             const updatedBanners = banners.filter(banner => banner._id !== id)
             
             yield put({ type: actionTypes.SET_BANNERS, payload: updatedBanners });

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

function* getBanners(actions) {
    try {
        const {  onNavigate } = actions.payload || {};
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const response = yield postRequest({
            url: api_url + get_banners,
            data: {}
        });

        if (response?.success) {

            yield put({
                type: actionTypes.SET_BANNERS,
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



export default function* bannerSaga() {
    yield takeLeading(actionTypes.CREATE_BANNER, createBanner);
    yield takeLeading(actionTypes.UPDATE_BANNER, updateBanner);
    yield takeLeading(actionTypes.DELETE_BANNER, deleteBanner);
    yield takeLeading(actionTypes.GET_BANEERS, getBanners);
}
