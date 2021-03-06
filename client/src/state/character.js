const INITIAL_CHARACTER_STATE = {
  race: {
    name: "",
    subrace: "",
    // First index is race url, second is subrace index
    // url: [],
    raceUrl: "",
    subraceUrl: "",
    speed: "",
    size: ""
  },
  character_class: {
    name: "",
    url: "",
    hitDie: 0,
    totalHP: 0
  },
  abilities: {
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
  },
  background: {
    characterName: "",
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
    skills: [
      //   {
      //     name: "",
      //     origin: "", // Either class or background
      //     ability: "", // One of the six ability scores
      //     url: ""
      //   }
    ],
    spells: [
      //   {
      //     name: "",
      //     url: "",
      //   }
    ],
    items: [
      //   {
      //     name: "",
      //     url: ""
      //   }
    ],
    // Contains the names of the abilities (not an object, an array of strings)
    savingThrows: [],

  },

  equipment: {
    total: [
      //   {
      //     name: "",
      //     type: "",
      //     url: ""
      //   }
    ]
  }
};

export default INITIAL_CHARACTER_STATE;