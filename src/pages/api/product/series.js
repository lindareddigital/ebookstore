import apiManager from "src/pages/api/api";

export default async function handler(req, res) {
  try {
    const publisher_slug = req.body.publisher_slug;
    const series_tags = req.body.series_tags || [];
    const limit = req.body.page_limit || 5;
    const page = req.body.page || 1;
    const sort = req.body.sort || ["-date_created"];

    console.log(
      "getProductBySeries",
      publisher_slug,
      series_tags,
      limit,
      page,
      sort
    );

    if (Array.isArray(series_tags) && series_tags.length === 0) {
      return res.status(400).json({ error: "Series data is empty or invalid" });
    }
    
    if (!Array.isArray(series_tags) && series_tags.length > 0) {
      return res.status(400).json({ error: "series_tags invalid" });
    }


    const result = await apiManager.getProductBySeries(
      publisher_slug,
      series_tags,
      limit,
      page,
      sort
    );
    res.status(200).json({ result });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}


