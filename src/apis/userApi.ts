import http from "../utils/http";

export const getCheckLoginOaApi = () =>
	http.get(
		"https://ehr.byd.com/hrms/self/calendarSchedule.do?actPara=listQuery"
	);

export const getCalcWorkPowerApi = () =>
	http.get("http://ehr.byd.com/hrms/self/kqcardls.do?actPara=queryKq");
