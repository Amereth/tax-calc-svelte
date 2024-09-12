CREATE TABLE `payments` (
	`id` integer PRIMARY KEY NOT NULL,
	`sum` integer NOT NULL,
	`date` text NOT NULL,
	`secondary_sum` integer,
	`secondary_currency` text
);
