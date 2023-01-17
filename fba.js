const { REST } = require('@discordjs/rest');
const { Client, GatewayIntentBits, Routes } = require('discord.js');
const { token, CLIENT_ID, GUILD_ID } = require('./fba-config.json');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const rest = new REST({ version: '10' }).setToken(token);

client.login(token);

client.on('ready', () => {
    console.log(`${client.user.tag} is online!`)
});

client.on('interactionCreate', (interaction) => {
    if (interaction.isChatInputCommand()) {
        console.log("Command received")
        const onlineArbLink = interaction.options.getString('online-arbitrage');
        const amzLink = interaction.options.getString('amazon');
        const title = interaction.options.getString('item');
        const monthlySales = interaction.options.getString('monthly-sales');
        const profit = interaction.options.getString('profit');
        interaction.reply(
            "**" + title + "**" + "\n" +
            "**Monthly Sales**: " + monthlySales + "\n" +
            "**ROI**: " + profit + "\n" +
            "[" + "Online Arbitrage Link" + "]" +  "(" + "<" + onlineArbLink + ">" + ")" + "\n" +
            "[" + "Amazon Link" + "]" +  "(" + "<" + amzLink + ">" + ")"
        );
    }
});
    

async function main() {
    const commands = [{
        name: 'fba-leads',
        description: 'Formats FBA Leads',
        options: [
            {
                name: 'item',
                description: 'Item Name',
                type: 3,
                required: true
            },
            {
                name: 'monthly-sales',
                description: 'Sales/Month (optional, unknown = N/A)',
                type: 3,
                required: true
            },
            {
                name: 'online-arbitrage',
                description: 'Online Arbitrage Link',
                type: 3,
                required: true
            },
            {
                name: 'amazon',
                description: 'Amazon Link',
                type: 3,
                required: true
            },
            {
                name: 'profit',
                description: 'Profit (optional, unknown = N/A)',
                type: 3,
                required: false
            }
        ]
    }];
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { 
            body: commands,
        });

        console.log('Successfully reloaded application (/) commands.');
    }
    catch (error) {
        console.error(error);
    }
}
main();


