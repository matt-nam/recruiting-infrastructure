import { useSelector } from "react-redux";
import { 
    getFilteredCatalog, 
    getCurrentListing, 
    getCatalogStatus,
    getCatalogFilterOptions,
    getPartners
 } from "redux/selectors";

export default function useCatalog() {
    const catalog = useSelector(state => {
        return getFilteredCatalog(state);
    });
    const currentListing = useSelector(state => {
        return getCurrentListing(state);
    });
    const status = useSelector(state => {
        return getCatalogStatus(state)
    })
    const options = useSelector(state => {
        return getCatalogFilterOptions(state)
    })
    const partners = useSelector(state => {
        return getPartners(state);
    })
    return {
        catalog,
        currentListing,
        status,
        options,
        partners
    }
}
