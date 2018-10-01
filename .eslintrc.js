module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "jest": true,
        "es6": true
    },
    "parserOptions": {
        "sourceType": "module",
        "ecmaVersion": 8,
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true
        }
    },
    "extends": ["eslint:recommended", "google"],
    "rules": {

    }
};