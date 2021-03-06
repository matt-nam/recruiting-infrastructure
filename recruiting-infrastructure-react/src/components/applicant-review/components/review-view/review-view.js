import React, { useState } from "react";
import Input from "./components/input";
import Select from "./components/select";
// import ReviewView from "../../../../../shared/models/reviewView.model";
import { useDispatch, useSelector } from "react-redux";
import { getApplicationsState } from 'services/applications/selectors';

export const ReviewView = ({ appData, formData }) => {
    const [page, setPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(formData[page]);
    const [values, setValues] = useState({});

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    const fieldChanged = (name, value) => {
        setValues((currentValues) => {
            currentValues[name] = value;
            return currentValues;
        });

        setCurrentPage((currentPage) => {
            return Object.assign({}, currentPage)
        });
    };

    const stringToComponent = {
        input: Input,
        select: Select
    };

    let application = useSelector(state => getApplicationsState(state));

    return (
        <form onSubmit={handleSubmit}>
            <h2>{currentPage.label}</h2>
            {currentPage.fields.map((field) => {
                switch (field.component) {
                    case "select":
                        return (
                            <Select
                                key={field.name}
                                field={field}
                                fieldChanged={fieldChanged}
                                values={values[field.name]}
                            />
                        )
                    default:
                        return (
                            <Input
                                key={field.name}
                                field={field}
                                fieldChanged={fieldChanged}
                                values={values[field.name]}
                            />
                        )
                }
            })}
            <input type="submit" />
        </form>
    );
};

export default ReviewView;
