import apiManager from "src/pages/api/api";


export default async function handler(req, res) {
  try {

      let { slug } = req.query;
      if (!slug) {
        slug = "home";
      }
      const result = await apiManager.getPageBySlug(slug);

      return res.status(200).json({ result });

  } catch (err) {
    console.log('page handler',err);

  }
}
