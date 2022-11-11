/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyD06hYe_o13iqUIWOO_RBj4HcaqapFUJd4",
    authDomain: "react-pushnotification-jira.firebaseapp.com",
    projectId: "react-pushnotification-jira",
    storageBucket: "react-pushnotification-jira.appspot.com",
    messagingSenderId: "744277313100",
    appId: "1:744277313100:web:d49f2ad2a68b5a11f316e9"
};


function requestPermission() {
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
           
            const app = initializeApp(firebaseConfig);
            const messaging = getMessaging(app);
            getToken(messaging, { vapidKey: "BBwWSnAb6XJwlK0Kx3vyK0jSwRYXVQw8nQzq0VpetaZP8uFglHrPFYjWztG4KWGK7nTE3iNDxMRd2ypCKev8Ks0" })
                .then((currentToken) => {
                    if (currentToken) {
                        console.log('currentToken :', currentToken);
                    } else {
                        console.log('no token found');
                    }
                })
                console.log('Notification permission granted.');
        } else {
            console.log('Do not have permission');
        }
    }).catch((err) => {
        console.log('catch eror on firebase : ', err);
    })
}

requestPermission()