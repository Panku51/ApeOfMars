import random from "random";

const powers = ['fire', 'ice', 'water', 'earth', 'plant', 'poison'];

const origins = ['phoebs', 'demons'];

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

function getRandomNumber(min, max) {
  return random.int(min, max);
}

function getRandomElement(array) {
  const index = getRandomNumber(0, array.length - 1);
  return array[index];
}

function createRandomApe() {
  const power = getRandomElement(powers);
  const origin = getRandomElement(origins);

  const rarity = getRandomElement(rarities);

  const powerLevel = powerLevels[rarity];




  const powerRange = powerRanges[rarity];

  const powerValue = getRandomNumber(powerRange.min, powerRange.max);

  const mineRate = mineRates[rarity];
  const ape = {
    power,
    origin,
    rarity,
    powerLevel,
    powerValue,
    mineRate,
    coolDifferenceTime
  };

  return ape;
}

const numRandomApes = 5; 
for (let i = 0; i < numRandomApes; i++) {
    const ape = createRandomApe();
    console.log(ape);
}
