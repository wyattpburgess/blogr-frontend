import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

import TextEditor from "../components/form/TextEditor";
import Layout from "../components/layout";
import Head from "next/head";
import useInput from "../hooks/use-input";
import { createPost } from "../lib/posts";

const CreatePost = () => {
  const isNotEmpty = (value) => value.trim() !== "";

  const [formError, setFormError] = useState(false);

  const {
    value: titleValue,
    hasError: titleHasError,
    valueIsValid: titleIsValid,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    reset: resetTitle,
  } = useInput(isNotEmpty);

  const [bodyValue, setBodyValue] = useState("");

  const formIsValid = titleIsValid;
  const [submissionData, setSubmissionData] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (formIsValid) {
      const data = await createPost({ titleValue, bodyValue });
      setSubmissionData(data);
      resetTitle();
      setBodyValue("");
    } else {
      setFormError(true);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Create Post</title>
      </Head>
      {formError && (
        <div className="form-element-wrapper">
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            Please validate form fields and try resubmitting.
          </Alert>
        </div>
      )}
      {submissionData && (
        <div className="form-element-wrapper">
          <Alert severity="success">
            <AlertTitle>Post Created</AlertTitle>
            Your post was successfully created!
          </Alert>
        </div>
      )}
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
            className="form-input"
            error={titleHasError && "error"}
            helperText={titleHasError && "Please enter a value"}
          />
        </div>
        <div className="form-element-wrapper">
          <TextEditor value={bodyValue} setBodyValue={setBodyValue} />
        </div>
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </Layout>
  );
};

export default CreatePost;
