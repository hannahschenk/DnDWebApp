const INITIAL_CHARACTER_STATE = {
  // User can change 'name' and 'subrace'
  race: {
    name: '',
    subrace: '',
    // Update these fields from API call
    size: 'Medium',
    speed: 30,
    languages: [],
  },
  // User can change 'name' and 'features'
  class: {
    name: '',
    // Total HP is based on class choice (hit die) and Constitution
    hitDie: 0,
    totalHP: 0,
  },
  // Ability score values, modifiers and bonuses can be calculated in-app
  abilities: {
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
  },
  // An array containing the user's proficiencies, based on class and user's selection
  proficiencies: {
    savingThrows: [],
    skills: [],
    spells: [],
  },
  // Fields for the character's chosen background and stats
  background: {
    name: '',
    appearance: '',
    personality: '',
    alignment: '',
    languages: [],
    // If we have fields for the user inputting age, height, and weight, we should store them here
    // age, height, and weight are dependent on their race
    age: 0,
    height: '',
    weight: '',
  },
  // Arrays containing the player's selected equipment
  equipment: {
    armor: [],
    weapons: [],
    tools: [],
    misc: [],
  }
};

export default INITIAL_CHARACTER_STATE;
