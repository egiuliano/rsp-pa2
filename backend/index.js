const { PORT } = require("./utils/config");

require("./db/mongo");

const express = require("express");
const cors = require("cors");
const app = express();

const { handlerNotFound, handlerError, logger } = require("./utils/middleware");
const { usersRouter } = require("./routes/usersRouter");
const { teamsRouter } = require("./routes/teamsRouter");

app.use(express.json());

app.use(cors());

/*app.get('/', (req, res) => {
    res.send("<h1>NBA Server</h1>");
});*/

app.use("/api/users", usersRouter);

app.use("/api/teams", teamsRouter);

app.use(handlerNotFound);

app.use(handlerError);

app.use(logger);

app.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}/`);
});