/* eslint no-alert: "off" */
/* eslint no-console: "off" */
import React from 'react';
import Checkbox from './Checkbox';
import Column from '../Column';

export default {
  title: 'Checkbox',
  component: Checkbox,
};

export function Default() {
  return <Column align="space-between">
    <div className="m5">
      <Checkbox label="Default Checkbox" checked={false} />
    </div>
    <div className="m5">
      <Checkbox label="Default Checkbox" checked />
    </div>
  </Column>
}

export function SemiChecked() {
  return <Column align="space-between">
    <div className="m5">
      <Checkbox label="Semi Checked Checkbox" checked={false} semi />
    </div>
    <div className="m5">
      <Checkbox label="Semi Checked Checkbox" checked semi />
    </div>
  </Column>
}

export function Round() {
  return <Column align="space-between">
    <div className="m5">
      <Checkbox label="Round Checkbox" checked={false} round />
    </div>
    <div className="m5">
      <Checkbox label="Round Checkbox" checked round />
    </div>
  </Column>
}

export function Disabled() {
  return <Column align="space-between">
    <div className="m5">
      <Checkbox label="Disabled Checkbox" checked={false} disabled />
    </div>
    <div className="m5">
      <Checkbox label="Disabled Checkbox" checked disabled />
    </div>
  </Column>
}

export function OnChange() {
  return <Column align="space-between">
    <div className="m5">
      <Checkbox label="onChange event Checkbox" checked={false} onChange={console.log} />
    </div>
    <div className="m5">
      <Checkbox label="onChange event Checkbox" checked onChange={console.log} />
    </div>
  </Column>
}

export function OnFocus() {
  return <Column align="space-between">
    <div className="m5">
      <Checkbox label="onFocus event Checkbox" checked={false} onFocus={console.log} />
    </div>
    <div className="m5">
      <Checkbox label="onFocus event Checkbox" checked onFocus={console.log} />
    </div>
  </Column>
}

export function OnBlur() {
  return <Column align="space-between">
    <div className="m5">
      <Checkbox label="onBlur event Checkbox" checked={false} onBlur={console.log} />
    </div>
    <div className="m5">
      <Checkbox label="onBlur event Checkbox" checked onBlur={console.log} />
    </div>
  </Column>
}
