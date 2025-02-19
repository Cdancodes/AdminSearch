import { put, takeLeading } from 'redux-saga/effects';
import * as actionTypes from '../actionTypes';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { postRequest } from '../../utils/apiRequest';
import { api_url, auth_login } from '../../config/constant';


function* loginRequest(actions) {
    try {
        const { values, onNavigate, setSubmitting } = actions.payload || {}
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })

        const responce = yield postRequest({
            url: api_url + auth_login,
            data: values
        })

        if (responce?.success) {
            const authToken = Cookies.get('jwt');
            console.log('Token:', authToken);
            toast.success('Login Successful!');
            onNavigate();
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        setSubmitting(false);

    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        toast.error('Something went wrong!');
        console.log(e);
        if (actions.payload?.setSubmitting) {
            actions.payload.setSubmitting(false);
        }
    }
}

export default function* loginSaga() {
    yield takeLeading(actionTypes.LOGIN_REQUEST, loginRequest)
}