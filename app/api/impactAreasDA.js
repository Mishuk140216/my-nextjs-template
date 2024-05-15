import axios from "axios";
import * as APIPaths from "@/constants/api-paths"; 

class ImpactAreaDA {
	get_all_impact_areas = () => {
		return axios
			.get(APIPaths.getAllGlobalImpactAreas, APIPaths.apiConfig())
			.then((response) => {
				return response.data;
			})
			.catch((err) => err.response.data);
	};
}

export default new ImpactAreaDA();
