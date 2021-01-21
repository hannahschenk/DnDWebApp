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
    features: [],
    hitDie: 0,
    // Total HP is based on class choice (hit die) and Constitution
    totalHP: 0,
    languages: []
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
    bonus: 2,
    armor: [],
    weapons: [],
    tools: [],
    savingThrows: [],
    skills: [],
  },
  // Fields for the character's chosen background and stats
  background: {
    name: '',
    appearance: '',
    personality: '',
    languages: [],
    // age, height, and weight are dependent on their race
    age: 0,
    height: '',
    weight: '',
  },
  // A single field for the character's alignment
  alignment: {
    name: '',
  },
  // // An array of the user's chosen languages
  // languages: {
  //   raceLanguages: [],
  //   classLanguages: [],
  //   backgroundLanguages: [],
  // },
  // Arrays containing the player's selected spells
  spells: {
    cantrips: [],
    level1: [],
  },
};

export default INITIAL_CHARACTER_STATE;
