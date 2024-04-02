import apiManager from "src/pages/api/api";

export default async function handler(req, res) {
  try {
    //console.log("category", req.body.category_id);

    // Check if req.body.category_id is not null, not empty, and is an array
    if (!req.body.category_id || !Array.isArray(req.body.category_id) || req.body.category_id.length === 0) {
      return res.status(400).json({ error: "Invalid category_id data provided" });
    }

    // Check if req.body.sort_by is an array, if provided
    if (req.body.sort_by && !Array.isArray(req.body.sort_by)) {
      return res.status(400).json({ error: "sort_by must be an array" });
    }

    // Set default values for sort_by, limit, and page if they are not provide
    const publisher_slug = req.body.publisher_slug;
    const category_id = req.body.category_id;
    const sort_by = req.body.sort_by || ["-date_created"];
    const limit = req.body.page_limit || 5;
    const page = req.body.page || 1;

    const result = await apiManager.getProductByCategory(publisher_slug, category_id, sort_by, page,limit );

    res.status(200).json({ result });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
