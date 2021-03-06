import React, { useState } from "react";
import Input from "./input";
import Select from "./select";

export const Form = ({ formData }) => {
    const [page, setPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(formData[page]);
    const [values, setValues] = useState({});

    const submitForm = (event) => {
        event.preventDefault();
        console.log(values);
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

    return (
        <form onSubmit={submitForm}>
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

export default Form;
