/* eslint no-console: "off" */
import React, { useState } from 'react';

import DatePicker from './DatePicker';
import { createOptionalValidation, createValidator, validate, vd } from '../../reduxValidation';

export default {
  title: 'DatePicker',
  component: DatePicker,
};

export function Default() {
  return <div className="m5">
    <DatePicker placeholder="Default" value={Date.now()} />
  </div>
}

export function DefaultWithTime() {
  return <div className="m5">
    <DatePicker placeholder="Default" withTimevalue={Date.now()} />
  </div>
}

export function WithPending() {
  return <div className="m5">
    <DatePicker pending placeholder="Pending" value={Date.now()} />
  </div>
}

export function WithInvalid() {
  return <div className="m5">
    <DatePicker invalid placeholder="Invalid" value={Date.now()} />
  </div>
}

export function WithValidation() {
  const [value, setValue] = useState(undefined);
  const isAprilOrSunday = createValidator('It is April or it is a Sunday', date => {
    if (!date) {
      return undefined;
    }
    const dateObj = new Date(date);
    return dateObj.getMonth() === 3 || dateObj.getDay() === 6;
  });
  const validators = createOptionalValidation([isAprilOrSunday]);
  const validationResult = validate(value, validators);
  return (
    <div className="m5">
      <DatePicker
        placeholder="Validation"
        value={value}
        onSelect={setValue}
        invalid={!validationResult.isValid}
        invalidMessages={validationResult.messages}
        value={Date.now()}
      />
    </div>
  );
}

export function WithRequired() {
  return <div className="m5">
    <DatePicker format="x" required placeholder="Required" value={Date.now()} />
  </div>
}

export function WithDisabled() {
  return <div className="m5">
    <DatePicker format="x" disabled placeholder="Disabled" value={Date.now()} />
  </div>
}

export function WithDisable() {
  return <div className="m5">
    <DatePicker format="x" placeholder="Required Disabled" required disabled value={Date.now()} />
  </div>
}

export function WithRequiredDisabledInvalid() {
  return <div className="m5">
    <DatePicker
      format="x"
      required
      disabled
      invalid
      placeholder="RequiredDisabledInvalid"
      value={Date.now()}
    />
  </div>
}
export function WithExportFormatUTC_ms() {
  return <div className="m5">
    <DatePicker placeholder="Select a date" format="x" onSelect={console.log} value={Date.now()} />
  </div>
}

export function WithExportFormatUTC_s() {
  return <div className="m5">
    <DatePicker placeholder="Select a date" format="X" onSelect={console.log} value={Date.now()} />
  </div>
}

export function WithExportFormatDefault() {
  return <div className="m5">
    <DatePicker placeholder="Select a date" onSelect={console.log} value={Date.now()} />
  </div>
}

export function WithExportFormatCustom() {
  return <div className="m5">
    <DatePicker
      placeholder="Select a date"
      format="[Day] DD [of Month] MMMM [of Year] YYYY [at time] HH:mm [and] ss [seconds]"
      onSelect={console.log}
      value={Date.now()}
    />
  </div>
}

export function WithDateFormatUTC_ms() {
  return <div className="m5">
    <DatePicker
      placeholder="Select a date"
      dateFormat="x"
      onSelect={console.log}
      value={Date.now()}
    />
  </div>
}

export function WithDateFormatUTC_s() {
  return <div className="m5">
    <DatePicker
      placeholder="Select a date"
      dateFormat="X"
      onSelect={console.log}
      value={Date.now()}
    />
  </div>
}

export function WithDateFormatDefault() {
  return <div className="m5">
    <DatePicker placeholder="Select a date" onSelect={console.log} value={Date.now()} />
  </div>
}

export function WithDateFormatCustom() {
  return <div className="m5">
    <DatePicker
      placeholder="Select a date"
      dateFormat="[Day] DD [of Month] MMMM [of Year] YYYY [at time] HH:mm [and] ss [seconds]"
      onSelect={console.log}
      withTime
      value={Date.now()}
    />
  </div>
}

export function Small() {
  return <div className="m5">
    <DatePicker format="x" size="s" placeholder="Small" />
  </div>
}

export function Medium() {
  return <div className="m5">
    <DatePicker format="x" size="m" placeholder="Medium" />
  </div>
}

export function Large() {
  return <div className="m5">
    <DatePicker format="x" size="l" placeholder="Large" />
  </div>
}

export function SmallPending() {
  return <div className="m5">
    <DatePicker format="x" size="s" pending placeholder="Small" />
  </div>
}

export function MediumPending() {
  return <div className="m5">
    <DatePicker format="x" size="m" pending placeholder="Medium" />
  </div>
}

export function LargePending() {
  return <div className="m5">
    <DatePicker format="x" size="l" pending placeholder="Large" />
  </div>
}

export function WithEvents() {
  return <div className="m5">
    <DatePicker
      format="x"
      placeholder="Events (console)"
      onSelect={value => console.log('onSelect', value)}
      onClick={() => console.log('onClick')}
      onKeyPress={() => console.log('onKeyPress')}
      onEnter={() => console.log('onEnter')}
      onBlur={() => console.log('onBlur')}
      onFocus={() => console.log('onFocus')}
    />
  </div>
}
