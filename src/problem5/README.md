# Problem 5 — Resources API
Small Express + TypeORM service that manages "resources" (simple CRUD). The service lives in [src/problem5](src/problem5) and can be run locally using the project scripts in [package.json](package.json).

## Key files & symbols
- App entry: [src/problem5/index.ts](src/problem5/index.ts)  
- Data source: [`AppDataSource`](src/problem5/data-source.ts) — [src/problem5/data-source.ts](src/problem5/data-source.ts)  
- Entity: [`Resource`](src/problem5/entities/resource.entity.ts) — [src/problem5/entities/resource.entity.ts]  
- API routes: [src/problem5/modules/resources/resource.api.ts](src/problem5/modules/resources/resource.api.ts)  
- Service: [`resourceService`](src/problem5/modules/resources/resource.service.ts) — [src/problem5/modules/resources/resource.service.ts]  
- DTOs/validation: [`CreateResourceDto`](src/problem5/modules/resources/dto/create_resource.dto.ts), [`UpdateResourceDto`](src/problem5/modules/resources/dto/update_resource.dto.ts), [`ListResourceDto` / `ResourceFilter`](src/problem5/modules/resources/dto/list_resource.dto.ts) — [src/problem5/modules/resources/dto](src/problem5/modules/resources/dto)  
- Error types & middleware: [`HttpError`](src/problem5/errors.ts) — [src/problem5/errors.ts]; [`errorHandler`](src/problem5/middlewares/error.middleware.ts) — [src/problem5/middlewares/error.middleware.ts]  
- DB migration: [src/problem5/migrations/1763722587659-init-db.ts](src/problem5/migrations/1763722587659-init-db.ts)

## Prerequisites
- Node.js (v18+ recommended)
- npm
- SQLite (bundled via sqlite3 package)

## Install
From repository root:
```sh
npm install
```

## Run locally
### 1. Database migrations
A migration exists at [src/problem5/migrations/1763722587659-init-db.ts](src/problem5/migrations/1763722587659-init-db.ts). To run migrations use the script in [package.json](package.json):

```sh
npm run migration:run
```

### 2. Start the application server
(That command delegates to TypeORM CLI configured in package.json.)
Start the Problem 5 server:
```sh
npm run problem5
```
This runs the script defined in [package.json](package.json) which starts [src/problem5/index.ts](src/problem5/index.ts) using ts-node-dev.

The server uses the TypeORM data source [`AppDataSource`](src/problem5/data-source.ts). By default it uses `db.sqlite` in the repo folder.

### 3. API endpoints
Base path: /resources

- POST /resources  
  - Body: JSON matching [`CreateResourceDto`](src/problem5/modules/resources/dto/create_resource.dto.ts)  
  - Validations: see [create_resource.dto.ts](src/problem5/modules/resources/dto/create_resource.dto.ts)  
  - Creates a resource via [`resourceService`](src/problem5/modules/resources/resource.service.ts)

- GET /resources/:id  
  - Returns a resource by id. Route defined in [resource.api.ts](src/problem5/modules/resources/resource.api.ts).

- PUT /resources/:id  
  - Body: JSON matching [`UpdateResourceDto`](src/problem5/modules/resources/dto/update_resource.dto.ts)  
  - Validations: see [update_resource.dto.ts](src/problem5/modules/resources/dto/update_resource.dto.ts)

- DELETE /resources/:id  
  - Deletes resource by id.

- SEARCH /resources/search?id=&status=
  - list resources with simple filter

Example curl:
```sh
# create
curl -X POST http://localhost:PORT/resources -H "Content-Type: application/json" -d '{"name":"Test","description":"desc"}'

# get
curl http://localhost:PORT/resources/1

# update
curl -X PUT http://localhost:PORT/resources/1 -H "Content-Type: application/json" -d '{"name":"New name"}'

# delete
curl -X DELETE http://localhost:PORT/resources/1
```

## Noted: Validation & errors
- Validation logic lives in the DTO files under [src/problem5/modules/resources/dto](src/problem5/modules/resources/dto).  
- Errors are represented by [`HttpError`](src/problem5/errors.ts) and handled by [`errorHandler`](src/problem5/middlewares/error.middleware.ts).
