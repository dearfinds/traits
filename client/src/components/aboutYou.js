import React, { Component } from 'react';
import Select from 'react-select';
import TraitBubble from './traitBubble';
import InputRange from 'react-input-range';

const TIMELINE_OPTIONS = [
  { value: '3-6 Months', label: '3-6 Months' },
  { value: '8-15 Months', label: '8-15 Months' },
  { value: '20-24 Months', label: '20-24 Months' }
];

const CONSUMPTION_OPTIONS = [
  { value: 'never', label: 'Never' },
  { value: 'rare', label: 'Rare' },
  { value: 'often', label: 'Often' }
];

class AboutYou extends Component {
  constructor(props) {
    super(props);

    this.selectOnChange = this.selectOnChange.bind(this);
    this.inputFieldOnChange = this.inputFieldOnChange.bind(this);
    this.rangeFieldOnChange = this.rangeFieldOnChange.bind(this);
  }

  selectOnChange(field, selectedOption) {
    this.props.detailUpdate(field, selectedOption.value)
  }

  inputFieldOnChange(field, event) {
    this.props.detailUpdate(field, event.target.value);
  }

  rangeFieldOnChange(field, value) {
    this.props.detailUpdate(field, value);
  }

  valueUpdateOnChange(field, value) {
    this.props.detailUpdate(field, value);
  }

  render () {
    const { details } = this.props;
    return (
      <div className="self-details-container">
        <div className="self-info-section">
          <h2 className="self-info-section-title">Personal Info</h2>
          <div className="self-detail-row--allInputs">
            <input type="text"
              className="input" placeholder="First (Middle) Last Names"
              onChange={event => this.inputFieldOnChange('fullName', event)}/>
            <input type="text" className="input" placeholder="Birth Detail(MM/DD/YY)"
              onChange={event => this.inputFieldOnChange('dob', event)} />
          </div>

          <div className="self-detail-row--allInputs">
            <input type="number" className="input" placeholder="Height (cms)"
              onChange={event => this.inputFieldOnChange('height', event)} />
            <input type="number" className="input" placeholder="Weight (kg)"
              onChange={event => this.inputFieldOnChange('weight', event)} />
          </div>

          <div className="self-detail-row--allInputs">
            <input type="text" className="input" placeholder="Caste"
              onChange={event => this.inputFieldOnChange('caste', event)} />
            <Select
              className="detail-select"
              name="timeline-name"
              placeholder="Marriage Timeline"
              value={details.timeline}
              onChange={selectedOption => this.selectOnChange('timeline', selectedOption)}
              options={TIMELINE_OPTIONS} />
          </div>

          <div className="self-detail-row--allInputs">
            <Select
              className="detail-select"
              name="smoking-name"
              placeholder="Smoking"
              value={details.smoking}
              onChange={selectedOption => this.selectOnChange('smoking', selectedOption)}
              options={CONSUMPTION_OPTIONS} />
            <Select
              className="detail-select"
              name="drinking-name"
              placeholder="Drinking"
              value={details.drinking}
              onChange={selectedOption => this.selectOnChange('drinking', selectedOption)}
              options={CONSUMPTION_OPTIONS} />
          </div>

          <label className="detail-subsection-title">Work & Education</label>
          <div className="self-detail-row--allInputs">
            <input type="text" className="input" placeholder="Company"
              onChange={event => this.inputFieldOnChange('work.company', event)} />
            <input type="text" className="input" placeholder="City"
              onChange={event => this.inputFieldOnChange('work.city', event)} />
          </div>

          <div className="self-detail-row--allInputs">
            <input type="text" className="input" placeholder="Designation"
              onChange={event => this.inputFieldOnChange('work.designation', event)} />
            <input type="number" className="input" placeholder="Annual pay in $"
              onChange={event => this.inputFieldOnChange('work.pay', event)} />
          </div>
          <div className="self-detail-row--allInputs">
            <input type="text" className="input" placeholder="Grad College"
              onChange={event => this.inputFieldOnChange('education.grad', event)} />
            <input type="text" className="input" placeholder="Undergrad College"
              onChange={event => this.inputFieldOnChange('education.undergrad', event)} />
          </div>
        </div>

        <div className="self-info-section">
          <h2 className="self-info-section-title">Preferences</h2>

          <div className="self-detail-row--ranges">
            <div className="range-label">Age</div>
            <InputRange className="input-range"
              maxValue={35} minValue={23} step={1}
              formatLabel={value => `${value} Yrs`} value={details['pref.age.range']}
              onChange={value => this.rangeFieldOnChange('pref.age.range', value)} />
          </div>

          <div className="self-detail-row--ranges">
            <div className="range-label">Height</div>
            <InputRange className="input-range"
              maxValue={200} minValue={140} step={1}
              formatLabel={value => `${value} cms`} value={details['pref.height.range']}
              onChange={value => this.rangeFieldOnChange('pref.height.range', value)} />
          </div>

          <div className="self-detail-row--ranges">
            <div className="range-label">Salary</div>
            <InputRange className="input-range"
              maxValue={300} minValue={0} step={10}
              formatLabel={value => `$${value}K`} value={details['pref.pay.range']}
              onChange={value => this.rangeFieldOnChange('pref.pay.range', value)} />
          </div>
          <div className="self-detail-row--allInputs">
            <TraitBubble label="No Smoking" selected={details['pref.nosmoking']}
              toggleTrait={trait => this.valueUpdateOnChange('pref.nosmoking', !details['pref.nosmoking']) } />
            <TraitBubble label="No Drinking" selected={details['pref.nodrinking']}
              toggleTrait={trait => this.valueUpdateOnChange('pref.nodrinking', !details['pref.nodrinking']) } />
            <TraitBubble label="Similar Work" selected={details['pref.samework']}
              toggleTrait={trait => this.valueUpdateOnChange('pref.samework', !details['pref.samework']) } />
            <TraitBubble label="Same Caste" selected={details['pref.samecaste']}
              toggleTrait={trait => this.valueUpdateOnChange('pref.samecaste', !details['pref.samecaste']) } />
          </div>
        </div>
      </div>
    );
  }
}

export default AboutYou;
