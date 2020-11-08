const EventEmitter = require('events');
const Readline = require('readline');

const Member = require('./Member');

const EVENT_ADD = 'EVENT_ADD';
const EVENT_MESSAGE = 'EVENT_MESSAGE';

class Chat extends EventEmitter {

    constructor(name) {
        super();

        this.name = name;
        this.members = [];
        this.readline = Readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        setTimeout(() => this.init());
    }

    init() {
        this.sendMessage(`${this.name} created`, this.name, 'all');
        this.askAddMembers();
    }

    addMember(member) {
        this.members = [
            ...this.members,
            member
        ];

        this.emit(EVENT_ADD, { member });
    }

    sendMessage(message, from, to) {
        this.emit(EVENT_MESSAGE, {
            from,
            to,
            message
        });
    }

    subscribe(event, callback) {
        this.on(event, callback);
    }

    getMembers() {
        return this.members;
    }

    askAddMembers() {
        this.readline.question('Add member to chat: \n', (name) => {
            const member = new Member(name);

            this.addMember(member);

            const membersCount = this.members.length;

            if (this.members.length >= 5) {
                console.log('Maximum members count is 5');

                this.members.forEach(m => console.log(m.getInfo()));

                this.readline.close();
            } else {
                console.log('chat members: ', membersCount);
                this.askAddMembers();
            }
        });
    }
}

exports.Chat = Chat;
exports.eventNames = {
    add: EVENT_ADD,
    message: EVENT_MESSAGE
}