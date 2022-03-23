import { runInAction } from "mobx";
import { getCalcWorkPowerApi, getCheckLoginOaApi } from "../apis/userApi";

const UserStore = () => ({
	checkLoginOaObj: {},
	calcWorkPowerObj: {},

	async getCheckLoginOa() {
		try {
			const res = await getCheckLoginOaApi();
			if (res) {
				runInAction(() => {
					this.checkLoginOaObj = res;
				});
			}
		} catch (err) {
			console.log(`getCheckLoginOa fail: ${JSON.stringify(err)}`);
		}
	},

	async getCalcWorkPower() {
		try {
			const res = await getCalcWorkPowerApi();
			if (res) {
				runInAction(() => {
					this.calcWorkPowerObj = res;
				});
			}
		} catch (err) {
			console.log(`getCalcWorkPower fail: ${JSON.stringify(err)}`);
		}
	},
});
export default UserStore;
