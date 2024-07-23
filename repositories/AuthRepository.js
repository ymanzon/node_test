//debio llamarse services
const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.Auth = async (body) => {
    const { email, password } = body;
    const [rows] = await db.query(
        "SELECT id, password FROM users WHERE email = ? and active = 1",
        [email]
      );
      if (rows.length === 0) throw Error("Invalid credentials"); //return res.status(400).send("Invalid credentials");
  
      const user = rows[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) throw Error("Invalid credentials"); //return res.status(400).send("Invalid credentials");
  
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {expiresIn: "1h"});
      return {token: token};
};

exports.Register = async (user) => {
  const { name, email, password, active, user_id } = user;

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
