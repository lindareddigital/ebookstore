import apiManager from "src/pages/api/api";

export default async function handler(req, res) {
  try {
    const result = await apiManager.getProductBySeries(req);

    res.status(200).json({ result });
  } catch (err) {
    console.log("errerr", err);
  }
}