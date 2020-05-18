import express from "express";
import bodyParser from "body-parser";
import { db } from "./daos/db";
import { clientsRouter } from "./routers/clients-router";
import { maintHistoryRouter } from "./routers/maint_history-router";
import { printersRouter } from "./routers/printers-router";

const app = express();

const port = process.env.port || 3000;
app.set("port", port);

app.use(bodyParser.json());

app.use("/clients", clientsRouter);
app.use("/maint_history", maintHistoryRouter);
app.use("/printers", printersRouter);

process.on("unhandledRejection", () => {
  db.end().then(() => {
    console.log("Database pool closed");
  });
});

app.listen(port, () => {
  console.log(`Home app running at http://localhost:${port}`);
});
