import React from 'react';
import {Summary} from "../types/Types";
import {Col, Container} from "react-bootstrap";

interface SummaryProps {
    summary: Summary
}

const SummaryDisplay: React.FC<SummaryProps> = (props) => {
    const {summary} = props;
    return (
        <>
            <Container fluid>
                <div className="summary-group">
                    <div className="">
                        <p>Activity: {summary.activity}</p>
                        <p>Group: {summary.group}</p>
                        <p>Calories: {summary.calories}</p>
                    </div>
                    <div>
                        <p>Duration: {summary.duration}</p>
                        <p>Distance: {summary.distance}</p>
                        <p>Steps: {summary.steps}</p>

                    </div>
                </div>
            </Container>
        </>
    );
};

export default SummaryDisplay;