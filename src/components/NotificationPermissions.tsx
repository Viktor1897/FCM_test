import { requestPermission } from "../utils/requestNotificationPermission"

export function NotificationPermissions () {
    if (!("Notification" in window)) 
    return <h3>Notifications are not supported in the browser.</h3>

    if (Notification.permission === "denied") 
    return <h3>Notification permissions are not granted. Please allow the notifications for this page.</h3>

    if (Notification.permission === "granted")
    return <h3>Notification permissions are granted.</h3>

    if (Notification.permission === "default")
    return <button onClick={requestPermission}>Request Notification Permissions</button>

}