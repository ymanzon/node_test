const db = require("../config/db");

exports.Create = async (body, user_id) => {
  const { sku, name, brand_id, active } = body;
  let query = "SELECT sku FROM products WHERE sku = ? and active = 1";
  const [rows] = await db.query(query, [sku]);

  if (rows.length != 0) throw Error("Products exists");

  query = "INSERT INTO products (sku, name, brand_id, active, user_id) VALUES(?, ?, ?, ?, ?) ";
  await db.query(query, [sku, name, brand_id, active, user_id]);
};

exports.Retrive = async (body) => {
  const { name, active } = body;
  let query = "SELECT id, sku, name, brand_id, active, user_id, create_at, update_at FROM `products_view`";
  let filter = "";
  let parameters = [];


  if (sku) {
    filter += " AND sku like ? ";
    parameters.push(`%${sku}%`);
  }

  if (name) {
    filter += " AND name like ? ";
    parameters.push(`%${name}%`);
  }

  if (brand_id) {
    filter += " AND brand_id = ? ";
    parameters.push(`${brand_id}`);
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

exports.Update = async (body, params, user_id) => {
    const { id } = params;
    const { sku, name,brand_id, active } = body;

    let _active = active == true ? 1 : 0;

    let query = "UPDATE products SET sku = ?, name = ?, brand_id = ?, active = ?, user_id = ?, update_at = NOW() WHERE id = ? ";

    await db.query(query, [sku, name, brand_id, _active, user_id, id]);
};

exports.Delete = async (params, user_id) => {
    const { id } = params;

    let query = "UPDATE products SET user_id = ? delete_at = NOW() WHERE id = ? ";

    await db.query(query, [user_id, id]);
};
