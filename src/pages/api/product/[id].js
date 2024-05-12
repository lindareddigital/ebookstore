import apiManager from "src/pages/api/api";

export default async function handler(req, res) {
  const id = req.query.id;

  try {
    const data = await apiManager.getProductDetail(id);

    res.status(200).json({ data: data });
  } catch (error) {
    console.error("Error fetching product detail:", error);

    if (error.response) {
      const status = error.response.status;
      const message = error.response.data.message;
      console.error("API Error:", status, message);

      res.status(status).json({ error: message });
    } else {
      console.error("Internal Server Error:", error);
      res.status(500).json({ error: "Failed to load data" });
    }
  }
}
