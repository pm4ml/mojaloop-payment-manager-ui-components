/* eslint no-console: "off" */
import React, { useState } from 'react';

import FormInput from '../../components/FormInputs/FormInput';
import Modal from '../../components/Modal';
import TextField from '../../components/TextField';
import { createValidation, validate, vd } from '../../reduxValidation';

const options = [
  { type: 'path', label: 'ONE', value: 'the first path' },
  { type: 'path', label: 'TWO', value: 'the second path' },
  { type: 'path', label: 'THREE', value: 'last path' },
  { type: 'port', label: 'HTTP', value: '80' },
  { type: 'port', label: 'HTTPS', value: '443' },
  { type: 'port', label: 'FTP', value: '21' },
  { type: 'address', label: 'APPLE', value: undefined },
  { type: 'address', label: 'GOOGLE', value: 'google.com' },
  { type: 'address', label: 'MICROSOFT', value: 'microsoft.com' },
];

const portOptions = options.filter(option => option.type === 'port');
const pathOptions = options.filter(option => option.type === 'path');
const addressOptions = options.filter(option => option.type === 'address');

function getCardComponent(type, onInnerClick) {
  return function CardComponent({ value, onChange, assignRef, parent, onClick }) {
    const assignElementRef = element => {
      if (element) {
        assignRef(element);
        element.style.width = parent.offsetWidth;
      }
    };

    const availableOptions = options.filter(option => option.type === type);

    const handleClick = () => {
      onInnerClick();
      onClick();
    };

    return (
      <div
        ref={assignElementRef}
        style={{ background: '#fff', border: '2px solid #eee' }}
      >
        <div style={{ padding: '5px', borderBottom: '2px solid #eee' }}>
          <TextField onClick={handleClick} />
        </div>
        Current value: <span>{value}</span>
        {availableOptions.map(option => (
          <div
            key={option.label}
            role="presentation"
            style={{ display: 'flex', flexDirection: 'row', padding: '10', cursor: 'pointer' }}
            onClick={() => onChange(option.label)}
          >
            <div style={{ padding: '5px', flex: '1' }}>{option.label}</div>
            <div style={{ padding: '5px', width: '200px', flex: '0 0 200px', color: '#999' }}>
              {option.value}
            </div>
          </div>
        ))}
      </div>
    );
  };
}

function TextFieldWithValidation() {
  const [value, setValue] = useState(undefined);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const portValidators = createValidation([vd.isEmail, vd.isNum, vd.maxLength(30)], [portOptions], '[]');
  const pathValidators = createValidation([vd.isEmail, vd.isNum, vd.maxLength(30)], [pathOptions], '[]');
  const addressValidators = createValidation([vd.isEmail, vd.isNum, vd.maxLength(30)], [addressOptions], '[]');

  const onChange = (value) => {
    setValue(value !== '' ? value : undefined);
  };

  const onModalClick = () => {
    setIsModalVisible(true);
  };

  const portCardValidationResult = validate(value, portValidators);
  const pathCardValidationResult = validate(value, pathValidators);
  const addressCardValidationResult = validate(value, addressValidators);

  return (
    <div>
      <FormInput
        className="m5"
        type="text"
        placeholder="Validation"
        value={value}
        onChange={onChange}
        required
        tokens={pathCardValidationResult.tokens}
        cardComponent={getCardComponent('port', onModalClick)}
        tokenDelimiters="[]"
      />

      <TextField
        className="m5"
        type="text"
        placeholder="Validation"
        value={value}
        onChange={onChange}
        required
        invalid={!portCardValidationResult.isValid}
        invalidMessages={portCardValidationResult.messages}
        tokens={portCardValidationResult.tokens}
        tokenDelimiters="[]"
        cardComponent={getCardComponent('port', onModalClick)}
      />

      <TextField
        className="m5"
        type="text"
        placeholder="Validation"
        value={value}
        onChange={onChange}
        required
        invalid={!pathCardValidationResult.isValid}
        invalidMessages={pathCardValidationResult.messages}
        tokens={pathCardValidationResult.tokens}
        tokenDelimiters="[]"
        cardComponent={getCardComponent('path', onModalClick)}
      />

      <TextField
        className="m5"
        type="text"
        placeholder="Validation"
        value={value}
        onChange={onChange}
        required
        invalid={!addressCardValidationResult.isValid}
        invalidMessages={addressCardValidationResult.messages}
        tokens={addressCardValidationResult.tokens}
        tokenDelimiters="[]"
        cardComponent={getCardComponent('address', onModalClick)}
      />

      {isModalVisible && <Modal title="test" />}
    </div>
  );
}

function TestTextCard() {
  return (
    <div>
      <div className="p10 b1-ccc w500">
        <TextFieldWithValidation />
      </div>
    </div>
  );
}

export default TestTextCard;
