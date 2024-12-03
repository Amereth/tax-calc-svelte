// See https://kit.svelte.dev/docs/types#app

import type { User, Session } from '$lib/server/schemas/types'

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: User
			session: Session
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {}
