export default {
  expo: {
    owner: "cagsinho",
    name: "banking",
    slug: "banking",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "banking",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    updates: {
      url: "https://u.expo.dev/620ea866-60db-4ade-8728-d0bb887fab48"
    },
    runtimeVersion: {
      policy: "appVersion"
    },
    ios: {
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false
      },  
      bundleIdentifier: "com.testbankapp.test",
      supportsTablet: true,
    },
    android: {
      package: "com.testbankapp.test",
      adaptiveIcon: {
        backgroundColor: "#E6F4FE",
        foregroundImage: "./assets/images/android-icon-foreground.png",
        backgroundImage: "./assets/images/android-icon-background.png",
        monochromeImage: "./assets/images/android-icon-monochrome.png",
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
    },
    web: {
      output: "static",
      favicon: "./assets/images/favicon.png",
      bundler: "metro",
    },
    plugins: [
      [
        "expo-build-properties",
        {
          android: {
            compileSdkVersion: 36,
            targetSdkVersion: 34,
            minSdkVersion: 26,
          },
          ios: {
            useFrameworks: "static",
          },
        },
      ],
      ["react-native-bottom-tabs"],
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
          dark: {
            backgroundColor: "#000000",
          },
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
    extra:{
      eas: {
        "projectId": "620ea866-60db-4ade-8728-d0bb887fab48"
      }
    }
  },
};
