import apiManager from "src/pages/api/api";

export default async function handler(req, res) {
  const id = req.query.id;

  try {
    const detail = await apiManager.getProductDetail();

    const data = detail?.product?.find((item) => {
      return item.id === id;
    });

    const relatedBooks = detail?.product?.filter((item) => {
      return item.series === data.series;
    });

    res.status(200).json({ data: data, relatedBooks });
  } catch (err) {
    res.status(500).json({ error: "Failed to load data" });

  }
}
