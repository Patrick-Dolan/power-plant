import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

// Create overall store state object
// use this to store multiple plants
const overallState = (newState) => {
  let currentState = {};
  return () => {
    const newObjNum = Object.keys(currentState).length;
    currentState = { ...currentState, [newObjNum]: newState };
    return currentState;
  };
};

//  Change storeState to createObjectState
const createObjectState = () => {
  let currentState = {};
  return (stateChangeFunction = state => state) => {
    const newState = stateChangeFunction(currentState);
    currentState = {...newState};
    return newState;
  };
};

// Change changeState to changeObjectState
const changeObjectState = (prop) => {
  return (value) => {
    return (state) => ({
      ...state,
      [prop] : (state[prop] || 0) + value
    });
  };
};

// UI Logic
const createPlantCard = (plantNum) => {
  const card = document.createElement('div');
  card.innerHTML = `
    <div class="card my-2">
      <div class="card-body">
        <p class="card-text">Soil: <span id="${plantNum}-soil-value">0</span></p>
        <p class="card-text">Water: <span id="${plantNum}-hydration-value">0</span></p>
        <button id="${plantNum}-feed" class="btn btn-primary">Feed</button>
        <button id="${plantNum}-super-feed" class="btn btn-primary">Super Feed</button>
        <button id="${plantNum}-hydrate" class="btn btn-primary">Hydrate</button>
        <button id="${plantNum}-super-hydrate" class="btn btn-primary">Super Hydrate</button>
      </div>
    </div>
  `;
  return card;
};

window.onload = function() {
  // Overall State
  const appState = overallState();

  // Plant Functions
  const feed = changeObjectState("soil")(1);
  const blueFood = changeObjectState("soil")(5);

  const hydrate = changeObjectState("water")(1);
  const superWater = changeObjectState("water")(5);

  // UI Logic
  document.getElementById('create-plant').onclick = function() {
    // Create new plant
    const newPlantState = createObjectState();

    // Add plant to overall state
    const currentAppState = appState(newPlantState);
    const plantNum = Object.keys(currentAppState).length;

    // Create plant card and add to DOM
    const plantCard = createPlantCard(plantNum);
    document.getElementById('plant-cards').appendChild(plantCard);

    // - Soil Buttons
    document.getElementById(`${plantNum}-feed`).onclick = function() {
      const newState = newPlantState(feed);
      document.getElementById(`${plantNum}-soil-value`).innerText = `${newState.soil}`;
    };
    document.getElementById(`${plantNum}-super-feed`).onclick = function() {
      const newState = newPlantState(blueFood);
      document.getElementById(`${plantNum}-soil-value`).innerText = `${newState.soil}`;
    };

    // - Water Buttons
    document.getElementById(`${plantNum}-hydrate`).onclick = function() {
      const newState = newPlantState(hydrate);
      document.getElementById(`${plantNum}-hydration-value`).innerText = `${newState.water}`;
    };
    document.getElementById(`${plantNum}-super-hydrate`).onclick = function() {
      const newState = newPlantState(superWater);
      document.getElementById(`${plantNum}-hydration-value`).innerText = `${newState.water}`;
    };
  };
};