import { useSelector, useDispatch } from "react-redux";
import { getCurrentApplication, getApplicationsStatus, getApplicationsState } from "services/applications/selectors";

export default function useApplications() {
    const applications = useSelector(state => {
        return getApplicationsState(state);
    });
    const currentApplication = useSelector(state => {
        return getCurrentApplication(state);
    });
    const status = useSelector(state => {
        return getApplicationsStatus(state)
    });
    return {
        applications,
        currentApplication,
        status,
    }
}
