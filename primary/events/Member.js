class Member {
    constructor(name) {
        this.createdDate = new Date();
        this.name = name;
        this.id = this.createdDate.getTime();
    }

    getInfo() {
        return `
            name: ${this.name},
            createdDate: ${this.createdDate}
        `;
    }
}

module.exports = Member;