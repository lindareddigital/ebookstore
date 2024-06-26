import apiManager from "src/pages/api/api";

export default async function handler(req, res) {
  try {
    //console.log("category", req.body.category_id);

    if (!req.body.user || !req.body.product) {
      return res
        .status(400)
        .json({ error: "Invalid user && product data provided" });
    }

    const user = req.body.user;
    const product = req.body.product;
    const token = req.body.token;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/items/user_bookmark`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
