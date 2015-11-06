function saveToLocalStorage(key, value, stringify) {
	var value = stringify ? JSON.stringify(value) : value;
	localStorage.setItem(key, value);
};

function getFromLocalStorage(key, parse, defaultValue) {
	var value = localStorage.getItem(key);

    if ('undefined' == value) {
        return defaultValue;
    }

	value = parse && value ? JSON.parse(value) : value;

	return value ? value : defaultValue;
};

function removeFromLocalStorage(key) {
    localStorage.removeItem(key);
};