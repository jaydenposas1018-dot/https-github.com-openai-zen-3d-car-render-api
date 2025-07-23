import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { imageUrl, angle } = req.body;

  if (!imageUrl || !angle) {
    return res.status(400).json({ error: "imageUrl and angle are required" });
  }

  try {
    const output = await replicate.run(
      "cjwbw/controlnet@db21e45ee2434d2b5e97a7d1c94b9f682b145f6c978b6b1e46f04ce3f5c1ff2c"
      {
        input: {
          image: imageUrl,
          prompt: `high detail render of a ${angle} view of a car, professional 3D modeled, photorealistic`,
          width: 768,
          height: 768,
        },
      }
    );

    res.status(200).json({ renderUrl: output });
  } catch (error) {
    console.error("Rendering error:", error?.message || error);
    res.status(500).json({
      error:
        error?.message ||
        "Unknown error. Make sure your REPLICATE_API_TOKEN is valid and the model is accessible.",
    });
  }
}
