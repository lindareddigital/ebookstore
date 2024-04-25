import apiManager from "src/pages/api/api";

export default async function handler(req, res) {
  try {
    console.log("5566", req.body.id,req.body.token);

    if (req.body.id === "") {
      return res
        .status(400)
        .json({ error: "Invalid user id provided" });
    }

    const id = req.body.id;
    const token = req.body.token;
    const result = await apiManager.getUserBookMark(id,token);

    res.status(200).json({ result });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: err });
  }
}
