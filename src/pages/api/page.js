import apiManager from "src/pages/api/api";


export default async function handler(req, res) {
  try {
    const data = await apiManager.getPageBySlug();

    res.status(200).json({ data });
  } catch (err) {
    console.log('errerr',err);
  }
}
