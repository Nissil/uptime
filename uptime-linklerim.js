const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const louritydb = require("croxydb")

module.exports = {
    name: "linklerim",
    description: "Sistemdeki linklerinizi görüntülersiniz.",
    type: 1,
    options: [],

    run: async (client, interaction) => {

        const arabam_dacia = louritydb.get(`uptimeLinks_${interaction.user.id}`)
        if (!arabam_dacia) return interaction.reply({ content: "Sisteme eklenmiş bir linkin yok!", ephemeral: true })

        const links = louritydb.get(`uptimeLinks_${interaction.user.id}`).map(map => `▶️ \`${map}\` `).join("\n")

        const linklerimEmbed = new EmbedBuilder()
            .setTitle(`Uptime Linklerin`)
            .setDescription(`${links || "Sisteme eklenmiş bir link yok!"}`)
            .setColor("Blurple")

        interaction.reply({
            embeds: [linklerimEmbed],
            ephemeral: true
        }).catch(e => { })
    }
};