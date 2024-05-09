import apiManager from "src/pages/api/api";

export default async function handler(req, res) {
  try {
    const id = req.query.id;
    const data = await apiManager.getPostByID(id);

    // console.log('888',id);
    

    res.status(200).json({ data });
  } catch (err) {
    console.log("errerr", err);
    res.status(500).json({ error: "Failed to load data" });
  }
}
