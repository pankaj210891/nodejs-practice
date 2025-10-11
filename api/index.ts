import express from "express";
import toursRouter from "./v1/tours";

const app = express();

app.use(express.json());

// Simple root route to verify server is running
app.get("/", (_req, res) => {
  res.send("Server is running");
});

// Mount tours router on /api/v1/tours
app.use("/api/v1/tours", toursRouter);

// Start server only if running locally (not on serverless platform)
// Use this during local dev for listening on port 3000
if (process.env.NODE_ENV !== "production") {
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
