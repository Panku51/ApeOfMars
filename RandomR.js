import random from "random";

const powers = ['fire', 'ice', 'water', 'earth', 'plant', 'poison'];

const origins = ['phoebs', 'demons'];

const phemospic=['https://apeofmars.s3.ap-south-1.amazonaws.com/152514.jpg','https://apeofmars.s3.ap-south-1.amazonaws.com/152508.jpg','https://apeofmars.s3.ap-south-1.amazonaws.com/itachi-uchiha-theme-or15.jpg']

const demonspic=['https://apeofmars.s3.ap-south-1.amazonaws.com/simpsons.jpg','https://apeofmars.s3.ap-south-1.amazonaws.com/unnamed-2.jpg','https://apeofmars.s3.ap-south-1.amazonaws.com/itachi-uchiha-theme-or15.jpg']

const rarities = ['common', 'rare', 'epic', 'legendary', 'super-legend'];


// database

import { getDatabase, ref, set } from "firebase/database";

function writeApeData(origin,rarity,powerLevel,powerValue,power,mineRate,coolDifferenceTime,url) {
  const db = getDatabase();
  // const data={
  //   Origin: origin,
  //   Rarity: rarity,
  //   PowerLevel:powerLevel,
  //   powerValue: powerValue,
  //   Power: power,
  //   MinRate:mineRate,
  //   CoolTime:coolDifferenceTime,
  //   ImageUrl:url
  // }
  push().set(ref(db, 'Origin/' +origin), {
    // Origin: origin,
    Rarity: rarity,
    PowerLevel:powerLevel,
    powerValue: powerValue,
    Power: power,
    MinRate:mineRate,
    CoolTime:coolDifferenceTime,
    ImageUrl:url
  });

  // var db=getDatabase()
  // db.push()
}




//

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

const numRandomApes = 10; 
for (let i = 0; i < numRandomApes; i++) {
    const ape = createRandomApe();
    writeApeData(ape.origin,ape.rarity,ape.powerLevel,ape.powerValue,ape.power,ape.mineRate,ape.coolDifferenceTime,ape.url);
}