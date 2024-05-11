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
    const token = req.body.token;

    console.log("deleteBookMark", user,product,id);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/items/user_bookmark/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ user: user, product: product }),
      }
    );

    if (response.status === 200) {
      const result = await response.json();
      res.status(200).json({ result });
    }else if (response.status === 204) {
      res.status(204).end(); // No need to set response body for HTTP 204
    } else {
      // Handle other status codes, such as 404, 401, etc.
      console.error("Error:", response.status);
      res
        .status(response.status)
        .json({ error: "Error occurred while deleting bookmark" });
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
