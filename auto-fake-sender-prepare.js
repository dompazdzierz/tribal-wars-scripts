// ==UserScript==
// @name         Automatyczne wysyłanie fejków (przygotowanie rozkazu)
// @namespace    http://tampermonkey.net/
// @version      0.1
// @author       Hermitowski, ABC*
// @match        https://*.plemiona.pl/game.php?*screen=place*
// ==/UserScript==

(function () {
    'use strict';

    function useFakingScript() {
        /**
         * fill 'key', 'keyCode', 'which' for number matching fake script in your tribal wars settings
         * key -> keyCode == which
         * 0 -> 48
         * 1 -> 49
         * 2 -> 50
         * 3 -> 51
         * 4 -> 52
         * 5 -> 53
         * 6 -> 54
         * 7 -> 55
         * 8 -> 56
         * 9 -> 57
         */

        document.dispatchEvent(
            new KeyboardEvent("keydown", {
                key: 1,
                keyCode: 49,
                code: "KeyE",
                which: 49,
                shiftKey: false,
                ctrlKey: false,
                metaKey: false
            })
        );
    }

    function clickAttackButton() {
        const attackButton = $("input#target_attack");

        const msInOneSecond = 1000;
        const secondsBase = 6;
        const secondsAdditionalRange = 4;

        const waitingTime = (secondsBase * msInOneSecond) + Math.floor(Math.random() * secondsAdditionalRange) * msInOneSecond;

        setTimeout(() => { attackButton.click(); }, waitingTime);
    }

    function nextVillage() {
        var arrowRight = $("a#village_switch_right")[0];
        arrowRight.click();
    }

    function shouldSkipVillage() {
        const cancelButtons = $("div#commands_outgoings a.command-cancel");
        return cancelButtons.length > 0;
    }

    if (shouldSkipVillage())
        nextVillage();
    setTimeout(() => { useFakingScript(); }, 1500);
    clickAttackButton();
    // }
})();