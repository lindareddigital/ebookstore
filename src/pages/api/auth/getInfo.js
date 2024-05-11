import apiManager from "src/pages/api/api";
const TOKEN = process.env.NEXT_PUBLIC_TOKEN;

export default async function handler(req, res) {
  try {
    const { email } = req.body;

    console.log("email", email);
    

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    const result = await response.json();

    // console.log(data.data);

    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error });

    if (error.type === "CredentialsSignin") {
      res.status(401).json({ error: "401 Invalid credentials." });
    } else {
    }
  }
}
