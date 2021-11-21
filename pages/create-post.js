import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import Layout from '../components/layout';
import Head from 'next/head';
import useInput from '../hooks/use-input';

// import { createPost } from '../lib/posts';
import utilStyles from '../styles/utils.module.scss';

export default function CreatePost() {
  const isNotEmpty = value => value.trim() !== '';
  const isDate = value => typeof(value) === Date;
  
  const {
    value: titleValue,
    hasError: titleHasError,
    valueIsValid: titleIsValid,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    reset: resetTitle
  } = useInput(isNotEmpty);

  const {
    value: dateValue,
    hasError: dateHasError,
    valueIsValid: dateIsValid,
    valueChangeHandler: dateChangeHandler,
    inputBlurHandler: dateBlurHandler,
    reset: resetDate
  } = useInput(isDate);

  const {
    value: bodyValue,
    hasError: bodyHasError,
    valueIsValid: bodyIsValid,
    valueChangeHandler: bodyChangeHandler,
    inputBlurHandler: bodyBlurHandler,
    reset: resetBody
  } = useInput(isNotEmpty);

  const [submissionData, setSubmissionData] = useState(null);

  const submitHandler = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        title: titleValue,
        date: dateValue,
        body: bodyValue
      })
    }
    fetch('http://localhost:8080/post/add-new', requestOptions)
      .then(response => response.json())
      .then(data => {
        setSubmissionData(data);
      })
      .catch(err => {
        console.log(err);
      })
  }
  
  return (
    <Layout>
      <Head>
        <title>Create Post</title>
      </Head>
      { submissionData && <p>Success!</p> }
      <form onSubmit={submitHandler}>
        <div className="form-element-wrapper">
          <TextField 
            onChange={titleChangeHandler}
            onBlur={titleBlurHandler}
            value={titleValue}
            name="title"
            id="title" 
            label="Title" 
            variant="outlined" 
            error={titleHasError && "error"}
            helperText={titleHasError && "Please enter a value"}
          />
        </div>
        <div className="form-element-wrapper">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              onChange={dateChangeHandler}
              onBlur={dateBlurHandler}
              value={dateValue}
              name="date"
              id="date"
              label="Date"
              renderInput={(params) => <TextField {...params} />}
              error={dateHasError && "error"}
              helperText={dateHasError && "Please enter a value"}
            />
          </LocalizationProvider>
        </div>
        <div className="form-element-wrapper">
          <TextField
            onChange={bodyChangeHandler}
            onBlur={bodyBlurHandler}
            value={bodyValue}
            id="body"
            name="body" 
            placeholder="Enter a blog post here..."
            multiline
            rows={8}
            error={bodyHasError && "error"}
            helperText={bodyHasError && "Please enter a value"}
          />
        </div>
        <Button type="submit" variant="contained">Submit</Button>
      </form>
    </Layout>
  )
}
