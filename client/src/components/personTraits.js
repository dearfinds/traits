import React, { Component } from 'react';
import TraitsPage from './traitsPage';

class personTraits extends Component {
  render() {
    const { title, traitsList, toggleTrait, selectedTraits } = this.props;
    console.log(`PersonTraits${JSON.stringify(selectedTraits)}`)
    return (
      <div>
        <h1 className="section-title">{title}</h1>
        <TraitsPage traitsList={traitsList}
          toggleTrait={toggleTrait} selectedTraits={selectedTraits} />
      </div>
    );
  }
}

export default personTraits;
