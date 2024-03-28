export default function checkNotificationPermissions(callback: () => void) {
    if (Notification.permission === "denied") {
        return "Notification are not allowed for this page. Please turn them on."
    }
    
    if(!("Notification" in window)) {
        return "This browser does not support system notifications!"
    } 
    else if(Notification.permission === "granted") {
        callback();
    }
    else {
       Notification.requestPermission((permission) => {
          if (permission === "granted") {
            callback();
          } else {
            return "Permissions are not granted";
          }
       })
    }
    return
}