

const MikroNode = require('mikronode');
MikroNode.debug = true;

const Device = new MikroNode('192.168.31.128');
console.log(Device);

Device.connect()
  .then(([login]) => {
    login('dev', '12345');
  })
  .then((connection) => {
    console.log(connection)
    console.log('Logged in.');

    exports.getUserList = (throwResult) => {
      const listenChannel = connection.openChannel('userList');
      listenChannel
        .write('/ip/hotspot/user/print')
        .then((result) => {
          const packet = MikroNode.resultsToObj(result.data);
          throwResult(packet);
          listenChannel.closeOnDone(true);
        })
        .catch((error) => console.log('Listen channel rejection:', error));
    };

    exports.getProfileList = (throwResult) => {
      const listenChannel = connection.openChannel('profilelist');
      listenChannel
        .write('/ip/hotspot/profile/print')
        .then((result) => {
          const packet = MikroNode.resultsToObj(result.data);
          throwResult(packet);
          listenChannel.closeOnDone(true);
        })
        .catch((error) => console.log('Listen channel rejection:', error));
    };
  })
  .catch((error) => {
    console.log(error, 'host1');
  });

// try {
//   const MikroNode = require('mikronode');
//   const Device = new MikroNode('192.168.31.128:4000');
//   console.log('here', Device);
//   // Device.setDebug(8);
//   Device.connect()
//     .then(([login]) => login('testuser', 'testuser'))
//     .then((connection) => {
//       console.log('Logged in.');

//       exports.getUserList = (throwResult) => {
//         const listenChannel = connection.openChannel('userList');
//         listenChannel
//           .write('/ip/hotspot/user/print')
//           .then((result) => {
//             const packet = MikroNode.resultsToObj(result.data);
//             throwResult(packet);
//             listenChannel.closeOnDone(true);
//           })
//           .catch((error) => console.log('Listen channel rejection:', error));
//       };

//       exports.getProfileList = (throwResult) => {
//         const listenChannel = connection.openChannel('profilelist');
//         listenChannel
//           .write('/ip/hotspot/profile/print')
//           .then((result) => {
//             const packet = MikroNode.resultsToObj(result.data);
//             throwResult(packet);
//             listenChannel.closeOnDone(true);
//           })
//           .catch((error) => console.log('Listen channel rejection:', error));
//       };
//     })
//     .then((error) => console.log(error, 'huy'));
// } catch (error) {
//   console.log(error);
// }

// const MikroNode = require('mikronode');

// const Device = new MikroNode('10.10.20.225');
// // Device.setDebug(8);
// try {
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
//   }
//   catch(err) {
//     console.log(err);
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
//   }

// const MikroNode = require('mikronode');

// const Device = new MikroNode('10.10.20.225');

// exports.getUserList = (throwResult) => {
//   Device.connect()
//     .then(([login]) => login('username', 'password'))
//     .then((connection) => {
//       console.log('Logged in.');

//       const listenChannel = connection.openChannel('userList');
//       listenChannel
//         .write('/ip/hotspot/user/print')
//         .then((result) => {
//           const packet = MikroNode.resultsToObj(result.data);
//           throwResult(packet);
//           listenChannel.closeOnDone(true);
//         })
//         .catch((error) => console.log('Listen channel rejection:', error));
//     });
// };

// exports.getProfileList  = (throwResult) => {
//   Device.connect()
//     .then(([login]) => login('username', 'password'))
//     .then((connection) => {
//       console.log('Logged in.');

//       const listenChannel = connection.openChannel('profileList');
//       listenChannel
//         .write('/ip/hotspot/profile/print')
//         .then((result) => {
//           const packet = MikroNode.resultsToObj(result.data);
//           throwResult(packet);
//           listenChannel.closeOnDone(true);
//         })
//         .catch((error) => console.log('Listen channel rejection:', error));
//     });
// };

// channel.write(lines[,optionsObject])
// Returns a promise that is resolved when the command sent is complete
// and is "done" The promise is rejected
// if a trap or fatal error occurs.
// Lines can be a string, or an array of strings.
// If it is a string, then it is split on the EOL character
// and each resulting line is sent
// as a separate word (in API speak) If lines is an array,
// then each element is sent unaltered.
// If lines is a string and optionsObject is provided,
// the optionsObject is converted to standard sentence
// output: =propertyName=propertyValue

// Each sentence that comes from the device goes through the data stream.
// listenChannel.write('/ip/hotspot/user/print')
// listenChannel.data.subscribe((data) => {
//     const packet = MikroNode.resultsToObj(data);
//     console.log(packet);
// }, error => {
//     console.log("Error during listenChannel subscription", error) // This shouldn't be called.
// }, () => {
//     console.log("Listen channel done.");
// });

// contains events when the done sentence comes from the device
// listenChannel.write('/ip/hotspot/user/print')
// listenChannel.done.subscribe((report) => {
//     const packet = MikroNode.resultsToObj(report.data);
//     // report.data.map(item => console.log(item[1].value));
//     // console.log('Interface change: ', packet);
//     // packet.map(item => console.log(item));
// });

// exports.getUserList = (throwResult) => {
//     device.connect()
//         .then(([login]) => login('username', 'password'))
//         .then((conn) => {
//             console.log("Logged in.");
//             conn.closeOnDone(true); // when all channels are "done" the connection should close.
//             const listenChannel = conn.openChannel("userList");
//             // Tell our listen channel to notify us of User List.
//             listenChannel.write('/ip/hotspot/user/print')
//             .then(result => {
//                 const packet = MikroNode.resultsToObj(result.data)
//                 throwResult(packet);
//                 // console.log("Listen channel done promise.", packet);
//             })
//             .catch(error => console.log("Listen channel rejection:", error)); // Catch shuold be called when we call /cancel (or listenChannel.close())
//         });

// }



// Library

// const MikroNode = require('mikronode');
// const device = new MikroNode('192.168.31.128');

// device
//   .connect()
//   .then(([login]) => login('dev', '12345'))
//   .then((conn) => {
//     console.log('Logged in.');
//     conn.closeOnDone(true); // All channels need to complete before the connection will close.
//     var listenChannel = conn.openChannel('listen');

//     // Each sentence that comes from the device goes through the data stream.
//     listenChannel.data.subscribe(
//       function (data) {
//         // var packet=MikroNode.resultsToObj(data);
//         console.log('Interface change: ', JSON.stringify(data));
//       },
//       (error) => {
//         console.log('Error during listenChannel subscription', error); // This shouldn't be called.
//       },
//       () => {
//         console.log('Listen channel done.');
//       }
//     );

//     // Tell our listen channel to notify us of changes to interfaces.
//     listenChannel
//       .write('/interface/listen')
//       .then((result) => {
//         console.log('Listen channel done promise.', result);
//       })
//       // Catch shuold be called when we call /cancel (or listenChannel.close())
//       .catch((error) => console.log('Listen channel rejection:', error));

//     // All our actions go through this.
//     var actionChannel = conn.openChannel('action', false); // don't close on done... because we are running these using promises, the commands complete before each then is complete.

//     // Do things async. This is to prove that promises work as expected along side streams.
//     actionChannel.sync(false);
//     actionChannel.closeOnDone(false); // Turn off closeOnDone because the timeouts set to allow the mikrotik to reflect the changes takes too long. The channel would close.

//     // These will run synchronsously (even though sync is not set to true)
//     console.log('Disabling interface');
//     actionChannel
//       .write('/interface/set', { disabled: 'yes', '.id': 'ether1' })
//       .then((results) => {
//         console.log('Disable complete.');
//         // when the first item comes in from the listen channel, it should send the next command.
//         const { promise, resolve, reject } = MikroNode.getUnwrappedPromise();
//         listenChannel.data
//           .take(1)
//           // This is just to prove that it grabbed the first one.
//           .do((d) => console.log('Data:', MikroNode.resultsToObj(d.data)))
//           .subscribe((d) =>
//             actionChannel
//               .write('/interface/set', { disabled: 'no', '.id': 'ether1' })
//               .then(resolve, reject)
//           );
//         return promise;
//       })
//       .then((results) => {
//         console.log('Enabled complete.');
//         // return new Promise((r,x)=>setTimeout(r,1000)).then(()=>actionChannel.write('/interface/getall'));
//         const { promise, resolve, reject } = MikroNode.getUnwrappedPromise();
//         // when the second item comes in from the listen channel, it should send the next command.
//         listenChannel.data
//           .take(1)
//           // This is just to prove that it grabbed the second one.
//           .do((d) => console.log('Data:', MikroNode.resultsToObj(d.data)))
//           .subscribe((d) =>
//             actionChannel.write('/interface/getall').then(resolve, reject)
//           );
//         return promise;
//       })
//       .then((results) => {
//         var formatted = MikroNode.resultsToObj(results.data);
//         var columns = ['.id', 'name', 'mac-address', 'comment'];
//         var filtered = formatted.map((line) =>
//           columns.reduce((p, c) => {
//             p[c] = line[c];
//             return p;
//           }, {})
//         );
//         console.log(
//           'Interface [ID,Name,MAC-Address]: ',
//           JSON.stringify(filtered, true, 4)
//         );
//       })
//       .catch((error) => {
//         console.log(
//           'An error occurred during one of the above commands: ',
//           error
//         );
//       })
//       // This runs after all commands above, or if an error occurs.
//       .then((nodata) => {
//         console.log('Closing everything.');
//         listenChannel.close(true); // This should call the /cancel command to stop the listen.
//         actionChannel.close();
//       });
//   });