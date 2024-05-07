/**
 * @format
 */

import {AppRegistry} from 'react-native';
import PushNotification from 'react-native-push-notification';
import App from './App';
import {name as appName} from './app.json';

// PushNotification.configure({
//   onNotification: function (notification) {
//     console.log('notificationX', notification);
//   },
// });

AppRegistry.registerComponent(appName, () => App);
