import {UserActivity} from "../types/Types";

export const enum ACTIVITIES_REDUCER_TYPE {
    SET_ACTIVITIES,
}

type ActivitiesReducerActions = {
    type: ACTIVITIES_REDUCER_TYPE,
    payload: UserActivity[],
}

export const activitiesReducer = (activities: UserActivity[], action: ActivitiesReducerActions) => {
    switch (action.type) {
        case ACTIVITIES_REDUCER_TYPE.SET_ACTIVITIES: {
            return activities = action.payload;
        }
        default:
            throw Error()
    }
}