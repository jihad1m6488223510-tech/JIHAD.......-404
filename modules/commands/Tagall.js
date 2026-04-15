module.exports = {
  config: {
    name: "tag",
    aliases: ["all", "everyone"],
    version: "1.0",
    author: "Jihad",
    countDown: 3,
    role: 0,
    shortDescription: "Tag members",
    longDescription: "Tag by reply, name or tag all members",
    category: "group",
    guide: {
      en: "tag [name/msg]\ntag all [msg]\nReply + tag [msg]"
    }
  },

  onStart: async function ({ api, event, args, Threads, Users }) {
    const { threadID, messageID, messageReply } = event;

    try {
      const threadInfo = await api.getThreadInfo(threadID);

      const members = threadInfo.participantIDs.map(id => ({
        id,
        name: threadInfo.userInfo.find(u => u.id == id)?.name || "User"
      }));

      let tagUsers = [];
      let text = "";

      // 👉 Reply করলে
      if (messageReply) {
        const uid = messageReply.senderID;
        const name = await Users.getNameUser(uid);
        tagUsers.push({ id: uid, name });
        text = args.join(" ");
      }

      // 👉 Tag all
      else if (args[0] && ["all", "everyone"].includes(args[0].toLowerCase())) {
        tagUsers = members;
        text = args.slice(1).join(" ");
      }

      // 👉 Name search
      else {
        if (!args[0]) {
          return api.sendMessage(
            "⚠️ Name / reply / tag all",
            threadID,
            messageID
          );
        }

        const search = args[0].toLowerCase();
        text = args.slice(1).join(" ");

        tagUsers = members.filter(u =>
          u.name.toLowerCase().includes(search)
        );

        if (tagUsers.length === 0) {
          return api.sendMessage("❌ User not found", threadID, messageID);
        }
      }

      const mentions = tagUsers.map(u => ({
        tag: u.name,
        id: u.id
      }));

      const names = tagUsers.map(u => u.name).join(", ");
      const body = text ? `${names}\n${text}` : names;

      api.sendMessage(
        { body, mentions },
        threadID,
        messageReply ? messageReply.messageID : messageID
      );

    } catch (e) {
      api.sendMessage("❌ Error: " + e.message, threadID, messageID);
    }
  }
};
