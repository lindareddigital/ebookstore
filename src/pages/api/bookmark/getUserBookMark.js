import apiManager from "src/pages/api/api";

export default async function handler(req, res) {
  try {
    console.log("5566", req.body.id);

    if (req.body.id = "") {
      return res
        .status(400)
        .json({ error: "Invalid user id provided" });
    }

    const id = req.body.id;
    const result = await apiManager.getUserBookMark(id);

    res.status(200).json({ result });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
