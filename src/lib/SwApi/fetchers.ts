import {
  CharacterListFetcher,
  CharactersListResult,
  ResourceFetcher,
  ResourceFetcherById
} from './types'
import axios from 'axios'
import { Character } from 'models'
import { sanitizeUrl, urlToIdAndType } from 'lib/utils'

const instance = axios.create({
  baseURL: 'https://swapi.dev/api/',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    "Access-Control-Allow-Origin": true,
    "Access-Control-Allow-Credentials": true
  }
});

export const fetchCharacterList: CharacterListFetcher = async (
  url = 'https://swapi.dev/api/people/?page=1'
) => {

  url = sanitizeUrl(url)
  const resp = await instance.get(url)
  // if(!resp) return null;
  const data = resp.data
  // if(data!) return null;
  data.results = data.results?.map((char: Character) => {
    const [id, type] = urlToIdAndType(url)
    char.id = id
    char.type = type
    return char
  })
  return data as CharactersListResult
}

export const fetchResource: ResourceFetcher = async <T>(url: string) => {

  const resp = await instance.get(sanitizeUrl(url))
  const data = resp.data
  return data as T
}

export const fetchResourceById: ResourceFetcherById = async <T>(
  id: string,
  type: string
) => {
  const url = `https://swapi.dev/api/${type}/${id}`
  return fetchResource<T>(sanitizeUrl(url))
}
