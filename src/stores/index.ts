import React from "react";
import CommonStore from "./commonStore";
import UserStore from "./userStore";

const storesContext = React.createContext({
	commonStore: CommonStore(),
	userStore: UserStore(),
});
export default storesContext;
