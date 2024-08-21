const User = require('../models/User');

const adminController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find({ role: 'user' }, 'firstName lastName email age location gender');
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  

  deleteUser: async (req, res) => {
    const { userId } = req.params;

    try {
      await User.findByIdAndDelete(userId);
      res.json({ message: 'User deleted successfully.' });
    } catch (error) {
      console.error('Deletion failed:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  getGenderDistribution: async (req, res) => {
    try {
      const genderDistribution = await User.aggregate([{$match: { role: 'user' }},
        { $group: { _id: '$gender', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]);

      const labels = genderDistribution.map((entry) => entry._id);
      const data = genderDistribution.map((entry) => entry.count);

      res.json({ labels, data });
    } catch (error) {
      console.error('Error fetching gender distribution:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  getAgeDistribution: async (req, res) => {
    try {
      const ageDistribution = await User.aggregate([
        { $match: { role: 'user' } },
        {
          $group: {
            _id: {
              $concat: [
                { $toString: { $subtract: ['$age', { $mod: ['$age', 10] }] } },
                '-',
                { $toString: { $add: [{ $subtract: ['$age', { $mod: ['$age', 10] }] }, 9] } },
              ],
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { '_id': 1 } },
      ]);
  
      const labels = ageDistribution.map((entry) => entry._id);
      const data = ageDistribution.map((entry) => entry.count);
  
      res.json({ labels, data });
    } catch (error) {
      console.error('Error fetching age distribution:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  
  
  getAdminDetails: async (req, res) => {
    try {
      const admin = await User.findOne({ role: 'admin' ,email:'shreyasm101@gmail.com' }, 'firstName lastName gender age location');
      res.json(admin);
    } catch (error) {
      console.error('Error fetching admin details:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },  
  getUserDetails: async (req, res) => {
    try {
      const user = await User.findOne({ role: 'user' ,email:'user@gmail.com' }, 'firstName lastName gender age location');
      res.json(user);
    } catch (error) {
      console.error('Error fetching user details:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  
  };


module.exports = adminController;
