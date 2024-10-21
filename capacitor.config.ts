import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.linkedout.starter',
  appName: 'LinkedOut',
  webDir: 'www',
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
      launchAutoHide: false,
      backgroundColor: "#D7984D",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: false,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#999999",
      splashFullScreen: false,
      splashImmersive: false,
      layoutName: "launch_screen",
      useDialog: false,
    },
  },

};

export default config;
