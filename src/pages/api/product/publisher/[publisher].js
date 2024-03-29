import apiManager from "src/pages/api/api";

export default async function handler(req, res) {
  try {
    console.log("getProductByPublisher", req.query);
    console.log("publisher", req.query.publisher);

    const { limit, page, sort, publisher } = req.query;

    const obj = {
      limit: limit || 10,
      page: page || 1,
    };

    // if (
    //   req.query.publisher != "polis_press" &&
    //   req.query.publisher != "seashore"
    // ) {
    //   return res.status(400).json({ error: "Invalid publisher provided" });
    // }

    const result = await apiManager.getProductByPublisher(
      req.query.publisher,
      obj.page,
      obj.limit
    );

    res.status(200).json({ result });
  } catch (err) {
    console.log("errerr", err);
  }
}
