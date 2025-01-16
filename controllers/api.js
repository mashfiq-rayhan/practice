const Host = require('node-routeros').RouterOSAPI;

// Initialize RouterOS API connection
const connection = new Host({
  host: '192.168.31.128',
  user: 'dev',
  password: '12345',
  port: 8728,
  timeout: 20000
});

// Connect to the device
connection
  .connect()
  .then(() => {
    console.log('Connected and logged in.');

    // Exported function to get user list
    exports.getUserList = (throwResult) => {
      connection
        .write('/ip/hotspot/user/print')
        .then((data) => {
          const userList = data.map((user) => user);
          throwResult(userList);
        })
        .catch((err) => {
          console.error('Error fetching user list:', err);
        });
    };

    // Exported function to get profile list
    exports.getProfileList = (throwResult) => {
      connection
        .write('/ip/hotspot/profile/print')
        .then((data) => {
          const profileList = data.map((profile) => profile);
          throwResult(profileList);
        })
        .catch((err) => {
          console.error('Error fetching profile list:', err);
        });
    };
  })
  .catch((err) => {
    console.error('Connection error:', err);
  });
