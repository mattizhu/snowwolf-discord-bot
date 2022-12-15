/**
 * Snowwolf Discord Bot
 * @version 1.0.0
 * @author Matthew Williams
 * @authorEmail mattwillcreative@gmail.com
 * @authorURL https://www.mattwill.design
 * @license ISC
 * 
 * Copyright (c) 2022, Matthew Williams
 * 
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
 * REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
 * AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
 * INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
 * LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
 * OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
 * PERFORMANCE OF THIS SOFTWARE.
 */
require('dotenv').config();
const {REST, Routes} = require('discord.js');
const fs = require('node:fs');

const commands = [];
const commandFiles = fs.readdirSync('./events/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./events/commands/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({version: 10}).setToken(process.env.DISCORD_TOKEN);
(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        const data = await rest.put(Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, process.env.DISCORD_GUIDE_ID), {body: commands});

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch(error) {
        console.error(error);
    }
})();
