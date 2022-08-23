import { filtersFetching, filtersFetched, filtersFetchingError } from '../components/heroesFilters/filtersSlice';

export const fetchFilters = (request) => (dispatch) => {
    dispatch(filtersFetching());
    request("https://my-cool-dbase.herokuapp.com/filters")
        .then(data => dispatch(filtersFetched(data)))
        .catch(() => dispatch(filtersFetchingError()))
}