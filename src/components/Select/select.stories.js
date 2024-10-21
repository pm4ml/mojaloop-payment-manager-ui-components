/* eslint no-console: "off" */
import React, { useState } from 'react';

import Select from './Select';
import { createOptionalValidation, validate, vd } from '../../reduxValidation';

export default {
  title: 'Select',
  component: Select,
};

const options = [
  {
    label: 'With an icon',
    value: 'withicon',
    icon: 'deploy-small',
  },
  {
    label: new Array(50)
      .fill('super')
      .join(' ')
      .toString()
      .concat(' long'),
    value: 'superStrangeValue',
  },
  {
    label: 'disabled',
    value: 'disabled',
    disabled: true,
  },
  ...[...Array(20)].map(optionMaker),
];

function optionMaker(item, index) {
  return {
    label: `option number ${index + 1}`,
    value: `value number ${index}`,
  };
}

export function Default() {
  return <div className="m5">
    <Select options={options} type="text" placeholder="Default" />
  </div>
}

export function WithPending() {
  return <div className="m5">
    <Select options={options} pending placeholder="Pending" />
  </div>
}

export function WithInvalid() {
  return <div className="m5">
    <Select options={options} invalid placeholder="Invalid" />
  </div>
}

export function WithValidation() {
  const [value, setValue] = useState(undefined);
  const validators = createOptionalValidation([vd.isEmail, vd.maxLength(10), vd.isNum, vd.isText]);
  const validationResult = validate(value, validators);
  return (
    <div className="m5">
      <Select
        options={options}
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
    <Select options={options} required placeholder="Required" />
  </div>
}

export function WithDisabled() {
  return <div className="m5">
    <Select options={options} disabled placeholder="Disabled" />
  </div>
}

export function WithIcon() {
  return <div className="m5">
    <Select options={options} icon="close-small" placeholder="Icon" />
  </div>
}

export function WithPasswordPending() {
  return <div className="m5">
    <Select options={options} type="password" pending placeholder="PasswordPending" />
  </div>
}

export function WithRequiredAndDisabled() {
  return <div className="m5">
    <Select options={options} placeholder="Required Disabled" required disabled />
  </div>
}

export function WithRequiredDisabledInval() {
  return <div className="m5">
    <Select options={options} required disabled invalid placeholder="RequiredDisabledInvalid" />
  </div>
}

export function WithSmall() {
  return <div className="m5">
    <Select options={options} size="s" placeholder="Small" />
  </div>
}

export function WithMedium() {
  return <div className="m5">
    <Select options={options} size="m" placeholder="Medium" />
  </div>
}

export function WithLarge() {
  return <div className="m5">
    <Select options={options} size="l" placeholder="Large" />
  </div>
}

export function WithSmallPending() {
  return <div className="m5">
    <Select options={options} size="s" pending placeholder="Small" />
  </div>
}

export function WithMediumPending() {
  return <div className="m5">
    <Select options={options} size="m" pending placeholder="Medium" />
  </div>
}

export function WithLargePending() {
  return <div className="m5">
    <Select options={options} size="l" pending placeholder="Large" />
  </div>
}

export function WithEvents() {
  return <div className="m5">
    <Select
      options={options}
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
