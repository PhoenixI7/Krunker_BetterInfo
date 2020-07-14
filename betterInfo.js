// ==UserScript==
// @name         Krunker Better Info
// @namespace    http://tampermonkey.net/
// @version      v2.1.0
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
        var win = window.open('https://krunker.io/social.html?p=market&i=' + marketId,'popup','width=400,height=900');
        editPopup(win, i);
    }

    async function editPopup(win, i) {
        if (win.document.getElementById('navBar')) {
            win.document.getElementById('navBar').style.display = "none";
            win.document.getElementsByClassName('leaderNav')[1].style.display = "none";
            window.setTimeout(function() {
                returnCost(win, i)
            }, 500);
        } else {
            await timer(10);
            editPopup(win, i);
        }
    }

    async function returnCost(win, i) {
        if (win.document.getElementById('itemCardmarket_0')) {
            var price = win.document.getElementById('itemCardmarket_0').getElementsByClassName('marketPrice')[0].innerHTML.split('<')[0];
            console.log(price);
            document.getElementById('itemCardinventory_' + i).getElementsByClassName('cardEst')[0].innerHTML = price + " KR";
            await timer(7500);
            win.close();
        } else if (win.document.getElementById('marketList').querySelector('div')) {
            if (win.document.getElementById('marketList').querySelector('div').innerHTML == "No Items Found...") {
                document.getElementById('itemCardinventory_' + i).getElementsByClassName('cardEst')[0].innerHTML = "Can't Sell";
                win.close();
            }
        } else {
            await timer(10);
            returnCost(win, i);
        }
    }
})();

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
                    let buttonOnclick = new Function(String(document.getElementById('itemCardinventory_' + i).querySelector('.cardActions').getElementsByClassName('cardAction')[0].onclick).split('{')[1].split('}')[0].split('\n')[1]);
                    console.log(buttonOnclick);
                    document.getElementById('itemCardinventory_' + i).querySelector('.cardActions').getElementsByClassName('cardAction')[0].onclick = function() {
                        buttonOnclick();
                        document.getElementsByClassName('pItemDesc')[0].innerHTML = "Getting Price..."
                        console.log("clicked");
                        setInfoButton(i);
                    };
                }
            }
        } else {
            await timer(200);
            updateValue();
        }
    } updateValue();

    function setInfoButton(i) {
        let marketId = String(document.getElementById('itemCardinventory_' + i).querySelector('.cardActions').getElementsByClassName('cardAction')[1].onclick).split('(')[2].split(',')[0];
        var win = window.open('https://krunker.io/social.html?p=market&i=' + marketId,'popup','width=400,height=900');
        editPopup(win, i);
    }

    async function editPopup(win, i) {
        if (win.document.getElementById('navBar')) {
            win.document.getElementById('navBar').style.display = "none";
            win.document.getElementsByClassName('leaderNav')[1].style.display = "none";
            window.setTimeout(function() {
                returnCost(win, i)
            }, 500);
        } else {
            await timer(10);
            editPopup(win, i);
        }
    }

    async function returnCost(win, i) {
        if (win.document.getElementById('itemCardmarket_0')) {
            var price = win.document.getElementById('itemCardmarket_0').getElementsByClassName('marketPrice')[0].innerHTML.split('<')[0];
            document.getElementsByClassName('pItemDesc')[0].innerHTML = '<ul style="list-style-type:none; padding-left: 0px; margin-top: 0px;"><li>' + 'Cheapest: ' + price + " KR" + '</li><li>' + 'Recommended: ' + recommendedListVal(win) +'</li></ul>';
            await timer(100);
            win.close();
        } else if (win.document.getElementById('marketList').querySelector('div')) {
            if (win.document.getElementById('marketList').querySelector('div').innerHTML == "No Items Found...") {
                document.getElementsByClassName('pItemDesc')[0].innerHTML = "Can't Be Sold";
                await timer(100);
                win.close();
            }
        } else {
            await timer(10);
            returnCost(win, i);
        }
    }

    function recommendedListVal(win) {
        if (win.document.getElementById('itemCardmarket_3')) {
            let num1 = parseInt(win.document.getElementById('itemCardmarket_0').getElementsByClassName('marketPrice')[0].innerHTML.split('<')[0].split(',')[0] + win.document.getElementById('itemCardmarket_0').getElementsByClassName('marketPrice')[0].innerHTML.split('<')[0].split(',')[1]);
            let num2 = parseInt(win.document.getElementById('itemCardmarket_1').getElementsByClassName('marketPrice')[0].innerHTML.split('<')[0].split(',')[0] + win.document.getElementById('itemCardmarket_1').getElementsByClassName('marketPrice')[0].innerHTML.split('<')[0].split(',')[1]);
            let num3 = parseInt(win.document.getElementById('itemCardmarket_2').getElementsByClassName('marketPrice')[0].innerHTML.split('<')[0].split(',')[0] + win.document.getElementById('itemCardmarket_2').getElementsByClassName('marketPrice')[0].innerHTML.split('<')[0].split(',')[1]);
            let num4 = parseInt(win.document.getElementById('itemCardmarket_3').getElementsByClassName('marketPrice')[0].innerHTML.split('<')[0].split(',')[0] + win.document.getElementById('itemCardmarket_3').getElementsByClassName('marketPrice')[0].innerHTML.split('<')[0].split(',')[1]);

            if (num2 - num1 >= num4 - num2 && num1 > 2000) {
                return recommendPrice(num1, num2, num3, num4) + " - Don't Sell";
            } else if (num2 - num1 >= (num4 - num2)*2) {
                return recommendPrice(num1, num2, num3, num4) + " - Don't Sell";
            } else {
                return recommendPrice(num1, num2, num3, num4) + " KR";
            }
        } else { return 'Unkown'}
    } recommendedListVal();

    function recommendPrice(num1, num2, num3, num4) {
        let r1 = num2 - num1;
        let r2 = num3 - num2;
        let r3 = num4 - num3;
        let avg = (r1 + r2 + r3)/3;
        if (num1 > 1000) {
            return (Math.round((num1 - avg)/100))*100;
        } else if (num1 > 100) {
            return (Math.round((num1 - avg)/10))*10;
        }
    }
})();
