import apiManager from "src/pages/api/api";

export default async function handler(req , res) {
  try {
    // const result = await apiManager.getProductByCategory(req, res);
    // console.log("11result", result);
      console.log("category", req.body.category_id);
      
      res.status(200).json({ category_id: req.body.category_id });
  } catch (err) {
    console.log("category", err);
  }
}
