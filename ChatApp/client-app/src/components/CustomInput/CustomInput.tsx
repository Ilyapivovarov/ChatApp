import React from 'react';
import {FormFeedback, Input} from "reactstrap";
import {InputType} from "reactstrap/types/lib/Input";

interface CustomInputProps{
    valid: boolean,
    value: string,
    placeholder: string,
    required?: boolean
    type: InputType,
    invalidFeedback?: string,
    onChange: React.ChangeEventHandler<HTMLInputElement>
}

const CustomInput : React.FC<CustomInputProps> = (props) => {
    
    if(!props.valid)
        return (
            <div>
                <Input invalid />
                <FormFeedback>
                    {props.invalidFeedback}
                </FormFeedback>
            </div>
        );
    
    return (
        <div>
                <Input
                    required={props.required}
                    placeholder={props.placeholder}
                    value={props.value}
                    type={props.type}
                    onChange={(e) => props.onChange(e)}
                />
        </div>
    );
};

export default CustomInput;
