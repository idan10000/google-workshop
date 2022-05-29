const functions = require("firebase-functions");
const {Expo} = require("expo-server-sdk");
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

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
      console.log("onCreate");
      const newValue = snap.data();
      // access a particular field as you would any JS property
      console.log("image path: " + newValue.imagePath);
      const bucket = storage.bucket("findog-a0110.appspot.com");

      return bucket.file("poodle.jpg").download().then((data) => {
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
          confidenceThreshold: 0.01,
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
        console.log(request);
        // Predict request
        return predictionServiceClient.predict(request).then((result) =>{
          console.log("Predict image classification response");
          const response = result[0];
          const predictions = response.predictions;
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

exports.sendNotifications = functions.firestore
    .document("Posters/{posterID}")
    .onCreate((snap, context) => {
      console.log("sendNotifications");
      const posterData = snap.data();
      const uid = posterData.user;
      console.log("user id: " + uid);
      return db.doc("Users/" + uid)
          .get().then((snapshot) => {
            const token = snapshot.get("notificationsToken");
            // Create a new Expo SDK client
            // optionally providing an access token if you have enabled push
            // security
            const expo = new Expo({accessToken: process.env.EXPO_ACCESS_TOKEN});
            const somePushTokens = [token];
            // Create the messages that you want to send to clients
            const messages = [];
            for (const pushToken of somePushTokens) {
              // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]

              // Check that all your push tokens appear to be valid Expo push tokens
              if (!Expo.isExpoPushToken(pushToken)) {
                console.error(`Push token ${pushToken} is not a valid Expo push token`);
                continue;
              }

              // Construct a message (see https://docs.expo.io/push-notifications/sending-notifications/)
              messages.push({
                to: pushToken,
                sound: "default",
                title: "מודעה הועלתה בהצלחה!",
                body: "תוכלו לראותה בפרופיל האישי, וכשנמצא כלב שנראה כמו הכלב שלכם, תקבלו מיד התראה",
                data: {withSome: "data"},
              });
            }

            // The Expo push notification service accepts batches of notifications so
            // that you don"t need to send 1000 requests to send 1000 notifications. We
            // recommend you batch your notifications to reduce the number of requests
            // and to compress them (notifications with similar content will get
            // compressed).
            const chunks = expo.chunkPushNotifications(messages);
            const tickets = [];
            (() => {
              // Send the chunks to the Expo push notification service. There are
              // different strategies you could use. A simple one is to send one chunk at a
              // time, which nicely spreads the load out over time:
              for (const chunk of chunks) {
                try {
                  return expo.sendPushNotificationsAsync(chunk).then((ticketChunk) => {
                    console.log(ticketChunk);
                    tickets.push(...ticketChunk);
                    // NOTE: If a ticket contains an error code in ticket.details.error, you
                    // must handle it appropriately. The error codes are listed in the Expo
                    // documentation:
                    // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
                  });
                } catch (error) {
                  console.error(error);
                }
              }
            })();
            return tickets;


            // Later, after the Expo push notification service has delivered the
            // notifications to Apple or Google (usually quickly, but allow the the service
            // up to 30 minutes when under load), a "receipt" for each notification is
            // created. The receipts will be available for at least a day; stale receipts
            // are deleted.
            //
            // The ID of each receipt is sent back in the response "ticket" for each
            // notification. In summary, sending a notification produces a ticket, which
            // contains a receipt ID you later use to get the receipt.
            //
            // The receipts may contain error codes to which you must respond. In
            // particular, Apple or Google may block apps that continue to send
            // notifications to devices that have blocked notifications or have uninstalled
            // your app. Expo does not control this policy and sends back the feedback from
            // Apple and Google so you can handle it appropriately.
            //               let receiptIds = [];
            //               for (let ticket of tickets) {
            //                   // NOTE: Not all tickets have IDs; for example, tickets for notifications
            //                   // that could not be enqueued will have error information and no receipt ID.
            //                   if (ticket.id) {
            //                       receiptIds.push(ticket.id);
            //                   }
            //               }
            //
            //               let receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
            //               (async () => {
            //                   // Like sending notifications, there are different strategies you could use
            //                   // to retrieve batches of receipts from the Expo service.
            //                   for (let chunk of receiptIdChunks) {
            //                       try {
            //                           let receipts = await expo.getPushNotificationReceiptsAsync(chunk);
            //                           console.log(receipts);
            //
            //                           // The receipts specify whether Apple or Google successfully received the
            //                           // notification and information about an error, if one occurred.
            //                           for (let receiptId in receipts) {
            //                               let { status, message, details } = receipts[receiptId];
            //                               if (status === "ok") {
            //                                   continue;
            //                               } else if (status === "error") {
            //                                   console.error(
            //                                       `There was an error sending a notification: ${message}`
            //                                   );
            //                                   if (details && details.error) {
            //                                       // The error codes are listed in the Expo documentation:
            //                                       // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
            //                                       // You must handle the errors appropriately.
            //                                       console.error(`The error code is ${details.error}`);
            //                                   }
            //                               }
            //                           }
            //                       } catch (error) {
            //                           console.error(error);
            //                       }
            //                   }
            //               })();
            //             return admin.messaging().sendToDevice(token, payload)
            //                 .then((response) => {
            //                   response.results.forEach((result, index) => {
            //                     const error = result.error;
            //                     if (error) {
            //                       functions.logger.error(
            //                           "Failure sending notification to",
            //                           token,
            //                           error
            //                       );
            //                     }
            //                   });
            //                 });
          });
    });

