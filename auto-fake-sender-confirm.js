// ==UserScript==
// @name         Automatyczne wysyłanie fejków (potwierdzenie rozkazu)
// @namespace    http://tampermonkey.net/
// @version      0.1
// @author       ABC*
// @match        https://*.plemiona.pl/game.php?*screen=place*try=confirm
// @match        https://*.plemiona.pl/game.php?*try=confirm*screen=place
// ==/UserScript==

(function () {
    'use strict';

    const msBase = 100;
    const msRange = 200;
    const waitingTime = msBase + Math.floor(Math.random() * msRange);
    setTimeout(() => { $("input#troop_confirm_go").click(); }, waitingTime);

})();
