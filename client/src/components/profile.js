import React, { Component } from 'react';
import * as _ from 'lodash';
import * as axios from 'axios';
import PersonTraits from './personTraits';
import AboutYou from './aboutYou';
import ImageUpload from './imageUpload';
import { traitsList } from '../constants/traits';
import { addHost } from '../utils/index';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
  if (numTokens[0] <= 0 || numTokens[0] > 12) return false;
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

  if (_.size(data.images) < 2) {
    newErrors.push(`Upload at least 2 pictures`);
  }

  return newErrors;
}

class Profile extends Component {
  constructor(props) {
    super(props);
    this.initialProfile = {
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
      }
    };
    this.state = { errors: [], formSubmitted: false, images: [], ...this.initialProfile };

    this.toggleTrait = this.toggleTrait.bind(this);
    this.detailUpdate = this.detailUpdate.bind(this);
    this.onImageRead = this.onImageRead.bind(this);
    this.submitData = this.submitData.bind(this);
  }

  componentDidMount() {
    axios.get(addHost() + '/api/survey')
      .then(({ data: profile }) => {
        // console.log(`\nprofile returned is||${JSON.stringify(profile)}`);
        this.setState({
          selfTraits: profile.selfTraits || [],
          partnerTraits: profile.partnerTraits || [],
          details: profile.details || this.initialProfile.details,
        });
      })
      .catch(err => {
        // console.log(`Failed to get profile`)
      });

    axios.get(addHost() + '/api/profile_picture')
      .then(({ data: images }) => {
        // console.log(`\nImages returned are||${JSON.stringify(images)}`);
        // console.log(`\nImages size returned are||${_.size(images)}`)
        this.setState({ images })
      })
      .catch(err => {
        // console.log(`Failed to get profile`)
      });
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

  onImageRead(imgData) {
    // console.log(`\nImagesConcat||${JSON.stringify(this.state)}`);
    // console.log(`\nImagesConcatData||${JSON.stringify(imgData)}`);
    this.setState({ images: this.state.images.concat([imgData]) });
  }

  submitData() {
    // console.log(this.state);
    // if (this.state.formSubmitted) return

    const newErrors = validateData(this.state);
    if (!_.isEmpty(newErrors)) {
      this.setState({ errors: newErrors });
      return
    }
    const that = this;
    axios.post(addHost() + "/api/survey", _.omit(this.state, ['errors', 'formSubmitted', 'images']))
      .then(res => {
        that.setState({ errors: [] });
        toast('Profile saved', { className: 'profile_saved_toast' });
        // console.log(`\nSuccessfully updated profile`)
      })
      .catch(err => console.log(err));
    _.each(this.state.images, image => {
      // console.log(`\nAbout to submit images|${JSON.stringify(this.state.images)}`);
      if (_.isEmpty(image._id)) {
        // console.log(`\nAbout to call backend image post`);
        axios.post(addHost() + '/api/profile_picture', { imgData: image })
          .then(res => {
            // console.log(`Successful at frontend image upload|`)
          })
          .catch(err => {
            // console.log(`Failed at frontend image upload|`)
          });
      }
    });
  }

  render() {
    return (
      <div className="app-content">
        <PersonTraits title={"You are"} traitsList={traitsList}
          toggleTrait={traitName => this.toggleTrait('selfTraits', traitName)}
          selectedTraits={this.state['selfTraits']} limit={SELECTION_LIMIT}
        />
        <PersonTraits title={"You prefer a partner who is"} traitsList={traitsList}
          toggleTrait={traitName => this.toggleTrait('partnerTraits', traitName)}
          selectedTraits={this.state['partnerTraits']} limit={SELECTION_LIMIT}
        />
        <AboutYou details={this.state.details} detailUpdate={this.detailUpdate}/>
        <ImageUpload onImageRead={this.onImageRead} images={this.state.images} />
        {
          _.isEmpty(this.state.errors) ? null :
          <div className="survey-errors-wrapper">
            <div className="errors-content">
              <ul>
              {_.map(this.state.errors, (error, index) => {
                return <li key={index}>{error}</li>;
              })}
              </ul>
            </div>
          </div>
        }
        {
          // !this.state.formSubmitted ? null : <ToastContainer />
          <ToastContainer transition={Slide} hideProgressBar={true} autoClose={2000} />
          // <div className="survey-success-wrapper">
          //   <ul>
          //     <li>Your profile has been saved</li>
          //   </ul>
          // </div>
        }
        <button className="survey-submit" onClick={this.submitData}>Find My Dear!</button>
      </div>
    );
  }
}

export default Profile;
