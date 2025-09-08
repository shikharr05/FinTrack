require("dotenv").config(); // used for environment variables   
const express = require("express");
const cors = require("cors"); // CORS = corss-origin resource sharing /// imports the CORS middleware (cors package) into your Node.js / Express app

// //By default, browsers block requests from one domain to another (for security).
// Example:
// Frontend: http://localhost:5173 (React/Vite dev server)
// Backend: http://localhost:5000 (Express API)
// If your React app tries to call your Express backend, the browser blocks it with a CORS error unless the backend explicitly says “this domain is allowed
//above lines tells the usage of cors read and u will understand.
const path = require("path");
const { connect } = require("http2");
const connectDB = require("./config/db.js");
const authRoutes = require("./routes/authRoutes.js");
const incomeRoutes = require("./routes/incomeRoutes.js")
const expenseRoutes = require("./routes/expenseRoutes.js")
const dashboardRoutes = require("./routes/dashboardRoutes.js");

const app = express();

//Middleware to handle CORS
app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

connectDB();//similar to how we used to connect DB just that code is written in config.

app.use("/api/v1/auth", authRoutes); // this tells express whenever requests starts with /api/v1/auth forward it to authRoutes
app.get("/api/test", (req, res) => {
  res
    .status(200)
    .json({ message: "Hello from the test API! The route is working." });
});
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})

module.exports = app;