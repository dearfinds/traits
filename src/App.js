import React, { Component } from 'react';
import * as _ from 'lodash';
import * as axios from 'axios';
import Header from './components/header';
import Footer from './components/footer';
import PersonTraits from './components/personTraits';
import AboutYou from './components/aboutYou';
import { traitsList } from './constants/traits';

import 'react-input-range/lib/css/index.css';
import 'react-select/dist/react-select.css';
import './App.css';

const SELECTION_LIMIT = 10;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    axios.post("http://localhost:8080/api/survey", this.state)
      .then(res => console.log(`\nSuccessfully updated DB`))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <Header />
        <PersonTraits title={"Your Traits"} traitsList={traitsList}
          toggleTrait={traitName => this.toggleTrait('selfTraits', traitName)}
          selectedTraits={this.state['selfTraits']}
        />
        <PersonTraits title={"Partner Traits"} traitsList={traitsList}
          toggleTrait={traitName => this.toggleTrait('partnerTraits', traitName)}
          selectedTraits={this.state['partnerTraits']}
        />
        <AboutYou details={this.state.details} detailUpdate={this.detailUpdate}/>
        <button className="survey-submit" onClick={this.submitData}>Submit</button>
        <Footer />
      </div>
    );
  }
}

export default App;
