//this file responsible for all the calls to the API from the frontend.

import { fetchUserAttributes, getCurrentUser } from 'aws-amplify/auth'
import { get, put, del } from 'aws-amplify/api';

const userMail = async () => {
    const mail = (await getCurrentUser()).signInDetails.loginId;

    return mail;
}
const ApiName = 'ShoppingListAPIGateway';

export async function getUserItems() {
    const userEmail = userMail();
    try {
        const userEmail = await userMail();
        const restOperation = get({
            apiName: ApiName,
            path: '/item/' + userEmail,
        });
        const response = await restOperation.response;
        console.log('GET call succeeded: ', response);

        const resBody = await response.body.json()
        console.log('Response Body: ', resBody);
        return resBody;
    } catch (e) {
        console.log('GET call failed: ', e);
    }
}
export async function addUserItem(itemName) {
    const userEmail = await userMail();
    // const userEmail = "isaiahasaolu@gmail.com";
    const itemObject = { userId: userEmail, timeStamp: new Date().getTime(), itemName };

    try {
        const restOperation = put({
            apiName: ApiName,
            path: '/item',
            options: {
                body: itemObject
            }
        });
        const response = await restOperation.response;
        console.log('PUT call succeeded: ', response);
    } catch (e) {
        console.log('PUT call failed: ', JSON.parse(e.response.body));
    }
    return itemObject;
}
export const deleteItem = async (timeStamp) => {
    const userEmail = await userMail();
    console.log("timestamp is " + timeStamp)
    try {
        const restOperation = del({
            apiName: ApiName,
            path: '/item/object/' + userEmail + '/' + timeStamp,

        });
        const response = await restOperation.response;
        console.log('Delete call succeeded: ', response);

        if (response.statusCode !== 200) {
            throw new Error(`Unexpected status code: ${response.statusCode}`);
        }
    } catch (error) {
        console.log('Delete call failed: ', error);
        if (error.response) {
            if (error.response.statusCode === 404) {
                console.log('Item not found. It may have already been deleted or does not exist.');
            } else if (error.response.body) {
                console.log('Error body:', error.response.body);
            }
        }
    }
}
