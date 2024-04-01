import apiManager from "src/pages/api/api";

export default async function handler(req, res) {
  try {
    console.log("getProductBySeries", req.body.series_tags);

    const { series_tags, limit, page, sort } = req.body;
    const obj = {
      limit: limit || 20,
      page: page || 1,
      sort: sort || ["-date_created"]
    };

    const isValidSeries = Array.isArray(series_tags) && series_tags.length > 0;

    console.log("1616", series_tags, obj, req.body);
    

    if (isValidSeries) {
      const result = await apiManager.getProductBySeries(series_tags, obj);
      return res.status(200).json({ result });
    } else {
      return res.status(400).json({ error: "Series data is empty or invalid" });
    }
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}


