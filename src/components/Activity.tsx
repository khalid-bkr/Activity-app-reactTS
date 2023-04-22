import React from 'react';
import {UserActivity} from "../types/Types";
interface ActivityProps {
    userActivity: UserActivity,
}
const Activity: React.FC<ActivityProps> = (props) => {
    const {userActivity} = props;
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
    const formattedDate: string = userActivity.date.replace(/(\d{4})(\d{2})(\d{2})/g, (match, p1, p2, p3) => {
        return `${p3} ${months[p2]} ${p1}`});
    return (
        <div className="card-activity">
            <div className="card-infos-wrapper">
                <div className="card-activity-infos">
                    <div className="details">
                        <h2 className="date-field-style">Date: {formattedDate}</h2>
                        <div>
                            <h4>Calories Idle: {userActivity.caloriesIdle}</h4>
                            <h4># Summary Activities: {userActivity.summary.length}</h4>
                            <h4># Segment Activities: {userActivity.segments.length}</h4>
                        </div>
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