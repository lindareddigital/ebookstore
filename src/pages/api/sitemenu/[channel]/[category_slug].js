import apiManager from "src/pages/api/api";

export default async function handler(req, res) {
  try {
    console.log(
      "getSideMenu2",
      req.query.channel,
      req.query.category_slug
    );

    const result = await apiManager.getSideMenuByChannelAndSlug(
      req.query.channel,
      req.query.category_slug
    );


    res.status(200).json({ result });
  } catch (err) {
    console.log("errerr", err);
  }
}
