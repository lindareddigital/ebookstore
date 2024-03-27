import apiManager from "src/pages/api/api";

export default async function handler(req, res) {

  try {

    console.log("category", req.body.category_id);

    const arr = req.body.category_id



    const result = await apiManager.getProductBySeries(arr);

    

    res.status(200).json({ result });
  } catch (err) {
    console.log("series error ", err);
  }
}

