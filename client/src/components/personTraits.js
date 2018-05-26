import React, { Component } from 'react';
import * as _ from 'lodash';
import TraitsPage from './traitsPage';

class personTraits extends Component {
  render() {
    const { title, limit, traitsList, toggleTrait, selectedTraits } = this.props;
    return (
      <div>
        <div className="section-title">
          <label>{title}</label>
          <label>{`${_.size(selectedTraits)}/${limit}`}</label>
        </div>
        <TraitsPage traitsList={traitsList}
          toggleTrait={toggleTrait} selectedTraits={selectedTraits} />
      </div>
    );
  }
}

export default personTraits;
