class Env {

    static getValueOrDefault(key, defaultValue = null) {
        const keys = [key, key.toUpperCase(), key.toLowerCase()];

        const foundKey = keys.find(searchKey => process.env[searchKey] !== undefined);
        const value = process.env[foundKey];

        if (value) {
            return value.toLowerCase();
        }
        return defaultValue;
    }

}

module.exports = Env;
