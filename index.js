const express = require("express");
const app = express();

app.listen("3000", function () {
  console.log("server is running");
});

app.get("/", function (req, res) {
  res.send(
    "The Bot is Online!"
  );
});

const Discord = require("discord.js");
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
client.login(process.env.token);
const fs = require("fs");
const prefix = "?";
client.commands = new Discord.Collection();
const commands = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));
for (file of commands) {
  const commandName = file.split(".")[0];
  const command = require(`./commands/${commandName}`);
  client.commands.set(commandName, command);
}
client.on("messageCreate", (message) => {
  if (message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commandName = args.shift();
    const command = client.commands.get(commandName);
    if (!command) return message.channel.send("Invalid Commmand");
      command.run(client, message, args);
  }
});
