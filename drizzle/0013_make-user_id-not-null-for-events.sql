CREATE TABLE
    `tmp_events` (
        `id` integer PRIMARY KEY NOT NULL,
        `type` text NOT NULL,
        `sum` integer,
        `done_date` text,
        `year` integer NOT NULL,
        `quarter` integer NOT NULL,
        `latest_done_date` text NOT NULL,
        `user_id` integer NOT NULL,
        FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE no action ON DELETE cascade
    );

--> statement-breakpoint
INSERT INTO
    tmp_events (
        id,
        type,
        sum,
        done_date,
        year,
        quarter,
        latest_done_date,
        user_id
    )
SELECT
    id,
    type,
    sum,
    done_date,
    year,
    quarter,
    latest_done_date,
    user_id
FROM
    events;