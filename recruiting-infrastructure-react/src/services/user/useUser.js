import { useSelector, useDispatch } from "react-redux";
import { getUserState, getUserHasAuthenticated } from "services/user/selectors";

export default function useUser() {
    const user = useSelector(state => {
        return getUserState(state);
    });
    const userHasAuthenticated = useSelector(state => {
        return getUserHasAuthenticated(state);
    });
    const dispatch = useDispatch();
    return {
        user,
        userHasAuthenticated,
        dispatch,
    }
}
