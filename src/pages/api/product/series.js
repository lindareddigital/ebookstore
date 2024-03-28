import apiManager from "src/pages/api/api";

export default async function handler(req, res) {
  try {

    console.log("getProductBySeries", req.body.series_tags);

    const obj = req.body;
    console.log("objobj", obj);

    function handle(obj) {
      if (!obj.hasOwnProperty("limit")) {
        obj.limit = 20;
      } else if (!obj.hasOwnProperty("page")) {
        obj.page = 1;
      } else if (!obj.hasOwnProperty("sort")) {
        obj.sort = ["-date_created"];
      } return obj;
    }

    handle(obj)
    
    const arr = req.body.series_tags;

    if (
      req.body.series_tags &&
      Array.isArray(req.body.series_tags) &&
      req.body.series_tags.length > 0
    ) {

      const result = await apiManager.getProductBySeries(arr,obj);

      return res.status(200).json({ message: "Series data is valid", result });
    } else {
      return res.status(400).json({ error: "Series data is empty or invalid" });
    }

  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

