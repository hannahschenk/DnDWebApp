import axios from 'axios';
import { useCharacter } from '../state/logic';
import constants from './constants';
/*
* Signature: postCharacter(character)
* Description: Sends the character state to the back end server
*/
export const postCharacter = async (character, token) => {
  return await axios.post(`${constants.BACKEND_BASE_URL}/api/character/`, 
  JSON.stringify(character), {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

/*
* Signature: getCharacters(token)
* Description: gets all characters
*/
export const getCharacters = async (token) => {
  return await axios.get(`${constants.BACKEND_BASE_URL}/api/character/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

/*
* Signature: getCharacter(token)
* Description: gets all characters
*/
export const getCharacter = async (id, token) => {
  return await axios.get(`${constants.BACKEND_BASE_URL}/api/character/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

/*
* Signature: updateCharacter(character, id)
* Description: Sends the updated character state to the back end server
*/
export const updateCharacter = async (character, id, token) => {
  return await axios.put(`${constants.BACKEND_BASE_URL}/api/character/${id}`, 
  JSON.stringify(character), {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

/*
* Signature: deleteCharacter(id)
* Description: Reset character to initial state, delete from server
*/
export const deleteCharacter = async (id, token) => {
  return await axios.delete(`${constants.BACKEND_BASE_URL}/api/character/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export const createUser = async (userObj, token) => {
  return await axios.post(`${constants.BACKEND_BASE_URL}/api/user`, 
  JSON.stringify(userObj), {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  });
}