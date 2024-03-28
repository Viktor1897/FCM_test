/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js');
importScripts("https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js");

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
firebase.initializeApp(firebaseConfig);
const isSupported = firebase.messaging.isSupported();
if (isSupported) {
	console.log("Firebase Messaging is supported");
	const messaging = firebase.messaging();
	// Customize background notification handling here
	messaging.onBackgroundMessage((payload) => {
		console.log("Background Message:", payload);
		const notificationTitle = payload.notification.title;
		const notificationOptions = {
			body: payload.notification.body,
		};
		self.registration.showNotification(notificationTitle, notificationOptions);
	});

}
