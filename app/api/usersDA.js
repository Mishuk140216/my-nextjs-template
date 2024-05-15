import axios from "axios";
import * as APIPaths from "@/constants/api-paths";

class UserDA {
	get_all_users = () => {
		return axios
			.get(APIPaths.getAllIndividuals, APIPaths.apiConfig())
			.then((response) => {
				return response.data;
			})
			.catch((err) => err.response.data);
	};
}

export default new UserDA();
