import apiManager from "src/pages/api/api";

export default async function handler(req, res) {
  try {
    console.log("getProductByPublisher", req.query);
    console.log("publisher", req.query.publisher);


    const limit = req.query.limit || 15;
    const page = req.query.page || 1;
    const sort = req.query.sort || ["-date_created"];
    const publisher = req.query.publisher;



    // if (
    //   req.query.publisher != "polis_press" &&
    //   req.query.publisher != "seashore"
    // ) {
    //   return res.status(400).json({ error: "Invalid publisher provided" });
    // }

    const result = await apiManager.getProductByPublisher(publisher,page,limit,sort);

    res.status(200).json({ result });
  } catch (err) {
    console.log("errerr", err);
  }
}
