/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js');
importScripts("https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js");

//temporarily don't use .env variables here, as it works only for modules, and it's not a module

const firebaseConfig = {
	apiKey: "AIzaSyBzhop2MeuFaL2uJwp6yQOfVkr7zTj-CGE",
	authDomain: "nokewtest.firebaseapp.com",
	projectId: "nokewtest",
	storageBucket: "nokewtest.appspot.com",
	messagingSenderId: "394111859121",
	appId: "1:394111859121:web:df7b5c9f53acd2581c6590",
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
