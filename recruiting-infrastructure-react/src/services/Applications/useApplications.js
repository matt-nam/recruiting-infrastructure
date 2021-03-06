import { useSelector, useDispatch } from "services/applications/node_modules/react-redux";
import { getCurrentApplication, getApplicationsStatus, getApplicationsByOptions } from "services/applications/selectors";

export default function useApplications() {
    const applications = useSelector(state => {
        return getApplicationsByOptions(state);
    });
    const currentApplication = useSelector(state => {
        return getCurrentApplication(state);
    });
    const status = useSelector(state => {
        return getApplicationsStatus(state)
    });
    const dispatch = useDispatch();
    return {
        applications,
        currentApplication,
        status,
        dispatch,
    }
}
