module.exports = {
    env: {
        es2021: true,
        node: true
    },
    extends: [
        "airbnb-base",
    ],
    parser: "@babel/eslint-parser",
    parserOptions: {
        ecmaVersion: 12,
        sourceType: "module"
    },
    rules: {
        "sort-imports":
        [
            "error",
            {
                ignoreCase: true,
                ignoreDeclarationSort: true
            }
        ],
        "import/order": [ "error", {
            groups: ["builtin", "external", "internal", "parent", "sibling", "index", "object", "type"],
            "newlines-between": "always"
        }]
    }
}
