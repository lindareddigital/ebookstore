import apiManager from "src/pages/api/api";

export default async function handler(req, res) {
  try {

    console.log("publisher", req.query);
    
    const result = await apiManager.getSideMenu();

    res.status(200).json({ result });
  } catch (err) {
    console.log("errerr", err);
  }
}
