/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { StyleSheet, Text, View, WebView, Alert, SafeAreaView } from "react-native";

export default class App extends Component<{}> {
  constructor(props) {
    super(props);

    this.state = {
      text: "ReactNative WebView Sample"
    };

    this.onWebViewMessage = this.onWebViewMessage.bind(this);
  }

  handleDataReceived(msgData) {
    this.setState({
      text2: `Message from web view ${msgData.data}`
    });
    msgData.isSuccessfull = true;
    msgData.args = [msgData.data % 2 ? "green" : "red"];
    this.myWebView.postMessage(JSON.stringify(msgData));
  }

  onWebViewMessage(event) {

    console.log("Message received from webview ",event.nativeEvent.data);

    let msgData;
    
    try {
      msgData = JSON.parse(event.nativeEvent.data);

      console.log("Message received from webview ",msgData.data.counter);

      Alert.alert(
        'Alert Title',
        'My Alert Msg',
        [
          {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
      

    } catch (err) {
      console.warn(err);
      return;
    }

    switch (msgData.targetFunc) {
      case "handleDataReceived":
        this[msgData.targetFunc].apply(this, [msgData]);
        break;
    }


  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.webViewContainer}>
          <WebView
            ref={webview => {
              this.myWebView = webview;
            }}
            scrollEnabled={true}
            useWebKit={true}
            source={require("./resources/index.html")}
            onMessage={this.onWebViewMessage}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcome: {
    flex: 1,
    paddingTop: 20,
    fontSize: 20,
    textAlign: "center",
    backgroundColor: "skyblue"
  },
  webViewContainer: {
    flex: 4
  }
});