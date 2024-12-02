CREATE TABLE
    `tmp_payments` (
        `id` integer PRIMARY KEY NOT NULL,
        `sum` integer NOT NULL,
        `date` text NOT NULL,
        `original_sum` integer,
        `original_currency` text,
        `user_id` integer NOT NULL,
        FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE no action ON DELETE cascade
    );

--> statement-breakpoint
INSERT INTO
    tmp_payments (
        id,
        sum,
        date,
        original_sum,
        original_currency,
        user_id
    )
SELECT
    id,
    sum,
    date,
    secondary_sum,
    secondary_currency,
    user_id
FROM
    payments;

--> statement-breakpoint
DROP TABLE payments;

--> statement-breakpoint
ALTER TABLE tmp_payments
RENAME TO payments;