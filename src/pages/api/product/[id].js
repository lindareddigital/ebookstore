import apiManager from "src/pages/api/api";

export default async function handler(req, res) {
  const id = req.query.id;

  try {
    const data = await apiManager.getProductDetail(id);

    res.status(200).json({ data: data });
  } catch (err) {
    res.status(500).json({ error: "Failed to load data" });

  }
}
