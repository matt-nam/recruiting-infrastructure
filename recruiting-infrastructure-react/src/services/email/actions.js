

export const fetchEmail = (dispatch) => {
    dispatch({ type: FETCHING_EMAIL })
    client.get('main-app', '/partners')
        .then(r => {
            let res = partnerListFactory(r)
            dispatch({
                type: FETCH_PARTNERS,
                payload: res
            })
        })
        .catch(err => {
            console.error(err); // log since might be a render err
            dispatch({
                type: FETCH_PARTNERS_FAILED,
                payload: err
            });
        })
}