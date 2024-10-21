import React from 'react';

import Row from '../Row';
import Spinner from './Spinner';

export default {
  title: 'Spinner',
  component: Spinner,
};

export function Default() {
  return <Spinner />
}
export function Colors() {
  return <Row align="left">
    <Spinner color="#c33" />
    <Spinner color="#3c3" />
    <Spinner color="#33c" />
    <Spinner color="#cc3" />
    <Spinner color="#3cc" />
  </Row>
}

export function PresetSizes() {
  return <Row align="left">
    <Spinner size="s" />
    <Spinner size="m" />
    <Spinner size="l" />
  </Row>
}

export function NumericSizes() {
  return <Row align="left">
    <Spinner size={10} />
    <Spinner size={20} />
    <Spinner size={30} />
    <Spinner size={40} />
    <Spinner size={50} />
    <Spinner size={60} />
    <Spinner size={100} />
  </Row>
}

export function CenteredRelativeToParent() {
  return <div
    style={{
      height: '400px',
      width: '400px',
      border: '5px dashed #ccc',
      background: 'linear-gradient(30deg, #f8f8f8, #d8d8d8)',
    }}
  >
    <Spinner size={100} center />
  </div>
}
