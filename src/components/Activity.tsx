import React from 'react';
import {UserActivity} from "../types/Types";
interface ActivityProps {
    userActivity: UserActivity,
}
const Activity: React.FC<ActivityProps> = (props) => {
    const {userActivity} = props;
    return (
        <div className="card-activity">
            <div className="card-infos-wrapper">
                <div className="card-activity-infos">
                    <div className="details">
                        <h2>Date: {userActivity.date}</h2>
                        <h4>Calories: {userActivity.caloriesIdle}</h4>
                        {/*<h4>Genre: {props.book.genre}</h4>*/}
                        {/*<h4>Year: {year}</h4>*/}
                    </div>
                </div>
                <div>
                    <p>Last Updated: {userActivity.lastUpdate}</p>
                </div>
            </div>
        </div>
    );
};

export default Activity;