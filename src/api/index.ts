import express, { Request, Response } from "express";
import * as fs from "fs";
import path from "path";

const app = express();

app.use(express.json());

// const PORT = 3000;

const tours = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "../dev-data/data/tours-simple.json"),
    "utf-8"
  )
);

app.get("/", (req: Request, res: Response) => {
  res
    .status(200)
    .json({ status: "success", data: { message: "Hello from API" } });
});

app.get("/api/v1/tours", (req: Request, res: Response) => {
  res
    .status(200)
    .json({ status: "success", result: tours.length, data: { tours } });
});

app.get("/api/v1/tours/:id", (req: Request, res: Response) => {
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
});

app.post("/image", (req: Request, res: Response) => {
  console.log("req", JSON.stringify(req.body));

  if (!req.body) return res.status(400).send("Body Data missing");

  res
    .status(200)
    .json({ message: "Image uploaded successfully", req: req.body });
});

app.patch("/api/v1/tours/:id", (req: Request, res: Response) => {
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
});

app.delete("/api/v1/tours/:id", (req: Request, res: Response) => {
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
});

//  Commenting this as deploying on Vercel doesn't require this.

// app.listen(PORT, "127.0.0.1", () => {
//   console.log(`Server Started Listening on port ${PORT}..`);
// });

export default app;
