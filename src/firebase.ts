import { initializeApp } from "firebase/app";
import { MessagePayload, getMessaging, getToken, onMessage } from "firebase/messaging";

const { 
  VITE_FIREBASE_API_KEY, 
  VITE_FIREBASE_AUTH_DOMAIN, 
  VITE_FIREBASE_PROJECT_ID, 
  VITE_FIREBASE_STORAGE_BUCKET, 
  VITE_FIREBASE_MESSAGING_SENDER_ID, 
  VITE_FIREBASE_APP_ID, 
  VITE_FIREBASE_VAPID_KEY 
} = import.meta.env;

const firebaseConfig = {
	apiKey: VITE_FIREBASE_API_KEY,
	authDomain: VITE_FIREBASE_AUTH_DOMAIN,
	projectId: VITE_FIREBASE_PROJECT_ID,
	storageBucket: VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: VITE_FIREBASE_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const requestForToken = async () => {
  const swRegistration = await navigator.serviceWorker.register("/FCM_test/firebase-messaging-sw.mjs");
 
  return getToken(messaging, {
    vapidKey: VITE_FIREBASE_VAPID_KEY,
    serviceWorkerRegistration: swRegistration,
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        const container = document.querySelector('.test-name');
        if (container) container.textContent = currentToken;
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
    onMessage(messaging, (payload: MessagePayload) => {
      console.log("Message", payload);
      resolve(payload);
    });
  });
