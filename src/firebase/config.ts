import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';
import Constants  from 'expo-constants';



var firebaseConfig = {
apiKey: Constants.manifest.extra.firebaseConfig.apiKey,
authDomain: Constants.manifest.extra.firebaseConfig.authDomain,
databaseURL: Constants.manifest.extra.firebaseConfig.databaseURL,
projectId: Constants.manifest.extra.firebaseConfig.projectId,
storageBucket: Constants.manifest.extra.firebaseConfig.storageBucket,
messagingSenderId: Constants.manifest.extra.firebaseConfig.messagingSenderId,
appId: Constants.manifest.extra.firebaseConfig.appId
  };
  

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    
}

export default firebase;