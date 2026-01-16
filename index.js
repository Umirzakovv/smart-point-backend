import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const HOST = process.env.APP_HOST || "localhost";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

/* Telegramga yuborish */
async function sendToTelegram(text) {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text,
      parse_mode: "HTML",
    }),
  });
}



/* API */
app.post("/send-order", async (req, res) => {
  const { name, phone, productName } = req.body;

  if (!name || !phone || !productName) {
    return res.status(400).json({ message: "Data yetarli emas" });
  }

  const message = `
📦 <b>Yangi buyurtma</b>

👤 Ism: <b>${name}</b>
📞 Telefon: <b>${phone}</b>
🛒 Mahsulot: <b>${productName}</b>
`;

  await sendToTelegram(message);
  res.json({ success: true });
});

app.get("/", (req, res) => {
  res.send("✅ Smart Point Backend is running!");
});

/* Server start */
app.listen(PORT, HOST, () => {
  console.log(`🚀 Server running on http://${HOST}:${PORT}`);
});
