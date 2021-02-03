module.exports = {
    API_BASE_URL: "https://www.dnd5eapi.co",
    RACES_URL: `https://www.dnd5eapi.co/api/races`,
    CLASSES_URL: `https://www.dnd5eapi.co/api/classes`,
    BACKGROUNDS_URL: `https://dnd-backgrounds-default-rtdb.firebaseio.com/backgrounds.json`,
    BACKGROUNDS_BASE_URL: `https://dnd-backgrounds-default-rtdb.firebaseio.com/backgrounds`,
    LANGUAGES_URL: `http://www.dnd5eapi.co/api/languages/`,
    SELF_BASE_URL: `https://tt-dd-cc.herokuapp.com`,
    BACKEND_BASE_URL: `https://tt-dd-cc.herokuapp.com`,
    CREATION_SECTIONS:
        [
            {
                title: "1. Race",
                subSections: ["Subrace"]
            },
            {
                title: "2. Class",
                subSections: []
            },
            {
                title: "3. Ability Scores",
                subSections: ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"]
            },
            {
                title: "4. Character Details",
                subSections: ["Background", "Personality", "Appearance", "Alignment", "Languages"]
            },
            {
                title: "5. Proficiencies",
                subSections: ["Skills", "Features"]
            },
            {
                title: "6. Equipment",
                subSections: ["Armor", "Weapons", "Tools", "Misc."]
            },
        ],
    STANDARD_ARRAY: [15, 14, 13, 12, 10, 8],
    ALIGNMENTS: [
        'Lawful Good',
        'Lawful Neutral',
        'Lawful Evil',
        'Neutral Good',
        'Neutral',
        'Neutral Evil',
        'Chaotic Good',
        'Chaotic Neutral',
        'Chaotic Evil'
    ],
    ABILITY_KEY_MAP: {
        "str": "strength",
        "dex": "dexterity",
        "con": "constitution",
        "int": "intelligence",
        "wis": "wisdom",
        "cha": "charisma"
    },
    SKILLS: {
        'Acrobatics': 'dexterity',
        'Animal Handling': 'wisdom',
        'Arcana': 'intelligence',
        'Athletics': 'strength',
        'Deception': 'charisma',
        'History': 'intelligence',
        'Insight': 'wisdom',
        'Intimidation': 'charisma',
        'Investigation': 'intelligence',
        'Medicine': 'wisdom',
        'Nature': 'intelligence',
        'Perception': 'wisdom',
        'Performance': 'charisma',
        'Persuasion': 'charisma',
        'Religion': 'intelligence',
        'Sleight of Hand': 'dexterity',
        'Stealth': 'dexterity',
        'Survival': 'wisdom',
    },
}
