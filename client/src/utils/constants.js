module.exports = {
    API_BASE_URL: "https://www.dnd5eapi.co",
    RACES_URL: `https://www.dnd5eapi.co/api/races`,
    CLASSES_URL: `https://www.dnd5eapi.co/api/classes`,
    BACKGROUNDS_URL: `https://dnd-backgrounds-default-rtdb.firebaseio.com/backgrounds.json`,
    BACKGROUNDS_BASE_URL: `https://dnd-backgrounds-default-rtdb.firebaseio.com/backgrounds`,
    LANGUAGES_URL: `http://www.dnd5eapi.co/api/languages/`,
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
        'Athletics': 'strength',
        'Acrobatics': 'dexterity',
        'Sleight of Hand': 'dexterity',
        'Stealth': 'dexterity',
        'Arcana': 'intelligence',
        'History': 'intelligence',
        'Investigation': 'intelligence',
        'Nature': 'intelligence',
        'Religion': 'intelligence',
        'Animal Handling': 'wisdom',
        'Insight': 'wisdom',
        'Medicine': 'wisdom',
        'Perception': 'wisdom',
        'Survival': 'wisdom',
        'Deception': 'charisma',
        'Intimidation': 'charisma',
        'Performance': 'charisma',
        'Persuasion': 'charisma',
    }
}
