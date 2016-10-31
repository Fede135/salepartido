App.info({
  id: 'com.example.matt.uber',
  name: 'Sale Partido',
  description: 'Organizar partidos de fútbol con tus amigos',
  author: 'Sale Partido 2016',
  email: 'salepartido2016@gmail.com',
});
// Set up resources such as icons and launch screens.
App.icons({
  'android_mdpi' : 'icons/sale_partido_app_48',
  'android_hdpi' : 'icons/sale_partido_app_72',
  'android_xhdpi' : 'icons/sale_partido_app_96',
  'android_xxhdpi' : 'icons/sale_partido_app_144',
  'android_xxxhdpi': 'icons/sale_partido_app_192'
});
// Set PhoneGap/Cordova preferences
App.setPreference('BackgroundColor', '0xff0000ff');
App.setPreference('HideKeyboardFormAccessoryBar', true);
App.setPreference('Orientation', 'default');
App.setPreference('Orientation', 'all', 'ios');
// Pass preferences for a particular PhoneGap/Cordova plugin
App.configurePlugin('com.phonegap.plugins.facebookconnect', {
  APP_ID: '1604179873208704',
  API_KEY: '826d819af100945ff4f535b746a7b71b'
});