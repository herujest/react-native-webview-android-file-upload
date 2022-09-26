import React, {Component} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
// import CustomWebView from 'react-native-webview-android-file-upload';

export default class App extends Component {
  inject = () => {
    this.webview.injectJavaScript("alert('JavaScript is injected')");
  };

  reload = () => {
    this.webview.reload();
  };

  render() {
    return (
      <View style={styles.container}>
        {/* <CustomWebView
          style={styles.container}
          webviewRef={(e) => (this.webview = e)}
          injectedJavaScript={"alert('Custom webview loaded')"}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          source={{
            uri: 'https://andreipfeiffer.github.io/react-native-webview-android-file-upload/index.html',
          }}
        /> */}

        <View style={styles.containerHorizontal}>
          <Text>New App</Text>
          <Button title="Reload" onPress={this.reload} />
          <Button title="Inject JS" onPress={this.inject} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerHorizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#eee',
  },
});
