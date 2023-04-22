import React, {useEffect, useState} from 'react';
import Axios from "axios";
import {fetchActivity} from "../api/Api";
import {Segment, Summary, UserActivity} from "../types/Types";
import {Link, Params, useParams} from "react-router-dom";
import {Container} from "react-bootstrap";
import Activity from "./Activity";
import SummaryDisplay from "./SummaryDisplay";
import SegmentsDisplay from "./SegmentsDisplay";

const ActivityDisplay = () => {
    const params: Readonly<Params> = useParams();
    const [activity, setActivity] = useState<UserActivity>({} as UserActivity);
    // const [summaries, setSummaries] = useState<Summary[]>([])
    // const [segments, setSegments] = useState<Segment[]>([])
    const handleFetch  = async () => {
        const response = await fetchActivity(params.date!);
        setActivity(response);
    }
    const summaries = activity.summary;
    const segments = activity.segments;
    // const handleData = () => {
    //     setSummaries(activity.summary);
    //     setSegments(activity.segments);
    // }
    useEffect(() => {
        handleFetch()
    }, [params.date])

    const getSummaries = () => {
        return summaries?.map((summary: any) => (
            <SummaryDisplay summary={summary} />
        ));
    }
    const getSegments = () => {
        return segments?.map((segment: any) => (
            <SegmentsDisplay segment={segment} />
        ));
    }

    const months: any = {
        "01": "January",
        "02": "February",
        "03": "March",
        "04": "April",
        "05": "May",
        "06": "June",
        "07": "July",
        "08": "August",
        "09": "September",
        "10": "October",
        "11": "November",
        "12": "December",
    }
    const formattedDate: string = activity.date?.replace(/(\d{4})(\d{2})(\d{2})/g, (match, p1, p2, p3) => {
        return `${p3} ${months[p2]} ${p1}`});


    return (
        <div>
            <Container className="">
                <div className="date-header-style">
                    <h1>Activity Date : {formattedDate}</h1>
                </div>
                <div className="activity-display">
                    <h2 className="mt-3 title-style">Summary</h2>
                    <hr className="hr-style"/>
                    <div className="summaries-wrapper">
                        {getSummaries()}
                    </div>
                </div>
                <div className="activity-display">
                    <h2 className="title-style">Segments</h2>
                    <hr className="hr-style"/>
                    <div className="segments-wrapper">
                        {getSegments()}
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default ActivityDisplay;