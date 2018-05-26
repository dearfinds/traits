import _ from 'lodash';

export const traitsList = [
  { label: 'Contented', description: 'Satisfaction.  You value experiences more than outcomes and take life slowly.' },
  { label: 'Original', description: 'Non-Conformist. You think about improving everything you touch.' },
  { label: 'Opportunistic', description: 'Path not taken. You seek non-conventional opportunities that makes you happy.' },
  { label: 'Highly Organized', description: 'Strong work ethic. You have a predictable schedule and take pride in sticking to it.' },
  { label: 'Spontaneous', description: 'On the fly. You go with the flow and make the most of a moment.' },
  { label: 'Quiet', description: 'Listener than a talker. You prefer alone time every so often.' },
  { label: 'Planner', description: 'Predictability. You go with the plan than go with the flow.' },
  { label: 'Improviser', description: 'Flexibility. You thrive on shifting grounds and enjoy unpredictability of life.' },
  { label: 'Expressive', description: 'Gift of gab. You convey more through words than actions.' },
  { label: 'Pragmatic', description: ' Concrete. You care about facts and not theoretical considerations.' },
  { label: 'Socializer', description: 'Bring the party! You energize from expressing your thoughts and actions.' },
  { label: 'Self Assured', description: 'Confident. Your measure of self worth is more important than what others think of you' },
  { label: 'Outgoing', description: 'Talker. You initiate most of your daily conversations.' },
  { label: 'Stoic', description: 'Stability. You shield your emotions and remain composed.' },
  { label: 'Success Driven', description: 'Bulls eye. Although stressful, you push through to get to the desired outcome.' },
  { label: 'Empathic', description: 'Wear others\' shoes. You understand people, their idiosyncrasies, mistakes without judging.' },
  { label: 'Inclusive', description: 'Social Harmony.  You prefer to keep everyone happy than gain more.' },
  { label: 'Realist', description: 'Observer. You notice the world without wanting to read between the lines.' },
  { label: 'Reserved', description: 'Not an open book. You choose your interactions very carefully.' },
  { label: 'Rational', description: 'Logical. You listen to your mind over heart the most.' },
  { label: 'Objective', description: 'Goal Oriented. You prefer most efficient plans over group effort.' },
  { label: 'Minimalisitic', description: 'Utility focused. You buy something only if it is absolutely necessary.' },
  { label: 'Inquisitive', description: 'Always wondering. Why things happen the way they do?' },
  { label: 'Present', description: 'Focus on now. You are not concerned about abstract future possibilities.' },
  { label: 'Decisive', description: 'Clarity. You do things once and only once - don’t need second chances.' },
  { label: 'Emotionally Expressive', description: 'Feeler. You listen to heart over mind and stand for it.' },
  { label: 'Perfectionist', description: 'Spotless Mirror. Always trying to meet your absolute high standards.' },
  { label: 'Dreamer', description: 'Novelty. Actual world seems boring to you.' },
];

export const TRAITS = _.zipObject(traitsList, traitsList);
