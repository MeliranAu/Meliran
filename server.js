const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Routes
const homeRoutes = require("./routes/homeRoutes");
const eventRoutes = require("./routes/eventRoutes");

app.use("/", homeRoutes);
app.use("/events", eventRoutes);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
