-- CreateTable
CREATE TABLE "favorites" (
    "fav_id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "fav_movies" JSON[],
    "fav_tv" JSON[],

    CONSTRAINT "favorites_pkey" PRIMARY KEY ("fav_id")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" BIGSERIAL NOT NULL,
    "user_email" VARCHAR NOT NULL,
    "user_password" VARCHAR NOT NULL,
    "user_first_name" VARCHAR NOT NULL,
    "user_last_name" VARCHAR NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_user_email_key" ON "users"("user_email");

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "user_favorites" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
