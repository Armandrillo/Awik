var cors = require("cors");

const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;

app.use(
  session({ secret: "secret-key", resave: false, saveUninitialized: true })
);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

const accountRoutes = require("./src/routers/account.routes");
app.use("/api/account", accountRoutes);

const vehicleRoutes = require("./src/routers/vehicle.routes");
app.use("/api/cars", vehicleRoutes);

const driverRoutes = require("./src/routers/driver.routes");
app.use("/api/driver", driverRoutes);

const employeeRoutes = require("./src/routers/employee.routes");
app.use("/api/employees", employeeRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
