CREATE TABLE
    IF NOT EXISTS "user" (
        "id" SERIAL PRIMARY KEY,
        "username" VARCHAR(255) NOT NULL,
        "email" VARCHAR(255) NOT NULL UNIQUE,
        "password" VARCHAR(255) NOT NULL
    );

CREATE TABLE
    IF NOT EXISTS "post" (
        "id" SERIAL PRIMARY KEY,
        "title" VARCHAR(255) NOT NULL,
        "content" TEXT NOT NULL,
        "user_id" INTEGER REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
        "created_at" TIMESTAMP
        WITH
            TIME ZONE NOT NULL,
            "updated_at" TIMESTAMP
        WITH
            TIME ZONE NOT NULL
    );

CREATE TABLE
    IF NOT EXISTS "comment" (
        "id" SERIAL PRIMARY KEY,
        "comment_text" VARCHAR(255) NOT NULL,
        "user_id" INTEGER REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE CASCADE,
        "post_id" INTEGER REFERENCES "post" ("id") ON DELETE NO ACTION ON UPDATE CASCADE,
        "created_at" TIMESTAMP
        WITH
            TIME ZONE NOT NULL,
            "updated_at" TIMESTAMP
        WITH
            TIME ZONE NOT NULL
    );

SELECT
    *
FROM
    "post"
WHERE
    "post"."id" = 'signup';