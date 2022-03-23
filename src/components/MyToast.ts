import { message } from "antd";

export const hideToast = (key?: any) => {
	message.destroy(key);
};

export const loadingToast = ({
	msg = "加载中...",
	duration = 0,
	key,
}: {
	msg: String;
	duration?: any;
	key?: any;
}) => {
	hideToast();
	return message.loading(msg, duration, key);
};

export const infoToast = ({
	msg,
	duration = 2.5,
}: {
	msg?: String;
	duration?: any;
}) => {
	hideToast();
	return message.info(msg || "提示内容", duration);
};

export const successToast = ({
	msg,
	duration = 2,
	key,
}: {
	msg: String;
	duration?: any;
	key?: any;
}) => {
	hideToast();
	return message.success(msg || "已完成", duration, key);
};

export const errorToast = ({
	msg,
	duration = 2,
	key,
}: {
	msg: String;
	duration?: any;
	key?: any;
}) => {
	hideToast();
	return message.error(msg || "系统接口异常", duration, key);
};

export const warningToast = ({
	msg,
	duration = 2,
	key,
}: {
	msg: String;
	duration?: any;
	key?: any;
}) => {
	hideToast();
	return message.error(msg || "系统接口异常", duration, key);
};
