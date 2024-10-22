import './Toggle.scss';

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import * as utils from '../../utils/common';

class Toggle extends PureComponent {
  constructor(props) {
    super(props);
    const { checked } = props;
    this.state = {
      checked,
    };
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
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

  onFocus(e) {
    const { onFocus } = this.props;
    if (onFocus) {
      onFocus(e);
    }
  }

  testKey(e) {
    const { keyCode } = e;
    if (keyCode === 13 || keyCode === 32) { // Space or Enter key
      e.stopPropagation();
      e.preventDefault();
      this.onChange(e);
    }
  }

  render() {
    const { checked } = this.state;
    const { style, className, id, label, disabled } = this.props;
    const toggleClassName = utils.composeClassNames(['mb-input', 'input-toggle', className]);
    const labelClassName = utils.composeClassNames([!label && 'input-toggle__label--no-margin']);

    return (
      <div className={toggleClassName} style={style}>
        <input
          ref={input => {
            this.input = input;
          }}
          type="checkbox"
          id={id}
          className="input-toggle__input"
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          onChange={this.onChange} // Use this for the checkbox's change event
          onKeyDown={this.testKey} // Handle keyboard events on the checkbox
          checked={checked}
          disabled={disabled}
        />
        <label
          htmlFor={id}
          className={labelClassName}
          tabIndex={0} // Makes the label focusable by keyboard
          role="button" // Explicitly makes the label an interactive element
          onClick={() => this.input.click()} // Allow label click to toggle
          onKeyDown={this.testKey} // Handle keyboard events (Enter or Space)
        >
          {label}
        </label>
      </div>
    );
  }
}

Toggle.propTypes = {
  style: PropTypes.shape(),
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
};

Toggle.defaultProps = {
  style: undefined,
  className: undefined,
  label: undefined,
  onBlur: undefined,
  onChange: undefined,
  onFocus: undefined,
  checked: false,
  disabled: false,
};

export default Toggle;
