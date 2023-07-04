import React, { useEffect, useRef, useState } from 'react';
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
import Peer from 'react-native-peerjs';


type SectionProps = PropsWithChildren<{
  title: string;
}>;

let peer: Peer;
let connection: Peer.DataConnection;

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

  const [peerId, onChangeText] = React.useState('Useless text');
  const [id, setId] = useState('');
  const [localPeer, setPeer] = useState(null);
  const [availableConnection, setAvailableConnection] = useState(null);

  useEffect(() => {
    const initializePeer = async () => {
      const newPeer = new Peer()
      newPeer.on('error', console.log)
      newPeer.on('open', function (id: string) {
        console.log('My PeerJS ID is: ' + id);
        setId(id)
      });

      newPeer.on('connection', (conn: Peer) => {
        console.log('Local peer received a connection.')
        conn.on('connection', setAvailableConnection)
        console.log('Local connected to:', conn.peer);
        conn.on('data', (data: number) => {
          console.log(`sender: ${conn.peer}. message:`, data);
          console.log('\n\n')
          scrollToPosition(data)
        });
      })

      setPeer(newPeer);
    }

    initializePeer()

    // Clean up the peer instance on unmount
    return () => {
      peer = localPeer
      if (localPeer) {
        peer.destroy();
      }
    };

  }, [])



  const connectToPeer = () => {
    console.log('Connecting to peer:', peerId)
    peer = localPeer
    if (localPeer) {
      const connection = peer.connect(peerId, { host: 'http://rtc-server.respa.nl/', port: '80' });
      connection.on('open', () => {
        console.log('Connected to:', connection.peer);
        // Receive and display chat messages
        connection.on('data', (data: number) => {
          console.log('Received message:', data);
        });
      });
      setAvailableConnection(connection)
    }
  }

  const scrollViewRef = useRef<ScrollView>(null);
  const scrollToPosition = (desiredPosition: number) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: desiredPosition, animated: true });
    }
  };

  const handleScroll = (event: { nativeEvent: { contentOffset: { y: any; }; }; }) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    console.log('Scroll position:', scrollPosition);
    connection = availableConnection
    if (availableConnection) {
      connection.send(scrollPosition);
    }
  };

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
          aria-label='My ID'
          value={id}
        />
        <TextInput
          onChangeText={onChangeText}
          placeholder='Enter peer ID.'
        />
        <Button title="Connect" onPress={connectToPeer} />
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
