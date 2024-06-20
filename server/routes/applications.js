const express = require("express");
const applicationController = require("../controllers/applicationsController");
const applicationsRouter = express.Router();

applicationsRouter.post(
  "/application/:userId",
  applicationController.createApp,
  (req, res) => {
    return res
      .status(200)
      .json({ success: true, application: res.locals.application });
  }
);

applicationsRouter.get(
  "/application/:userId",
  applicationController.getAppsByUserId,
  (req, res) => {
    return res.status(200).json(res.locals.applications);
  }
);

applicationsRouter.put(
  "/application/:userId",
  applicationController.updateApplicationsByUserId,
  (req, res) => {
    return res.status(200).json({ success: true });
  }
);

applicationsRouter.get(
  "/total-applications/:userId",
  applicationController.getTotalApplications,
  (req, res) => {
    return res.status(200).json(res.locals.totalApplications);
  }
);

applicationsRouter.get(
  "/statuses",
  applicationController.getStatuses,
  (req, res) => {
    return res.status(200).json(res.locals.statuses);
  }
)
module.exports = applicationsRouter;
