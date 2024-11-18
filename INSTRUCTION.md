## Project Structure

```
├── gdb-project
│ ├── gdb/
│ │ ├── app
│ │ ├── public
│ ├── gdb-data/
│ │ ├── base
│ │ ├── global
│ │ ├── postgresql.conf
│ ├── hasura/
│ │ ├── app
│ │ ├── engine
│ │ ├── global
│ ├── postgraphile/
│ │ ├── custom-plugin
| | | ├── index.js
| | | └── package.json
| | └── Dockerfile
```

## Install

```
❯ mkdir gdb-project && cd gdb-project
❯ git clone git@github.com:nextensions/gdb.git
❯ cd gdb
❯ npm install
```

## Play

```
❯ npm run dev
```

---

## How to set up a project from scratch

### pre requirements

```
❯ docker -v
Docker version 27.3.1, build ce12230
❯ docker-compose -v
Docker Compose version 2.30.3
❯ node -v
v22.9.0
```

### 0. Make things structure

```
❯ mkdir gdb-project && cd gdb-project
```

#### NextUI CLI

```
❯ npm install -g nextui-cli
```

### 1. Next.js & NextUI Template

#### 1.1 create Next.js with NextUI template

> now (2024-11-14) NextUI support react 18 that use in Next.js 14. that why can't use Next.js 15 that use React 19 for now

```
❯ npx create-next-app -e https://github.com/nextui-org/next-app-template
```

use `gdb` for project name

```
Need to install the following packages:
create-next-app@15.0.3
Ok to proceed? (y)

✔ What is your project named? … gdb
```

#### 1.2 try to run command below and open `http://localhost:3000/` in your browser

```
❯ cd gdb
❯ npm run dev
```

#### What we got?

```
"react": "18.3.1",
"next": "14.2.4",
"@nextui-org/system": "2.2.6",

```

### 2. Postgresql

#### 2.1 create `.env`

under `gdb-project/gdb` use `vim .env` to create file create `.env` and put content below

```
POSTGRES_USER=gdb
POSTGRES_PASSWORD=SUPER_SECRET
POSTGRES_DB=gdb
```

#### 2.2 create `docker-compose.yml`

under `gdb-project/gdb` use `vim docker-compose.yml` to create `docker-compose.yml` and put content below

```
services:
  db:
    image: postgres
    container_name: gdb-postgres
    restart: always
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB}
    networks:
      - gdb-network
    ports:
      - "5431:5432"
    volumes:
      - ../gdb-data:/var/lib/postgresql/data
networks:
  gdb-network:
volumes:
  pgdata:

```

#### 2.3 bring up postgresql

```
❯ docker-compose up -d
❯ docker ps -a
```

#### 2.4 test connect with psql

```
❯ psql -h localhost -p 5431 -U gdb
```

#### 2.5 create host alias

add `127.0.0.1 postgresql.local` to `/etc/hosts`

#### 2.6 create dummy schema at postgres using your client

```
--- Create the table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  age INT NOT NULL
);

--- Insert some data
INSERT INTO users (name, age) VALUES ('Alice', 25);
INSERT INTO users (name, age) VALUES ('Bob', 30);
INSERT INTO users (name, age) VALUES ('Charlie', 35);
```

### 3 Graphql (hasura.io)

```
❯ curl -L https://graphql-engine-cdn.hasura.io/ddn/cli/v4/get.sh | bash
```

(install docker)

```
❯ ddn doctor
```

```
--> Moving cli from /tmp/cli-ddn-darwin-arm64 to /usr/local/bin
-->
--> DDN cli installed to /usr/local/bin
-->
8:00PM INF Evaluating the dependencies of DDN CLI...
DDN CLI location: "/usr/local/bin/ddn"
DDN CLI version: "v2.13.0"
+------------------------------+--------+-----+
| Criteria                     | Result | Fix |
+------------------------------+--------+-----+
| Docker available             | YES    |     |
+------------------------------+--------+-----+
| Docker Engine running        | YES    |     |
+------------------------------+--------+-----+
| Docker Registry reachable    | YES    |     |
+------------------------------+--------+-----+
| Docker Compose available     | YES    |     |
+------------------------------+--------+-----+
| Docker Compose version valid | YES    |     |
+------------------------------+--------+-----+
| Control Plane reachable      | YES    |     |
+------------------------------+--------+-----+
| DDN CLI Authenticated        | YES    |     |
+------------------------------+--------+-----+
```

```
❯ cd gdb-project
❯ ddn supergraph init hasura && cd hasura
❯ ddn connector init gdb -i
```

Hub Connector `hasura/postgres`
Connector Port `1558`
CONNECTION_URI `postgresql://gdb:SUPER_SECRET@postgresql.local:5431/gdb`

```
❯ sudo ddn connector introspect gdb
```

```
❯ ddn models add gdb users
❯ ddn supergraph build local
```

```
❯ sudo ddn run docker-start
```

Open your local console:

```
ddn console --local
```

### 4 postgraphile

#### Superfast Way

```
npx postgraphile -c 'postgresql://gdb:SUPER_SECRET@postgresql.local:5431/gdb' --watch --enhance-graphiql --dynamic-json
```

#### Supersmart Way

#### 4.1 create `graphql` at root of project

```
❯ cd {to your root project}
❯ mkdir graphql && cd graphql
```

#### 4.2 create `Dockerfile`

under **`gdb-project/graphql`** use `vim Dockerfile` to create `Dockerfile` and put content below

```
FROM node:alpine
LABEL description="Instant high-performance GraphQL API for your PostgreSQL database https://github.com/graphile/postgraphile"

# Install PostGraphile and PostGraphile connection filter plugin
RUN npm install -g postgraphile
RUN npm install -g postgraphile-plugin-connection-filter

EXPOSE 5000
ENTRYPOINT ["postgraphile", "-n", "0.0.0.0"]
```

#### 4.3 add service to `docker-compose`

under **`gdb-project/gdb`** use `vim docker-compose.yml` to update `docker-compose.yml` with content below (add under service section)

```
services:
  db:
    ...
  graphql:
      container_name: gdb-graphql
      restart: always
      image: gdb-graphql
      build:
        context: ./postgraphile
      env_file:
        - ./.env
      depends_on:
        - db
      networks:
        - gdb-network
      ports:
        - 5433:5433
      command:
        [
          "--connection",
          "${DATABASE_URL}",
          "--port",
          "5433",
          "--schema",
          "public",
          "--enhance-graphiql",
          "--append-plugins",
          "postgraphile-plugin-connection-filter,custom-plugin",
        ]
...
```

#### 4.4 update DSN at `.env`

under `gdb-project/gdb` use `vim .env` to update `.env` with content below

```
DATABASE_URL=postgres://gdb:SUPER_SECRET@db:5432/gdb
```

#### 4.5

under `gdb-project/gdb` add necessary stuff for postgraphile

```
❯ mkdir postgraphile && cd postgraphile
```

##### 4.5.1 create `Dockerfile `

under **`gdb-project/gdb/postgraphile`** use `vim Dockerfile` to create `Dockerfile` and put content below

```
FROM node:alpine
LABEL description="Instant high-performance GraphQL API for your PostgreSQL database https://github.com/graphile/postgraphile"

# Install PostGraphile and PostGraphile connection filter plugin
RUN npm install -g postgraphile
RUN npm install -g postgraphile-plugin-connection-filter

# Install custom plugin
COPY ./custom-plugin /tmp/custom-plugin
RUN cd /tmp/custom-plugin && npm pack
RUN npm install -g /tmp/custom-plugin/custom-plugin-0.0.1.tgz
RUN rm -rf /tmp/custom-plugin

EXPOSE 5000
ENTRYPOINT ["postgraphile", "-n", "0.0.0.0"]

```

##### 4.5.1 create folder `custom-plugin` and file inside

under **`gdb-project/gdb/postgraphile`**

```
❯ mkdir custom-plugin && cd custom-plugin
```

##### 4.5.2 create `package.json` then put content below

```
{
  "name": "custom-plugin",
  "version": "0.0.1",
  "description": "Custom plugin example for PostGraphile.",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Alexis ROLLAND",
  "license": "Apache-2.0",
  "dependencies": {
    "graphile-utils": "^4.5.6",
    "postgraphile": "^4.5.5"
  }
}
```

##### 4.5.3 create `index.js` then put content below

```
const { makeWrapResolversPlugin } = require("graphile-utils");

// Create custom wrapper for resolver createUser
const createUserResolverWrapper = () => {
  return async (resolve, source, args, context, resolveInfo) => {
    // You can do something before the resolver executes
    console.info("Hello world!");
    console.info(args);

    // Let resolver execute against database
    const result = await resolve();

    // You can do something after the resolver executes
    console.info("Hello again!");
    console.info(result);

    return result;
  };
};

// Register custom resolvers
module.exports = makeWrapResolversPlugin({
  Mutation: {
    createUser: createUserResolverWrapper(),
  },
});

```

##### 4.6 build postgraphile image

cd to **`gdb-project/gdb`**

```
❯ sudo docker-compose build graphql
```

##### 4.7 bring up services

```
❯ docker-compose up -d
```

```
PostGraphile v4.13.0 server listening on port 5433 🚀
gdb-graphql   |
  ‣ GraphQL API:         http://0.0.0.0:5433/graphql
  ‣ GraphiQL GUI/IDE:    http://0.0.0.0:5433/graphiql
  ‣ Postgres connection: postgres://gdb:[SECRET]@db/gdb
  ‣ Postgres schema(s):  public
  ‣ Documentation:       https://graphile.org/postgraphile/introduction/
  ‣ Node.js version:     v23.1.0 on linux arm64
  ‣ Join Qwick in supporting PostGraphile development: https://graphile.org/sponsor/
```
