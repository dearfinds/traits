import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';

class TraitBubble extends Component {
  render() {
    const { label, description, selected, toggleTrait } = this.props;
    return (
      <div className={selected ? "trait-bubble--selected" : "trait-bubble--unselected"}
        onClick={event => toggleTrait(label)} data-tip data-for={label}>
        <div className="trait-label">{label}</div>
        {
          description
          ? <ReactTooltip className="bubble-tooltip-container" id={label} place="top" type="info">
              <span className="bubble-tooltip">{description}</span>
            </ReactTooltip>
          : null
        }

      </div>
    );
  }
}

export default TraitBubble;
