export const getUserState = store => store.user;

export const getUserHasAuthenticated = store => store.userHasAuthenticated;

export const getUserEmail = store => getUserState(store) ? (getUserState(store).user.hasOwnProperty('email') ? getUserState(store).user.email : "") : "";

export const getRecruiterList = store => store.user.recruiterList;
