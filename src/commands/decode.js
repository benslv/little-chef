const { SlashCommandBuilder } = require("@discordjs/builders");

const { decode } = require("steganographr");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("decode")
		.setDescription("Decodes a message to find the hidden string.")
		.addStringOption((option) =>
			option
				.setName("message")
				.setDescription("The message to be decoded.")
				.setRequired(true)
		),
	execute: async (interaction) => {
		const message = interaction.options.getString("message");

		interaction.reply({
			content: decode(message),
			ephemeral: true,
		});
	},
};
