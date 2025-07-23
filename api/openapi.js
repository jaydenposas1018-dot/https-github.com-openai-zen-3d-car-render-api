export default function handler(req, res) {
  res.status(200).json({
    openapi: "3.0.1",
    info: {
      title: "Car Render API",
      version: "1.0.0"
    },
    servers: [
      {
        url: "https://car-render-api.vercel.app"
      }
    ],
    paths: {
      "/api/render-car": {
        post: {
          operationId: "renderCar",
          summary: "Render a car image",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    imageUrl: { type: "string" },
                    angle: { type: "string" }
                  },
                  required: ["imageUrl", "angle"]
                }
              }
            }
          },
          responses: {
            "200": {
              description: "Success",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      renderUrl: { type: "string" }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  });
}
