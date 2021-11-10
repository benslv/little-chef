const { SlashCommandBuilder } = require("@discordjs/builders");

const data = new SlashCommandBuilder()
	.setName("from")
	.setDescription("Decodes a message from a given encoding.")
	.addStringOption((option) =>
		option
			.setName("encoding")
			.setDescription("The encoding to decode from.")
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
		encoding === "binary" ? bin2str(message) : decode(message, encoding);

	interaction.reply({
		content: output,
		ephemeral: true,
	});
};

const decode = (str, encoding) => Buffer.from(str, encoding).toString();

const bin2str = (bin) =>
	bin
		.split(" ")
		.map((char) => String.fromCharCode(parseInt(char, 2)))
		.join("");

module.exports = {
	data,
	execute,
};
