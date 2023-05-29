
const bcrypt = require('bcryptjs');
const member = require('../model/member')
const jwt = require('jsonwebtoken');
const employee = require('../model/employee');

require('dotenv').config();

module.exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!(username && password)) {
            res.status(400).send("All input is required");
        }
        let user = await member.findOne({ username });
       
            if (user && (await bcrypt.compare(password, user.password))) {
                const token = jwt.sign(
                    {
                        user_id: user._id, username
                    },
                    process.env.TOKEN_KEY,
                    {
                        expiresIn: "2h"
                    }
                )
                user.token = token;
                console.log('user========>', user)
                res.status(200).json(JSON.stringify(user));
            }
            res.status(400).send('Invalid');

  
    } catch (err) {
        console.log(err);
    }
}

module.exports.loginEmployee = async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!(username && password)) {
        return res.status(400).send("All input is required");
      }
  
      let user = await employee.findOne({ username });
  
      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign(
          {
            user_id: user._id,
            username
          },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h"
          }
        );
        user.token = token;
        console.log('user========>', user);
        return res.status(200).json(JSON.stringify(user));
      }
      
      return res.status(400).send('Invalid');
    } catch (err) {
      console.log(err);
      return res.status(500).send('Internal Server Error');
    }
  };
  

module.exports.logout = async (req, res) => {
    // Remove the authorization header from the request
    delete req.headers.authorization;
    
    // Return a successful response
    res.status(200).json({ message: 'Logout successful' });
  }
  