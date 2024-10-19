CREATE TABLE `events` (
	`id` integer PRIMARY KEY NOT NULL,
	`type` text NOT NULL,
	`sum` integer,
	`done_date` text,
	`year` integer NOT NULL,
	`quarter` integer NOT NULL,
	`latest_done_date` text NOT NULL
);
--> statement-breakpoint
DROP TABLE `tax_payments`;