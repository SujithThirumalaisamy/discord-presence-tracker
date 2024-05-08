const { Client, Events, GatewayIntentBits } = require("discord.js");
require("dotenv").config();

const client = new Client({
  intents: [GatewayIntentBits.GuildPresences],
});
const token = process.env.TOKEN;
const friendId = process.env.FRIEND_ID;
const myId = process.env.MY_ID;

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});
client.on("presenceUpdate", async (oldPresence, newPresence) => {
  let member = newPresence.member;
  if (member.id === friendId) {
    if (oldPresence?.status) {
      if (oldPresence.status !== newPresence.status) {
        let me = await client.users.fetch(myId, false);
        switch (newPresence.status) {
          case "online":
            text =
              "Look who's here! Our special member has returned to light up our day!";
          case "dnd":
            text =
              "Oops, our special member is in stealth mode. No disturbances allowed!";
          case "idle":
            text =
              "Ah, our special member is taking a breather. Time for some chill vibes!";
          case "offline":
            text =
              "Oh, our special member must be off on a grand adventure in the digital world. We'll miss you!";
          default:
            me.send(
              "Looks like our special member has vanished into the digital ether. Time for a digital treasure hunt to find them!"
            );
        }
        me.send(text);
      }
    } else {
      let me = await client.users.fetch(myId, false);
      me.send("Oh no! Our special member was hidden");
    }
  }
});

client.login(token);
