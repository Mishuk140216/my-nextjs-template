import { getLocalStorage } from "../actions";
// export const serverAddress = `http://localhost:3001`; // LOCAL SERVER
export const serverAddress = "https://impacttapestry.com"; // MAIN SERVER WITH NAME // USE THIS ONE

export const apiConfig = () => ({
	headers: { Authorization: `Bearer ${getLocalStorage(`token`)}` },
});

// AUTHENTICATION
export const userSignIn = serverAddress + `/api/auth/sign-in`;
export const userSignOut = serverAddress + `/api/auth/sign-out`;
export const userAuth = serverAddress + `/api/auth`;

// IMPACT AREA
export const getAllGlobalImpactAreas =
	serverAddress + `/api/impact-areas/global`;

// Organization Type
export const getAllOrganizationTypes =
	serverAddress + `/api/organization-types/`;

// USER
export const getAllIndividuals = serverAddress + `/api/users/individual`;
export const getAllOrganizations = serverAddress + `/api/users`;
