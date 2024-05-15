import axios from "axios";
import * as APIPaths from "@/constants/api-paths";

class OrganizationTypeDA {
	get_all_organization_types = () => {
		return axios
			.get(APIPaths.getAllOrganizationTypes, APIPaths.apiConfig())
			.then((response) => {
				return response.data;
			})
			.catch((err) => err.response.data);
	};
}

export default new OrganizationTypeDA();
