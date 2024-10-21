/* eslint no-console: "off" */
import React from 'react';

import Checkbox from '../../components/Checkbox';
import Modal from '../../components/Modal';
import Row from '../../components/Row';
import TextField from '../../components/TextField';
import { createOptionalValidation, validate, vd } from '../../reduxValidation';

function TextFieldWithDelay() {
  const [t, setT] = React.useState('');

  React.useEffect(() => {
    const interval = setInterval(() => setT(Math.random().toString()), 1000);
    return () => clearInterval(interval);
  }, []);

  return <TextField className="m5" type="text" placeholder="Default" value={t} />;
}

function TextFieldWithValidation() {
  const [value, setValue] = React.useState(undefined);
  const validators = createOptionalValidation([vd.isEmail, vd.maxLength(10), vd.isNum, vd.isText]);

  const onChange = (value) => {
    setValue(value !== '' ? value : undefined);
  };

  const validationResult = validate(value, validators);

  return (
    <TextField
      className="m5"
      type="text"
      placeholder="Validation"
      value={value}
      onChange={onChange}
      required
      invalid={!validationResult.isValid}
      invalidMessages={validationResult.messages}
    />
  );
}

function TextFieldWithFix() {
  const [modal, setModal] = React.useState(false);

  const onClick = () => {
    setModal(true);
  };

  return (
    <div>
      {modal && <Modal title="Hello" />}
      <TextField
        className="m5"
        type="text"
        placeholder="Validation"
        onClick={onClick}
        invalid
        invalidMessages={[
          { message: 'This is a test', active: true },
          { message: 'This is undefined', active: undefined },
          { message: 'This is invalid', active: false },
        ]}
      />
    </div>
  );
}

function InvalidToggle() {
  const [isToggled, setIsToggled] = React.useState(false);

  const toggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <div style={{ display: 'flex' }}>
      <Checkbox onChange={toggle} label="Invalid" />
      <TextField
        onChange={toggle}
        placeholder="Invalid"
        invalid={isToggled}
        invalidMessages={[
          { message: 'This is a test', active: true },
          { message: 'This is invalid', active: false },
        ]}
      />
    </div>
  );
}

function TestTextField() {
  return (
    <div>
      <div className="p10 b1-ccc w500">
        <TextFieldWithDelay />
        <TextFieldWithValidation />
        <TextFieldWithFix />
        <TextField className="m5" type="text" placeholder="Default" />
        <TextField className="m5" type="password" placeholder="Password" />
        <TextField className="m5" type="number" placeholder="Number" onChange={console.log} value="10" />
        <TextField className="m5" placeholder="Pending" pending />
        <TextField
          className="m5"
          placeholder="Invalid"
          invalid
          invalidMessages={[
            { message: 'This is a test', active: true },
            { message: 'This is undefined', active: undefined },
            { message: 'This is invalid', active: false },
          ]}
        />
        <TextField className="m5" placeholder="Required" required />
        <TextField className="m5" placeholder="Disabled" disabled />
        <TextField className="m5" type="password" placeholder="4" value="text" />
        <TextField className="m5" placeholder="Icon" icon="close-small" />
        <TextField
          className="m5"
          placeholder="Events (console)"
          onChange={value => console.log('onChange', value)}
          onClick={() => console.log('onClick')}
          onKeyPress={() => console.log('onKeyPress')}
          onEnter={() => console.log('onEnter')}
          onBlur={() => console.log('onBlur')}
          onFocus={() => console.log('onFocus')}
        />
        <TextField
          className="m5"
          placeholder="Button"
          onButtonClick={() => console.log('Clicked!')}
          buttonText="Press Me"
          buttonKind="primary"
        />
        <TextField
          className="m5"
          placeholder="Disabled"
          onButtonClick={() => console.log('Clicked!')}
          buttonText="Press Me"
          disabled
        />
      </div>
      <div className="p10 b1-ccc">
        <InvalidToggle />
      </div>
      <div className="p10 b1-ccc">
        <TextField className="m5" type="password" placeholder="Password pending" pending />
        <TextField className="m5" placeholder="Required Disabled" required disabled />
        <TextField className="m5" placeholder="Required Disabled Invalid" required disabled invalid />
      </div>
      <Row className="p10 b1-ccc" align="space-between center">
        <TextField className="m5" placeholder="small" size="s" />
        <TextField className="m5" placeholder="medium" size="m" />
        <TextField className="m5" placeholder="large" size="l" />
        <TextField className="m5" placeholder="small" size="s" pending />
        <TextField className="m5" placeholder="medium" size="m" pending />
        <TextField className="m5" placeholder="large" size="l" pending />
      </Row>
    </div>
  );
}

export default TestTextField;
