import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { onMessageListener, requestForToken } from './firebase'
import checkNotificationPermissions from './utils/checkNotificationPermissions'

function App() {
  
  onMessageListener();
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
      <p className='test-name' style={{wordBreak: "break-all"}}>Vite + React</p>
      <p className="read-the-docs">
        {checkNotificationPermissions(requestForToken)}
      </p>
    </>
  )
}

export default App
