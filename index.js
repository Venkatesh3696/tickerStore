const express = require("express");

const { tickerRoute } = require("./routes/ticker.route");

// Create Express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

try {
  // Start the Express server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
} catch (error) {
  console.log(error);
}

// Routes

app.use("/", tickerRoute);
