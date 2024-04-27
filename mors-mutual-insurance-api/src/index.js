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
const VehiculoRouter = require("./routes/VehiculoRoutes");
const SeguroRoutes = require('./routes/SeguroRoutes');
const CotizacionRoutes = require('./routes/CotizacionRoutes');
const ArchivosRoutes = require('./routes/ArchivoRoutes');

//Swagger
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const { validateToken } = require('./controller/UsuarioController');
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
/*app.use(cors({
    origin: ["http://127.0.0.1:4200", "http://127.0.0.1:4000"]
}));*/
app.use(express.json());
app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)));
app.use(cors());

//rutas
app.use("/api/usuario-roles", validateToken, usuarioRolesRouter);
app.use("/api/usuarios", usuarioRouter);
app.use("/api/aseguradoras", validateToken, aseguradoraRouter);
app.use("/api/conceptos", validateToken, conceptoRouter);
app.use("/api/asegurados", validateToken, aseguradoRouter);
app.use("/api/marcas", validateToken, marcaRouter);
app.use("/api/modelos", validateToken, ModeloRouter);
app.use("/api/vehiculos", validateToken, VehiculoRouter);
app.use("/api/seguros", validateToken, SeguroRoutes);
app.use("/api/cotizaciones",validateToken, CotizacionRoutes);
app.use("/api/archivos", validateToken, ArchivosRoutes);