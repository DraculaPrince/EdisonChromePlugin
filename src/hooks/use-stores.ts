import React from "react";
import storesContext from "../store";
import CommonStore from "../store/commonStore";
import UserStore from "../store/userStore";

export const useStores = () => React.useContext(storesContext);

export const publicStores = () => ({
	commonStore: CommonStore(),
	userStore: UserStore(),
});
