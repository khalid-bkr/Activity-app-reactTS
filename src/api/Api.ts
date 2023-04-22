
import Axios, {AxiosResponse} from "axios";
import {UserActivity} from "../types/Types";
import {Params} from "react-router-dom";

// const baseUrl: string = "http://localhost:8080/";
const baseUrl: string = "https://backend.activity-app.site/";

const api = Axios.create({
    baseURL: baseUrl
})

export const fetchActivity = async (date1: string): Promise<UserActivity> => {
    try {
        const response: AxiosResponse<UserActivity> =  await api.get("/byDate/" + date1);
        return response.data;

    }
    catch (error: any) {
        console.log(error.message);
        throw error;
    }
}

export const fetchActivityByType = async (date1: string, type: string): Promise<UserActivity> => {
    try {
        const response: AxiosResponse<UserActivity> =  await api.get("/byDate/" + date1, { params: { type: type } });
        return response.data;

    }
    catch (error: any) {
        console.log(error.message);
        // return {} as UserActivity;
        throw error
    }
}
export const fetchActivitiesRange = async (date1: string, date2: string): Promise<UserActivity[]> => {
    const response: AxiosResponse<UserActivity[]> =  await api.get("/byDate/" + date1 + "/" + date2);
    return response.data;
};

export const fetchChatGptResponse= async (burnedCalories: string, question: string): Promise<string> => {
    const calories: number = Number(burnedCalories);
    const response: AxiosResponse<string> =  await api.get("/assistant", { params: { dailyCalories: calories, question: question } });
    return response.data;
};

export const fetchChatGptStream= async (burnedCalories: string, question: string): Promise<EventSource> => {
    const calories: number = Number(burnedCalories);
    const eventStream: EventSource =  await new EventSource(`${baseUrl}assistant?dailyCalories=${calories}&question=${question}`);
    // eventStream
    // const eventSource = new EventSource("/assistant");
    return eventStream;
};

