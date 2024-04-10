import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

const storeState = () => {
  let currentState = {};
  return (stateChangeFunction = state => state) => {
    const newState = stateChangeFunction(currentState);
    currentState = {...newState};
    return newState;
  };
};

const changeState = (prop) => {
  return (value) => {
    return (state) => ({
      ...state,
      [prop] : (state[prop] || 0) + value
    });
  };
};

window.onload = function() {
  // Overall State
  const stateControl = storeState();

  // Plant Functions
  const feed = changeState("soil")(1);
  const blueFood = changeState("soil")(5);

  const hydrate = changeState("water")(1);
  const superWater = changeState("water")(5);

  // UI Logic
  // - Soil Buttons
  document.getElementById('feed').onclick = function() {
    const newState = stateControl(feed);
    document.getElementById('soil-value').innerText = `${newState.soil}`;
  };
  document.getElementById('super-feed').onclick = function() {
    const newState = stateControl(blueFood);
    document.getElementById('soil-value').innerText = `${newState.soil}`;
  };
  // - Water Buttons
  document.getElementById('hydrate').onclick = function() {
    const newState = stateControl(hydrate);
    document.getElementById('hydration-value').innerText = `${newState.water}`;
  };
  document.getElementById('super-hydrate').onclick = function() {
    const newState = stateControl(superWater);
    document.getElementById('hydration-value').innerText = `${newState.water}`;
  };
};