# WhatsApp-Like

This application is a training project to Angular 1.
It is also using Ionic, Cordova and Firebase for the backend.

It's a simple messaging app allowing users to chat with each others.

## Dev environment

To setup the dev environment you have to install Ionic and Cordova
```
npm install -g ionic cordova
```

## Dependencies

The dependencies are configured with npm and bower.

To install them use these following commands :
```
cd whatsapp-like

npm install

bower install
```

## Firebase data

This app uses Json files imported in Firebase.

To import this data, you just have to import the [firebaseData.json](www/data/firebaseData.json) file in your Firebase database.

## Run

### Browser

To run in a browser :
```
ionic serve
```

The app is then available at http://localhost:8001


### Android device

**/!\ Make sure you have android SDK installed.**

To run on an android device, you have to add the android platform to your project with cordova
```
cordova platform add android
```
Then run it on your device
```
ionic run android
```

**/!\ For some Android versions you have to allow acces to the internet**
```
cordova plugin add cordova-plugin-whitelist --save
```

Then add this to the AndroidManifest.xml file under platforms/android folder
```
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```