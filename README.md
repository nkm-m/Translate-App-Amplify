# App overview
This web app has the following features:
- Translate Japanese to English
- Replace English with lowercase
- Insert a hyphen between English words
- Removed specific symbols (`.`, `'`, `?`)

# Prerequisites
- Have an AWS account
- You can use the AWS CLI
- You can use Node.js
- You can use Amplify CLI

# Confirmed version
- Node.js `v16.15.0`
- Amplify CLI `8.3.1`

# How to set up

## 1. Clone repository
```
git clone
```

## 2. npm install
```
npm i
```

## 3. Set up Amplify Project

3-1. amplify init  
Please set any settings for the application name and AWS Profile.

```
amplify init
```

3-2. amplify add api
```
amplify add api
```
Set as follows.

・API Name: Any  
・path: `/translate`  
・Lambda function name; Any
・runtime: `NodeJS`  
・template: `Hello World`  
・advanced settings: `No`  
・edit the local lambda function now: `Yes`  
Copy all the contents of lambda.js to index.js  
・Restrict API access: `no`  
・add another path: `no`

Describe the following contents in `\amplify\backend\function\{your-function-name}\custom-policies.json`

```json
[
  {
    "Action": ["translate:TranslateText"],
    "Resource": ["*"]
  }
]

```

3-3 Edit main.js  
In the following part of main.js, list your API name given by amplify add api.
```javascript
Vue.prototype.$apiName = "your-api-name"; // Rewrite here
```

3-4. amplify add hosting
```
amplify add hosting
```

Set as follows.  

・Select the plugin module to execute: `Hosting with Amplify Console (Managed hosting with custom domains, Continuous deployment)`  
・Choose a type: `Manual deployment`

3-5. amplify publish
```
amplify publish
```

The following will be displayed, so press Y to continue.
```
✔ Successfully pulled backend environment dev from the cloud.

    Current Environment: dev
    
┌──────────┬───────────────────┬───────────┬───────────────────┐
│ Category │ Resource name     │ Operation │ Provider plugin   │
├──────────┼───────────────────┼───────────┼───────────────────┤
│ Function │ translatefunction │ Create    │ awscloudformation │
├──────────┼───────────────────┼───────────┼───────────────────┤
│ Api      │ translateapi      │ Create    │ awscloudformation │
├──────────┼───────────────────┼───────────┼───────────────────┤
│ Hosting  │ amplifyhosting    │ Create    │ awscloudformation │
└──────────┴───────────────────┴───────────┴───────────────────┘
? Are you sure you want to continue? (Y/n) 
```

After successfully deploying, go to the URL of the last app you see.

```
✔ Deployment complete!
https://dev.d14ra38x9ma1sj.amplifyapp.com
```

## Note
When I access the app and run the translation, I get the following error on the console, but don't worry, the app is working.
```
[ERROR] 06:46.661 AuthError - 
Error: Amplify has not been configured correctly. 
The configuration object is missing required auth properties.
This error is typically caused by one of the following scenarios:

1. Did you run `amplify push` after adding auth via `amplify add auth`?
    See https://aws-amplify.github.io/docs/js/authentication#amplify-project-setup for more information

2. This could also be caused by multiple conflicting versions of amplify packages, see (https://docs.amplify.aws/lib/troubleshooting/upgrading/q/platform/js) for help upgrading Amplify packages.
```

However, if you are concerned about the error, you should run amplify add auth and grant authRole or unauthRole permission to call the API.

# How to use
Just enter the Japanese you want to translate and click the translate button.

![modal](https://user-images.githubusercontent.com/55443396/170990219-cb7817ab-8377-431d-8057-ae8ec1806baa.gif)