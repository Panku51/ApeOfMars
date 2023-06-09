import random from "random";

const powersByLevel = {
  2: ['fire', 'ice'],
  3: ['water', 'earth', 'plant'],
  4: ['poison', 'electric', 'wind'],
  5: ['metal', 'lightning', 'shadow', 'light'],
  6: ['gravity', 'time', 'energy', 'spirit', 'illusion']
};

const origins = ['phoebs', 'demons'];

const rarities = ['common', 'rare', 'epic', 'legendary', 'super-legend'];

const powerRanges = {
  common: { min: 10, max: 30 },
  rare: { min: 30, max: 60 },
  epic: { min: 50, max: 70 },
  legendary: { min: 70, max: 85 },
  'super-legend': { min: 85, max: 99 }
};

const mineRates = {
  common: 120,
  rare: 90,
  epic: 60,
  legendary: 30,
  'super-legend': 10
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
  const rarity = getRandomElement(rarities);

  const powerLevel = rarity === 'super-legend' ? 6 : parseInt(rarity.charAt(0));

  const powers = powersByLevel[powerLevel];
  if (!powers) {
    throw new Error(`No powers defined for power level ${powerLevel}`);
  }

  const numPowers = getRandomNumber(1, powerLevel);
  const selectedPowers = [];

  for (let i = 0; i < numPowers; i++) {
    const power = getRandomElement(powers);
    selectedPowers.push(power);
  }

  const origin = getRandomElement(origins);

  const powerRange = powerRanges[rarity];

  const powerValues = {};
  for (const power of selectedPowers) {
    const powerValue = getRandomNumber(powerRange.min, powerRange.max);
    powerValues[power] = powerValue;
  }

  const mineRate = mineRates[rarity];

  const ape = {
    powers: powerValues,
    origin,
    rarity,
    powerLevel,
    mineRate,
    coolDifferenceTime
  };

  return ape;
}

const numRandomApes = 5;
for (let i = 0; i < numRandomApes; i++) {
  try {
    const ape = createRandomApe();
    console.log(ape);
  } catch (error) {
    console.error(error);
  }
}
