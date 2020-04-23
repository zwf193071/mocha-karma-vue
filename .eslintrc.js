// https://eslint.org/docs/user-guide/configuring
module.exports = {
    //默认情况下，ESLint 会在所有父级目录里寻找配置文件，一直到根目录。如果你想要你所有项目都遵循一个特定的约定时，这将会很有用，但有时候会导致意想不到的结果。为了将 ESLint 限制到一个特定的项目，在你项目根目录下的 package.json 文件或者 .eslintrc.* 文件里的 eslintConfig 字段下设置 "root": true。ESLint 一旦发现配置文件中有 "root": true，它就会停止在父级目录中寻找。
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    env: {
        browser: true,
    },
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    extends: 'standard',
    // required to lint *.vue files
    plugins: [
        'html'
    ],
    // add your custom rules here
    'rules': {
        "strict": 2,
		"no-const-assign": 2,
		"no-dupe-keys": 2,
		"no-duplicate-case": 2,
		"no-else-return": 2,
		"no-empty": 2,
		"no-extra-parens": 2,
		"no-extra-semi": 2,
		"no-irregular-whitespace": 2,
		"no-mixed-spaces-and-tabs": [2, false],
		"no-multi-spaces": 1,
		"no-multiple-empty-lines": [1, {"max": 2}],
		"no-trailing-spaces": 1,
		"no-underscore-dangle": 1,
		"no-unreachable": 2,
		"no-unused-expressions": 2,
		"no-unused-vars": [2, {"vars": "all", "args": "after-used"}],
		"no-use-before-define": 2,
		"no-var": 0,
		"no-tabs": 0,
		"comma-spacing": [2, {"before": false, "after": true}],
		"comma-style": [2, "last"],
		"eol-last": 0,
		"eqeqeq": 2,
		"indent": 0,
		"prefer-const": 0,
		"semi": [2, "always"],
		"quotes": [1, "single"],
		"quote-props":[2, "as-needed"],
		"semi-spacing": [0, {"before": false, "after": true}],
        "valid-typeof": 2,
		"brace-style": [2, "1tbs"],
		"vue/no-use-v-if-with-v-for": 0,
		"no-control-regex": 0,
        // "vue/no-parsing-error": [2, { "x-invalid-end-tag": false }]
    }
}
