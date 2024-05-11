import apiManager from "src/pages/api/api";
const TOKEN = process.env.NEXT_PUBLIC_TOKEN;

export default async function handler(req, res) {
  try {
    const { email, password } = req.body;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log("token", data.data.access_token);


    res.status(200).json({ data: data.data });
  } catch (error) {
    if (error.type === "CredentialsSignin") {
      res.status(401).json({ error: "401 Invalid credentials." });
    } else {
      res.status(500).json({ error: "500" });
    }
  }
}
