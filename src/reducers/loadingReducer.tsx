export const enum LOADING_REDUCER_TYPE {
    UPDATE,
}

type LoadingReducerActions = {
    type: LOADING_REDUCER_TYPE,
    payload: boolean
}

export const loadingReducer = (loading: boolean, action: LoadingReducerActions) => {
    switch (action.type) {
        case LOADING_REDUCER_TYPE.UPDATE: {
            return loading = action.payload;
        }
        default:
            throw Error()
    }
}