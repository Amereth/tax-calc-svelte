CREATE TABLE
	`sso_codes` (
		`id` integer PRIMARY KEY NOT NULL,
		`code` integer NOT NULL,
		`user_id` integer NOT NULL,
		`user_email` integer NOT NULL,
		FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE no action ON DELETE no action,
		FOREIGN KEY (`user_email`) REFERENCES `users` (`email`) ON UPDATE no action ON DELETE no action
	);