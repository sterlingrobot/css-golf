# Serverless Lambda functions

This folder contains backend code for reacting to updates in the database via Firebase event listeners, and running any
Node scripts necessary for pre-processing (SCSS compile).

**[Documentation for Firebase Functions](https://firebase.google.com/docs/functions/)**

- Firebase functions are stored in `./lib` and exported from `./index.js`
- They can be deployed via `yarn deploy:<environment>` from this directory,
  but must reference an `.env.<environment>` file placed in the root of the repo,
  eg. `yarn deploy:dev` which points to `.env.dev`

**[Documentation for Netlify Functions](https://docs.netlify.com/functions/overview/)**
