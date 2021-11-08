const { SlashCommandBuilder } = require("@discordjs/builders");

const { encode } = require("steganographr");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("encode")
		.setDescription("Encodes a message with your hidden message.")
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
		),
	execute: async (interaction) => {
		const public = interaction.options.getString("public");
		const private = interaction.options.getString("private");

		interaction.reply({
			content: encode(public, private),
			ephemeral: true,
		});
	},
};
