const initialState = {
    filters: [],
    filtersLoadinStatus: 'idle',
    activeFilter: 'all'
}

const filters = (state = initialState, action) => {
    switch (action.type) {
        case 'FILTERS_FETCHING':
            return {
                ...state,
                filtersLoadinStatus: 'loading'
            }
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filters: action.payload,
                filtersLoadinStatus: 'idle'
            }
        case 'FILTERS_FETCHING_ERROR':
            return {
                ...state,
                filtersLoadinStatus: 'error'
            }    
        case 'ACTIVE_FILTER_CHANGED':
            return {
                ...state,
                activeFilter: action.payload,
            }   
        default: return state
    }
}

export default filters;