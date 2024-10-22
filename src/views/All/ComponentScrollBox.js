import { LoremIpsum } from 'lorem-ipsum';
import React from 'react';

import ScrollBox from '../../components/ScrollBox';

// Create an instance of LoremIpsum
const loremIpsum = new LoremIpsum();

function Content({ color }) {
  return (
    <div
      style={{
        background: '#fc9',
        height: '400px',
        padding: '20px',
        fontSize: '12px',
        color,
      }}
    >
      {loremIpsum.generateParagraphs(1)} {/* Use the instance to generate text */}
    </div>
  );
}

function TestScrollBox() {
  return (
    <div style={{ padding: '10px' }}>
      <ScrollBox style={{ height: '100px', marginBottom: '10px' }}>
        <Content color="white" />
      </ScrollBox>

      <ScrollBox style={{ height: '200px', marginBottom: '10px' }}>
        <Content color="red" />
      </ScrollBox>

      <ScrollBox style={{ height: '300px', marginBottom: '10px' }}>
        <Content color="white" />
      </ScrollBox>
    </div>
  );
}

export default TestScrollBox;
