const Client = require("./Structures/Client.js");

const config = require ("./Data/config.json");

const Command = require("./Structures/Command.js");

const client = new Client();

//client.commands = new Discord.Collection();

const fs = require("fs");

fs.readdirSync("./src/Commands").filter(file => file.endsWith(".js")).forEach(file => {
    /**
     * @type {Command}
     */
    const command = require(`./Commands/${file}`);
    console.log(`Command ${command.name} loaded`);
    client.commands.set(command.name,command);
});

client.on("ready", () => console.log("Bot is online!"));

client.on("messageCreate", message => {

    //console.log(message.content);
    //if (message.content == ("father")) message.reply("Daddy?");
    if (!message.content.startsWith(config.prefix)) return;

    const args = message.content.substring(config.prefix.length).split(/ +/);

    const command = client.commands.find(cmd => cmd.name == args[0]);

    if (!command) return message.reply(`${args[0]} that is not a valid command.`);

    switch (args[0]){
        case "father":
            message.reply("Daddy?");
            break;

        case "help":
            message.reply("Help:\n_say: repeats your message\n_father: replies with a special message");
            break;

        case "say":
            if(args.slice(1) == ''){
                message.reply("The bot would have crashed if I didn't send this, nice try");
                break;
            }else{
                message.reply(args.slice(1).join(" "));
                break;
            }
    }

});

client.login(config.token);
