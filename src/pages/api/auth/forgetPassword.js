import apiManager from "src/pages/api/api";

export default async function handler(req, res) {
  try {
    const { email } = req.body;

    const client = createDirectus(`${process.env.NEXT_PUBLIC_API_URL}`)
      .with(rest())
      .with(staticToken(process.env.NEXT_PUBLIC_TOKEN));

    const response = await client.request(
      passwordRequest(
        email,
        `${process.env.NEXT_PUBLIC_API_URL}/reset-password`
      )
    );
    console.log(response);

    console.log(
      "An email with a password reset link has been sent to your email!"
    );


    const data = await response.json();


    res.status(200).json({ data: data });
  } catch (error) {
    if (error.type === "CredentialsSignin") {
      res.status(401).json({ error: "Invalid credentials." });
    } else {
      res.status(500).json({ error: "An error occurred, please try again!" });
    }
  }
}
