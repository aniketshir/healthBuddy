import PushNotification from 'react-native-push-notification';

let arr = [0, 1, 2];
let sliderItem = [
  {
    title: 'Personalized Reminders',
    description:
      'Health Buddy understands that every senior is unique. It allows users to customize their reminder preferences based on their individual sleep patterns, Medication routines, and dietary needs. Personalization ensures that seniors receive reminders tailored to their specific requirements.',
    image: require('./images/walkthrough1.png'),
  },
  {
    title: 'User-Friendly Interface',
    description:
      'Navigating Health Buddy is a breeze! The app is designed with a senior-friendly interface, featuring large buttons, clear fonts, and intuitive navigation. It`s built to be accessible for seniors who may not be tech-savvy.',
    image: require('./images/walkthrough2.png'),
  },
  {
    title: 'Emergency Contacts',
    description:
      'Safety is a priority. Health Buddy allows seniors to store emergency contacts within the app, ensuring that help is just a tap away in case of any unforeseen circumstances.',
    image: require('./images/walkthrough3.png'),
  },
];
let dashboardData = [
  {
    id: 1,
    title: 'Sleep',
    image: require('./images/sleep.png'),
  },
  {
    id: 2,
    title: 'Medication',
    image: require('./images/medication.png'),
  },
  {
    id: 3,
    title: 'Nutrition',
    image: require('./images/nutrition.png'),
  },
];

let detailsData = [
  {
    id: 1,
    title: 'Sleep',
    notificationTitle: 'Time to sleep',
    notificationCnt: 10,
    notificationMsg:
      "It's Time to Sleep so that we can improve your Sleep routine.",
    questions: [
      {
        title: 'How much hours you sleep ( Average ) on a daily basis?',
        tipTxt: '',
        type: 1, // slider
        maxLimit: 24,
        minLimit: 1,
      },
      {
        title: 'At what time you want to sleep?',
        tipTxt: 'This will help us to provide time to time reminders for sleep',
        type: 2, // clock
      },
      {
        title: 'Contact Details for specialists',
        tipTxt: 'Source: Google',
        name: 'Aniket',
        phone: '+183748347',
        email: 'a@a.com',
        type: 3,
      },
    ],
  },
  {
    id: 2,
    title: 'Medication',
    notificationTitle: 'Medication Time',
    notificationMsg: "It's Time to take a medicine.",
    notificationCnt: 20,
    questions: [
      {
        title: 'How many time you take your medicines in a day?',
        tipTxt: '',
        type: 1, // slider
        maxLimit: 7,
        minLimit: 1,
      },
      {
        title: 'At what time you want to take medicines?',
        tipTxt:
          'This will help us to provide time to time reminders for Medication',
        type: 2, // clock
        multiple: true,
      },
      {
        title: 'Contact Details for specialists',
        tipTxt: 'Source: Google',
        name: 'Aniket',
        phone: '+183748347',
        email: 'a@a.com',
        type: 3,
      },
    ],
  },
  {
    id: 3,
    title: 'Nutrition',
    notificationTitle: 'Time to get some Nutrition',
    notificationMsg: "It's Time to eat something.",
    notificationCnt: 30,
    questions: [
      {
        title: 'How many meals you take in a day?',
        tipTxt: '',
        type: 1, // slider
        maxLimit: 6,
        minLimit: 1,
      },
      {
        title: 'At what time you want to take your meal?',
        tipTxt:
          'This will help us to provide time to time reminders for your meal',
        type: 2, // clock
        multiple: true,
      },
      {
        title: 'Contact Details for specialists',
        tipTxt: 'Source: Google',
        name: 'Aniket',
        phone: '+183748347',
        email: 'a@a.com',
        type: 3,
      },
    ],
  },
];

function sendScheduleNotification(
  title: string,
  message: string,
  time: any,
  id: any,
) {
  console.log('idX', id);
  PushNotification.localNotificationSchedule({
    id: id || 1,
    channelId: 'healthBuddy',
    title: title || 'Hello  User',
    message: message || 'How`s going',
    subtitle: 'Hello User',
    date: time,
  });
}

export {arr, sliderItem, dashboardData, detailsData, sendScheduleNotification};
