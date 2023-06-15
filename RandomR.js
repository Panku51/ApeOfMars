import random from "random";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import {ref, set,push ,onValue} from "firebase/database";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBs7zsMewLWsxXxMESHgxzib5MtgY_9ao4",
  authDomain: "apeofmars-30bd3.firebaseapp.com",
  projectId: "apeofmars-30bd3",
  databaseURL: "https://apeofmars-30bd3-default-rtdb.firebaseio.com/",
  storageBucket: "apeofmars-30bd3.appspot.com",
  messagingSenderId: "28414968159",
  appId: "1:28414968159:web:735e70b99ad76c381a76ea",
  measurementId: "G-0WC1V1954L"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);


const powers = ['fire', 'ice', 'water', 'earth', 'plant', 'poison'];

const origins = ['phoebs', 'demons'];

const phemospic=['https://apeofmars.s3.ap-south-1.amazonaws.com/152514.jpg','https://apeofmars.s3.ap-south-1.amazonaws.com/152508.jpg','https://apeofmars.s3.ap-south-1.amazonaws.com/itachi-uchiha-theme-or15.jpg']

const demonspic=['https://apeofmars.s3.ap-south-1.amazonaws.com/simpsons.jpg','https://apeofmars.s3.ap-south-1.amazonaws.com/unnamed-2.jpg','https://apeofmars.s3.ap-south-1.amazonaws.com/itachi-uchiha-theme-or15.jpg']

const rarities = ['common', 'rare', 'epic', 'legendary', 'super-legend'];


const powerLevels = {
    common: 2,
    rare: 3,
    epic: 4,
    legendary: 5,
    'super-legend': 6
};


const powerRanges = {
  common: { min: 10, max: 30 },
  rare: { min: 30, max: 60 },
  epic: { min: 50, max: 70 },
  legendary: { min: 70, max: 85 },
  'super-legend': { min: 85, max: 99 }
};


const mineRates = {
    common: 120,
    rare:90,
    epic:60,
    legendary:30,
    'super-legend':10
};
const coolDifferenceTime = 60;


const randomizeIndex = (count) => {
    return Math.floor(count * Math.random());
};


const randomizeElemnts = (powers, powerLevel) => {
    if (powerLevel > powers.length) {
        throw new Error('Array size cannot be smaller than expected random numbers count.');
    }
    const result = [];
    const guardian = new Set();
    while (result.length < powerLevel) {
        const index = randomizeIndex(powerLevel);
        if (guardian.has(index)) {
            continue;
        }
        const element = powers[index];
        guardian.add(index);
        result.push(element);
    }
    return result;
};

const getImage=(origin)=>{
  if(origin === 'demons')
  {
    return getRandomElement(demonspic)
  }
  else
  {
    return getRandomElement(phemospic)
  }
}



function getRandomNumber(min, max) {
  return random.int(min, max);
}

function getRandomElement(array) {
  const index = getRandomNumber(0, array.length - 1);
  return array[index];
}

function createRandomApe() {
//   const power = getRandomElement(powers);
  const origin = getRandomElement(origins);

  const url=getImage(origin)



  const rarity = getRandomElement(rarities);

  const powerLevel = powerLevels[rarity];
  
  const power = randomizeElemnts(powers, powerLevel);


  const powerRange = powerRanges[rarity];

  const powerValue = getRandomNumber(powerRange.min, powerRange.max);
  const powerValues = {};
  for (const powe of power) {
    const powerValue = getRandomNumber(powerRange.min, powerRange.max);
    powerValues[powe] = powerValue;
  }

  const mineRate = mineRates[rarity];
  const ape = {
    power:powerValues,
    origin,
    url,
    rarity,
    powerLevel,
    powerValue,
    mineRate,
    coolDifferenceTime
  };

  return ape;
}

const numRandomApes = 2; 
for (let i = 0; i < numRandomApes; i++) {
    const ape = createRandomApe();
    // console.log(ape)
    push(ref(database, 'users/'), {
      Origin:ape.origin,
      Rarity:ape.rarity,
      powerLevels:ape.powerLevel,
      powerValue:ape.powerValue,
      power:ape.power,
      minrate:ape.mineRate,
      coolDifferenceTime:ape.coolDifferenceTime,
      imageurl:ape.url
    });

    // set(database,ape.origin)
  }
    // writeApeData(ape.origin,ape.rarity,ape.powerLevel,ape.powerValue,ape.power,ape.mineRate,ape.coolDifferenceTime,ape.url);
// }
// import { getDatabase, ref, onValue} from "firebase/database";

const starCountRef = ref(database, 'users/');
onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();
  // updateStarCount(postElement, data);
  console.log(data)
});