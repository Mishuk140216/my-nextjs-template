//HOME
export const home = "/";
// AUTHENTICATION
export const login = "/auth/login";
export const sign_out = "/auth/sign_out";

// FEEDBACKS
export const feedbacks_list = "/feedbacks/list";
export const feedback_details = (feedbackId) =>
	`/feedbacks/details/${feedbackId}`;

// IMPACT AREAS
export const impact_areas_list = "/uikit/impact-areas";
export const impact_areas_create = "/impact_areas/new";
export const impact_areas_edit = (impactAreaId) =>
	`/impact_areas/edit/${impactAreaId}`;

// ORGANIZATION TYPES
export const organization_types_list = "/uikit/org-types";
export const organization_types_create = "/organization_types/new";
export const organization_types_edit = (organizationTypeId) =>
	`/organization_types/edit/${organizationTypeId}`;

// ORGANIZATIONS
export const organizations_list = "/uikit/organizations";
export const organizations_create = "/organizations/new";
export const organizations_edit = (organizationId) =>
	`/organizations/edit/${organizationId}`;

// USERS
export const users_list = "/uikit/users";
export const users_create = "/users/new";
export const users_edit = (userId) => `/users/edit/${userId}`;

// POSTS
export const posts_list = "/posts/list";
export const posts_create = "/posts/new";
export const posts_edit = (postId) => `/posts/edit/${postId}`;

// SKILLS
export const skills_list = "/skills/list";
export const skills_create = "/skills/new";
export const skills_edit = (skillId) => `/skills/edit/${skillId}`;
