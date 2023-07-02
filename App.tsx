/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useRef } from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  TextInput,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
// import { RTCPeerConnection, RTCView } from 'react-native-webrtc';
import { createConnection, connect, sendMessage } from './action'

createConnection()

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({ children, title }: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [text, onChangeText] = React.useState('Useless text');

  // Handle the scrolling mechanism------------------------------
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollToPosition = () => {
    console.log(text)
    const scrollPosition = 600; // Desired scroll position
    // console.log(scrollViewRef.current)
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: scrollPosition, animated: true });
    }
  };

  const handleScroll = (event: { nativeEvent: { contentOffset: { y: any; }; }; }) => {
    // Access scroll position
    const scrollPosition = event.nativeEvent.contentOffset.y;
    console.log('Scroll position:', scrollPosition);
  };

  // ------------end of scrolling mechanism----------------------


  // Handle the webRTC connection------------------------------
  // const peerConnectionRef = useRef<RTCPeerConnection>();

  // const createPeerConnection = () => {
  //   const configuration = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
  //   const peerConnection = new RTCPeerConnection(configuration);

  //   // Set up event handlers for ICE candidates and remote stream
  //   peerConnection.onicecandidate = handleICECandidate;
  //   peerConnection.onconnectionstatechange = handleConnectionStateChange;

  //   // Store the peer connection reference
  //   peerConnectionRef.current = peerConnection;
  // };

  // const createOffer = async () => {
  //   createPeerConnection();

  //   try {
  //     const offer = await peerConnectionRef.current.createOffer();
  //     await peerConnectionRef.current.setLocalDescription(offer);

  //     // Send the offer to the remote peers
  //     sendOffer(offer);
  //   } catch (error) {
  //     console.log('Error creating offer:', error);
  //   }
  // };

  // const handleICECandidate = (event) => {
  //   // Handle ICE candidate event
  //   if (event.candidate) {
  //     // Send the candidate to the remote peer
  //     sendICECandidate(event.candidate);
  //   }
  // };

  // const handleConnectionStateChange = () => {
  //   // Handle connection state change event
  //   const connectionState = peerConnectionRef.current.connectionState;
  //   console.log('Connection state:', connectionState);
  // };

  // const sendInteger = () => {
  //   const integerToSend = 42; // Replace with your desired integer
  //   // Send the integer to the remote peer using your chosen signaling mechanism

  // };

  // const sendICECandidate = candidate => {
  //   // Send the ICE candidate to the remote peers
  //   // For example, using a signaling mechanism like WebSocket
  // };

  // const sendOffer = offer => {
  //   // Send the offer to the remote peers
  //   // For example, using a signaling mechanism like WebSocket
  // };

  // const sendAnswer = (answer, receiverId) => {
  //   // Send the answer to the remote peer
  //   // For example, using a signaling mechanism like WebSocket
  // };

  // // ------------end of webRTC connection----------------------


  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}
        onScrollEndDrag={handleScroll}
        ref={scrollViewRef}>
        <Header />
        <TextInput
          onChangeText={onChangeText}
          placeholder='Enter peer ID.'
        />
        <Button title="Scroll" onPress={scrollToPosition} />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
