const server = require('./src/app.js');
const { conn } = require('./src/db.js');
require("dotenv").config();
const { PORT } = process.env;
const { swaggerDocs } = require('./src/routes/swagger.js');

conn.sync({ alter: true }).then(() => {
  server.listen( PORT, () => {
    console.log(`%s listening at ${PORT}`); 
    swaggerDocs(server, PORT);
  });
});
