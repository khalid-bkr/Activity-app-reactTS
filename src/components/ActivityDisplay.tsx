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


    return (
        <div>
            <Container className="">
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