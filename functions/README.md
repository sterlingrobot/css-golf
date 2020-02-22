# Serverless Lambda functions

This folder contains backend code for reacting to updates in the database via Firebase event listeners, and running any
Node scripts necessary for pre-processing (SCSS compile).

**[Documentation for Firebase Functions](https://firebase.google.com/docs/functions/)**

- Firebase functions are stored in `./lib` and exported from `./index.js`
- They can be deployed via `yarn deploy:<environment>` from this directory,
  but must reference an `.env.<environment>` file placed in the root of the repo,
  eg. `yarn deploy:dev` which points to `.env.dev`

**[Documentation for Netlify Functions](https://docs.netlify.com/functions/overview/)**

- Netlify functions are organized in `<function-name>/<function-name>.js` directories
- They are deployed along with the standard build deploy/preview via push/PR to `master`,
  or they can be deployed from a local environment via `netlify functions:deploy`
- They can be built and used locally via the `netlify dev` command
