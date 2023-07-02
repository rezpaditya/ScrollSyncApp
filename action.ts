import Peer from 'react-native-peerjs';


const peer = new Peer();
peer.on('open', function (id: string) {
    console.log('My PeerJS ID is: ' + id);
});

export const createConnection = () => {
    console.log('creating a connection now...')
}

export const connect = (peerId: string) => {
    const connection = peer.connect(peerId, { host: 'http://rtc-server.respa.nl/', port: '80' });
    connection.on('open', function () {
        console.log('Connected to: ' + connection.peer);
        // Receive and display chat messages
        connection.on('data', function (data: string) {
            displayMessage(connection.peer, data);
        });
    });
}

peer.on('connection', function (connection: Peer) {
    connection.on('open', function () {
        console.log('Connected to: ' + connection.peer);
        // Receive and display chat messages
        connection.on('data', function (data: string) {
            displayMessage(connection.peer, data);
        });
    });
});

export const sendMessage = () => {
    const message = "test message..."
    // Send chat message to all connected peers
    Object.keys(peer.connections).forEach(function (peerId) {
        peer.connections[peerId].forEach(function (connection: Peer) {
            connection.send(message);
        });
    });
    displayMessage('Me', message);
}

function displayMessage(sender: string, message: string) {
    const formattedMessage = sender + ': ' + message;
    console.log(formattedMessage + '\n');
}