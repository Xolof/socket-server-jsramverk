var nicks = function () {
        let nickNames = [];

        function addNick (nick) {
            this.nickNames.push(nick);
        }

        // removeNick
        function removeNick (nick) {

            console.log(this.nickNames);

            this.nickNames = this.nickNames.filter((name) => {
               return name != nick;
            });

            console.log(this.nickNames);
        }

        function checkIfExists (nick) {
            return this.nickNames.includes("nick");
        }

        return {
            addNick,
            removeNick,
            checkIfExists
        };
}();

module.exports = {
    nicks
}
