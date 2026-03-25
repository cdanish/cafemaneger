import swaggerAutogen from "swagger-autogen";

const outputFile = "./swagger-output.json";
const endpointsFiles = ["../server.js"]; // must point to server.js

const doc = {
  openapi: "3.0.0",
  info: {
    title: "Cyber Cafe APIs",
    description: "Auto-generated Swagger documentation",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:3000",
    },
  ],
};

swaggerAutogen({ openapi: "3.0.0" })(
  outputFile,
  endpointsFiles,
  doc
).then(() => {
  console.log("✅ Swagger documentation generated successfully");
});