/**
 * Grabs email state
 * @param {*} store 
 */
export const getEmailState = store => store;

/**
 * Gets the email data
 * @param {*} store 
 */
export const getEmail = store =>
    getEmailState(store) ? getEmailState(store) : "";