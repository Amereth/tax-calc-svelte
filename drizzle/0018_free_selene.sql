ALTER TABLE `sso_codes`
RENAME TO `otp_codes`;

--> statement-breakpoint
PRAGMA foreign_keys = OFF;

--> statement-breakpoint
CREATE TABLE
	`__new_otp_codes` (
		`id` integer PRIMARY KEY NOT NULL,
		`code` integer NOT NULL,
		`user_id` integer NOT NULL,
		`user_email` integer NOT NULL,
		FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE no action ON DELETE cascade,
		FOREIGN KEY (`user_email`) REFERENCES `users` (`email`) ON UPDATE no action ON DELETE no action
	);

--> statement-breakpoint
INSERT INTO
	`__new_otp_codes` ("id", "code", "user_id", "user_email")
SELECT
	"id",
	"code",
	"user_id",
	"user_email"
FROM
	`otp_codes`;

--> statement-breakpoint
DROP TABLE `otp_codes`;

--> statement-breakpoint
ALTER TABLE `__new_otp_codes`
RENAME TO `otp_codes`;

--> statement-breakpoint
PRAGMA foreign_keys = ON;