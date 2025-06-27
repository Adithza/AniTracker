import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello")
})

app.post("/anilist-banner", async (req, res) => {
    const { malId } = req.body;
  
    const query = `
      query {
        Media(idMal: ${malId}, type: ANIME) {
          bannerImage
        }
      }
    `;
  
    try {
      const response = await fetch("https://graphql.anilist.co", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
  
      const data = await response.json();
      const bannerImage = data?.data?.Media?.bannerImage;
  
      // Console log the bannerImage
      console.log("Banner Image:", bannerImage);
  
      res.json({ bannerImage });
    } catch (err) {
      console.error("Error fetching banner from Anilist:", err);
      res.status(500).json({ error: "Failed to fetch banner from Anilist" });
    }
  });

app.listen(PORT, () => {
  console.log(`Proxy running at http://localhost:${PORT}`);
});
