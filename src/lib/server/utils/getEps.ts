import { db } from '../db'
import { ep } from '../schemas/ep'

export const getEps = () => db.select().from(ep)
