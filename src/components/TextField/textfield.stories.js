/* eslint no-console: "off" */
import React, { useState } from 'react';

import TextField from './TextField';
import { createOptionalValidation, validate, vd } from '../../reduxValidation';

export default {
  title: 'TextField',
  component: TextField,
};

export function Default() {
  return <div className="m5">
    <TextField type="text" placeholder="Default" />
  </div>
}

export function TypePassword() {
  return <div className="m5">
    <TextField type="password" placeholder="Password" />
  </div>
}

export function TypeNumber() {
  return <div className="m5">
    <TextField type="number" onChange={console.log} value="10" placeholder="Number" />
  </div>
}

export function WithPending() {
  return <div className="m5">
    <TextField pending placeholder="Pending" />
  </div>
}

export function WithInvalid() {
  return <div className="m5">
    <TextField invalid placeholder="Invalid" />
  </div>
}

export function WithValidation() {
  const [value, setValue] = useState(undefined);
  const validators = createOptionalValidation([vd.isEmail, vd.maxLength(10), vd.isNum, vd.isText]);
  const validationResult = validate(value, validators);
  return (
    <div className="m5">
      <TextField
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
    <TextField required placeholder="Required" />
  </div>
}

export function WithDisabled() {
  return <div className="m5">
    <TextField disabled placeholder="Disabled" />
  </div>
}

export function WithIcon() {
  return <div className="m5">
    <TextField icon="close-small" placeholder="Icon" />
  </div>
}

export function WithButton() {
  return <div className="m5">
    <TextField
      onButtonClick={console.log}
      buttonText="Press Me"
      buttonKind="primary"
      placeholder="Button"
    />
  </div>
}

export function WithPasswordPending() {
  return <div className="m5">
    <TextField type="password" pending placeholder="PasswordPending" />
  </div>
}

export function WithDisable() {
  return <div className="m5">
    <TextField placeholder="Required Disabled" required disabled />
  </div>
}

export function WithRequiredDisabledInval() {
  return <div className="m5">
    <TextField required disabled invalid placeholder="RequiredDisabledInvalid" />
  </div>
}

export function WithSmall() {
  return <div className="m5">
    <TextField size="s" placeholder="Small" />
  </div>
}

export function WithMedium() {
  return <div className="m5">
    <TextField size="m" placeholder="Medium" />
  </div>
}

export function WithLarge() {
  return <div className="m5">
    <TextField size="l" placeholder="Large" />
  </div>
}

export function WithSmallPending() {
  return <div className="m5">
    <TextField size="s" pending placeholder="Small" />
  </div>
}

export function WithMediumPending() {
  return <div className="m5">
    <TextField size="m" pending placeholder="Medium" />
  </div>
}

export function WithLargePending() {
  return <div className="m5">
    <TextField size="l" pending placeholder="Large" />
  </div>
}

export function WithEvents() {
  return <div className="m5">
    <TextField
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
