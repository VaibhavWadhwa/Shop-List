import { useState } from "react";

const useInput = (validateValue,initalValue) =>{

    const [enteredValue , setEnteredValue] = useState(initalValue);
    const [isTouched, setIsTouched] = useState(false);

    const valueIsValid = validateValue(enteredValue);
    const hasError = !valueIsValid && isTouched;

    const valueChangeHandler = (event) =>{
        setEnteredValue(event.target.value);
    }

    const inputBlurHandler = (event) =>{
        setIsTouched(true);
    }

    const reset = () =>{
        setEnteredValue('');
        setIsTouched(false);
    }

    return {
        value : enteredValue,
        valueIsValid,
        hasError,
        valueChangeHandler,
        inputBlurHandler,
        reset
    }

}

export default useInput;