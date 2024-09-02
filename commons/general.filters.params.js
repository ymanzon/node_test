const { sequelize } = require("../config/sequelize.config");
const { Op } = require("sequelize");

exports.generalFiltersParams = ( body ) => {

  const { active, filter_by, start_date, end_date, user_id } = body;

  let parameters = [];

  if (active) parameters.push({ active: (active == 'true') ? 1 : 0 });

  if (filter_by) {
    const dateField = `${filter_by}`;

    if(start_date && !end_date)
      parameters.push({ [dateField]:  new Date(start_date) });

    if (start_date)
      parameters.push({ [dateField]: { [Op.gte]: new Date(start_date) } });

    if (end_date)
      parameters.push({ [dateField]: { [Op.lte]: new Date(end_date) } });
  }

  if(user_id)
    parameters.push({ user_id : user_id});

  return parameters;
}