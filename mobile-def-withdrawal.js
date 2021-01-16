// ==UserScript==
// @name         Cofanie wsparcia
// @namespace    http://tampermonkey.net/
// @version      0.1
// @author       ABC*
// @include      https://*.plemiona.pl/game.php?*screen=place*mode=units*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const $ = window.jQuery;

    function useWithdrawalScript() {
        let village_id = game_data.village.id;
        let units = game_data.units.filter(u => u !== 'militia');

        let tables$ = $('form > table');

        for (let i = 1; i < tables$.length; i++) {
            apply_to_table(tables$[i]);
        }

        function apply_to_table(table) {
            for (let i = 1; i < table.rows.length - 1; i++) {
                let unit_id = table.rows[i].cells[0].children[0].value;
                for (let j = 0; j < units.length; j++) {
                    let cell$ = $(table.rows[i].cells[j + 2]);
                    let count = Number(cell$.text());
                    if (count !== 0) {
                        cell$.css('cursor', 'pointer');
                        cell$.css('text-decoration', 'underline');
                        let form_data = {};
                        form_data[units[j]] = count;
                        let url = TribalWars.buildURL('POST', 'place', {
                            action: 'back',
                            unit_id: unit_id,
                            mode: 'units',
                            village: village_id,
                            h: game_data.csrf
                        });
                        cell$.on('click', function () {
                            cell$.off('click');
                            $.post(url, form_data, () => {
                                cell$.css('cursor', '');
                                cell$.css('text-decoration', '');
                                cell$.text('0');
                                cell$.addClass('hidden');
                            });
                        });
                    }
                }
            }
        }
    }

    function withdraw() {
        const links = $("table#units_away td.unit-item").not(".hidden");

        const ms = 150;
        const msRange = 100;

        var i = 0;
        var t = setInterval(
            function () {
                if (i > links.length) {
                    clearInterval(t);
                    setTimeout(() => { nextVillage(); }, ms + Math.floor(Math.random() * msRange * 4));
                }
                $(links[i++]).click();
            },
            ms + Math.floor(Math.random() * msRange)
        );
    }

    function nextVillage() {
        var arrowRight = $("a#village_switch_right")[0];
        arrowRight.click();
    }

    useWithdrawalScript();
    setTimeout(() => { withdraw(); }, 1400);
})();