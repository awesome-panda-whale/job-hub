const db = require('../models/userModels');

const applicationController = {};

applicationController.createApp = async (req, res, next) => {
  try {
    const { company, position, url, status_id, contact, email, notes } = req.body;
    // For testing purposes, hardcoded user_id. This should come from the logged-in user session.
    const user_id = 2;

    const params = [company, position, url, status_id, contact, email, notes];
    const query = `INSERT INTO applications (company, position, url, status_id, contact, email, notes) VALUES ($1, $2, $3, $4, $5, $6, $7) returning id`;

    const applicationResult = await db.query(query, params);
    if (applicationResult.rows.length > 0) {
      console.log('Create application, ', applicationResult);
      const application_id = applicationResult.rows[0].id;
      const parameters = [user_id, application_id];
      const user_app_query = 'INSERT INTO Users_Applications (user_id, application_id) VALUES ($1, $2) returning application_id';
      const linkResult = await db.query(user_app_query, parameters);

      console.log('Create link between user and application,', linkResult);
      res.locals.application = linkResult.rows[0].application_id;
      return next();
    } else {
      throw new Error('Application creation failed');
    }
  } catch (err) {
    console.log(err);
    return next({
      log: 'Error in applicationController.createApp',
      status: 500,
      message: { err: 'An error occurred while creating the application' },
    });
  }
};

applicationController.getApp = async (req, res, next) => {
  try {
    const { id } = req.params;
    const query = `
      SELECT a.id, a.company, a.position, a.url, a.date_applied, a.status_id, a.contact, a.email, a.notes, u.username
      FROM applications a
      INNER JOIN users u ON a.user_id = u.id
      WHERE a.id = $1`;
    const params = [id];

    const data = await db.query(query, params);
    console.log('Get application, ', data);
    res.locals.getApp = data.rows[0];
    return next();
  } catch (err) {
    console.log(err);
    return next({
      log: 'Error in applicationController.getApp',
      status: 500,
      message: { err: 'An error occurred while retrieving the application' },
    });
  }
};

module.exports = applicationController;
