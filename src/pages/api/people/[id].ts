import { NextApiRequest, NextApiResponse } from 'next'
import { fetchResourceById } from "lib/SwApi"
import { Character } from "models"

export default async (req: NextApiRequest, res: NextApiResponse<Character | null>) => {
  const { id } = req.query
  console.log({id})
  if(id) {
    res.setHeader('Content-Type', 'application/json')
    try{
      console.log('run fetch');
      const swRes = await fetchResourceById<Character>(id as string, 'people')
      console.log({swRes})
    res.status(200).send(swRes)
    } catch {
      res.status(500).send(null)
    }
  } else {
    res.status(500).send(null)
  }
}