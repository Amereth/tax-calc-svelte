import { users, sessions } from './schemas'
import type { User, Session } from './schemas/types'
import { db } from './db'
import { eq } from 'drizzle-orm'

export const SESSION_EXPIRATION_PERIOD = 1000 * 60 * 60 * 24 * 7

export function generateSessionId(): Session['id'] {
	const bytes = new Uint8Array(20)

	crypto.getRandomValues(bytes)

	return Buffer.from(bytes).toString('base64')
}

export async function createSession(
	sessionId: Session['id'],
	userId: User['id'],
): Promise<Session> {
	const session: Session = {
		id: sessionId,
		userId,
		expiresAt: new Date(Date.now() + SESSION_EXPIRATION_PERIOD), // 7 days
	}

	await db.insert(sessions).values(session)

	return session
}

export async function validateSession(sessionId: Session['id']): Promise<SessionValidationResult> {
	const result = await db
		.select({ user: users, session: sessions })
		.from(sessions)
		.innerJoin(users, eq(sessions.userId, users.id))
		.where(eq(sessions.id, sessionId))

	if (result.length < 1) {
		return { session: null, user: null }
	}

	const { user, session } = result[0]

	if (Date.now() >= session.expiresAt.getTime()) {
		await db.delete(sessions).where(eq(sessions.id, session.id))
		return { session: null, user: null }
	}

	if (Date.now() >= session.expiresAt.getTime() - SESSION_EXPIRATION_PERIOD / 2) {
		session.expiresAt = new Date(Date.now() + SESSION_EXPIRATION_PERIOD)
		await db
			.update(sessions)
			.set({ expiresAt: session.expiresAt })
			.where(eq(sessions.id, session.id))
	}

	return { session, user }
}

export async function invalidateSession(sessionId: Session['id']): Promise<void> {
	await db.delete(sessions).where(eq(sessions.id, sessionId))
}

export type SessionValidationResult =
	| { session: Session; user: User }
	| { session: null; user: null }
