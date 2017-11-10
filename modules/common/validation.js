module.exports = {
    phone(v) {
        return /1[3|5|8]\d{9}/.test(v);
    }
};