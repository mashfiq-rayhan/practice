// //  Enable Mikrotik Method 1
// const MikroNode = require('mikronode');

// const device = new MikroNode('10.10.20.225');
// device.connect()
//     .then(([login]) => login('username', 'password'))
//     .then(function(conn) {

//         conn.closeOnDone(true); // when all channels are "done" the connection should close.

//         const chan1 = conn.openChannel("users");
//         chan1.write('/ip/hotspot/user/print');
//         chan1.done.subscribe((report) => {
//             report.data.map(item => console.log(item[1].value));
//             console.log("<------------------------>")
//             chan1.close();
//         });


//         const chan2 = conn.openChannel("profiles");
//         chan2.write('/ip/hotspot/user/profile/print');
//         chan2.done.subscribe(function(report) {
//             report.data.map(item => console.log(item[1].value));
//             chan2.close();
//             // conn.close();
//         });

//         const chan3 = conn.openChannel("NameUser");
//         chan3.write('/ip/hotspot/user/profile/print', {'?name':'10Mb'});
//         chan3.done.subscribe((report) => {
//             console.log(report.data)
//             // report.data.map(item => console.log(item[1].value));
//             chan3.close();
//             // conn.close();
//         });

//         const chan4 = conn.openChannel("NameUser");
//         chan4.write('/ip/hotspot/user/remove', {'.id':"*B"});
//         chan4.done.subscribe((report) => {
//             console.log(report.data)
//             // report.data.map(item => console.log(item[1].value));
//             chan4.close();
//             // conn.close();
//         });

//         const chan5 = conn.openChannel("NameUser");
//         chan5.write('/ip/hotspot/user/print', {'?name':'user9'});
//         chan5.done.subscribe((report) => {
//             console.log(report.data)
//         });
//         chan5.write('/ip/hotspot/user/set', {'disabled':'yes','.id':'*A'});
//         chan5.done.subscribe((report) => {
//             console.log(report.data)
//             report.data.map(item => console.log(item[1].value));
//             chan5.close();
//             conn.close();
//         });

//     });


// Promises add simplicity
const MikroNode = require('mikronode');
const device = new MikroNode('192.168.0.1');
device.connect()
    .then(([login]) => login('admin', 'password'))
    .then((conn) => {
        console.log("Logged in.");
        conn.closeOnDone(true); // All channels need to complete before the connection will close.
        const listenChannel = conn.openChannel("listen");

        // Each sentence that comes from the device goes through the data stream.
        listenChannel.data.subscribe((data) => {
            // const packet=MikroNode.resultsToObj(data);
            console.log('Interface change: ', JSON.stringify(data));
        }, error => {
            console.log("Error during listenChannel subscription", error) // This shouldn't be called.
        }, () => {
            console.log("Listen channel done.");
        });

        // Tell our listen channel to notify us of changes to interfaces.
        listenChannel.write('/interface/listen').then(result => {
            console.log("Listen channel done promise.", result);
        })
            // Catch shuold be called when we call /cancel (or listenChannel.close())
            .catch(error => console.log("Listen channel rejection:", error));

        // All our actions go through this.
        const actionChannel = conn.openChannel("action", false); // don't close on done... because we are running these using promises, the commands complete before each then is complete.

        // Do things async. This is to prove that promises work as expected along side streams.
        actionChannel.sync(false);
        actionChannel.closeOnDone(false); // Turn off closeOnDone because the timeouts set to allow the mikrotik to reflect the changes takes too long. The channel would close.

        // These will run synchronsously (even though sync is not set to true)
        console.log("Disabling interface");
        actionChannel.write('/interface/set', { 'disabled': 'yes', '.id': 'ether1' }).then(results => {
            console.log("Disable complete.");
            // when the first item comes in from the listen channel, it should send the next command.
            const { promise, resolve, reject } = MikroNode.getUnwrappedPromise();
            listenChannel.data
                .take(1)
                // This is just to prove that it grabbed the first one.
                .do(d => console.log("Data:", MikroNode.resultsToObj(d.data)))
                .subscribe(d => actionChannel.write('/interface/set', { 'disabled': 'no', '.id': 'ether1' }).then(resolve, reject));
            return promise;
        })
            .then(results => {
                console.log("Enabled complete.");
                // return new Promise((r,x)=>setTimeout(r,1000)).then(()=>actionChannel.write('/interface/getall'));
                const { promise, resolve, reject } = MikroNode.getUnwrappedPromise();
                // when the second item comes in from the listen channel, it should send the next command.
                listenChannel.data
                    .take(1)
                    // This is just to prove that it grabbed the second one.
                    .do(d => console.log("Data:", MikroNode.resultsToObj(d.data)))
                    .subscribe(d => actionChannel.write('/interface/getall').then(resolve, reject));
                return promise;
            })
            .then(results => {
                const formatted = MikroNode.resultsToObj(results.data);
                const columns = [".id", "name", "mac-address", "comment"];
                const filtered = formatted.map(line => columns.reduce((p, c) => { p[c] = line[c]; return p }, {}));
                console.log('Interface [ID,Name,MAC-Address]: ', JSON.stringify(filtered, true, 4));
            })
            .catch(error => {
                console.log("An error occurred during one of the above commands: ", error);
            })
            // This runs after all commands above, or if an error occurs.
            .then(nodata => {
                console.log("Closing everything.");
                listenChannel.close(true); // This should call the /cancel command to stop the listen.
                actionChannel.close();
            });
    });