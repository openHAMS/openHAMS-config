'use strict';

const {pick, uniq} = require('lodash');
const jsonfile = require('jsonfile');


class ConfigHandler {
    constructor(filename) {
        this.config = jsonfile.readFileSync(filename, 'utf8');
        this.cards = this.config.cards;
        let dirtyChannels = this.cards.map(card => card.cardData.channel);
        this.allChannels = uniq(dirtyChannels);
    }

    getAllChannels() {
        return this.allChannels;
    }

    getCardInfos() {
        // filter everything except name, type and cardData
        let cardInfos = pick(this.card, 'name', 'type', 'cardData');
        return cardInfos;
    }

    getMqttChannel(cardname) {
        let selectedCards = this.config.cards.filter(card => card.name === cardname);
        return selectedCards.length === 1 ? selectedCards[0].cardData.channel : null;
    }
}

module.exports = ConfigHandler;
