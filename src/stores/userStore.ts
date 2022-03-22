import { runInAction } from "mobx";
import { getCalcWorkPowerApi, getCheckLoginOaApi } from "../apis/userApi";

const UserStore = () => ({
	checkLoginOaObj: {},
	calcWorkPowerObj: {},

	async getCheckLoginOa(data) {
		try {
			const res = await getCheckLoginOaApi(data);
			if (res) {
				runInAction(() => {
					this.checkLoginOaObj = res;
				});
			}
		} catch (err) {
			console.log(`getCheckLoginOa fail: ${JSON.stringify(err)}`);
		}
	},

	async getCalcWorkPower(data) {
		try {
			const res = await getCalcWorkPowerApi(data);
			if (res) {
				runInAction(() => {
					this.calcWorkPower = res;
				});
			}
		} catch (err) {
			console.log(`getCalcWorkPower fail: ${JSON.stringify(err)}`);
		}
	},
});
export default UserStore;
