import http from "../utils/http";

export const getHitokotoApi = () => http.get("https://v1.hitokoto.cn/");

export const getWeatherApi = () =>
	http.get(
		"https://www.tianqiapi.com/api?unescape=1&version=v6&appid=33896864&appsecret=BR49xbsH&city=" +
			123
	);
