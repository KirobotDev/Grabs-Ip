# Kiro$B IP Grabber

---

## 🇫🇷 Version Française

### 🚀 Présentation
Bienvenue dans **Kiro$B IP Grabber**, un outil web sophistiqué conçu pour capturer les adresses IP des visiteurs et authentifier les utilisateurs via Discord OAuth2. Une fois authentifiés, les détails des utilisateurs (IP, email, localisation, etc.) sont enregistrés, et un embed de vérification est envoyé dans un salon Discord dédié. L'interface est moderne, animée et optimisée pour une expérience fluide sur tous les appareils.

### 🎯 Fonctionnalités
- **Capture d'IP** : Enregistre les adresses IP publiques des visiteurs avec des API de secours pour une précision optimale.
- **Authentification Discord** : Connecte les utilisateurs via Discord OAuth2, collectant ID, email, nom d'utilisateur et badges.
- **Géolocalisation** : Récupère la ville et le pays des utilisateurs grâce à des API externes.
- **Bot Discord** : Commande `/join` pour inviter les utilisateurs vérifiés dans un serveur Discord.
- **Interface Élégante** : Page de vérification avec animations fluides et un design responsive.
- **Persistance des Données** : Stocke les logs d'IP et données utilisateur dans des fichiers JSON.
- **Personnalisable** : Configurable via des variables d'environnement pour une intégration facile.

### 🛠️ Pile Technologique
- **Frontend** : HTML, CSS, JavaScript
- **Backend** : Node.js avec Express.js
- **Discord** : Discord.js pour le bot et OAuth2
- **APIs** : ip-api.com, ipify.org, ipinfo.io (IP et géolocalisation), MapQuest (cartes statiques)
- **Stockage** : Fichiers JSON locaux pour les logs

### 📋 Prérequis
- Node.js (v16 ou supérieur)
- Jeton de bot Discord, ID client et secret client
- Serveur Discord avec un salon pour les logs
- Domaine public pour héberger l'application (ex. : `https://api.kirosb.fr`)

### ⚙️ Installation
1. **Cloner le dépôt** :
   ```bash
   git clone <https://github.com/KirobotDev/Grabs-Ip>
   cd <https://github.com/KirobotDev/Grabs-Ip/tree/main/public>
   ```

2. **Installer les dépendances** :
   ```bash
   npm install express discord.js axios
   ```

3. **Configurer l'environnement** :
   - Dans le fichier `index.js` ou mettez à jour le script:
     ```index.js
    const client = new Client({ intents: ['Guilds', 'GuildMembers'] });
    const DISCORD_TOKEN = ''; // ton token de bot discord
    const CHANNEL_ID = ''; // Ton channel ou ca va envoyer le grabs
    const DISCORD_CLIENT_ID = ''; // Ton discord Id bot
    const DISCORD_CLIENT_SECRET = ''; // ton discord client secret de ton bot 
    const REDIRECT_URI = 'https://api.kirosb.fr/auth/callback'; // change le lien api.kirosb.fr par ton lien genre Imaginon xql.kirosb.fr et dans discord tu va dans la sections OAuth2 add redirects tu add le lien en entier pour moi ducoup cetais ca https://api.kirosb.fr/auth/callback
    const GUILD_ID = ''; // Ton Id De guild Qui fais rejoindre
     ```

4. **Configurer OAuth2 Discord** :
   - Accédez au [Portail Développeur Discord](https://discord.com/developers/applications).
   - Créez une application et ajoutez un bot.
   - Ajoutez l'URI de redirection (ex. : `https://votre-domaine.com/auth/callback`) dans OAuth2 > Redirects.
   - Notez l'ID client, le secret client et le jeton du bot.

5. **Lancer l'application** :
   ```bash
   node index.js
   ```

6. **Héberger l'application** :
   - Déployez sur un serveur avec un domaine public.
   - Assurez-vous que le dossier `public` contient `index.html`.

### 🎮 Utilisation
1. **Accéder au site** :
   - Visitez l'URL hébergée (ex. : `https://votre-domaine.com`).
   - Les utilisateurs verront un bouton "Se connecter avec Discord".

2. **Authentification** :
   - Les utilisateurs sont redirigés vers Discord pour s'authentifier.
   - Après connexion, ils reviennent sur une page de succès.

3. **Logs d'IP** :
   - Les IPs, agents utilisateurs et horodatages sont enregistrés dans `grabs/ip.json`.
   - Les données utilisateur (Discord et géolocalisation) sont stockées dans `grabs/verif_<user_id>.json`.

4. **Bot Discord** :
   - Utilisez `/join` pour recevoir un lien d'invitation.
   - Les utilisateurs vérifiés sont ajoutés au serveur configuré.

5. **Logs de vérification** :
   - Un embed détaillé (nom, ID, email, IP, localisation, badges) est envoyé dans le salon Discord.

### 📂 Structure des Fichiers
- `index.html` : Interface frontend avec page de vérification et animation de succès.
- `index.js` : Serveur backend gérant les logs, OAuth2 et le bot.
- `grabs/` :
  - `ip.json` : Logs des IPs uniques.
  - `verif_<user_id>.json` : Données de vérification par utilisateur.
  - `verified_users.json` : Liste des IDs Discord vérifiés.

### 🔒 Notes de Sécurité
- **Collecte d'IP** : Respectez les lois locales sur la confidentialité (ex. : RGPD, CCPA).
- **OAuth2** : Stockez les informations sensibles (`DISCORD_TOKEN`, `DISCORD_CLIENT_SECRET`) de manière sécurisée.
- **HTTPS** : Utilisez HTTPS pour sécuriser les données transmises.
- **Limites d'API** : Attention aux limites de requêtes des APIs utilisées.

### 🎨 Personnalisation
- **Style** : Modifiez le CSS dans `index.html` pour ajuster l'apparence.
- **Redirection** : Mettez à jour `REDIRECT_URI` dans le code et le portail Discord.
- **Embed Discord** : Personnalisez l'`EmbedBuilder` dans `/auth/callback`.
- **APIs** : Ajoutez ou remplacez des APIs dans `getRealIp` pour plus de précision.

### ⚠️ Limites
- **Précision des IPs** : Moins fiable avec des proxies ou VPN.
- **Dépendance aux APIs** : Les APIs externes peuvent avoir des interruptions ou limites.
- **Bot Discord** : Nécessite des permissions appropriées sur le serveur.
- **Stockage** : Les fichiers JSON conviennent pour des petites échelles.

### 🤝 Contribution
Les contributions sont les bienvenues ! Soumettez une pull request ou ouvrez une issue pour signaler des bugs ou proposer des améliorations.

### 📬 Contact
- **Développeur** : xql.dev
- **Site Web** : [https://kirosb.fr](https://kirosb.fr)
- **Discord** : [discord.gg/kirosb](discord.gg/kirosb)

### 📜 Licence
Tous droits réservés © [https://kirosb.fr](https://kirosb.fr). Reproduction ou distribution non autorisée interdite.

---

## 🇬🇧 English Version

### 🚀 Overview
Welcome to **Kiro$B IP Grabber**, a sleek web-based tool designed to capture visitor IP addresses and authenticate users via Discord OAuth2. Once authenticated, user details (IP, email, location, etc.) are logged, and a verification embed is sent to a designated Discord channel. The interface is modern, animated, and optimized for a seamless experience across devices.

### 🎯 Features
- **IP Capture**: Logs public IP addresses using multiple fallback APIs for accuracy.
- **Discord Authentication**: Authenticates users via Discord OAuth2, collecting ID, email, username, and badges.
- **Geo-Location**: Retrieves city and country data based on IP using external APIs.
- **Discord Bot**: `/join` command to invite verified users to a server.
- **Stylish UI**: Verification page with smooth animations and responsive design.
- **Data Persistence**: Stores IP logs and user data in JSON files.
- **Customizable**: Configurable via environment variables for easy integration.

### 🛠️ Tech Stack
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js with Express.js
- **Discord**: Discord.js for bot and OAuth2
- **APIs**: ip-api.com, ipify.org, ipinfo.io (IP and geo-location), MapQuest (static maps)
- **Storage**: Local JSON files for logs

### 📋 Prerequisites
- Node.js (v16 or higher)
- Discord bot token, client ID, and client secret
- Discord server with a channel for verification logs
- Public domain to host the app (e.g., `https://api.kirosb.fr`)

### ⚙️ Installation
1. **Clone the Repository**:
   ```bash
   git clone <https://github.com/KirobotDev/Grabs-Ip>
   cd <https://github.com/KirobotDev/Grabs-Ip/tree/main/public>
   ```

2. **Install Dependencies**:
   ```bash
   npm install express discord.js axios
   ```

3. **Configure Environment**:
    - In the `index.js` file or update the script:
     ```index.js
    const client = new Client({ intents: ['Guilds', 'GuildMembers'] });
    const DISCORD_TOKEN = ''; // ton token de bot discord
    const CHANNEL_ID = ''; // Ton channel ou ca va envoyer le grabs
    const DISCORD_CLIENT_ID = ''; // Ton discord Id bot
    const DISCORD_CLIENT_SECRET = ''; // ton discord client secret de ton bot 
    const REDIRECT_URI = 'https://api.kirosb.fr/auth/callback'; // change le lien api.kirosb.fr par ton lien genre Imaginon xql.kirosb.fr et dans discord tu va dans la sections OAuth2 add redirects tu add le lien en entier pour moi ducoup cetais ca https://api.kirosb.fr/auth/callback
    const GUILD_ID = ''; // Ton Id De guild Qui fais rejoindre
     ```

4. **Set Up Discord OAuth2**:
   - Visit the [Discord Developer Portal](https://discord.com/developers/applications).
   - Create an application and add a bot.
   - Add the redirect URI (e.g., `https://your-domain.com/auth/callback`) in OAuth2 > Redirects.
   - Note the client ID, client secret, and bot token.

5. **Run the Application**:
   ```bash
   node index.js
   ```

6. **Host the Application**:
   - Deploy on a server with a public domain.
   - Ensure the `public` folder contains `index.html`.

### 🎮 Usage
1. **Access the Website**:
   - Visit the hosted URL (e.g., `https://your-domain.com`).
   - Users see a "Connect with Discord" button to start authentication.

2. **Authentication**:
   - Users are redirected to Discord for login.
   - On success, they return to a verification success page.

3. **IP Logging**:
   - IPs, user agents, and timestamps are logged in `grabs/ip.json`.
   - User-specific data (Discord and geo-location) is stored in `grabs/verif_<user_id>.json`.

4. **Discord Bot**:
   - Use `/join` in Discord to receive an invite link.
   - Verified users are added to the configured server.

5. **Verification Logs**:
   - A detailed embed (username, ID, email, IP, location, badges) is sent to the Discord channel.

### 📂 File Structure
- `index.html`: Frontend interface with verification and success animation.
- `index.js`: Backend server handling IP logging, OAuth2, and bot.
- `grabs/`:
  - `ip.json`: Logs unique visitor IPs.
  - `verif_<user_id>.json`: User-specific verification data.
  - `verified_users.json`: List of verified Discord user IDs.

### 🔒 Security Notes
- **IP Collection**: Comply with local privacy laws (e.g., GDPR, CCPA).
- **OAuth2**: Securely store sensitive data (`DISCORD_TOKEN`, `DISCORD_CLIENT_SECRET`).
- **HTTPS**: Use HTTPS to protect data transmission.
- **API Limits**: Be mindful of rate limits for external APIs.

### 🎨 Customization
- **Styling**: Edit CSS in `index.html` to tweak the look.
- **Redirect URI**: Update `REDIRECT_URI` in code and Discord portal.
- **Discord Embed**: Customize `EmbedBuilder` in `/auth/callback`.
- **APIs**: Add or swap APIs in `getRealIp` for better accuracy.

### ⚠️ Limitations
- **IP Accuracy**: Less reliable with proxies or VPNs.
- **API Dependency**: External APIs may have downtime or limits.
- **Discord Bot**: Requires proper server permissions.
- **Storage**: JSON files are suitable for small-scale use.

### 🤝 Contributing
Contributions are welcome! Submit a pull request or open an issue for bugs or features.

### 📬 Contact
- **Developer**: xql.dev
- **Website**: [https://kirosb.fr](https://kirosb.fr)
- **Discord**: [discord.gg/kirosb](discord.gg/kirosb)

### 📜 License
All rights reserved © [https://kirosb.fr](https://kirosb.fr). Unauthorized reproduction or distribution is prohibited.
