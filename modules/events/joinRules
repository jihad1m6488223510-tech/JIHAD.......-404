module.exports.config = {
  name: "joinRulesEvent",
  eventType: ["log:subscribe"],
  version: "1.0.7",
  credits: "Jihad",
  description: "Welcome rules event for all groups with mention only"
};

module.exports.run = async ({ event, api }) => {

  // 🏷️ গ্রুপের নাম
  let groupName = "এই গ্রুপ";
  try {
    const threadInfo = await api.getThreadInfo(event.threadID);
    groupName = threadInfo.threadName || groupName;
  } catch (e) {}

  // 👥 নতুন মেম্বার
  const added = event.logMessageData?.addedParticipants || [];
  if (added.length === 0) return;

  // 🏷️ Mention data
  const mentions = [];
  const memberNames = added.map(u => {
    mentions.push({
      tag: `@${u.fullName}`,
      id: u.userFbId
    });
    return `@${u.fullName}`;
  }).join(", ");

  // 👑 যে এডমিন এড করেছে
  let adminName = "Admin";
  try {
    const adminInfo = await api.getUserInfo(event.author);
    adminName = adminInfo[event.author]?.name || adminName;
  } catch (e) {}

  const message =
`🎉💜✨ 𝑊𝑒𝑙𝑐𝑜𝑚𝑒 𝑇ℎ𝑒 𝐹𝑎𝑚𝑖𝑙𝑦 ✨💜🎉

💌💜 হ্যালো সবাই 💜😊  

আমাদের নতুন মেসেঞ্জার গ্রুপে তোমাদের স্বাগতম! 🥰💫  
এখানেই হবে হাসি-খুশি 😄🎈, গল্পগুজব 💬🌀  
আর একে অপরের সঙ্গে ভাগাভাগি করার অসীম আনন্দ! 🌈💖

#Welcome#ToOurGroup
#Welcome#NewMember
#Welcome#ToTheFamily
#Welcome#DearMember
━━━━━━━━━━━━━━━━━━━

🌸🤲 𝐴𝑠𝑠𝑎𝑙𝑎𝑚𝑢 𝐴𝑙𝑎𝑖𝑘𝑢𝑚 🤲🌸

🏷️ ⏤͟͟͞͞𝐺𝑟𝑜𝑢𝑝 𝑁𝑎𝑚𝑒 : ${groupName}

🤍✨ ⏤͟͟͞͞𝑁𝑒𝑤 𝐌𝐞𝐦𝐛𝐞𝐫  
➤ ${memberNames} 🎉🥰

👑 ⏤͟͟͞͞𝐀𝐝𝐝𝐞𝐝 𝐁𝐲 : ${adminName} 💼✨

━━━━━━━━━━━━━━━━━━━
📜✨ 𝐺𝑟𝑜𝑢𝑝 𝑅𝑢𝑙𝑒 💜🎀

[ ⑅𝄞💌≛⃝𝄟༺𝗟𝗢𝗩𝗘_𝗦𝗧𝗢𝗥𝗬༻≛⃝𝄟꧂ 𝗔𝗗𝗗𝗔 𝗕𝗢𝗫 ]

① সবার সাথে ভালো ব্যবহার করবেন 💜  
② গ্রুপের নাম ও প্রোফাইল চেঞ্জ করা যাবে না 🚫  
③ কোনো মেম্বারকে ইনবক্সে নক বা ফ্রেন্ড রিকুয়েস্ট দিলে সরাসরি রিমূব 🚫  
④ 🔞 ১৮+ কনটেন্ট সম্পূর্ণ নিষিদ্ধ 🚫  
⑤ 📵 ইনবক্সে নক দেওয়া যাবে না 🚫  
⑥ 💔 রিলেশন সমস্যা করলে দুজনকেই রিমুভ ⚠️  
⑦ ⏳ ৩ দিন এক্টিভ না থাকলে রিমুভ ⚠️  
⑧ 🧑‍💼 যে কোনো সমস্যা হলে এডমিনকে জানান ✅ 
⑨ 🎉 নতুন মেম্বার এলে সবাই ওয়েলকাম জানাবেন ✅  
⑩ 🛑 Text Off বলার পর টেক্সট দিলে কিক ❗

━━━━━━━━━━━━━━━━━━━
⚠️ শেষ কথা :

💔 প্রেম / প্রিরিতি নিয়ে সমস্যা করলে  
⛔ বিনা নোটিশে রিমুভ করা হবে 🚫

🙏 সবাই নিয়ম মেনে চলবেন আশা করি 🌸

👑 ⏤͟͟͟͟͞͞͞͞CEO JIHAD 🥱💼✨  
𝐿𝑜𝑣𝑒 𝐹𝑜𝑟𝑒𝑣𝑒𝑟 🫶💞

𝑻𝒉𝒂𝒏𝒌 𝑭𝒐𝒓 𝑼𝒔𝒊𝒏𝒈 ⏤͟͟͞͞𝐉𝐢𝐡𝐚𝐝 𝐂𝐡𝐚𝐭 𝐁𝐨𝐭`;

  return api.sendMessage(
    {
      body: message,
      mentions
    },
    event.threadID
  );
};
