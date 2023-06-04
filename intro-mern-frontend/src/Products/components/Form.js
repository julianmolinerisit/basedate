import React, { useState, useRef } from 'react';
import { Form as BulmaForm, Button } from 'react-bulma-components';

const { Field, Control, Label, Input } = BulmaForm;

const Form = ({ handleSubmit }) => {
  const [formValues, setFormValues] = useState({
    name: '',
    unitaryPrice: '',
    size: '',
    description: '',
    imgUrl: ''
  });

  const inputFileRef = useRef();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormValues({ ...formValues, imgUrl: file });
  };

  const _handleSubmit = (e) => {
    e.preventDefault();

    if (inputFileRef.current && inputFileRef.current.files.length > 0) {
      handleSubmit({ ...formValues, image: inputFileRef.current.files[0] });
    } else {
      handleSubmit(formValues);
    }
  };

  return (
    <form onSubmit={_handleSubmit}>
      <Field>
        <Label>Name</Label>
        <Control>
          <Input
            placeholder="Text input"
            name="name"
            value={formValues.name}
            onChange={handleChange}
          />
        </Control>
      </Field>
      <Field>
        <Label>Price Unitary</Label>
        <Control>
          <Input
            placeholder="Text input"
            type="number"
            name="unitaryPrice"
            value={formValues.unitaryPrice}
            onChange={handleChange}
          />
        </Control>
      </Field>
      <Field>
        <Label>Size</Label>
        <Control>
          <Input
            placeholder="Text input"
            name="size"
            type="number"
            value={formValues.size}
            onChange={handleChange}
          />
        </Control>
      </Field>
      <Field>
        <Label>Description</Label>
        <Control>
          <Input
            placeholder="Text input"
            name="description"
            value={formValues.description}
            onChange={handleChange}
          />
        </Control>
      </Field>
      <Field>
        <Label>Image</Label>
        <Control>
          <Input type="file" ref={inputFileRef} onChange={handleFileChange} />
        </Control>
      </Field>
      {formValues.imgUrl && (
        <img src={URL.createObjectURL(formValues.imgUrl)} alt="Selected Image" />
      )}
      <Button type="submit" color="primary">
        Save
      </Button>
    </form>
  );
};

export default Form;
