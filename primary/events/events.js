
const { Chat, eventNames } = require('./Chat');

const heroesChat = new Chat('Heroes chat');


heroesChat.subscribe(eventNames.add, ({member}) => {
    heroesChat.sendMessage(
        `${member.name} joined the chat`,
        heroesChat.name,
        'all'
    )
});

heroesChat.subscribe(eventNames.message, ({from, to, message}) => {
    console.log(`
        ${from} says to ${to}: '${message}'
    `);
});
