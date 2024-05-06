import apiManager from "src/pages/api/api";

export default async function handler(req, res) {
  try {
    const input = req.body.input;
    const limit = req.body.page_limit || 5;
    const page = req.body.page || 1;

    console.log("Search", page, input);
    
    

    const books = await apiManager.getSearchBooks(input, limit, page);
    const posts = await apiManager.getSearchPosts(input, limit, page);


    res.status(200).json({ books,posts });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}


