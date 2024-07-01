### Key Milestones

1. **Project Initialization and Setup:**
   - Setting up the project using React for the frontend.
   - Creating initial components such as Login, Account, and ShoppingList pages.
   - Customizing the UI using Tailwind css.

2. **Authentication Implementation:**
   - Configuring AWS Amplify for authentication and API integration.
   - Integrating AWS Amplify authentication to manage user login and registration.
   - Implementing the `withAuthenticator` HOC in the Account component to enforce that only authenicated users can view page.
   - Customizing the authentication flow and handling user sessions.

3. **Backend Development:**
   - Setting up AWS API Gateway, DynamoDB, and Lambda functions for backend logic.
   - Creating a DynamoDB table named 'Items' with `userId` as the partition key and `timeStamp` as the sort key.
   - Created the API Gateway endpoint(`ShoppingListAPIGateway`) to interact with the Lambda functions. 
   - Implementing CRUD operations for shopping list items using AWS Lambda functions.

4. **Context Management:**
   - Implementing an `AuthContext` to manage authentication state and user information.
   - Fetching user attributes and updating the context accordingly.
   - Ensuring smooth data flow between components using context.

5. **View Count Feature:**
   - Integrating a view count feature to track the number of times the "Get Started" button is clicked.
   - Displaying the current view count at the bottom of the homepage.


7. **Deployment and Domain Setup:**
   - Deploying the application on AWS Amplify.
   - (potentially) Configuring a custom domain using Route 53 and linking it to the Amplify app.

### Major Issues Faced
1. **Handling Refreshing or navigating to a different:**
    - When the user refreshes the page or navigates to a different page, the context state is lost.
    - This issue was resolved by fetching the user attributes on page load and updating the context accordingly.
    - Instead of relying on `isAuthenticated` state, the context now manages the user information.
    - Also implemented a loading state to handle async operations and ensure a seamless user experience. This way the user information can be fetched and updated in the context before rendering the components.

2.    **Restricting access to the Account page:**
      - Intially tried restricting access to the Account page by using Amplify/auth `withAuthenticator`.
      - But I didn't like this approach as I wanted users to login using the Login Page that I created.
      - Next, I tried using `isAuthenticated` state and UseEffect to restrict access to the Account page. But this approach was not working as expected. As for a fraction of a second, even if the user is authenticated, `isAuthenticated` state is false. So, the user will be redirected to the Login page. Then because the user is already authenticated, the user will be redirected to the ShoppingList page.
      - Finally, I used ProtectedRoute to restrict access to the Account page. This approach worked as expected. So now, users must be authenticated to access the Account page.

2. **Backend Integration and Deployment:**
   - Setting up and configuring AWS services for the first time.
   - Troubleshooting issues related to dynamoDB, API Gateway and Lambda functions.
   - Uses such as "Cannot get resource: viewCountDB from 'storage' category" even though the resource was created.
   - Spending hours debugging, and reading the documentation to resolve the issues.
   - `Amplify Push` was not working and timing out.This was only resolved after running `amplify init` and attempting to push again.

3. **Context Management:**
   - Ensuring the context updates correctly and propagates changes across components.
   - Handling async operations within the context and managing loading states.

4. **Deployment Challenges:**
   - Setting up a custom domain immediately led to an issue with Route 53.
   - Error message: "[We can't finish registering your domain because we can't process your payment. Check your payment information and try again.]"

5. **View Count Integration:**
   - Integrating into the existing application. I was worried that it might break the existing application and cause issues that would be hard to debug or were irreversible.

### Project Name: SmartList
This project name highlights the integration with the AI recognition from AWS. 

### Future Enhancements
   - Fix the colors for Reset Password when its in darkmode
   - Allow users to edit items in the shopping list.
   - Implement a search feature to filter items in the shopping list.