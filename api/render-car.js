export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { imageUrl, angle } = req.body;

  if (!imageUrl || !angle) {
    return res.status(400).json({ error: "imageUrl and angle are required" });
  }

  // Placeholder response - no actual rendering happening now
  const renderLinks = {
    front: null,
    side: null,
    back: null
  };

  res.status(200).json({
    message: `Render request received for ${angle} view.`,
    renderUrls: renderLinks
  });
}
