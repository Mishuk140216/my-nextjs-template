import axios from "axios";
import * as APIPaths from "@/constants/api-paths";
import { apiConfig } from "@/constants/api-paths";

class AuthDA {
	sign_in = (user) => {
		return axios
			.post(APIPaths.userSignIn, user)
			.then((response) => {
				return response.data;
			})
			.catch((err) => err.response.data);
	};
	sign_out = () => {
		console.log("SIGN OUT");
		return axios
			.post(APIPaths.userSignOut, {}, apiConfig())
			.then((response) => {
				console.log(response);
				return response.data;
			})
			.catch((err) => {
				console.log(err.response);
				return err.response.data;
			});
	};

	user_auth = () => {
		return axios
			.get(APIPaths.userAuth)
			.then((response) => response.data)
			.catch((err) => err.response.data);
	};
}

export default new AuthDA();
