import React, { useState } from 'react';
import FormInput, { FormInputs } from '../../components/FormInputs';
import Heading from '../../components/Heading';
import { toValidationResult } from '../../reduxValidation'; // Removed createValidation

const description = { /* Same description object */ };
const url = { /* Same URL object */ };
const model = { /* Same model object */ };
const validation = { /* Same validation object */ };
const ages = new Array(100).fill(0).map((_, index) => ({ label: index, value: index }));
const sexes = [ /* Same sexes array */ ];

const Wrapped = () => {
  const [modelState, setModelState] = useState(model);

  const handleChange = (change) => {
    setModelState({
      ...modelState,
      [change.prop]: change.value,
    });
  };

  const validationResult = toValidationResult(modelState, validation); // Ensure this is used

  return (
    <div>
      {JSON.stringify(validationResult)}
      <Heading>Wrapped</Heading>
      <FormInputs
        onChange={handleChange}
        data={modelState}
        validation={validationResult}
        title="Form inputs title"
        description={description}
        url={url}
      >
        <FormInput type="text" label="name" name="name" />
        <FormInput type="text" label="lastname" name="lastname" />
        <FormInput type="area" label="description" name="description" />
        <FormInput type="select" label="age" name="age" options={ages} />
        <FormInput type="radio" label="sex" name="sex" options={sexes} />
      </FormInputs>
    </div>
  );
};

const Unwrapped = () => {
  const [modelState, setModelState] = useState(model);
  const [size, setSize] = useState('l');

  const handleChange = (field) => (value) => {
    setModelState({
      ...modelState,
      [field]: value,
    });
  };

  const handleSizeChange = (value) => setSize(value);

  const validationResult = toValidationResult(modelState, validation); // Ensure this is used

  return (
    <div>
      <Heading>Non Wrapped</Heading>
      <FormInput
        onChange={handleSizeChange}
        value={size}
        type="radio"
        options={[{ label: 's', value: 's' }, { label: 'm', value: 'm' }, { label: 'l', value: 'l' }]}
        label="size"
      />
      <FormInput
        size={size}
        onChange={handleChange('name')}
        value={modelState.name}
        validation={validationResult.fields.name}
        type="text"
        label="name"
        description={description.name}
        url={url.name}
        name="name"
      />
      {/* Repeat similar FormInput for other fields */}
    </div>
  );
};

const View = () => (
  <div className="p10">
    <Wrapped />
    <Unwrapped />
  </div>
);

export default View;
