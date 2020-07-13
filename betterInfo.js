// ==UserScript==
// @name         Krunker Change Info Button
// @namespace    http://tampermonkey.net/
// @version      v1.0.0
// @description  Get Info Faster
// @author       Phoenixi7
// @iconURL      https://phoenixpwn.com/phoenix.png
// @match        https://krunker.io/social.html?p=market
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function timer(ms) {
        return new Promise(res => setTimeout(res, ms));
    }

    async function updateValue() {
        if (document.getElementById('itemCardinventory_0')) {
            let itemsString = document.getElementById('invTrack').innerHTML.split('<')[0];
            let itemsInt = parseInt(itemsString);
            let items = itemsInt + 50;

            //Create Selection
            for (let i = 0; i < items; i++) {
                if (document.getElementById('itemCardinventory_' + i)) {
                    document.getElementById('itemCardinventory_' + i).querySelector('.cardActions').getElementsByClassName('cardAction')[2].onclick = function() { setInfoButton(i); };
                }
            }
        } else {
            await timer(200);
            updateValue();
        }
    } updateValue();

    function setInfoButton(i) {
        let marketId = String(document.getElementById('itemCardinventory_' + i).querySelector('.cardActions').getElementsByClassName('cardAction')[1].onclick).split('(')[2].split(',')[0];
        window.open('https://krunker.io/social.html?p=market&i=' + marketId,'popup','width=400,height=800')
    }
})();