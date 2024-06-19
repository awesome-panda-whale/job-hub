const db = require("../models/userModels");

const applicationController = {};

applicationController.createApp = async (req, res, next) => {
  try {
    const { company, position, url, status_id, contact, email, notes } =
      req.body;
    const { userId } = req.params;

    const params = [company, position, url, status_id, contact, email, notes];
    console.log("parms!!!!!!",params);
    const query = `INSERT INTO applications (company, position, url, status_id, contact, email, notes) VALUES ($1, $2, $3, $4, $5, $6, $7) returning id`;

    const applicationResult = await db.query(query, params);
    if (applicationResult.rows.length > 0) {
      console.log("Create application, ", applicationResult);
      const application_id = applicationResult.rows[0].id;
      const parameters = [userId, application_id];
      const user_app_query =
        "INSERT INTO Users_Applications (user_id, application_id) VALUES ($1, $2) returning application_id";
      const linkResult = await db.query(user_app_query, parameters);

      console.log("Create link between user and application,", linkResult);
      res.locals.application = linkResult.rows[0].application_id;
      return next();
    } else {
      throw new Error("Application creation failed");
    }
  } catch (err) {
    console.log(err);
    return next({
      log: "Error in applicationController.createApp",
      status: 500,
      message: { err: "An error occurred while creating the application" },
    });
  }
};

applicationController.getAppsByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (!userId || isNaN(parseInt(userId))) {
      return res.status(400).json({ error: "Invalid userId" });
    }

    const query = `
      SELECT a.id, a.company, a.position, a.url, a.date_applied, a.status_id, a.contact, a.email, a.notes
      FROM applications a
      INNER JOIN users_applications ua ON a.id = ua.application_id
      WHERE ua.user_id = $1`;
    const params = [userId];

    const data = await db.query(query, params);
    console.log("Get applications by user ID, ", data);
    res.locals.applications = data.rows;
    return next();
  } catch (err) {
    console.log(err);
    return next({
      log: "Error in applicationController.getAppsByUserId",
      status: 500,
      message: { err: "An error occurred while retrieving applications" },
    });
  }
};

applicationController.getAllAppsForUser = async (req, res, next) => {
  console.log('getting all apps for user', req)
  try {
    const { user_id } = req.params;
    const query = `SELECT a.id, a.company, a.position, a.url, a.date_applied, a.status_id, a.contact, a.email, a.notes
    FROM applications a
    INNER JOIN users_applications ua ON a.id = ua.application_id
    WHERE ua.user_id = $1`;
    const params = [user_id];

    const data = await db.query(query, params);
    console.log('getting all uer applications', data);
    res.locals.applications = data.rows;
    return next();
  } catch (err) {
    console.log(err);
    return next({
      log: 'Error in applicationController.getAllAppsForUser',
      status: 500,
      message: { err: 'Error occured while retrieving applications'
      }
    })
  }
}
applicationController.updateApplicationsByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const updatedApplications = req.body;

    if (!userId || isNaN(parseInt(userId))) {
      return res.status(400).json({ error: "Invalid userId" });
    }

    for (const application of updatedApplications) {
      const { id, status_id, notes } = application;
      const query =
        "UPDATE applications SET status_id = $1, notes = $2 WHERE id = $3";
      const values = [status_id, notes, id];
      await db.query(query, values);
    }

    res.locals.success = true;
    return next();
  } catch (error) {
    console.error("Error updating applications:", error);
    return next({
      log: "Error in applicationController.updateApplicationsByUserId",
      status: 500,
      message: { err: "An error occurred while updating applications" },
    });
  }
};

applicationController.getTotalApplications = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const query = `
      SELECT COUNT(*) AS total
      FROM users_applications
      WHERE user_id = $1
    `;
    const params = [userId];
    const result = await db.query(query, params);
    res.locals.totalApplications = result.rows[0]?.total || 0;
    return next();
  } catch (error) {
    console.error("Error getting total applications:", error);
    return next({
      log: "Error in applicationController.getTotalApplications",
      status: 500,
      message: { err: "An error occurred while getting total applications" },
    });
  }
};

module.exports = applicationController;
