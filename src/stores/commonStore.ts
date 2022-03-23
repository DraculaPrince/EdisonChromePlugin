import { runInAction } from "mobx";
import { getHitokotoApi, getWeatherApi } from "../apis/commonApi";

const CommonStore = () => ({
	hitokotoObj: {},
	weatherObj: {},

	async getHitokoto() {
		try {
			const res = await getHitokotoApi();
			if (res) {
				runInAction(() => {
					this.hitokotoObj = res;
				});
			}
		} catch (err) {
			console.log(`getHitokoto fail: ${JSON.stringify(err)}`);
		}
	},

	async getWeather() {
		try {
			const res = await getWeatherApi();
			if (res) {
				runInAction(() => {
					this.weatherObj = res;
				});
			}
		} catch (err) {
			console.log(`getWeather fail: ${JSON.stringify(err)}`);
		}
	},
});
export default CommonStore;
