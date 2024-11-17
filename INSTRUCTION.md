## Project Structure

```
├── gdb-project
│ ├── gdb
│ │ ├── app
│ │ ├── public
│ ├── gdb-data
│ │ ├── base
│ │ ├── global
│ │ ├── postgresql.conf
│ ├── hasura


```

## Install

```
❯ mkdir gdb-project
❯ cd gdb-project
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

### 0. Make things structure

```
❯ mkdir gdb-project && cd gdb-project
```

#### NextUI CLI

```
❯ npm install -g nextui-cli
```

### 1. Next.js & NextUI Template

create Next.js with NextUI template

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

try to run command below and open `http://localhost:3000/` in your browser

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

create `.env` file under `gdb-project/gdb`

```
❯ vim .env
```

content in .env

```
POSTGRES_USER=gdb
POSTGRES_PASSWORD=SUPER_SECRET
POSTGRES_DB=gdb
```

create `docker-compose.yml` file under `gdb-project/gdb`

```
❯ vim docker-compose.yml
```

place content below to `docker-compose.yml`

```
services:
  db:
    image: postgres
    container_name: postgres-gdb
    restart: always
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB}
    ports:
      - "5433:5432"
    volumes:
      - ../gdb-data:/var/lib/postgresql/data
volumes:
  pgdata:

```

bring up postgresql

```
❯ docker-compose up -d
❯ docker ps -a
```

connect with psql

```
❯ psql -h localhost -p 5433 -U gdb
```

127.0.0.1 local.hasura.dev

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

create dummy schema at postgres using your client

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

add `127.0.0.1 local.hasura.dev` to `/etc/host`

```
❯ sudo vim /etc/hosts
```

```
❯ cd gdb-project
❯ ddn supergraph init hasura && cd hasura
❯ ddn connector init gdb -i
```

Hub Connector `hasura/postgres`
Connector Port `1558`
CONNECTION_URI `postgresql://gdb:SUPER_SECRET@local.hasura.dev:5433/gdb`

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
