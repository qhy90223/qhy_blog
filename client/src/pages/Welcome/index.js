import React, { Component } from 'react';
import BrandDisplay from './components/BrandDisplay';

export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="welcome-page">
        {/* 品牌列表展示 */}
        <BrandDisplay />
      </div>
    );
  }
}
