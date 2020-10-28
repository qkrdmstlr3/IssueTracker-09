const userService = require('../service/user');

module.exports = {
  gitHubLogin: (req, res) => {
    const data = userService.gitHubLogin(req.user);
    if (data.token) {
      res.status(200).json(data);
    } else {
      res.status(403).json(false);
    }
  },
  iosAppleLogin: async (req, res) => {
    const data = await userService.iosAppleLogin(req.body);
    console.log(data);
    if (data.token) {
      res.status(200).json(data);
    } else {
      res.status(403).json(false);
    }
  },
  getUser: (req, res) => {
    const { name, image } = req.user.dataValues;
    res.status(200).json({ name, image });
  },
  getUsers: async (req, res) => {
    try {
      const users = await userService.getUsers();

      if (users) {
        return res.status(200).json(users);
      }
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
};