// utils/dateUtils.js
export const formatDate = (date, locale = 'en') => {
    if (!date) return 'TBA';

    const d = new Date(date);

    if (locale.startsWith("vi")) {
        return `${d.getDate()} Tháng ${d.getMonth() + 1}, ${d.getFullYear()}`;
    }

    return d.toLocaleDateString(locale, {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
};

// Format for short display (like in cards)
export const formatShortDate = (date, locale = 'en') => {
    if (!date) return 'TBA';

    const d = new Date(date);

    if (locale.startsWith("vi")) {
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    }

    return d.toLocaleDateString(locale, {
        month: "short",
        day: "numeric",
        year: "numeric"
    });
};

// Just get year
export const getYear = (date) => {
    if (!date) return '';
    return new Date(date).getFullYear();
};