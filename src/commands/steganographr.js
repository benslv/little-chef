const { SlashCommandBuilder } = require("@discordjs/builders");

const { encode, decode } = require("steganographr");

const data = new SlashCommandBuilder()
	.setName("steganographr")
	.setDescription("Encode and decode with Neatnik's steganographr.")
	.addSubcommand((subcommand) =>
		subcommand
			.setName("encode")
			.setDescription("Encode a hidden message in your message.")
			.addStringOption((option) =>
				option
					.setName("public")
					.setDescription("The message to be displayed publicly.")
					.setRequired(true)
			)
			.addStringOption((option) =>
				option
					.setName("private")
					.setDescription("The message to hide inside.")
					.setRequired(true)
			)
	)
	.addSubcommand((subcommand) =>
		subcommand
			.setName("decode")
			.setDescription("Decodes a message to find the hidden string.")
			.addStringOption((option) =>
				option
					.setName("message")
					.setDescription("The message to be decoded.")
					.setRequired(true)
			)
	);

const execute = async (interaction) => {
	interaction.reply("heheheheheheheh");
};

module.exports = {
	data,
	execute,
};
