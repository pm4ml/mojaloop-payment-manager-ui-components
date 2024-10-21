/* eslint no-console: "off" */
import React, { useState } from 'react';

import FileUploader from './FileUploader';
import { createOptionalValidation, validate, vd } from '../../reduxValidation';

export default {
  title: 'FileUploader',
  component: FileUploader,
};

export function Default() {
  return <div className="m5">
    <FileUploader placeholder="Default" />
  </div>
}

export function WithPending() {
  return <div className="m5">
    <FileUploader pending placeholder="Pending" />
  </div>
}

export function WithInvalid() {
  return <div className="m5">
    <FileUploader invalid placeholder="Invalid" />
  </div>
}

export function WithValidation() {
  const [value, setValue] = useState(undefined);
  const validators = createOptionalValidation([vd.isEmail, vd.maxLength(10), vd.isNum, vd.isText]);
  const validationResult = validate(value, validators);
  return (
    <div className="m5">
      <FileUploader
        placeholder="Validation"
        value={value}
        onChange={setValue}
        invalid={!validationResult.isValid}
        invalidMessages={validationResult.messages}
      />
    </div>
  );
}

export function WithRequired() {
  return <div className="m5">
    <FileUploader required placeholder="Required" />
  </div>
}

export function WithDisabled() {
  return <div className="m5">
    <FileUploader disabled placeholder="Disabled" />
  </div>
}

export function WithIcon() {
  return <div className="m5">
    <FileUploader icon="close-small" placeholder="Icon" />
  </div>
}

export function WithDisable() {
  return <div className="m5">
    <FileUploader placeholder="Required Disabled" required disabled />
  </div>
}

export function WithRequiredDisabledInval() {
  return <div className="m5">
    <FileUploader required disabled invalid placeholder="RequiredDisabledInvalid" />
  </div>
}

export function WithSmall() {
  return <div className="m5">
    <FileUploader size="s" placeholder="Small" />
  </div>
}

export function WithMedium() {
  return <div className="m5">
    <FileUploader size="m" placeholder="Medium" />
  </div>
}

export function WithLarge() {
  return <div className="m5">
    <FileUploader size="l" placeholder="Large" />
  </div>
}

export function WithSmallPending() {
  return <div className="m5">
    <FileUploader size="s" pending placeholder="Small" />
  </div>
}

export function WithMediumPending() {
  return <div className="m5">
    <FileUploader size="m" pending placeholder="Medium" />
  </div>
}

export function WithLargePending() {
  return <div className="m5">
    <FileUploader size="l" pending placeholder="Large" />
  </div>
}

export function WithEvents() {
  return <div className="m5">
    <FileUploader
      placeholder="Events (console)"
      onChange={value => console.log('onChange', value)}
      onClick={() => console.log('onClick')}
      onKeyPress={() => console.log('onKeyPress')}
      onEnter={() => console.log('onEnter')}
      onBlur={() => console.log('onBlur')}
      onFocus={() => console.log('onFocus')}
    />
  </div>
}
