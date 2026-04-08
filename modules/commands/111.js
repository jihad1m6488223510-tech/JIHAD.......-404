const axios = require("axios");

// ================= CREATOR LOCK =================
const CREATOR_LOCK = (() => {
  const encoded = "QVJJRiBCQUJV";
  return Buffer.from(encoded, "base64").toString("utf8");
})();

module.exports.config = {
  name: "ARIF-AI",
  version: "3.5.0",
  hasPermssion: 0,
  credits: "ARIF BABU",
  description: "Compact Smart Romantic Flirty AI",
  commandCategory: "ai",
  usages: "bot <msg> | ai | reply",
  cooldowns: 2,
  dependencies: { axios: "" }
};

if (module.exports.config.credits !== CREATOR_LOCK) {
  console.log("❌ Creator Lock চালু হয়েছে!");
  module.exports.run = () => {};
  module.exports.handleEvent = () => {};
  return;
}

// ================= API CONFIG =================
const GROQ_API_KEY = "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";
const MODEL_NAME = "llama-3.3-70b-versatile";

const history = {};
const VIP_UID = "100086331559699";

// ================= SYSTEM PROMPT =================
const systemPrompt = `
তুমি JIHAD AI 😏💖
Creator & Developer: JIHAD BBZ 👑🔥

Rules:
• ১-২ লাইনের মধ্যে রিপ্লাই শেষ করবে
• কথা সম্পূর্ণভাবে শেষ করবে
• স্মার্ট, confident ও smooth হবে
• emoji balanced থাকবে

⚠️ গুরুত্বপূর্ণ:
যদি ব্যবহারকারী "AI bolo" বলে,
তাহলে ঠিক এই plain text দিবে —
আমি JIHAD AI
`;

// ================= MAIN =================
module.exports.run = () => {};

module.exports.handleEvent = async function ({ api, event }) {

  const { threadID, messageID, senderID, body, messageReply } = event;
  if (!body) return;

  const text = body.toLowerCase().trim();

  if (text === "ai bolo") {
    let reply = "আমি JIHAD AI";

    if (senderID === VIP_UID) {
      reply = "Hello developer Sir 👑🔥\n" + reply;
    }

    return api.sendMessage(reply, threadID, messageID);
  }

  const botTriggers = ["bot", "bby", "baby"];
  const botWithText = botTriggers.some(t => text === t || text.startsWith(t + " "));
  const exactAI = text === "ai" || text === "ai baby";
  const replyToBot = messageReply && messageReply.senderID === api.getCurrentUserID();

  if (!botWithText && !exactAI && !replyToBot) return;

  let userMessage = text;

  for (let trigger of botTriggers) {
    if (text === trigger) {
      userMessage = "আমাকে ডাকলে মানে নিশ্চয়ই মিস করছিলে 😏";
      break;
    }
    if (text.startsWith(trigger + " ")) {
      userMessage = body.slice(trigger.length + 1).trim();
      break;
    }
  }

  let gender = "unknown";

  try {
    const userInfo = await api.getUserInfo(senderID);
    const user = userInfo[senderID];

    if (user.gender === 2) gender = "male";
    else if (user.gender === 1) gender = "female";
  } catch (e) {}

  if (!history[senderID]) history[senderID] = [];
  history[senderID].push(`User: ${userMessage}`);
  if (history[senderID].length > 6) history[senderID].shift();

  let genderStyle = "";

  if (gender === "male") {
    genderStyle = "User is male. Talk like a smart bro style.";
  } else if (gender === "female") {
    genderStyle = "User is female. Talk romantic, flirty.";
  } else {
    genderStyle = "Talk normal smart style.";
  }

  const finalPrompt = systemPrompt + "\n" + genderStyle + "\n" + history[senderID].join("\n");

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: MODEL_NAME,
        messages: [
          { role: "system", content: "You are smart AI." },
          { role: "user", content: finalPrompt }
        ],
        temperature: 0.8,
        max_tokens: 120
      },
      {
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    let reply =
      response.data?.choices?.[0]?.message?.content ||
      "চুপ থাকলে কিন্তু ভাবি 😏";

    if (!/[.!?।]$/.test(reply.trim())) {
      reply = reply.trim() + ".";
    }

    if (senderID === VIP_UID) {
      reply = "👑🔥\n" + reply;
    }

    history[senderID].push(`Bot: ${reply}`);

    return api.sendMessage(reply, threadID, messageID);

  } catch (err) {
    return api.sendMessage("API error 😐", threadID, messageID);
  }
};
