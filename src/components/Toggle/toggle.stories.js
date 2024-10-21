/* eslint no-alert: "off" */
/* eslint no-console: "off" */
/* eslint no-console: "off" */
import React from 'react';
import Toggle from './Toggle';
import Column from '../Column';

export default {
  title: 'Toggle',
  component: Toggle,
};

export function Default() {
  return <Column align="space-between">
    <div className="m5">
      <Toggle label="Default Toggle" checked={false} />
    </div>
    <div className="m5">
      <Toggle label="Default Toggle" checked />
    </div>
  </Column>
}

export function Disabled() {
  return <Column align="space-between">
    <div className="m5">
      <Toggle label="Disabled Toggle" checked={false} disabled />
    </div>
    <div className="m5">
      <Toggle label="Disabled Toggle" checked disabled />
    </div>
  </Column>
}

export function OnChange() {
  return <Column align="space-between">
    <div className="m5">
      <Toggle label="onChange event Toggle" checked={false} onChange={console.log} />
    </div>
    <div className="m5">
      <Toggle label="onChange event Toggle" checked onChange={console.log} />
    </div>
  </Column>
}

export function OnFocus() {
  return <Column align="space-between">
    <div className="m5">
      <Toggle label="onFocus event Toggle" checked={false} onFocus={console.log} />
    </div>
    <div className="m5">
      <Toggle label="onFocus event Toggle" checked onFocus={console.log} />
    </div>
  </Column>
}

export function OnBlur() {
  return <Column align="space-between">
    <div className="m5">
      <Toggle label="onBlur event Toggle" checked={false} onBlur={console.log} />
    </div>
    <div className="m5">
      <Toggle label="onBlur event Toggle" checked onBlur={console.log} />
    </div>
  </Column>
}
