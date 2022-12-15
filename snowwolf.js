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
const {Client, Collection, GatewayIntentBits} = require('discord.js');
const client = new Client({intents: [GatewayIntentBits.Guilds]});
const fs = require('node:fs');
const path = require('node:path');

// Discord Collections
client.commands = new Collection();

// Discord Command Collection
const commandFiles = fs.readdirSync(path.join(__dirname, 'events/commands')).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`${__dirname}/events/commands/${file}`);
    if ('data' in command && 'execute' in command) client.commands.set(command.data.name, command);
    else console.log(`[WARN] The command file ${file} is missing a required "data" or "execute" property.`);
}

// Discord Event Listeners
const eventFiles = fs.readdirSync(path.join(__dirname, 'events')).filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`${__dirname}/events/${file}`);
    if (event.once) client.once(event.name, (...args) => event.execute(...args));
    else client.on(event.name, (...args) => event.execute(...args));
}

client.login(process.env.DISCORD_TOKEN);
