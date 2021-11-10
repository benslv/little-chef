const { SlashCommandBuilder } = require("@discordjs/builders");

const data = new SlashCommandBuilder()
	.setName("to")
	.setDescription("Decodes a message from a given encoding.")
	.addStringOption((option) =>
		option
			.setName("encoding")
			.setDescription("The encoding to encode to.")
			.setRequired(true)
			.addChoices([
				["Binary", "binary"],
				["Hex", "hex"],
				["Base64", "base64"],
			])
	)
	.addStringOption((option) =>
		option
			.setName("message")
			.setDescription("The message to decode.")
			.setRequired(true)
	);

const execute = async (interaction) => {
	const encoding = interaction.options.getString("encoding");
	const message = interaction.options.getString("message");

	const output =
		encoding === "binary" ? str2bin(message) : encode(message, encoding);

	interaction.reply({
		content: output,
		ephemeral: true,
	});
};

const encode = (str, encoding) => Buffer.from(str, "utf8").toString(encoding);

const str2bin = (str) =>
	str
		.split("")
		.map((char) => char.charCodeAt(0).toString(2))
		.join(" ");

module.exports = {
	data,
	execute,
};
