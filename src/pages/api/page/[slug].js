import apiManager from "src/pages/api/api";


export default async function handler(req, res) {
  try {

    const { slug } = req.query;
    console.log('7788',slug);
    

    if (slug === "home" || slug == "terms") {
      // const result = await apiManager.getProductBySeries(arr);
      const result = await apiManager.getPageBySlug(slug);

      return res.status(200).json({ message: "Slug is valid", result });
    } else {
      return res.status(400).json({ error: "Slug is empty or invalid" });
    }

  } catch (err) {
    console.log('errerr',err);

  }
}
