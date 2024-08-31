//debio llamarse services
const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {UserModel, UserView} = require('../models/user.model');

exports.Auth = async (body) => {
    const { email, password } = body;

    const user = await UserView.findOne({
      where :{
        email:email,
        active : 1
      }
    });

    //console.log(user);
    if(!user)
      throw Error(`User '${email}' not found`);

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) throw Error("Invalid credentials");

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {expiresIn: "12h"});

      return {
        user: email,
        token: token, 
        date: Date.now(),
        expiresIn: '12h'
      };
    
};

//no se cambia este pq en el registro se hara en el controller de Users
exports.Register = async (user) => {
  const { name, email, password, active } = user;

  let user_id = 9;

  let query = "SELECT email FROM users WHERE email = ?";
  const [rows] = await db.query(query, [email]);
console.log(rows);
  if (rows.length == 0) {
    console.log("usuario no se encontro");
    const hashedPassword = await bcrypt.hash(password, 10);
    let query =
      "INSERT INTO users (name, email, password, active, user_id) VALUES (?, ?, ?, ?, ?)";
    await db.query(query, [name, email, hashedPassword, active, user_id]);
  } else {
    console.log("usuario existe");
    throw Error("User alrealy exists");
  }
};
