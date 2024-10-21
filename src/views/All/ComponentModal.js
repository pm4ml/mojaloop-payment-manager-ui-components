import React, { useState, useEffect } from 'react';
import Button from '../../components/Button';
import Modal, { ModalTabsLayout } from '../../components/Modal';
import Row from '../../components/Row';
import Select from '../../components/Select';
import TextField from '../../components/TextField';

const TestModal = () => {
  const [opened, setOpened] = useState([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => prevCounter + 1);
    }, 1000);
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const onOpen = (n) => setOpened((prevOpened) => [...prevOpened, n]);
  const onClose = (n) => setOpened((prevOpened) => prevOpened.filter((item) => item !== n));

  return (
    <div>
      <Row align="space-between">
        <Button kind="primary" onClick={() => onOpen(0)} label="Regular" />
        <Button kind="danger" onClick={() => onOpen(1)} label="Danger" />
        <Button kind="warning" onClick={() => onOpen(2)} label="Warning" />
        <Button kind="primary" onClick={() => onOpen(3)} label="tabs" />
        <Button kind="primary" onClick={() => onOpen(4)} label="multi" />
        <Button kind="primary" onClick={() => onOpen(6)} label="noFooter" />
      </Row>

      <div style={{ padding: 10, margin: '5px 0px', border: '1px solid #ccc' }}>
        {opened.includes(0) && (
          <Modal
            primaryAction="Submit"
            onClose={() => onClose(0)}
            title="Primary"
            kind="primary"
            allowSubmit
            isSubmitEnabled
          >
            <span>Hello! modal 1</span>
          </Modal>
        )}

        {opened.includes(1) && (
          <Modal
            primaryAction="Submit"
            onClose={() => onClose(1)}
            title="danger"
            kind="danger"
            allowSubmit
            isSubmitEnabled
          >
            <div style={{ height: '100px' }}>
              <span>Hello! modal 2</span>
              <Select options={new Array(100).fill({ label: '1', value: '2' })} />
              <TextField placeholder="Test me" />
            </div>
          </Modal>
        )}

        {opened.includes(2) && (
          <Modal
            primaryAction="Submit"
            onClose={() => onClose(2)}
            title="Warning"
            kind="warning"
            allowSubmit
            isSubmitEnabled
          >
            <span>Hello! modal 2</span>
          </Modal>
        )}

        {opened.includes(3) && (
          <Modal
            primaryAction="Submit"
            onClose={() => onClose(3)}
            title="Warning"
            kind="warning"
            tabbed
            allowSubmit
            isSubmitEnabled
            maximise
          >
            <ModalTabsLayout items={[{ name: 'Tab1' }, { name: 'Tab2' }]} selected="Tab2">
              <div style={{ height: '12000px', background: '#999' }}>
                TEST TAB 1<Select options={new Array(100).fill({ label: '1', value: '2' })} />
              </div>
              <div style={{ height: '120px', background: '#9f9' }}>
                TEST TAB 2<Select options={new Array(100).fill({ label: '1', value: '2' })} />
              </div>
            </ModalTabsLayout>
          </Modal>
        )}

        {opened.includes(4) && (
          <Modal
            primaryAction="Submit"
            onClose={() => onClose(4)}
            title="Warning"
            kind="warning"
            allowSubmit
            isSubmitEnabled
          >
            <div>
              <Button kind="primary" onClick={() => onOpen(5)} label="multi" />
              {counter}
            </div>
          </Modal>
        )}

        {opened.includes(5) && (
          <Modal
            primaryAction="Submit"
            onClose={() => onClose(5)}
            title="SubModal"
            kind="warning"
            allowSubmit
            isSubmitEnabled
          >
            <div>I am the submodal!</div>
            {counter}
          </Modal>
        )}

        {opened.includes(6) && (
          <Modal
            primaryAction="Submit"
            onClose={() => onClose(6)}
            title="Modal with no footer"
            kind="primary"
            allowSubmit
            isSubmitEnabled
            noFooter
          >
            <div>I am the submodal!</div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default TestModal;
