function friendly(str) {
    var rangeBegin = str[0].split("-").map(parseIntDate),
        rangeEnd = str[1].split("-").map(parseIntDate),
        monthsNames = {
            1: "January",
            2: "February",
            3: "March",
            4: "April",
            5: "May",
            6: "June",
            7: "July",
            8: "August",
            9: "September",
            10: "October",
            11: "November",
            12: "December"
        };

    str = getFriendlyRange();

    return str;

    function parseIntDate(date) {
        return parseInt(date, 10);
    }

    function getOrdinalDate(date) {
        var suffix = "";
        if (date < 10 || date > 20) {
            switch (date % 10) {
                case 1:
                    suffix = "st";
                    break;
                case 2:
                    suffix = "nd";
                    break;
                case 3:
                    suffix = "rd";
                    break;
                default:
                    suffix = "th";
            }
        } else {
            suffix = "th";
        }
        return date + suffix;
    }

    function getFriendlyRange() {
        var frendlyRange = [],
            today = new Date(),
            currentYear = today.getFullYear(),
            currentMonth = today.getMonth(),
            currentDate = today.getDate(),
            beginFrendlyYear,
            beginFrendlyMonth,
            beginFrendlyDate = rangeBegin[2],
            endFrendlyYear,
            endFrendlyMonth,
            endFrendlyDate = rangeEnd[2];

        // Set years
        if (rangeBegin[0] !== currentYear) { // When range doesn't begin in current year
            if (rangeEnd[1] <= rangeBegin[1]) {
                beginFrendlyYear = rangeBegin[0];
            }
            endFrendlyYear = rangeEnd[0];
        } else {
            if ((rangeEnd[0] - rangeBegin[0]) === 1 && rangeEnd[1] > rangeBegin[1]) {
                endFrendlyYear = rangeEnd[0];
            } else if ((rangeEnd[0] - rangeBegin[0]) > 1) {
                beginFrendlyYear = rangeBegin[0];
                endFrendlyYear = rangeEnd[0];
            }
        }

        // Set months
        if (rangeEnd[1] !== rangeBegin[1] || (rangeEnd[1] === rangeBegin[1] && rangeEnd[0] !== rangeBegin[0])) {
            endFrendlyMonth = rangeEnd[1];
        }

        beginFrendlyMonth = monthsNames[rangeBegin[1]] + " ";
        beginFrendlyYear = beginFrendlyYear ? ", " + beginFrendlyYear : "";
        endFrendlyYear = endFrendlyYear ? ", " + endFrendlyYear : "";
        endFrendlyMonth = endFrendlyMonth ? monthsNames[rangeEnd[1]] + " " : "";

        frendlyRange[0] = beginFrendlyMonth + getOrdinalDate(beginFrendlyDate)  + beginFrendlyYear;

        if (str[0] !== str[1]) {
            frendlyRange[1] = endFrendlyMonth + getOrdinalDate(endFrendlyDate)  + endFrendlyYear;
        }
        return frendlyRange;
    }
}

console.log(friendly(['2015-07-01', '2015-07-04']) + " = " + "[ 'July 1st', '4th' ]"); // 1
console.log(friendly(['2015-12-01', '2016-02-03']) + " = " + "['December 1st','February 3rd']"); // 2
console.log(friendly(['2015-12-01', '2017-02-03']) + " = " + "['December 1st, 2015','February 3rd, 2017']"); // 3
console.log(friendly(['2016-03-01', '2016-05-05']) + " = " + "[ 'March 1st', 'May 5th, 2016' ]"); // 4
console.log(friendly(['2017-01-01', '2017-01-01']) + " = " + "['January 1st, 2017']"); // 5
console.log(friendly(['2022-09-05', '2023-09-04']) + " = " + "['September 5th, 2022','September 4th, 2023']"); // 5
