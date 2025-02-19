import { put, select, takeLeading } from 'redux-saga/effects';
import * as actionTypes from '../actionTypes';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { postRequest } from '../../utils/apiRequest';
import { api_url, get_customers, delete_customer, create_customer, get_customer_by_id, update_customer } from '../../config/constant';


function* getCustomerById(actions) {
    try {
        const { id } = actions.payload || {};
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const response = yield postRequest({
            url: api_url + get_customer_by_id,
            data: { id: id }
        });

        if (response?.success) {
            yield put({
                type: actionTypes.SET_CUSTOMER_DETAILS,
                payload: response.data
            });

            if (typeof onSuccess === 'function') {
                onSuccess(response.data);
            }
        }

    } catch (e) {
        console.error('Error in getCustomerById:', e);
        if (typeof onError === 'function') {
            onError("Something went wrong.");
        }
    } finally {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* updateCustomer(actions) {
    try {
        const { values, onNavigate } = actions.payload || {};

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const response = yield postRequest({
            url: api_url + update_customer,
            data: values,
            header: "form"
        });

        if (response?.success) {
            const authToken = Cookies.get('jwt');
            console.log('Token:', authToken);
            toast.success('customer details updated')
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

function* createCustomer(actions) {
    try {
        const { values, onNavigate } = actions.payload || {};
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const response = yield postRequest({
            url: api_url + create_customer,
            data: values,
            header: "form"
        });

        if (response?.success) {
            const authToken = Cookies.get('jwt');
            console.log('Token:', authToken);
            toast.success('Customer Created Successfully!');
            if (typeof onNavigate === 'function') {
                onNavigate();
            }
        }

    } catch (e) {
        console.error('Error in createCustomer:', e);
        toast.error('Something went wrong!');
    } finally {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* getCustomers(actions) {
    try {
        const { page, limit } = actions.payload || {};

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const response = yield postRequest({
            url: api_url + get_customers,
            data: { page, limit }
        });

        if (response?.success) {
            yield put({
                type: actionTypes.SET_CUSTOMERS,
                payload: {
                    customers: response.data.customers,
                    totalPages: response.data.totalPages,
                    currentPage: response.data.currentPage,
                    totalCustomers: response.data.totalCustomers
                }
            });
        }
    } catch (e) {
        console.error('Error in getCustomers:', e);
        yield put({ type: actionTypes.SET_ERROR, payload: e.message });
    } finally {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}


function* deleteCustomer(actions) {
    try {
        const { id, onNavigate } = actions.payload || {};
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const response = yield postRequest({
            url: api_url + delete_customer,
            data: { id }
        });

        if (response?.success) {
            const customerData = yield select(state => state.customerReducer.customers);
            toast.success('Customer deleted successfully')
            const updatedCustomers = {
                ...customerData,
                customers: customerData?.filter(customer => customer._id !== id) || []
            };

            yield put({ type: actionTypes.SET_CUSTOMERS, payload: updatedCustomers });

            if (typeof onNavigate === 'function') {
                onNavigate();
            }
        }

    } catch (e) {
        console.error('Error in deleteCustomer:', e);
        toast.error('Something went wrong!');
    } finally {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

export default function* customerSaga() {
    yield takeLeading(actionTypes.CREATE_CUSTOMER, createCustomer);
    yield takeLeading(actionTypes.DELETE_CUSTOMER, deleteCustomer);
    yield takeLeading(actionTypes.GET_CUSTOMERS, getCustomers);
    yield takeLeading(actionTypes.GET_CUSTOMER_BY_ID, getCustomerById);
    yield takeLeading(actionTypes.UPDATE_CUSTOMER, updateCustomer);
}
