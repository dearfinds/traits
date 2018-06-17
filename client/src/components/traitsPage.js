import React, { Component } from 'react';
import TraitBubble from './traitBubble';
import _ from 'lodash';

class TraitsPage extends Component {
  render() {
    const { traitsList, selectedTraits, toggleTrait } = this.props;
    // console.log(`TraitsPage${JSON.stringify(selectedTraits)}`);
    return (
      <div className="traits-container">
        {
          _.map(traitsList, ({ label, description }, index) => {
            return <TraitBubble key={index} label={label}
              selected={_.includes(selectedTraits, label)}
              description={description}
              toggleTrait={toggleTrait}
            />
          })
        }
      </div>
    );
  }
}

export default TraitsPage;
