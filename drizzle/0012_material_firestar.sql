ALTER TABLE `events` ADD `user_id` integer REFERENCES users (id);

--> statement-breakpoint
UPDATE events
SET
    `user_id` = 1;

--> statement-breakpoint
ALTER TABLE `payments` ADD `user_id` integer REFERENCES users (id);

--> statement-breakpoint
update payments
set
    `user_id` = 1;

--> statement-breakpoint
ALTER TABLE `tax` ADD `user_id` integer REFERENCES users (id);

--> statement-breakpoint
update tax
set
    `user_id` = 1;