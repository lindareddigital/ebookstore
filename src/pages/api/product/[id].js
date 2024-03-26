import apiManager from "src/pages/api/api";

export default async function handler(req, res) {
  const id = req.query.id;
  console.log("sidid", req.query.id,id);

  try {
    const detail = await apiManager.getProductDetail();
    res.status(200).json({ detail });
  } catch (err) {
    console.log("errerr", err);
    res.status(500).json({ error: "Failed to load data" });

  }
}
