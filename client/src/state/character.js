const INITIAL_CHARACTER_STATE = {
  race: {
    name: "",
    subrace: "",
    // First index is race url, second is subrace index
    url: []
  },
  class: {
    name: "",
    url: "",
    hitDie: 0,
    totalHP: 0,
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
    name: "",
    url: "",
    appearance: "",
    personality: "",
    alignment: "",
    languages: [
      {
        name: "",
        origin: "", // Either race or background
        endPointUrl: ""
      }
    ],
    age: "",
    height: "",
    weight: "",
    speed: "",
    size: ""
  },
  proficiencies: {
    skills: [
      {
        name: "",
        origin: "", // Either class or background
        ability: "", // One of the six ability scores
        endPointUrl: ""
      }
    ],
    spells: [
      {
        name: "",
        endPointUrl: ""
      }
    ],
    savingThrows: [
      // name of the abilities key (not an object, an array of strings)
    ]
  },
  equipment: {
    armor: [
      {
        name: "",
        endPointUrl: ""
      }
    ],
    weapons: [
      {
        name: "",
        endPointUrl: ""
      }
    ],
    tools: [
      {
        name: "",
        endPointUrl: ""
      }
    ],
    misc: [
      {
        name: "",
        endPointUrl: ""
      }
    ]
  }
};

export default INITIAL_CHARACTER_STATE;
