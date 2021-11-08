const fs = require("fs");
const path = require("path");

const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { CLIENT_ID, GUILD_ID, CLIENT_TOKEN } = require("../config.json");

const commandDirectory = path.resolve(__dirname, "./commands");

const commands = [];
const commandFiles = fs
	.readdirSync(commandDirectory)
	.filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: "9" }).setToken(CLIENT_TOKEN);

rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
	body: commands,
})
	.then(() => console.log("Successfully registered application commands."))
	.catch(console.error);
