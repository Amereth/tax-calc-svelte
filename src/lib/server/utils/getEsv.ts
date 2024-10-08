import { db } from '../db'
import { esv } from '../schemas/esv'

export const getEsvs = () => db.select().from(esv)
