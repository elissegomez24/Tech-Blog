module.exports = {
    format_date: (date) => {
        // Check if the date is valid before formatting
        if (!date) {
            return '';
        }
        return date.toLocaleDateString();
    },
};
