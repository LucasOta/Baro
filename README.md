# Baro

This project consist on a Administrator Panel for web applications.

## Technology Stack

- Angular 10
- Typescript
- Node.js
- Express.js
- MongoDB
- Mongoose


## Prerequisites
- Node and NPM installed ([here](https://nodejs.org/en/download/)).
- Angular 10 ([here](https://angular.io/guide/setup-local)).
- MongoDB installed and service started ([here](https://www.mongodb.com/docs/manual/installation/)).
- Typescript installed globally (`npm i -g typescript`).

## Run the project

### Frontend
Open a terminal inside the cloned repository
```
- cd frontend
- npm i
- ng serve -o
```
### Backend
Open a new terminal inside the cloned repository
```
- cd backend
- npm i
- tsc
- npm run dev
```

## Getting started
### Setup Postman
Inside `backend/` you'll find `baro.postman_collection.json`, import it into Postman.

### Create first Admin user
To create the first admin user you'll have to bypass the token verification for the user creation.
- Go to `backend/modules/User/user.routes.ts`.
- Remove the `[verifyToken]` middleware on the `/create` route.
- Recompile and run the project.
- On the Postman collection, send the `user/create` POST endpoint to create the user.
- Go to http://localhost:4200/admin and Login with the given credentials (by default they'll be admin@admin.com admin).
