import axios from 'axios';
import axiosInstance from './axiosInstance';

const base_url = {

}

const removeBaseURL = url => {
  if (url.startsWith(base_url)) {
    return url.slice(base_url.length);
  }
  return url; 
};

export const postRequest = async ({
  url = null,
  data = null,
  header = 'json',
  timeout = 10000,
  verify = true,
}) => {
  const startTime = Date.now();
  try {
    const relativeURL = removeBaseURL(url);
    const token = {}
    console.log(token)
    const config = {
      method: 'post',
      url: relativeURL,
      headers: {
        'Content-Type':
          header === 'json' ? 'application/json' : 'multipart/form-data',
      },
      data: data,
      timeout, 
    };

    if (verify) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const response = await axiosInstance(config);
    const endTime = Date.now();
    console.log(`API call to ${url} took ${endTime - startTime} ms`);

    return response.data || null;
  } catch (e) {
    const endTime = Date.now();
    console.log(`API call to ${url} failed after ${endTime - startTime} ms`, e);
    return null;
  }
};

export const getRequest = async ({url = null, data = null}) => {
  try {
    const relativeURL = removeBaseURL(url);
    const response = await axiosInstance({
      method: 'get',
      url: relativeURL, 
    });

    if (response.data) {
      return response.data;
    }
    return null;
  } catch (e) {
    console.log(`API call to ${url} failed`, e);
    return null;
  }
};

export const blobRequest = async ({url = null, data = null}) => {
  try {
    const response = await RNFetchBlob.fetch(
      'POST',
      url,
      {
        'Content-Type': 'multipart/form-data',
      },
      data,
    );

    return JSON.parse(response.data);
  } catch (e) {
    console.log(e);
    return null;
  }
};