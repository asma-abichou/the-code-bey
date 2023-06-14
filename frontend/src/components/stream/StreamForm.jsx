import React from 'react';
import { Typography, FormControl, Button } from '@material-ui/core';

const StreamForm = ({ onSubmit, formTitle, initialValues, children }) => {
  const onFormSubmit = event => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const formValues = Object.fromEntries(formData.entries());
    onSubmit(formValues);
  };

  return (
    <section className="form-container">
      <form onSubmit={onFormSubmit}>
        <Typography variant="h3" className="form-title">
          {formTitle}
        </Typography>
        {children}
        <Button variant="contained" className="form-button" type="submit">
          Submit
        </Button>
      </form>
    </section>
  );
};

export default StreamForm;
