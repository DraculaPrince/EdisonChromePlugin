import axios from 'axios';
import { errorToast } from '../components/MyToast';
import { SSO_LOGIN, TOKEN_CODE_ERROR_LIST } from './constant';

if (process.env.REACT_APP_ENV === 'mock') {
	require('../mock');
}

export const appBaseUrl =
	process.env.REACT_APP_BASE_URL && process.env.REACT_APP_ENV !== 'dev' ? process.env.REACT_APP_BASE_URL : 'api/';

/**
 * 生成每个请求唯一的键
 * @param {*} config
 * @returns string
 */
function getPendingKey(config) {
	let { data } = config;
	const { url, method, params } = config;
	if (typeof data === 'string') data = JSON.parse(data); // response里面返回的config.data是个字符串对象
	// console.log('getPendingKey', [url, method, JSON.stringify(params), JSON.stringify(data)].join('&'));
	return [url, method, JSON.stringify(params), JSON.stringify(data)].join('&');
}
const pendingMap = new Map();
/**
 * 储存每个请求唯一值, 也就是cancel()方法, 用于取消请求
 * @param {*} config
 */
function addPending(config) {
	const pendingKey = getPendingKey(config);
	config.cancelToken =
		config.cancelToken ||
		new axios.CancelToken((cancel) => {
			if (!pendingMap.has(pendingKey)) {
				pendingMap.set(pendingKey, cancel);
			}
		});
	// console.log('addPending', JSON.stringify(config.cancelToken));
}
/**
 * 删除重复的请求
 * @param {*} config
 */
function removePending(config) {
	const pendingKey = getPendingKey(config);
	if (pendingMap.has(pendingKey)) {
		const cancelToken = pendingMap.get(pendingKey);
		cancelToken(pendingKey);
		pendingMap.delete(pendingKey);
	}
}
/**
 * 处理异常
 * @param {*} error
 */
function httpErrorStatusHandle(error) {
	let message = '';
	if (error && error.response) {
		switch (error.response.status) {
			case 302:
				message = '接口重定向了！';
				break;
			case 400:
				message = '参数不正确！';
				break;
			case 401:
				message = '您未登录，或者登录已经超时，请先登录！';
				break;
			case 403:
				message = '您没有权限操作！';
				break;
			case 404:
				message = `请求地址出错: ${error.response.config.url}`;
				break; // 在正确域名下
			case 408:
				message = '请求超时！';
				break;
			case 409:
				message = '系统已存在相同数据！';
				break;
			case 500:
				message = '服务器内部错误！';
				break;
			case 501:
				message = '服务未实现！';
				break;
			case 502:
				message = '网关错误！';
				break;
			case 503:
				message = '服务不可用！';
				break;
			case 504:
				message = '服务暂时无法访问，请稍后再试！';
				break;
			case 505:
				message = 'HTTP版本不受支持！';
				break;
			default:
				message = '异常问题，请联系管理员！';
				break;
		}
	}
	if (error.message.includes('timeout')) {
		message = '网络请求超时！';
	}
	if (error.message.includes('Network')) {
		message = window.navigator.onLine ? '服务端异常！' : '您断网了！';
	}
	return errorToast({ msg: message });
}
const http = axios.create({
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json;charset=utf-8',
		// 'Content-Type': 'application/vnd.ms-excel;charset=UTF-8',
	},
});

http.interceptors.request.use(
	async (config) => {
		const _config = config;
		removePending(_config);
		if (_config.repeat_request_cancel) addPending(_config);
		_config.url = appBaseUrl + _config.url;
		const token = localStorage.getItem('token');
		if (token && typeof window !== 'undefined') {
			_config.headers.token = token;
		}
		// console.log(`%c ${JSON.stringify(_config.url)}---请求头信息---${JSON.stringify(_config)}`, 'color:green;');
		return _config;
	},
	(error) => Promise.reject(error),
);

http.interceptors.response.use(
	(response) => {
		const apiName = response?.config?.apiName;
		if (response && response.data && [...TOKEN_CODE_ERROR_LIST].indexOf(response.data.ret) > -1) {
			if (
				response?.data?.ret === 40005 ||
				response?.data?.ret === 40004 ||
				response?.data?.ret === 40000 ||
				response?.data?.ret === 40001
			) {
				window.location.href = appBaseUrl + SSO_LOGIN;
				return false;
			}
			removePending(response.config);
			// window.location.hash = '/NotFound';

			errorToast({ msg: `${apiName || ''}${response.data.msg}` });
			return Promise.reject(response.data);
		} else if ((response && response.status !== 200) || (response && response.data && response.data.ret !== 200)) {
			errorToast({ msg: `${apiName || ''}${response.data.msg}` });
			removePending(response.config);
			return Promise.reject(response.data);
		} else {
			removePending(response.config);
			return typeof response.data.data !== 'undefined' && response.data.data !== null
				? response.data.data
				: response.data;
		}
	},
	(error) => {
		if (axios.isCancel(error)) {
			// 处理被取消的请求
			removePending(error);
			console.error(`请求的重复请求：${error.message}`);
		}
		if (error?.config?.error_message_show) httpErrorStatusHandle(error);
		return Promise.reject(error);
	},
);

http.get = (
	url,
	params,
	customOptions = {
		repeat_request_cancel: true, // 是否开启取消重复请求, 默认为 true
		error_message_show: true, // 是否开启接口错误信息展示,默认为true
	},
) =>
	http({
		method: 'get',
		url,
		params,
		...customOptions,
	});

http.post = (
	url,
	data,
	customOptions = {
		repeat_request_cancel: true, // 是否开启取消重复请求, 默认为 true
		error_message_show: true, // 是否开启接口错误信息展示,默认为true
	},
) =>
	http({
		method: 'post',
		url,
		data,
		...customOptions,
	});

// axios跨域方法
axios.jsonp = (url) =>
	new Promise((resolve) => {
		window.jsonCallBack = (result) => {
			resolve(result);
		};
		const JSONP = document.createElement('script');
		JSONP.type = 'text/javascript';
		JSONP.src = `${url}&callback=jsonCallBack`;
		document.getElementsByTagName('head')[0].appendChild(JSONP);
		setTimeout(() => {
			document.getElementsByTagName('head')[0].removeChild(JSONP);
		}, 500);
	});

export default http;
