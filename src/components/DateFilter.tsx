import React, {useContext, useMemo, useState} from 'react';
import {Button, Container, Form, Row, Spinner} from "react-bootstrap";
import DatePicker from "react-datepicker";
import {fetchActivitiesRange, fetchActivity, fetchActivityByType} from "../api/Api";
import {UserActivity} from "../types/Types";
import {Context} from "./ContextProvider";
import {LOADING_REDUCER_TYPE} from "../reducers/loadingReducer";
import {ACTIVITIES_REDUCER_TYPE} from "../reducers/activitiesReducer";
interface FilterProps {
    // updateLoading: (newState: boolean) => void,
    // updateActivities: (newState: UserActivity[]) => void,
    // loading: boolean,
}
const DateFilter: React.FC<FilterProps> = (props) => {

    const {state, dispatch} = useContext(Context);
    const loading = state.loading;

    const [option, setOption] = useState<string>("BY_DATE");
    const [type, setType] = useState<string>("ALL_TYPES")
    const [date1, setDate1] = useState<string>('');
    const [date2, setDate2] = useState<string>('');
    const canFetch: boolean = useMemo(() => (
        option === 'BY_DATE' ? !!option && !!date1 : !!option && !!date1 && !!date2
    ),[date1, date2, option]);

    const handleByDate = async (date1: string) => {
        const response = await fetchActivity(date1);
        dispatch.activities({
            type: ACTIVITIES_REDUCER_TYPE.SET_ACTIVITIES,
            payload: response ? [response]: [],
        })
        // props.updateActivities(response ? [response] : []);
    }

    const handleByDateAndType = async (date1: string, type: string) => {
        try {
            const response = await fetchActivityByType(date1, type);
            dispatch.activities({
                type: ACTIVITIES_REDUCER_TYPE.SET_ACTIVITIES,
                payload: [response],
            })
            // props.updateActivities([response]);
        }
        catch (error) {
            dispatch.activities({
                type: ACTIVITIES_REDUCER_TYPE.SET_ACTIVITIES,
                payload: [],
            })
            // props.updateActivities([]);
        }
    }
    const handleByRange = async (date1: string, date2: string) => {
        const response = await fetchActivitiesRange(date1, date2);
        dispatch.activities({
            type: ACTIVITIES_REDUCER_TYPE.SET_ACTIVITIES,
            payload: response,
        })
        // props.updateActivities(response);
    }

    const handleFetch = async () => {
        // props.updateLoading(true);
        dispatch.loading({
            type: LOADING_REDUCER_TYPE.UPDATE,
            payload: true,
        });
        // props.updateActivities([]);
        dispatch.activities({
            type: ACTIVITIES_REDUCER_TYPE.SET_ACTIVITIES,
            payload: [],
        })
        const startDate: string = date1? date1?.replace(/-/g, ''): "";
        const endDate: string = date2? date2?.replace(/-/g, ''): "";
        if (option === 'BY_DATE') {
            type === 'ALL_TYPES'? await handleByDate(startDate) : await handleByDateAndType(startDate, type);
        }
        else {
            await handleByRange(startDate, endDate)
        }
        dispatch.loading({
            type: LOADING_REDUCER_TYPE.UPDATE,
            payload: false,
        });
        // props.updateLoading(false);
    }
    return (
        <Container className="date-filter">
            {/*<Row className="d-flex">*/}
            <Form>
                <div className="date-filter-wrapper">
                {/*<div className="date-filter-filters">*/}
                    <Form.Select
                        value={option}
                        onChange={(event) => setOption(() => event.target.value)}
                        aria-label="Default select example"
                    >
                        <option value="BY_DATE">By Date</option>
                        <option value="BY_RANGE">By Range</option>
                    </Form.Select>
                    <Form.Control value={date1}  onChange={(event) => setDate1(event.target.value)} type="date" />
                    { option === "BY_DATE" && (
                        <Form.Select
                            value={type}
                            onChange={(event) => setType(() => event.target.value)}
                            aria-label="Default select example"
                        >
                            <option value="ALL_TYPES">All Types</option>
                            <option value="place">Place</option>
                            <option value="move">Move</option>
                        </Form.Select>
                    )}
                    { option === 'BY_RANGE' && (
                        <Form.Control value={date2}  onChange={(event) => setDate2(event.target.value)} type="date" />
                    )}
                {/*</div>*/}
                <Button disabled={!canFetch || loading} onClick={handleFetch}  className="search-btn">
                    {loading? <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="spinner-style-btn"
                    /> : "Search" }
                </Button>

                </div>
            </Form>
            {/*</Row>*/}
        </Container>
    );
};

export default DateFilter;