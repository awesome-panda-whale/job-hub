const db = require('../models/userModels');

const applicationController = {};

//already change the createApp middleware - Aria
applicationController.createApp = async(req, res, next) => {
  const { company, position, url, date_applied, status_id, contact, email, notes} = req.body;
  console.log(req.body);
  if (!company || !position ) {
    return next({
      log:'Company and position should not be empty',
      message: 'Company and position should not be empty'
    })
  } 

  const params = [company, position, url, date_applied, status_id, contact, email, notes];
  const query = `
        INSERT INTO Applications 
        (company, position, url, date_applied, status_id, contact, email, notes)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING company, position`
   
  try {
    const dataReturn = await db.query(query, params);
    console.log(dataReturn.rows[0]);
    res.locals.createApp = {
      success: true,
      message: "Saving Application",
      data: dataReturn.rows[0]
    };
    return next();
  } catch(err) {
    return next({
      error: err,
      message: 'Error in Saving your Application',
    });
  }
};

applicationController.getApp = async (req, res, next) => {
  const { id } = req.params;
  const query = `SELECT a.id, a.company, a.date_applied, a.status, a.role, users.username
    FROM applications a INNER JOIN users 
    ON applications.user_id = users.id
    WHERE applications.id = $1`;
  const params = [id];

  await db.query(query, params)
    .then((data) => {
      console.log('Get application, ', data);
      res.status(200).send('Get App');
      res.locals.getApp = data.rows[0];
      return next();
    })
    .catch((err) => {
      console.log(err);
      return next({
        error: err,
        message: 'Error in applicationController.getApp',
      });
    });
};

module.exports = applicationController