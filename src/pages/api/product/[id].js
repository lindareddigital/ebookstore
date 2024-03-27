import apiManager from "src/pages/api/api";

export default async function handler(req, res) {
  const id = req.query.id;
  console.log("sidid",id);

  try {
    const detail = await apiManager.getProductDetail();

    console.log("itemitemitem", detail);

    const data = detail?.data.find((item) => {
      return item.id === id;
    });

    console.log("itemitemitem", data);
    
    res.status(200).json({ data });
  } catch (err) {
    console.log("errerr", err);
    res.status(500).json({ error: "Failed to load data" });

  }
}
