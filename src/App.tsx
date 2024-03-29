import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { onMessageListener, requestToken } from './firebase'
import { useEffect, useState } from 'react'
import { NotificationPermissions } from './components/NotificationPermissions'

function App() {

  const [registrationToken, setRegistrationToken] = useState<string>();

  onMessageListener();

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
    </>
  )
}

export default App
