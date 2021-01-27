const INITIAL_CHARACTER_STATE = {
<<<<<<< HEAD
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
=======
  race: {
    name: "",
    subrace: "",
    // First index is race url, second is subrace index
    url: [],
    speed: "",
    size: ""
  },
  class: {
    name: "",
    url: "",
    hitDie: 0,
    totalHP: 0,
  },
>>>>>>> 81149a80e997d95cfb5b910ad72ddd9ffce54b23
  abilities: {
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
  },
<<<<<<< HEAD
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
=======
  background: {
    name: "",
    url: "",
    appearance: "",
    personality: "",
    alignment: "",
    languages: [
      // {
      //   name: "",
      //   origin: "", // Either race or background
      //   url: ""
      // }
    ],
    age: "",
    height: "",
    weight: "",
  },
  proficiencies: {
    skills: [],
    //   {
    //     name: "",
    //     origin: "", // Either class or background
    //     ability: "", // One of the six ability scores
    //     url: ""
    //   }
    // ],
    spells: [],
    //   {
    //     name: "",
    //     url: ""
    //   }
    // ],
    savingThrows: [],
    // name of the abilities key (not an object, an array of strings)

  },

  //   {
    //     name: "",
    //     type: "", type of equipment
    //     url: ""
    //   }
    // ],

  equipment: {
    total:[]
    /*armor: [
      {
        name: "",
        url: ""
      }
    ],
    weapons: [
      {
        name: "",
        url: ""
      }
    ],
    tools: [
      {
        name: "",
        url: ""
      }
    ],
    misc: [
      {
        name: "",
        url: ""
      }
    ]*/

  
>>>>>>> 81149a80e997d95cfb5b910ad72ddd9ffce54b23
  }
};

export default INITIAL_CHARACTER_STATE;
