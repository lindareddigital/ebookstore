import apiManager from "src/pages/api/api";

export default async function handler(req , res) {
  try {
    const obj = req.body;
    const arr = req.body.category_id;

    function handle(obj) {
      if (!obj.hasOwnProperty("limit")) {
        obj.limit = 20;
      } else if (!obj.hasOwnProperty("page")) {
        obj.page = 1;
      } else if (!obj.hasOwnProperty("sort")) {
        obj.sort = ["-date_created"];
      }
      return obj;
    }

    handle(obj);

    console.log("objobj", obj);


    if (
      req.body.category_id &&
      Array.isArray(req.body.category_id) &&
      req.body.category_id.length > 0
    ) {
      const result = await apiManager.getProductByCategory(arr, obj);

      return res.status(200).json({ message: "category data is valid", result });
    } else {
      return res.status(400).json({ error: "category data is empty or invalid" });
    }
  } catch (err) {
    console.log("category", err);
  }
}
