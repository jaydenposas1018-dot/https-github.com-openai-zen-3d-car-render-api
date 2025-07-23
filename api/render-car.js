import Replicate from "replicate";

export default async function handler(req, res) {
  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });

  const { imageUrl, angle } = req.body;
  if (!imageUrl || !angle) {
    return res.status(400).json({ error: "imageUrl and angle are required" });
  }

  try {
    const output = await replicate.run(
      "cjwbw/controlnet",
      {
        input: {
          image: imageUrl,
          prompt: `3D render style of a ${angle} view of a car. Match vehicle details exactly.`,
          width: 768,
          height: 768
        }
      }
    );

    res.status(200).json({ renderUrl: output });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
