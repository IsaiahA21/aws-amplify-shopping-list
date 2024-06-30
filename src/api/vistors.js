import { get, put, del } from 'aws-amplify/api';

const viewApiName = 'VistorsAPI';

export async function getViewCount() {
    try {
        const operation = get({
            apiName: viewApiName,
            path: '/visitor/1',
        })
        const response = await operation.response;
        // console.log('GET call succeeded: ', response);

        const resBody = await response.body.json()
        // console.log('Response Body: ', resBody);
        return resBody[0].count;
    } catch (error) {
        console.error('Error updating view count:', error);
        return null;
    }
}

export async function IncrementViewCount() {
    try {
        //get current view count
        const getCount = await getViewCount();

        const currentCount = getCount || 0; // Assuming 'count' is the attribute name in DynamoDB
        const count = currentCount + 1;

        const operation = put({
            apiName: viewApiName,
            path: '/visitor',
            options: {
                body: { viewId: "1", count: count }
            }
        })
        return (await operation.response)
    } catch (error) {
        console.error('Error updating view count:', error);
        return null;
    }
}