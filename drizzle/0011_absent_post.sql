ALTER TABLE `users` ALTER COLUMN "salt" TO "salt" text;--> statement-breakpoint
ALTER TABLE `users` ALTER COLUMN "passwordHash" TO "passwordHash" text;--> statement-breakpoint
ALTER TABLE `users` ADD `email` text NOT NULL;