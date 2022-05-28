const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const admin = require("firebase-admin");
admin.initializeApp();

const storage = admin.storage();

// The Firebase Admin SDK to access Firestore.
/**
 * TODO(developer): Uncomment these variables before running the sample.\
 * (Not necessary if passing values as arguments)
 */

const endpointId = "4709947173578473472";
const project = "findog-a0110";
const location = "us-central1";
const aiplatform = require("@google-cloud/aiplatform");
const {instance, params, prediction} =
    aiplatform.protos.google.cloud.aiplatform.v1.schema.predict;

// Imports the Google Cloud Prediction Service Client library
const {PredictionServiceClient} = aiplatform.v1;

// Specifies the location of the api endpoint
const clientOptions = {
  apiEndpoint: "us-central1-aiplatform.googleapis.com",
};

// Instantiates a client
const predictionServiceClient = new PredictionServiceClient(clientOptions);


exports.classifyPoster = functions.firestore
    .document("Posters/{posterID}")
    .onCreate((snap, context) => {
      // Get an object representing the document
      // e.g. {'name': 'Marie', 'age': 66}
      console.log("onCreate");
      const newValue = snap.data();
      // access a particular field as you would any JS property
      console.log("image path: " + newValue.imagePath);
      const bucket = storage.bucket("findog-a0110.appspot.com");

      return bucket.file("poodle.jpeg").download().then((data) => {
        console.log("download output:");
        console.log(data);
        console.log(data[0]);
        const image = data[0].toString("base64");
        console.log(image);
        // Configure the endpoint resource
        const endpoint = `projects/${project}/locations/` +
            `${location}/endpoints/${endpointId}`;
        console.log(endpoint);
        const parametersObj = new params.ImageClassificationPredictionParams({
          confidenceThreshold: 0.5,
          maxPredictions: 5,
        });
        const parameters = parametersObj.toValue();
        const instanceObj = new instance.ImageClassificationPredictionInstance({
          content: image,
        });
        const instanceValue = instanceObj.toValue();
        console.log(instanceValue);
        const instances = [instanceValue];
        const request = {
          endpoint,
          instances,
          parameters,
        };
        console.log("before predict");
        // Predict request
        return predictionServiceClient.predict(request).then((result) =>{
          console.log("Predict image classification response");
          console.log(result);
          console.log(result.predictions);
          console.log(result.predictions[0]);
          const predictions = result.response.predictions;
          console.log("\tPredictions :");
          for (const predictionValue of predictions) {
            const predictionResultObj =
                      prediction.ClassificationPredictionResult.
                          fromValue(predictionValue);
            for (const [i, label] of predictionResultObj.
                displayNames.entries()) {
              console.log(`\tDisplay name: ${label}`);
              console.log(`\tConfidences: ${predictionResultObj.
                  confidences[i]}`);
              console.log(`\tIDs: ${predictionResultObj.ids[i]}\n\n`);
            }
          }
        });
      });
      // perform desired operations ...
    });

