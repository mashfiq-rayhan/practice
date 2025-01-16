// #DEVICE_MAIN_1
// const MikroNode = require('mikronode');

// const Device = new MikroNode('10.10.20.225');
// // Device.setDebug(8);
//     Device.connect()
//         .then(([login]) => login('username', 'password'))
//         .then((connection) => {
//             console.log("Logged in.");
            
//             exports.getUserList = (throwResult) => {
//             const listenChannel = connection.openChannel("userList");
//             listenChannel.write('/ip/hotspot/user/print')
//             .then(result => {
//                 const packet = MikroNode.resultsToObj(result.data)
//                 throwResult(packet);
//                 listenChannel.closeOnDone(true);
//             })
//             .catch(error => console.log("Listen channel rejection:", error)); }
           
//             exports.getProfileList = (throwResult) => {
//                 const listenChannel = connection.openChannel("profilelist");
//                 listenChannel.write('/ip/hotspot/profile/print')
//                 .then(result => {
//                     const packet = MikroNode.resultsToObj(result.data)
//                     throwResult(packet);
//                     listenChannel.closeOnDone(true);
//                 })
//                 .catch(error => console.log("Listen channel rejection:", error)); }
//         });


// #DEVICE_2
// const MikroNode = require('mikronode');

// const Device = new MikroNode('192.168.31.171');
// // Device.setDebug(8);
//     Device.connect()
//         .then(([login]) => login('username', 'password'))
//         .then((connection) => {
//             console.log("Logged in.");
            
//             exports.getUserList = (throwResult) => {
//             const listenChannel = connection.openChannel("userList");
//             listenChannel.write('/ip/hotspot/user/print')
//             .then(result => {
//                 const packet = MikroNode.resultsToObj(result.data)
//                 throwResult(packet);
//                 listenChannel.closeOnDone(true);
//             })
//             .catch(error => console.log("Listen channel rejection:", error)); }
           
//             exports.getProfileList = (throwResult) => {
//                 const listenChannel = connection.openChannel("profilelist");
//                 listenChannel.write('/ip/hotspot/profile/print')
//                 .then(result => {
//                     const packet = MikroNode.resultsToObj(result.data)
//                     throwResult(packet);
//                     listenChannel.closeOnDone(true);
//                 })
//                 .catch(error => console.log("Listen channel rejection:", error)); }
//         });

// #DEVICE_3
// const MikroNode = require('mikronode');

// const Device = new MikroNode('192.168.31.128');
// // Device.setDebug(8);
//     Device.connect()
//         .then(([login]) => login('username', 'password'))
//         .then((connection) => {
//             console.log("Logged in.");
            
//             exports.getUserList = (throwResult) => {
//             const listenChannel = connection.openChannel("userList");
//             listenChannel.write('/ip/hotspot/user/print')
//             .then(result => {
//                 const packet = MikroNode.resultsToObj(result.data)
//                 throwResult(packet);
//                 listenChannel.closeOnDone(true);
//             })
//             .catch(error => console.log("Listen channel rejection:", error)); }
           
//             exports.getProfileList = (throwResult) => {
//                 const listenChannel = connection.openChannel("profilelist");
//                 listenChannel.write('/ip/hotspot/profile/print')
//                 .then(result => {
//                     const packet = MikroNode.resultsToObj(result.data)
//                     throwResult(packet);
//                     listenChannel.closeOnDone(true);
//                 })
//                 .catch(error => console.log("Listen channel rejection:", error)); }
//         });