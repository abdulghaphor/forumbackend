const express = require("express");
const cors = require("cors");
const db = require("./db/models");
const { bakeryRouter, cookieRouter } = require("./routers");
const path = require("path");

// Initialize Express
const app = express();

// Routers
app.use("/cookies", cookieRouter);
app.use("/bakeries", bakeryRouter);

// Middleware
app.use(cors());
app.use("/media", express.static(path.join(__dirname, "media")));

// Error Handling Middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message || "Internal Server Error",
  });
});

// Start Server
const run = async () => {
  try {
    await db.sequelize.sync();
    console.log("Connection to the database successful!");
    app.listen(process.env.PORT, () =>
      console.log(`server running on ${process.env.PORT}`)
    );
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
};
run();
