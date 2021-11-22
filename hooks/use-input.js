import { useReducer } from 'react';

const initialInputState = {
  value: '',
  isTouched: false
}

const inputStateReducer = (state, action) => {
  if (action.type === 'INPUT') {
    return {
      value: action.value,
      isTouched: state.isTouched
    }
  }
  if (action.type === 'BLUR') {
    return {
      value: state.value,
      isTouched: true
    }
  }
  if (action.type === 'RESET') {
    return {
      value: '',
      isTouched: false
    }
  }

  return inputStateReducer;
}

const useInput = (validateValue) => {
  const [inputState, dispatch] = useReducer(inputStateReducer, initialInputState);

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;
  
  const valueChangeHandler = (event) => {
    let value = null;
    if (event !== null ) {
      if (typeof(event.target) === 'undefined') {
        value = event;
      } else {
        value = event.target.value;
      }
    }
    dispatch({type: 'INPUT', value: value});
  }

  const inputBlurHandler = (event) => {
    dispatch({type: 'BLUR'});
  }

  const reset = () => {
    dispatch({type: 'RESET'});
  }

  return {
    value: inputState.value,
    hasError,
    valueIsValid,
    valueChangeHandler,
    inputBlurHandler,
    reset
  };
}

export default useInput;