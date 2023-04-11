import React from 'react';
import {Container} from "react-bootstrap";
import Typewriter from 'typewriter-effect';
interface ResponseProps {
    gptResponse: string[],
}
const GptResponseBox: React.FC<ResponseProps> = (props) => {
    const {gptResponse} = props
    return (
        <Container className="gpt-response-wrapper">
            {/*<Typewriter*/}
            {/*    onInit={(typewriter) => {*/}
            {/*        typewriter.typeString(gptResponse.toString())*/}
            {/*            .callFunction(() => {*/}
            {/*                console.log('String typed out!');*/}
            {/*            })*/}
            {/*            .start();*/}
            {/*    }}*/}
            {/*    options={{*/}
            {/*        delay: 15,*/}
            {/*    }}*/}
            {/*/>*/}
            {gptResponse}

        </Container>
    );
};

export default GptResponseBox;