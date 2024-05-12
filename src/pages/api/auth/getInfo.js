const TOKEN = process.env.NEXT_PUBLIC_TOKEN;

export default async function handler(req, res) {
  try {
    const { email } = req.body;

    console.log("email", email);

    // Fetch user data from the API using the provided email
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );

    if (response.ok) {
      const result = await response.json();
      res.status(200).json({ result });
    } else {
      const error = new Error(
        `Failed to fetch user data: ${response.status} ${response.statusText}`
      );
      error.type = "APIError";
      throw error;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Failed to fetch user data" });

    if (error.type === "APIError") {

      res.status(400).json({ error: error.message });
    } else {

      console.error("Internal Server Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
