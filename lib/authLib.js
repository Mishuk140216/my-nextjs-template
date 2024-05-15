import { userAuth } from "@/actions";
import * as RoutePaths from "@/constants/route-paths";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AuthLib = ({ children }) => {
	const { push } = useRouter();
	useEffect(() => {
		const { isAuth, user} = userAuth();
		console.log(isAuth);
		if (!isAuth) {
			push(RoutePaths.home);
		}
	}, []);
	return <>{children}</>;
};

export default AuthLib;
