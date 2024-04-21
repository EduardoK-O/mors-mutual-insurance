const express = require('express');
const path = require("path");
const cors = require('cors');

const usuarioRolesRouter = require("./routes/usuarioRolesRoutes");
const usuarioRouter = require("./routes/UsuarioRoutes");
const aseguradoraRouter = require("./routes/AseguradoraRoutes");
const conceptoRouter = require("./routes/ConceptoRoutes");
const aseguradoRouter = require("./routes/AseguradoRoutes");
const marcaRouter = require("./routes/MarcaRoutes");
const ModeloRouter = require("./routes/ModeloRoutes");

//Swagger
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerSpec = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Mors-Mutual-Insurance API",
            version: "1.0.0"
        },
        servers: [
            {
                url: "http://localhost:4000"
            }
        ]
    },
    apis: [`${path.join(__dirname, "./routes/*.js")}`]
}

//configuracion 
const app = express();
app.listen(4000, () => {
    console.log("Server listening on port 4000");
});


//Middlewares
app.use(cors({
    origin: ["http://127.0.0.1:4200"]
}));
app.use(express.json());
app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)));

//rutas
app.use("/api/usuario-roles", usuarioRolesRouter);
app.use("/api/usuarios", usuarioRouter);
app.use("/api/aseguradoras", aseguradoraRouter);
app.use("/api/conceptos", conceptoRouter);
app.use("/api/asegurados", aseguradoRouter);
app.use("/api/marcas", marcaRouter);
app.use("/api/modelos", ModeloRouter);