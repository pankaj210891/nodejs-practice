import { Request, Response } from "express";
import tours from "../src/dev-data/data/tours-simple.json";

const getAllTours = (req: Request, res: Response) => {
  const query = req.query;

  console.log("query", JSON.stringify(query));
  res.status(200).json({
    status: "success",
    result: tours.length,
    queries: query,
    data: { tours },
  });
};

const getTourById = (req: Request, res: Response) => {
  const tourId = req.params.id;

  const foundedTour = tours.find((tour: any) => tour.id == tourId);

  if (foundedTour) {
    res.status(200).json({
      status: "success",
      message: "Tour data fetched successfully",
      data: foundedTour,
    });
  } else {
    res.status(404).json({
      status: "fail",
      message: `No tour asscociated with this ID : ${tourId}`,
    });
  }
};

const patchTour = (req: Request, res: Response) => {
  const tourId = req.params.id;

  if (!req.body) {
    res.status(404).json({
      status: "fail",
      message: "Body is missing",
    });
  } else {
    const foundedTour = tours.find((tour: any) => tour.id == tourId);

    if (foundedTour) {
      res.status(200).json({
        status: "success",
        message: "Tour updated successfully",
        data: { ...foundedTour, ...req.body },
      });
    } else {
      res.status(404).json({
        status: "fail",
        message: `No tour asscociated with this ID : ${tourId}`,
      });
    }
  }
};

const deleteTourById = (req: Request, res: Response) => {
  const tourId = req.params.id;

  const foundedTour = tours.find((tour: any) => tour.id == tourId);

  if (foundedTour) {
    res.status(200).json({
      status: "success",
      message: "Tour deleted successfully",
      total: tours.length - 1,
      actualTotal: tours.length,
      data: tours.filter((tour: any) => tour.id != tourId),
    });
  } else {
    res.status(404).json({
      status: "fail",
      message: `No tour found with this ID : ${tourId}`,
    });
  }
};

const updateImage = (req: Request, res: Response) => {
  console.log("req", JSON.stringify(req.body));

  if (!req.body) return res.status(400).send("Body Data missing");

  res
    .status(200)
    .json({ message: "Image uploaded successfully", req: req.body });
};

export { getAllTours, deleteTourById, getTourById, patchTour, updateImage };
