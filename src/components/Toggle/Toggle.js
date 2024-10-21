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
    const { keyCode, shiftKey } = e;
    if (keyCode === 9) {
      e.stopPropagation();
      e.preventDefault();
      utils.focusNextFocusableElement(this.input, !shiftKey);
      return;
    }
    if (keyCode === 13) {
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
          onClick={this.onClick}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          onKeyDown={this.testKey}
          onChange={e => {
            e.preventDefault();
            e.stopPropagation();
          }}
          checked={checked}
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

Toggle.propTypes = {
  style: PropTypes.shape(),
  className: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
};

Toggle.defaultProps = {
  style: undefined,
  className: undefined,
  id: undefined,
  label: undefined,
  onBlur: undefined,
  onClick: undefined,
  onChange: undefined,
  onFocus: undefined,
  checked: false,
  disabled: false,
};

export default Toggle;
