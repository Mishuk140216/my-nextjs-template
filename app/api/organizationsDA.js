import axios from "axios";
import * as APIPaths from "@/constants/api-paths";


class OrganizationDA {
	get_all_organizations = () => {
		return axios
			.get(APIPaths.getAllOrganizations, APIPaths.apiConfig())
			.then((response) => {
				return response.data;
			})
			.catch((err) => err.response.data);
	};
}

export default new OrganizationDA();
