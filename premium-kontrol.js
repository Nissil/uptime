const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const config = require("../config.json")

module.exports = {
    name: "premium-kontrol",
    description: "Belirtilen kullanıcının veya kendinin premium durumuna bakarsın.",
    type: 1,
    options: [
        {
            name: "kullanıcı",
            description: "Premiumuna bakılacak kullanıcı.",
            type: 6,
            required: true,
        },
    ],

    run: async (client, interaction) => {

        const user = interaction.options.getMember('kullanıcı')

        if (user.roles.cache.has(config.PREMİUM_ROL)) {
            return interaction.reply({
                content: `${user} adlı üye premiuma sahip, maximum 5 link ekleyebilir.`,
                ephemeral: true
            }).catch(e => { })
        } else {
            return interaction.reply({
                content: `${user} adlı üye premiuma sahip değil, maximum 3 link ekleyebilir.`,
                ephemeral: true
            }).catch(e => { })
        }
    }
};