// import AuthDA from "@/data_access/authDA";

export const setLocalStorage = (key, value) => {
	if (window !== "undefined") {
		localStorage.setItem(key, JSON.stringify(value));
	}
};
export const removeLocalStorage = (key) => {
	if (window !== "undefined") {
		localStorage.removeItem(key);
	}
};
export const getLocalStorage = (key) => {
	if (window !== "undefined") {
		return JSON.parse(localStorage.getItem(key));
	}
};

export const printLocalStorage = () => {
	Object.entries(localStorage).map(([key, valueJSON]) => {
		const value = JSON.parse(valueJSON);

		return value;
	});
};
export const authenticate = ({ user, token, basicInfo }) => {
	if (user) setLocalStorage("user", user); else removeLocalStorage("user");
	if (token) setLocalStorage("token", token); else removeLocalStorage("token")
	if (basicInfo) setLocalStorage("basicInfo", basicInfo); else removeLocalStorage("basicInfo")
};

export const userAuth = () => {
	if (window !== "undefined") {
		const token = getLocalStorage("token");
		const user = getLocalStorage("user");

		if (token && user) {
			return {
				isAuth: true,
				user,
			};
		} else
			return {
				isAuth: false,
				user: {},
			};
	}
};
