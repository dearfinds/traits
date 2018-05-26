import React, { Component } from 'react';
import * as _ from 'lodash';
import * as axios from 'axios';
import PersonTraits from './personTraits';
import AboutYou from './aboutYou';
import { traitsList } from '../constants/traits';
import { addHost } from '../utils/index';

const SELECTION_LIMIT = 10;

function getChooseLimitTraits(scope) {
  return `Select ${SELECTION_LIMIT} ${scope} traits`;
}

const MONTH_DAYS_MAPPING = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
// Checks for MM/DD/YY
function isDOBValid(dobStr) {
  if (_.isEmpty(dobStr)) return false
  const tokens = _.split(dobStr, '/');
  if (_.size(tokens) !== 3) return false;

  _.each([0,1,2], idx => {
    if (!parseInt(tokens[idx], 10)) return false;
  });
  const numTokens = [parseInt(tokens[0], 10), parseInt(tokens[1], 10), parseInt(tokens[2], 10)];
  if (numTokens[0] < 0 || numTokens[0] > 12) return false;
  if (numTokens[2] < 0 || numTokens[2] > 99) return false;
  if ((numTokens[1] > 0 && numTokens[1] < MONTH_DAYS_MAPPING[numTokens[0]] + 1)
    || (numTokens[1] === 29 && numTokens[2]%4 === 0)) {
      return true;
  }

  return false;
}

function validateData(data) {
  const newErrors = [];

  const traitsUnfilled = []
  if (_.size(data.selfTraits) !== SELECTION_LIMIT) {
    traitsUnfilled.push('self')
  }
  if (_.size(data.partnerTraits) !== SELECTION_LIMIT) {
    traitsUnfilled.push('partner')
  }
  if (!_.isEmpty(traitsUnfilled)) {
    newErrors.push(getChooseLimitTraits(_.join(traitsUnfilled, ', ')));
  }

  const textFields = [];
  _.each(['fullName', 'smoking', 'drinking', 'timeline', 'caste',
    'work.designation', 'work.company', 'work.city', 'education.undergrad'], label => {
      if (_.isEmpty(data.details[label])) textFields.push(_.replace(label, '.', ' '));
  });

  _.each(['height', 'weight'], label => {
    if (data.details[label] === 0) textFields.push(label)
  });

  if (!_.isEmpty(textFields)) {
    newErrors.push(`Enter data for ${_.join(textFields, ', ')}`);
  }

  if (!isDOBValid(data.details.dob)) {
    newErrors.push(`Enter valid Date of Birth in MM/DD/YY format`);
  }

  return newErrors;
}

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      formSubmitted: false,
      email: this.props.email,
      selfTraits: [],
      partnerTraits: [],
      details: {
        fullName: "",
        dob: "",
        height: 0,
        weight: 0,
        caste: "",
        timeline: "",
        smoking: "",
        drinking: "",
        'work.designation': "",
        'work.company': "",
        'work.city': "",
        'work.pay': 0,
        'education.grad': "",
        'education.undergrad': "",

        'pref.pay.range': { min: 50, max: 250 },
        'pref.height.range': { min: 150, max: 170 },
        'pref.age.range': { min: 25, max: 30 },
        'pref.nosmoking': false,
        'pref.nodrinking': false,
        'pref.samework': false,
        'pref.samecaste': false,
      },
    };

    this.toggleTrait = this.toggleTrait.bind(this);
    this.detailUpdate = this.detailUpdate.bind(this);
    this.submitData = this.submitData.bind(this);
  }

  toggleTrait(stateKey, traitLabel) {
    if(_.size(this.state[stateKey]) < SELECTION_LIMIT && !_.includes(this.state[stateKey], traitLabel)) {
      this.setState({ [stateKey]: this.state[stateKey].concat(traitLabel) });
      return;
    }
    const updatedTraits = this.state[stateKey].filter(item => item !== traitLabel);
    this.setState({ [stateKey]: updatedTraits });
  }

  detailUpdate(field, value) {
    const updatedDetails = _.defaults({ [field]: value }, this.state.details);
    this.setState( { details: updatedDetails });
  }

  submitData() {
    console.log(this.state);
    if (this.state.formSubmitted) return

    const newErrors = validateData(this.state);
    if (!_.isEmpty(newErrors)) {
      this.setState({ errors: newErrors });
      return
    }
    const that = this;
    axios.post(addHost() + "/api/survey", _.omit(this.state, ['errors', 'formSubmitted']))
      .then(res => {
        that.setState({ errors: [], formSubmitted: true });
        console.log(`\nSuccessfully updated profile`)
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="app-content">
        <PersonTraits title={"You are"} traitsList={traitsList}
          toggleTrait={traitName => this.toggleTrait('selfTraits', traitName)}
          selectedTraits={this.state['selfTraits']} limit={SELECTION_LIMIT}
        />
        <PersonTraits title={"You need someone with"} traitsList={traitsList}
          toggleTrait={traitName => this.toggleTrait('partnerTraits', traitName)}
          selectedTraits={this.state['partnerTraits']} limit={SELECTION_LIMIT}
        />
        <AboutYou details={this.state.details} detailUpdate={this.detailUpdate}/>
        {
          _.isEmpty(this.state.errors) ? null :
          <div className="survey-errors-wrapper">
            <ul>
            {_.map(this.state.errors, (error, index) => {
              return <li key={index}>{error}</li>;
            })}
            </ul>
          </div>
        }
        {
          !this.state.formSubmitted ? null :
          <div className="survey-success-wrapper">
            <ul>
              <li>Your profile has been saved</li>
            </ul>
          </div>
        }
        <button className="survey-submit" onClick={this.submitData}>Find My Dear!</button>
      </div>
    );
  }
}

export default Profile;
