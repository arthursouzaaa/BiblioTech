const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

require("./src/routes/authRouter")(app);
require("./src/routes/emprestimosRouter")(app);
require("./src/routes/livrosRouter")(app);
require("./src/routes/usuariosRouter")(app);

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = { app };
