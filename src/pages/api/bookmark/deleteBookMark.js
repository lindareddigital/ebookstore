import apiManager from "src/pages/api/api";

export default async function handler(req, res) {
  try {
    if (!req.body.user || !req.body.product) {
      return res
        .status(400)
        .json({ error: "Invalid user && product data provided" });
    }

    const user = req.body.user;
    const product = req.body.product;
    const id = req.body.id;

    console.log("deleteBookMark", user,product,id);

    const response = await fetch(
      `https://directus-cms.vicosys.com.hk/items/user_bookmark/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: user, product: product }),
      }
    );

    const result = await response.json();

    res.status(200).json({ result });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
