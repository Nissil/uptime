const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const louritydb = require("croxydb")

module.exports = {
    name: "sil",
    description: "Linkinizi uptime sisteminden silersiniz.",
    type: 1,
    options: [
        {
            name: "link",
            description: "Sistemden silinecek linkinizi girin.",
            type: 3,
            required: true,
        },
    ],

    run: async (client, interaction) => {

        const link = interaction.options.getString('link')

        const links = louritydb.get(`uptimeLinks_${interaction.user.id}`)

        if (!links.includes(link)) return interaction.reply({ content: "Sistemde böyle bir link mevcut değil!", ephemeral: true }).catch(e => { })


        louritydb.unpush(`uptimeLinks_${interaction.user.id}`, link)
        louritydb.unpush(`uptimeLinks`, link)

        interaction.reply({ content: "Linkin başarıyla sistemden silindi!", ephemeral: true }).catch(e => { })
    }
};