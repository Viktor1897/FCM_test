import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { onMessageListener, requestToken } from './firebase'
import { useEffect, useState } from 'react'
import { NotificationPermissions } from './components/NotificationPermissions'
import toast, { Toaster } from 'react-hot-toast'
import { NotificationPayload } from 'firebase/messaging'

function App() {

  const [registrationToken, setRegistrationToken] = useState<string>("Token is not requested yet.");
  const [notification, setNotification] = useState<NotificationPayload | undefined>();

  onMessageListener().then(({ notification }) => setNotification(notification));

  useEffect(() => {
    if (notification?.title) {
      toast(<div>
        <p><b>{notification?.title}</b></p>
        <p>{notification?.body}</p>
      </div>)
    }
  }, [notification])

  useEffect(() => {
    if (!("Notification" in window)) return
    
    if (Notification.permission === "granted") {
      requestToken().then(res => setRegistrationToken(res));
    } 
  }, []);
  
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>FCM Registration Token:</h1>
        <p style={{wordBreak: "break-all", border: "2px solid #000000", padding: "1rem"}}>{registrationToken}</p>
      <NotificationPermissions />
      <Toaster position='bottom-right'/>
    </>
  )
}

export default App
