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
  "rossjillian/controlnet:795433b19458d0f4fa172a7ccf93178d2adb1cb8ab2ad6c8fdc33fdbcd49f477",
  {
    input: {
      image: imageUrl,
      prompt: `high detail render of a ${angle} view of a car, professional 3D modeled, photorealistic`,
      width: 768,
      height: 768
    }
  }
);

    res.status(200).json({ renderUrl: output });
  } catch (error) {
    console.error("Rendering error:", error);
    res.status(500).json({ error: error?.message || "Unknown error" });
  }
}
