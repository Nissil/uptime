const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const config = require("../config.json")

module.exports = {
    name: "premium-ekle",
    description: "Belirtilen kullanıcıya premium eklersin.",
    type: 1,
    options: [
        {
            name: "kullanıcı",
            description: "Premium verilecek kullanıcı.",
            type: 6,
            required: true,
        },
    ],

    run: async (client, interaction) => {

        const user = interaction.options.getMember('kullanıcı')

        if (!user.roles.cache.has(config.YETKİLİ_ROL)) return interaction.reply({ content: "Bunu yapabilmek için premium yetkilisi olmalısın.", ephemeral: true })

        if (user.roles.cache.has(config.PREMİUM_ROL)) {
            return interaction.reply({
                content: "Bu kullanıcı zaten premium.",
                ephemeral: true
            }).catch(e => { })
        }

        await user.roles.add(config.PREMİUM_ROL).catch(l => { })
        return interaction.reply({ content: `${user} adlı üyeye premium verildi, artık 5 tane link ekleyebilir!` })
    }
};