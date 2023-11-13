How can I get the docker db container ip dinamically to pass it to .env
so in that way I can docker-compose up all containers (pg_admin, db, and api)
because currently I have to docker-compose at db container first to docker inspect what the IP Address is
so I can pass it to .env and then I have build the image (docker build -t tmdb-api:latest .), but before it, I have to comment "RUN npx prisma migrate dev" out because if you start the build with the comment, an error happens:

Error: P1001: Can't reach database server at `172.29.0.2`:`5432`

Please make sure your database server is running at `172.29.0.2`:`5432`.
The command '/bin/sh -c npx prisma migrate dev' returned a non-zero code: 1

And I think it's because it's not assigned to same network when building, so I have to build the image without the comment, and then run it with the network where the db is running (docker run --network tmdb-backend_tmdb-net -it tmdb-api sh), with this we have a terminal, so we can execute the command "npx prisma migrate dev"

psql -h 172.29.0.2 -p 5432 -U root -d tmdb -> _Connect to db remotely from host_
docker run --rm --network tmdb-backend-tmdb-net -it -p 3000:3000 tmdb-api:latest
docker exec -it tmdb-api-container-name npx prisma migrate dev -> _create tables_
