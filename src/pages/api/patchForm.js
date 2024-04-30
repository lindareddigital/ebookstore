import apiManager from "src/pages/api/api";

export default async function handler(req, res) {
  try {
    const token = req.body.token;
    const id = req.body.id;
    const transformedArray = req.body.transformedArray;

    const result = await apiManager.patchForm(
      token,
      id,
      transformedArray
    );

 
    res.status(200).json({ result:result });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}


