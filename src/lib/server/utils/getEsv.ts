import { db } from '../db'
import { esv } from '../schemas/esv'

export const getEsv = () => db.select().from(esv)
