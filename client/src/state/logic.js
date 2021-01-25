import React from 'react'
import INITIAL_CHARACTER_STATE from './character';

// A custom context to manage character and setCharacter state changes with a CharacterContext.Provider component in App
//      import { CharacterContext } from 'Logic';
//      <CharacterContext.Provider value={{ character, setCharacter }}>
//          {/* Render app here */}
//      </CharacterContext.Provider>
export const CharacterContext = React.createContext(undefined);

// A custom hook to utilize state and setCharacter INSIDE components
//      import { useCharacter } from 'Logic';
//      const { character, setCharacter } = useCharacter();
// Must use a non-null assertion if working in a TypeScript .tsx file
//      const { character, setCharacter } = useCharacter()!;
export const useCharacter = () => React.useContext(CharacterContext);


export const characterReducer = (character = INITIAL_CHARACTER_STATE, action) => {
  const [ACTION, TYPE] = action.type.split('_');
  const stat = TYPE.toLowerCase();
  // ACTION is: UPDATE or CLEAR
  // TYPE is: the key for the character state: 'abilities', 'alignment', 'background', 'class', 'languages', 'proficiencies', 'race', 'spells'
  // console.log(ACTION, TYPE);

  switch (action.type) {
    case `UPDATE_${TYPE}`: {
      if (action.payload) {
        clearPropAfter(character, stat)
        return (character = {
          ...character,
          [stat]: { ...character[stat], ...action.payload },
        });
      } else return character;
    }
    case `CLEAR_${TYPE}`:
      return (character = {
        ...character,
        [stat]: INITIAL_CHARACTER_STATE[stat],
      });
    default:
      return character;
  }
};

const clearPropAfter = (character, stat) => {
  const propOrder = ["race", "class", "abilities", "background", "proficiencies", "equipment"]
  let startIndex = propOrder.indexOf(stat)
  for(let i = startIndex + 1; i < propOrder.length; i++){
    for(const key in character[propOrder[i]]){
      if(typeof(character[propOrder[i]][key]) == "string"){
        character[propOrder[i]][key] = ""
      }
      else if(typeof(character[propOrder[i]][key]) == "number"){
        character[propOrder[i]][key] = 0
      }
      else{
        character[propOrder[i]][key] = []
      }
    }
  }
}

// CODE TO IMPLEMENT REDUCER
  // Grab initial character state and assign the CharacterReducer to the setCharacter function
//   const [character, setCharacter] = useReducer(characterReducer, INITIAL_CHARACTER_STATE, () => {
//     // Tries to get character from local storage, if one is not present, set to initial combined character state
//     const localCharacter = localStorage.getItem('character');
//     return localCharacter ? JSON.parse(localCharacter) : INITIAL_CHARACTER_STATE;
// });

// // Updates the local storage with changes in state (also prints to console)
// useEffect(() => {
//     console.log(character);
//     localStorage.setItem('character', JSON.stringify(character));
// }, [character]);