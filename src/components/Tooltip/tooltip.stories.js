import React, { Component } from 'react';

import Column from '../Column';
import Row from '../Row';
import ScrollBox from '../ScrollBox';
import Icon from '../Icon';
import Tooltip from './Tooltip';

export default {
  title: 'Tooltip',
  component: Tooltip,
};

const style = { width: '100px' };
const columnStyle = {
  padding: '10px',
  margin: '5px',
  background: 'linear-gradient(30deg, #f8f8f8, #ddd)',
  fontSize: '12px',
};
const longText = (
  <div>
    {Array(70)
      .fill('very')
      .join(' ')}
    <b> LONG </b>
    content
  </div>
);
const testLabels = [`Hey you!`, `Hey what's up?`, `I don't know man!`];

const boxStyle = { height: '200px' };
const wrapStyle = {
  width: '100%',
  padding: '30px',
  border: '5px dashed rgba(50,50,50,0.2)',
  background: 'rgba(0,0,0,0.1)',
};

export function DefaultUsage() {
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Tooltip
        align="start"
        label="I am a default tooltip label that spawns as soon as you hover the content below"
      >
        <span>Default usage - using the label prop</span>
      </Tooltip>
    </div>
  );
}

export function WithKinds() {
  return (
    <Row>
      <Tooltip label="regular kind" kind="regular">
        <span>regular kind</span>
      </Tooltip>
      <Tooltip label="error kind" kind="error">
        <span>error kind</span>
      </Tooltip>
      <Tooltip label="info kind" kind="info">
        <span>info kind</span>
      </Tooltip>
      <Tooltip label="warning kind" kind="warning">
        <span>warning kind</span>
      </Tooltip>
      <Tooltip label="neutral kind" kind="neutral">
        <span>neutral kind</span>
      </Tooltip>
    </Row>
  );
}

export function WithFadeInDelay() {
  return (
    <Tooltip delay={1000} label="You can see me after 1s">
      <span>Will trigger the tooltip after 1s</span>
    </Tooltip>
  );
}

export function WithPositionLeft() {
  return (
    <Tooltip label="I am force here" position="left">
      <span>Left Position</span>
    </Tooltip>
  );
}

export function WithPositionTop() {
  return (
    <Tooltip label="I am force here" position="top">
      <span>Top Position</span>
    </Tooltip>
  );
}

export function WithPositionRight() {
  return (
    <Tooltip label="I am force here" position="right">
      <span>Right Position</span>
    </Tooltip>
  );
}

export function WithPositionBottom() {
  return (
    <Tooltip label="I am force here" position="bottom">
      <span>Bottom Position</span>
    </Tooltip>
  );
}

export function WithCustomContent() {
  return (
    <Tooltip
      custom
      content={<div style={{ background: '#9c3', padding: '30px' }}>This is a custom content</div>}
    >
      <span>Custom tooltip</span>
    </Tooltip>
  );
}

export function WithMultipleLabels() {
  return (
    <Tooltip label={testLabels}>
      <span>Multi-line label prop</span>
    </Tooltip>
  );
}

export function WithChangingChildren() {
  return <Ticker odd="LongLongLongLongLong" even="short" />;
}

export function WithStyle() {
  return <Tooltip style={style}>Custom tooltip style (100px width)</Tooltip>;
}

export function WithPositionAndAlign() {
  return (
    <Column>
      {[undefined, 'top', 'left', 'right', 'bottom'].map((position) =>
        [undefined, 'start', 'center', 'end'].map((align) => {
          const props = { position, align, content: longText };
          const text = `[ ${`${position}`.toUpperCase()} ] [ ${`${align}`.toUpperCase()} ]`;
          const tooltip = (
            <Tooltip {...props}>
              <span>{text}</span>
            </Tooltip>
          );
          return (
            <Row key={`${position}-${align}`}>
              <Column style={columnStyle} align="center space-between">
                {tooltip}
              </Column>
              <Column style={columnStyle} align="center space-between">
                {tooltip}
              </Column>
              <Column style={columnStyle} align="center space-between">
                {tooltip}
              </Column>
              <Column style={columnStyle} align="center space-between">
                {tooltip}
              </Column>
            </Row>
          );
        }))
      }
    </Column>
  );
}

class Ticker extends Component {
  constructor() {
    super();
    this.startTicker = this.startTicker.bind(this);
    this.stopTicker = this.stopTicker.bind(this);
    this.state = {
      tickers: 0,
    };
  }

  componentDidMount() {
    this.startTicker();
  }

  componentWillUnmount() {
    this.stopTicker(); // Corrected typo here
  }

  startTicker() {
    this._interval = setInterval(() => {
      this.setState((prevState) => ({ tickers: (prevState.tickers + 1) % 2 }));
    }, 3000);
  }

  stopTicker() {
    clearInterval(this._interval);
  }

  render() {
    const { tickers } = this.state;
    const { odd, even } = this.props;
    return (
      <div>
        <Tooltip style={style}>{tickers ? odd : even}</Tooltip>
      </div>
    );
  }
}
