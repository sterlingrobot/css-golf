[![Netlify Status](https://api.netlify.com/api/v1/badges/7185e6a7-6cbe-4c0e-b7bd-823ee8449f91/deploy-status)](https://app.netlify.com/sites/css-golf/deploys)

A CSS code-in-the-dark challenge game built with Create React App, Firebase and Netlify.

### **[Live Site](https://css-golf.netlify.com)**

## Folders

Child folders each have their own readmes

- [`/functions`](https://github.com/sterlingrobot/css-golf/tree/development/functions) - contains serverless backend lamba functions,
  built both for [Netlify Functions](https://app.netlify.com/sites/css-golf/functions) and [Firebase Functions](https://console.firebase.google.com/project/css-golf-dev/functions/list)
- [`/public`](https://github.com/sterlingrobot/css-golf/tree/development/public) - files that will be available as-is on the web server
- [`/scripts`](https://github.com/sterlingrobot/css-golf/tree/development/scripts) - convenience scripts, eg. migration, unused currently
- [`/src`](https://github.com/sterlingrobot/css-golf/tree/development/src) - the front-end app

## Development

Install [Firebase CLI](https://firebase.google.com/docs/cli)

```
  npm install -g firebase-tools
```

Install [Netlify CLI](https://docs.netlify.com/cli/get-started/)

```
  npm install -g netlify cli
```

To start a local dev server with access to Netlify Functions run

```
  netlify dev
```
