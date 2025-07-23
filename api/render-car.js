export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { imageUrl, angle } = req.body;

  if (!imageUrl || !angle) {
    return res.status(400).json({ error: "imageUrl and angle are required" });
  }

  // Simulate response
  res.status(200).json({
    message: "Image received. A human will manually generate your 3D render.",
    imageUrl,
    angle,
  });
}
