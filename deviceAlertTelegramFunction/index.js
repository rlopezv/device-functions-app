const { TelegramClient } = require('messaging-api-telegram');

const TELEGRAM_KEY = process.env.TELEGRAM_KEY;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

const client = TelegramClient.connect(TELEGRAM_KEY);

module.exports = async function(context, queueMsg) {
    
    context.log('JavaScript ServiceBus queue trigger function processed message', queueMsg);

    client.sendMessage(TELEGRAM_CHAT_ID, JSON.stringify(queueMsg), {
        disable_web_page_preview: true,
        disable_notification: true,
      });
};