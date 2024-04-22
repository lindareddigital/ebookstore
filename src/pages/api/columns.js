import apiManager from "src/pages/api/api";

export default async function handler(req, res) {
  try {
    const category = req.body.category || [];
    const limit = req.body.page_limit || 5;
    const page = req.body.page || 1;

    const data = await apiManager.getColumns(category, limit, page);

    const menu = await apiManager.getColumnsMenu();


    // console.log("getPosts", data);
    
    res.status(200).json({ data,menu });
  } catch (err) {
    console.log("errerr", err);
    res.status(500).json({ error: "Failed to load data" });

  }
}
