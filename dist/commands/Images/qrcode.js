import { AttachmentBuilder, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Command } from "../../base/Command.js";
export default class QRCode extends Command {
    constructor(client) {
        super(client, {
            name: "qrcode",
            enabled: true,
            guildOnly: false,
            cooldown: 5000,
        });
    }
    slashCommand = new SlashCommandBuilder()
        .setName("qrcode")
        .setDescription("Generate a QR code from text")
        .addStringOption(opt => opt.setName("text").setDescription("The text to encode").setRequired(true));
    async run(interaction, data) {
        const client = interaction.client;
        const t = (key, args) => client.translate(key, args, data.guild.language);
        const text = interaction.options.getString("text", true);
        const encoded = encodeURIComponent(text);
        const url = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encoded}`;
        await interaction.deferReply();
        try {
            const res = await fetch(url);
            if (!res.ok)
                throw new Error("API error");
            const buffer = Buffer.from(await res.arrayBuffer());
            const attachment = new AttachmentBuilder(buffer, { name: "qrcode.png" });
            const embed = new EmbedBuilder()
                .setColor(data.config.embed.color)
                .setTitle(t("images/qrcode:SUCCESS"))
                .setImage("attachment://qrcode.png")
                .setFooter({ text: data.config.embed.footer })
                .setTimestamp();
            interaction.editReply({ embeds: [embed], files: [attachment] });
        }
        catch {
            interaction.editReply({ content: "An error occurred while generating the QR code." });
        }
    }
}
//# sourceMappingURL=qrcode.js.map