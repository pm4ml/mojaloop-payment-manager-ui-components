import './Checkbox.scss';

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import * as utils from '../../utils/common';

class Checkbox extends PureComponent {
  constructor(props) {
    super(props);
    const { checked } = props;
    this.state = {
      checked,
    };
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.testKey = this.testKey.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { checked } = this.props;
    if (checked !== prevProps.checked) {
      this.setState({ checked });
    }
  }

  onChange(e) {
    e.preventDefault();
    e.stopPropagation();
    const { disabled, onChange } = this.props;
    const { checked } = this.state;

    if (disabled) {
      return;
    }

    const newChecked = !checked;
    this.setState({ checked: newChecked });
    if (onChange) {
      onChange(newChecked);
    }
  }

  onBlur(e) {
    const { onBlur } = this.props;
    if (onBlur) {
      onBlur(e);
    }
  }

  onClick(e) {
    e.preventDefault();
    e.stopPropagation();
    const { onClick } = this.props;
    if (onClick) {
      onClick(e);
    }
  }

  onFocus(e) {
    const { onFocus } = this.props;
    if (onFocus) {
      onFocus(e);
    }
  }

  testKey(e) {
    if (e.keyCode === 9) {
      e.stopPropagation();
      e.preventDefault();
      utils.focusNextFocusableElement(this.input, !e.shiftKey);
      return;
    }
    if (e.keyCode === 13) {
      e.stopPropagation();
      e.preventDefault();
      this.onChange(e);
    }
  }

  render() {
    const { checked } = this.state;
    const {
      style,
      className,
      id,
      label,
      disabled,
      round,
      semi,
    } = this.props;

    const checkboxClassName = utils.composeClassNames(['mb-input', 'input-checkbox', className]);
    const labelClassName = utils.composeClassNames([
      round && 'input-checkbox__label--round',
      !label && 'input-checkbox__label--no-margin',
    ]);

    return (
      <div className={checkboxClassName} style={style}>
        <input
          ref={(input) => {
            this.input = input;
          }}
          type="checkbox"
          id={id}
          className={`input-checkbox__input ${semi ? 'semi-checked' : ''}`}
          onClick={this.onClick}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          onKeyDown={this.testKey}
          onChange={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          checked={checked && semi !== true}
          disabled={disabled}
        />
        <label
          htmlFor={id}
          className={labelClassName}
          onClick={this.onChange}
          role="button"
          tabIndex={0} // Makes the label focusable by keyboard
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              this.onChange();
            }
          }}
        >
          {label}
        </label>
      </div>
    );
  }
}

Checkbox.propTypes = {
  style: PropTypes.shape(),
  className: PropTypes.string,
  semi: PropTypes.bool,
  id: PropTypes.string,
  label: PropTypes.string,
  round: PropTypes.bool,
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
};

Checkbox.defaultProps = {
  style: undefined,
  className: undefined,
  semi: false,
  id: undefined,
  label: undefined,
  round: false,
  onBlur: undefined,
  onClick: undefined,
  onChange: undefined,
  onFocus: undefined,
  checked: false,
  disabled: false,
};

export default Checkbox;
