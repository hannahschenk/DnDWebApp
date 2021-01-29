module.exports = {
  SPELLS: {
    bard: {
      ability: "charisma",
      knownCantrips: 2,
      knownLevel1: (ability) => (4),
      spellSaveDC: (charisma) => (Math.floor((charisma - 10) / 2) + 2 + 8),
      spellAttackMod: (charisma) => (Math.floor((charisma - 10) / 2) + 2),
    },
    cleric: {
      ability: "wisdom",
      knownCantrips: 3,
      knownLevel1: (wisdom) => (Math.floor((wisdom - 10) / 2) + 1),
      spellSaveDC: (wisdom) => (Math.floor((wisdom - 10) / 2) + 2 + 8),
      spellAttackMod: (wisdom) => (Math.floor((wisdom - 10) / 2) + 2),
    },
    druid: {
      ability: "wisdom",
      knownCantrips: 2,
      knownLevel1: (wisdom) => (Math.floor((wisdom - 10) / 2) + 1),
      spellSaveDC: (wisdom) => (Math.floor((wisdom - 10) / 2) + 2 + 8),
      spellAttackMod: (wisdom) => (Math.floor((wisdom - 10) / 2) + 2),
    },
    paladin: {
      ability: "charisma",
      knownCantrips: 0,
      knownLevel1: (charisma) => (Math.floor((charisma - 10) / 2)),
      spellSaveDC: (charisma) => (Math.floor((charisma - 10) / 2) + 2 + 8),
      spellAttackMod: (charisma) => (Math.floor((charisma - 10) / 2) + 2),
    },
    ranger: {
      ability: "wisdom",
      knownCantrips: 0,
      knownLevel1: (wisdom) => { Math.floor((wisdom - 10) / 2) },
      spellSaveDC: (wisdom) => { Math.floor((wisdom - 10) / 2) + 2 + 8 },
      spellAttackMod: (wisdom) => { Math.floor((wisdom - 10) / 2) + 2 },
    },
    sorcerer: {
      ability: "charisma",
      knownCantrips: 4,
      knownLevel1: (ability) => (2),
      spellSaveDC: (charisma) => (Math.floor((charisma - 10) / 2) + 2 + 8),
      spellAttackMod: (charisma) => (Math.floor((charisma - 10) / 2) + 2),
    },
    warlock: {
      ability: "charisma",
      knownCantrips: 2,
      knownLevel1: (ability) => (2),
      spellSaveDC: (charisma) => (Math.floor((charisma - 10) / 2) + 2 + 8),
      spellAttackMod: (charisma) => (Math.floor((charisma - 10) / 2) + 2),
    },
    wizard: {
      ability: "intelligence",
      knownCantrips: 3,
      knownLevel1: (intelligence) => (Math.floor((intelligence - 10) / 2) + 1),
      spellSaveDC: (intelligence) => (Math.floor((intelligence - 10) / 2) + 2 + 8),
      spellAttackMod: (intelligence) => (Math.floor((intelligence - 10) / 2) + 2),
    }
  }
}
  /*
SPELLS: {
bard: {
ability: "charisma",
knownCantrips: 2,
knownLevel1: (ability) => (4),
spellSaveDC: (charisma) => (Math.floor((charisma - 10) / 2) + 2 + 8),
spellAttackMod: (charisma) => (Math.floor((charisma - 10) / 2) + 2),
cantrips: [
'Blade Ward',
'Dancing Lights',
'Friends',
'Light',
'Mage Hand',
'Mending',
'Message',
'Illusion',
'Prestigitation',
'True Strike',
'Vicious Mockery'
],
level1: [
'Animal Friendship',
'Bane',
'Charm',
'Person',
'Comprehend',
'Languages',
'Cure',
'Wounds',
'Detect Magic',
'Disguise Self',
'Dissonant Whispers',
'Faerie Fire',
'Feather Fall',
'Healing Word',
'Heroism',
'Identify',
'Illusory Script',
'Longstrider',
'Silent Image',
'Sleep',
'Speak with Animals',
'Tasha’s Hideous Laughter',
'Thunderwave',
'Unseen Servant',
]
},
cleric: {
ability: "wisdom",
knownCantrips: 3,
knownLevel1: (wisdom) => (Math.floor((wisdom - 10) / 2) + 1),
spellSaveDC: (wisdom) => (Math.floor((wisdom - 10) / 2) + 2 + 8),
spellAttackMod: (wisdom) => (Math.floor((wisdom - 10) / 2) + 2),
cantrips: [
'Guidance',
'Light',
'Mending',
'Resistance',
'Sacred Flame',
'Spare the Dying',
'Thaumaturgy',
],
level1: [
'Bane',
'Bless',
'Command',
'Create or Destroy Water',
'Cure Wounds',
'Detect Evil and Good',
'Detect Magic',
'Detect Poison and Disease',
'Guiding Bolt',
'Healing Word',
'Inflict Wounds',
'Protection from Evil and Good',
'Purify Food and Drink',
'Sanctuary',
'Shield of Faith',
]
},
druid: {
ability: "wisdom",
knownCantrips: 2,
knownLevel1: (wisdom) => (Math.floor((wisdom - 10) / 2) + 1),
spellSaveDC: (wisdom) => (Math.floor((wisdom - 10) / 2) + 2 + 8),
spellAttackMod: (wisdom) => (Math.floor((wisdom - 10) / 2) + 2),
cantrips: [
'Druidcraft',
'Guidance',
'Mending',
'Poison Spray',
'Produce Flame',
'Resistance',
'Shillelagh',
'Thorn Whip',
],
level1: [
'Animal Friendship',
'Charm Person',
'Create or Destroy Water',
'Cure Wounds',
'Detect Magic',
'Detect Poison and Disease',
'Entangle',
'Faerie Fire',
'Fog Cloud',
'Goodberry',
'Healing Word',
'Jump',
'Longstrider',
'Purify Food and Drink',
'Speak with Animals',
'Thunderwave',
]
},
paladin: {
ability: "charisma",
knownCantrips: 0,
knownLevel1: (charisma) => (Math.floor((charisma - 10) / 2)),
spellSaveDC: (charisma) => (Math.floor((charisma - 10) / 2) + 2 + 8),
spellAttackMod: (charisma) => (Math.floor((charisma - 10) / 2) + 2),
cantrips: [],
level1: [
'Bless',
'Command',
'Compelled Duel',
'Cure Wounds',
'Detect Evil and Good',
'Detect Magic',
'Detect Poison and Disease',
'Divine Favor',
'Heroism',
'Protection from Evil and Good',
'Purify Food and Drink',
'Searing Smite',
'Shield of Faith',
'Thunderous Smite',
'Wrathful Smite',
]
},
/*ranger: {
ability: "wisdom",
knownCantrips: 0,
knownLevel1: (wisdom) => { Math.floor((wisdom - 10) / 2) },
spellSaveDC: (wisdom) => { Math.floor((wisdom - 10) / 2) + 2 + 8 },
spellAttackMod: (wisdom) => { Math.floor((wisdom - 10) / 2) + 2 },
cantrips: [],
level1: [
'Alarm',
'Animal Friendship',
'Cure Wounds',
'Detect Magic',
'Detect Poison and Disease',
'Ensnaring Strike',
'Fog Cloud',
'Goodberry',
'Hail ofThorns',
'Hunter’s Mark',
'Jump',
'Longstrider',
'Speak with Animals',
]
},
sorcerer: {
ability: "charisma",
knownCantrips: 4,
knownLevel1: (ability) => (2),
spellSaveDC: (charisma) => (Math.floor((charisma - 10) / 2) + 2 + 8),
spellAttackMod: (charisma) => (Math.floor((charisma - 10) / 2) + 2),
cantrips: [
'Acid Splash',
'Blade Ward',
'Chill Touch',
'Dancing Lights',
'Fire Bolt',
'Friends',
'Light',
'Mage Hand',
'Mending',
'Message',
'Minor Illusion',
'Poison Spray',
'Prestidigitation',
'Ray of Frost',
'Shocking Grasp',
'True Strike',
],
level1: [
'Burning Hands',
'Charm Person',
'Chromatic Orb',
'Color Spray',
'Comprehend Languages',
'Detect Magic',
'Disguise Self',
'Expeditious Retreat',
'False Life',
'Feather Fall',
'Fog Cloud',
'Jump',
'Mage Armor',
'Magic Missile',
'Ray of Sickness',
'Shield',
'Silent Image',
'Sleep',
'Thunderwave',
'Witch Bolt',
]
},
warlock: {
ability: "charisma",
knownCantrips: 2,
knownLevel1: (ability) => (2),
spellSaveDC: (charisma) => (Math.floor((charisma - 10) / 2) + 2 + 8),
spellAttackMod: (charisma) => (Math.floor((charisma - 10) / 2) + 2),
cantrips: [
'Blade Ward',
'Chill Touch',
'Eldritch Blast',
'Friends',
'Mage Hand',
'Minor Illusion',
'Poison Spray',
'Prestidigitation',
'True Strike',
],
level1: [
'Armor of Agathys',
'Arms of Hadar',
'Charm Person',
'Comprehend Languages',
'Expeditious Retreat',
'Hellish Rebuke',
'Hex',
'Illusory Script',
'Protection from Evil and Good',
'Unseen Servant',
'Witch Bolt',
]
},
wizard: {
ability: "intelligence",
knownCantrips: 3,
knownLevel1: (intelligence) => (Math.floor((intelligence - 10) / 2) + 1),
spellSaveDC: (intelligence) => (Math.floor((intelligence - 10) / 2) + 2 + 8),
spellAttackMod: (intelligence) => (Math.floor((intelligence - 10) / 2) + 2),
cantrips: [
'Acid Splash',
'Blade Ward',
'Chill Touch',
'Dancing Lights',
'Fire Bolt',
'Friends',
'Light',
'Mage Hand',
'Mending',
'Message',
'Minor Illusion',
'Poison Spray',
'Prestidigitation',
'Ray of Frost',
'Shocking Grasp',
'True Strike',
],
level1: [
'Alarm',
'Burning Hands',
'Charm Person',
'Chromatic Orb',
'Color Spray',
'Comprehend Languages',
'Detect Magic',
'Disguise Self',
'Expeditious Retreat',
'False Life',
'Feather Fall',
'Find Familiar',
'Fog Cloud',
'Grease',
'Identify',
'Illusory Script',
'Jump',
'Longstrider',
'Mage Armor',
'Magic Missile',
'Protection from Evil and Good',
'Ray of Sickness',
'Shield',
'Silent Image',
'Sleep',
'Tasha’s Hideous Laughter',
'Tenser’s Floating Disk',
'Thunderwave',
'Unseen Servant',
'Witch Bolt',
]
}
} */