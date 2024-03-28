import apiManager from "src/pages/api/api";

export default async function handler(req, res) {
  try {
    console.log("category", req.body.category_id);

    // Check if req.body.series is empty or not an array
    if (!req.body.series || !Array.isArray(req.body.series) || req.body.series.length === 0) {
      return res.status(400).json({ error: "Invalid series data provided" });
    }

    const arr = req.body.series;

    const result = await apiManager.getProductBySeries(arr);

    res.status(200).json({ result });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

