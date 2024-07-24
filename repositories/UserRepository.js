const db = require('../config/db');
const bcrypt = require("bcryptjs");
//const jwt = require("jsonwebtoken");

exports.Create = async (body, user_id) => {
    const { name, email, password, active } = body;
    let query = "SELECT email FROM `users_view` WHERE active = 1 and email = ? ";
    const [rows] = await db.query(query, [email]);

    if (rows.length != 0) throw Error("User exists!!!");

    const conn = await db.getConnection();
    
    try {
        await conn.beginTransaction();

        const hashedPassword = await bcrypt.hash(password, 10);
        query = "INSERT INTO users (name, email, password, active, user_id) VALUES(?, ?, ?,  ?, ?) ";
        let id = await db.query(query, [name, email, hashedPassword, active, user_id ]);
        console.log(id.insertId);
        await conn.commit();
    } catch (error) {
        await conn.rollback();
    }
    
}

exports.Retrive = async (body) => {
    const { name, email, active, user_id, create_at, update_at } = body;
    let query = "SELECT name, email, active, user_id, create_at, update_at FROM `users_view`";
    let filter = "";
    let parameters = [];
    if (name) {
        filter += " AND name like ? ";
        parameters.push(`%${name}%`);
    }

    if (email) {
        filter += " AND email like ? ";
        parameters.push(`%${email}%`);
    }

    if (active) {
        filter += " AND active = ?";
        parameters.push(`${active == "true" ? 1 : 0}`);
    }

    if (user_id) {
        filter += " AND user_id = ? ";
        parameters.push(`${user_id}`);
    }

    if (create_at) {
        filter += " AND create_at == ? ";
        parameters.push(`${create_at}`);
    }

    if (update_at) {
        filter += " AND update_at == ? ";
        parameters.push(`${update_at}`);
    }

    if (filter != "") filter = `WHERE ${filter.substring(4)}`;

    query = `${query} ${filter}`;
    console.log(query);
    const [rows] = await db.query(query, parameters);

    return rows;
    }

exports.Update = async (body, params, user_id) => {
    const { id } = params;
    const { name, email, active } = body;

    let _active = active == true ? 1 : 0;

    let query = "UPDATE users SET name = ?, email = ?, active = ?, user_id = ?, update_at = NOW() WHERE id = ? ";

    await db.query(query, [name, email, _active, user_id, id]);
}


exports.Delete = async (params, user_id) => {
    const { id } = params;

    let query = "UPDATE users SET user_id = ?, delete_at = NOW() WHERE id = ? ";

    await db.query(query, [user_id, id]);
}