// Resourcee for AI Predict labels: https://docs.amplify.aws/gen1/javascript/build-a-backend/more-features/predictions/label-image/
import { Predictions } from '@aws-amplify/predictions';

export const getLabelFromImage = async (file) => {
    try {
        const predictions = await Predictions.identify({
            labels: {
                source: {
                    file,
                },
                type: "ALL"
            }
        })

        return predictions.labels.map(item => {
            return item.name
        })

    } catch (er) { console.log("Error in prediction.js: " + er) };
}