// ==UserScript==
// @name         Anulowanie rozkazów
// @namespace    http://tampermonkey.net/
// @version      0.1
// @author       ABC*
// @match        https://*.plemiona.pl/game.php?*screen=info_village*
// ==/UserScript==

(function () {
    'use strict';

    var arr = $("a.command-cancel");
    var i = 0;

    var t = setInterval(
        function () {
            if (i > arr.length) {
                clearInterval(t);
            }
            $(arr[i++]).click();
        },
        200 + Math.floor(Math.random() * 100)
    );
})();
