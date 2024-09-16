module.exports = {
    format_date: (date) => {
        // Check if the date is valid before formatting
        if (!date) {
            return '';
        }
        return date.toLocaleDateString();
    },
    get_emoji: () => {
        const randomNum = Math.random();
        if (randomNum > 0.7) {
            return `<span for="img" aria-label="gear">⚙️</span>`;
        } else if (randomNum > 0.4) {
            return `<span for="img" aria-label="gear">⚙️</span>`;
        } else {
            return `<span for="img" aria-label="gear">⚙️</span>`;
        }
    },
};
