import React from 'react';
import { Result } from 'antd';

interface WarningType {
  text: string;
}

const Warning: React.FC<WarningType> = ({ text }) => <Result status="warning" title={text} />;

export default Warning;
