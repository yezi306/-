import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, Canceler } from 'axios';
import { stringify } from 'qs';
import { cloneDeep } from 'lodash-es';
/**
 * 创建实例
 */
let http: ReturnType<typeof axios.create>;

/**
 * 初始化
 */

const setupHttp = () => {
    http = axios.create({
        timeout: 60000,
        baseURL: '',
        withCredentials: false,
    });

    // Request Interceptor
    // @ts-ignore
    http.interceptors.request.use(async (config: AxiosRequestConfig) => {
        return config;
    });

    // Response Interceptor
    http.interceptors.response.use(
        (response: AxiosResponse) => {
            return response.data;
        },
        (error: AxiosError) => {
            return Promise.reject(error);
        },
    );
};

/**
 * 取消请求
 */
const CancelToken = axios.CancelToken;
const cancels: Canceler[] = [];
const cancelAllRequest = (message?: string) => {
    cancels.forEach((cancel) => cancel(message));
};

const cancelConfig: AxiosRequestConfig = {
    cancelToken: new CancelToken((cancel) => {
        cancels.push(cancel);
    }),
};

/**
 * Get
 */
const getConfig: AxiosRequestConfig = {
    ...cancelConfig,
};
const get = <R = any, P = any>(url: string, data?: P, config: AxiosRequestConfig = getConfig): Promise<R> => {
    config.params = data;
    return http.get(url, config);
};

/**
 * getArrayBuffer
 */
const getArrayBuffer = <R = any, P = any>(url: string, data?: P, config: AxiosRequestConfig = getConfig): Promise<R> => {
    let $config = cloneDeep(config);
    $config.params = data;
    $config.responseType = 'arraybuffer';
    return http.get(url, $config);
};

/**
 * Post
 */
const postConfig: AxiosRequestConfig = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    transformRequest: (data: any, headers: any) => {
        return stringify(data);
    },
    ...cancelConfig,
};
const post = <R = any, P = any>(url: string, data?: P, config: AxiosRequestConfig = postConfig): Promise<R> => {
    return http.post(url, data || {}, config);
};

/**
 * Post Json
 */
const postJsonConfig: AxiosRequestConfig = {
    headers: {
        'Content-Type': 'application/json',
    },
    transformRequest: (data: any) => {
        return JSON.stringify(data);
    },
    ...cancelConfig,
};

const postJson = <R = any, P = any>(url: string, data?: P, config: AxiosRequestConfig = postJsonConfig): Promise<R> => {
    return http.post(url, data || {}, config);
};

/**
 * Post FormBody
 */
const postFormConfig: AxiosRequestConfig = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    ...cancelConfig,
};

const postForm = <R = any, P = any>(url: string, data?: P, config: AxiosRequestConfig = postFormConfig): Promise<R> => {
    return http.post(url, data || {}, config);
};

const postFormData = <R = any, P = any>(url: string, data?: any, config: AxiosRequestConfig = postFormConfig): Promise<R> => {
    const params = new FormData();
    for (const key in data) {
        params.append(key, data[key]);
    }
    return http.post(url, params || {}, config);
};

/**
 * Post Multipart
 */
const postMultipartConfig: AxiosRequestConfig = {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
    ...cancelConfig,
};

const postMultipart = <R = any, P = any>(url: string, data?: P, config: AxiosRequestConfig = postMultipartConfig): Promise<R> => {
    return http.post(url, data || {}, config);
};

export { http, setupHttp };
export { get, post, postForm, postJson, postMultipart, postFormData, getArrayBuffer };
export { getConfig, postConfig, postFormConfig, postJsonConfig, postMultipartConfig };
export { cancelAllRequest, cancels, CancelToken };

