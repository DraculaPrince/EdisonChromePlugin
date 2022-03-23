/*
 *  TOKEN错误状态码
 *  40000: 签名解析失败【签名作为参数附在登录成功后的跳转链接中,key是"signature"】
 *  40001: 表示签名已过期
 *  40002: 表示用户信息不存在
 *  40003: 表示缺少token【token放在请求header中，key是"Token"】
 *  40004: 表示用户登录已过期
 *  40005: 表示token解析错误
 *  40006: 表示缺少前端router【router放在请求header中，key是"Router"】
 *  40007: 表示无权限
 * */

export const TOKEN_CODE_ERROR_LIST = [
	40000, 40001, 40002, 40003, 40004, 40005, 40006, 40007,
];

// 分页默认显示条数
export const PAGE_SIZE_OPTION = ["10", "20", "30", "40", "50"];

export const PAGINATION = {
	page: 1,
	limit: 10,
};

// 滚动值
export const SCROLL_X = 6000;

export const smsForbiddenString = ["%"];

export const FIELD_FORMAT_LIST = [
	{ key: "select", label: "下拉单选" },
	{ key: "selects", label: "下拉多选" },
	{ key: "input", label: "单行文本框" },
	{ key: "textarea", label: "多行文本框" },
	{ key: "year", label: "年份" },
	{ key: "date", label: "年月日" },
	{ key: "datetime", label: "年月日时分秒" },
];

export const ENV = {
	dev: window.location.origin,
	sit: `${window.location.origin}/dmp/`,
	uat: "https://radqa.byd.com:8080/dmp/",
	prod: "https://rad.byd.com/dmp/",
};

// export const SSO_LOGIN = `?s=App.Sso.Login&redirect=${ENV[process.env.REACT_APP_ENV]}`;

// 较大的抽屉宽度
export const DRAWER_LARGER_WIDTH = "70vw";

// 较小的抽屉宽度
export const DRAWER_SMALLER_WIDTH = "38vw";

// 年份格式
export const YEAR_FORMAT = "YYYY";
// 日期格式
export const DATE_FORMAT = "YYYY-MM-DD";
// 时间格式
export const DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm:ss";
