var utils = utils || {};

utils = {
    /**
     * Formats digits (eg. 1 to 01)
     *
     * @param digit {number} to format
     * @returns {string} formatted digit
     */
    formatDigit: function (digit) {
        if (String(digit).length === 1) digit = "0" + digit;
        return digit;
    }
};