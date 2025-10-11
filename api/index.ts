import express from "express";
import morgan from "morgan";
import toursRouter from "./v1/tours";
import usersRouter from "./v1/users";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.get("/api", (_req, res) => res.send("API Root is working"));
// Simple root route to verify server is running
// app.get("/", (_req, res) => {
//   res.send("Server is running");
// });

app.use((req, _res, next) => {
  // console.log(`Request Method: ${req.method}, URL: ${req.url}`);
  next();
});

// console.log("Mounting toursRouter at /api/v1/tours");

// Mount tours router on /api/v1/tours
app.use("/api/v1/tours", toursRouter);
app.use("/api/v1/users", usersRouter);

// Start server only if running locally (not on serverless platform)
// Use this during local dev for listening on port 3000
if (process.env.NODE_ENV !== "production") {
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
