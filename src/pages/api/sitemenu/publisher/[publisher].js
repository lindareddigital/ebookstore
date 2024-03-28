import apiManager from "src/pages/api/api";

export default async function handler(req, res) {
  try {
    console.log("getSideMenuByPublisher", req.query);
    console.log("publisher", req.query.publisher);

     if (
       req.query.publisher != "polis_press" &&
       req.query.publisher != "seashore"
     ) {
       return res.status(400).json({ error: "Invalid publisher provided" });
     }
    
    const result = await apiManager.getSideMenuByPublisher(req.query.publisher);

    res.status(200).json({ result });
  } catch (err) {
    console.log("errerr", err);
  }
}
