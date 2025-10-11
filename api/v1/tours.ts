import express from "express";
import {
  deleteTourById,
  getAllTours,
  getTourById,
  patchTour,
  updateImage,
} from "../../routes/toursRoutes";

const router = express.Router();

router.route("/").get(getAllTours);

router.use((req, res, next) => {
  console.log("Hello from middleware");
  res.status(400).json({
    message: "Login failed - Unauthorized user",
  });
  next();
});

router.route("/:id").get(getTourById).patch(patchTour).delete(deleteTourById);
router.route("/image").post(updateImage);

export default router;
