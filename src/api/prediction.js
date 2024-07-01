// Resourcee for AI Predict labels: https://docs.amplify.aws/gen1/javascript/build-a-backend/more-features/predictions/label-image/
import { Predictions } from '@aws-amplify/predictions';

export const getLabelsFromImage = async (file) => {
    try {
        const predictions = await Predictions.identify({
            labels: {
                source: {
                    file,
                },
                type: "ALL"
            }
        });

        // Extracting label names from predictions
        const filteredLabels = predictions.labels.filter(lab => lab.metadata.confidence >= 84.5)
        const labelNames = filteredLabels.map(item => item.name);
        return labelNames;
    } catch (error) {
        console.error('Error identifying labels:', error);
        throw error;
    }
};
