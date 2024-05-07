import apiManager from "src/pages/api/api";

export default async function handler(req, res) {
  try {
    
    const mode = req.query.mode;
    const token = req.query.token;
    const challenge = req.query.challenge;

    if (mode && token) {
      if (mode === "subscribe" && token === config.verifyToken) {
        console.log("WEBHOOK_VERIFIED");
        res.status(200).send(challenge);
      } else {
        res.sendStatus(403);
      }
    }

    res.status(200).json({ challenge });
  } catch (err) {
    console.log("errerr", err);
  }
}
