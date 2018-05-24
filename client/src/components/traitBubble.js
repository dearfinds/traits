import React, { Component } from 'react';

class TraitBubble extends Component {
  render() {
    const { label, selected, toggleTrait } = this.props;
    // console.log(`Bubbleselected${JSON.stringify(selected)}`)
    return (
      <div className={selected ? "trait-bubble--selected" : "trait-bubble--unselected"}
        onClick={event => toggleTrait(label)}>
        <div className="trait-label">{label}</div>
      </div>
    );
  }
}

export default TraitBubble;
