import React, {createContext, useReducer} from 'react';
import {loadingReducer} from "../reducers/loadingReducer";
import {UserActivity} from "../types/Types";
import {activitiesReducer} from "../reducers/activitiesReducer";

interface ContextProviderProps {
    children: any
}
interface  IContext {
    state: {
        loading: boolean,
        activities: UserActivity[],

    },
    dispatch: {
        loading: Function,
        activities: Function,

    }
}
export const Context = createContext<IContext>({} as IContext);

const ContextProvider: React.FC<ContextProviderProps> = ({children}) => {
    const [loading, dispatchLoading] = useReducer(loadingReducer, false)
    const [activities, dispatchActivities] = useReducer(activitiesReducer,[]);
    const initialValue = {
        state: {
            loading: loading,
            activities: activities,
        },
        dispatch: {
            loading: dispatchLoading,
            activities: dispatchActivities,
        }
    }

    return (
        <Context.Provider value={initialValue}>
            {children}
        </Context.Provider>
    );
};

export default ContextProvider;