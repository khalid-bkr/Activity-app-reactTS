import React, {useContext, useMemo, useState} from 'react';
import {Button, Col, Container, Form, Row, Spinner} from "react-bootstrap";
import {LOADING_REDUCER_TYPE} from "../reducers/loadingReducer";
import {Context} from "./ContextProvider";
import {fetchChatGptResponse} from "../api/Api";
import GptResponseBox from "./GptResponseBox";

const ChatGptDisplay = () => {

    const [question, setQuestion] = useState<string>("");
    const [calories, setCalories] = useState<string>("");
    const [gptResponse, setGptResponse] = useState<string>("");
    const [gptStream, setGptStream] = useState<string[]>([]);
    const {state, dispatch} = useContext(Context);
    const loading = state.loading;

    const canFetch: boolean = useMemo(() => (
        !!question && !!calories && calories !== "0"
    ),[question, calories]);
    const handleFetch = async () => {
        setGptResponse("");
        dispatch.loading({
            type: LOADING_REDUCER_TYPE.UPDATE,
            payload: true,
        });
        const response = await fetchChatGptResponse(calories, question);
        setGptResponse(response);
        dispatch.loading({
            type: LOADING_REDUCER_TYPE.UPDATE,
            payload: false,
        });
    }

    const handleFetchStream = async () => {
        setGptStream([]);
        dispatch.loading({
            type: LOADING_REDUCER_TYPE.UPDATE,
            payload: true,
        });
        const eventStream: EventSource = new EventSource(`http://localhost:8080/assistant?dailyCalories=${calories}&question=${question}`)
        eventStream.onopen = () => {
            console.log('Connection established.');
        };

        eventStream.onmessage = (e) => {
            const data = JSON.parse(e.data);
            if (data.content == null && data.role == null) {
                dispatch.loading({
                    type: LOADING_REDUCER_TYPE.UPDATE,
                    payload: false,
                });
                eventStream.close();
            }
            setGptStream((prev) => [...prev, data.content]);
        }
        eventStream.onerror = () => {
            // error log here
            eventStream.close();
        }
    }

    return (
        <Container fluid className="gpt-display-wrapper">
            <Container className="">
                <div className="date-filter">
                    <Form>
                        <div className="gpt-display-filter">
                            <Col sm={3}>
                                <Form.Control placeholder="Estimated Burned Calories" value={calories}  onChange={(event) => setCalories(event.target.value)} type="number" />
                            </Col>

                            <Form.Select
                                value={question}
                                onChange={(event) => setQuestion(() => event.target.value)}
                                aria-label="Default select example"
                            >
                                <option value={""}>Select a Question</option>
                                <option value={"1"}>Is that a good amount to burn daily?</option>
                                <option value={"2"}>How can i burn more calories?</option>
                                <option value={"3"}>Do you recommend a certain diet?</option>
                                <option value={"4"}>Which sport would help me burn more calories?</option>
                            </Form.Select>


                            <Button  disabled={!canFetch || loading} onClick={handleFetchStream}  className="search-btn">
                                {loading? <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                    className="spinner-style-btn"
                                /> : "Submit" }
                            </Button>
                        </div>
                    </Form>
                </div>
            </Container>

            <>
                { gptStream.length > 0 && <GptResponseBox gptResponse={gptStream} /> }
                {/*<GptResponseBox gptResponse={gptResponse} />*/}
            </>
        </Container>
    );
};

export default ChatGptDisplay;