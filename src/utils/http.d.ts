interface Response {
	retCdoe: string;
	retData: object;
}

export function http.get({
	url: string,
	params: object,
	customOptions: object,
}): Promise<Response | object>;

export function http.post({
	url: string,
	data: object,
	customOptions: object,
}): Promise<Response | object>;
