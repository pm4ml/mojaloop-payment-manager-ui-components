import './Boxes.scss';

import React from 'react';

import Icon from '../Icon';
import Spinner from '../Spinner';

function Pending() {
  return <div className="el-datalist__pending-box">
    <Spinner size="s" className="loading-spinner" />
  </div>
}

function ErrorMessage({ message }) {
  return <div className="el-datalist__error-box">
    <Icon size={50} name="settings" fill="#ccc" />
    <span style={{ color: '#ccc', fontSize: 20, marginLeft: 10 }}>{message}</span>
  </div>
}

function NoData({ message }) {
  return <div className="el-datalist__nodata-box">
    <Icon name="dashboard" size={40} fill="#ccc" />
    <span style={{ color: '#ccc', fontSize: 20, marginLeft: 10 }}>{message}</span>
  </div>
}

export { Pending, ErrorMessage, NoData };
