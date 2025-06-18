const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0N6TjRTVy9EOVk2RXJ5REVqOHRKZ2NFVUgzcHhJRUI3V1IvNTBtc3NXTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTFhoaHBuc2dPUlZ6eUcrRU9IOHBuTFN6MDN5STFldlUzZnNSSDhzNWhUST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHQUpiOW5nakdBeG5CeStLTnpacm9SSEU3eURQUkd3SDJyL01CbkVVTVV3PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0TC9OVTRNQ1J0SjA4RzVQOHBzQWRRSWhseTY2TnlLMFpBQk5yTTlsRDFVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlNCWUpZTFBrVTVOMHhDTHA3U2Z3RVh3bzRTd2RFaElzN054bFI4WjRzV2M9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlUdjIwdUZocWpKamZzWThad1MvNjF4NDlxS05qVStpaUF6SjNJMURYenc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic1BwRk9nMWE0QVY1aXM0VzdUK0d3YUVqT0IxZ2JUZXE5SG93aHVacUdGMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU2Y4YlN6dXBxeGtaNkRGUFRBNFV4TGE0SHh2MlNVUzVja0hHL2JuY0pVMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9mL3dkR0JUR1ptbEJXZW0rWkMyVmRDanQ0V2pwejZlbUVPNmV5UUNQVVluTG5GUnVjMGZjMmhndUlialVtS2pMa2F1Tm5zMEtzT1FUSjRpbzgydkNRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTcxLCJhZHZTZWNyZXRLZXkiOiJla2lKdjVLQkppT2FST0xENTI3SmpKdEtzOGVpODRSRTBKeXhicTBoL1NBPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzNDkwNDQ1OTIyNzVAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiM0FEQUM0QjlBMEQ0RjI0RDI3MTEifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1MDE5NzYxOX0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0OTA0NDU5MjI3NUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIzQTk5OEUxQUQ1ODgwRkFFRDY1RCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzUwMTk3NjQzfV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiIxMjNMT1RVUyIsIm1lIjp7ImlkIjoiMjM0OTA0NDU5MjI3NToxOUBzLndoYXRzYXBwLm5ldCIsImxpZCI6IjUxMDExODk3MDYxNTIwOjE5QGxpZCIsIm5hbWUiOiJMYXN0IFJlc29ydCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDS0xtc0hjUTI4ckh3Z1lZQkNBQUtBQT0iLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiQWQxdUxyYjRCdlhHbVNDOUlVM1VXYTBTOHNFZXlNL2w4RDZFbTJQZm5YMD0iLCJhY2NvdW50U2lnbmF0dXJlIjoiVnB0UXdPY1NzNkJjWDVVMWRZS2Vrditvd0FaTVJVQktrRndrYVJ6V1dCMy9LeWlUVGVhRVFMdkhCcVY2a1NyUjJwYkFjUXhMWEdscEE1S0xZbzJDZ3c9PSIsImRldmljZVNpZ25hdHVyZSI6Im1KTUJFQXpSUlBaU1F0ZDYrUmhXejVieHk4QVBhMDkxQ2VwTU5WZHdkdlk1Y3BHOWpEM2RPN2JRTW1naEk1ZURkenpsTVlqUkZsenB0STBFTEt0VUNnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM0OTA0NDU5MjI3NToxOUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJRSGRiaTYyK0FiMXhwa2d2U0ZOMUZtdEV2TEJIc2pQNWZBK2hKdGozNTE5In19XSwicGxhdGZvcm0iOiJpcGhvbmUiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBZ0lFZz09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc1MDE5NzYwNywibGFzdFByb3BIYXNoIjoiM2dQVUprIiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFQZ1cifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "®youngthug",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "+23490445975",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'CHARLESKE-XMD',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/p6uxq0.png',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.CHATBOT || 'yes',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    ANTIDELETE1 : process.env.ANTIDELETE1 || 'yes',
                  ANTIDELETE2 : process.env.ANTIDELETE2 || 'yes',
                  CHARLESKE_CHATBOT : process.env.CHARLESKE_CHATBOT || 'yes',
                  ANTICALL : process.env.ANTICALL || 'yes',
                  AUTO_REACT : process.env.AUTO_REACT || 'no',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_REPLY : process.env.AUTO_REPLY || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'no',
                  AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
                  AUTO_REJECT_CALL : process.env.AUTO_REJECT_CALL || 'yes',
                  AUTO_BIO : process.env.AUTO_BIO || 'yes',
                  AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',
                  AUTO_TAG_STATUS : process.env.AUTO_TAG_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
