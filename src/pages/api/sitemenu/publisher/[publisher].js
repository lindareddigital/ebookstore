import apiManager from "src/pages/api/api";

export default async function handler(req, res) {
  try {
    // api/sitemenu/publisher/[publisher]

    // console.log("getSideMenuByPublisher", req.query.channel);

    // const channel = req.query.channel || ;

    //  if (
    //    req.query.publisher != "polis_press" &&
    //    req.query.publisher != "seashore" &&
    //    req.query.publisher != "ichiban"
    //  ) {
    //    return res.status(400).json({ error: "Invalid publisher provided" });
    //  }

    const result = await apiManager.getSideMenuByPublisher(
      req.query.publisher);
    // console.log("resultresultresult", result);

    return res.status(200).json({ result });
  } catch (err) {
    console.log("errerr", err);
  }
}

