const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const louritydb = require("croxydb")
const config = require("../config.json")

module.exports = {
    name: "ekle",
    description: "Linkinizi uptime sistemine eklersiniz.",
    type: 1,
    options: [
        {
            name: "link",
            description: "Uptime edilecek linkinizi girin.",
            type: 3,
            required: true,
        },
    ],

    run: async (client, interaction) => {

        if (!interaction.member.roles.cache.has(config.PREMİUM_ROL)) {
            if (louritydb.fetch(`uptimeLinks_${interaction.user.id}`).length >= 3) {
                return interaction.reply({
                    content: "En fazla 3 link ekleyebilirsin!",
                    ephemeral: true
                }).catch(e => { })
            }
        }

        if (interaction.member.roles.cache.has(config.PREMİUM_ROL)) {
            if (louritydb.fetch(`uptimeLinks_${interaction.user.id}`).length >= 5) {
                return interaction.reply({
                    content: "En fazla 5 link ekleyebilirsin!",
                    ephemeral: true
                }).catch(e => { })
            }
        }

        const link = interaction.options.getString('link')

        let link2 = louritydb.fetch(`uptimeLinks_${interaction.user.id}`, [])

        if (link2.includes(link)) {
            return interaction.reply({
                content: "Bu link zaten sistemde mevcut!",
                ephemeral: true
            }).catch(e => { })
        }

        if (!link.startsWith("https://")) {
            return interaction.reply({
                content: "Uptime linkin hatalı, lütfen başında `https://` olduğundan emin ol!",
                ephemeral: true
            }).catch(e => { })
        }


        louritydb.push(`uptimeLinks_${interaction.user.id}`, link)
        louritydb.push(`uptimeLinks`, link)
        interaction.reply({
            content: "Linkin başarıyla uptime sistemine eklendi!",
            ephemeral: true
        }).catch(e => { })
    }
};