import apiManager from "src/pages/api/api";
import { Directus } from "@directus/sdk";

export default async function handler(req, res) {
  try {
    const publisher_slug = req.body.publisher_slug;
    const token = req.body.token;
   
    const directus = new Directus("https://directus-cms.vicosys.com.hk", {
      auth: { staticToken: token },
    });

    
    res.status(200).json({ result });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}


