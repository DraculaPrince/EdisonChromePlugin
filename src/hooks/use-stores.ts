import React from "react";
import storesContext from "../stores";
import CommonStore from "../stores/commonStore";
import UserStore from "../stores/userStore";

export const useStores = () => React.useContext(storesContext);

export const publicStores = () => ({
	commonStore: CommonStore(),
	userStore: UserStore(),
});
