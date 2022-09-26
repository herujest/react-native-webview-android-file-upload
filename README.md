# React Native Android WebView File Upload

This is a Custom React Native Android module that enables file uploads from a WebView `<input type="file" />` element:

- by **taking a new photo using the camera**
- by **recording a new video using the camera**
- by **choosing an existing photo/video from the gallery**

What this module does:

- takes [dahjelle's react-native-android-webview-file-image-upload][dahjelle] implementation;
- fixes some bugs where you couldn't open the camera after first usage;
- extracts it into a separate module like [lucasferreira's react-native-webview-android][lucasferreira] for easier setup;
- adds the video recording functionality;
- adds support for the `accept` attribute;
- adds support for the `multiple` attribute;
- adds support for sdk 26, using `FileProvider`;
- adds runtime Camera Permissions (thanks [Pablo Navarro](https://github.com/Zjarr));

It should work with React Native 0.63+, and reverts to the built-in WebView on iOS.

![](https://github.com/andreipfeiffer/react-native-webview-android-file-upload/blob/master/docs/preview.gif)

# Installation

```bash
npm install git+ssh://git@github.com:andreipfeiffer/react-native-webview-android-file-upload.git
```

The above should make (most of) the changes listed below. If it didn't, you should try manual linking.

### Manual linking

- Update `android/setting.gradle`

```gradle
......

include ':react-native-webview-android-file-upload'
project(':react-native-webview-android-file-upload').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-webview-android-file-upload/android')

......
```

- Update `android/app/build.gradle`

```gradle
......

dependencies {
  ......
  implementation project(':react-native-webview-android-file-upload')
}
```

- Register Module in `android/app/src/main/java/com/[your-project-package]/MainApplication.java`

```java
import com.rncustomwebview.CustomWebViewPackage;  // <--- import package

public class MainApplication extends Application implements ReactApplication {

......

  @Override
  protected List<ReactPackage> getPackages() {
    @SuppressWarnings("UnnecessaryLocalVariable")
    List<ReactPackage> packages = new PackageList(this).getPackages();
    // Packages that cannot be autolinked yet can be added manually here, for example:
    packages.add(new CustomWebViewPackage()); // <--- add package here
    return packages;
  }

  ......

}
```

### File Provider setup

- Add file provider path resource `file_provider_paths.xml` in `[your project]/android/app/src/main/res/xml/` folder. If the folder does not exist, create a new one.

NOTE: this is a requirement for `sdk 26`. This approach should NOT require you to ask/handle any dangerous permissions.

```xml
<?xml version="1.0" encoding="utf-8"?>
<paths xmlns:android="http://schemas.android.com/apk/res/android">
    <external-path name="shared" path="." />
</paths>
```

- Add permissions & configure file provider in `AndroidManifest.xml`:

```xml
<manifest ...>
    ......

    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />

</manifest>
```

### Re-build your application

Since you have changed native code, reloading the JS code alone won't work:

```bash
react-native run-android
```

# Example

```javascript
import React, { Component } from "react";

// import module
import CustomWebView from "react-native-webview-android-file-upload";

export default class App extends Component {
  render() {
    return (
      <CustomWebView
        source={{ uri: "your-web-url" }}
        startInLoadingState={true}
        // any other props supported by React Native's WebView
      />
    );
  }
}
```

### Getting the WebView `ref`

```javascript
export default class App extends Component {
  render() {
    return (
      <CustomWebView
        source={{ uri: "your-web-url" }}
        webviewRef={(e) => (this.webview = e)}
      />
    );
  }

  // then you can call any of the methods available on the built-in ref, like:
  // this.webview.reload();
  // this.webview.injectJavaScript();
}
```

### Controlling image and/or video

You can use the `accept` attribute on the `<input />` element to control what type of media your users will be allowed to upload:

- `<input type="file" />` will default to images and videos
- `<input type="file" accept="image/*" />` will allow only image capture / selection
- `<input type="file" accept="video/*" />` will allow only video recording / selection
- `<input type="file" accept="image/*, video/*" />` same as default

Check out the [example html][example].

### Enable multiple file selection

You can use the `multiple` attribute on the `<input />` element to allow users to select multiple existing files:

```
<input type="file" multiple />
```

# Changelog

Please refer to **[CHANGELOG.md](CHANGELOG.md)**.

[dahjelle]: https://github.com/dahjelle/react-native-android-webview-file-image-upload
[lucasferreira]: https://github.com/lucasferreira/react-native-webview-android
[example]: https://andreipfeiffer.github.io/react-native-webview-android-file-upload/index.html
