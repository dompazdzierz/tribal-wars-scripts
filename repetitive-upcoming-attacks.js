// ==UserScript==
// @name          TWRepetitiveUpcomingAttacks
// @version       0.3
// @author        szelbi, CBA*
// @include       https://pl*.plemiona.pl/game.php?*subtype=attacks*
// @grant         none
// ==/UserScript==

(function () {
    "use strict";

    let villagesArray = [];
    let tableRowDataArray = [];

    class Village {
        constructor(coords, attacksIncoming) {
            this._coords = coords;
            this._attacksIncoming = attacksIncoming;
        }

        get coords() {
            return this._coords;
        }

        set coords(coords) {
            this._coords = coords;
        }

        get attacksIncoming() {
            return this._attacksIncoming;
        }

        set attacksIncoming(attacksIncoming) {
            this._attacksIncoming = attacksIncoming;
        }
    }

    function emptyArray(array) {
        array.length = 0;
    }

    function insertAfter(newNode, referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }

    function findVillageByCoords(coords) {
        return villagesArray.find((e) => e.coords === coords);
    }

    function getVillageCoordsFromName(name) {
        return name.match(/(?:\()(\d{3}\|\d{3})(?:\)\s\K\d{2})$/)[1];
    }

    function getIncomingsTableRows() {
        return document.querySelectorAll("#incomings_table > tbody > tr");
    }

    function getIncomingsData() {
        emptyArray(villagesArray);
        fillTableRowDataArray();

        for (const data of tableRowDataArray) {
            const coords = getVillageCoordsFromName(data[2].innerText);
            const village = findVillageByCoords(coords);
            if (village) {
                village.attacksIncoming++;
            } else {
                villagesArray.push(new Village(coords, 1));
            }
        }
    }

    function fillTableRowDataArray() {
        emptyArray(tableRowDataArray);

        const tableRows = getIncomingsTableRows();
        if (tableRows.length) {
            for (let i = 1; i < tableRows.length - 1; i++) {
                const data = tableRows[i].querySelectorAll("td");
                tableRowDataArray.push(data);
            }
        }
    }


    function addColumn() {
        getIncomingsData();

        const tableRows = getIncomingsTableRows();

        if (tableRows.length) {
            for (let i = 0; i < tableRows.length - 1; i++) {
                const data = tableRows[i].querySelectorAll("th, td");

                if (data.length) {
                    const previousElement = data[2];

                    if (previousElement.tagName == "TD") {
                        const column = document.createElement("td");
                        const coords = getVillageCoordsFromName(previousElement.innerText);

                        const village = findVillageByCoords(coords);
                        if (village) {
                            column.innerText = village.attacksIncoming;
                        }

                        insertAfter(column, previousElement);
                    } else if (previousElement.tagName == "TH") {
                        const header = document.createElement("th");
                        header.innerText = "Liczba ataków";
                        insertAfter(header, previousElement);
                    }
                }
            }
            const lastRowHeaders = tableRows[tableRows.length - 1].querySelectorAll(
                "th"
            );
            lastRowHeaders[lastRowHeaders.length - 1].colSpan += 1;
        }
    }

    addColumn();
})();
