const API = require('./api.js');

exports.getAdminPage = (req, res) => {
  const data = 'This is your Dashboard';
  res.render('admin/dashboard', {
    pageTitle: 'Admin',
    path: '/admin',
    data: data
  });
};

exports.getUserList = (req, res) => {
  const catchResult = (packet) => {
    const userList = packet.map((user) => user.name); //user.name
    res.render('admin/userlist', {
      pageTitle: 'User List',
      path: '/admin/userlist',
      userList: userList
    });
  };
  API.getUserList(catchResult);
};

exports.getProfileList = (req, res) => {
  const catchResult = (packet) => {
    const profileList = packet.map((profile) => profile.name); //user.name
    res.render('admin/profilelist', {
      pageTitle: 'Profile List',
      path: '/admin/profilelist',
      profileList: profileList
    });
  };

  API.getProfileList(catchResult);
};
