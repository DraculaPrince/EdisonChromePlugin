import { runInAction } from "mobx";
import { getHitokotoApi, getWeatherApi } from "../apis/userApi";

const CommonStore = () => ({
	hitokotoObj: {},
	weatherObj: {},

	async getHitokoto(data) {
		try {
			const res = await getHitokotoApi(data);
			if (res) {
				runInAction(() => {
					this.hitokotoObj = res;
				});
			}
		} catch (err) {
			console.log(`getHitokoto fail: ${JSON.stringify(err)}`);
		}
	},

	async getWeather(data) {
		try {
			const res = await getWeatherApi(data);
			if (res) {
				runInAction(() => {
					this.weather = res;
				});
			}
		} catch (err) {
			console.log(`getWeather fail: ${JSON.stringify(err)}`);
		}
	},
});
export default CommonStore;
