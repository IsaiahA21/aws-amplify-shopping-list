# Getting Started with SmartList

This project took inspiration from [AmplifyWorkshop](https://github.com/josephtey/AmplifyWorkshop?tab=readme-ov-file#Sending-data-between-Frontend-and-Backend).
My goal was to create a modern, user-friendly shopping list application that allows users to create, and delete items from their shopping list. The application utilizes AWS Rekognition to identify items.

As of July 1st 2024 (Canada Day), the application is currently deployed on AWS Amplify and can be accessed [here](https://master.d3474n4b5kymz.amplifyapp.com/).
Unfortunately, I'm not made out of money, so the application will eventually be taken down.


### Implementing AWS Amplify 
Building the application with AWS Amplify was a great experience. The Amplify CLI made it easy to create the necessary resources for the application. However, I did run into issues and a general lack of knowledge along the way that required me to troubleshoot.
helpful link: https://www.youtube.com/watch?v=tx0k7daEoUA
https://www.youtube.com/watch?v=puaydMvngj4

## Using the Application (Authenticated and Guess Users)

![Landing page](/readmePics/landingPage.png) Landing page of the application
![Dark mode](/readmePics/darkMode.png) Dark mode of the application (user not authenticated)

### Guest User
![guest shopping list](/readmePics/guestShoppingList.png) Guest user shopping list.
There are sample items in the shopping list that can be deleted by the user. But these items are not saved in the database and will be lost when the page is refreshed.

![guest AI predict](/readmePics/guestAIPredict.png) Guest user can't use the AI prediction feature to identify items in an image. When the user upload an image and the application wouldn't return a prediction.

### Authenticated User
![Auth signUp](/readmePics/authSignUp.png) Authenticated user sign up page. The user can sign up with an email and password.

![Auth shoppingList](/readmePics/authShoppingList.png) 
Authenticated user shopping list. The user can add, delete, and check off items from the shopping list. The shopping list is saved in the database and will persist when the page is refreshed.

![Auth AI predict](/readmePics/authAIPredict.png) Authenticated user can use the AI prediction feature to identify items in an image. When the user upload an image, the application will return a prediction of the items in the image. Predictions with a confidence level of 84.5% or higher will be added to the shopping list.

![Auth Account Page](/readmePics/authAccountPage.png) Authenticated user account page.By clicking on the profile icon on the navbar, the user can either sign out of the application or navigate to their Account Page. On the Account Page, the user can change their name, their password or delete their account.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

To learn React, check out the [React documentation](https://reactjs.org/).

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


