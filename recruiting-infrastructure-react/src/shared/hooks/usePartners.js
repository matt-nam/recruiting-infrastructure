import { useSelector } from "react-redux";
import { 
    getPartners,
    getPartnersStatus
 } from "redux/selectors";

export default function useCatalog() {
    const status = useSelector(state => {
        return getPartnersStatus(state)
    })
    const partners = useSelector(state => {
        return getPartners(state);
    })
    return {
        status,
        partners
    }
}
