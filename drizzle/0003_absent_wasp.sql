CREATE TABLE `tax_payments` (
	`id` integer PRIMARY KEY NOT NULL,
	`sum` integer,
	`pay_date` text,
	`year` integer NOT NULL,
	`quarter` integer NOT NULL,
	`tax` integer NOT NULL,
	`latest_pay_date` text NOT NULL
);
