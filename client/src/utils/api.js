import axios from 'axios';
import { useCharacter } from '../state/logic';

/*
* Signature: postCharacter(character)
* Description: Sends the character state to the back end server
*/
export const postCharacter = async (character) => {
  console.log("POST", character);
  return await axios.post('/api/character/', character, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

/*
* Signature: updateCharacter(character, id)
* Description: Sends the updated character state to the back end server
*/
export const updateCharacter = async (character, id) => {
  console.log("PUT", character);
  return await axios.put('/api/character/' + id, JSON.stringify(character), {
    headers: {
      "Content-Type": "application/json",
    }
  });
}

/*
* Signature: deleteCharacter(id)
* Description: Reset character to initial state, delete from server
*/
export const deleteCharacter = async (id) => {
  console.log("DELETE", character);
  const { setCharacter } = useCharacter();
  setCharacter({ type: "CLEAR_CHARACTER" });

  return await axios.delete('/api/character/' + id);
}
