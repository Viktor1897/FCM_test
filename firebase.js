import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";


const firebaseConfig = {
  apiKey: "AIzaSyBzhop2MeuFaL2uJwp6yQOfVkr7zTj-CGE",
  authDomain: "nokewtest.firebaseapp.com",
  projectId: "nokewtest",
  storageBucket: "nokewtest.appspot.com",
  messagingSenderId: "394111859121",
  appId: "1:394111859121:web:df7b5c9f53acd2581c6590",
};
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const requestForToken = async () => {
  const swRegistration = await navigator.serviceWorker.register("spa/static/js/firebase-messaging-sw.js");
 
  return getToken(messaging, {
    vapidKey: "BGE6opd3v17ZtLj7p9UV4BdA60zqljBwilCBCAaro6f2_ZEnZFiSc4Q3v88CnQyO7X_SLIe5Xe60qlrbeuM8YhM",
    serviceWorkerRegistration: swRegistration,
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        // Perform any other neccessary action with the token
      } else {
        // Show permission request UI
        console.log("No registration token available. Request permission to generate one.");
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("Message", payload);
      resolve(payload);
    });
  });
