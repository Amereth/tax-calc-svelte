CREATE TABLE
    `tmp_taxes` (
        `id` integer PRIMARY KEY NOT NULL,
        `name` text NOT NULL,
        `type` text NOT NULL,
        `sum` integer NOT NULL,
        `date` text NOT NULL,
        `user_id` integer NOT NULL,
        FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE no action ON DELETE cascade
    );

--> statement-breakpoint
INSERT INTO
    tmp_taxes (id, name, type, sum, date, user_id)
SELECT
    id,
    name,
    type,
    sum,
    date,
    user_id
FROM
    tax;

--> statement-breakpoint
DROP TABLE tax;

--> statement-breakpoint
ALTER TABLE tmp_taxes
RENAME TO taxes;