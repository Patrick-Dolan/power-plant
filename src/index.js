import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

const storeState = () => {
  let currentState = {};
  return () => {
    const plantNum = Object.keys(currentState).length + 1;
    currentState[plantNum] = {plant: plantNum};
    return (stateChangeFunction = state => state) => {
      const newState = stateChangeFunction(currentState[plantNum]);
      currentState[plantNum] = {...newState};
      console.log(currentState); // eslint-disable-line
      return newState;
    };
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

// UI Logic

function createPlantCardElement(plantNum) {
  const plantCard = document.createElement('div');
  plantCard.className = 'card mt-3';
  plantCard.innerHTML = `
    <div class="card-body">
      <h5 class="card-title">Plant ${plantNum}</h5>
      <p class="card-text">Soil: <span id="${plantNum}-soil-value">0</span></p>
      <button id="${plantNum}-feed" class="btn btn-primary">Feed</button>
      <button id="${plantNum}-super-feed" class="btn btn-primary">Super Feed</button>
      <p class="card-text">Hydration: <span id="${plantNum}-hydration-value">0</span></p>
      <button id="${plantNum}-hydrate" class="btn btn-primary">Hydrate</button>
      <button id="${plantNum}-super-hydrate" class="btn btn-primary">Super Hydrate</button>
    </div>
  `;
  return plantCard;
}

window.onload = function() {
  // Overall State
  const stateControl = storeState();

  // Plant Functions
  const feed = changeState("soil")(1);
  const blueFood = changeState("soil")(5);

  const hydrate = changeState("water")(1);
  const superWater = changeState("water")(5);

  document.getElementById('create-plant').onclick = function() {
    // Create new Plant and Plant Card
    // Unique plants could be added by making the state control closure include something that changed it
    const newPlantStateControl = stateControl();
    const plantNum = newPlantStateControl().plant;
    const plantCard = createPlantCardElement(plantNum);
    document.getElementById('plant-cards').appendChild(plantCard);

    // - Soil Buttons
    document.getElementById(`${plantNum}-feed`).onclick = function() {
      const newState = newPlantStateControl(feed);
      document.getElementById(`${plantNum}-soil-value`).innerText = `${newState.soil}`;
    };
    document.getElementById(`${plantNum}-super-feed`).onclick = function() {
      const newState = newPlantStateControl(blueFood);
      document.getElementById(`${plantNum}-soil-value`).innerText = `${newState.soil}`;
    };
    // - Water Buttons
    document.getElementById(`${plantNum}-hydrate`).onclick = function() {
      const newState = newPlantStateControl(hydrate);
      document.getElementById(`${plantNum}-hydration-value`).innerText = `${newState.water}`;
    };
    document.getElementById(`${plantNum}-super-hydrate`).onclick = function() {
      const newState = newPlantStateControl(superWater);
      document.getElementById(`${plantNum}-hydration-value`).innerText = `${newState.water}`;
    };
  };
};