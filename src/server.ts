import express, { Express } from "express";
import router from "./routes";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const app: Express = express();
const port: number = 3000;

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Faltômetro",
      version: "1.0.0",
      description: "Faltômetro API",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development Server",
      },
    ],
  },
  apis: ["./src/routes.ts"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(router);
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
