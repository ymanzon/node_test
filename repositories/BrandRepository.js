const db = require("../config/db");

exports.Create = async (body) => {
  const { name, active } = body;
  let query = "SELECT name FROM brands WHERE name = ? and active = 1";
  const [rows] = await db.query(query, [name]);

  if (rows.length != 0) throw Error("Brand exists");

  query = "INSERT INTO brands (name, active) VALUES(?,?) ";
  await db.query(query, [name, active]);
};

exports.Retrive = async (body) => {
  const { name, active } = body;
  let query = "SELECT * FROM `brands_view`";
  let filter = "";
  let parameters = [];
  if (name) {
    filter += " AND name like ? ";
    parameters.push(`%${name}%`);
  }

  if (active) {
    filter += " AND active = ?";
    parameters.push(`${active == "true" ? 1 : 0}`);
  }

  if (filter != "") filter = `WHERE ${filter.substring(4)}`;

  query = `${query} ${filter}`;
  console.log(query);
  const [rows] = await db.query(query, parameters);

  return rows;
};

exports.Update = async (body, params) => {
    const { id } = params;
    const { name, active } = body;

    let _active = active == true ? 1 : 0;

    let query = "UPDATE brands SET name = ?, active = ?, update_at = NOW() WHERE id = ? ";

    await db.query(query, [name, _active, id]);
};

exports.Delete = async (params) => {
    const { id } = params;

    let query = "UPDATE brands SET delete_at = NOW() WHERE id = ? ";

    await db.query(query, [id]);
};
