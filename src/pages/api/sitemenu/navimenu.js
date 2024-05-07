import apiManager from "src/pages/api/api";

export default async function handler(req, res) {
  try {
    const result = await apiManager.getNaviMenu();
    const keyword = await apiManager.getSearchKeyWord();

    res.status(200).json({ result, keyword });
  } catch (err) {
    console.log("errerr", err);
  }
}
