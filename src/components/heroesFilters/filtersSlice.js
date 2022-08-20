import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filters: [],
    filtersLoadinStatus: 'idle',
    activeFilter: 'all'
}

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        filtersFetching: state => {state.filtersLoadinStatus = 'loading'},
        filtersFetched: (state, action) => {
                    state.filtersLoadinStatus = 'idle';
                    state.filters = action.payload;
            },
        filtersFetchingError: state => {state.filtersLoadinStatus = 'error'},
        filtersChanged: (state, action) => {state.activeFilter = action.payload}
    }
});

const {actions, reducer} = filtersSlice;

export default reducer;
export const {
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
    filtersChanged
} = actions;