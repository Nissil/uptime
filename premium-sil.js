const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const config = require("../config.json")

module.exports = {
    name: "premium-sil",
    description: "Belirtilen kullanıcıdan premiumu silersin.",
    type: 1,
    options: [
        {
            name: "kullanıcı",
            description: "Premiumu alınacak kullanıcı.",
            type: 6,
            required: true,
        },
    ],

    run: async (client, interaction) => {

        const user = interaction.options.getMember('kullanıcı')

        if (!user.roles.cache.has(config.YETKİLİ_ROL)) return interaction.reply({ content: "Bunu yapabilmek için premium yetkilisi olmalısın.", ephemeral: true })

        if (!user.roles.cache.has(config.PREMİUM_ROL)) {
            return interaction.reply({
                content: "Bu kullanıcı zaten premium değil.",
                ephemeral: true
            }).catch(e => { })
        }

        await user.roles.remove(config.PREMİUM_ROL).catch(l => { })
        return interaction.reply({ content: `${user} adlı üyeden premium alındı, maximum 3 link ekleyebilir.` })
    }
};