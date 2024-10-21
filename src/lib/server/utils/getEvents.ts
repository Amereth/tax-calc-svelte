import { eq } from 'drizzle-orm'
import { db } from '../db'
import { events } from '../schemas/events'

export const getEvents = ({ year }: { year: number }) =>
	db.select().from(events).where(eq(events.year, year))
