import React, {useContext} from 'react';
import {Container} from "react-bootstrap";
import Activity from "./Activity";
import DateFilter from "./DateFilter";
import {Link} from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import {Context} from "./ContextProvider";
import {UserActivity} from "../types/Types";
const Home = () => {
    const {state, dispatch} = useContext(Context)
    const loading: boolean = state.loading;
    const activities: UserActivity[] = state.activities;
    const getActivities = () : any => {
        if (!loading && !activities.length) return "There are no Activities available";
        return activities.length? activities?.map((activity: any) => (
                <Link to={`/Activity/${activity.date}`}>
                    <Activity userActivity={activity} />
                </Link>
        )) : [];
    };

    return (
        <Container fluid className="activities">
            <div className="search-filter-style">
                <DateFilter />
            </div>
            <div className="d-flex justify-content-center spinner-style">
                {loading && <Spinner animation="grow" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>}

            </div>
            <div className="activity-wrapper">{getActivities()}</div>
        </Container>
    );
};

export default Home;