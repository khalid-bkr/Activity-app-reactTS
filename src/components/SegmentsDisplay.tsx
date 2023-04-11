import React from 'react';
import {Segment} from "../types/Types";
import {Container} from "react-bootstrap";
interface SegmentProps {
    segment: Segment
}
const SegmentsDisplay: React.FC<SegmentProps> = (props) => {
    const {segment} = props
    return (
        <>
            <Container fluid>
                <div className="segment-group">
                    <div className="">
                        <p>Type: {segment.type}</p>
                        <p>Start Time: {segment.startTime}</p>
                        <p>End Time: {segment.endTime}</p>
                        <p>Place: {segment.place? segment.place.name : "N/A"}</p>
                    </div>
                    <div>
                        {/*<p>Distance: {segment.distance}</p>*/}
                        {/*<p>Steps: {segment.steps}</p>*/}

                    </div>
                </div>
            </Container>
        </>
    );
};

export default SegmentsDisplay;