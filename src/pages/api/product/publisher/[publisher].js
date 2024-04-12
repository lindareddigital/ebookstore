import apiManager from "src/pages/api/api";

export default async function handler(req, res) {
  try {
    console.log("getProductByPublisher", req.body);
    console.log("publisher", req.body.publisher);


    const limit = req.body.limit || 15;
    const page = req.body.page || 1;
    const sort = req.body.sort || ["-date_created"];
    const publisher = req.body.publisher;


    const result = await apiManager.getProductByPublisher(publisher,page,limit,sort);

    res.status(200).json({ result });
  } catch (err) {
    console.log("errerr", err);
  }
}
