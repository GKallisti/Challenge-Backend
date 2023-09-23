const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

//metadata info

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Challenge API",
            version: "1.0.0",
            description: "Challenge API",
        },
        servers: [
            {
                url: "https://pm-backend-challenge.onrender.com",
            },
        ],
    },
    apis: ["./src/routes/*.js"],
}

const specs = swaggerJsdoc(options);

//setup
const swaggerDocs = (app, port) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
    app.get("/api-docs.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(specs);
    })
}
console.log("Documentacion Lista en https://pm-backend-challenge.onrender.com/api-docs !");

module.exports = {
    swaggerDocs
}