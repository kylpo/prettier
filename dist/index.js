'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var os = _interopDefault(require('os'));
var fs = _interopDefault(require('fs'));
var path = _interopDefault(require('path'));
var util = _interopDefault(require('util'));
var url = _interopDefault(require('url'));
var assert = _interopDefault(require('assert'));
var thirdParty = require('./third-party');
var thirdParty__default = thirdParty['default'];

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
}

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var detectNewline = createCommonjsModule(function (module) {
'use strict';
module.exports = function (str) {
	if (typeof str !== 'string') {
		throw new TypeError('Expected a string');
	}

	var newlines = (str.match(/(?:\r?\n)/g) || []);

	if (newlines.length === 0) {
		return null;
	}

	var crlf = newlines.filter(function (el) {
		return el === '\r\n';
	}).length;

	var lf = newlines.length - crlf;

	return crlf > lf ? '\r\n' : '\n';
};

module.exports.graceful = function (str) {
	return module.exports(str) || '\n';
};
});

var build = createCommonjsModule(function (module, exports) {
'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.






















extract = extract;exports.




strip = strip;exports.




parse = parse;exports.





parseWithComments = parseWithComments;exports.































print = print;var _detectNewline;function _load_detectNewline() {return _detectNewline = _interopRequireDefault(detectNewline);}var _os;function _load_os() {return _os = os;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                                                                                                                                                                                    * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
                                                                                                                                                                                                                                                                                                    *
                                                                                                                                                                                                                                                                                                    * This source code is licensed under the MIT license found in the
                                                                                                                                                                                                                                                                                                    * LICENSE file in the root directory of this source tree.
                                                                                                                                                                                                                                                                                                    *
                                                                                                                                                                                                                                                                                                    * 
                                                                                                                                                                                                                                                                                                    */const commentEndRe = /\*\/$/;const commentStartRe = /^\/\*\*/;const docblockRe = /^\s*(\/\*\*?(.|\r?\n)*?\*\/)/;const lineCommentRe = /(^|\s+)\/\/([^\r\n]*)/g;const ltrimRe = /^\s*/;const rtrimRe = /\s*$/;const ltrimNewlineRe = /^(\r?\n)+/;const multilineRe = /(?:^|\r?\n) *(@[^\r\n]*?) *\r?\n *(?![^@\r\n]*\/\/[^]*)([^@\r\n\s][^@\r\n]+?) *\r?\n/g;const propertyRe = /(?:^|\r?\n) *@(\S+) *([^\r\n]*)/g;const stringStartRe = /(\r?\n|^) *\* ?/g;function extract(contents) {const match = contents.match(docblockRe);return match ? match[0].replace(ltrimRe, '') || '' : '';}function strip(contents) {const match = contents.match(docblockRe);return match && match[0] ? contents.substring(match[0].length) : contents;}function parse(docblock) {return parseWithComments(docblock).pragmas;}function parseWithComments(docblock) {const line = (0, (_detectNewline || _load_detectNewline()).default)(docblock) || (_os || _load_os()).EOL;docblock = docblock.replace(commentStartRe, '').replace(commentEndRe, '').replace(stringStartRe, '$1'); // Normalize multi-line directives
  let prev = '';while (prev !== docblock) {prev = docblock;docblock = docblock.replace(multilineRe, `${line}$1 $2${line}`);}docblock = docblock.replace(ltrimNewlineRe, '').replace(rtrimRe, '');const result = Object.create(null);const comments = docblock.replace(propertyRe, '').replace(ltrimNewlineRe, '').replace(rtrimRe, '');let match;while (match = propertyRe.exec(docblock)) {// strip linecomments from pragmas
    result[match[1]] = match[2].replace(lineCommentRe, '');}return { comments, pragmas: result };}function print(_ref) {var _ref$comments = _ref.comments;let comments = _ref$comments === undefined ? '' : _ref$comments;var _ref$pragmas = _ref.pragmas;let pragmas = _ref$pragmas === undefined ? {} : _ref$pragmas;const line = (0, (_detectNewline || _load_detectNewline()).default)(comments) || (_os || _load_os()).EOL;const head = '/**';
  const start = ' *';
  const tail = ' */';

  const keys = Object.keys(pragmas);

  const printedObject = keys.
  map(key => start + ' ' + printKeyValue(key, pragmas[key]) + line).
  join('');

  if (!comments) {
    if (keys.length === 0) {
      return '';
    }
    if (keys.length === 1) {
      return `${head} ${printKeyValue(keys[0], pragmas[keys[0]])}${tail}`;
    }
  }

  const printedComments =
  comments.
  split(line).
  map(textLine => `${start} ${textLine}`).
  join(line) + line;

  return (
    head +
    line + (
    comments ? printedComments : '') + (
    comments && keys.length ? start + line : '') +
    printedObject +
    tail);

}

function printKeyValue(key, value) {
  return `@${key} ${value}`.trim();
}
});

unwrapExports(build);

var name = "prettier";
var version$1 = "1.10.2";
var description = "Prettier is an opinionated code formatter";
var bin = {"prettier":"./bin/prettier.js"};
var repository = "prettier/prettier";
var homepage = "https://prettier.io";
var author = "James Long";
var license = "MIT";
var main = "./index.js";
var engines = {"node":">=4"};
var dependencies = {"@babel/code-frame":"7.0.0-beta.35","@glimmer/syntax":"0.30.3","babylon":"7.0.0-beta.34","camelcase":"4.1.0","chalk":"2.1.0","cjk-regex":"1.0.2","cosmiconfig":"3.1.0","dashify":"0.2.2","dedent":"0.7.0","diff":"3.2.0","editorconfig":"0.14.2","editorconfig-to-prettier":"0.0.6","emoji-regex":"6.5.1","escape-string-regexp":"1.0.5","esutils":"2.0.2","find-project-root":"1.1.1","flow-parser":"0.59.0","get-stream":"3.0.0","globby":"6.1.0","graphql":"0.12.3","ignore":"3.3.7","jest-docblock":"21.3.0-beta.11","leven":"2.1.0","mem":"1.1.0","minimatch":"3.0.4","minimist":"1.2.0","parse5":"3.0.3","postcss-less":"1.1.3","postcss-media-query-parser":"0.2.3","postcss-scss":"1.0.2","postcss-selector-parser":"2.2.3","postcss-values-parser":"1.3.1","read-pkg-up":"3.0.0","remark-frontmatter":"1.1.0","remark-parse":"4.0.0","resolve":"1.5.0","semver":"5.4.1","string-width":"2.1.1","typescript":"2.7.0-insiders.20171214","typescript-eslint-parser":"11.0.0","unicode-regex":"1.0.1","unified":"6.1.6"};
var devDependencies = {"babel-cli":"6.24.1","babel-preset-es2015":"6.24.1","codecov":"2.2.0","cross-env":"5.0.5","eslint":"4.1.1","eslint-config-prettier":"2.9.0","eslint-friendly-formatter":"3.0.0","eslint-plugin-import":"2.6.1","eslint-plugin-prettier":"2.4.0","eslint-plugin-react":"7.1.0","jest":"21.1.0","mkdirp":"0.5.1","prettier":"1.10.2","prettylint":"1.0.0","rimraf":"2.6.2","rollup":"0.47.6","rollup-plugin-commonjs":"8.2.6","rollup-plugin-json":"2.1.1","rollup-plugin-node-builtins":"2.0.0","rollup-plugin-node-globals":"1.1.0","rollup-plugin-node-resolve":"2.0.0","rollup-plugin-replace":"1.2.1","shelljs":"0.7.8","snapshot-diff":"0.2.2","strip-ansi":"4.0.0","sw-toolbox":"3.6.0","tempy":"0.2.1","uglify-es":"3.0.28","webpack":"2.6.1"};
var scripts = {"prepublishOnly":"echo \"Error: must publish from dist/\" && exit 1","prepare-release":"yarn && yarn build && yarn test:dist","test":"jest","test:dist":"node ./scripts/test-dist.js","test-integration":"jest tests_integration","lint":"cross-env EFF_NO_LINK_RULES=true eslint . --format node_modules/eslint-friendly-formatter","lint-docs":"prettylint {.,docs,website,website/blog}/*.md","build":"node ./scripts/build/build.js","build-docs":"node ./scripts/build/build-docs.js","check-deps":"node ./scripts/check-deps.js"};
var _package = {
	name: name,
	version: version$1,
	description: description,
	bin: bin,
	repository: repository,
	homepage: homepage,
	author: author,
	license: license,
	main: main,
	engines: engines,
	dependencies: dependencies,
	devDependencies: devDependencies,
	scripts: scripts
};

var _package$1 = Object.freeze({
	name: name,
	version: version$1,
	description: description,
	bin: bin,
	repository: repository,
	homepage: homepage,
	author: author,
	license: license,
	main: main,
	engines: engines,
	dependencies: dependencies,
	devDependencies: devDependencies,
	scripts: scripts,
	default: _package
});

var ansiRegex = createCommonjsModule(function (module) {
'use strict';

module.exports = () => {
	const pattern = [
		'[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[a-zA-Z\\d]*)*)?\\u0007)',
		'(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PRZcf-ntqry=><~]))'
	].join('|');

	return new RegExp(pattern, 'g');
};
});

var stripAnsi = input => typeof input === 'string' ? input.replace(ansiRegex(), '') : input;

var isFullwidthCodePoint = createCommonjsModule(function (module) {
'use strict';
/* eslint-disable yoda */
module.exports = x => {
	if (Number.isNaN(x)) {
		return false;
	}

	// code points are derived from:
	// http://www.unix.org/Public/UNIDATA/EastAsianWidth.txt
	if (
		x >= 0x1100 && (
			x <= 0x115f ||  // Hangul Jamo
			x === 0x2329 || // LEFT-POINTING ANGLE BRACKET
			x === 0x232a || // RIGHT-POINTING ANGLE BRACKET
			// CJK Radicals Supplement .. Enclosed CJK Letters and Months
			(0x2e80 <= x && x <= 0x3247 && x !== 0x303f) ||
			// Enclosed CJK Letters and Months .. CJK Unified Ideographs Extension A
			(0x3250 <= x && x <= 0x4dbf) ||
			// CJK Unified Ideographs .. Yi Radicals
			(0x4e00 <= x && x <= 0xa4c6) ||
			// Hangul Jamo Extended-A
			(0xa960 <= x && x <= 0xa97c) ||
			// Hangul Syllables
			(0xac00 <= x && x <= 0xd7a3) ||
			// CJK Compatibility Ideographs
			(0xf900 <= x && x <= 0xfaff) ||
			// Vertical Forms
			(0xfe10 <= x && x <= 0xfe19) ||
			// CJK Compatibility Forms .. Small Form Variants
			(0xfe30 <= x && x <= 0xfe6b) ||
			// Halfwidth and Fullwidth Forms
			(0xff01 <= x && x <= 0xff60) ||
			(0xffe0 <= x && x <= 0xffe6) ||
			// Kana Supplement
			(0x1b000 <= x && x <= 0x1b001) ||
			// Enclosed Ideographic Supplement
			(0x1f200 <= x && x <= 0x1f251) ||
			// CJK Unified Ideographs Extension B .. Tertiary Ideographic Plane
			(0x20000 <= x && x <= 0x3fffd)
		)
	) {
		return true;
	}

	return false;
};
});

var stringWidth = createCommonjsModule(function (module) {
'use strict';



module.exports = str => {
	if (typeof str !== 'string' || str.length === 0) {
		return 0;
	}

	str = stripAnsi(str);

	let width = 0;

	for (let i = 0; i < str.length; i++) {
		const code = str.codePointAt(i);

		// Ignore control characters
		if (code <= 0x1F || (code >= 0x7F && code <= 0x9F)) {
			continue;
		}

		// Ignore combining characters
		if (code >= 0x300 && code <= 0x36F) {
			continue;
		}

		// Surrogates
		if (code > 0xFFFF) {
			i++;
		}

		width += isFullwidthCodePoint(code) ? 2 : 1;
	}

	return width;
};
});

var emojiRegex$1 = function () {
	// https://mathiasbynens.be/notes/es-unicode-property-escapes#emoji
	return (/\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74)\uDB40\uDC7F|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC68(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|[\u2695\u2696\u2708]\uFE0F|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92])|(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]\uFE0F|(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]))|\uD83D\uDC69\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92])|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|(?:(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)\uFE0F|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDD6-\uDDDD])(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\u200D[\u2640\u2642])|\uD83D\uDC69\u200D[\u2695\u2696\u2708])\uFE0F|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC68(?:\u200D(?:(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D[\uDC66\uDC67])|\uD83C[\uDFFB-\uDFFF])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92])|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83C\uDDF4\uD83C\uDDF2|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF6\uD83C\uDDE6|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDD1-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC69\uDC6E\uDC70-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD26\uDD30-\uDD39\uDD3D\uDD3E\uDDD1-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])?|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDEEB\uDEEC\uDEF4-\uDEF8]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD4C\uDD50-\uDD6B\uDD80-\uDD97\uDDC0\uDDD0-\uDDE6])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267B\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEF8]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD4C\uDD50-\uDD6B\uDD80-\uDD97\uDDC0\uDDD0-\uDDE6])\uFE0F/g
	);
};

var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;

var escapeStringRegexp = function (str) {
	if (typeof str !== 'string') {
		throw new TypeError('Expected a string');
	}

	return str.replace(matchOperatorsRe, '\\$&');
};

var punctuation_ranges = [
    // http://www.unicode.org/charts/PDF/U3000.pdf CJK Symbols and Punctuation
    [0x3000, 0x303f],
    // http://www.unicode.org/charts/PDF/UAC00.pdf Hangul Syllables
    [0xac00, 0xd7af],
    // http://www.unicode.org/charts/PDF/UFE10.pdf Vertical Forms
    [0xfe10, 0xfe1f],
    // http://www.unicode.org/charts/PDF/UFE30.pdf CJK Compatibility Forms
    // http://www.unicode.org/charts/PDF/UFE50.pdf Small Form Variants
    [0xfe30, 0xfe6f],
    // http://www.unicode.org/charts/PDF/UFF00.pdf Halfwidth and Fullwidth Forms
    [0xff00, 0xff60],
    [0xffe0, 0xffef],
];
var character_ranges = [
    // http://www.unicode.org/charts/PDF/U1100.pdf Hangul Jamo
    [0x1100, 0x11ff],
    // http://www.unicode.org/charts/PDF/U2E80.pdf CJK Radicals Supplement
    // http://www.unicode.org/charts/PDF/U2F00.pdf Kangxi Radicals
    [0x2e80, 0x2fdf],
    // http://www.unicode.org/charts/PDF/U3040.pdf Hiragana
    // http://www.unicode.org/charts/PDF/U30A0.pdf Katakana
    // http://www.unicode.org/charts/PDF/U3100.pdf Bopomofo
    // http://www.unicode.org/charts/PDF/U3130.pdf Hangul Compatibility Jamo
    [0x3040, 0x318f],
    // http://www.unicode.org/charts/PDF/U3200.pdf Enclosed CJK Letters and Months
    // http://www.unicode.org/charts/PDF/U3300.pdf CJK Compatibility
    // http://www.unicode.org/charts/PDF/U3400.pdf CJK Unified Ideographs Extension A
    [0x3200, 0x4dbf],
    // http://www.unicode.org/charts/PDF/U4E00.pdf CJK Unified Ideographs (Han)
    [0x4e00, 0x9fff],
    // http://www.unicode.org/charts/PDF/UA960.pdf Hangul Jamo Extended-A
    [0xa960, 0xa97f],
    // http://www.unicode.org/charts/PDF/UF900.pdf CJK Compatibility Ideographs
    [0xf900, 0xfaff],
];
function get_regex() {
    return create_regex(character_ranges.concat(punctuation_ranges));
}
// istanbul ignore next
// tslint:disable-next-line:no-namespace
(function (get_regex) {
    function punctuations() {
        return create_regex(punctuation_ranges);
    }
    get_regex.punctuations = punctuations;
    function characters() {
        return create_regex(character_ranges);
    }
    get_regex.characters = characters;
})(get_regex || (get_regex = {}));
function create_regex(ranges) {
    return new RegExp("[" + ranges.map(get_bracket_content).reduce(function (a, b) { return a + b; }) + "]", 'g');
}
function get_bracket_content(range) {
    return get_escaped_unicode(range[0]) + "-" + get_escaped_unicode(range[1]);
}
function get_escaped_unicode(num) {
    return "\\u" + num.toString(16);
}
var lib = get_regex;

var data_generated = createCommonjsModule(function (module, exports) {
"use strict";
exports.__esModule = true;
exports.get_data = function () { return ({ "Pc": [[95, 95], [8255, 8256], [8276, 8276], [65075, 65076], [65101, 65103], [65343, 65343]], "Pe": [[41, 41], [93, 93], [125, 125], [3899, 3899], [3901, 3901], [5788, 5788], [8262, 8262], [8318, 8318], [8334, 8334], [8969, 8969], [8971, 8971], [9002, 9002], [10089, 10089], [10091, 10091], [10093, 10093], [10095, 10095], [10097, 10097], [10099, 10099], [10101, 10101], [10182, 10182], [10215, 10215], [10217, 10217], [10219, 10219], [10221, 10221], [10223, 10223], [10628, 10628], [10630, 10630], [10632, 10632], [10634, 10634], [10636, 10636], [10638, 10638], [10640, 10640], [10642, 10642], [10644, 10644], [10646, 10646], [10648, 10648], [10713, 10713], [10715, 10715], [10749, 10749], [11811, 11811], [11813, 11813], [11815, 11815], [11817, 11817], [12297, 12297], [12299, 12299], [12301, 12301], [12303, 12303], [12305, 12305], [12309, 12309], [12311, 12311], [12313, 12313], [12315, 12315], [12318, 12319], [64830, 64830], [65048, 65048], [65078, 65078], [65080, 65080], [65082, 65082], [65084, 65084], [65086, 65086], [65088, 65088], [65090, 65090], [65092, 65092], [65096, 65096], [65114, 65114], [65116, 65116], [65118, 65118], [65289, 65289], [65341, 65341], [65373, 65373], [65376, 65376], [65379, 65379]], "Ps": [[40, 40], [91, 91], [123, 123], [3898, 3898], [3900, 3900], [5787, 5787], [8218, 8218], [8222, 8222], [8261, 8261], [8317, 8317], [8333, 8333], [8968, 8968], [8970, 8970], [9001, 9001], [10088, 10088], [10090, 10090], [10092, 10092], [10094, 10094], [10096, 10096], [10098, 10098], [10100, 10100], [10181, 10181], [10214, 10214], [10216, 10216], [10218, 10218], [10220, 10220], [10222, 10222], [10627, 10627], [10629, 10629], [10631, 10631], [10633, 10633], [10635, 10635], [10637, 10637], [10639, 10639], [10641, 10641], [10643, 10643], [10645, 10645], [10647, 10647], [10712, 10712], [10714, 10714], [10748, 10748], [11810, 11810], [11812, 11812], [11814, 11814], [11816, 11816], [11842, 11842], [12296, 12296], [12298, 12298], [12300, 12300], [12302, 12302], [12304, 12304], [12308, 12308], [12310, 12310], [12312, 12312], [12314, 12314], [12317, 12317], [64831, 64831], [65047, 65047], [65077, 65077], [65079, 65079], [65081, 65081], [65083, 65083], [65085, 65085], [65087, 65087], [65089, 65089], [65091, 65091], [65095, 65095], [65113, 65113], [65115, 65115], [65117, 65117], [65288, 65288], [65339, 65339], [65371, 65371], [65375, 65375], [65378, 65378]], "Lm": [[688, 705], [710, 721], [736, 740], [748, 748], [750, 750], [884, 884], [890, 890], [1369, 1369], [1600, 1600], [1765, 1766], [2036, 2037], [2042, 2042], [2074, 2074], [2084, 2084], [2088, 2088], [2417, 2417], [3654, 3654], [3782, 3782], [4348, 4348], [6103, 6103], [6211, 6211], [6823, 6823], [7288, 7293], [7468, 7530], [7544, 7544], [7579, 7615], [8305, 8305], [8319, 8319], [8336, 8348], [11388, 11389], [11631, 11631], [11823, 11823], [12293, 12293], [12337, 12341], [12347, 12347], [12445, 12446], [12540, 12542], [40981, 40981], [42232, 42237], [42508, 42508], [42623, 42623], [42652, 42653], [42775, 42783], [42864, 42864], [42888, 42888], [43000, 43001], [43471, 43471], [43494, 43494], [43632, 43632], [43741, 43741], [43763, 43764], [43868, 43871], [65392, 65392], [65438, 65439]], "Mc": [[2307, 2307], [2363, 2363], [2366, 2368], [2377, 2380], [2382, 2383], [2434, 2435], [2494, 2496], [2503, 2504], [2507, 2508], [2519, 2519], [2563, 2563], [2622, 2624], [2691, 2691], [2750, 2752], [2761, 2761], [2763, 2764], [2818, 2819], [2878, 2878], [2880, 2880], [2887, 2888], [2891, 2892], [2903, 2903], [3006, 3007], [3009, 3010], [3014, 3016], [3018, 3020], [3031, 3031], [3073, 3075], [3137, 3140], [3202, 3203], [3262, 3262], [3264, 3268], [3271, 3272], [3274, 3275], [3285, 3286], [3330, 3331], [3390, 3392], [3398, 3400], [3402, 3404], [3415, 3415], [3458, 3459], [3535, 3537], [3544, 3551], [3570, 3571], [3902, 3903], [3967, 3967], [4139, 4140], [4145, 4145], [4152, 4152], [4155, 4156], [4182, 4183], [4194, 4196], [4199, 4205], [4227, 4228], [4231, 4236], [4239, 4239], [4250, 4252], [6070, 6070], [6078, 6085], [6087, 6088], [6435, 6438], [6441, 6443], [6448, 6449], [6451, 6456], [6681, 6682], [6741, 6741], [6743, 6743], [6753, 6753], [6755, 6756], [6765, 6770], [6916, 6916], [6965, 6965], [6971, 6971], [6973, 6977], [6979, 6980], [7042, 7042], [7073, 7073], [7078, 7079], [7082, 7082], [7143, 7143], [7146, 7148], [7150, 7150], [7154, 7155], [7204, 7211], [7220, 7221], [7393, 7393], [7410, 7411], [7415, 7415], [12334, 12335], [43043, 43044], [43047, 43047], [43136, 43137], [43188, 43203], [43346, 43347], [43395, 43395], [43444, 43445], [43450, 43451], [43453, 43456], [43567, 43568], [43571, 43572], [43597, 43597], [43643, 43643], [43645, 43645], [43755, 43755], [43758, 43759], [43765, 43765], [44003, 44004], [44006, 44007], [44009, 44010], [44012, 44012]], "Zp": [[8233, 8233]], "Sc": [[36, 36], [162, 165], [1423, 1423], [1547, 1547], [2546, 2547], [2555, 2555], [2801, 2801], [3065, 3065], [3647, 3647], [6107, 6107], [8352, 8383], [43064, 43064], [65020, 65020], [65129, 65129], [65284, 65284], [65504, 65505], [65509, 65510]], "Me": [[1160, 1161], [6846, 6846], [8413, 8416], [8418, 8420], [42608, 42610]], "Sk": [[94, 94], [96, 96], [168, 168], [175, 175], [180, 180], [184, 184], [706, 709], [722, 735], [741, 747], [749, 749], [751, 767], [885, 885], [900, 901], [8125, 8125], [8127, 8129], [8141, 8143], [8157, 8159], [8173, 8175], [8189, 8190], [12443, 12444], [42752, 42774], [42784, 42785], [42889, 42890], [43867, 43867], [64434, 64449], [65342, 65342], [65344, 65344], [65507, 65507]], "Cs": [[55296, 55296], [56191, 56192], [56319, 56320], [57343, 57343]], "Nl": [[5870, 5872], [8544, 8578], [8581, 8584], [12295, 12295], [12321, 12329], [12344, 12346], [42726, 42735]], "So": [[166, 166], [169, 169], [174, 174], [176, 176], [1154, 1154], [1421, 1422], [1550, 1551], [1758, 1758], [1769, 1769], [1789, 1790], [2038, 2038], [2554, 2554], [2928, 2928], [3059, 3064], [3066, 3066], [3199, 3199], [3407, 3407], [3449, 3449], [3841, 3843], [3859, 3859], [3861, 3863], [3866, 3871], [3892, 3892], [3894, 3894], [3896, 3896], [4030, 4037], [4039, 4044], [4046, 4047], [4053, 4056], [4254, 4255], [5008, 5017], [6464, 6464], [6622, 6655], [7009, 7018], [7028, 7036], [8448, 8449], [8451, 8454], [8456, 8457], [8468, 8468], [8470, 8471], [8478, 8483], [8485, 8485], [8487, 8487], [8489, 8489], [8494, 8494], [8506, 8507], [8522, 8522], [8524, 8525], [8527, 8527], [8586, 8587], [8597, 8601], [8604, 8607], [8609, 8610], [8612, 8613], [8615, 8621], [8623, 8653], [8656, 8657], [8659, 8659], [8661, 8691], [8960, 8967], [8972, 8991], [8994, 9000], [9003, 9083], [9085, 9114], [9140, 9179], [9186, 9254], [9280, 9290], [9372, 9449], [9472, 9654], [9656, 9664], [9666, 9719], [9728, 9838], [9840, 10087], [10132, 10175], [10240, 10495], [11008, 11055], [11077, 11078], [11085, 11123], [11126, 11157], [11160, 11193], [11197, 11208], [11210, 11218], [11244, 11247], [11493, 11498], [11904, 11929], [11931, 12019], [12032, 12245], [12272, 12283], [12292, 12292], [12306, 12307], [12320, 12320], [12342, 12343], [12350, 12351], [12688, 12689], [12694, 12703], [12736, 12771], [12800, 12830], [12842, 12871], [12880, 12880], [12896, 12927], [12938, 12976], [12992, 13054], [13056, 13311], [19904, 19967], [42128, 42182], [43048, 43051], [43062, 43063], [43065, 43065], [43639, 43641], [65021, 65021], [65508, 65508], [65512, 65512], [65517, 65518], [65532, 65533]], "Lt": [[453, 453], [456, 456], [459, 459], [498, 498], [8072, 8079], [8088, 8095], [8104, 8111], [8124, 8124], [8140, 8140], [8188, 8188]], "Zl": [[8232, 8232]], "Lo": [[170, 170], [186, 186], [443, 443], [448, 451], [660, 660], [1488, 1514], [1520, 1522], [1568, 1599], [1601, 1610], [1646, 1647], [1649, 1747], [1749, 1749], [1774, 1775], [1786, 1788], [1791, 1791], [1808, 1808], [1810, 1839], [1869, 1957], [1969, 1969], [1994, 2026], [2048, 2069], [2112, 2136], [2144, 2154], [2208, 2228], [2230, 2237], [2308, 2361], [2365, 2365], [2384, 2384], [2392, 2401], [2418, 2432], [2437, 2444], [2447, 2448], [2451, 2472], [2474, 2480], [2482, 2482], [2486, 2489], [2493, 2493], [2510, 2510], [2524, 2525], [2527, 2529], [2544, 2545], [2556, 2556], [2565, 2570], [2575, 2576], [2579, 2600], [2602, 2608], [2610, 2611], [2613, 2614], [2616, 2617], [2649, 2652], [2654, 2654], [2674, 2676], [2693, 2701], [2703, 2705], [2707, 2728], [2730, 2736], [2738, 2739], [2741, 2745], [2749, 2749], [2768, 2768], [2784, 2785], [2809, 2809], [2821, 2828], [2831, 2832], [2835, 2856], [2858, 2864], [2866, 2867], [2869, 2873], [2877, 2877], [2908, 2909], [2911, 2913], [2929, 2929], [2947, 2947], [2949, 2954], [2958, 2960], [2962, 2965], [2969, 2970], [2972, 2972], [2974, 2975], [2979, 2980], [2984, 2986], [2990, 3001], [3024, 3024], [3077, 3084], [3086, 3088], [3090, 3112], [3114, 3129], [3133, 3133], [3160, 3162], [3168, 3169], [3200, 3200], [3205, 3212], [3214, 3216], [3218, 3240], [3242, 3251], [3253, 3257], [3261, 3261], [3294, 3294], [3296, 3297], [3313, 3314], [3333, 3340], [3342, 3344], [3346, 3386], [3389, 3389], [3406, 3406], [3412, 3414], [3423, 3425], [3450, 3455], [3461, 3478], [3482, 3505], [3507, 3515], [3517, 3517], [3520, 3526], [3585, 3632], [3634, 3635], [3648, 3653], [3713, 3714], [3716, 3716], [3719, 3720], [3722, 3722], [3725, 3725], [3732, 3735], [3737, 3743], [3745, 3747], [3749, 3749], [3751, 3751], [3754, 3755], [3757, 3760], [3762, 3763], [3773, 3773], [3776, 3780], [3804, 3807], [3840, 3840], [3904, 3911], [3913, 3948], [3976, 3980], [4096, 4138], [4159, 4159], [4176, 4181], [4186, 4189], [4193, 4193], [4197, 4198], [4206, 4208], [4213, 4225], [4238, 4238], [4304, 4346], [4349, 4680], [4682, 4685], [4688, 4694], [4696, 4696], [4698, 4701], [4704, 4744], [4746, 4749], [4752, 4784], [4786, 4789], [4792, 4798], [4800, 4800], [4802, 4805], [4808, 4822], [4824, 4880], [4882, 4885], [4888, 4954], [4992, 5007], [5121, 5740], [5743, 5759], [5761, 5786], [5792, 5866], [5873, 5880], [5888, 5900], [5902, 5905], [5920, 5937], [5952, 5969], [5984, 5996], [5998, 6000], [6016, 6067], [6108, 6108], [6176, 6210], [6212, 6263], [6272, 6276], [6279, 6312], [6314, 6314], [6320, 6389], [6400, 6430], [6480, 6509], [6512, 6516], [6528, 6571], [6576, 6601], [6656, 6678], [6688, 6740], [6917, 6963], [6981, 6987], [7043, 7072], [7086, 7087], [7098, 7141], [7168, 7203], [7245, 7247], [7258, 7287], [7401, 7404], [7406, 7409], [7413, 7414], [8501, 8504], [11568, 11623], [11648, 11670], [11680, 11686], [11688, 11694], [11696, 11702], [11704, 11710], [11712, 11718], [11720, 11726], [11728, 11734], [11736, 11742], [12294, 12294], [12348, 12348], [12353, 12438], [12447, 12447], [12449, 12538], [12543, 12543], [12549, 12590], [12593, 12686], [12704, 12730], [12784, 12799], [13312, 13312], [19893, 19893], [19968, 19968], [40938, 40938], [40960, 40980], [40982, 42124], [42192, 42231], [42240, 42507], [42512, 42527], [42538, 42539], [42606, 42606], [42656, 42725], [42895, 42895], [42999, 42999], [43003, 43009], [43011, 43013], [43015, 43018], [43020, 43042], [43072, 43123], [43138, 43187], [43250, 43255], [43259, 43259], [43261, 43261], [43274, 43301], [43312, 43334], [43360, 43388], [43396, 43442], [43488, 43492], [43495, 43503], [43514, 43518], [43520, 43560], [43584, 43586], [43588, 43595], [43616, 43631], [43633, 43638], [43642, 43642], [43646, 43695], [43697, 43697], [43701, 43702], [43705, 43709], [43712, 43712], [43714, 43714], [43739, 43740], [43744, 43754], [43762, 43762], [43777, 43782], [43785, 43790], [43793, 43798], [43808, 43814], [43816, 43822], [43968, 44002], [44032, 44032], [55203, 55203], [55216, 55238], [55243, 55291], [63744, 64109], [64112, 64217], [64285, 64285], [64287, 64296], [64298, 64310], [64312, 64316], [64318, 64318], [64320, 64321], [64323, 64324], [64326, 64433], [64467, 64829], [64848, 64911], [64914, 64967], [65008, 65019], [65136, 65140], [65142, 65276], [65382, 65391], [65393, 65437], [65440, 65470], [65474, 65479], [65482, 65487], [65490, 65495], [65498, 65500]], "Mn": [[768, 879], [1155, 1159], [1425, 1469], [1471, 1471], [1473, 1474], [1476, 1477], [1479, 1479], [1552, 1562], [1611, 1631], [1648, 1648], [1750, 1756], [1759, 1764], [1767, 1768], [1770, 1773], [1809, 1809], [1840, 1866], [1958, 1968], [2027, 2035], [2070, 2073], [2075, 2083], [2085, 2087], [2089, 2093], [2137, 2139], [2260, 2273], [2275, 2306], [2362, 2362], [2364, 2364], [2369, 2376], [2381, 2381], [2385, 2391], [2402, 2403], [2433, 2433], [2492, 2492], [2497, 2500], [2509, 2509], [2530, 2531], [2561, 2562], [2620, 2620], [2625, 2626], [2631, 2632], [2635, 2637], [2641, 2641], [2672, 2673], [2677, 2677], [2689, 2690], [2748, 2748], [2753, 2757], [2759, 2760], [2765, 2765], [2786, 2787], [2810, 2815], [2817, 2817], [2876, 2876], [2879, 2879], [2881, 2884], [2893, 2893], [2902, 2902], [2914, 2915], [2946, 2946], [3008, 3008], [3021, 3021], [3072, 3072], [3134, 3136], [3142, 3144], [3146, 3149], [3157, 3158], [3170, 3171], [3201, 3201], [3260, 3260], [3263, 3263], [3270, 3270], [3276, 3277], [3298, 3299], [3328, 3329], [3387, 3388], [3393, 3396], [3405, 3405], [3426, 3427], [3530, 3530], [3538, 3540], [3542, 3542], [3633, 3633], [3636, 3642], [3655, 3662], [3761, 3761], [3764, 3769], [3771, 3772], [3784, 3789], [3864, 3865], [3893, 3893], [3895, 3895], [3897, 3897], [3953, 3966], [3968, 3972], [3974, 3975], [3981, 3991], [3993, 4028], [4038, 4038], [4141, 4144], [4146, 4151], [4153, 4154], [4157, 4158], [4184, 4185], [4190, 4192], [4209, 4212], [4226, 4226], [4229, 4230], [4237, 4237], [4253, 4253], [4957, 4959], [5906, 5908], [5938, 5940], [5970, 5971], [6002, 6003], [6068, 6069], [6071, 6077], [6086, 6086], [6089, 6099], [6109, 6109], [6155, 6157], [6277, 6278], [6313, 6313], [6432, 6434], [6439, 6440], [6450, 6450], [6457, 6459], [6679, 6680], [6683, 6683], [6742, 6742], [6744, 6750], [6752, 6752], [6754, 6754], [6757, 6764], [6771, 6780], [6783, 6783], [6832, 6845], [6912, 6915], [6964, 6964], [6966, 6970], [6972, 6972], [6978, 6978], [7019, 7027], [7040, 7041], [7074, 7077], [7080, 7081], [7083, 7085], [7142, 7142], [7144, 7145], [7149, 7149], [7151, 7153], [7212, 7219], [7222, 7223], [7376, 7378], [7380, 7392], [7394, 7400], [7405, 7405], [7412, 7412], [7416, 7417], [7616, 7673], [7675, 7679], [8400, 8412], [8417, 8417], [8421, 8432], [11503, 11505], [11647, 11647], [11744, 11775], [12330, 12333], [12441, 12442], [42607, 42607], [42612, 42621], [42654, 42655], [42736, 42737], [43010, 43010], [43014, 43014], [43019, 43019], [43045, 43046], [43204, 43205], [43232, 43249], [43302, 43309], [43335, 43345], [43392, 43394], [43443, 43443], [43446, 43449], [43452, 43452], [43493, 43493], [43561, 43566], [43569, 43570], [43573, 43574], [43587, 43587], [43596, 43596], [43644, 43644], [43696, 43696], [43698, 43700], [43703, 43704], [43710, 43711], [43713, 43713], [43756, 43757], [43766, 43766], [44005, 44005], [44008, 44008], [44013, 44013], [64286, 64286], [65024, 65039], [65056, 65071]], "Po": [[33, 35], [37, 39], [42, 42], [44, 44], [46, 47], [58, 59], [63, 64], [92, 92], [161, 161], [167, 167], [182, 183], [191, 191], [894, 894], [903, 903], [1370, 1375], [1417, 1417], [1472, 1472], [1475, 1475], [1478, 1478], [1523, 1524], [1545, 1546], [1548, 1549], [1563, 1563], [1566, 1567], [1642, 1645], [1748, 1748], [1792, 1805], [2039, 2041], [2096, 2110], [2142, 2142], [2404, 2405], [2416, 2416], [2557, 2557], [2800, 2800], [3572, 3572], [3663, 3663], [3674, 3675], [3844, 3858], [3860, 3860], [3973, 3973], [4048, 4052], [4057, 4058], [4170, 4175], [4347, 4347], [4960, 4968], [5741, 5742], [5867, 5869], [5941, 5942], [6100, 6102], [6104, 6106], [6144, 6149], [6151, 6154], [6468, 6469], [6686, 6687], [6816, 6822], [6824, 6829], [7002, 7008], [7164, 7167], [7227, 7231], [7294, 7295], [7360, 7367], [7379, 7379], [8214, 8215], [8224, 8231], [8240, 8248], [8251, 8254], [8257, 8259], [8263, 8273], [8275, 8275], [8277, 8286], [11513, 11516], [11518, 11519], [11632, 11632], [11776, 11777], [11782, 11784], [11787, 11787], [11790, 11798], [11800, 11801], [11803, 11803], [11806, 11807], [11818, 11822], [11824, 11833], [11836, 11839], [11841, 11841], [11843, 11849], [12289, 12291], [12349, 12349], [12539, 12539], [42238, 42239], [42509, 42511], [42611, 42611], [42622, 42622], [42738, 42743], [43124, 43127], [43214, 43215], [43256, 43258], [43260, 43260], [43310, 43311], [43359, 43359], [43457, 43469], [43486, 43487], [43612, 43615], [43742, 43743], [43760, 43761], [44011, 44011], [65040, 65046], [65049, 65049], [65072, 65072], [65093, 65094], [65097, 65100], [65104, 65106], [65108, 65111], [65119, 65121], [65128, 65128], [65130, 65131], [65281, 65283], [65285, 65287], [65290, 65290], [65292, 65292], [65294, 65295], [65306, 65307], [65311, 65312], [65340, 65340], [65377, 65377], [65380, 65381]], "Co": [[57344, 57344], [63743, 63743]], "Sm": [[43, 43], [60, 62], [124, 124], [126, 126], [172, 172], [177, 177], [215, 215], [247, 247], [1014, 1014], [1542, 1544], [8260, 8260], [8274, 8274], [8314, 8316], [8330, 8332], [8472, 8472], [8512, 8516], [8523, 8523], [8592, 8596], [8602, 8603], [8608, 8608], [8611, 8611], [8614, 8614], [8622, 8622], [8654, 8655], [8658, 8658], [8660, 8660], [8692, 8959], [8992, 8993], [9084, 9084], [9115, 9139], [9180, 9185], [9655, 9655], [9665, 9665], [9720, 9727], [9839, 9839], [10176, 10180], [10183, 10213], [10224, 10239], [10496, 10626], [10649, 10711], [10716, 10747], [10750, 11007], [11056, 11076], [11079, 11084], [64297, 64297], [65122, 65122], [65124, 65126], [65291, 65291], [65308, 65310], [65372, 65372], [65374, 65374], [65506, 65506], [65513, 65516]], "Pf": [[187, 187], [8217, 8217], [8221, 8221], [8250, 8250], [11779, 11779], [11781, 11781], [11786, 11786], [11789, 11789], [11805, 11805], [11809, 11809]], "Cc": [[0, 31], [127, 159]], "Pi": [[171, 171], [8216, 8216], [8219, 8220], [8223, 8223], [8249, 8249], [11778, 11778], [11780, 11780], [11785, 11785], [11788, 11788], [11804, 11804], [11808, 11808]], "Lu": [[65, 90], [192, 214], [216, 222], [256, 256], [258, 258], [260, 260], [262, 262], [264, 264], [266, 266], [268, 268], [270, 270], [272, 272], [274, 274], [276, 276], [278, 278], [280, 280], [282, 282], [284, 284], [286, 286], [288, 288], [290, 290], [292, 292], [294, 294], [296, 296], [298, 298], [300, 300], [302, 302], [304, 304], [306, 306], [308, 308], [310, 310], [313, 313], [315, 315], [317, 317], [319, 319], [321, 321], [323, 323], [325, 325], [327, 327], [330, 330], [332, 332], [334, 334], [336, 336], [338, 338], [340, 340], [342, 342], [344, 344], [346, 346], [348, 348], [350, 350], [352, 352], [354, 354], [356, 356], [358, 358], [360, 360], [362, 362], [364, 364], [366, 366], [368, 368], [370, 370], [372, 372], [374, 374], [376, 377], [379, 379], [381, 381], [385, 386], [388, 388], [390, 391], [393, 395], [398, 401], [403, 404], [406, 408], [412, 413], [415, 416], [418, 418], [420, 420], [422, 423], [425, 425], [428, 428], [430, 431], [433, 435], [437, 437], [439, 440], [444, 444], [452, 452], [455, 455], [458, 458], [461, 461], [463, 463], [465, 465], [467, 467], [469, 469], [471, 471], [473, 473], [475, 475], [478, 478], [480, 480], [482, 482], [484, 484], [486, 486], [488, 488], [490, 490], [492, 492], [494, 494], [497, 497], [500, 500], [502, 504], [506, 506], [508, 508], [510, 510], [512, 512], [514, 514], [516, 516], [518, 518], [520, 520], [522, 522], [524, 524], [526, 526], [528, 528], [530, 530], [532, 532], [534, 534], [536, 536], [538, 538], [540, 540], [542, 542], [544, 544], [546, 546], [548, 548], [550, 550], [552, 552], [554, 554], [556, 556], [558, 558], [560, 560], [562, 562], [570, 571], [573, 574], [577, 577], [579, 582], [584, 584], [586, 586], [588, 588], [590, 590], [880, 880], [882, 882], [886, 886], [895, 895], [902, 902], [904, 906], [908, 908], [910, 911], [913, 929], [931, 939], [975, 975], [978, 980], [984, 984], [986, 986], [988, 988], [990, 990], [992, 992], [994, 994], [996, 996], [998, 998], [1000, 1000], [1002, 1002], [1004, 1004], [1006, 1006], [1012, 1012], [1015, 1015], [1017, 1018], [1021, 1071], [1120, 1120], [1122, 1122], [1124, 1124], [1126, 1126], [1128, 1128], [1130, 1130], [1132, 1132], [1134, 1134], [1136, 1136], [1138, 1138], [1140, 1140], [1142, 1142], [1144, 1144], [1146, 1146], [1148, 1148], [1150, 1150], [1152, 1152], [1162, 1162], [1164, 1164], [1166, 1166], [1168, 1168], [1170, 1170], [1172, 1172], [1174, 1174], [1176, 1176], [1178, 1178], [1180, 1180], [1182, 1182], [1184, 1184], [1186, 1186], [1188, 1188], [1190, 1190], [1192, 1192], [1194, 1194], [1196, 1196], [1198, 1198], [1200, 1200], [1202, 1202], [1204, 1204], [1206, 1206], [1208, 1208], [1210, 1210], [1212, 1212], [1214, 1214], [1216, 1217], [1219, 1219], [1221, 1221], [1223, 1223], [1225, 1225], [1227, 1227], [1229, 1229], [1232, 1232], [1234, 1234], [1236, 1236], [1238, 1238], [1240, 1240], [1242, 1242], [1244, 1244], [1246, 1246], [1248, 1248], [1250, 1250], [1252, 1252], [1254, 1254], [1256, 1256], [1258, 1258], [1260, 1260], [1262, 1262], [1264, 1264], [1266, 1266], [1268, 1268], [1270, 1270], [1272, 1272], [1274, 1274], [1276, 1276], [1278, 1278], [1280, 1280], [1282, 1282], [1284, 1284], [1286, 1286], [1288, 1288], [1290, 1290], [1292, 1292], [1294, 1294], [1296, 1296], [1298, 1298], [1300, 1300], [1302, 1302], [1304, 1304], [1306, 1306], [1308, 1308], [1310, 1310], [1312, 1312], [1314, 1314], [1316, 1316], [1318, 1318], [1320, 1320], [1322, 1322], [1324, 1324], [1326, 1326], [1329, 1366], [4256, 4293], [4295, 4295], [4301, 4301], [5024, 5109], [7680, 7680], [7682, 7682], [7684, 7684], [7686, 7686], [7688, 7688], [7690, 7690], [7692, 7692], [7694, 7694], [7696, 7696], [7698, 7698], [7700, 7700], [7702, 7702], [7704, 7704], [7706, 7706], [7708, 7708], [7710, 7710], [7712, 7712], [7714, 7714], [7716, 7716], [7718, 7718], [7720, 7720], [7722, 7722], [7724, 7724], [7726, 7726], [7728, 7728], [7730, 7730], [7732, 7732], [7734, 7734], [7736, 7736], [7738, 7738], [7740, 7740], [7742, 7742], [7744, 7744], [7746, 7746], [7748, 7748], [7750, 7750], [7752, 7752], [7754, 7754], [7756, 7756], [7758, 7758], [7760, 7760], [7762, 7762], [7764, 7764], [7766, 7766], [7768, 7768], [7770, 7770], [7772, 7772], [7774, 7774], [7776, 7776], [7778, 7778], [7780, 7780], [7782, 7782], [7784, 7784], [7786, 7786], [7788, 7788], [7790, 7790], [7792, 7792], [7794, 7794], [7796, 7796], [7798, 7798], [7800, 7800], [7802, 7802], [7804, 7804], [7806, 7806], [7808, 7808], [7810, 7810], [7812, 7812], [7814, 7814], [7816, 7816], [7818, 7818], [7820, 7820], [7822, 7822], [7824, 7824], [7826, 7826], [7828, 7828], [7838, 7838], [7840, 7840], [7842, 7842], [7844, 7844], [7846, 7846], [7848, 7848], [7850, 7850], [7852, 7852], [7854, 7854], [7856, 7856], [7858, 7858], [7860, 7860], [7862, 7862], [7864, 7864], [7866, 7866], [7868, 7868], [7870, 7870], [7872, 7872], [7874, 7874], [7876, 7876], [7878, 7878], [7880, 7880], [7882, 7882], [7884, 7884], [7886, 7886], [7888, 7888], [7890, 7890], [7892, 7892], [7894, 7894], [7896, 7896], [7898, 7898], [7900, 7900], [7902, 7902], [7904, 7904], [7906, 7906], [7908, 7908], [7910, 7910], [7912, 7912], [7914, 7914], [7916, 7916], [7918, 7918], [7920, 7920], [7922, 7922], [7924, 7924], [7926, 7926], [7928, 7928], [7930, 7930], [7932, 7932], [7934, 7934], [7944, 7951], [7960, 7965], [7976, 7983], [7992, 7999], [8008, 8013], [8025, 8025], [8027, 8027], [8029, 8029], [8031, 8031], [8040, 8047], [8120, 8123], [8136, 8139], [8152, 8155], [8168, 8172], [8184, 8187], [8450, 8450], [8455, 8455], [8459, 8461], [8464, 8466], [8469, 8469], [8473, 8477], [8484, 8484], [8486, 8486], [8488, 8488], [8490, 8493], [8496, 8499], [8510, 8511], [8517, 8517], [8579, 8579], [11264, 11310], [11360, 11360], [11362, 11364], [11367, 11367], [11369, 11369], [11371, 11371], [11373, 11376], [11378, 11378], [11381, 11381], [11390, 11392], [11394, 11394], [11396, 11396], [11398, 11398], [11400, 11400], [11402, 11402], [11404, 11404], [11406, 11406], [11408, 11408], [11410, 11410], [11412, 11412], [11414, 11414], [11416, 11416], [11418, 11418], [11420, 11420], [11422, 11422], [11424, 11424], [11426, 11426], [11428, 11428], [11430, 11430], [11432, 11432], [11434, 11434], [11436, 11436], [11438, 11438], [11440, 11440], [11442, 11442], [11444, 11444], [11446, 11446], [11448, 11448], [11450, 11450], [11452, 11452], [11454, 11454], [11456, 11456], [11458, 11458], [11460, 11460], [11462, 11462], [11464, 11464], [11466, 11466], [11468, 11468], [11470, 11470], [11472, 11472], [11474, 11474], [11476, 11476], [11478, 11478], [11480, 11480], [11482, 11482], [11484, 11484], [11486, 11486], [11488, 11488], [11490, 11490], [11499, 11499], [11501, 11501], [11506, 11506], [42560, 42560], [42562, 42562], [42564, 42564], [42566, 42566], [42568, 42568], [42570, 42570], [42572, 42572], [42574, 42574], [42576, 42576], [42578, 42578], [42580, 42580], [42582, 42582], [42584, 42584], [42586, 42586], [42588, 42588], [42590, 42590], [42592, 42592], [42594, 42594], [42596, 42596], [42598, 42598], [42600, 42600], [42602, 42602], [42604, 42604], [42624, 42624], [42626, 42626], [42628, 42628], [42630, 42630], [42632, 42632], [42634, 42634], [42636, 42636], [42638, 42638], [42640, 42640], [42642, 42642], [42644, 42644], [42646, 42646], [42648, 42648], [42650, 42650], [42786, 42786], [42788, 42788], [42790, 42790], [42792, 42792], [42794, 42794], [42796, 42796], [42798, 42798], [42802, 42802], [42804, 42804], [42806, 42806], [42808, 42808], [42810, 42810], [42812, 42812], [42814, 42814], [42816, 42816], [42818, 42818], [42820, 42820], [42822, 42822], [42824, 42824], [42826, 42826], [42828, 42828], [42830, 42830], [42832, 42832], [42834, 42834], [42836, 42836], [42838, 42838], [42840, 42840], [42842, 42842], [42844, 42844], [42846, 42846], [42848, 42848], [42850, 42850], [42852, 42852], [42854, 42854], [42856, 42856], [42858, 42858], [42860, 42860], [42862, 42862], [42873, 42873], [42875, 42875], [42877, 42878], [42880, 42880], [42882, 42882], [42884, 42884], [42886, 42886], [42891, 42891], [42893, 42893], [42896, 42896], [42898, 42898], [42902, 42902], [42904, 42904], [42906, 42906], [42908, 42908], [42910, 42910], [42912, 42912], [42914, 42914], [42916, 42916], [42918, 42918], [42920, 42920], [42922, 42926], [42928, 42932], [42934, 42934], [65313, 65338]], "Pd": [[45, 45], [1418, 1418], [1470, 1470], [5120, 5120], [6150, 6150], [8208, 8213], [11799, 11799], [11802, 11802], [11834, 11835], [11840, 11840], [12316, 12316], [12336, 12336], [12448, 12448], [65073, 65074], [65112, 65112], [65123, 65123], [65293, 65293]], "Cf": [[173, 173], [1536, 1541], [1564, 1564], [1757, 1757], [1807, 1807], [2274, 2274], [6158, 6158], [8203, 8207], [8234, 8238], [8288, 8292], [8294, 8303], [65279, 65279], [65529, 65531]], "Nd": [[48, 57], [1632, 1641], [1776, 1785], [1984, 1993], [2406, 2415], [2534, 2543], [2662, 2671], [2790, 2799], [2918, 2927], [3046, 3055], [3174, 3183], [3302, 3311], [3430, 3439], [3558, 3567], [3664, 3673], [3792, 3801], [3872, 3881], [4160, 4169], [4240, 4249], [6112, 6121], [6160, 6169], [6470, 6479], [6608, 6617], [6784, 6793], [6800, 6809], [6992, 7001], [7088, 7097], [7232, 7241], [7248, 7257], [42528, 42537], [43216, 43225], [43264, 43273], [43472, 43481], [43504, 43513], [43600, 43609], [44016, 44025], [65296, 65305]], "Ll": [[97, 122], [181, 181], [223, 246], [248, 255], [257, 257], [259, 259], [261, 261], [263, 263], [265, 265], [267, 267], [269, 269], [271, 271], [273, 273], [275, 275], [277, 277], [279, 279], [281, 281], [283, 283], [285, 285], [287, 287], [289, 289], [291, 291], [293, 293], [295, 295], [297, 297], [299, 299], [301, 301], [303, 303], [305, 305], [307, 307], [309, 309], [311, 312], [314, 314], [316, 316], [318, 318], [320, 320], [322, 322], [324, 324], [326, 326], [328, 329], [331, 331], [333, 333], [335, 335], [337, 337], [339, 339], [341, 341], [343, 343], [345, 345], [347, 347], [349, 349], [351, 351], [353, 353], [355, 355], [357, 357], [359, 359], [361, 361], [363, 363], [365, 365], [367, 367], [369, 369], [371, 371], [373, 373], [375, 375], [378, 378], [380, 380], [382, 384], [387, 387], [389, 389], [392, 392], [396, 397], [402, 402], [405, 405], [409, 411], [414, 414], [417, 417], [419, 419], [421, 421], [424, 424], [426, 427], [429, 429], [432, 432], [436, 436], [438, 438], [441, 442], [445, 447], [454, 454], [457, 457], [460, 460], [462, 462], [464, 464], [466, 466], [468, 468], [470, 470], [472, 472], [474, 474], [476, 477], [479, 479], [481, 481], [483, 483], [485, 485], [487, 487], [489, 489], [491, 491], [493, 493], [495, 496], [499, 499], [501, 501], [505, 505], [507, 507], [509, 509], [511, 511], [513, 513], [515, 515], [517, 517], [519, 519], [521, 521], [523, 523], [525, 525], [527, 527], [529, 529], [531, 531], [533, 533], [535, 535], [537, 537], [539, 539], [541, 541], [543, 543], [545, 545], [547, 547], [549, 549], [551, 551], [553, 553], [555, 555], [557, 557], [559, 559], [561, 561], [563, 569], [572, 572], [575, 576], [578, 578], [583, 583], [585, 585], [587, 587], [589, 589], [591, 659], [661, 687], [881, 881], [883, 883], [887, 887], [891, 893], [912, 912], [940, 974], [976, 977], [981, 983], [985, 985], [987, 987], [989, 989], [991, 991], [993, 993], [995, 995], [997, 997], [999, 999], [1001, 1001], [1003, 1003], [1005, 1005], [1007, 1011], [1013, 1013], [1016, 1016], [1019, 1020], [1072, 1119], [1121, 1121], [1123, 1123], [1125, 1125], [1127, 1127], [1129, 1129], [1131, 1131], [1133, 1133], [1135, 1135], [1137, 1137], [1139, 1139], [1141, 1141], [1143, 1143], [1145, 1145], [1147, 1147], [1149, 1149], [1151, 1151], [1153, 1153], [1163, 1163], [1165, 1165], [1167, 1167], [1169, 1169], [1171, 1171], [1173, 1173], [1175, 1175], [1177, 1177], [1179, 1179], [1181, 1181], [1183, 1183], [1185, 1185], [1187, 1187], [1189, 1189], [1191, 1191], [1193, 1193], [1195, 1195], [1197, 1197], [1199, 1199], [1201, 1201], [1203, 1203], [1205, 1205], [1207, 1207], [1209, 1209], [1211, 1211], [1213, 1213], [1215, 1215], [1218, 1218], [1220, 1220], [1222, 1222], [1224, 1224], [1226, 1226], [1228, 1228], [1230, 1231], [1233, 1233], [1235, 1235], [1237, 1237], [1239, 1239], [1241, 1241], [1243, 1243], [1245, 1245], [1247, 1247], [1249, 1249], [1251, 1251], [1253, 1253], [1255, 1255], [1257, 1257], [1259, 1259], [1261, 1261], [1263, 1263], [1265, 1265], [1267, 1267], [1269, 1269], [1271, 1271], [1273, 1273], [1275, 1275], [1277, 1277], [1279, 1279], [1281, 1281], [1283, 1283], [1285, 1285], [1287, 1287], [1289, 1289], [1291, 1291], [1293, 1293], [1295, 1295], [1297, 1297], [1299, 1299], [1301, 1301], [1303, 1303], [1305, 1305], [1307, 1307], [1309, 1309], [1311, 1311], [1313, 1313], [1315, 1315], [1317, 1317], [1319, 1319], [1321, 1321], [1323, 1323], [1325, 1325], [1327, 1327], [1377, 1415], [5112, 5117], [7296, 7304], [7424, 7467], [7531, 7543], [7545, 7578], [7681, 7681], [7683, 7683], [7685, 7685], [7687, 7687], [7689, 7689], [7691, 7691], [7693, 7693], [7695, 7695], [7697, 7697], [7699, 7699], [7701, 7701], [7703, 7703], [7705, 7705], [7707, 7707], [7709, 7709], [7711, 7711], [7713, 7713], [7715, 7715], [7717, 7717], [7719, 7719], [7721, 7721], [7723, 7723], [7725, 7725], [7727, 7727], [7729, 7729], [7731, 7731], [7733, 7733], [7735, 7735], [7737, 7737], [7739, 7739], [7741, 7741], [7743, 7743], [7745, 7745], [7747, 7747], [7749, 7749], [7751, 7751], [7753, 7753], [7755, 7755], [7757, 7757], [7759, 7759], [7761, 7761], [7763, 7763], [7765, 7765], [7767, 7767], [7769, 7769], [7771, 7771], [7773, 7773], [7775, 7775], [7777, 7777], [7779, 7779], [7781, 7781], [7783, 7783], [7785, 7785], [7787, 7787], [7789, 7789], [7791, 7791], [7793, 7793], [7795, 7795], [7797, 7797], [7799, 7799], [7801, 7801], [7803, 7803], [7805, 7805], [7807, 7807], [7809, 7809], [7811, 7811], [7813, 7813], [7815, 7815], [7817, 7817], [7819, 7819], [7821, 7821], [7823, 7823], [7825, 7825], [7827, 7827], [7829, 7837], [7839, 7839], [7841, 7841], [7843, 7843], [7845, 7845], [7847, 7847], [7849, 7849], [7851, 7851], [7853, 7853], [7855, 7855], [7857, 7857], [7859, 7859], [7861, 7861], [7863, 7863], [7865, 7865], [7867, 7867], [7869, 7869], [7871, 7871], [7873, 7873], [7875, 7875], [7877, 7877], [7879, 7879], [7881, 7881], [7883, 7883], [7885, 7885], [7887, 7887], [7889, 7889], [7891, 7891], [7893, 7893], [7895, 7895], [7897, 7897], [7899, 7899], [7901, 7901], [7903, 7903], [7905, 7905], [7907, 7907], [7909, 7909], [7911, 7911], [7913, 7913], [7915, 7915], [7917, 7917], [7919, 7919], [7921, 7921], [7923, 7923], [7925, 7925], [7927, 7927], [7929, 7929], [7931, 7931], [7933, 7933], [7935, 7943], [7952, 7957], [7968, 7975], [7984, 7991], [8000, 8005], [8016, 8023], [8032, 8039], [8048, 8061], [8064, 8071], [8080, 8087], [8096, 8103], [8112, 8116], [8118, 8119], [8126, 8126], [8130, 8132], [8134, 8135], [8144, 8147], [8150, 8151], [8160, 8167], [8178, 8180], [8182, 8183], [8458, 8458], [8462, 8463], [8467, 8467], [8495, 8495], [8500, 8500], [8505, 8505], [8508, 8509], [8518, 8521], [8526, 8526], [8580, 8580], [11312, 11358], [11361, 11361], [11365, 11366], [11368, 11368], [11370, 11370], [11372, 11372], [11377, 11377], [11379, 11380], [11382, 11387], [11393, 11393], [11395, 11395], [11397, 11397], [11399, 11399], [11401, 11401], [11403, 11403], [11405, 11405], [11407, 11407], [11409, 11409], [11411, 11411], [11413, 11413], [11415, 11415], [11417, 11417], [11419, 11419], [11421, 11421], [11423, 11423], [11425, 11425], [11427, 11427], [11429, 11429], [11431, 11431], [11433, 11433], [11435, 11435], [11437, 11437], [11439, 11439], [11441, 11441], [11443, 11443], [11445, 11445], [11447, 11447], [11449, 11449], [11451, 11451], [11453, 11453], [11455, 11455], [11457, 11457], [11459, 11459], [11461, 11461], [11463, 11463], [11465, 11465], [11467, 11467], [11469, 11469], [11471, 11471], [11473, 11473], [11475, 11475], [11477, 11477], [11479, 11479], [11481, 11481], [11483, 11483], [11485, 11485], [11487, 11487], [11489, 11489], [11491, 11492], [11500, 11500], [11502, 11502], [11507, 11507], [11520, 11557], [11559, 11559], [11565, 11565], [42561, 42561], [42563, 42563], [42565, 42565], [42567, 42567], [42569, 42569], [42571, 42571], [42573, 42573], [42575, 42575], [42577, 42577], [42579, 42579], [42581, 42581], [42583, 42583], [42585, 42585], [42587, 42587], [42589, 42589], [42591, 42591], [42593, 42593], [42595, 42595], [42597, 42597], [42599, 42599], [42601, 42601], [42603, 42603], [42605, 42605], [42625, 42625], [42627, 42627], [42629, 42629], [42631, 42631], [42633, 42633], [42635, 42635], [42637, 42637], [42639, 42639], [42641, 42641], [42643, 42643], [42645, 42645], [42647, 42647], [42649, 42649], [42651, 42651], [42787, 42787], [42789, 42789], [42791, 42791], [42793, 42793], [42795, 42795], [42797, 42797], [42799, 42801], [42803, 42803], [42805, 42805], [42807, 42807], [42809, 42809], [42811, 42811], [42813, 42813], [42815, 42815], [42817, 42817], [42819, 42819], [42821, 42821], [42823, 42823], [42825, 42825], [42827, 42827], [42829, 42829], [42831, 42831], [42833, 42833], [42835, 42835], [42837, 42837], [42839, 42839], [42841, 42841], [42843, 42843], [42845, 42845], [42847, 42847], [42849, 42849], [42851, 42851], [42853, 42853], [42855, 42855], [42857, 42857], [42859, 42859], [42861, 42861], [42863, 42863], [42865, 42872], [42874, 42874], [42876, 42876], [42879, 42879], [42881, 42881], [42883, 42883], [42885, 42885], [42887, 42887], [42892, 42892], [42894, 42894], [42897, 42897], [42899, 42901], [42903, 42903], [42905, 42905], [42907, 42907], [42909, 42909], [42911, 42911], [42913, 42913], [42915, 42915], [42917, 42917], [42919, 42919], [42921, 42921], [42933, 42933], [42935, 42935], [43002, 43002], [43824, 43866], [43872, 43877], [43888, 43967], [64256, 64262], [64275, 64279], [65345, 65370]], "No": [[178, 179], [185, 185], [188, 190], [2548, 2553], [2930, 2935], [3056, 3058], [3192, 3198], [3416, 3422], [3440, 3448], [3882, 3891], [4969, 4988], [6128, 6137], [6618, 6618], [8304, 8304], [8308, 8313], [8320, 8329], [8528, 8543], [8585, 8585], [9312, 9371], [9450, 9471], [10102, 10131], [11517, 11517], [12690, 12693], [12832, 12841], [12872, 12879], [12881, 12895], [12928, 12937], [12977, 12991], [43056, 43061]], "Zs": [[32, 32], [160, 160], [5760, 5760], [8192, 8202], [8239, 8239], [8287, 8287], [12288, 12288]] }); };
});

unwrapExports(data_generated);

var utils = createCommonjsModule(function (module, exports) {
"use strict";
exports.__esModule = true;
function normalize_ranges(ranges) {
    return ranges
        .sort(function (_a, _b) {
        var start1 = _a[0];
        var start2 = _b[0];
        return start1 - start2;
    })
        .reduce(function (current, tuple, index) {
        if (index === 0) {
            return [tuple];
        }
        var _a = current[current.length - 1], last_start = _a[0], last_end = _a[1];
        var start = tuple[0], end = tuple[1];
        return last_end + 1 === start
            ? current.slice(0, -1).concat([[last_start, end]]) : current.concat([tuple]);
    }, []);
}
exports.normalize_ranges = normalize_ranges;
function build_regex(ranges, flag) {
    var pattern = ranges
        .map(function (_a) {
        var start = _a[0], end = _a[1];
        return start === end
            ? "\\u" + get_hex(start)
            : "\\u" + get_hex(start) + "-\\u" + get_hex(end);
    })
        .join('');
    return new RegExp("[" + pattern + "]", flag);
}
exports.build_regex = build_regex;
function get_hex(char_code) {
    var hex = char_code.toString(16);
    while (hex.length < 4) {
        hex = "0" + hex;
    }
    return hex;
}
});

unwrapExports(utils);

var lib$2 = function (categories, flag) {
    var data = data_generated.get_data();
    var ranges = categories.reduce(function (current, category) { return current.concat(data[category]); }, []);
    return utils.build_regex(utils.normalize_ranges(ranges), flag);
};

const emojiRegex = emojiRegex$1();




const cjkPattern = lib().source;

// http://spec.commonmark.org/0.25/#ascii-punctuation-character
const asciiPunctuationCharRange = escapeStringRegexp(
  "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"
);

// http://spec.commonmark.org/0.25/#punctuation-character
const punctuationCharRange = `${asciiPunctuationCharRange}${lib$2([
  "Pc",
  "Pd",
  "Pe",
  "Pf",
  "Pi",
  "Po",
  "Ps"
]).source.slice(1, -1)}`; // remove bracket expression `[` and `]`

const punctuationRegex = new RegExp(`[${punctuationCharRange}]`);

function isExportDeclaration(node) {
  if (node) {
    switch (node.type) {
      case "ExportDefaultDeclaration":
      case "ExportDefaultSpecifier":
      case "DeclareExportDeclaration":
      case "ExportNamedDeclaration":
      case "ExportAllDeclaration":
        return true;
    }
  }

  return false;
}

function getParentExportDeclaration(path$$1) {
  const parentNode = path$$1.getParentNode();
  if (path$$1.getName() === "declaration" && isExportDeclaration(parentNode)) {
    return parentNode;
  }

  return null;
}

function getPenultimate(arr) {
  if (arr.length > 1) {
    return arr[arr.length - 2];
  }
  return null;
}

function getLast(arr) {
  if (arr.length > 0) {
    return arr[arr.length - 1];
  }
  return null;
}

function skip(chars) {
  return (text, index, opts) => {
    const backwards = opts && opts.backwards;

    // Allow `skip` functions to be threaded together without having
    // to check for failures (did someone say monads?).
    if (index === false) {
      return false;
    }

    const length = text.length;
    let cursor = index;
    while (cursor >= 0 && cursor < length) {
      const c = text.charAt(cursor);
      if (chars instanceof RegExp) {
        if (!chars.test(c)) {
          return cursor;
        }
      } else if (chars.indexOf(c) === -1) {
        return cursor;
      }

      backwards ? cursor-- : cursor++;
    }

    if (cursor === -1 || cursor === length) {
      // If we reached the beginning or end of the file, return the
      // out-of-bounds cursor. It's up to the caller to handle this
      // correctly. We don't want to indicate `false` though if it
      // actually skipped valid characters.
      return cursor;
    }
    return false;
  };
}

const skipWhitespace = skip(/\s/);
const skipSpaces = skip(" \t");
const skipToLineEnd = skip(",; \t");
const skipEverythingButNewLine = skip(/[^\r\n]/);

function skipInlineComment(text, index) {
  if (index === false) {
    return false;
  }

  if (text.charAt(index) === "/" && text.charAt(index + 1) === "*") {
    for (let i = index + 2; i < text.length; ++i) {
      if (text.charAt(i) === "*" && text.charAt(i + 1) === "/") {
        return i + 2;
      }
    }
  }
  return index;
}

function skipTrailingComment(text, index) {
  if (index === false) {
    return false;
  }

  if (text.charAt(index) === "/" && text.charAt(index + 1) === "/") {
    return skipEverythingButNewLine(text, index);
  }
  return index;
}

// This one doesn't use the above helper function because it wants to
// test \r\n in order and `skip` doesn't support ordering and we only
// want to skip one newline. It's simple to implement.
function skipNewline(text, index, opts) {
  const backwards = opts && opts.backwards;
  if (index === false) {
    return false;
  }

  const atIndex = text.charAt(index);
  if (backwards) {
    if (text.charAt(index - 1) === "\r" && atIndex === "\n") {
      return index - 2;
    }
    if (
      atIndex === "\n" ||
      atIndex === "\r" ||
      atIndex === "\u2028" ||
      atIndex === "\u2029"
    ) {
      return index - 1;
    }
  } else {
    if (atIndex === "\r" && text.charAt(index + 1) === "\n") {
      return index + 2;
    }
    if (
      atIndex === "\n" ||
      atIndex === "\r" ||
      atIndex === "\u2028" ||
      atIndex === "\u2029"
    ) {
      return index + 1;
    }
  }

  return index;
}

function hasNewline(text, index, opts) {
  opts = opts || {};
  const idx = skipSpaces(text, opts.backwards ? index - 1 : index, opts);
  const idx2 = skipNewline(text, idx, opts);
  return idx !== idx2;
}

function hasNewlineInRange(text, start, end) {
  for (let i = start; i < end; ++i) {
    if (text.charAt(i) === "\n") {
      return true;
    }
  }
  return false;
}

// Note: this function doesn't ignore leading comments unlike isNextLineEmpty
function isPreviousLineEmpty(text, node) {
  let idx = locStart(node) - 1;
  idx = skipSpaces(text, idx, { backwards: true });
  idx = skipNewline(text, idx, { backwards: true });
  idx = skipSpaces(text, idx, { backwards: true });
  const idx2 = skipNewline(text, idx, { backwards: true });
  return idx !== idx2;
}

function isNextLineEmptyAfterIndex(text, index) {
  let oldIdx = null;
  let idx = index;
  while (idx !== oldIdx) {
    // We need to skip all the potential trailing inline comments
    oldIdx = idx;
    idx = skipToLineEnd(text, idx);
    idx = skipInlineComment(text, idx);
    idx = skipSpaces(text, idx);
  }
  idx = skipTrailingComment(text, idx);
  idx = skipNewline(text, idx);
  return hasNewline(text, idx);
}

function isNextLineEmpty(text, node) {
  return isNextLineEmptyAfterIndex(text, locEnd(node));
}

function getNextNonSpaceNonCommentCharacterIndex(text, node) {
  let oldIdx = null;
  let idx = locEnd(node);
  while (idx !== oldIdx) {
    oldIdx = idx;
    idx = skipSpaces(text, idx);
    idx = skipInlineComment(text, idx);
    idx = skipTrailingComment(text, idx);
    idx = skipNewline(text, idx);
  }
  return idx;
}

function getNextNonSpaceNonCommentCharacter(text, node) {
  return text.charAt(getNextNonSpaceNonCommentCharacterIndex(text, node));
}

function hasSpaces(text, index, opts) {
  opts = opts || {};
  const idx = skipSpaces(text, opts.backwards ? index - 1 : index, opts);
  return idx !== index;
}

function locStart(node) {
  // Handle nodes with decorators. They should start at the first decorator
  if (
    node.declaration &&
    node.declaration.decorators &&
    node.declaration.decorators.length > 0
  ) {
    return locStart(node.declaration.decorators[0]);
  }
  if (node.decorators && node.decorators.length > 0) {
    return locStart(node.decorators[0]);
  }

  if (node.__location) {
    return node.__location.startOffset;
  }
  if (node.range) {
    return node.range[0];
  }
  if (typeof node.start === "number") {
    return node.start;
  }
  if (node.source) {
    return lineColumnToIndex(node.source.start, node.source.input.css) - 1;
  }
  if (node.loc) {
    return node.loc.start;
  }
}

function locEnd(node) {
  const endNode = node.nodes && getLast(node.nodes);
  if (endNode && node.source && !node.source.end) {
    node = endNode;
  }

  let loc;
  if (node.range) {
    loc = node.range[1];
  } else if (typeof node.end === "number") {
    loc = node.end;
  } else if (node.source) {
    loc = lineColumnToIndex(node.source.end, node.source.input.css);
  }

  if (node.__location) {
    return node.__location.endOffset;
  }
  if (node.typeAnnotation) {
    return Math.max(loc, locEnd(node.typeAnnotation));
  }

  if (node.loc && !loc) {
    return node.loc.end;
  }

  return loc;
}

// Super inefficient, needs to be cached.
function lineColumnToIndex(lineColumn, text) {
  let index = 0;
  for (let i = 0; i < lineColumn.line - 1; ++i) {
    index = text.indexOf("\n", index) + 1;
    if (index === -1) {
      return -1;
    }
  }
  return index + lineColumn.column;
}

function setLocStart(node, index) {
  if (node.range) {
    node.range[0] = index;
  } else {
    node.start = index;
  }
}

function setLocEnd(node, index) {
  if (node.range) {
    node.range[1] = index;
  } else {
    node.end = index;
  }
}

const PRECEDENCE = {};
[
  ["|>"],
  ["||", "??"],
  ["&&"],
  ["|"],
  ["^"],
  ["&"],
  ["==", "===", "!=", "!=="],
  ["<", ">", "<=", ">=", "in", "instanceof"],
  [">>", "<<", ">>>"],
  ["+", "-"],
  ["*", "/", "%"],
  ["**"]
].forEach((tier, i) => {
  tier.forEach(op => {
    PRECEDENCE[op] = i;
  });
});

function getPrecedence(op) {
  return PRECEDENCE[op];
}

const equalityOperators = {
  "==": true,
  "!=": true,
  "===": true,
  "!==": true
};
const multiplicativeOperators = {
  "*": true,
  "/": true,
  "%": true
};
const bitshiftOperators = {
  ">>": true,
  ">>>": true,
  "<<": true
};

function shouldFlatten(parentOp, nodeOp) {
  if (getPrecedence(nodeOp) !== getPrecedence(parentOp)) {
    return false;
  }

  // ** is right-associative
  // x ** y ** z --> x ** (y ** z)
  if (parentOp === "**") {
    return false;
  }

  // x == y == z --> (x == y) == z
  if (equalityOperators[parentOp] && equalityOperators[nodeOp]) {
    return false;
  }

  // x * y % z --> (x * y) % z
  if (
    (nodeOp === "%" && multiplicativeOperators[parentOp]) ||
    (parentOp === "%" && multiplicativeOperators[nodeOp])
  ) {
    return false;
  }

  // x << y << z --> (x << y) << z
  if (bitshiftOperators[parentOp] && bitshiftOperators[nodeOp]) {
    return false;
  }

  return true;
}

function isBitwiseOperator(operator) {
  return (
    !!bitshiftOperators[operator] ||
    operator === "|" ||
    operator === "^" ||
    operator === "&"
  );
}

// Tests if an expression starts with `{`, or (if forbidFunctionAndClass holds) `function` or `class`.
// Will be overzealous if there's already necessary grouping parentheses.
function startsWithNoLookaheadToken(node, forbidFunctionAndClass) {
  node = getLeftMost(node);
  switch (node.type) {
    // Hack. Remove after https://github.com/eslint/typescript-eslint-parser/issues/331
    case "ObjectPattern":
      return !forbidFunctionAndClass;
    case "FunctionExpression":
    case "ClassExpression":
      return forbidFunctionAndClass;
    case "ObjectExpression":
      return true;
    case "MemberExpression":
      return startsWithNoLookaheadToken(node.object, forbidFunctionAndClass);
    case "TaggedTemplateExpression":
      if (node.tag.type === "FunctionExpression") {
        // IIFEs are always already parenthesized
        return false;
      }
      return startsWithNoLookaheadToken(node.tag, forbidFunctionAndClass);
    case "CallExpression":
      if (node.callee.type === "FunctionExpression") {
        // IIFEs are always already parenthesized
        return false;
      }
      return startsWithNoLookaheadToken(node.callee, forbidFunctionAndClass);
    case "ConditionalExpression":
      return startsWithNoLookaheadToken(node.test, forbidFunctionAndClass);
    case "UpdateExpression":
      return (
        !node.prefix &&
        startsWithNoLookaheadToken(node.argument, forbidFunctionAndClass)
      );
    case "BindExpression":
      return (
        node.object &&
        startsWithNoLookaheadToken(node.object, forbidFunctionAndClass)
      );
    case "SequenceExpression":
      return startsWithNoLookaheadToken(
        node.expressions[0],
        forbidFunctionAndClass
      );
    case "TSAsExpression":
      return startsWithNoLookaheadToken(
        node.expression,
        forbidFunctionAndClass
      );
    default:
      return false;
  }
}

function getLeftMost(node) {
  if (node.left) {
    return getLeftMost(node.left);
  }
  return node;
}

function hasBlockComments(node) {
  return node.comments && node.comments.some(isBlockComment);
}

function isBlockComment(comment) {
  return comment.type === "Block" || comment.type === "CommentBlock";
}

function hasClosureCompilerTypeCastComment(text, node) {
  // https://github.com/google/closure-compiler/wiki/Annotating-Types#type-casts
  // Syntax example: var x = /** @type {string} */ (fruit);
  return (
    node.comments &&
    node.comments.some(
      comment =>
        comment.leading &&
        isBlockComment(comment) &&
        comment.value.match(/^\*\s*@type\s*{[^}]+}\s*$/) &&
        getNextNonSpaceNonCommentCharacter(text, comment) === "("
    )
  );
}

function getAlignmentSize(value, tabWidth, startIndex) {
  startIndex = startIndex || 0;

  let size = 0;
  for (let i = startIndex; i < value.length; ++i) {
    if (value[i] === "\t") {
      // Tabs behave in a way that they are aligned to the nearest
      // multiple of tabWidth:
      // 0 -> 4, 1 -> 4, 2 -> 4, 3 -> 4
      // 4 -> 8, 5 -> 8, 6 -> 8, 7 -> 8 ...
      size = size + tabWidth - size % tabWidth;
    } else {
      size++;
    }
  }

  return size;
}

function getIndentSize(value, tabWidth) {
  const lastNewlineIndex = value.lastIndexOf("\n");
  if (lastNewlineIndex === -1) {
    return 0;
  }

  return getAlignmentSize(
    // All the leading whitespaces
    value.slice(lastNewlineIndex + 1).match(/^[ \t]*/)[0],
    tabWidth
  );
}

function printString(raw, options, isDirectiveLiteral) {
  // `rawContent` is the string exactly like it appeared in the input source
  // code, without its enclosing quotes.
  const rawContent = raw.slice(1, -1);

  const double = { quote: '"', regex: /"/g };
  const single = { quote: "'", regex: /'/g };

  const preferred = options.singleQuote ? single : double;
  const alternate = preferred === single ? double : single;

  let shouldUseAlternateQuote = false;
  let canChangeDirectiveQuotes = false;

  // If `rawContent` contains at least one of the quote preferred for enclosing
  // the string, we might want to enclose with the alternate quote instead, to
  // minimize the number of escaped quotes.
  // Also check for the alternate quote, to determine if we're allowed to swap
  // the quotes on a DirectiveLiteral.
  if (
    rawContent.includes(preferred.quote) ||
    rawContent.includes(alternate.quote)
  ) {
    const numPreferredQuotes = (rawContent.match(preferred.regex) || []).length;
    const numAlternateQuotes = (rawContent.match(alternate.regex) || []).length;

    shouldUseAlternateQuote = numPreferredQuotes > numAlternateQuotes;
  } else {
    canChangeDirectiveQuotes = true;
  }

  const enclosingQuote =
    options.parser === "json"
      ? double.quote
      : shouldUseAlternateQuote ? alternate.quote : preferred.quote;

  // Directives are exact code unit sequences, which means that you can't
  // change the escape sequences they use.
  // See https://github.com/prettier/prettier/issues/1555
  // and https://tc39.github.io/ecma262/#directive-prologue
  if (isDirectiveLiteral) {
    if (canChangeDirectiveQuotes) {
      return enclosingQuote + rawContent + enclosingQuote;
    }
    return raw;
  }

  // It might sound unnecessary to use `makeString` even if the string already
  // is enclosed with `enclosingQuote`, but it isn't. The string could contain
  // unnecessary escapes (such as in `"\'"`). Always using `makeString` makes
  // sure that we consistently output the minimum amount of escaped quotes.
  return makeString(
    rawContent,
    enclosingQuote,
    !(
      options.parser === "css" ||
      options.parser === "less" ||
      options.parser === "scss"
    )
  );
}

function makeString(rawContent, enclosingQuote, unescapeUnnecessaryEscapes) {
  const otherQuote = enclosingQuote === '"' ? "'" : '"';

  // Matches _any_ escape and unescaped quotes (both single and double).
  const regex = /\\([\s\S])|(['"])/g;

  // Escape and unescape single and double quotes as needed to be able to
  // enclose `rawContent` with `enclosingQuote`.
  const newContent = rawContent.replace(regex, (match, escaped, quote) => {
    // If we matched an escape, and the escaped character is a quote of the
    // other type than we intend to enclose the string with, there's no need for
    // it to be escaped, so return it _without_ the backslash.
    if (escaped === otherQuote) {
      return escaped;
    }

    // If we matched an unescaped quote and it is of the _same_ type as we
    // intend to enclose the string with, it must be escaped, so return it with
    // a backslash.
    if (quote === enclosingQuote) {
      return "\\" + quote;
    }

    if (quote) {
      return quote;
    }

    // Unescape any unnecessarily escaped character.
    // Adapted from https://github.com/eslint/eslint/blob/de0b4ad7bd820ade41b1f606008bea68683dc11a/lib/rules/no-useless-escape.js#L27
    return unescapeUnnecessaryEscapes &&
      /^[^\\nrvtbfux\r\n\u2028\u2029"'0-7]$/.test(escaped)
      ? escaped
      : "\\" + escaped;
  });

  return enclosingQuote + newContent + enclosingQuote;
}

function printNumber(rawNumber) {
  return (
    rawNumber
      .toLowerCase()
      // Remove unnecessary plus and zeroes from scientific notation.
      .replace(/^([+-]?[\d.]+e)(?:\+|(-))?0*(\d)/, "$1$2$3")
      // Remove unnecessary scientific notation (1e0).
      .replace(/^([+-]?[\d.]+)e[+-]?0+$/, "$1")
      // Make sure numbers always start with a digit.
      .replace(/^([+-])?\./, "$10.")
      // Remove extraneous trailing decimal zeroes.
      .replace(/(\.\d+?)0+(?=e|$)/, "$1")
      // Remove trailing dot.
      .replace(/\.(?=e|$)/, "")
  );
}

function getMaxContinuousCount(str, target) {
  const results = str.match(
    new RegExp(`(${escapeStringRegexp(target)})+`, "g")
  );

  if (results === null) {
    return 0;
  }

  return results.reduce(
    (maxCount, result) => Math.max(maxCount, result.length / target.length),
    0
  );
}

function mapDoc(doc, callback) {
  if (doc.parts) {
    const parts = doc.parts.map(part => mapDoc(part, callback));
    return callback(Object.assign({}, doc, { parts }));
  }

  if (doc.contents) {
    const contents = mapDoc(doc.contents, callback);
    return callback(Object.assign({}, doc, { contents }));
  }

  return callback(doc);
}

/**
 * split text into whitespaces and words
 * @param {string} text
 * @return {Array<{ type: "whitespace", value: " " | "\n" | "" } | { type: "word", value: string }>}
 */
function splitText(text) {
  const KIND_NON_CJK = "non-cjk";
  const KIND_CJK_CHARACTER = "cjk-character";
  const KIND_CJK_PUNCTUATION = "cjk-punctuation";

  const nodes = [];

  text
    .replace(new RegExp(`(${cjkPattern})\n(${cjkPattern})`, "g"), "$1$2")
    .split(/([ \t\n]+)/)
    .forEach((token, index, tokens) => {
      // whitespace
      if (index % 2 === 1) {
        nodes.push({
          type: "whitespace",
          value: /\n/.test(token) ? "\n" : " "
        });
        return;
      }

      // word separated by whitespace

      if ((index === 0 || index === tokens.length - 1) && token === "") {
        return;
      }

      token
        .split(new RegExp(`(${cjkPattern})`))
        .forEach((innerToken, innerIndex, innerTokens) => {
          if (
            (innerIndex === 0 || innerIndex === innerTokens.length - 1) &&
            innerToken === ""
          ) {
            return;
          }

          // non-CJK word
          if (innerIndex % 2 === 0) {
            if (innerToken !== "") {
              appendNode({
                type: "word",
                value: innerToken,
                kind: KIND_NON_CJK,
                hasLeadingPunctuation: punctuationRegex.test(innerToken[0]),
                hasTrailingPunctuation: punctuationRegex.test(
                  getLast(innerToken)
                )
              });
            }
            return;
          }

          // CJK character
          appendNode(
            punctuationRegex.test(innerToken)
              ? {
                  type: "word",
                  value: innerToken,
                  kind: KIND_CJK_PUNCTUATION,
                  hasLeadingPunctuation: true,
                  hasTrailingPunctuation: true
                }
              : {
                  type: "word",
                  value: innerToken,
                  kind: KIND_CJK_CHARACTER,
                  hasLeadingPunctuation: false,
                  hasTrailingPunctuation: false
                }
          );
        });
    });

  return nodes;

  function appendNode(node) {
    const lastNode = getLast(nodes);
    if (lastNode && lastNode.type === "word") {
      if (
        (lastNode.kind === KIND_NON_CJK &&
          node.kind === KIND_CJK_CHARACTER &&
          !lastNode.hasTrailingPunctuation) ||
        (lastNode.kind === KIND_CJK_CHARACTER &&
          node.kind === KIND_NON_CJK &&
          !node.hasLeadingPunctuation)
      ) {
        nodes.push({ type: "whitespace", value: " " });
      } else if (
        !isBetween(KIND_NON_CJK, KIND_CJK_PUNCTUATION) &&
        // disallow leading/trailing full-width whitespace
        ![lastNode.value, node.value].some(value => /\u3000/.test(value))
      ) {
        nodes.push({ type: "whitespace", value: "" });
      }
    }
    nodes.push(node);

    function isBetween(kind1, kind2) {
      return (
        (lastNode.kind === kind1 && node.kind === kind2) ||
        (lastNode.kind === kind2 && node.kind === kind1)
      );
    }
  }
}

function getStringWidth(text) {
  if (!text) {
    return 0;
  }

  // emojis are considered 2-char width for consistency
  // see https://github.com/sindresorhus/string-width/issues/11
  // for the reason why not implemented in `string-width`
  return stringWidth(text.replace(emojiRegex, "  "));
}

function hasIgnoreComment(path$$1) {
  const node = path$$1.getValue();
  return hasNodeIgnoreComment(node);
}

function hasNodeIgnoreComment(node) {
  return (
    node &&
    node.comments &&
    node.comments.length > 0 &&
    node.comments.some(comment => comment.value.trim() === "prettier-ignore")
  );
}

function arrayify(object, keyName) {
  return Object.keys(object).reduce(
    (array, key) =>
      array.concat(Object.assign({ [keyName]: key }, object[key])),
    []
  );
}

var util$1 = {
  arrayify,
  punctuationRegex,
  punctuationCharRange,
  getStringWidth,
  splitText,
  mapDoc,
  getMaxContinuousCount,
  getPrecedence,
  shouldFlatten,
  isBitwiseOperator,
  isExportDeclaration,
  getParentExportDeclaration,
  getPenultimate,
  getLast,
  getNextNonSpaceNonCommentCharacterIndex,
  getNextNonSpaceNonCommentCharacter,
  skipWhitespace,
  skipSpaces,
  skipNewline,
  isNextLineEmptyAfterIndex,
  isNextLineEmpty,
  isPreviousLineEmpty,
  hasNewline,
  hasNewlineInRange,
  hasSpaces,
  locStart,
  locEnd,
  setLocStart,
  setLocEnd,
  startsWithNoLookaheadToken,
  hasBlockComments,
  isBlockComment,
  hasClosureCompilerTypeCastComment,
  getAlignmentSize,
  getIndentSize,
  printString,
  printNumber,
  hasIgnoreComment,
  hasNodeIgnoreComment
};

var dedent_1 = createCommonjsModule(function (module) {
"use strict";

function dedent(strings) {

  var raw = void 0;
  if (typeof strings === "string") {
    // dedent can be used as a plain function
    raw = [strings];
  } else {
    raw = strings.raw;
  }

  // first, perform interpolation
  var result = "";
  for (var i = 0; i < raw.length; i++) {
    result += raw[i].
    // join lines when there is a suppressed newline
    replace(/\\\n[ \t]*/g, "").

    // handle escaped backticks
    replace(/\\`/g, "`");

    if (i < (arguments.length <= 1 ? 0 : arguments.length - 1)) {
      result += arguments.length <= i + 1 ? undefined : arguments[i + 1];
    }
  }

  // now strip indentation
  var lines = result.split("\n");
  var mindent = null;
  lines.forEach(function (l) {
    var m = l.match(/^(\s+)\S+/);
    if (m) {
      var indent = m[1].length;
      if (!mindent) {
        // this is the first indented line
        mindent = indent;
      } else {
        mindent = Math.min(mindent, indent);
      }
    }
  });

  if (mindent !== null) {
    result = lines.map(function (l) {
      return l[0] === " " ? l.slice(mindent) : l;
    }).join("\n");
  }

  // dedent eats leading and trailing whitespace too
  result = result.trim();

  // handle escaped newlines at the end to ensure they don't get stripped too
  return result.replace(/\\n/g, "\n");
}

{
  module.exports = dedent;
}
});

var semver = createCommonjsModule(function (module, exports) {
exports = module.exports = SemVer;

// The debug function is excluded entirely from the minified version.
/* nomin */ var debug;
/* nomin */ if (typeof process === 'object' &&
    /* nomin */ process.env &&
    /* nomin */ process.env.NODE_DEBUG &&
    /* nomin */ /\bsemver\b/i.test(process.env.NODE_DEBUG))
  /* nomin */ debug = function() {
    /* nomin */ var args = Array.prototype.slice.call(arguments, 0);
    /* nomin */ args.unshift('SEMVER');
    /* nomin */ console.log.apply(console, args);
    /* nomin */ };
/* nomin */ else
  /* nomin */ debug = function() {};

// Note: this is the semver.org version of the spec that it implements
// Not necessarily the package version of this code.
exports.SEMVER_SPEC_VERSION = '2.0.0';

var MAX_LENGTH = 256;
var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;

// The actual regexps go on exports.re
var re = exports.re = [];
var src = exports.src = [];
var R = 0;

// The following Regular Expressions can be used for tokenizing,
// validating, and parsing SemVer version strings.

// ## Numeric Identifier
// A single `0`, or a non-zero digit followed by zero or more digits.

var NUMERICIDENTIFIER = R++;
src[NUMERICIDENTIFIER] = '0|[1-9]\\d*';
var NUMERICIDENTIFIERLOOSE = R++;
src[NUMERICIDENTIFIERLOOSE] = '[0-9]+';


// ## Non-numeric Identifier
// Zero or more digits, followed by a letter or hyphen, and then zero or
// more letters, digits, or hyphens.

var NONNUMERICIDENTIFIER = R++;
src[NONNUMERICIDENTIFIER] = '\\d*[a-zA-Z-][a-zA-Z0-9-]*';


// ## Main Version
// Three dot-separated numeric identifiers.

var MAINVERSION = R++;
src[MAINVERSION] = '(' + src[NUMERICIDENTIFIER] + ')\\.' +
                   '(' + src[NUMERICIDENTIFIER] + ')\\.' +
                   '(' + src[NUMERICIDENTIFIER] + ')';

var MAINVERSIONLOOSE = R++;
src[MAINVERSIONLOOSE] = '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' +
                        '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' +
                        '(' + src[NUMERICIDENTIFIERLOOSE] + ')';

// ## Pre-release Version Identifier
// A numeric identifier, or a non-numeric identifier.

var PRERELEASEIDENTIFIER = R++;
src[PRERELEASEIDENTIFIER] = '(?:' + src[NUMERICIDENTIFIER] +
                            '|' + src[NONNUMERICIDENTIFIER] + ')';

var PRERELEASEIDENTIFIERLOOSE = R++;
src[PRERELEASEIDENTIFIERLOOSE] = '(?:' + src[NUMERICIDENTIFIERLOOSE] +
                                 '|' + src[NONNUMERICIDENTIFIER] + ')';


// ## Pre-release Version
// Hyphen, followed by one or more dot-separated pre-release version
// identifiers.

var PRERELEASE = R++;
src[PRERELEASE] = '(?:-(' + src[PRERELEASEIDENTIFIER] +
                  '(?:\\.' + src[PRERELEASEIDENTIFIER] + ')*))';

var PRERELEASELOOSE = R++;
src[PRERELEASELOOSE] = '(?:-?(' + src[PRERELEASEIDENTIFIERLOOSE] +
                       '(?:\\.' + src[PRERELEASEIDENTIFIERLOOSE] + ')*))';

// ## Build Metadata Identifier
// Any combination of digits, letters, or hyphens.

var BUILDIDENTIFIER = R++;
src[BUILDIDENTIFIER] = '[0-9A-Za-z-]+';

// ## Build Metadata
// Plus sign, followed by one or more period-separated build metadata
// identifiers.

var BUILD = R++;
src[BUILD] = '(?:\\+(' + src[BUILDIDENTIFIER] +
             '(?:\\.' + src[BUILDIDENTIFIER] + ')*))';


// ## Full Version String
// A main version, followed optionally by a pre-release version and
// build metadata.

// Note that the only major, minor, patch, and pre-release sections of
// the version string are capturing groups.  The build metadata is not a
// capturing group, because it should not ever be used in version
// comparison.

var FULL = R++;
var FULLPLAIN = 'v?' + src[MAINVERSION] +
                src[PRERELEASE] + '?' +
                src[BUILD] + '?';

src[FULL] = '^' + FULLPLAIN + '$';

// like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
// also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
// common in the npm registry.
var LOOSEPLAIN = '[v=\\s]*' + src[MAINVERSIONLOOSE] +
                 src[PRERELEASELOOSE] + '?' +
                 src[BUILD] + '?';

var LOOSE = R++;
src[LOOSE] = '^' + LOOSEPLAIN + '$';

var GTLT = R++;
src[GTLT] = '((?:<|>)?=?)';

// Something like "2.*" or "1.2.x".
// Note that "x.x" is a valid xRange identifer, meaning "any version"
// Only the first item is strictly required.
var XRANGEIDENTIFIERLOOSE = R++;
src[XRANGEIDENTIFIERLOOSE] = src[NUMERICIDENTIFIERLOOSE] + '|x|X|\\*';
var XRANGEIDENTIFIER = R++;
src[XRANGEIDENTIFIER] = src[NUMERICIDENTIFIER] + '|x|X|\\*';

var XRANGEPLAIN = R++;
src[XRANGEPLAIN] = '[v=\\s]*(' + src[XRANGEIDENTIFIER] + ')' +
                   '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' +
                   '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' +
                   '(?:' + src[PRERELEASE] + ')?' +
                   src[BUILD] + '?' +
                   ')?)?';

var XRANGEPLAINLOOSE = R++;
src[XRANGEPLAINLOOSE] = '[v=\\s]*(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:' + src[PRERELEASELOOSE] + ')?' +
                        src[BUILD] + '?' +
                        ')?)?';

var XRANGE = R++;
src[XRANGE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAIN] + '$';
var XRANGELOOSE = R++;
src[XRANGELOOSE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAINLOOSE] + '$';

// Tilde ranges.
// Meaning is "reasonably at or greater than"
var LONETILDE = R++;
src[LONETILDE] = '(?:~>?)';

var TILDETRIM = R++;
src[TILDETRIM] = '(\\s*)' + src[LONETILDE] + '\\s+';
re[TILDETRIM] = new RegExp(src[TILDETRIM], 'g');
var tildeTrimReplace = '$1~';

var TILDE = R++;
src[TILDE] = '^' + src[LONETILDE] + src[XRANGEPLAIN] + '$';
var TILDELOOSE = R++;
src[TILDELOOSE] = '^' + src[LONETILDE] + src[XRANGEPLAINLOOSE] + '$';

// Caret ranges.
// Meaning is "at least and backwards compatible with"
var LONECARET = R++;
src[LONECARET] = '(?:\\^)';

var CARETTRIM = R++;
src[CARETTRIM] = '(\\s*)' + src[LONECARET] + '\\s+';
re[CARETTRIM] = new RegExp(src[CARETTRIM], 'g');
var caretTrimReplace = '$1^';

var CARET = R++;
src[CARET] = '^' + src[LONECARET] + src[XRANGEPLAIN] + '$';
var CARETLOOSE = R++;
src[CARETLOOSE] = '^' + src[LONECARET] + src[XRANGEPLAINLOOSE] + '$';

// A simple gt/lt/eq thing, or just "" to indicate "any version"
var COMPARATORLOOSE = R++;
src[COMPARATORLOOSE] = '^' + src[GTLT] + '\\s*(' + LOOSEPLAIN + ')$|^$';
var COMPARATOR = R++;
src[COMPARATOR] = '^' + src[GTLT] + '\\s*(' + FULLPLAIN + ')$|^$';


// An expression to strip any whitespace between the gtlt and the thing
// it modifies, so that `> 1.2.3` ==> `>1.2.3`
var COMPARATORTRIM = R++;
src[COMPARATORTRIM] = '(\\s*)' + src[GTLT] +
                      '\\s*(' + LOOSEPLAIN + '|' + src[XRANGEPLAIN] + ')';

// this one has to use the /g flag
re[COMPARATORTRIM] = new RegExp(src[COMPARATORTRIM], 'g');
var comparatorTrimReplace = '$1$2$3';


// Something like `1.2.3 - 1.2.4`
// Note that these all use the loose form, because they'll be
// checked against either the strict or loose comparator form
// later.
var HYPHENRANGE = R++;
src[HYPHENRANGE] = '^\\s*(' + src[XRANGEPLAIN] + ')' +
                   '\\s+-\\s+' +
                   '(' + src[XRANGEPLAIN] + ')' +
                   '\\s*$';

var HYPHENRANGELOOSE = R++;
src[HYPHENRANGELOOSE] = '^\\s*(' + src[XRANGEPLAINLOOSE] + ')' +
                        '\\s+-\\s+' +
                        '(' + src[XRANGEPLAINLOOSE] + ')' +
                        '\\s*$';

// Star ranges basically just allow anything at all.
var STAR = R++;
src[STAR] = '(<|>)?=?\\s*\\*';

// Compile to actual regexp objects.
// All are flag-free, unless they were created above with a flag.
for (var i = 0; i < R; i++) {
  debug(i, src[i]);
  if (!re[i])
    re[i] = new RegExp(src[i]);
}

exports.parse = parse;
function parse(version, loose) {
  if (version instanceof SemVer)
    return version;

  if (typeof version !== 'string')
    return null;

  if (version.length > MAX_LENGTH)
    return null;

  var r = loose ? re[LOOSE] : re[FULL];
  if (!r.test(version))
    return null;

  try {
    return new SemVer(version, loose);
  } catch (er) {
    return null;
  }
}

exports.valid = valid;
function valid(version, loose) {
  var v = parse(version, loose);
  return v ? v.version : null;
}


exports.clean = clean;
function clean(version, loose) {
  var s = parse(version.trim().replace(/^[=v]+/, ''), loose);
  return s ? s.version : null;
}

exports.SemVer = SemVer;

function SemVer(version, loose) {
  if (version instanceof SemVer) {
    if (version.loose === loose)
      return version;
    else
      version = version.version;
  } else if (typeof version !== 'string') {
    throw new TypeError('Invalid Version: ' + version);
  }

  if (version.length > MAX_LENGTH)
    throw new TypeError('version is longer than ' + MAX_LENGTH + ' characters')

  if (!(this instanceof SemVer))
    return new SemVer(version, loose);

  debug('SemVer', version, loose);
  this.loose = loose;
  var m = version.trim().match(loose ? re[LOOSE] : re[FULL]);

  if (!m)
    throw new TypeError('Invalid Version: ' + version);

  this.raw = version;

  // these are actually numbers
  this.major = +m[1];
  this.minor = +m[2];
  this.patch = +m[3];

  if (this.major > MAX_SAFE_INTEGER || this.major < 0)
    throw new TypeError('Invalid major version')

  if (this.minor > MAX_SAFE_INTEGER || this.minor < 0)
    throw new TypeError('Invalid minor version')

  if (this.patch > MAX_SAFE_INTEGER || this.patch < 0)
    throw new TypeError('Invalid patch version')

  // numberify any prerelease numeric ids
  if (!m[4])
    this.prerelease = [];
  else
    this.prerelease = m[4].split('.').map(function(id) {
      if (/^[0-9]+$/.test(id)) {
        var num = +id;
        if (num >= 0 && num < MAX_SAFE_INTEGER)
          return num;
      }
      return id;
    });

  this.build = m[5] ? m[5].split('.') : [];
  this.format();
}

SemVer.prototype.format = function() {
  this.version = this.major + '.' + this.minor + '.' + this.patch;
  if (this.prerelease.length)
    this.version += '-' + this.prerelease.join('.');
  return this.version;
};

SemVer.prototype.toString = function() {
  return this.version;
};

SemVer.prototype.compare = function(other) {
  debug('SemVer.compare', this.version, this.loose, other);
  if (!(other instanceof SemVer))
    other = new SemVer(other, this.loose);

  return this.compareMain(other) || this.comparePre(other);
};

SemVer.prototype.compareMain = function(other) {
  if (!(other instanceof SemVer))
    other = new SemVer(other, this.loose);

  return compareIdentifiers(this.major, other.major) ||
         compareIdentifiers(this.minor, other.minor) ||
         compareIdentifiers(this.patch, other.patch);
};

SemVer.prototype.comparePre = function(other) {
  if (!(other instanceof SemVer))
    other = new SemVer(other, this.loose);

  // NOT having a prerelease is > having one
  if (this.prerelease.length && !other.prerelease.length)
    return -1;
  else if (!this.prerelease.length && other.prerelease.length)
    return 1;
  else if (!this.prerelease.length && !other.prerelease.length)
    return 0;

  var i = 0;
  do {
    var a = this.prerelease[i];
    var b = other.prerelease[i];
    debug('prerelease compare', i, a, b);
    if (a === undefined && b === undefined)
      return 0;
    else if (b === undefined)
      return 1;
    else if (a === undefined)
      return -1;
    else if (a === b)
      continue;
    else
      return compareIdentifiers(a, b);
  } while (++i);
};

// preminor will bump the version up to the next minor release, and immediately
// down to pre-release. premajor and prepatch work the same way.
SemVer.prototype.inc = function(release, identifier) {
  switch (release) {
    case 'premajor':
      this.prerelease.length = 0;
      this.patch = 0;
      this.minor = 0;
      this.major++;
      this.inc('pre', identifier);
      break;
    case 'preminor':
      this.prerelease.length = 0;
      this.patch = 0;
      this.minor++;
      this.inc('pre', identifier);
      break;
    case 'prepatch':
      // If this is already a prerelease, it will bump to the next version
      // drop any prereleases that might already exist, since they are not
      // relevant at this point.
      this.prerelease.length = 0;
      this.inc('patch', identifier);
      this.inc('pre', identifier);
      break;
    // If the input is a non-prerelease version, this acts the same as
    // prepatch.
    case 'prerelease':
      if (this.prerelease.length === 0)
        this.inc('patch', identifier);
      this.inc('pre', identifier);
      break;

    case 'major':
      // If this is a pre-major version, bump up to the same major version.
      // Otherwise increment major.
      // 1.0.0-5 bumps to 1.0.0
      // 1.1.0 bumps to 2.0.0
      if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0)
        this.major++;
      this.minor = 0;
      this.patch = 0;
      this.prerelease = [];
      break;
    case 'minor':
      // If this is a pre-minor version, bump up to the same minor version.
      // Otherwise increment minor.
      // 1.2.0-5 bumps to 1.2.0
      // 1.2.1 bumps to 1.3.0
      if (this.patch !== 0 || this.prerelease.length === 0)
        this.minor++;
      this.patch = 0;
      this.prerelease = [];
      break;
    case 'patch':
      // If this is not a pre-release version, it will increment the patch.
      // If it is a pre-release it will bump up to the same patch version.
      // 1.2.0-5 patches to 1.2.0
      // 1.2.0 patches to 1.2.1
      if (this.prerelease.length === 0)
        this.patch++;
      this.prerelease = [];
      break;
    // This probably shouldn't be used publicly.
    // 1.0.0 "pre" would become 1.0.0-0 which is the wrong direction.
    case 'pre':
      if (this.prerelease.length === 0)
        this.prerelease = [0];
      else {
        var i = this.prerelease.length;
        while (--i >= 0) {
          if (typeof this.prerelease[i] === 'number') {
            this.prerelease[i]++;
            i = -2;
          }
        }
        if (i === -1) // didn't increment anything
          this.prerelease.push(0);
      }
      if (identifier) {
        // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
        // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
        if (this.prerelease[0] === identifier) {
          if (isNaN(this.prerelease[1]))
            this.prerelease = [identifier, 0];
        } else
          this.prerelease = [identifier, 0];
      }
      break;

    default:
      throw new Error('invalid increment argument: ' + release);
  }
  this.format();
  this.raw = this.version;
  return this;
};

exports.inc = inc;
function inc(version, release, loose, identifier) {
  if (typeof(loose) === 'string') {
    identifier = loose;
    loose = undefined;
  }

  try {
    return new SemVer(version, loose).inc(release, identifier).version;
  } catch (er) {
    return null;
  }
}

exports.diff = diff;
function diff(version1, version2) {
  if (eq(version1, version2)) {
    return null;
  } else {
    var v1 = parse(version1);
    var v2 = parse(version2);
    if (v1.prerelease.length || v2.prerelease.length) {
      for (var key in v1) {
        if (key === 'major' || key === 'minor' || key === 'patch') {
          if (v1[key] !== v2[key]) {
            return 'pre'+key;
          }
        }
      }
      return 'prerelease';
    }
    for (var key in v1) {
      if (key === 'major' || key === 'minor' || key === 'patch') {
        if (v1[key] !== v2[key]) {
          return key;
        }
      }
    }
  }
}

exports.compareIdentifiers = compareIdentifiers;

var numeric = /^[0-9]+$/;
function compareIdentifiers(a, b) {
  var anum = numeric.test(a);
  var bnum = numeric.test(b);

  if (anum && bnum) {
    a = +a;
    b = +b;
  }

  return (anum && !bnum) ? -1 :
         (bnum && !anum) ? 1 :
         a < b ? -1 :
         a > b ? 1 :
         0;
}

exports.rcompareIdentifiers = rcompareIdentifiers;
function rcompareIdentifiers(a, b) {
  return compareIdentifiers(b, a);
}

exports.major = major;
function major(a, loose) {
  return new SemVer(a, loose).major;
}

exports.minor = minor;
function minor(a, loose) {
  return new SemVer(a, loose).minor;
}

exports.patch = patch;
function patch(a, loose) {
  return new SemVer(a, loose).patch;
}

exports.compare = compare;
function compare(a, b, loose) {
  return new SemVer(a, loose).compare(new SemVer(b, loose));
}

exports.compareLoose = compareLoose;
function compareLoose(a, b) {
  return compare(a, b, true);
}

exports.rcompare = rcompare;
function rcompare(a, b, loose) {
  return compare(b, a, loose);
}

exports.sort = sort;
function sort(list, loose) {
  return list.sort(function(a, b) {
    return exports.compare(a, b, loose);
  });
}

exports.rsort = rsort;
function rsort(list, loose) {
  return list.sort(function(a, b) {
    return exports.rcompare(a, b, loose);
  });
}

exports.gt = gt;
function gt(a, b, loose) {
  return compare(a, b, loose) > 0;
}

exports.lt = lt;
function lt(a, b, loose) {
  return compare(a, b, loose) < 0;
}

exports.eq = eq;
function eq(a, b, loose) {
  return compare(a, b, loose) === 0;
}

exports.neq = neq;
function neq(a, b, loose) {
  return compare(a, b, loose) !== 0;
}

exports.gte = gte;
function gte(a, b, loose) {
  return compare(a, b, loose) >= 0;
}

exports.lte = lte;
function lte(a, b, loose) {
  return compare(a, b, loose) <= 0;
}

exports.cmp = cmp;
function cmp(a, op, b, loose) {
  var ret;
  switch (op) {
    case '===':
      if (typeof a === 'object') a = a.version;
      if (typeof b === 'object') b = b.version;
      ret = a === b;
      break;
    case '!==':
      if (typeof a === 'object') a = a.version;
      if (typeof b === 'object') b = b.version;
      ret = a !== b;
      break;
    case '': case '=': case '==': ret = eq(a, b, loose); break;
    case '!=': ret = neq(a, b, loose); break;
    case '>': ret = gt(a, b, loose); break;
    case '>=': ret = gte(a, b, loose); break;
    case '<': ret = lt(a, b, loose); break;
    case '<=': ret = lte(a, b, loose); break;
    default: throw new TypeError('Invalid operator: ' + op);
  }
  return ret;
}

exports.Comparator = Comparator;
function Comparator(comp, loose) {
  if (comp instanceof Comparator) {
    if (comp.loose === loose)
      return comp;
    else
      comp = comp.value;
  }

  if (!(this instanceof Comparator))
    return new Comparator(comp, loose);

  debug('comparator', comp, loose);
  this.loose = loose;
  this.parse(comp);

  if (this.semver === ANY)
    this.value = '';
  else
    this.value = this.operator + this.semver.version;

  debug('comp', this);
}

var ANY = {};
Comparator.prototype.parse = function(comp) {
  var r = this.loose ? re[COMPARATORLOOSE] : re[COMPARATOR];
  var m = comp.match(r);

  if (!m)
    throw new TypeError('Invalid comparator: ' + comp);

  this.operator = m[1];
  if (this.operator === '=')
    this.operator = '';

  // if it literally is just '>' or '' then allow anything.
  if (!m[2])
    this.semver = ANY;
  else
    this.semver = new SemVer(m[2], this.loose);
};

Comparator.prototype.toString = function() {
  return this.value;
};

Comparator.prototype.test = function(version) {
  debug('Comparator.test', version, this.loose);

  if (this.semver === ANY)
    return true;

  if (typeof version === 'string')
    version = new SemVer(version, this.loose);

  return cmp(version, this.operator, this.semver, this.loose);
};

Comparator.prototype.intersects = function(comp, loose) {
  if (!(comp instanceof Comparator)) {
    throw new TypeError('a Comparator is required');
  }

  var rangeTmp;

  if (this.operator === '') {
    rangeTmp = new Range(comp.value, loose);
    return satisfies(this.value, rangeTmp, loose);
  } else if (comp.operator === '') {
    rangeTmp = new Range(this.value, loose);
    return satisfies(comp.semver, rangeTmp, loose);
  }

  var sameDirectionIncreasing =
    (this.operator === '>=' || this.operator === '>') &&
    (comp.operator === '>=' || comp.operator === '>');
  var sameDirectionDecreasing =
    (this.operator === '<=' || this.operator === '<') &&
    (comp.operator === '<=' || comp.operator === '<');
  var sameSemVer = this.semver.version === comp.semver.version;
  var differentDirectionsInclusive =
    (this.operator === '>=' || this.operator === '<=') &&
    (comp.operator === '>=' || comp.operator === '<=');
  var oppositeDirectionsLessThan =
    cmp(this.semver, '<', comp.semver, loose) &&
    ((this.operator === '>=' || this.operator === '>') &&
    (comp.operator === '<=' || comp.operator === '<'));
  var oppositeDirectionsGreaterThan =
    cmp(this.semver, '>', comp.semver, loose) &&
    ((this.operator === '<=' || this.operator === '<') &&
    (comp.operator === '>=' || comp.operator === '>'));

  return sameDirectionIncreasing || sameDirectionDecreasing ||
    (sameSemVer && differentDirectionsInclusive) ||
    oppositeDirectionsLessThan || oppositeDirectionsGreaterThan;
};


exports.Range = Range;
function Range(range, loose) {
  if (range instanceof Range) {
    if (range.loose === loose) {
      return range;
    } else {
      return new Range(range.raw, loose);
    }
  }

  if (range instanceof Comparator) {
    return new Range(range.value, loose);
  }

  if (!(this instanceof Range))
    return new Range(range, loose);

  this.loose = loose;

  // First, split based on boolean or ||
  this.raw = range;
  this.set = range.split(/\s*\|\|\s*/).map(function(range) {
    return this.parseRange(range.trim());
  }, this).filter(function(c) {
    // throw out any that are not relevant for whatever reason
    return c.length;
  });

  if (!this.set.length) {
    throw new TypeError('Invalid SemVer Range: ' + range);
  }

  this.format();
}

Range.prototype.format = function() {
  this.range = this.set.map(function(comps) {
    return comps.join(' ').trim();
  }).join('||').trim();
  return this.range;
};

Range.prototype.toString = function() {
  return this.range;
};

Range.prototype.parseRange = function(range) {
  var loose = this.loose;
  range = range.trim();
  debug('range', range, loose);
  // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`
  var hr = loose ? re[HYPHENRANGELOOSE] : re[HYPHENRANGE];
  range = range.replace(hr, hyphenReplace);
  debug('hyphen replace', range);
  // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
  range = range.replace(re[COMPARATORTRIM], comparatorTrimReplace);
  debug('comparator trim', range, re[COMPARATORTRIM]);

  // `~ 1.2.3` => `~1.2.3`
  range = range.replace(re[TILDETRIM], tildeTrimReplace);

  // `^ 1.2.3` => `^1.2.3`
  range = range.replace(re[CARETTRIM], caretTrimReplace);

  // normalize spaces
  range = range.split(/\s+/).join(' ');

  // At this point, the range is completely trimmed and
  // ready to be split into comparators.

  var compRe = loose ? re[COMPARATORLOOSE] : re[COMPARATOR];
  var set = range.split(' ').map(function(comp) {
    return parseComparator(comp, loose);
  }).join(' ').split(/\s+/);
  if (this.loose) {
    // in loose mode, throw out any that are not valid comparators
    set = set.filter(function(comp) {
      return !!comp.match(compRe);
    });
  }
  set = set.map(function(comp) {
    return new Comparator(comp, loose);
  });

  return set;
};

Range.prototype.intersects = function(range, loose) {
  if (!(range instanceof Range)) {
    throw new TypeError('a Range is required');
  }

  return this.set.some(function(thisComparators) {
    return thisComparators.every(function(thisComparator) {
      return range.set.some(function(rangeComparators) {
        return rangeComparators.every(function(rangeComparator) {
          return thisComparator.intersects(rangeComparator, loose);
        });
      });
    });
  });
};

// Mostly just for testing and legacy API reasons
exports.toComparators = toComparators;
function toComparators(range, loose) {
  return new Range(range, loose).set.map(function(comp) {
    return comp.map(function(c) {
      return c.value;
    }).join(' ').trim().split(' ');
  });
}

// comprised of xranges, tildes, stars, and gtlt's at this point.
// already replaced the hyphen ranges
// turn into a set of JUST comparators.
function parseComparator(comp, loose) {
  debug('comp', comp);
  comp = replaceCarets(comp, loose);
  debug('caret', comp);
  comp = replaceTildes(comp, loose);
  debug('tildes', comp);
  comp = replaceXRanges(comp, loose);
  debug('xrange', comp);
  comp = replaceStars(comp, loose);
  debug('stars', comp);
  return comp;
}

function isX(id) {
  return !id || id.toLowerCase() === 'x' || id === '*';
}

// ~, ~> --> * (any, kinda silly)
// ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0
// ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0
// ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0
// ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0
// ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0
function replaceTildes(comp, loose) {
  return comp.trim().split(/\s+/).map(function(comp) {
    return replaceTilde(comp, loose);
  }).join(' ');
}

function replaceTilde(comp, loose) {
  var r = loose ? re[TILDELOOSE] : re[TILDE];
  return comp.replace(r, function(_, M, m, p, pr) {
    debug('tilde', comp, _, M, m, p, pr);
    var ret;

    if (isX(M))
      ret = '';
    else if (isX(m))
      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';
    else if (isX(p))
      // ~1.2 == >=1.2.0 <1.3.0
      ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';
    else if (pr) {
      debug('replaceTilde pr', pr);
      if (pr.charAt(0) !== '-')
        pr = '-' + pr;
      ret = '>=' + M + '.' + m + '.' + p + pr +
            ' <' + M + '.' + (+m + 1) + '.0';
    } else
      // ~1.2.3 == >=1.2.3 <1.3.0
      ret = '>=' + M + '.' + m + '.' + p +
            ' <' + M + '.' + (+m + 1) + '.0';

    debug('tilde return', ret);
    return ret;
  });
}

// ^ --> * (any, kinda silly)
// ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0
// ^2.0, ^2.0.x --> >=2.0.0 <3.0.0
// ^1.2, ^1.2.x --> >=1.2.0 <2.0.0
// ^1.2.3 --> >=1.2.3 <2.0.0
// ^1.2.0 --> >=1.2.0 <2.0.0
function replaceCarets(comp, loose) {
  return comp.trim().split(/\s+/).map(function(comp) {
    return replaceCaret(comp, loose);
  }).join(' ');
}

function replaceCaret(comp, loose) {
  debug('caret', comp, loose);
  var r = loose ? re[CARETLOOSE] : re[CARET];
  return comp.replace(r, function(_, M, m, p, pr) {
    debug('caret', comp, _, M, m, p, pr);
    var ret;

    if (isX(M))
      ret = '';
    else if (isX(m))
      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';
    else if (isX(p)) {
      if (M === '0')
        ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';
      else
        ret = '>=' + M + '.' + m + '.0 <' + (+M + 1) + '.0.0';
    } else if (pr) {
      debug('replaceCaret pr', pr);
      if (pr.charAt(0) !== '-')
        pr = '-' + pr;
      if (M === '0') {
        if (m === '0')
          ret = '>=' + M + '.' + m + '.' + p + pr +
                ' <' + M + '.' + m + '.' + (+p + 1);
        else
          ret = '>=' + M + '.' + m + '.' + p + pr +
                ' <' + M + '.' + (+m + 1) + '.0';
      } else
        ret = '>=' + M + '.' + m + '.' + p + pr +
              ' <' + (+M + 1) + '.0.0';
    } else {
      debug('no pr');
      if (M === '0') {
        if (m === '0')
          ret = '>=' + M + '.' + m + '.' + p +
                ' <' + M + '.' + m + '.' + (+p + 1);
        else
          ret = '>=' + M + '.' + m + '.' + p +
                ' <' + M + '.' + (+m + 1) + '.0';
      } else
        ret = '>=' + M + '.' + m + '.' + p +
              ' <' + (+M + 1) + '.0.0';
    }

    debug('caret return', ret);
    return ret;
  });
}

function replaceXRanges(comp, loose) {
  debug('replaceXRanges', comp, loose);
  return comp.split(/\s+/).map(function(comp) {
    return replaceXRange(comp, loose);
  }).join(' ');
}

function replaceXRange(comp, loose) {
  comp = comp.trim();
  var r = loose ? re[XRANGELOOSE] : re[XRANGE];
  return comp.replace(r, function(ret, gtlt, M, m, p, pr) {
    debug('xRange', comp, ret, gtlt, M, m, p, pr);
    var xM = isX(M);
    var xm = xM || isX(m);
    var xp = xm || isX(p);
    var anyX = xp;

    if (gtlt === '=' && anyX)
      gtlt = '';

    if (xM) {
      if (gtlt === '>' || gtlt === '<') {
        // nothing is allowed
        ret = '<0.0.0';
      } else {
        // nothing is forbidden
        ret = '*';
      }
    } else if (gtlt && anyX) {
      // replace X with 0
      if (xm)
        m = 0;
      if (xp)
        p = 0;

      if (gtlt === '>') {
        // >1 => >=2.0.0
        // >1.2 => >=1.3.0
        // >1.2.3 => >= 1.2.4
        gtlt = '>=';
        if (xm) {
          M = +M + 1;
          m = 0;
          p = 0;
        } else if (xp) {
          m = +m + 1;
          p = 0;
        }
      } else if (gtlt === '<=') {
        // <=0.7.x is actually <0.8.0, since any 0.7.x should
        // pass.  Similarly, <=7.x is actually <8.0.0, etc.
        gtlt = '<';
        if (xm)
          M = +M + 1;
        else
          m = +m + 1;
      }

      ret = gtlt + M + '.' + m + '.' + p;
    } else if (xm) {
      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';
    } else if (xp) {
      ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';
    }

    debug('xRange return', ret);

    return ret;
  });
}

// Because * is AND-ed with everything else in the comparator,
// and '' means "any version", just remove the *s entirely.
function replaceStars(comp, loose) {
  debug('replaceStars', comp, loose);
  // Looseness is ignored here.  star is always as loose as it gets!
  return comp.trim().replace(re[STAR], '');
}

// This function is passed to string.replace(re[HYPHENRANGE])
// M, m, patch, prerelease, build
// 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
// 1.2.3 - 3.4 => >=1.2.0 <3.5.0 Any 3.4.x will do
// 1.2 - 3.4 => >=1.2.0 <3.5.0
function hyphenReplace($0,
                       from, fM, fm, fp, fpr, fb,
                       to, tM, tm, tp, tpr, tb) {

  if (isX(fM))
    from = '';
  else if (isX(fm))
    from = '>=' + fM + '.0.0';
  else if (isX(fp))
    from = '>=' + fM + '.' + fm + '.0';
  else
    from = '>=' + from;

  if (isX(tM))
    to = '';
  else if (isX(tm))
    to = '<' + (+tM + 1) + '.0.0';
  else if (isX(tp))
    to = '<' + tM + '.' + (+tm + 1) + '.0';
  else if (tpr)
    to = '<=' + tM + '.' + tm + '.' + tp + '-' + tpr;
  else
    to = '<=' + to;

  return (from + ' ' + to).trim();
}


// if ANY of the sets match ALL of its comparators, then pass
Range.prototype.test = function(version) {
  if (!version)
    return false;

  if (typeof version === 'string')
    version = new SemVer(version, this.loose);

  for (var i = 0; i < this.set.length; i++) {
    if (testSet(this.set[i], version))
      return true;
  }
  return false;
};

function testSet(set, version) {
  for (var i = 0; i < set.length; i++) {
    if (!set[i].test(version))
      return false;
  }

  if (version.prerelease.length) {
    // Find the set of versions that are allowed to have prereleases
    // For example, ^1.2.3-pr.1 desugars to >=1.2.3-pr.1 <2.0.0
    // That should allow `1.2.3-pr.2` to pass.
    // However, `1.2.4-alpha.notready` should NOT be allowed,
    // even though it's within the range set by the comparators.
    for (var i = 0; i < set.length; i++) {
      debug(set[i].semver);
      if (set[i].semver === ANY)
        continue;

      if (set[i].semver.prerelease.length > 0) {
        var allowed = set[i].semver;
        if (allowed.major === version.major &&
            allowed.minor === version.minor &&
            allowed.patch === version.patch)
          return true;
      }
    }

    // Version has a -pre, but it's not one of the ones we like.
    return false;
  }

  return true;
}

exports.satisfies = satisfies;
function satisfies(version, range, loose) {
  try {
    range = new Range(range, loose);
  } catch (er) {
    return false;
  }
  return range.test(version);
}

exports.maxSatisfying = maxSatisfying;
function maxSatisfying(versions, range, loose) {
  var max = null;
  var maxSV = null;
  try {
    var rangeObj = new Range(range, loose);
  } catch (er) {
    return null;
  }
  versions.forEach(function (v) {
    if (rangeObj.test(v)) { // satisfies(v, range, loose)
      if (!max || maxSV.compare(v) === -1) { // compare(max, v, true)
        max = v;
        maxSV = new SemVer(max, loose);
      }
    }
  });
  return max;
}

exports.minSatisfying = minSatisfying;
function minSatisfying(versions, range, loose) {
  var min = null;
  var minSV = null;
  try {
    var rangeObj = new Range(range, loose);
  } catch (er) {
    return null;
  }
  versions.forEach(function (v) {
    if (rangeObj.test(v)) { // satisfies(v, range, loose)
      if (!min || minSV.compare(v) === 1) { // compare(min, v, true)
        min = v;
        minSV = new SemVer(min, loose);
      }
    }
  });
  return min;
}

exports.validRange = validRange;
function validRange(range, loose) {
  try {
    // Return '*' instead of '' so that truthiness works.
    // This will throw if it's invalid anyway
    return new Range(range, loose).range || '*';
  } catch (er) {
    return null;
  }
}

// Determine if version is less than all the versions possible in the range
exports.ltr = ltr;
function ltr(version, range, loose) {
  return outside(version, range, '<', loose);
}

// Determine if version is greater than all the versions possible in the range.
exports.gtr = gtr;
function gtr(version, range, loose) {
  return outside(version, range, '>', loose);
}

exports.outside = outside;
function outside(version, range, hilo, loose) {
  version = new SemVer(version, loose);
  range = new Range(range, loose);

  var gtfn, ltefn, ltfn, comp, ecomp;
  switch (hilo) {
    case '>':
      gtfn = gt;
      ltefn = lte;
      ltfn = lt;
      comp = '>';
      ecomp = '>=';
      break;
    case '<':
      gtfn = lt;
      ltefn = gte;
      ltfn = gt;
      comp = '<';
      ecomp = '<=';
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }

  // If it satisifes the range it is not outside
  if (satisfies(version, range, loose)) {
    return false;
  }

  // From now on, variable terms are as if we're in "gtr" mode.
  // but note that everything is flipped for the "ltr" function.

  for (var i = 0; i < range.set.length; ++i) {
    var comparators = range.set[i];

    var high = null;
    var low = null;

    comparators.forEach(function(comparator) {
      if (comparator.semver === ANY) {
        comparator = new Comparator('>=0.0.0');
      }
      high = high || comparator;
      low = low || comparator;
      if (gtfn(comparator.semver, high.semver, loose)) {
        high = comparator;
      } else if (ltfn(comparator.semver, low.semver, loose)) {
        low = comparator;
      }
    });

    // If the edge version comparator has a operator then our version
    // isn't outside it
    if (high.operator === comp || high.operator === ecomp) {
      return false;
    }

    // If the lowest version comparator has an operator and our version
    // is less than it then it isn't higher than the range
    if ((!low.operator || low.operator === comp) &&
        ltefn(version, low.semver)) {
      return false;
    } else if (low.operator === ecomp && ltfn(version, low.semver)) {
      return false;
    }
  }
  return true;
}

exports.prerelease = prerelease;
function prerelease(version, loose) {
  var parsed = parse(version, loose);
  return (parsed && parsed.prerelease.length) ? parsed.prerelease : null;
}

exports.intersects = intersects;
function intersects(r1, r2, loose) {
  r1 = new Range(r1, loose);
  r2 = new Range(r2, loose);
  return r1.intersects(r2)
}
});

var assert$1 = true;
var buffer_ieee754 = "< 0.9.7";
var buffer = true;
var child_process = true;
var cluster = true;
var console$1 = true;
var constants = true;
var crypto = true;
var _debugger = "< 8";
var dgram = true;
var dns = true;
var domain = true;
var events = true;
var freelist = "< 6";
var fs$1 = true;
var http = true;
var http2 = ">= 8.8";
var https = true;
var _http_server = ">= 0.11";
var _linklist = "< 8";
var module$1 = true;
var net = true;
var os$2 = true;
var path$1 = true;
var perf_hooks = ">= 8.5";
var process$1 = ">= 1";
var punycode = true;
var querystring = true;
var readline = true;
var repl = true;
var stream = true;
var string_decoder = true;
var sys = true;
var timers = true;
var tls = true;
var tty = true;
var url$1 = true;
var util$3 = true;
var v8 = ">= 1";
var vm = true;
var zlib = true;
var core$1 = {
	assert: assert$1,
	buffer_ieee754: buffer_ieee754,
	buffer: buffer,
	child_process: child_process,
	cluster: cluster,
	console: console$1,
	constants: constants,
	crypto: crypto,
	_debugger: _debugger,
	dgram: dgram,
	dns: dns,
	domain: domain,
	events: events,
	freelist: freelist,
	fs: fs$1,
	http: http,
	http2: http2,
	https: https,
	_http_server: _http_server,
	_linklist: _linklist,
	module: module$1,
	net: net,
	os: os$2,
	path: path$1,
	perf_hooks: perf_hooks,
	process: process$1,
	punycode: punycode,
	querystring: querystring,
	readline: readline,
	repl: repl,
	stream: stream,
	string_decoder: string_decoder,
	sys: sys,
	timers: timers,
	tls: tls,
	tty: tty,
	url: url$1,
	util: util$3,
	v8: v8,
	vm: vm,
	zlib: zlib
};

var core$2 = Object.freeze({
	assert: assert$1,
	buffer_ieee754: buffer_ieee754,
	buffer: buffer,
	child_process: child_process,
	cluster: cluster,
	console: console$1,
	constants: constants,
	crypto: crypto,
	_debugger: _debugger,
	dgram: dgram,
	dns: dns,
	domain: domain,
	events: events,
	freelist: freelist,
	fs: fs$1,
	http: http,
	http2: http2,
	https: https,
	_http_server: _http_server,
	_linklist: _linklist,
	module: module$1,
	net: net,
	os: os$2,
	path: path$1,
	perf_hooks: perf_hooks,
	process: process$1,
	punycode: punycode,
	querystring: querystring,
	readline: readline,
	repl: repl,
	stream: stream,
	string_decoder: string_decoder,
	sys: sys,
	timers: timers,
	tls: tls,
	tty: tty,
	url: url$1,
	util: util$3,
	v8: v8,
	vm: vm,
	zlib: zlib,
	default: core$1
});

var data = ( core$2 && core$1 ) || core$2;

var current = (process.versions && process.versions.node && process.versions.node.split('.')) || [];

function versionIncluded(specifier) {
    if (specifier === true) { return true; }
    var parts = specifier.split(' ');
    var op = parts[0];
    var versionParts = parts[1].split('.');

    for (var i = 0; i < 3; ++i) {
        var cur = Number(current[i] || 0);
        var ver = Number(versionParts[i] || 0);
        if (cur === ver) {
            continue; // eslint-disable-line no-restricted-syntax, no-continue
        }
        if (op === '<') {
            return cur < ver;
        } else if (op === '>=') {
            return cur >= ver;
        } else {
            return false;
        }
    }
    return false;
}



var core = {};
for (var mod in data) { // eslint-disable-line no-restricted-syntax
    if (Object.prototype.hasOwnProperty.call(data, mod)) {
        core[mod] = versionIncluded(data[mod]);
    }
}
var core_1 = core;

var caller = function () {
    // see https://code.google.com/p/v8/wiki/JavaScriptStackTraceApi
    var origPrepareStackTrace = Error.prepareStackTrace;
    Error.prepareStackTrace = function (_, stack) { return stack; };
    var stack = (new Error()).stack;
    Error.prepareStackTrace = origPrepareStackTrace;
    return stack[2].getFileName();
};

var pathParse = createCommonjsModule(function (module) {
'use strict';

var isWindows = process.platform === 'win32';

// Regex to split a windows path into three parts: [*, device, slash,
// tail] windows-only
var splitDeviceRe =
    /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/;

// Regex to split the tail part of the above into [*, dir, basename, ext]
var splitTailRe =
    /^([\s\S]*?)((?:\.{1,2}|[^\\\/]+?|)(\.[^.\/\\]*|))(?:[\\\/]*)$/;

var win32 = {};

// Function to split a filename into [root, dir, basename, ext]
function win32SplitPath(filename) {
  // Separate device+slash from tail
  var result = splitDeviceRe.exec(filename),
      device = (result[1] || '') + (result[2] || ''),
      tail = result[3] || '';
  // Split the tail into dir, basename and extension
  var result2 = splitTailRe.exec(tail),
      dir = result2[1],
      basename = result2[2],
      ext = result2[3];
  return [device, dir, basename, ext];
}

win32.parse = function(pathString) {
  if (typeof pathString !== 'string') {
    throw new TypeError(
        "Parameter 'pathString' must be a string, not " + typeof pathString
    );
  }
  var allParts = win32SplitPath(pathString);
  if (!allParts || allParts.length !== 4) {
    throw new TypeError("Invalid path '" + pathString + "'");
  }
  return {
    root: allParts[0],
    dir: allParts[0] + allParts[1].slice(0, -1),
    base: allParts[2],
    ext: allParts[3],
    name: allParts[2].slice(0, allParts[2].length - allParts[3].length)
  };
};



// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var posix = {};


function posixSplitPath(filename) {
  return splitPathRe.exec(filename).slice(1);
}


posix.parse = function(pathString) {
  if (typeof pathString !== 'string') {
    throw new TypeError(
        "Parameter 'pathString' must be a string, not " + typeof pathString
    );
  }
  var allParts = posixSplitPath(pathString);
  if (!allParts || allParts.length !== 4) {
    throw new TypeError("Invalid path '" + pathString + "'");
  }
  allParts[1] = allParts[1] || '';
  allParts[2] = allParts[2] || '';
  allParts[3] = allParts[3] || '';

  return {
    root: allParts[0],
    dir: allParts[0] + allParts[1].slice(0, -1),
    base: allParts[2],
    ext: allParts[3],
    name: allParts[2].slice(0, allParts[2].length - allParts[3].length)
  };
};


if (isWindows)
  module.exports = win32.parse;
else /* posix */
  module.exports = posix.parse;

module.exports.posix = posix.parse;
module.exports.win32 = win32.parse;
});

var parse$1 = path.parse || pathParse;

var nodeModulesPaths = function nodeModulesPaths(start, opts) {
    var modules = opts && opts.moduleDirectory
        ? [].concat(opts.moduleDirectory)
        : ['node_modules'];

    // ensure that `start` is an absolute path at this point,
    // resolving against the process' current working directory
    var absoluteStart = path.resolve(start);

    if (opts && opts.preserveSymlinks === false) {
        try {
            absoluteStart = fs.realpathSync(absoluteStart);
        } catch (err) {
            if (err.code !== 'ENOENT') {
                throw err;
            }
        }
    }

    var prefix = '/';
    if (/^([A-Za-z]:)/.test(absoluteStart)) {
        prefix = '';
    } else if (/^\\\\/.test(absoluteStart)) {
        prefix = '\\\\';
    }

    var paths = [absoluteStart];
    var parsed = parse$1(absoluteStart);
    while (parsed.dir !== paths[paths.length - 1]) {
        paths.push(parsed.dir);
        parsed = parse$1(parsed.dir);
    }

    var dirs = paths.reduce(function (dirs, aPath) {
        return dirs.concat(modules.map(function (moduleDir) {
            return path.join(prefix, aPath, moduleDir);
        }));
    }, []);

    return opts && opts.paths ? dirs.concat(opts.paths) : dirs;
};

var async = function resolve(x, options, callback) {
    var cb = callback;
    var opts = options || {};
    if (typeof opts === 'function') {
        cb = opts;
        opts = {};
    }
    if (typeof x !== 'string') {
        var err = new TypeError('Path must be a string.');
        return process.nextTick(function () {
            cb(err);
        });
    }

    var isFile = opts.isFile || function (file, cb) {
        fs.stat(file, function (err, stat) {
            if (!err) {
                return cb(null, stat.isFile() || stat.isFIFO());
            }
            if (err.code === 'ENOENT' || err.code === 'ENOTDIR') return cb(null, false);
            return cb(err);
        });
    };
    var readFile = opts.readFile || fs.readFile;

    var extensions = opts.extensions || ['.js'];
    var y = opts.basedir || path.dirname(caller());

    opts.paths = opts.paths || [];

    if (/^(?:\.\.?(?:\/|$)|\/|([A-Za-z]:)?[/\\])/.test(x)) {
        var res = path.resolve(y, x);
        if (x === '..' || x.slice(-1) === '/') res += '/';
        if (/\/$/.test(x) && res === y) {
            loadAsDirectory(res, opts.package, onfile);
        } else loadAsFile(res, opts.package, onfile);
    } else loadNodeModules(x, y, function (err, n, pkg) {
        if (err) cb(err);
        else if (n) cb(null, n, pkg);
        else if (core_1[x]) return cb(null, x);
        else {
            var moduleError = new Error("Cannot find module '" + x + "' from '" + y + "'");
            moduleError.code = 'MODULE_NOT_FOUND';
            cb(moduleError);
        }
    });

    function onfile(err, m, pkg) {
        if (err) cb(err);
        else if (m) cb(null, m, pkg);
        else loadAsDirectory(res, function (err, d, pkg) {
            if (err) cb(err);
            else if (d) cb(null, d, pkg);
            else {
                var moduleError = new Error("Cannot find module '" + x + "' from '" + y + "'");
                moduleError.code = 'MODULE_NOT_FOUND';
                cb(moduleError);
            }
        });
    }

    function loadAsFile(x, thePackage, callback) {
        var loadAsFilePackage = thePackage;
        var cb = callback;
        if (typeof loadAsFilePackage === 'function') {
            cb = loadAsFilePackage;
            loadAsFilePackage = undefined;
        }

        var exts = [''].concat(extensions);
        load(exts, x, loadAsFilePackage);

        function load(exts, x, loadPackage) {
            if (exts.length === 0) return cb(null, undefined, loadPackage);
            var file = x + exts[0];

            var pkg = loadPackage;
            if (pkg) onpkg(null, pkg);
            else loadpkg(path.dirname(file), onpkg);

            function onpkg(err, pkg_, dir) {
                pkg = pkg_;
                if (err) return cb(err);
                if (dir && pkg && opts.pathFilter) {
                    var rfile = path.relative(dir, file);
                    var rel = rfile.slice(0, rfile.length - exts[0].length);
                    var r = opts.pathFilter(pkg, x, rel);
                    if (r) return load(
                        [''].concat(extensions.slice()),
                        path.resolve(dir, r),
                        pkg
                    );
                }
                isFile(file, onex);
            }
            function onex(err, ex) {
                if (err) return cb(err);
                if (ex) return cb(null, file, pkg);
                load(exts.slice(1), x, pkg);
            }
        }
    }

    function loadpkg(dir, cb) {
        if (dir === '' || dir === '/') return cb(null);
        if (process.platform === 'win32' && (/^\w:[/\\]*$/).test(dir)) {
            return cb(null);
        }
        if (/[/\\]node_modules[/\\]*$/.test(dir)) return cb(null);

        var pkgfile = path.join(dir, 'package.json');
        isFile(pkgfile, function (err, ex) {
            // on err, ex is false
            if (!ex) return loadpkg(path.dirname(dir), cb);

            readFile(pkgfile, function (err, body) {
                if (err) cb(err);
                try { var pkg = JSON.parse(body); } catch (jsonErr) {}

                if (pkg && opts.packageFilter) {
                    pkg = opts.packageFilter(pkg, pkgfile);
                }
                cb(null, pkg, dir);
            });
        });
    }

    function loadAsDirectory(x, loadAsDirectoryPackage, callback) {
        var cb = callback;
        var fpkg = loadAsDirectoryPackage;
        if (typeof fpkg === 'function') {
            cb = fpkg;
            fpkg = opts.package;
        }

        var pkgfile = path.join(x, 'package.json');
        isFile(pkgfile, function (err, ex) {
            if (err) return cb(err);
            if (!ex) return loadAsFile(path.join(x, 'index'), fpkg, cb);

            readFile(pkgfile, function (err, body) {
                if (err) return cb(err);
                try {
                    var pkg = JSON.parse(body);
                } catch (jsonErr) {}

                if (opts.packageFilter) {
                    pkg = opts.packageFilter(pkg, pkgfile);
                }

                if (pkg.main) {
                    if (pkg.main === '.' || pkg.main === './') {
                        pkg.main = 'index';
                    }
                    loadAsFile(path.resolve(x, pkg.main), pkg, function (err, m, pkg) {
                        if (err) return cb(err);
                        if (m) return cb(null, m, pkg);
                        if (!pkg) return loadAsFile(path.join(x, 'index'), pkg, cb);

                        var dir = path.resolve(x, pkg.main);
                        loadAsDirectory(dir, pkg, function (err, n, pkg) {
                            if (err) return cb(err);
                            if (n) return cb(null, n, pkg);
                            loadAsFile(path.join(x, 'index'), pkg, cb);
                        });
                    });
                    return;
                }

                loadAsFile(path.join(x, '/index'), pkg, cb);
            });
        });
    }

    function processDirs(cb, dirs) {
        if (dirs.length === 0) return cb(null, undefined);
        var dir = dirs[0];

        var file = path.join(dir, x);
        loadAsFile(file, undefined, onfile);

        function onfile(err, m, pkg) {
            if (err) return cb(err);
            if (m) return cb(null, m, pkg);
            loadAsDirectory(path.join(dir, x), undefined, ondir);
        }

        function ondir(err, n, pkg) {
            if (err) return cb(err);
            if (n) return cb(null, n, pkg);
            processDirs(cb, dirs.slice(1));
        }
    }
    function loadNodeModules(x, start, cb) {
        processDirs(cb, nodeModulesPaths(start, opts));
    }
};

var sync = function (x, options) {
    if (typeof x !== 'string') {
        throw new TypeError('Path must be a string.');
    }
    var opts = options || {};
    var isFile = opts.isFile || function (file) {
        try {
            var stat = fs.statSync(file);
        } catch (e) {
            if (e && (e.code === 'ENOENT' || e.code === 'ENOTDIR')) return false;
            throw e;
        }
        return stat.isFile() || stat.isFIFO();
    };
    var readFileSync = opts.readFileSync || fs.readFileSync;

    var extensions = opts.extensions || ['.js'];
    var y = opts.basedir || path.dirname(caller());

    opts.paths = opts.paths || [];

    if (/^(?:\.\.?(?:\/|$)|\/|([A-Za-z]:)?[/\\])/.test(x)) {
        var res = path.resolve(y, x);
        if (x === '..' || x.slice(-1) === '/') res += '/';
        var m = loadAsFileSync(res) || loadAsDirectorySync(res);
        if (m) return m;
    } else {
        var n = loadNodeModulesSync(x, y);
        if (n) return n;
    }

    if (core_1[x]) return x;

    var err = new Error("Cannot find module '" + x + "' from '" + y + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;

    function loadAsFileSync(x) {
        if (isFile(x)) {
            return x;
        }

        for (var i = 0; i < extensions.length; i++) {
            var file = x + extensions[i];
            if (isFile(file)) {
                return file;
            }
        }
    }

    function loadAsDirectorySync(x) {
        var pkgfile = path.join(x, '/package.json');
        if (isFile(pkgfile)) {
            try {
                var body = readFileSync(pkgfile, 'UTF8');
                var pkg = JSON.parse(body);

                if (opts.packageFilter) {
                    pkg = opts.packageFilter(pkg, x);
                }

                if (pkg.main) {
                    if (pkg.main === '.' || pkg.main === './') {
                        pkg.main = 'index';
                    }
                    var m = loadAsFileSync(path.resolve(x, pkg.main));
                    if (m) return m;
                    var n = loadAsDirectorySync(path.resolve(x, pkg.main));
                    if (n) return n;
                }
            } catch (e) {}
        }

        return loadAsFileSync(path.join(x, '/index'));
    }

    function loadNodeModulesSync(x, start) {
        var dirs = nodeModulesPaths(start, opts);
        for (var i = 0; i < dirs.length; i++) {
            var dir = dirs[i];
            var m = loadAsFileSync(path.join(dir, '/', x));
            if (m) return m;
            var n = loadAsDirectorySync(path.join(dir, '/', x));
            if (n) return n;
        }
    }
};

var resolve = createCommonjsModule(function (module, exports) {
async.core = core_1;
async.isCore = function isCore(x) { return core_1[x]; };
async.sync = sync;

exports = async;
module.exports = async;
});

var pathExists = createCommonjsModule(function (module) {
'use strict';


module.exports = fp => new Promise(resolve => {
	fs.access(fp, err => {
		resolve(!err);
	});
});

module.exports.sync = fp => {
	try {
		fs.accessSync(fp);
		return true;
	} catch (err) {
		return false;
	}
};
});

var pLimit = createCommonjsModule(function (module) {
'use strict';
module.exports = concurrency => {
	if (concurrency < 1) {
		throw new TypeError('Expected `concurrency` to be a number from 1 and up');
	}

	const queue = [];
	let activeCount = 0;

	const next = () => {
		activeCount--;

		if (queue.length > 0) {
			queue.shift()();
		}
	};

	return fn => new Promise((resolve, reject) => {
		const run = () => {
			activeCount++;

			fn().then(
				val => {
					resolve(val);
					next();
				},
				err => {
					reject(err);
					next();
				}
			);
		};

		if (activeCount < concurrency) {
			run();
		} else {
			queue.push(run);
		}
	});
};
});

var pLocate = createCommonjsModule(function (module) {
'use strict';


class EndError extends Error {
	constructor(value) {
		super();
		this.value = value;
	}
}

// the input can also be a promise, so we `Promise.all()` them both
const finder = el => Promise.all(el).then(val => val[1] === true && Promise.reject(new EndError(val[0])));

module.exports = (iterable, tester, opts) => {
	opts = Object.assign({
		concurrency: Infinity,
		preserveOrder: true
	}, opts);

	const limit = pLimit(opts.concurrency);

	// start all the promises concurrently with optional limit
	const items = Array.from(iterable).map(el => [el, limit(() => Promise.resolve(el).then(tester))]);

	// check the promises either serially or concurrently
	const checkLimit = pLimit(opts.preserveOrder ? 1 : Infinity);

	return Promise.all(items.map(el => checkLimit(() => finder(el))))
		.then(() => {})
		.catch(err => err instanceof EndError ? err.value : Promise.reject(err));
};
});

var locatePath = createCommonjsModule(function (module) {
'use strict';




module.exports = (iterable, opts) => {
	opts = Object.assign({
		cwd: process.cwd()
	}, opts);

	return pLocate(iterable, el => pathExists(path.resolve(opts.cwd, el)), opts);
};

module.exports.sync = (iterable, opts) => {
	opts = Object.assign({
		cwd: process.cwd()
	}, opts);

	for (const el of iterable) {
		if (pathExists.sync(path.resolve(opts.cwd, el))) {
			return el;
		}
	}
};
});

var findUp = createCommonjsModule(function (module) {
'use strict';



module.exports = (filename, opts) => {
	opts = opts || {};

	const startDir = path.resolve(opts.cwd || '');
	const root = path.parse(startDir).root;

	const filenames = [].concat(filename);

	return new Promise(resolve => {
		(function find(dir) {
			locatePath(filenames, {cwd: dir}).then(file => {
				if (file) {
					resolve(path.join(dir, file));
				} else if (dir === root) {
					resolve(null);
				} else {
					find(path.dirname(dir));
				}
			});
		})(startDir);
	});
};

module.exports.sync = (filename, opts) => {
	opts = opts || {};

	let dir = path.resolve(opts.cwd || '');
	const root = path.parse(dir).root;

	const filenames = [].concat(filename);

	// eslint-disable-next-line no-constant-condition
	while (true) {
		const file = locatePath.sync(filenames, {cwd: dir});

		if (file) {
			return path.join(dir, file);
		} else if (dir === root) {
			return null;
		}

		dir = path.dirname(dir);
	}
};
});

var stripBom = createCommonjsModule(function (module) {
'use strict';
module.exports = x => {
	if (typeof x !== 'string') {
		throw new TypeError('Expected a string, got ' + typeof x);
	}

	// Catches EFBBBF (UTF-8 BOM) because the buffer-to-string
	// conversion translates it to FEFF (UTF-16 BOM)
	if (x.charCodeAt(0) === 0xFEFF) {
		return x.slice(1);
	}

	return x;
};
});

var isArrayish = function isArrayish(obj) {
	if (!obj) {
		return false;
	}

	return obj instanceof Array || Array.isArray(obj) ||
		(obj.length >= 0 && obj.splice instanceof Function);
};

var errorEx = function errorEx(name, properties) {
	if (!name || name.constructor !== String) {
		properties = name || {};
		name = Error.name;
	}

	var errorExError = function ErrorEXError(message) {
		if (!this) {
			return new ErrorEXError(message);
		}

		message = message instanceof Error
			? message.message
			: (message || this.message);

		Error.call(this, message);
		Error.captureStackTrace(this, errorExError);

		this.name = name;

		Object.defineProperty(this, 'message', {
			configurable: true,
			enumerable: false,
			get: function () {
				var newMessage = message.split(/\r?\n/g);

				for (var key in properties) {
					if (!properties.hasOwnProperty(key)) {
						continue;
					}

					var modifier = properties[key];

					if ('message' in modifier) {
						newMessage = modifier.message(this[key], newMessage) || newMessage;
						if (!isArrayish(newMessage)) {
							newMessage = [newMessage];
						}
					}
				}

				return newMessage.join('\n');
			},
			set: function (v) {
				message = v;
			}
		});

		var stackDescriptor = Object.getOwnPropertyDescriptor(this, 'stack');
		var stackGetter = stackDescriptor.get;
		var stackValue = stackDescriptor.value;
		delete stackDescriptor.value;
		delete stackDescriptor.writable;

		stackDescriptor.get = function () {
			var stack = (stackGetter)
				? stackGetter.call(this).split(/\r?\n+/g)
				: stackValue.split(/\r?\n+/g);

			// starting in Node 7, the stack builder caches the message.
			// just replace it.
			stack[0] = this.name + ': ' + this.message;

			var lineCount = 1;
			for (var key in properties) {
				if (!properties.hasOwnProperty(key)) {
					continue;
				}

				var modifier = properties[key];

				if ('line' in modifier) {
					var line = modifier.line(this[key]);
					if (line) {
						stack.splice(lineCount++, 0, '    ' + line);
					}
				}

				if ('stack' in modifier) {
					modifier.stack(this[key], stack);
				}
			}

			return stack.join('\n');
		};

		Object.defineProperty(this, 'stack', stackDescriptor);
	};

	if (Object.setPrototypeOf) {
		Object.setPrototypeOf(errorExError.prototype, Error.prototype);
		Object.setPrototypeOf(errorExError, Error);
	} else {
		util.inherits(errorExError, Error);
	}

	return errorExError;
};

errorEx.append = function (str, def) {
	return {
		message: function (v, message) {
			v = v || def;

			if (v) {
				message[0] += ' ' + str.replace('%s', v.toString());
			}

			return message;
		}
	};
};

errorEx.line = function (str, def) {
	return {
		line: function (v) {
			v = v || def;

			if (v) {
				return str.replace('%s', v.toString());
			}

			return null;
		}
	};
};

var errorEx_1 = errorEx;

var jsonParseBetterErrors = parseJson$2;
function parseJson$2 (txt, reviver, context) {
  context = context || 20;
  try {
    return JSON.parse(txt, reviver)
  } catch (e) {
    const syntaxErr = e.message.match(/^Unexpected token.*position\s+(\d+)/i);
    const errIdx = syntaxErr
    ? +syntaxErr[1]
    : e.message.match(/^Unexpected end of JSON.*/i)
    ? txt.length - 1
    : null;
    if (errIdx != null) {
      const start = errIdx <= context
      ? 0
      : errIdx - context;
      const end = errIdx + context >= txt.length
      ? txt.length
      : errIdx + context;
      e.message += ` while parsing near '${
        start === 0 ? '' : '...'
      }${txt.slice(start, end)}${
        end === txt.length ? '' : '...'
      }'`;
    } else {
      e.message += ` while parsing '${txt.slice(0, context * 2)}'`;
    }
    throw e
  }
}

var parseJson = createCommonjsModule(function (module) {
'use strict';



const JSONError = errorEx_1('JSONError', {
	fileName: errorEx_1.append('in %s')
});

module.exports = (input, reviver, filename) => {
	if (typeof reviver === 'string') {
		filename = reviver;
		reviver = null;
	}

	try {
		try {
			return JSON.parse(input, reviver);
		} catch (err) {
			jsonParseBetterErrors(input, reviver);

			throw err;
		}
	} catch (err) {
		err.message = err.message.replace(/\n/g, '');

		const jsonErr = new JSONError(err);
		if (filename) {
			jsonErr.fileName = filename;
		}

		throw jsonErr;
	}
};
});

var pify = createCommonjsModule(function (module) {
'use strict';

const processFn = (fn, opts) => function () {
	const P = opts.promiseModule;
	const args = new Array(arguments.length);

	for (let i = 0; i < arguments.length; i++) {
		args[i] = arguments[i];
	}

	return new P((resolve, reject) => {
		if (opts.errorFirst) {
			args.push(function (err, result) {
				if (opts.multiArgs) {
					const results = new Array(arguments.length - 1);

					for (let i = 1; i < arguments.length; i++) {
						results[i - 1] = arguments[i];
					}

					if (err) {
						results.unshift(err);
						reject(results);
					} else {
						resolve(results);
					}
				} else if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		} else {
			args.push(function (result) {
				if (opts.multiArgs) {
					const results = new Array(arguments.length - 1);

					for (let i = 0; i < arguments.length; i++) {
						results[i] = arguments[i];
					}

					resolve(results);
				} else {
					resolve(result);
				}
			});
		}

		fn.apply(this, args);
	});
};

module.exports = (obj, opts) => {
	opts = Object.assign({
		exclude: [/.+(Sync|Stream)$/],
		errorFirst: true,
		promiseModule: Promise
	}, opts);

	const filter = key => {
		const match = pattern => typeof pattern === 'string' ? key === pattern : pattern.test(key);
		return opts.include ? opts.include.some(match) : !opts.exclude.some(match);
	};

	let ret;
	if (typeof obj === 'function') {
		ret = function () {
			if (opts.excludeMain) {
				return obj.apply(this, arguments);
			}

			return processFn(obj, opts).apply(this, arguments);
		};
	} else {
		ret = Object.create(Object.getPrototypeOf(obj));
	}

	for (const key in obj) { // eslint-disable-line guard-for-in
		const x = obj[key];
		ret[key] = typeof x === 'function' && filter(key) ? processFn(x, opts) : x;
	}

	return ret;
};
});

const parse$2 = (data, fp) => parseJson(stripBom(data), path.relative('.', fp));

var loadJsonFile = fp => pify(fs.readFile)(fp, 'utf8').then(data => parse$2(data, fp));
var sync$2 = fp => parse$2(fs.readFileSync(fp, 'utf8'), fp);

loadJsonFile.sync = sync$2;

var pify$3 = createCommonjsModule(function (module) {
'use strict';

const processFn = (fn, opts) => function () {
	const P = opts.promiseModule;
	const args = new Array(arguments.length);

	for (let i = 0; i < arguments.length; i++) {
		args[i] = arguments[i];
	}

	return new P((resolve, reject) => {
		if (opts.errorFirst) {
			args.push(function (err, result) {
				if (opts.multiArgs) {
					const results = new Array(arguments.length - 1);

					for (let i = 1; i < arguments.length; i++) {
						results[i - 1] = arguments[i];
					}

					if (err) {
						results.unshift(err);
						reject(results);
					} else {
						resolve(results);
					}
				} else if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		} else {
			args.push(function (result) {
				if (opts.multiArgs) {
					const results = new Array(arguments.length - 1);

					for (let i = 0; i < arguments.length; i++) {
						results[i] = arguments[i];
					}

					resolve(results);
				} else {
					resolve(result);
				}
			});
		}

		fn.apply(this, args);
	});
};

module.exports = (obj, opts) => {
	opts = Object.assign({
		exclude: [/.+(Sync|Stream)$/],
		errorFirst: true,
		promiseModule: Promise
	}, opts);

	const filter = key => {
		const match = pattern => typeof pattern === 'string' ? key === pattern : pattern.test(key);
		return opts.include ? opts.include.some(match) : !opts.exclude.some(match);
	};

	let ret;
	if (typeof obj === 'function') {
		ret = function () {
			if (opts.excludeMain) {
				return obj.apply(this, arguments);
			}

			return processFn(obj, opts).apply(this, arguments);
		};
	} else {
		ret = Object.create(Object.getPrototypeOf(obj));
	}

	for (const key in obj) { // eslint-disable-line guard-for-in
		const x = obj[key];
		ret[key] = typeof x === 'function' && filter(key) ? processFn(x, opts) : x;
	}

	return ret;
};
});

function type(fn, fn2, fp) {
	if (typeof fp !== 'string') {
		return Promise.reject(new TypeError(`Expected a string, got ${typeof fp}`));
	}

	return pify$3(fs[fn])(fp)
		.then(stats => stats[fn2]())
		.catch(err => {
			if (err.code === 'ENOENT') {
				return false;
			}

			throw err;
		});
}

function typeSync(fn, fn2, fp) {
	if (typeof fp !== 'string') {
		throw new TypeError(`Expected a string, got ${typeof fp}`);
	}

	try {
		return fs[fn](fp)[fn2]();
	} catch (err) {
		if (err.code === 'ENOENT') {
			return false;
		}

		throw err;
	}
}

var file = type.bind(null, 'stat', 'isFile');
var dir = type.bind(null, 'stat', 'isDirectory');
var symlink = type.bind(null, 'lstat', 'isSymbolicLink');
var fileSync = typeSync.bind(null, 'statSync', 'isFile');
var dirSync = typeSync.bind(null, 'statSync', 'isDirectory');
var symlinkSync = typeSync.bind(null, 'lstatSync', 'isSymbolicLink');

var pathType = {
	file: file,
	dir: dir,
	symlink: symlink,
	fileSync: fileSync,
	dirSync: dirSync,
	symlinkSync: symlinkSync
};

var parser$1 = createCommonjsModule(function (module, exports) {
/* parser generated by jison 0.4.17 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var spdxparse = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,5],$V1=[1,6],$V2=[1,7],$V3=[1,4],$V4=[1,9],$V5=[1,10],$V6=[5,14,15,17],$V7=[5,12,14,15,17];
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"start":3,"expression":4,"EOS":5,"simpleExpression":6,"LICENSE":7,"PLUS":8,"LICENSEREF":9,"DOCUMENTREF":10,"COLON":11,"WITH":12,"EXCEPTION":13,"AND":14,"OR":15,"OPEN":16,"CLOSE":17,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOS",7:"LICENSE",8:"PLUS",9:"LICENSEREF",10:"DOCUMENTREF",11:"COLON",12:"WITH",13:"EXCEPTION",14:"AND",15:"OR",16:"OPEN",17:"CLOSE"},
productions_: [0,[3,2],[6,1],[6,2],[6,1],[6,3],[4,1],[4,3],[4,3],[4,3],[4,3]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
return this.$ = $$[$0-1]
break;
case 2: case 4: case 5:
this.$ = {license: yytext};
break;
case 3:
this.$ = {license: $$[$0-1], plus: true};
break;
case 6:
this.$ = $$[$0];
break;
case 7:
this.$ = {exception: $$[$0]};
this.$.license = $$[$0-2].license;
if ($$[$0-2].hasOwnProperty('plus')) {
  this.$.plus = $$[$0-2].plus;
}
break;
case 8:
this.$ = {conjunction: 'and', left: $$[$0-2], right: $$[$0]};
break;
case 9:
this.$ = {conjunction: 'or', left: $$[$0-2], right: $$[$0]};
break;
case 10:
this.$ = $$[$0-1];
break;
}
},
table: [{3:1,4:2,6:3,7:$V0,9:$V1,10:$V2,16:$V3},{1:[3]},{5:[1,8],14:$V4,15:$V5},o($V6,[2,6],{12:[1,11]}),{4:12,6:3,7:$V0,9:$V1,10:$V2,16:$V3},o($V7,[2,2],{8:[1,13]}),o($V7,[2,4]),{11:[1,14]},{1:[2,1]},{4:15,6:3,7:$V0,9:$V1,10:$V2,16:$V3},{4:16,6:3,7:$V0,9:$V1,10:$V2,16:$V3},{13:[1,17]},{14:$V4,15:$V5,17:[1,18]},o($V7,[2,3]),{9:[1,19]},o($V6,[2,8]),o([5,15,17],[2,9],{14:$V4}),o($V6,[2,7]),o($V6,[2,10]),o($V7,[2,5])],
defaultActions: {8:[2,1]},
parseError: function parseError(str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        function _parseError (msg, hash) {
            this.message = msg;
            this.hash = hash;
        }
        _parseError.prototype = Error;

        throw new _parseError(str, hash);
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    _token_stack:
        var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function (match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex() {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState() {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules() {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState(n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState(condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:return 5
break;
case 1:/* skip whitespace */
break;
case 2:return 8
break;
case 3:return 16
break;
case 4:return 17
break;
case 5:return 11
break;
case 6:return 10
break;
case 7:return 9
break;
case 8:return 14
break;
case 9:return 15
break;
case 10:return 12
break;
case 11:return 7
break;
case 12:return 7
break;
case 13:return 7
break;
case 14:return 7
break;
case 15:return 7
break;
case 16:return 7
break;
case 17:return 7
break;
case 18:return 7
break;
case 19:return 7
break;
case 20:return 7
break;
case 21:return 7
break;
case 22:return 7
break;
case 23:return 7
break;
case 24:return 13
break;
case 25:return 13
break;
case 26:return 13
break;
case 27:return 13
break;
case 28:return 13
break;
case 29:return 13
break;
case 30:return 13
break;
case 31:return 13
break;
case 32:return 7
break;
case 33:return 13
break;
case 34:return 7
break;
case 35:return 13
break;
case 36:return 7
break;
case 37:return 13
break;
case 38:return 13
break;
case 39:return 7
break;
case 40:return 13
break;
case 41:return 13
break;
case 42:return 13
break;
case 43:return 13
break;
case 44:return 13
break;
case 45:return 7
break;
case 46:return 13
break;
case 47:return 7
break;
case 48:return 7
break;
case 49:return 7
break;
case 50:return 7
break;
case 51:return 7
break;
case 52:return 7
break;
case 53:return 7
break;
case 54:return 7
break;
case 55:return 7
break;
case 56:return 7
break;
case 57:return 7
break;
case 58:return 7
break;
case 59:return 7
break;
case 60:return 7
break;
case 61:return 7
break;
case 62:return 7
break;
case 63:return 13
break;
case 64:return 7
break;
case 65:return 7
break;
case 66:return 13
break;
case 67:return 7
break;
case 68:return 7
break;
case 69:return 7
break;
case 70:return 7
break;
case 71:return 7
break;
case 72:return 7
break;
case 73:return 13
break;
case 74:return 7
break;
case 75:return 13
break;
case 76:return 7
break;
case 77:return 7
break;
case 78:return 7
break;
case 79:return 7
break;
case 80:return 7
break;
case 81:return 7
break;
case 82:return 7
break;
case 83:return 7
break;
case 84:return 7
break;
case 85:return 7
break;
case 86:return 7
break;
case 87:return 7
break;
case 88:return 7
break;
case 89:return 7
break;
case 90:return 7
break;
case 91:return 7
break;
case 92:return 7
break;
case 93:return 7
break;
case 94:return 7
break;
case 95:return 7
break;
case 96:return 7
break;
case 97:return 7
break;
case 98:return 7
break;
case 99:return 7
break;
case 100:return 7
break;
case 101:return 7
break;
case 102:return 7
break;
case 103:return 7
break;
case 104:return 7
break;
case 105:return 7
break;
case 106:return 7
break;
case 107:return 7
break;
case 108:return 7
break;
case 109:return 7
break;
case 110:return 7
break;
case 111:return 7
break;
case 112:return 7
break;
case 113:return 7
break;
case 114:return 7
break;
case 115:return 7
break;
case 116:return 7
break;
case 117:return 7
break;
case 118:return 7
break;
case 119:return 7
break;
case 120:return 7
break;
case 121:return 7
break;
case 122:return 7
break;
case 123:return 7
break;
case 124:return 7
break;
case 125:return 7
break;
case 126:return 7
break;
case 127:return 7
break;
case 128:return 7
break;
case 129:return 7
break;
case 130:return 7
break;
case 131:return 7
break;
case 132:return 7
break;
case 133:return 7
break;
case 134:return 7
break;
case 135:return 7
break;
case 136:return 7
break;
case 137:return 7
break;
case 138:return 7
break;
case 139:return 7
break;
case 140:return 7
break;
case 141:return 7
break;
case 142:return 7
break;
case 143:return 7
break;
case 144:return 7
break;
case 145:return 7
break;
case 146:return 7
break;
case 147:return 7
break;
case 148:return 7
break;
case 149:return 7
break;
case 150:return 7
break;
case 151:return 7
break;
case 152:return 7
break;
case 153:return 7
break;
case 154:return 7
break;
case 155:return 7
break;
case 156:return 7
break;
case 157:return 7
break;
case 158:return 7
break;
case 159:return 7
break;
case 160:return 7
break;
case 161:return 7
break;
case 162:return 7
break;
case 163:return 7
break;
case 164:return 7
break;
case 165:return 7
break;
case 166:return 7
break;
case 167:return 7
break;
case 168:return 7
break;
case 169:return 7
break;
case 170:return 7
break;
case 171:return 7
break;
case 172:return 7
break;
case 173:return 7
break;
case 174:return 7
break;
case 175:return 7
break;
case 176:return 7
break;
case 177:return 7
break;
case 178:return 7
break;
case 179:return 7
break;
case 180:return 7
break;
case 181:return 7
break;
case 182:return 7
break;
case 183:return 7
break;
case 184:return 7
break;
case 185:return 7
break;
case 186:return 7
break;
case 187:return 7
break;
case 188:return 7
break;
case 189:return 7
break;
case 190:return 7
break;
case 191:return 7
break;
case 192:return 7
break;
case 193:return 7
break;
case 194:return 7
break;
case 195:return 7
break;
case 196:return 7
break;
case 197:return 7
break;
case 198:return 7
break;
case 199:return 7
break;
case 200:return 7
break;
case 201:return 7
break;
case 202:return 7
break;
case 203:return 7
break;
case 204:return 7
break;
case 205:return 7
break;
case 206:return 7
break;
case 207:return 7
break;
case 208:return 7
break;
case 209:return 7
break;
case 210:return 7
break;
case 211:return 7
break;
case 212:return 7
break;
case 213:return 7
break;
case 214:return 7
break;
case 215:return 7
break;
case 216:return 7
break;
case 217:return 7
break;
case 218:return 7
break;
case 219:return 7
break;
case 220:return 7
break;
case 221:return 7
break;
case 222:return 7
break;
case 223:return 7
break;
case 224:return 7
break;
case 225:return 7
break;
case 226:return 7
break;
case 227:return 7
break;
case 228:return 7
break;
case 229:return 7
break;
case 230:return 7
break;
case 231:return 7
break;
case 232:return 7
break;
case 233:return 7
break;
case 234:return 7
break;
case 235:return 7
break;
case 236:return 7
break;
case 237:return 7
break;
case 238:return 7
break;
case 239:return 7
break;
case 240:return 7
break;
case 241:return 7
break;
case 242:return 7
break;
case 243:return 7
break;
case 244:return 7
break;
case 245:return 7
break;
case 246:return 7
break;
case 247:return 7
break;
case 248:return 7
break;
case 249:return 7
break;
case 250:return 7
break;
case 251:return 7
break;
case 252:return 7
break;
case 253:return 7
break;
case 254:return 7
break;
case 255:return 7
break;
case 256:return 7
break;
case 257:return 7
break;
case 258:return 7
break;
case 259:return 7
break;
case 260:return 7
break;
case 261:return 7
break;
case 262:return 7
break;
case 263:return 7
break;
case 264:return 7
break;
case 265:return 7
break;
case 266:return 7
break;
case 267:return 7
break;
case 268:return 7
break;
case 269:return 7
break;
case 270:return 7
break;
case 271:return 7
break;
case 272:return 7
break;
case 273:return 7
break;
case 274:return 7
break;
case 275:return 7
break;
case 276:return 7
break;
case 277:return 7
break;
case 278:return 7
break;
case 279:return 7
break;
case 280:return 7
break;
case 281:return 7
break;
case 282:return 7
break;
case 283:return 7
break;
case 284:return 7
break;
case 285:return 7
break;
case 286:return 7
break;
case 287:return 7
break;
case 288:return 7
break;
case 289:return 7
break;
case 290:return 7
break;
case 291:return 7
break;
case 292:return 7
break;
case 293:return 7
break;
case 294:return 7
break;
case 295:return 7
break;
case 296:return 7
break;
case 297:return 7
break;
case 298:return 7
break;
case 299:return 7
break;
case 300:return 7
break;
case 301:return 7
break;
case 302:return 7
break;
case 303:return 7
break;
case 304:return 7
break;
case 305:return 7
break;
case 306:return 7
break;
case 307:return 7
break;
case 308:return 7
break;
case 309:return 7
break;
case 310:return 7
break;
case 311:return 7
break;
case 312:return 7
break;
case 313:return 7
break;
case 314:return 7
break;
case 315:return 7
break;
case 316:return 7
break;
case 317:return 7
break;
case 318:return 7
break;
case 319:return 7
break;
case 320:return 7
break;
case 321:return 7
break;
case 322:return 7
break;
case 323:return 7
break;
case 324:return 7
break;
case 325:return 7
break;
case 326:return 7
break;
case 327:return 7
break;
case 328:return 7
break;
case 329:return 7
break;
case 330:return 7
break;
case 331:return 7
break;
case 332:return 7
break;
case 333:return 7
break;
case 334:return 7
break;
case 335:return 7
break;
case 336:return 7
break;
case 337:return 7
break;
case 338:return 7
break;
case 339:return 7
break;
case 340:return 7
break;
case 341:return 7
break;
case 342:return 7
break;
case 343:return 7
break;
case 344:return 7
break;
case 345:return 7
break;
case 346:return 7
break;
case 347:return 7
break;
case 348:return 7
break;
case 349:return 7
break;
case 350:return 7
break;
case 351:return 7
break;
case 352:return 7
break;
case 353:return 7
break;
case 354:return 7
break;
case 355:return 7
break;
case 356:return 7
break;
case 357:return 7
break;
case 358:return 7
break;
case 359:return 7
break;
case 360:return 7
break;
case 361:return 7
break;
case 362:return 7
break;
case 363:return 7
break;
case 364:return 7
break;
}
},
rules: [/^(?:$)/,/^(?:\s+)/,/^(?:\+)/,/^(?:\()/,/^(?:\))/,/^(?::)/,/^(?:DocumentRef-([0-9A-Za-z-+.]+))/,/^(?:LicenseRef-([0-9A-Za-z-+.]+))/,/^(?:AND)/,/^(?:OR)/,/^(?:WITH)/,/^(?:BSD-3-Clause-No-Nuclear-License-2014)/,/^(?:BSD-3-Clause-No-Nuclear-Warranty)/,/^(?:GPL-2\.0-with-classpath-exception)/,/^(?:GPL-3\.0-with-autoconf-exception)/,/^(?:GPL-2\.0-with-autoconf-exception)/,/^(?:BSD-3-Clause-No-Nuclear-License)/,/^(?:MPL-2\.0-no-copyleft-exception)/,/^(?:GPL-2\.0-with-bison-exception)/,/^(?:GPL-2\.0-with-font-exception)/,/^(?:GPL-2\.0-with-GCC-exception)/,/^(?:CNRI-Python-GPL-Compatible)/,/^(?:GPL-3\.0-with-GCC-exception)/,/^(?:BSD-3-Clause-Attribution)/,/^(?:Classpath-exception-2\.0)/,/^(?:WxWindows-exception-3\.1)/,/^(?:freertos-exception-2\.0)/,/^(?:Autoconf-exception-3\.0)/,/^(?:i2p-gpl-java-exception)/,/^(?:gnu-javamail-exception)/,/^(?:Nokia-Qt-exception-1\.1)/,/^(?:Autoconf-exception-2\.0)/,/^(?:BSD-2-Clause-FreeBSD)/,/^(?:u-boot-exception-2\.0)/,/^(?:zlib-acknowledgement)/,/^(?:Bison-exception-2\.2)/,/^(?:BSD-2-Clause-NetBSD)/,/^(?:CLISP-exception-2\.0)/,/^(?:eCos-exception-2\.0)/,/^(?:BSD-3-Clause-Clear)/,/^(?:Font-exception-2\.0)/,/^(?:FLTK-exception-2\.0)/,/^(?:GCC-exception-2\.0)/,/^(?:Qwt-exception-1\.0)/,/^(?:Libtool-exception)/,/^(?:BSD-3-Clause-LBNL)/,/^(?:GCC-exception-3\.1)/,/^(?:Artistic-1\.0-Perl)/,/^(?:Artistic-1\.0-cl8)/,/^(?:CC-BY-NC-SA-2\.5)/,/^(?:MIT-advertising)/,/^(?:BSD-Source-Code)/,/^(?:CC-BY-NC-SA-4\.0)/,/^(?:LiLiQ-Rplus-1\.1)/,/^(?:CC-BY-NC-SA-3\.0)/,/^(?:BSD-4-Clause-UC)/,/^(?:CC-BY-NC-SA-2\.0)/,/^(?:CC-BY-NC-SA-1\.0)/,/^(?:CC-BY-NC-ND-4\.0)/,/^(?:CC-BY-NC-ND-3\.0)/,/^(?:CC-BY-NC-ND-2\.5)/,/^(?:CC-BY-NC-ND-2\.0)/,/^(?:CC-BY-NC-ND-1\.0)/,/^(?:LZMA-exception)/,/^(?:BitTorrent-1\.1)/,/^(?:CrystalStacker)/,/^(?:FLTK-exception)/,/^(?:SugarCRM-1\.1\.3)/,/^(?:BSD-Protection)/,/^(?:BitTorrent-1\.0)/,/^(?:HaskellReport)/,/^(?:Interbase-1\.0)/,/^(?:StandardML-NJ)/,/^(?:mif-exception)/,/^(?:Frameworx-1\.0)/,/^(?:389-exception)/,/^(?:CC-BY-NC-2\.0)/,/^(?:CC-BY-NC-2\.5)/,/^(?:CC-BY-NC-3\.0)/,/^(?:CC-BY-NC-4\.0)/,/^(?:W3C-19980720)/,/^(?:CC-BY-SA-1\.0)/,/^(?:CC-BY-SA-2\.0)/,/^(?:CC-BY-SA-2\.5)/,/^(?:CC-BY-ND-2\.0)/,/^(?:CC-BY-SA-4\.0)/,/^(?:CC-BY-SA-3\.0)/,/^(?:Artistic-1\.0)/,/^(?:Artistic-2\.0)/,/^(?:CC-BY-ND-2\.5)/,/^(?:CC-BY-ND-3\.0)/,/^(?:CC-BY-ND-4\.0)/,/^(?:CC-BY-ND-1\.0)/,/^(?:BSD-4-Clause)/,/^(?:BSD-3-Clause)/,/^(?:BSD-2-Clause)/,/^(?:CC-BY-NC-1\.0)/,/^(?:bzip2-1\.0\.6)/,/^(?:Unicode-TOU)/,/^(?:CNRI-Jython)/,/^(?:ImageMagick)/,/^(?:Adobe-Glyph)/,/^(?:CUA-OPL-1\.0)/,/^(?:OLDAP-2\.2\.2)/,/^(?:LiLiQ-R-1\.1)/,/^(?:bzip2-1\.0\.5)/,/^(?:LiLiQ-P-1\.1)/,/^(?:OLDAP-2\.0\.1)/,/^(?:OLDAP-2\.2\.1)/,/^(?:CNRI-Python)/,/^(?:XFree86-1\.1)/,/^(?:OSET-PL-2\.1)/,/^(?:Apache-2\.0)/,/^(?:Watcom-1\.0)/,/^(?:PostgreSQL)/,/^(?:Python-2\.0)/,/^(?:RHeCos-1\.1)/,/^(?:EUDatagrid)/,/^(?:Spencer-99)/,/^(?:Intel-ACPI)/,/^(?:CECILL-1\.0)/,/^(?:CECILL-1\.1)/,/^(?:JasPer-2\.0)/,/^(?:CECILL-2\.0)/,/^(?:CECILL-2\.1)/,/^(?:gSOAP-1\.3b)/,/^(?:Spencer-94)/,/^(?:Apache-1\.1)/,/^(?:Spencer-86)/,/^(?:Apache-1\.0)/,/^(?:ClArtistic)/,/^(?:TORQUE-1\.1)/,/^(?:CATOSL-1\.1)/,/^(?:Adobe-2006)/,/^(?:Zimbra-1\.4)/,/^(?:Zimbra-1\.3)/,/^(?:Condor-1\.1)/,/^(?:CC-BY-3\.0)/,/^(?:CC-BY-2\.5)/,/^(?:OLDAP-2\.4)/,/^(?:SGI-B-1\.1)/,/^(?:SISSL-1\.2)/,/^(?:SGI-B-1\.0)/,/^(?:OLDAP-2\.3)/,/^(?:CC-BY-4\.0)/,/^(?:Crossword)/,/^(?:SimPL-2\.0)/,/^(?:OLDAP-2\.2)/,/^(?:OLDAP-2\.1)/,/^(?:ErlPL-1\.1)/,/^(?:LPPL-1\.3a)/,/^(?:LPPL-1\.3c)/,/^(?:OLDAP-2\.0)/,/^(?:Leptonica)/,/^(?:CPOL-1\.02)/,/^(?:OLDAP-1\.4)/,/^(?:OLDAP-1\.3)/,/^(?:CC-BY-2\.0)/,/^(?:Unlicense)/,/^(?:OLDAP-2\.8)/,/^(?:OLDAP-1\.2)/,/^(?:MakeIndex)/,/^(?:OLDAP-2\.7)/,/^(?:OLDAP-1\.1)/,/^(?:Sleepycat)/,/^(?:D-FSL-1\.0)/,/^(?:CC-BY-1\.0)/,/^(?:OLDAP-2\.6)/,/^(?:WXwindows)/,/^(?:NPOSL-3\.0)/,/^(?:FreeImage)/,/^(?:SGI-B-2\.0)/,/^(?:OLDAP-2\.5)/,/^(?:Beerware)/,/^(?:Newsletr)/,/^(?:NBPL-1\.0)/,/^(?:NASA-1\.3)/,/^(?:NLOD-1\.0)/,/^(?:AGPL-1\.0)/,/^(?:OCLC-2\.0)/,/^(?:ODbL-1\.0)/,/^(?:PDDL-1\.0)/,/^(?:Motosoto)/,/^(?:Afmparse)/,/^(?:ANTLR-PD)/,/^(?:LPL-1\.02)/,/^(?:Abstyles)/,/^(?:eCos-2\.0)/,/^(?:APSL-1\.0)/,/^(?:LPPL-1\.2)/,/^(?:LPPL-1\.1)/,/^(?:LPPL-1\.0)/,/^(?:APSL-1\.1)/,/^(?:APSL-2\.0)/,/^(?:Info-ZIP)/,/^(?:Zend-2\.0)/,/^(?:IBM-pibs)/,/^(?:LGPL-2\.0)/,/^(?:LGPL-3\.0)/,/^(?:LGPL-2\.1)/,/^(?:GFDL-1\.3)/,/^(?:PHP-3\.01)/,/^(?:GFDL-1\.2)/,/^(?:GFDL-1\.1)/,/^(?:AGPL-3\.0)/,/^(?:Giftware)/,/^(?:EUPL-1\.1)/,/^(?:RPSL-1\.0)/,/^(?:EUPL-1\.0)/,/^(?:MIT-enna)/,/^(?:CECILL-B)/,/^(?:diffmark)/,/^(?:CECILL-C)/,/^(?:CDDL-1\.0)/,/^(?:Sendmail)/,/^(?:CDDL-1\.1)/,/^(?:CPAL-1\.0)/,/^(?:APSL-1\.2)/,/^(?:NPL-1\.1)/,/^(?:AFL-1\.2)/,/^(?:Caldera)/,/^(?:AFL-2\.0)/,/^(?:FSFULLR)/,/^(?:AFL-2\.1)/,/^(?:VSL-1\.0)/,/^(?:VOSTROM)/,/^(?:UPL-1\.0)/,/^(?:Dotseqn)/,/^(?:CPL-1\.0)/,/^(?:dvipdfm)/,/^(?:EPL-1\.0)/,/^(?:OCCT-PL)/,/^(?:ECL-1\.0)/,/^(?:Latex2e)/,/^(?:ECL-2\.0)/,/^(?:GPL-1\.0)/,/^(?:GPL-2\.0)/,/^(?:GPL-3\.0)/,/^(?:AFL-3\.0)/,/^(?:LAL-1\.2)/,/^(?:LAL-1\.3)/,/^(?:EFL-1\.0)/,/^(?:EFL-2\.0)/,/^(?:gnuplot)/,/^(?:Aladdin)/,/^(?:LPL-1\.0)/,/^(?:libtiff)/,/^(?:Entessa)/,/^(?:AMDPLPA)/,/^(?:IPL-1\.0)/,/^(?:OPL-1\.0)/,/^(?:OSL-1\.0)/,/^(?:OSL-1\.1)/,/^(?:OSL-2\.0)/,/^(?:OSL-2\.1)/,/^(?:OSL-3\.0)/,/^(?:OpenSSL)/,/^(?:ZPL-2\.1)/,/^(?:PHP-3\.0)/,/^(?:ZPL-2\.0)/,/^(?:ZPL-1\.1)/,/^(?:CC0-1\.0)/,/^(?:SPL-1\.0)/,/^(?:psutils)/,/^(?:MPL-1\.0)/,/^(?:QPL-1\.0)/,/^(?:MPL-1\.1)/,/^(?:MPL-2\.0)/,/^(?:APL-1\.0)/,/^(?:RPL-1\.1)/,/^(?:RPL-1\.5)/,/^(?:MIT-CMU)/,/^(?:Multics)/,/^(?:Eurosym)/,/^(?:BSL-1\.0)/,/^(?:MIT-feh)/,/^(?:Saxpath)/,/^(?:Borceux)/,/^(?:OFL-1\.1)/,/^(?:OFL-1\.0)/,/^(?:AFL-1\.1)/,/^(?:YPL-1\.1)/,/^(?:YPL-1\.0)/,/^(?:NPL-1\.0)/,/^(?:iMatix)/,/^(?:mpich2)/,/^(?:APAFML)/,/^(?:Bahyph)/,/^(?:RSA-MD)/,/^(?:psfrag)/,/^(?:Plexus)/,/^(?:eGenix)/,/^(?:Glulxe)/,/^(?:SAX-PD)/,/^(?:Imlib2)/,/^(?:Wsuipa)/,/^(?:LGPLLR)/,/^(?:Libpng)/,/^(?:xinetd)/,/^(?:MITNFA)/,/^(?:NetCDF)/,/^(?:Naumen)/,/^(?:SMPPL)/,/^(?:Nunit)/,/^(?:FSFUL)/,/^(?:GL2PS)/,/^(?:SMLNJ)/,/^(?:Rdisc)/,/^(?:Noweb)/,/^(?:Nokia)/,/^(?:SISSL)/,/^(?:Qhull)/,/^(?:Intel)/,/^(?:Glide)/,/^(?:Xerox)/,/^(?:AMPAS)/,/^(?:WTFPL)/,/^(?:MS-PL)/,/^(?:XSkat)/,/^(?:MS-RL)/,/^(?:MirOS)/,/^(?:RSCPL)/,/^(?:TMate)/,/^(?:OGTSL)/,/^(?:FSFAP)/,/^(?:NCSA)/,/^(?:Zlib)/,/^(?:SCEA)/,/^(?:SNIA)/,/^(?:NGPL)/,/^(?:NOSL)/,/^(?:ADSL)/,/^(?:MTLL)/,/^(?:NLPL)/,/^(?:Ruby)/,/^(?:JSON)/,/^(?:Barr)/,/^(?:0BSD)/,/^(?:Xnet)/,/^(?:Cube)/,/^(?:curl)/,/^(?:DSDP)/,/^(?:Fair)/,/^(?:HPND)/,/^(?:TOSL)/,/^(?:IJG)/,/^(?:SWL)/,/^(?:Vim)/,/^(?:FTL)/,/^(?:ICU)/,/^(?:OML)/,/^(?:NRL)/,/^(?:DOC)/,/^(?:TCL)/,/^(?:W3C)/,/^(?:NTP)/,/^(?:IPA)/,/^(?:ISC)/,/^(?:X11)/,/^(?:AAL)/,/^(?:AML)/,/^(?:xpp)/,/^(?:Zed)/,/^(?:MIT)/,/^(?:Mup)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255,256,257,258,259,260,261,262,263,264,265,266,267,268,269,270,271,272,273,274,275,276,277,278,279,280,281,282,283,284,285,286,287,288,289,290,291,292,293,294,295,296,297,298,299,300,301,302,303,304,305,306,307,308,309,310,311,312,313,314,315,316,317,318,319,320,321,322,323,324,325,326,327,328,329,330,331,332,333,334,335,336,337,338,339,340,341,342,343,344,345,346,347,348,349,350,351,352,353,354,355,356,357,358,359,360,361,362,363,364],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof commonjsRequire !== 'undefined' && 'object' !== 'undefined') {
exports.parser = spdxparse;
exports.Parser = spdxparse.Parser;
exports.parse = function () { return spdxparse.parse.apply(spdxparse, arguments); };
exports.main = function commonjsMain(args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = fs.readFileSync(path.normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if ('object' !== 'undefined' && commonjsRequire.main === module) {
  exports.main(process.argv.slice(1));
}
}
});

var parser = parser$1.parser;

var spdxExpressionParse = function (argument) {
  return parser.parse(argument)
};

var spdxLicenseIds = [
  "Glide",
  "Abstyles",
  "AFL-1.1",
  "AFL-1.2",
  "AFL-2.0",
  "AFL-2.1",
  "AFL-3.0",
  "AMPAS",
  "APL-1.0",
  "Adobe-Glyph",
  "APAFML",
  "Adobe-2006",
  "AGPL-1.0",
  "Afmparse",
  "Aladdin",
  "ADSL",
  "AMDPLPA",
  "ANTLR-PD",
  "Apache-1.0",
  "Apache-1.1",
  "Apache-2.0",
  "AML",
  "APSL-1.0",
  "APSL-1.1",
  "APSL-1.2",
  "APSL-2.0",
  "Artistic-1.0",
  "Artistic-1.0-Perl",
  "Artistic-1.0-cl8",
  "Artistic-2.0",
  "AAL",
  "Bahyph",
  "Barr",
  "Beerware",
  "BitTorrent-1.0",
  "BitTorrent-1.1",
  "BSL-1.0",
  "Borceux",
  "BSD-2-Clause",
  "BSD-2-Clause-FreeBSD",
  "BSD-2-Clause-NetBSD",
  "BSD-3-Clause",
  "BSD-3-Clause-Clear",
  "BSD-4-Clause",
  "BSD-Protection",
  "BSD-Source-Code",
  "BSD-3-Clause-Attribution",
  "0BSD",
  "BSD-4-Clause-UC",
  "bzip2-1.0.5",
  "bzip2-1.0.6",
  "Caldera",
  "CECILL-1.0",
  "CECILL-1.1",
  "CECILL-2.0",
  "CECILL-2.1",
  "CECILL-B",
  "CECILL-C",
  "ClArtistic",
  "MIT-CMU",
  "CNRI-Jython",
  "CNRI-Python",
  "CNRI-Python-GPL-Compatible",
  "CPOL-1.02",
  "CDDL-1.0",
  "CDDL-1.1",
  "CPAL-1.0",
  "CPL-1.0",
  "CATOSL-1.1",
  "Condor-1.1",
  "CC-BY-1.0",
  "CC-BY-2.0",
  "CC-BY-2.5",
  "CC-BY-3.0",
  "CC-BY-4.0",
  "CC-BY-ND-1.0",
  "CC-BY-ND-2.0",
  "CC-BY-ND-2.5",
  "CC-BY-ND-3.0",
  "CC-BY-ND-4.0",
  "CC-BY-NC-1.0",
  "CC-BY-NC-2.0",
  "CC-BY-NC-2.5",
  "CC-BY-NC-3.0",
  "CC-BY-NC-4.0",
  "CC-BY-NC-ND-1.0",
  "CC-BY-NC-ND-2.0",
  "CC-BY-NC-ND-2.5",
  "CC-BY-NC-ND-3.0",
  "CC-BY-NC-ND-4.0",
  "CC-BY-NC-SA-1.0",
  "CC-BY-NC-SA-2.0",
  "CC-BY-NC-SA-2.5",
  "CC-BY-NC-SA-3.0",
  "CC-BY-NC-SA-4.0",
  "CC-BY-SA-1.0",
  "CC-BY-SA-2.0",
  "CC-BY-SA-2.5",
  "CC-BY-SA-3.0",
  "CC-BY-SA-4.0",
  "CC0-1.0",
  "Crossword",
  "CrystalStacker",
  "CUA-OPL-1.0",
  "Cube",
  "curl",
  "D-FSL-1.0",
  "diffmark",
  "WTFPL",
  "DOC",
  "Dotseqn",
  "DSDP",
  "dvipdfm",
  "EPL-1.0",
  "ECL-1.0",
  "ECL-2.0",
  "eGenix",
  "EFL-1.0",
  "EFL-2.0",
  "MIT-advertising",
  "MIT-enna",
  "Entessa",
  "ErlPL-1.1",
  "EUDatagrid",
  "EUPL-1.0",
  "EUPL-1.1",
  "Eurosym",
  "Fair",
  "MIT-feh",
  "Frameworx-1.0",
  "FreeImage",
  "FTL",
  "FSFAP",
  "FSFUL",
  "FSFULLR",
  "Giftware",
  "GL2PS",
  "Glulxe",
  "AGPL-3.0",
  "GFDL-1.1",
  "GFDL-1.2",
  "GFDL-1.3",
  "GPL-1.0",
  "GPL-2.0",
  "GPL-3.0",
  "LGPL-2.1",
  "LGPL-3.0",
  "LGPL-2.0",
  "gnuplot",
  "gSOAP-1.3b",
  "HaskellReport",
  "HPND",
  "IBM-pibs",
  "IPL-1.0",
  "ICU",
  "ImageMagick",
  "iMatix",
  "Imlib2",
  "IJG",
  "Info-ZIP",
  "Intel-ACPI",
  "Intel",
  "Interbase-1.0",
  "IPA",
  "ISC",
  "JasPer-2.0",
  "JSON",
  "LPPL-1.0",
  "LPPL-1.1",
  "LPPL-1.2",
  "LPPL-1.3a",
  "LPPL-1.3c",
  "Latex2e",
  "BSD-3-Clause-LBNL",
  "Leptonica",
  "LGPLLR",
  "Libpng",
  "libtiff",
  "LAL-1.2",
  "LAL-1.3",
  "LiLiQ-P-1.1",
  "LiLiQ-Rplus-1.1",
  "LiLiQ-R-1.1",
  "LPL-1.02",
  "LPL-1.0",
  "MakeIndex",
  "MTLL",
  "MS-PL",
  "MS-RL",
  "MirOS",
  "MITNFA",
  "MIT",
  "Motosoto",
  "MPL-1.0",
  "MPL-1.1",
  "MPL-2.0",
  "MPL-2.0-no-copyleft-exception",
  "mpich2",
  "Multics",
  "Mup",
  "NASA-1.3",
  "Naumen",
  "NBPL-1.0",
  "NetCDF",
  "NGPL",
  "NOSL",
  "NPL-1.0",
  "NPL-1.1",
  "Newsletr",
  "NLPL",
  "Nokia",
  "NPOSL-3.0",
  "NLOD-1.0",
  "Noweb",
  "NRL",
  "NTP",
  "Nunit",
  "OCLC-2.0",
  "ODbL-1.0",
  "PDDL-1.0",
  "OCCT-PL",
  "OGTSL",
  "OLDAP-2.2.2",
  "OLDAP-1.1",
  "OLDAP-1.2",
  "OLDAP-1.3",
  "OLDAP-1.4",
  "OLDAP-2.0",
  "OLDAP-2.0.1",
  "OLDAP-2.1",
  "OLDAP-2.2",
  "OLDAP-2.2.1",
  "OLDAP-2.3",
  "OLDAP-2.4",
  "OLDAP-2.5",
  "OLDAP-2.6",
  "OLDAP-2.7",
  "OLDAP-2.8",
  "OML",
  "OPL-1.0",
  "OSL-1.0",
  "OSL-1.1",
  "OSL-2.0",
  "OSL-2.1",
  "OSL-3.0",
  "OpenSSL",
  "OSET-PL-2.1",
  "PHP-3.0",
  "PHP-3.01",
  "Plexus",
  "PostgreSQL",
  "psfrag",
  "psutils",
  "Python-2.0",
  "QPL-1.0",
  "Qhull",
  "Rdisc",
  "RPSL-1.0",
  "RPL-1.1",
  "RPL-1.5",
  "RHeCos-1.1",
  "RSCPL",
  "RSA-MD",
  "Ruby",
  "SAX-PD",
  "Saxpath",
  "SCEA",
  "SWL",
  "SMPPL",
  "Sendmail",
  "SGI-B-1.0",
  "SGI-B-1.1",
  "SGI-B-2.0",
  "OFL-1.0",
  "OFL-1.1",
  "SimPL-2.0",
  "Sleepycat",
  "SNIA",
  "Spencer-86",
  "Spencer-94",
  "Spencer-99",
  "SMLNJ",
  "SugarCRM-1.1.3",
  "SISSL",
  "SISSL-1.2",
  "SPL-1.0",
  "Watcom-1.0",
  "TCL",
  "Unlicense",
  "TMate",
  "TORQUE-1.1",
  "TOSL",
  "Unicode-TOU",
  "UPL-1.0",
  "NCSA",
  "Vim",
  "VOSTROM",
  "VSL-1.0",
  "W3C-19980720",
  "W3C",
  "Wsuipa",
  "Xnet",
  "X11",
  "Xerox",
  "XFree86-1.1",
  "xinetd",
  "xpp",
  "XSkat",
  "YPL-1.0",
  "YPL-1.1",
  "Zed",
  "Zend-2.0",
  "Zimbra-1.3",
  "Zimbra-1.4",
  "Zlib",
  "zlib-acknowledgement",
  "ZPL-1.1",
  "ZPL-2.0",
  "ZPL-2.1",
  "BSD-3-Clause-No-Nuclear-License",
  "BSD-3-Clause-No-Nuclear-Warranty",
  "BSD-3-Clause-No-Nuclear-License-2014",
  "eCos-2.0",
  "GPL-2.0-with-autoconf-exception",
  "GPL-2.0-with-bison-exception",
  "GPL-2.0-with-classpath-exception",
  "GPL-2.0-with-font-exception",
  "GPL-2.0-with-GCC-exception",
  "GPL-3.0-with-autoconf-exception",
  "GPL-3.0-with-GCC-exception",
  "StandardML-NJ",
  "WXwindows"
]
;

var spdxLicenseIds$1 = Object.freeze({
	default: spdxLicenseIds
});

var licenseIDs = ( spdxLicenseIds$1 && spdxLicenseIds ) || spdxLicenseIds$1;

function valid(string) {
  return licenseIDs.indexOf(string) > -1;
}

// Common transpositions of license identifier acronyms
var transpositions = [
  ['APGL', 'AGPL'],
  ['Gpl', 'GPL'],
  ['GLP', 'GPL'],
  ['APL', 'Apache'],
  ['ISD', 'ISC'],
  ['GLP', 'GPL'],
  ['IST', 'ISC'],
  ['Claude', 'Clause'],
  [' or later', '+'],
  [' International', ''],
  ['GNU', 'GPL'],
  ['GUN', 'GPL'],
  ['+', ''],
  ['GNU GPL', 'GPL'],
  ['GNU/GPL', 'GPL'],
  ['GNU GLP', 'GPL'],
  ['GNU General Public License', 'GPL'],
  ['Gnu public license', 'GPL'],
  ['GNU Public License', 'GPL'],
  ['GNU GENERAL PUBLIC LICENSE', 'GPL'],
  ['MTI', 'MIT'],
  ['Mozilla Public License', 'MPL'],
  ['WTH', 'WTF'],
  ['-License', '']
];

var TRANSPOSED = 0;
var CORRECT = 1;

// Simple corrections to nearly valid identifiers.
var transforms = [
  // e.g. 'mit'
  function(argument) {
    return argument.toUpperCase();
  },
  // e.g. 'MIT '
  function(argument) {
    return argument.trim();
  },
  // e.g. 'M.I.T.'
  function(argument) {
    return argument.replace(/\./g, '');
  },
  // e.g. 'Apache- 2.0'
  function(argument) {
    return argument.replace(/\s+/g, '');
  },
  // e.g. 'CC BY 4.0''
  function(argument) {
    return argument.replace(/\s+/g, '-');
  },
  // e.g. 'LGPLv2.1'
  function(argument) {
    return argument.replace('v', '-');
  },
  // e.g. 'Apache 2.0'
  function(argument) {
    return argument.replace(/,?\s*(\d)/, '-$1');
  },
  // e.g. 'GPL 2'
  function(argument) {
    return argument.replace(/,?\s*(\d)/, '-$1.0');
  },
  // e.g. 'Apache Version 2.0'
  function(argument) {
    return argument.replace(/,?\s*(V\.|v\.|V|v|Version|version)\s*(\d)/, '-$2');
  },
  // e.g. 'Apache Version 2'
  function(argument) {
    return argument.replace(/,?\s*(V\.|v\.|V|v|Version|version)\s*(\d)/, '-$2.0');
  },
  // e.g. 'ZLIB'
  function(argument) {
    return argument[0].toUpperCase() + argument.slice(1);
  },
  // e.g. 'MPL/2.0'
  function(argument) {
    return argument.replace('/', '-');
  },
  // e.g. 'Apache 2'
  function(argument) {
    return argument
      .replace(/\s*V\s*(\d)/, '-$1')
      .replace(/(\d)$/, '$1.0');
  },
  // e.g. 'GPL-2.0-'
  function(argument) {
    return argument.slice(0, argument.length - 1);
  },
  // e.g. 'GPL2'
  function(argument) {
    return argument.replace(/(\d)$/, '-$1.0');
  },
  // e.g. 'BSD 3'
  function(argument) {
    return argument.replace(/(-| )?(\d)$/, '-$2-Clause');
  },
  // e.g. 'BSD clause 3'
  function(argument) {
    return argument.replace(/(-| )clause(-| )(\d)/, '-$3-Clause');
  },
  // e.g. 'BY-NC-4.0'
  function(argument) {
    return 'CC-' + argument;
  },
  // e.g. 'BY-NC'
  function(argument) {
    return 'CC-' + argument + '-4.0';
  },
  // e.g. 'Attribution-NonCommercial'
  function(argument) {
    return argument
      .replace('Attribution', 'BY')
      .replace('NonCommercial', 'NC')
      .replace('NoDerivatives', 'ND')
      .replace(/ (\d)/, '-$1')
      .replace(/ ?International/, '');
  },
  // e.g. 'Attribution-NonCommercial'
  function(argument) {
    return 'CC-' +
      argument
      .replace('Attribution', 'BY')
      .replace('NonCommercial', 'NC')
      .replace('NoDerivatives', 'ND')
      .replace(/ (\d)/, '-$1')
      .replace(/ ?International/, '') +
      '-4.0';
  }
];

// If all else fails, guess that strings containing certain substrings
// meant to identify certain licenses.
var lastResorts = [
  ['UNLI', 'Unlicense'],
  ['WTF', 'WTFPL'],
  ['2 CLAUSE', 'BSD-2-Clause'],
  ['2-CLAUSE', 'BSD-2-Clause'],
  ['3 CLAUSE', 'BSD-3-Clause'],
  ['3-CLAUSE', 'BSD-3-Clause'],
  ['AFFERO', 'AGPL-3.0'],
  ['AGPL', 'AGPL-3.0'],
  ['APACHE', 'Apache-2.0'],
  ['ARTISTIC', 'Artistic-2.0'],
  ['Affero', 'AGPL-3.0'],
  ['BEER', 'Beerware'],
  ['BOOST', 'BSL-1.0'],
  ['BSD', 'BSD-2-Clause'],
  ['ECLIPSE', 'EPL-1.0'],
  ['FUCK', 'WTFPL'],
  ['GNU', 'GPL-3.0'],
  ['LGPL', 'LGPL-3.0'],
  ['GPL', 'GPL-3.0'],
  ['MIT', 'MIT'],
  ['MPL', 'MPL-2.0'],
  ['X11', 'X11'],
  ['ZLIB', 'Zlib']
];

var SUBSTRING = 0;
var IDENTIFIER = 1;

var validTransformation = function(identifier) {
  for (var i = 0; i < transforms.length; i++) {
    var transformed = transforms[i](identifier);
    if (transformed !== identifier && valid(transformed)) {
      return transformed;
    }
  }
  return null;
};

var validLastResort = function(identifier) {
  var upperCased = identifier.toUpperCase();
  for (var i = 0; i < lastResorts.length; i++) {
    var lastResort = lastResorts[i];
    if (upperCased.indexOf(lastResort[SUBSTRING]) > -1) {
      return lastResort[IDENTIFIER];
    }
  }
  return null;
};

var anyCorrection = function(identifier, check) {
  for (var i = 0; i < transpositions.length; i++) {
    var transposition = transpositions[i];
    var transposed = transposition[TRANSPOSED];
    if (identifier.indexOf(transposed) > -1) {
      var corrected = identifier.replace(
        transposed,
        transposition[CORRECT]
      );
      var checked = check(corrected);
      if (checked !== null) {
        return checked;
      }
    }
  }
  return null;
};

var spdxCorrect = function(identifier) {
  identifier = identifier.replace(/\+$/, '');
  if (valid(identifier)) {
    return identifier;
  }
  var transformed = validTransformation(identifier);
  if (transformed !== null) {
    return transformed;
  }
  transformed = anyCorrection(identifier, function(argument) {
    if (valid(argument)) {
      return argument;
    }
    return validTransformation(argument);
  });
  if (transformed !== null) {
    return transformed;
  }
  transformed = validLastResort(identifier);
  if (transformed !== null) {
    return transformed;
  }
  transformed = anyCorrection(identifier, validLastResort);
  if (transformed !== null) {
    return transformed;
  }
  return null;
};

var genericWarning = (
  'license should be ' +
  'a valid SPDX license expression (without "LicenseRef"), ' +
  '"UNLICENSED", or ' +
  '"SEE LICENSE IN <filename>"'
);

var fileReferenceRE = /^SEE LICEN[CS]E IN (.+)$/;

function startsWith(prefix, string) {
  return string.slice(0, prefix.length) === prefix;
}

function usesLicenseRef(ast) {
  if (ast.hasOwnProperty('license')) {
    var license = ast.license;
    return (
      startsWith('LicenseRef', license) ||
      startsWith('DocumentRef', license)
    );
  } else {
    return (
      usesLicenseRef(ast.left) ||
      usesLicenseRef(ast.right)
    );
  }
}

var validateNpmPackageLicense = function(argument) {
  var ast;

  try {
    ast = spdxExpressionParse(argument);
  } catch (e) {
    var match;
    if (
      argument === 'UNLICENSED' ||
      argument === 'UNLICENCED'
    ) {
      return {
        validForOldPackages: true,
        validForNewPackages: true,
        unlicensed: true
      };
    } else if (match = fileReferenceRE.exec(argument)) {
      return {
        validForOldPackages: true,
        validForNewPackages: true,
        inFile: match[1]
      };
    } else {
      var result = {
        validForOldPackages: false,
        validForNewPackages: false,
        warnings: [genericWarning]
      };
      var corrected = spdxCorrect(argument);
      if (corrected) {
        result.warnings.push(
          'license is similar to the valid expression "' + corrected + '"'
        );
      }
      return result;
    }
  }

  if (usesLicenseRef(ast)) {
    return {
      validForNewPackages: false,
      validForOldPackages: false,
      spdx: true,
      warnings: [genericWarning]
    };
  } else {
    return {
      validForNewPackages: true,
      validForOldPackages: true,
      spdx: true
    };
  }
};

var gitHostInfo = createCommonjsModule(function (module) {
'use strict';

var gitHosts = module.exports = {
  github: {
    // First two are insecure and generally shouldn't be used any more, but
    // they are still supported.
    'protocols': [ 'git', 'http', 'git+ssh', 'git+https', 'ssh', 'https' ],
    'domain': 'github.com',
    'treepath': 'tree',
    'filetemplate': 'https://{auth@}raw.githubusercontent.com/{user}/{project}/{committish}/{path}',
    'bugstemplate': 'https://{domain}/{user}/{project}/issues',
    'gittemplate': 'git://{auth@}{domain}/{user}/{project}.git{#committish}',
    'tarballtemplate': 'https://{domain}/{user}/{project}/archive/{committish}.tar.gz'
  },
  bitbucket: {
    'protocols': [ 'git+ssh', 'git+https', 'ssh', 'https' ],
    'domain': 'bitbucket.org',
    'treepath': 'src',
    'tarballtemplate': 'https://{domain}/{user}/{project}/get/{committish}.tar.gz'
  },
  gitlab: {
    'protocols': [ 'git+ssh', 'git+https', 'ssh', 'https' ],
    'domain': 'gitlab.com',
    'treepath': 'tree',
    'docstemplate': 'https://{domain}/{user}/{project}{/tree/committish}#README',
    'bugstemplate': 'https://{domain}/{user}/{project}/issues',
    'tarballtemplate': 'https://{domain}/{user}/{project}/repository/archive.tar.gz?ref={committish}'
  },
  gist: {
    'protocols': [ 'git', 'git+ssh', 'git+https', 'ssh', 'https' ],
    'domain': 'gist.github.com',
    'pathmatch': /^[/](?:([^/]+)[/])?([a-z0-9]+)(?:[.]git)?$/,
    'filetemplate': 'https://gist.githubusercontent.com/{user}/{project}/raw{/committish}/{path}',
    'bugstemplate': 'https://{domain}/{project}',
    'gittemplate': 'git://{domain}/{project}.git{#committish}',
    'sshtemplate': 'git@{domain}:/{project}.git{#committish}',
    'sshurltemplate': 'git+ssh://git@{domain}/{project}.git{#committish}',
    'browsetemplate': 'https://{domain}/{project}{/committish}',
    'docstemplate': 'https://{domain}/{project}{/committish}',
    'httpstemplate': 'git+https://{domain}/{project}.git{#committish}',
    'shortcuttemplate': '{type}:{project}{#committish}',
    'pathtemplate': '{project}{#committish}',
    'tarballtemplate': 'https://{domain}/{user}/{project}/archive/{committish}.tar.gz'
  }
};

var gitHostDefaults = {
  'sshtemplate': 'git@{domain}:{user}/{project}.git{#committish}',
  'sshurltemplate': 'git+ssh://git@{domain}/{user}/{project}.git{#committish}',
  'browsetemplate': 'https://{domain}/{user}/{project}{/tree/committish}',
  'docstemplate': 'https://{domain}/{user}/{project}{/tree/committish}#readme',
  'httpstemplate': 'git+https://{auth@}{domain}/{user}/{project}.git{#committish}',
  'filetemplate': 'https://{domain}/{user}/{project}/raw/{committish}/{path}',
  'shortcuttemplate': '{type}:{user}/{project}{#committish}',
  'pathtemplate': '{user}/{project}{#committish}',
  'pathmatch': /^[/]([^/]+)[/]([^/]+?)(?:[.]git|[/])?$/
};

Object.keys(gitHosts).forEach(function (name) {
  Object.keys(gitHostDefaults).forEach(function (key) {
    if (gitHosts[name][key]) return
    gitHosts[name][key] = gitHostDefaults[key];
  });
  gitHosts[name].protocols_re = RegExp('^(' +
    gitHosts[name].protocols.map(function (protocol) {
      return protocol.replace(/([\\+*{}()[\]$^|])/g, '\\$1')
    }).join('|') + '):$');
});
});

var gitHost = createCommonjsModule(function (module) {
'use strict';

var extend = Object.assign || util._extend;

var GitHost = module.exports = function (type, user, auth, project, committish, defaultRepresentation, opts) {
  var gitHostInfo$$1 = this;
  gitHostInfo$$1.type = type;
  Object.keys(gitHostInfo[type]).forEach(function (key) {
    gitHostInfo$$1[key] = gitHostInfo[type][key];
  });
  gitHostInfo$$1.user = user;
  gitHostInfo$$1.auth = auth;
  gitHostInfo$$1.project = project;
  gitHostInfo$$1.committish = committish;
  gitHostInfo$$1.default = defaultRepresentation;
  gitHostInfo$$1.opts = opts || {};
};
GitHost.prototype = {};

GitHost.prototype.hash = function () {
  return this.committish ? '#' + this.committish : ''
};

GitHost.prototype._fill = function (template, opts) {
  if (!template) return
  var vars = extend({}, opts);
  opts = extend(extend({}, this.opts), opts);
  var self = this;
  Object.keys(this).forEach(function (key) {
    if (self[key] != null && vars[key] == null) vars[key] = self[key];
  });
  var rawAuth = vars.auth;
  var rawComittish = vars.committish;
  Object.keys(vars).forEach(function (key) {
    vars[key] = encodeURIComponent(vars[key]);
  });
  vars['auth@'] = rawAuth ? rawAuth + '@' : '';
  if (opts.noCommittish) {
    vars['#committish'] = '';
    vars['/tree/committish'] = '';
    vars['/comittish'] = '';
    vars.comittish = '';
  } else {
    vars['#committish'] = rawComittish ? '#' + rawComittish : '';
    vars['/tree/committish'] = vars.committish
                            ? '/' + vars.treepath + '/' + vars.committish
                            : '';
    vars['/committish'] = vars.committish ? '/' + vars.committish : '';
    vars.committish = vars.committish || 'master';
  }
  var res = template;
  Object.keys(vars).forEach(function (key) {
    res = res.replace(new RegExp('[{]' + key + '[}]', 'g'), vars[key]);
  });
  if (opts.noGitPlus) {
    return res.replace(/^git[+]/, '')
  } else {
    return res
  }
};

GitHost.prototype.ssh = function (opts) {
  return this._fill(this.sshtemplate, opts)
};

GitHost.prototype.sshurl = function (opts) {
  return this._fill(this.sshurltemplate, opts)
};

GitHost.prototype.browse = function (opts) {
  return this._fill(this.browsetemplate, opts)
};

GitHost.prototype.docs = function (opts) {
  return this._fill(this.docstemplate, opts)
};

GitHost.prototype.bugs = function (opts) {
  return this._fill(this.bugstemplate, opts)
};

GitHost.prototype.https = function (opts) {
  return this._fill(this.httpstemplate, opts)
};

GitHost.prototype.git = function (opts) {
  return this._fill(this.gittemplate, opts)
};

GitHost.prototype.shortcut = function (opts) {
  return this._fill(this.shortcuttemplate, opts)
};

GitHost.prototype.path = function (opts) {
  return this._fill(this.pathtemplate, opts)
};

GitHost.prototype.tarball = function (opts) {
  return this._fill(this.tarballtemplate, opts)
};

GitHost.prototype.file = function (P, opts) {
  return this._fill(this.filetemplate, extend({
    path: P.replace(/^[/]+/g, '')
  }, opts))
};

GitHost.prototype.getDefaultRepresentation = function () {
  return this.default
};

GitHost.prototype.toString = function (opts) {
  return (this[this.default] || this.sshurl).call(this, opts)
};
});

var hostedGitInfo = createCommonjsModule(function (module) {
'use strict';


var GitHost = module.exports = gitHost;

var protocolToRepresentationMap = {
  'git+ssh': 'sshurl',
  'git+https': 'https',
  'ssh': 'sshurl',
  'git': 'git'
};

function protocolToRepresentation (protocol) {
  if (protocol.substr(-1) === ':') protocol = protocol.slice(0, -1);
  return protocolToRepresentationMap[protocol] || protocol
}

var authProtocols = {
  'git:': true,
  'https:': true,
  'git+https:': true,
  'http:': true,
  'git+http:': true
};

module.exports.fromUrl = function (giturl, opts) {
  if (giturl == null || giturl === '') return
  var url$$1 = fixupUnqualifiedGist(
    isGitHubShorthand(giturl) ? 'github:' + giturl : giturl
  );
  var parsed = parseGitUrl(url$$1);
  var shortcutMatch = url$$1.match(new RegExp('^([^:]+):(?:(?:[^@:]+(?:[^@]+)?@)?([^/]*))[/](.+?)(?:[.]git)?($|#)'));
  var matches = Object.keys(gitHostInfo).map(function (gitHostName) {
    try {
      var gitHostInfo$$1 = gitHostInfo[gitHostName];
      var auth = null;
      if (parsed.auth && authProtocols[parsed.protocol]) {
        auth = decodeURIComponent(parsed.auth);
      }
      var committish = parsed.hash ? decodeURIComponent(parsed.hash.substr(1)) : null;
      var user = null;
      var project = null;
      var defaultRepresentation = null;
      if (shortcutMatch && shortcutMatch[1] === gitHostName) {
        user = shortcutMatch[2] && decodeURIComponent(shortcutMatch[2]);
        project = decodeURIComponent(shortcutMatch[3]);
        defaultRepresentation = 'shortcut';
      } else {
        if (parsed.host !== gitHostInfo$$1.domain) return
        if (!gitHostInfo$$1.protocols_re.test(parsed.protocol)) return
        if (!parsed.path) return
        var pathmatch = gitHostInfo$$1.pathmatch;
        var matched = parsed.path.match(pathmatch);
        if (!matched) return
        if (matched[1] != null) user = decodeURIComponent(matched[1].replace(/^:/, ''));
        if (matched[2] != null) project = decodeURIComponent(matched[2]);
        defaultRepresentation = protocolToRepresentation(parsed.protocol);
      }
      return new GitHost(gitHostName, user, auth, project, committish, defaultRepresentation, opts)
    } catch (ex) {
      if (!(ex instanceof URIError)) throw ex
    }
  }).filter(function (gitHostInfo$$1) { return gitHostInfo$$1 });
  if (matches.length !== 1) return
  return matches[0]
};

function isGitHubShorthand (arg) {
  // Note: This does not fully test the git ref format.
  // See https://www.kernel.org/pub/software/scm/git/docs/git-check-ref-format.html
  //
  // The only way to do this properly would be to shell out to
  // git-check-ref-format, and as this is a fast sync function,
  // we don't want to do that.  Just let git fail if it turns
  // out that the commit-ish is invalid.
  // GH usernames cannot start with . or -
  return /^[^:@%/\s.-][^:@%/\s]*[/][^:@\s/%]+(?:#.*)?$/.test(arg)
}

function fixupUnqualifiedGist (giturl) {
  // necessary for round-tripping gists
  var parsed = url.parse(giturl);
  if (parsed.protocol === 'gist:' && parsed.host && !parsed.path) {
    return parsed.protocol + '/' + parsed.host
  } else {
    return giturl
  }
}

function parseGitUrl (giturl) {
  if (typeof giturl !== 'string') giturl = '' + giturl;
  var matched = giturl.match(/^([^@]+)@([^:/]+):[/]?((?:[^/]+[/])?[^/]+?)(?:[.]git)?(#.*)?$/);
  if (!matched) return url.parse(giturl)
  return {
    protocol: 'git+ssh:',
    slashes: true,
    auth: matched[1],
    host: matched[2],
    port: null,
    hostname: matched[2],
    hash: matched[4],
    search: null,
    query: null,
    pathname: '/' + matched[3],
    path: '/' + matched[3],
    href: 'git+ssh://' + matched[1] + '@' + matched[2] +
          '/' + matched[3] + (matched[4] || '')
  }
}
});

var blacklist = [
	'freelist',
	'sys'
];

var builtinModules = Object.keys(process.binding('natives')).filter(function (el) {
	return !/^_|^internal|\//.test(el) && blacklist.indexOf(el) === -1;
}).sort();

var isBuiltinModule = function (str) {
	if (typeof str !== 'string') {
		throw new TypeError('Expected a string');
	}

	return builtinModules.indexOf(str) !== -1;
};

var extract_description = extractDescription;

// Extracts description from contents of a readme file in markdown format
function extractDescription (d) {
  if (!d) return;
  if (d === "ERROR: No README data found!") return;
  // the first block of text before the first heading
  // that isn't the first line heading
  d = d.trim().split('\n');
  for (var s = 0; d[s] && d[s].trim().match(/^(#|$)/); s ++);
  var l = d.length;
  for (var e = s + 1; e < l && d[e].trim(); e ++);
  return d.slice(s, e).join(' ').trim()
}

var topLevel = {"dependancies":"dependencies","dependecies":"dependencies","depdenencies":"dependencies","devEependencies":"devDependencies","depends":"dependencies","dev-dependencies":"devDependencies","devDependences":"devDependencies","devDepenencies":"devDependencies","devdependencies":"devDependencies","repostitory":"repository","repo":"repository","prefereGlobal":"preferGlobal","hompage":"homepage","hampage":"homepage","autohr":"author","autor":"author","contributers":"contributors","publicationConfig":"publishConfig","script":"scripts"};
var bugs = {"web":"url","name":"url"};
var script = {"server":"start","tests":"test"};
var typos = {
	topLevel: topLevel,
	bugs: bugs,
	script: script
};

var typos$1 = Object.freeze({
	topLevel: topLevel,
	bugs: bugs,
	script: script,
	default: typos
});

var typos$2 = ( typos$1 && typos ) || typos$1;

var fixer_1 = createCommonjsModule(function (module) {
var depTypes = ["dependencies","devDependencies","optionalDependencies"];




var fixer = module.exports = {
  // default warning function
  warn: function() {},

  fixRepositoryField: function(data) {
    if (data.repositories) {
      this.warn("repositories");
      data.repository = data.repositories[0];
    }
    if (!data.repository) return this.warn("missingRepository")
    if (typeof data.repository === "string") {
      data.repository = {
        type: "git",
        url: data.repository
      };
    }
    var r = data.repository.url || "";
    if (r) {
      var hosted = hostedGitInfo.fromUrl(r);
      if (hosted) {
        r = data.repository.url
          = hosted.getDefaultRepresentation() == "shortcut" ? hosted.https() : hosted.toString();
      }
    }

    if (r.match(/github.com\/[^\/]+\/[^\/]+\.git\.git$/)) {
      this.warn("brokenGitUrl", r);
    }
  }

, fixTypos: function(data) {
    Object.keys(typos$2.topLevel).forEach(function (d) {
      if (data.hasOwnProperty(d)) {
        this.warn("typo", d, typos$2.topLevel[d]);
      }
    }, this);
  }

, fixScriptsField: function(data) {
    if (!data.scripts) return
    if (typeof data.scripts !== "object") {
      this.warn("nonObjectScripts");
      delete data.scripts;
      return
    }
    Object.keys(data.scripts).forEach(function (k) {
      if (typeof data.scripts[k] !== "string") {
        this.warn("nonStringScript");
        delete data.scripts[k];
      } else if (typos$2.script[k] && !data.scripts[typos$2.script[k]]) {
        this.warn("typo", k, typos$2.script[k], "scripts");
      }
    }, this);
  }

, fixFilesField: function(data) {
    var files = data.files;
    if (files && !Array.isArray(files)) {
      this.warn("nonArrayFiles");
      delete data.files;
    } else if (data.files) {
      data.files = data.files.filter(function(file) {
        if (!file || typeof file !== "string") {
          this.warn("invalidFilename", file);
          return false
        } else {
          return true
        }
      }, this);
    }
  }

, fixBinField: function(data) {
    if (!data.bin) return;
    if (typeof data.bin === "string") {
      var b = {};
      var match;
      if (match = data.name.match(/^@[^/]+[/](.*)$/)) {
        b[match[1]] = data.bin;
      } else {
        b[data.name] = data.bin;
      }
      data.bin = b;
    }
  }

, fixManField: function(data) {
    if (!data.man) return;
    if (typeof data.man === "string") {
      data.man = [ data.man ];
    }
  }
, fixBundleDependenciesField: function(data) {
    var bdd = "bundledDependencies";
    var bd = "bundleDependencies";
    if (data[bdd] && !data[bd]) {
      data[bd] = data[bdd];
      delete data[bdd];
    }
    if (data[bd] && !Array.isArray(data[bd])) {
      this.warn("nonArrayBundleDependencies");
      delete data[bd];
    } else if (data[bd]) {
      data[bd] = data[bd].filter(function(bd) {
        if (!bd || typeof bd !== 'string') {
          this.warn("nonStringBundleDependency", bd);
          return false
        } else {
          if (!data.dependencies) {
            data.dependencies = {};
          }
          if (!data.dependencies.hasOwnProperty(bd)) {
            this.warn("nonDependencyBundleDependency", bd);
            data.dependencies[bd] = "*";
          }
          return true
        }
      }, this);
    }
  }

, fixDependencies: function(data, strict) {
    var loose = !strict;
    objectifyDeps(data, this.warn);
    addOptionalDepsToDeps(data, this.warn);
    this.fixBundleDependenciesField(data)

    ;['dependencies','devDependencies'].forEach(function(deps) {
      if (!(deps in data)) return
      if (!data[deps] || typeof data[deps] !== "object") {
        this.warn("nonObjectDependencies", deps);
        delete data[deps];
        return
      }
      Object.keys(data[deps]).forEach(function (d) {
        var r = data[deps][d];
        if (typeof r !== 'string') {
          this.warn("nonStringDependency", d, JSON.stringify(r));
          delete data[deps][d];
        }
        var hosted = hostedGitInfo.fromUrl(data[deps][d]);
        if (hosted) data[deps][d] = hosted.toString();
      }, this);
    }, this);
  }

, fixModulesField: function (data) {
    if (data.modules) {
      this.warn("deprecatedModules");
      delete data.modules;
    }
  }

, fixKeywordsField: function (data) {
    if (typeof data.keywords === "string") {
      data.keywords = data.keywords.split(/,\s+/);
    }
    if (data.keywords && !Array.isArray(data.keywords)) {
      delete data.keywords;
      this.warn("nonArrayKeywords");
    } else if (data.keywords) {
      data.keywords = data.keywords.filter(function(kw) {
        if (typeof kw !== "string" || !kw) {
          this.warn("nonStringKeyword");
          return false
        } else {
          return true
        }
      }, this);
    }
  }

, fixVersionField: function(data, strict) {
    // allow "loose" semver 1.0 versions in non-strict mode
    // enforce strict semver 2.0 compliance in strict mode
    var loose = !strict;
    if (!data.version) {
      data.version = "";
      return true
    }
    if (!semver.valid(data.version, loose)) {
      throw new Error('Invalid version: "'+ data.version + '"')
    }
    data.version = semver.clean(data.version, loose);
    return true
  }

, fixPeople: function(data) {
    modifyPeople(data, unParsePerson);
    modifyPeople(data, parsePerson);
  }

, fixNameField: function(data, options) {
    if (typeof options === "boolean") options = {strict: options};
    else if (typeof options === "undefined") options = {};
    var strict = options.strict;
    if (!data.name && !strict) {
      data.name = "";
      return
    }
    if (typeof data.name !== "string") {
      throw new Error("name field must be a string.")
    }
    if (!strict)
      data.name = data.name.trim();
    ensureValidName(data.name, strict, options.allowLegacyCase);
    if (isBuiltinModule(data.name))
      this.warn("conflictingName", data.name);
  }


, fixDescriptionField: function (data) {
    if (data.description && typeof data.description !== 'string') {
      this.warn("nonStringDescription");
      delete data.description;
    }
    if (data.readme && !data.description)
      data.description = extract_description(data.readme);
      if(data.description === undefined) delete data.description;
    if (!data.description) this.warn("missingDescription");
  }

, fixReadmeField: function (data) {
    if (!data.readme) {
      this.warn("missingReadme");
      data.readme = "ERROR: No README data found!";
    }
  }

, fixBugsField: function(data) {
    if (!data.bugs && data.repository && data.repository.url) {
      var hosted = hostedGitInfo.fromUrl(data.repository.url);
      if(hosted && hosted.bugs()) {
        data.bugs = {url: hosted.bugs()};
      }
    }
    else if(data.bugs) {
      var emailRe = /^.+@.*\..+$/;
      if(typeof data.bugs == "string") {
        if(emailRe.test(data.bugs))
          data.bugs = {email:data.bugs};
        else if(url.parse(data.bugs).protocol)
          data.bugs = {url: data.bugs};
        else
          this.warn("nonEmailUrlBugsString");
      }
      else {
        bugsTypos(data.bugs, this.warn);
        var oldBugs = data.bugs;
        data.bugs = {};
        if(oldBugs.url) {
          if(typeof(oldBugs.url) == "string" && url.parse(oldBugs.url).protocol)
            data.bugs.url = oldBugs.url;
          else
            this.warn("nonUrlBugsUrlField");
        }
        if(oldBugs.email) {
          if(typeof(oldBugs.email) == "string" && emailRe.test(oldBugs.email))
            data.bugs.email = oldBugs.email;
          else
            this.warn("nonEmailBugsEmailField");
        }
      }
      if(!data.bugs.email && !data.bugs.url) {
        delete data.bugs;
        this.warn("emptyNormalizedBugs");
      }
    }
  }

, fixHomepageField: function(data) {
    if (!data.homepage && data.repository && data.repository.url) {
      var hosted = hostedGitInfo.fromUrl(data.repository.url);
      if (hosted && hosted.docs()) data.homepage = hosted.docs();
    }
    if (!data.homepage) return

    if(typeof data.homepage !== "string") {
      this.warn("nonUrlHomepage");
      return delete data.homepage
    }
    if(!url.parse(data.homepage).protocol) {
      this.warn("missingProtocolHomepage");
      data.homepage = "http://" + data.homepage;
    }
  }

, fixLicenseField: function(data) {
    if (!data.license) {
      return this.warn("missingLicense")
    } else{
      if (
        typeof(data.license) !== 'string' ||
        data.license.length < 1
      ) {
        this.warn("invalidLicense");
      } else {
        if (!validateNpmPackageLicense(data.license).validForNewPackages)
          this.warn("invalidLicense");
      }
    }
  }
};

function isValidScopedPackageName(spec) {
  if (spec.charAt(0) !== '@') return false

  var rest = spec.slice(1).split('/');
  if (rest.length !== 2) return false

  return rest[0] && rest[1] &&
    rest[0] === encodeURIComponent(rest[0]) &&
    rest[1] === encodeURIComponent(rest[1])
}

function isCorrectlyEncodedName(spec) {
  return !spec.match(/[\/@\s\+%:]/) &&
    spec === encodeURIComponent(spec)
}

function ensureValidName (name, strict, allowLegacyCase) {
  if (name.charAt(0) === "." ||
      !(isValidScopedPackageName(name) || isCorrectlyEncodedName(name)) ||
      (strict && (!allowLegacyCase) && name !== name.toLowerCase()) ||
      name.toLowerCase() === "node_modules" ||
      name.toLowerCase() === "favicon.ico") {
        throw new Error("Invalid name: " + JSON.stringify(name))
  }
}

function modifyPeople (data, fn) {
  if (data.author) data.author = fn(data.author)
  ;["maintainers", "contributors"].forEach(function (set) {
    if (!Array.isArray(data[set])) return;
    data[set] = data[set].map(fn);
  });
  return data
}

function unParsePerson (person) {
  if (typeof person === "string") return person
  var name = person.name || "";
  var u = person.url || person.web;
  var url$$1 = u ? (" ("+u+")") : "";
  var e = person.email || person.mail;
  var email = e ? (" <"+e+">") : "";
  return name+email+url$$1
}

function parsePerson (person) {
  if (typeof person !== "string") return person
  var name = person.match(/^([^\(<]+)/);
  var url$$1 = person.match(/\(([^\)]+)\)/);
  var email = person.match(/<([^>]+)>/);
  var obj = {};
  if (name && name[0].trim()) obj.name = name[0].trim();
  if (email) obj.email = email[1];
  if (url$$1) obj.url = url$$1[1];
  return obj
}

function addOptionalDepsToDeps (data, warn) {
  var o = data.optionalDependencies;
  if (!o) return;
  var d = data.dependencies || {};
  Object.keys(o).forEach(function (k) {
    d[k] = o[k];
  });
  data.dependencies = d;
}

function depObjectify (deps, type, warn) {
  if (!deps) return {}
  if (typeof deps === "string") {
    deps = deps.trim().split(/[\n\r\s\t ,]+/);
  }
  if (!Array.isArray(deps)) return deps
  warn("deprecatedArrayDependencies", type);
  var o = {};
  deps.filter(function (d) {
    return typeof d === "string"
  }).forEach(function(d) {
    d = d.trim().split(/(:?[@\s><=])/);
    var dn = d.shift();
    var dv = d.join("");
    dv = dv.trim();
    dv = dv.replace(/^@/, "");
    o[dn] = dv;
  });
  return o
}

function objectifyDeps (data, warn) {
  depTypes.forEach(function (type) {
    if (!data[type]) return;
    data[type] = depObjectify(data[type], type, warn);
  });
}

function bugsTypos(bugs, warn) {
  if (!bugs) return
  Object.keys(bugs).forEach(function (k) {
    if (typos$2.bugs[k]) {
      warn("typo", k, typos$2.bugs[k], "bugs");
      bugs[typos$2.bugs[k]] = bugs[k];
      delete bugs[k];
    }
  });
}
});

var repositories = "'repositories' (plural) Not supported. Please pick one as the 'repository' field";
var missingRepository = "No repository field.";
var brokenGitUrl = "Probably broken git url: %s";
var nonObjectScripts = "scripts must be an object";
var nonStringScript = "script values must be string commands";
var nonArrayFiles = "Invalid 'files' member";
var invalidFilename = "Invalid filename in 'files' list: %s";
var nonArrayBundleDependencies = "Invalid 'bundleDependencies' list. Must be array of package names";
var nonStringBundleDependency = "Invalid bundleDependencies member: %s";
var nonDependencyBundleDependency = "Non-dependency in bundleDependencies: %s";
var nonObjectDependencies = "%s field must be an object";
var nonStringDependency = "Invalid dependency: %s %s";
var deprecatedArrayDependencies = "specifying %s as array is deprecated";
var deprecatedModules = "modules field is deprecated";
var nonArrayKeywords = "keywords should be an array of strings";
var nonStringKeyword = "keywords should be an array of strings";
var conflictingName = "%s is also the name of a node core module.";
var nonStringDescription = "'description' field should be a string";
var missingDescription = "No description";
var missingReadme = "No README data";
var missingLicense = "No license field.";
var nonEmailUrlBugsString = "Bug string field must be url, email, or {email,url}";
var nonUrlBugsUrlField = "bugs.url field must be a string url. Deleted.";
var nonEmailBugsEmailField = "bugs.email field must be a string email. Deleted.";
var emptyNormalizedBugs = "Normalized value of bugs field is an empty object. Deleted.";
var nonUrlHomepage = "homepage field must be a string url. Deleted.";
var invalidLicense = "license should be a valid SPDX license expression";
var missingProtocolHomepage = "homepage field must start with a protocol.";
var typo = "%s should probably be %s.";
var warning_messages = {
	repositories: repositories,
	missingRepository: missingRepository,
	brokenGitUrl: brokenGitUrl,
	nonObjectScripts: nonObjectScripts,
	nonStringScript: nonStringScript,
	nonArrayFiles: nonArrayFiles,
	invalidFilename: invalidFilename,
	nonArrayBundleDependencies: nonArrayBundleDependencies,
	nonStringBundleDependency: nonStringBundleDependency,
	nonDependencyBundleDependency: nonDependencyBundleDependency,
	nonObjectDependencies: nonObjectDependencies,
	nonStringDependency: nonStringDependency,
	deprecatedArrayDependencies: deprecatedArrayDependencies,
	deprecatedModules: deprecatedModules,
	nonArrayKeywords: nonArrayKeywords,
	nonStringKeyword: nonStringKeyword,
	conflictingName: conflictingName,
	nonStringDescription: nonStringDescription,
	missingDescription: missingDescription,
	missingReadme: missingReadme,
	missingLicense: missingLicense,
	nonEmailUrlBugsString: nonEmailUrlBugsString,
	nonUrlBugsUrlField: nonUrlBugsUrlField,
	nonEmailBugsEmailField: nonEmailBugsEmailField,
	emptyNormalizedBugs: emptyNormalizedBugs,
	nonUrlHomepage: nonUrlHomepage,
	invalidLicense: invalidLicense,
	missingProtocolHomepage: missingProtocolHomepage,
	typo: typo
};

var warning_messages$1 = Object.freeze({
	repositories: repositories,
	missingRepository: missingRepository,
	brokenGitUrl: brokenGitUrl,
	nonObjectScripts: nonObjectScripts,
	nonStringScript: nonStringScript,
	nonArrayFiles: nonArrayFiles,
	invalidFilename: invalidFilename,
	nonArrayBundleDependencies: nonArrayBundleDependencies,
	nonStringBundleDependency: nonStringBundleDependency,
	nonDependencyBundleDependency: nonDependencyBundleDependency,
	nonObjectDependencies: nonObjectDependencies,
	nonStringDependency: nonStringDependency,
	deprecatedArrayDependencies: deprecatedArrayDependencies,
	deprecatedModules: deprecatedModules,
	nonArrayKeywords: nonArrayKeywords,
	nonStringKeyword: nonStringKeyword,
	conflictingName: conflictingName,
	nonStringDescription: nonStringDescription,
	missingDescription: missingDescription,
	missingReadme: missingReadme,
	missingLicense: missingLicense,
	nonEmailUrlBugsString: nonEmailUrlBugsString,
	nonUrlBugsUrlField: nonUrlBugsUrlField,
	nonEmailBugsEmailField: nonEmailBugsEmailField,
	emptyNormalizedBugs: emptyNormalizedBugs,
	nonUrlHomepage: nonUrlHomepage,
	invalidLicense: invalidLicense,
	missingProtocolHomepage: missingProtocolHomepage,
	typo: typo,
	default: warning_messages
});

var messages = ( warning_messages$1 && warning_messages ) || warning_messages$1;

var make_warning = function() {
  var args = Array.prototype.slice.call(arguments, 0);
  var warningName = args.shift();
  if (warningName == "typo") {
    return makeTypoWarning.apply(null,args)
  }
  else {
    var msgTemplate = messages[warningName] ? messages[warningName] : warningName + ": '%s'";
    args.unshift(msgTemplate);
    return util.format.apply(null, args)
  }
};

function makeTypoWarning (providedName, probableName, field) {
  if (field) {
    providedName = field + "['" + providedName + "']";
    probableName = field + "['" + probableName + "']";
  }
  return util.format(messages.typo, providedName, probableName)
}

var normalize_1 = normalize;


normalize.fixer = fixer_1;



var fieldsToFix = ['name','version','description','repository','modules','scripts'
                  ,'files','bin','man','bugs','keywords','readme','homepage','license'];
var otherThingsToFix = ['dependencies','people', 'typos'];

var thingsToFix = fieldsToFix.map(function(fieldName) {
  return ucFirst(fieldName) + "Field"
});
// two ways to do this in CoffeeScript on only one line, sub-70 chars:
// thingsToFix = fieldsToFix.map (name) -> ucFirst(name) + "Field"
// thingsToFix = (ucFirst(name) + "Field" for name in fieldsToFix)
thingsToFix = thingsToFix.concat(otherThingsToFix);

function normalize (data, warn, strict) {
  if(warn === true) warn = null, strict = true;
  if(!strict) strict = false;
  if(!warn || data.private) warn = function(msg) { /* noop */ };

  if (data.scripts &&
      data.scripts.install === "node-gyp rebuild" &&
      !data.scripts.preinstall) {
    data.gypfile = true;
  }
  fixer_1.warn = function() { warn(make_warning.apply(null, arguments)); };
  thingsToFix.forEach(function(thingName) {
    fixer_1["fix" + ucFirst(thingName)](data, strict);
  });
  data._id = data.name + "@" + data.version;
}

function ucFirst (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

var readPkg = createCommonjsModule(function (module) {
'use strict';




module.exports = (fp, opts) => {
	if (typeof fp !== 'string') {
		opts = fp;
		fp = '.';
	}

	opts = opts || {};

	return pathType.dir(fp)
		.then(isDir => {
			if (isDir) {
				fp = path.join(fp, 'package.json');
			}

			return loadJsonFile(fp);
		})
		.then(x => {
			if (opts.normalize !== false) {
				normalize_1(x);
			}

			return x;
		});
};

module.exports.sync = (fp, opts) => {
	if (typeof fp !== 'string') {
		opts = fp;
		fp = '.';
	}

	opts = opts || {};
	fp = pathType.dirSync(fp) ? path.join(fp, 'package.json') : fp;

	const x = loadJsonFile.sync(fp);

	if (opts.normalize !== false) {
		normalize_1(x);
	}

	return x;
};
});

var readPkgUp = createCommonjsModule(function (module) {
'use strict';



module.exports = opts => {
	return findUp('package.json', opts).then(fp => {
		if (!fp) {
			return {};
		}

		return readPkg(fp, opts).then(pkg => ({pkg, path: fp}));
	});
};

module.exports.sync = opts => {
	const fp = findUp.sync('package.json', opts);

	if (!fp) {
		return {};
	}

	return {
		pkg: readPkg.sync(fp, opts),
		path: fp
	};
};
});

function concat$2(parts) {
  return { type: "concat", parts };
}

function indent$2(contents) {
  return { type: "indent", contents };
}

function align$1(n, contents) {
  return { type: "align", contents, n };
}

function group$1(contents, opts) {
  opts = opts || {};

  return {
    type: "group",
    contents: contents,
    break: !!opts.shouldBreak,
    expandedStates: opts.expandedStates
  };
}

function dedentToRoot(contents) {
  return align$1(-Infinity, contents);
}

function markAsRoot(contents) {
  return align$1(Infinity, contents);
}

function conditionalGroup$1(states, opts) {
  return group$1(
    states[0],
    Object.assign(opts || {}, { expandedStates: states })
  );
}

function fill$1(parts) {
  return { type: "fill", parts };
}

function ifBreak$1(breakContents, flatContents) {
  return { type: "if-break", breakContents, flatContents };
}

function lineSuffix$1(contents) {
  return { type: "line-suffix", contents };
}

const lineSuffixBoundary$1 = { type: "line-suffix-boundary" };
const breakParent$2 = { type: "break-parent" };
const line$1 = { type: "line" };
const softline$1 = { type: "line", soft: true };
const hardline$2 = concat$2([{ type: "line", hard: true }, breakParent$2]);
const literalline$1 = concat$2([
  { type: "line", hard: true, literal: true },
  breakParent$2
]);
const cursor$1 = { type: "cursor", placeholder: Symbol("cursor") };

function join$2(sep, arr) {
  const res = [];

  for (let i = 0; i < arr.length; i++) {
    if (i !== 0) {
      res.push(sep);
    }

    res.push(arr[i]);
  }

  return concat$2(res);
}

function addAlignmentToDoc$1(doc, size, tabWidth) {
  let aligned = doc;
  if (size > 0) {
    // Use indent to add tabs for all the levels of tabs we need
    for (let i = 0; i < Math.floor(size / tabWidth); ++i) {
      aligned = indent$2(aligned);
    }
    // Use align for all the spaces that are needed
    aligned = align$1(size % tabWidth, aligned);
    // size is absolute from 0 and not relative to the current
    // indentation, so we use -Infinity to reset the indentation to 0
    aligned = align$1(-Infinity, aligned);
  }
  return aligned;
}

var docBuilders$2 = {
  concat: concat$2,
  join: join$2,
  line: line$1,
  softline: softline$1,
  hardline: hardline$2,
  literalline: literalline$1,
  group: group$1,
  conditionalGroup: conditionalGroup$1,
  fill: fill$1,
  lineSuffix: lineSuffix$1,
  lineSuffixBoundary: lineSuffixBoundary$1,
  cursor: cursor$1,
  breakParent: breakParent$2,
  ifBreak: ifBreak$1,
  indent: indent$2,
  align: align$1,
  addAlignmentToDoc: addAlignmentToDoc$1,
  markAsRoot,
  dedentToRoot
};

const concat$3 = docBuilders$2.concat;
const fill$2 = docBuilders$2.fill;
const cursor$2 = docBuilders$2.cursor;

const MODE_BREAK = 1;
const MODE_FLAT = 2;

function rootIndent() {
  return {
    length: 0,
    value: ""
  };
}

function makeIndent(ind, options) {
  return {
    length: ind.length + options.tabWidth,
    value: ind.value + (options.useTabs ? "\t" : " ".repeat(options.tabWidth)),
    root: ind.root
  };
}

function makeAlign(ind, n, options) {
  return n === -Infinity
    ? ind.root ? ind.root : rootIndent()
    : n === Infinity
      ? {
          length: ind.length,
          value: ind.value,
          root: ind
        }
      : typeof n === "string"
        ? {
            length: ind.length + n.length,
            value: ind.value + n,
            root: ind.root
          }
        : options.useTabs && n > 0
          ? makeIndent(ind, options)
          : {
              length: ind.length + n,
              value: ind.value + " ".repeat(n),
              root: ind.root
            };
}

function fits(next, restCommands, width, options, mustBeFlat) {
  let restIdx = restCommands.length;
  const cmds = [next];
  while (width >= 0) {
    if (cmds.length === 0) {
      if (restIdx === 0) {
        return true;
      }
      cmds.push(restCommands[restIdx - 1]);

      restIdx--;

      continue;
    }

    const x = cmds.pop();
    const ind = x[0];
    const mode = x[1];
    const doc = x[2];

    if (typeof doc === "string") {
      width -= util$1.getStringWidth(doc);
    } else {
      switch (doc.type) {
        case "concat":
          for (let i = doc.parts.length - 1; i >= 0; i--) {
            cmds.push([ind, mode, doc.parts[i]]);
          }

          break;
        case "indent":
          cmds.push([makeIndent(ind, options), mode, doc.contents]);

          break;
        case "align":
          cmds.push([makeAlign(ind, doc.n, options), mode, doc.contents]);

          break;
        case "group":
          if (mustBeFlat && doc.break) {
            return false;
          }
          cmds.push([ind, doc.break ? MODE_BREAK : mode, doc.contents]);

          break;
        case "fill":
          for (let i = doc.parts.length - 1; i >= 0; i--) {
            cmds.push([ind, mode, doc.parts[i]]);
          }

          break;
        case "if-break":
          if (mode === MODE_BREAK) {
            if (doc.breakContents) {
              cmds.push([ind, mode, doc.breakContents]);
            }
          }
          if (mode === MODE_FLAT) {
            if (doc.flatContents) {
              cmds.push([ind, mode, doc.flatContents]);
            }
          }

          break;
        case "line":
          switch (mode) {
            // fallthrough
            case MODE_FLAT:
              if (!doc.hard) {
                if (!doc.soft) {
                  width -= 1;
                }

                break;
              }
              return true;

            case MODE_BREAK:
              return true;
          }
          break;
      }
    }
  }
  return false;
}

function printDocToString$1(doc, options) {
  const width = options.printWidth;
  const newLine = options.newLine || "\n";
  let pos = 0;
  // cmds is basically a stack. We've turned a recursive call into a
  // while loop which is much faster. The while loop below adds new
  // cmds to the array instead of recursively calling `print`.
  const cmds = [[rootIndent(), MODE_BREAK, doc]];
  const out = [];
  let shouldRemeasure = false;
  let lineSuffix = [];

  while (cmds.length !== 0) {
    const x = cmds.pop();
    const ind = x[0];
    const mode = x[1];
    const doc = x[2];

    if (typeof doc === "string") {
      out.push(doc);

      pos += util$1.getStringWidth(doc);
    } else {
      switch (doc.type) {
        case "cursor":
          out.push(cursor$2.placeholder);

          break;
        case "concat":
          for (let i = doc.parts.length - 1; i >= 0; i--) {
            cmds.push([ind, mode, doc.parts[i]]);
          }

          break;
        case "indent":
          cmds.push([makeIndent(ind, options), mode, doc.contents]);

          break;
        case "align":
          cmds.push([makeAlign(ind, doc.n, options), mode, doc.contents]);

          break;
        case "group":
          switch (mode) {
            case MODE_FLAT:
              if (!shouldRemeasure) {
                cmds.push([
                  ind,
                  doc.break ? MODE_BREAK : MODE_FLAT,
                  doc.contents
                ]);

                break;
              }
            // fallthrough

            case MODE_BREAK: {
              shouldRemeasure = false;

              const next = [ind, MODE_FLAT, doc.contents];
              const rem = width - pos;

              if (!doc.break && fits(next, cmds, rem, options)) {
                cmds.push(next);
              } else {
                // Expanded states are a rare case where a document
                // can manually provide multiple representations of
                // itself. It provides an array of documents
                // going from the least expanded (most flattened)
                // representation first to the most expanded. If a
                // group has these, we need to manually go through
                // these states and find the first one that fits.
                if (doc.expandedStates) {
                  const mostExpanded =
                    doc.expandedStates[doc.expandedStates.length - 1];

                  if (doc.break) {
                    cmds.push([ind, MODE_BREAK, mostExpanded]);

                    break;
                  } else {
                    for (let i = 1; i < doc.expandedStates.length + 1; i++) {
                      if (i >= doc.expandedStates.length) {
                        cmds.push([ind, MODE_BREAK, mostExpanded]);

                        break;
                      } else {
                        const state = doc.expandedStates[i];
                        const cmd = [ind, MODE_FLAT, state];

                        if (fits(cmd, cmds, rem, options)) {
                          cmds.push(cmd);

                          break;
                        }
                      }
                    }
                  }
                } else {
                  cmds.push([ind, MODE_BREAK, doc.contents]);
                }
              }

              break;
            }
          }
          break;
        // Fills each line with as much code as possible before moving to a new
        // line with the same indentation.
        //
        // Expects doc.parts to be an array of alternating content and
        // whitespace. The whitespace contains the linebreaks.
        //
        // For example:
        //   ["I", line, "love", line, "monkeys"]
        // or
        //   [{ type: group, ... }, softline, { type: group, ... }]
        //
        // It uses this parts structure to handle three main layout cases:
        // * The first two content items fit on the same line without
        //   breaking
        //   -> output the first content item and the whitespace "flat".
        // * Only the first content item fits on the line without breaking
        //   -> output the first content item "flat" and the whitespace with
        //   "break".
        // * Neither content item fits on the line without breaking
        //   -> output the first content item and the whitespace with "break".
        case "fill": {
          const rem = width - pos;

          const parts = doc.parts;
          if (parts.length === 0) {
            break;
          }

          const content = parts[0];
          const contentFlatCmd = [ind, MODE_FLAT, content];
          const contentBreakCmd = [ind, MODE_BREAK, content];
          const contentFits = fits(contentFlatCmd, [], rem, options, true);

          if (parts.length === 1) {
            if (contentFits) {
              cmds.push(contentFlatCmd);
            } else {
              cmds.push(contentBreakCmd);
            }
            break;
          }

          const whitespace = parts[1];
          const whitespaceFlatCmd = [ind, MODE_FLAT, whitespace];
          const whitespaceBreakCmd = [ind, MODE_BREAK, whitespace];

          if (parts.length === 2) {
            if (contentFits) {
              cmds.push(whitespaceFlatCmd);
              cmds.push(contentFlatCmd);
            } else {
              cmds.push(whitespaceBreakCmd);
              cmds.push(contentBreakCmd);
            }
            break;
          }

          // At this point we've handled the first pair (context, separator)
          // and will create a new fill doc for the rest of the content.
          // Ideally we wouldn't mutate the array here but coping all the
          // elements to a new array would make this algorithm quadratic,
          // which is unusable for large arrays (e.g. large texts in JSX).
          parts.splice(0, 2);
          const remainingCmd = [ind, mode, fill$2(parts)];

          const secondContent = parts[0];

          const firstAndSecondContentFlatCmd = [
            ind,
            MODE_FLAT,
            concat$3([content, whitespace, secondContent])
          ];
          const firstAndSecondContentFits = fits(
            firstAndSecondContentFlatCmd,
            [],
            rem,
            options,
            true
          );

          if (firstAndSecondContentFits) {
            cmds.push(remainingCmd);
            cmds.push(whitespaceFlatCmd);
            cmds.push(contentFlatCmd);
          } else if (contentFits) {
            cmds.push(remainingCmd);
            cmds.push(whitespaceBreakCmd);
            cmds.push(contentFlatCmd);
          } else {
            cmds.push(remainingCmd);
            cmds.push(whitespaceBreakCmd);
            cmds.push(contentBreakCmd);
          }
          break;
        }
        case "if-break":
          if (mode === MODE_BREAK) {
            if (doc.breakContents) {
              cmds.push([ind, mode, doc.breakContents]);
            }
          }
          if (mode === MODE_FLAT) {
            if (doc.flatContents) {
              cmds.push([ind, mode, doc.flatContents]);
            }
          }

          break;
        case "line-suffix":
          lineSuffix.push([ind, mode, doc.contents]);
          break;
        case "line-suffix-boundary":
          if (lineSuffix.length > 0) {
            cmds.push([ind, mode, { type: "line", hard: true }]);
          }
          break;
        case "line":
          switch (mode) {
            case MODE_FLAT:
              if (!doc.hard) {
                if (!doc.soft) {
                  out.push(" ");

                  pos += 1;
                }

                break;
              } else {
                // This line was forced into the output even if we
                // were in flattened mode, so we need to tell the next
                // group that no matter what, it needs to remeasure
                // because the previous measurement didn't accurately
                // capture the entire expression (this is necessary
                // for nested groups)
                shouldRemeasure = true;
              }
            // fallthrough

            case MODE_BREAK:
              if (lineSuffix.length) {
                cmds.push([ind, mode, doc]);
                [].push.apply(cmds, lineSuffix.reverse());
                lineSuffix = [];
                break;
              }

              if (doc.literal) {
                if (ind.root) {
                  out.push(newLine, ind.root.value);
                  pos = ind.root.length;
                } else {
                  out.push(newLine);
                  pos = 0;
                }
              } else {
                if (out.length > 0) {
                  // Trim whitespace at the end of line
                  while (
                    out.length > 0 &&
                    out[out.length - 1].match(/^[^\S\n]*$/)
                  ) {
                    out.pop();
                  }

                  if (
                    out.length &&
                    (options.parser !== "markdown" ||
                      // preserve markdown's `break` node (two trailing spaces)
                      !/\S {2}$/.test(out[out.length - 1]))
                  ) {
                    out[out.length - 1] = out[out.length - 1].replace(
                      /[^\S\n]*$/,
                      ""
                    );
                  }
                }

                out.push(newLine + ind.value);
                pos = ind.length;
              }
              break;
          }
          break;
        default:
      }
    }
  }

  const cursorPlaceholderIndex = out.indexOf(cursor$2.placeholder);
  if (cursorPlaceholderIndex !== -1) {
    const beforeCursor = out.slice(0, cursorPlaceholderIndex).join("");
    const afterCursor = out.slice(cursorPlaceholderIndex + 1).join("");

    return {
      formatted: beforeCursor + afterCursor,
      cursor: beforeCursor.length
    };
  }

  return { formatted: out.join("") };
}

var docPrinter = { printDocToString: printDocToString$1 };

function traverseDoc(doc, onEnter, onExit, shouldTraverseConditionalGroups) {
  function traverseDocRec(doc) {
    let shouldRecurse = true;
    if (onEnter) {
      if (onEnter(doc) === false) {
        shouldRecurse = false;
      }
    }

    if (shouldRecurse) {
      if (doc.type === "concat" || doc.type === "fill") {
        for (let i = 0; i < doc.parts.length; i++) {
          traverseDocRec(doc.parts[i]);
        }
      } else if (doc.type === "if-break") {
        if (doc.breakContents) {
          traverseDocRec(doc.breakContents);
        }
        if (doc.flatContents) {
          traverseDocRec(doc.flatContents);
        }
      } else if (doc.type === "group" && doc.expandedStates) {
        if (shouldTraverseConditionalGroups) {
          doc.expandedStates.forEach(traverseDocRec);
        } else {
          traverseDocRec(doc.contents);
        }
      } else if (doc.contents) {
        traverseDocRec(doc.contents);
      }
    }

    if (onExit) {
      onExit(doc);
    }
  }

  traverseDocRec(doc);
}

function mapDoc$1(doc, func) {
  doc = func(doc);

  if (doc.type === "concat" || doc.type === "fill") {
    return Object.assign({}, doc, {
      parts: doc.parts.map(d => mapDoc$1(d, func))
    });
  } else if (doc.type === "if-break") {
    return Object.assign({}, doc, {
      breakContents: doc.breakContents && mapDoc$1(doc.breakContents, func),
      flatContents: doc.flatContents && mapDoc$1(doc.flatContents, func)
    });
  } else if (doc.contents) {
    return Object.assign({}, doc, { contents: mapDoc$1(doc.contents, func) });
  }
  return doc;
}

function findInDoc(doc, fn, defaultValue) {
  let result = defaultValue;
  let hasStopped = false;
  traverseDoc(doc, doc => {
    const maybeResult = fn(doc);
    if (maybeResult !== undefined) {
      hasStopped = true;
      result = maybeResult;
    }
    if (hasStopped) {
      return false;
    }
  });
  return result;
}

function isEmpty$1(n) {
  return typeof n === "string" && n.length === 0;
}

function isLineNext$1(doc) {
  return findInDoc(
    doc,
    doc => {
      if (typeof doc === "string") {
        return false;
      }
      if (doc.type === "line") {
        return true;
      }
    },
    false
  );
}

function willBreak$1(doc) {
  return findInDoc(
    doc,
    doc => {
      if (doc.type === "group" && doc.break) {
        return true;
      }
      if (doc.type === "line" && doc.hard) {
        return true;
      }
      if (doc.type === "break-parent") {
        return true;
      }
    },
    false
  );
}

function breakParentGroup(groupStack) {
  if (groupStack.length > 0) {
    const parentGroup = groupStack[groupStack.length - 1];
    // Breaks are not propagated through conditional groups because
    // the user is expected to manually handle what breaks.
    if (!parentGroup.expandedStates) {
      parentGroup.break = true;
    }
  }
  return null;
}

function propagateBreaks(doc) {
  const alreadyVisited = new Map();
  const groupStack = [];
  traverseDoc(
    doc,
    doc => {
      if (doc.type === "break-parent") {
        breakParentGroup(groupStack);
      }
      if (doc.type === "group") {
        groupStack.push(doc);
        if (alreadyVisited.has(doc)) {
          return false;
        }
        alreadyVisited.set(doc, true);
      }
    },
    doc => {
      if (doc.type === "group") {
        const group = groupStack.pop();
        if (group.break) {
          breakParentGroup(groupStack);
        }
      }
    },
    /* shouldTraverseConditionalGroups */ true
  );
}

function removeLines(doc) {
  // Force this doc into flat mode by statically converting all
  // lines into spaces (or soft lines into nothing). Hard lines
  // should still output because there's too great of a chance
  // of breaking existing assumptions otherwise.
  return mapDoc$1(doc, d => {
    if (d.type === "line" && !d.hard) {
      return d.soft ? "" : " ";
    } else if (d.type === "if-break") {
      return d.flatContents || "";
    }
    return d;
  });
}

function stripTrailingHardline(doc) {
  // HACK remove ending hardline, original PR: #1984
  if (
    doc.type === "concat" &&
    doc.parts.length === 2 &&
    doc.parts[1].type === "concat" &&
    doc.parts[1].parts.length === 2 &&
    doc.parts[1].parts[0].hard &&
    doc.parts[1].parts[1].type === "break-parent"
  ) {
    return doc.parts[0];
  }
  return doc;
}

function rawText$1(node) {
  return node.extra ? node.extra.raw : node.raw;
}

var docUtils$1 = {
  isEmpty: isEmpty$1,
  willBreak: willBreak$1,
  isLineNext: isLineNext$1,
  traverseDoc,
  mapDoc: mapDoc$1,
  propagateBreaks,
  removeLines,
  stripTrailingHardline,
  rawText: rawText$1
};

function flattenDoc(doc) {
  if (doc.type === "concat") {
    const res = [];

    for (let i = 0; i < doc.parts.length; ++i) {
      const doc2 = doc.parts[i];
      if (typeof doc2 !== "string" && doc2.type === "concat") {
        [].push.apply(res, flattenDoc(doc2).parts);
      } else {
        const flattened = flattenDoc(doc2);
        if (flattened !== "") {
          res.push(flattened);
        }
      }
    }

    return Object.assign({}, doc, { parts: res });
  } else if (doc.type === "if-break") {
    return Object.assign({}, doc, {
      breakContents:
        doc.breakContents != null ? flattenDoc(doc.breakContents) : null,
      flatContents:
        doc.flatContents != null ? flattenDoc(doc.flatContents) : null
    });
  } else if (doc.type === "group") {
    return Object.assign({}, doc, {
      contents: flattenDoc(doc.contents),
      expandedStates: doc.expandedStates
        ? doc.expandedStates.map(flattenDoc)
        : doc.expandedStates
    });
  } else if (doc.contents) {
    return Object.assign({}, doc, { contents: flattenDoc(doc.contents) });
  }
  return doc;
}

function printDoc(doc) {
  if (typeof doc === "string") {
    return JSON.stringify(doc);
  }

  if (doc.type === "line") {
    if (doc.literalline) {
      return "literalline";
    }
    if (doc.hard) {
      return "hardline";
    }
    if (doc.soft) {
      return "softline";
    }
    return "line";
  }

  if (doc.type === "break-parent") {
    return "breakParent";
  }

  if (doc.type === "concat") {
    return "[" + doc.parts.map(printDoc).join(", ") + "]";
  }

  if (doc.type === "indent") {
    return "indent(" + printDoc(doc.contents) + ")";
  }

  if (doc.type === "align") {
    return doc.n === -Infinity
      ? "dedentToRoot(" + printDoc(doc.contents) + ")"
      : doc.n === Infinity
        ? "markAsRoot(" + printDoc(doc.contents) + ")"
        : "align(" +
          JSON.stringify(doc.n) +
          ", " +
          printDoc(doc.contents) +
          ")";
  }

  if (doc.type === "if-break") {
    return (
      "ifBreak(" +
      printDoc(doc.breakContents) +
      (doc.flatContents ? ", " + printDoc(doc.flatContents) : "") +
      ")"
    );
  }

  if (doc.type === "group") {
    if (doc.expandedStates) {
      return (
        "conditionalGroup(" +
        "[" +
        doc.expandedStates.map(printDoc).join(",") +
        "])"
      );
    }

    return (
      (doc.break ? "wrappedGroup" : "group") +
      "(" +
      printDoc(doc.contents) +
      ")"
    );
  }

  if (doc.type === "fill") {
    return "fill" + "(" + doc.parts.map(printDoc).join(", ") + ")";
  }

  if (doc.type === "line-suffix") {
    return "lineSuffix(" + printDoc(doc.contents) + ")";
  }

  if (doc.type === "line-suffix-boundary") {
    return "lineSuffixBoundary";
  }

  throw new Error("Unknown doc type " + doc.type);
}

var docDebug = {
  printDocToDebug: function(doc) {
    return printDoc(flattenDoc(doc));
  }
};

var doc = {
  builders: docBuilders$2,
  printer: docPrinter,
  utils: docUtils$1,
  debug: docDebug
};

const docBuilders$1 = doc.builders;
const concat$1 = docBuilders$1.concat;
const hardline$1 = docBuilders$1.hardline;
const breakParent$1 = docBuilders$1.breakParent;
const indent$1 = docBuilders$1.indent;
const lineSuffix = docBuilders$1.lineSuffix;
const join$1 = docBuilders$1.join;
const cursor = docBuilders$1.cursor;

const childNodesCacheKey = Symbol("child-nodes");
const locStart$1 = util$1.locStart;
const locEnd$1 = util$1.locEnd;
const getNextNonSpaceNonCommentCharacter$1 =
  util$1.getNextNonSpaceNonCommentCharacter;
const getNextNonSpaceNonCommentCharacterIndex$1 =
  util$1.getNextNonSpaceNonCommentCharacterIndex;

function getSortedChildNodes(node, text, options, resultArray) {
  if (!node) {
    return;
  }
  const printer = options.printer;

  if (resultArray) {
    if (node && printer.canAttachComment && printer.canAttachComment(node)) {
      // This reverse insertion sort almost always takes constant
      // time because we almost always (maybe always?) append the
      // nodes in order anyway.
      let i;
      for (i = resultArray.length - 1; i >= 0; --i) {
        if (
          locStart$1(resultArray[i]) <= locStart$1(node) &&
          locEnd$1(resultArray[i]) <= locEnd$1(node)
        ) {
          break;
        }
      }
      resultArray.splice(i + 1, 0, node);
      return;
    }
  } else if (node[childNodesCacheKey]) {
    return node[childNodesCacheKey];
  }

  let childNodes;

  if (printer.getCommentChildNodes) {
    childNodes = printer.getCommentChildNodes(node);
  } else if (node && typeof node === "object") {
    childNodes = Object.keys(node)
      .filter(
        n =>
          n !== "enclosingNode" &&
          n !== "precedingNode" &&
          n !== "followingNode"
      )
      .map(n => node[n]);
  }

  if (!childNodes) {
    return;
  }

  if (!resultArray) {
    Object.defineProperty(node, childNodesCacheKey, {
      value: (resultArray = []),
      enumerable: false
    });
  }

  childNodes.forEach(childNode => {
    getSortedChildNodes(childNode, text, options, resultArray);
  });

  return resultArray;
}

// As efficiently as possible, decorate the comment object with
// .precedingNode, .enclosingNode, and/or .followingNode properties, at
// least one of which is guaranteed to be defined.
function decorateComment(node, comment, text, options) {
  const childNodes = getSortedChildNodes(node, text, options);
  let precedingNode;
  let followingNode;
  // Time to dust off the old binary search robes and wizard hat.
  let left = 0;
  let right = childNodes.length;
  while (left < right) {
    const middle = (left + right) >> 1;
    const child = childNodes[middle];

    if (
      locStart$1(child) - locStart$1(comment) <= 0 &&
      locEnd$1(comment) - locEnd$1(child) <= 0
    ) {
      // The comment is completely contained by this child node.
      comment.enclosingNode = child;

      decorateComment(child, comment, text, options);
      return; // Abandon the binary search at this level.
    }

    if (locEnd$1(child) - locStart$1(comment) <= 0) {
      // This child node falls completely before the comment.
      // Because we will never consider this node or any nodes
      // before it again, this node must be the closest preceding
      // node we have encountered so far.
      precedingNode = child;
      left = middle + 1;
      continue;
    }

    if (locEnd$1(comment) - locStart$1(child) <= 0) {
      // This child node falls completely after the comment.
      // Because we will never consider this node or any nodes after
      // it again, this node must be the closest following node we
      // have encountered so far.
      followingNode = child;
      right = middle;
      continue;
    }

    /* istanbul ignore next */
    throw new Error("Comment location overlaps with node location");
  }

  // We don't want comments inside of different expressions inside of the same
  // template literal to move to another expression.
  if (
    comment.enclosingNode &&
    comment.enclosingNode.type === "TemplateLiteral"
  ) {
    const quasis = comment.enclosingNode.quasis;
    const commentIndex = findExpressionIndexForComment(quasis, comment);

    if (
      precedingNode &&
      findExpressionIndexForComment(quasis, precedingNode) !== commentIndex
    ) {
      precedingNode = null;
    }
    if (
      followingNode &&
      findExpressionIndexForComment(quasis, followingNode) !== commentIndex
    ) {
      followingNode = null;
    }
  }

  if (precedingNode) {
    comment.precedingNode = precedingNode;
  }

  if (followingNode) {
    comment.followingNode = followingNode;
  }
}

function attach(comments, ast, text, options) {
  if (!Array.isArray(comments)) {
    return;
  }

  const tiesToBreak = [];

  comments.forEach((comment, i) => {
    if (options.parser === "json" && locStart$1(comment) - locStart$1(ast) <= 0) {
      addLeadingComment(ast, comment);
      return;
    }

    decorateComment(ast, comment, text, options);

    const precedingNode = comment.precedingNode;
    const enclosingNode = comment.enclosingNode;
    const followingNode = comment.followingNode;

    const isLastComment = comments.length - 1 === i;

    if (util$1.hasNewline(text, locStart$1(comment), { backwards: true })) {
      // If a comment exists on its own line, prefer a leading comment.
      // We also need to check if it's the first line of the file.
      if (
        handleLastFunctionArgComments(
          text,
          precedingNode,
          enclosingNode,
          followingNode,
          comment
        ) ||
        handleMemberExpressionComments(enclosingNode, followingNode, comment) ||
        handleIfStatementComments(
          text,
          precedingNode,
          enclosingNode,
          followingNode,
          comment
        ) ||
        handleTryStatementComments(enclosingNode, followingNode, comment) ||
        handleClassComments(
          enclosingNode,
          precedingNode,
          followingNode,
          comment
        ) ||
        handleImportSpecifierComments(enclosingNode, comment) ||
        handleForComments(enclosingNode, precedingNode, comment) ||
        handleUnionTypeComments(
          precedingNode,
          enclosingNode,
          followingNode,
          comment
        ) ||
        handleOnlyComments(enclosingNode, ast, comment, isLastComment) ||
        handleImportDeclarationComments(
          text,
          enclosingNode,
          precedingNode,
          comment
        ) ||
        handleAssignmentPatternComments(enclosingNode, comment) ||
        handleMethodNameComments(text, enclosingNode, precedingNode, comment)
      ) {
        // We're good
      } else if (followingNode) {
        // Always a leading comment.
        addLeadingComment(followingNode, comment);
      } else if (precedingNode) {
        addTrailingComment(precedingNode, comment);
      } else if (enclosingNode) {
        addDanglingComment(enclosingNode, comment);
      } else {
        // There are no nodes, let's attach it to the root of the ast
        /* istanbul ignore next */
        addDanglingComment(ast, comment);
      }
    } else if (util$1.hasNewline(text, locEnd$1(comment))) {
      if (
        handleLastFunctionArgComments(
          text,
          precedingNode,
          enclosingNode,
          followingNode,
          comment
        ) ||
        handleConditionalExpressionComments(
          enclosingNode,
          precedingNode,
          followingNode,
          comment,
          text
        ) ||
        handleImportSpecifierComments(enclosingNode, comment) ||
        handleIfStatementComments(
          text,
          precedingNode,
          enclosingNode,
          followingNode,
          comment
        ) ||
        handleClassComments(
          enclosingNode,
          precedingNode,
          followingNode,
          comment
        ) ||
        handleLabeledStatementComments(enclosingNode, comment) ||
        handleCallExpressionComments(precedingNode, enclosingNode, comment) ||
        handlePropertyComments(enclosingNode, comment) ||
        handleExportNamedDeclarationComments(enclosingNode, comment) ||
        handleOnlyComments(enclosingNode, ast, comment, isLastComment) ||
        handleTypeAliasComments(enclosingNode, followingNode, comment) ||
        handleVariableDeclaratorComments(enclosingNode, followingNode, comment)
      ) {
        // We're good
      } else if (precedingNode) {
        // There is content before this comment on the same line, but
        // none after it, so prefer a trailing comment of the previous node.
        addTrailingComment(precedingNode, comment);
      } else if (followingNode) {
        addLeadingComment(followingNode, comment);
      } else if (enclosingNode) {
        addDanglingComment(enclosingNode, comment);
      } else {
        // There are no nodes, let's attach it to the root of the ast
        /* istanbul ignore next */
        addDanglingComment(ast, comment);
      }
    } else {
      if (
        handleIfStatementComments(
          text,
          precedingNode,
          enclosingNode,
          followingNode,
          comment
        ) ||
        handleObjectPropertyAssignment(enclosingNode, precedingNode, comment) ||
        handleCommentInEmptyParens(text, enclosingNode, comment) ||
        handleMethodNameComments(text, enclosingNode, precedingNode, comment) ||
        handleOnlyComments(enclosingNode, ast, comment, isLastComment) ||
        handleCommentAfterArrowParams(text, enclosingNode, comment) ||
        handleFunctionNameComments(text, enclosingNode, precedingNode, comment)
      ) {
        // We're good
      } else if (precedingNode && followingNode) {
        // Otherwise, text exists both before and after the comment on
        // the same line. If there is both a preceding and following
        // node, use a tie-breaking algorithm to determine if it should
        // be attached to the next or previous node. In the last case,
        // simply attach the right node;
        const tieCount = tiesToBreak.length;
        if (tieCount > 0) {
          const lastTie = tiesToBreak[tieCount - 1];
          if (lastTie.followingNode !== comment.followingNode) {
            breakTies(tiesToBreak, text);
          }
        }
        tiesToBreak.push(comment);
      } else if (precedingNode) {
        addTrailingComment(precedingNode, comment);
      } else if (followingNode) {
        addLeadingComment(followingNode, comment);
      } else if (enclosingNode) {
        addDanglingComment(enclosingNode, comment);
      } else {
        // There are no nodes, let's attach it to the root of the ast
        /* istanbul ignore next */
        addDanglingComment(ast, comment);
      }
    }
  });

  breakTies(tiesToBreak, text);

  comments.forEach(comment => {
    // These node references were useful for breaking ties, but we
    // don't need them anymore, and they create cycles in the AST that
    // may lead to infinite recursion if we don't delete them here.
    delete comment.precedingNode;
    delete comment.enclosingNode;
    delete comment.followingNode;
  });
}

function breakTies(tiesToBreak, text) {
  const tieCount = tiesToBreak.length;
  if (tieCount === 0) {
    return;
  }

  const precedingNode = tiesToBreak[0].precedingNode;
  const followingNode = tiesToBreak[0].followingNode;
  let gapEndPos = locStart$1(followingNode);

  // Iterate backwards through tiesToBreak, examining the gaps
  // between the tied comments. In order to qualify as leading, a
  // comment must be separated from followingNode by an unbroken series of
  // gaps (or other comments). Gaps should only contain whitespace or open
  // parentheses.
  let indexOfFirstLeadingComment;
  for (
    indexOfFirstLeadingComment = tieCount;
    indexOfFirstLeadingComment > 0;
    --indexOfFirstLeadingComment
  ) {
    const comment = tiesToBreak[indexOfFirstLeadingComment - 1];
    assert.strictEqual(comment.precedingNode, precedingNode);
    assert.strictEqual(comment.followingNode, followingNode);

    const gap = text.slice(locEnd$1(comment), gapEndPos).trim();
    if (gap === "" || /^\(+$/.test(gap)) {
      gapEndPos = locStart$1(comment);
    } else {
      // The gap string contained something other than whitespace or open
      // parentheses.
      break;
    }
  }

  tiesToBreak.forEach((comment, i) => {
    if (i < indexOfFirstLeadingComment) {
      addTrailingComment(precedingNode, comment);
    } else {
      addLeadingComment(followingNode, comment);
    }
  });

  tiesToBreak.length = 0;
}

function addCommentHelper(node, comment) {
  const comments = node.comments || (node.comments = []);
  comments.push(comment);
  comment.printed = false;

  // For some reason, TypeScript parses `// x` inside of JSXText as a comment
  // We already "print" it via the raw text, we don't need to re-print it as a
  // comment
  if (node.type === "JSXText") {
    comment.printed = true;
  }
}

function addLeadingComment(node, comment) {
  comment.leading = true;
  comment.trailing = false;
  addCommentHelper(node, comment);
}

function addDanglingComment(node, comment) {
  comment.leading = false;
  comment.trailing = false;
  addCommentHelper(node, comment);
}

function addTrailingComment(node, comment) {
  comment.leading = false;
  comment.trailing = true;
  addCommentHelper(node, comment);
}

function addBlockStatementFirstComment(node, comment) {
  const body = node.body.filter(n => n.type !== "EmptyStatement");
  if (body.length === 0) {
    addDanglingComment(node, comment);
  } else {
    addLeadingComment(body[0], comment);
  }
}

function addBlockOrNotComment(node, comment) {
  if (node.type === "BlockStatement") {
    addBlockStatementFirstComment(node, comment);
  } else {
    addLeadingComment(node, comment);
  }
}

// There are often comments before the else clause of if statements like
//
//   if (1) { ... }
//   // comment
//   else { ... }
//
// They are being attached as leading comments of the BlockExpression which
// is not well printed. What we want is to instead move the comment inside
// of the block and make it leadingComment of the first element of the block
// or dangling comment of the block if there is nothing inside
//
//   if (1) { ... }
//   else {
//     // comment
//     ...
//   }
function handleIfStatementComments(
  text,
  precedingNode,
  enclosingNode,
  followingNode,
  comment
) {
  if (
    !enclosingNode ||
    enclosingNode.type !== "IfStatement" ||
    !followingNode
  ) {
    return false;
  }

  // We unfortunately have no way using the AST or location of nodes to know
  // if the comment is positioned before the condition parenthesis:
  //   if (a /* comment */) {}
  // The only workaround I found is to look at the next character to see if
  // it is a ).
  const nextCharacter = getNextNonSpaceNonCommentCharacter$1(text, comment);
  if (nextCharacter === ")") {
    addTrailingComment(precedingNode, comment);
    return true;
  }

  if (followingNode.type === "BlockStatement") {
    addBlockStatementFirstComment(followingNode, comment);
    return true;
  }

  if (followingNode.type === "IfStatement") {
    addBlockOrNotComment(followingNode.consequent, comment);
    return true;
  }

  // For comments positioned after the condition parenthesis in an if statement
  // before the consequent with or without brackets on, such as
  // if (a) /* comment */ {} or if (a) /* comment */ true,
  // we look at the next character to see if it is a { or if the following node
  // is the consequent for the if statement
  if (nextCharacter === "{" || enclosingNode.consequent === followingNode) {
    addLeadingComment(followingNode, comment);
    return true;
  }

  return false;
}

// Same as IfStatement but for TryStatement
function handleTryStatementComments(enclosingNode, followingNode, comment) {
  if (
    !enclosingNode ||
    enclosingNode.type !== "TryStatement" ||
    !followingNode
  ) {
    return false;
  }

  if (followingNode.type === "BlockStatement") {
    addBlockStatementFirstComment(followingNode, comment);
    return true;
  }

  if (followingNode.type === "TryStatement") {
    addBlockOrNotComment(followingNode.finalizer, comment);
    return true;
  }

  if (followingNode.type === "CatchClause") {
    addBlockOrNotComment(followingNode.body, comment);
    return true;
  }

  return false;
}

function handleMemberExpressionComments(enclosingNode, followingNode, comment) {
  if (
    enclosingNode &&
    enclosingNode.type === "MemberExpression" &&
    followingNode &&
    followingNode.type === "Identifier"
  ) {
    addLeadingComment(enclosingNode, comment);
    return true;
  }

  return false;
}

function handleConditionalExpressionComments(
  enclosingNode,
  precedingNode,
  followingNode,
  comment,
  text
) {
  const isSameLineAsPrecedingNode =
    precedingNode &&
    !util$1.hasNewlineInRange(text, locEnd$1(precedingNode), locStart$1(comment));

  if (
    (!precedingNode || !isSameLineAsPrecedingNode) &&
    enclosingNode &&
    enclosingNode.type === "ConditionalExpression" &&
    followingNode
  ) {
    addLeadingComment(followingNode, comment);
    return true;
  }
  return false;
}

function handleObjectPropertyAssignment(enclosingNode, precedingNode, comment) {
  if (
    enclosingNode &&
    (enclosingNode.type === "ObjectProperty" ||
      enclosingNode.type === "Property") &&
    enclosingNode.shorthand &&
    enclosingNode.key === precedingNode &&
    enclosingNode.value.type === "AssignmentPattern"
  ) {
    addTrailingComment(enclosingNode.value.left, comment);
    return true;
  }
  return false;
}

function handleClassComments(
  enclosingNode,
  precedingNode,
  followingNode,
  comment
) {
  if (
    enclosingNode &&
    (enclosingNode.type === "ClassDeclaration" ||
      enclosingNode.type === "ClassExpression") &&
    (enclosingNode.decorators && enclosingNode.decorators.length > 0) &&
    !(followingNode && followingNode.type === "Decorator")
  ) {
    if (!enclosingNode.decorators || enclosingNode.decorators.length === 0) {
      addLeadingComment(enclosingNode, comment);
    } else {
      addTrailingComment(
        enclosingNode.decorators[enclosingNode.decorators.length - 1],
        comment
      );
    }
    return true;
  }
  return false;
}

function handleMethodNameComments(text, enclosingNode, precedingNode, comment) {
  // This is only needed for estree parsers (flow, typescript) to attach
  // after a method name:
  // obj = { fn /*comment*/() {} };
  if (
    enclosingNode &&
    precedingNode &&
    (enclosingNode.type === "Property" ||
      enclosingNode.type === "MethodDefinition") &&
    precedingNode.type === "Identifier" &&
    enclosingNode.key === precedingNode &&
    // special Property case: { key: /*comment*/(value) };
    // comment should be attached to value instead of key
    getNextNonSpaceNonCommentCharacter$1(text, precedingNode) !== ":"
  ) {
    addTrailingComment(precedingNode, comment);
    return true;
  }

  // Print comments between decorators and class methods as a trailing comment
  // on the decorator node instead of the method node
  if (
    precedingNode &&
    enclosingNode &&
    precedingNode.type === "Decorator" &&
    (enclosingNode.type === "ClassMethod" ||
      enclosingNode.type === "ClassProperty" ||
      enclosingNode.type === "TSAbstractClassProperty" ||
      enclosingNode.type === "TSAbstractMethodDefinition" ||
      enclosingNode.type === "MethodDefinition")
  ) {
    addTrailingComment(precedingNode, comment);
    return true;
  }

  return false;
}

function handleFunctionNameComments(
  text,
  enclosingNode,
  precedingNode,
  comment
) {
  if (getNextNonSpaceNonCommentCharacter$1(text, comment) !== "(") {
    return false;
  }

  if (
    precedingNode &&
    enclosingNode &&
    (enclosingNode.type === "FunctionDeclaration" ||
      enclosingNode.type === "FunctionExpression" ||
      enclosingNode.type === "ClassMethod" ||
      enclosingNode.type === "MethodDefinition" ||
      enclosingNode.type === "ObjectMethod")
  ) {
    addTrailingComment(precedingNode, comment);
    return true;
  }
  return false;
}

function handleCommentAfterArrowParams(text, enclosingNode, comment) {
  if (!(enclosingNode && enclosingNode.type === "ArrowFunctionExpression")) {
    return false;
  }

  const index = getNextNonSpaceNonCommentCharacterIndex$1(text, comment);
  if (text.substr(index, 2) === "=>") {
    addDanglingComment(enclosingNode, comment);
    return true;
  }

  return false;
}

function handleCommentInEmptyParens(text, enclosingNode, comment) {
  if (getNextNonSpaceNonCommentCharacter$1(text, comment) !== ")") {
    return false;
  }

  // Only add dangling comments to fix the case when no params are present,
  // i.e. a function without any argument.
  if (
    enclosingNode &&
    (((enclosingNode.type === "FunctionDeclaration" ||
      enclosingNode.type === "FunctionExpression" ||
      (enclosingNode.type === "ArrowFunctionExpression" &&
        (enclosingNode.body.type !== "CallExpression" ||
          enclosingNode.body.arguments.length === 0)) ||
      enclosingNode.type === "ClassMethod" ||
      enclosingNode.type === "ObjectMethod") &&
      enclosingNode.params.length === 0) ||
      (enclosingNode.type === "CallExpression" &&
        enclosingNode.arguments.length === 0))
  ) {
    addDanglingComment(enclosingNode, comment);
    return true;
  }
  if (
    enclosingNode &&
    (enclosingNode.type === "MethodDefinition" &&
      enclosingNode.value.params.length === 0)
  ) {
    addDanglingComment(enclosingNode.value, comment);
    return true;
  }
  return false;
}

function handleLastFunctionArgComments(
  text,
  precedingNode,
  enclosingNode,
  followingNode,
  comment
) {
  // Type definitions functions
  if (
    precedingNode &&
    precedingNode.type === "FunctionTypeParam" &&
    enclosingNode &&
    enclosingNode.type === "FunctionTypeAnnotation" &&
    followingNode &&
    followingNode.type !== "FunctionTypeParam"
  ) {
    addTrailingComment(precedingNode, comment);
    return true;
  }

  // Real functions
  if (
    precedingNode &&
    (precedingNode.type === "Identifier" ||
      precedingNode.type === "AssignmentPattern") &&
    enclosingNode &&
    (enclosingNode.type === "ArrowFunctionExpression" ||
      enclosingNode.type === "FunctionExpression" ||
      enclosingNode.type === "FunctionDeclaration" ||
      enclosingNode.type === "ObjectMethod" ||
      enclosingNode.type === "ClassMethod") &&
    getNextNonSpaceNonCommentCharacter$1(text, comment) === ")"
  ) {
    addTrailingComment(precedingNode, comment);
    return true;
  }
  return false;
}

function handleImportSpecifierComments(enclosingNode, comment) {
  if (enclosingNode && enclosingNode.type === "ImportSpecifier") {
    addLeadingComment(enclosingNode, comment);
    return true;
  }
  return false;
}

function handleLabeledStatementComments(enclosingNode, comment) {
  if (enclosingNode && enclosingNode.type === "LabeledStatement") {
    addLeadingComment(enclosingNode, comment);
    return true;
  }
  return false;
}

function handleCallExpressionComments(precedingNode, enclosingNode, comment) {
  if (
    enclosingNode &&
    enclosingNode.type === "CallExpression" &&
    precedingNode &&
    enclosingNode.callee === precedingNode &&
    enclosingNode.arguments.length > 0
  ) {
    addLeadingComment(enclosingNode.arguments[0], comment);
    return true;
  }
  return false;
}

function handleUnionTypeComments(
  precedingNode,
  enclosingNode,
  followingNode,
  comment
) {
  if (
    enclosingNode &&
    (enclosingNode.type === "UnionTypeAnnotation" ||
      enclosingNode.type === "TSUnionType")
  ) {
    addTrailingComment(precedingNode, comment);
    return true;
  }
  return false;
}

function handlePropertyComments(enclosingNode, comment) {
  if (
    enclosingNode &&
    (enclosingNode.type === "Property" ||
      enclosingNode.type === "ObjectProperty")
  ) {
    addLeadingComment(enclosingNode, comment);
    return true;
  }
  return false;
}

function handleExportNamedDeclarationComments(enclosingNode, comment) {
  if (enclosingNode && enclosingNode.type === "ExportNamedDeclaration") {
    addLeadingComment(enclosingNode, comment);
    return true;
  }
  return false;
}

function handleOnlyComments(enclosingNode, ast, comment, isLastComment) {
  // With Flow the enclosingNode is undefined so use the AST instead.
  if (ast && ast.body && ast.body.length === 0) {
    if (isLastComment) {
      addDanglingComment(ast, comment);
    } else {
      addLeadingComment(ast, comment);
    }
    return true;
  } else if (
    enclosingNode &&
    enclosingNode.type === "Program" &&
    enclosingNode.body.length === 0 &&
    enclosingNode.directives &&
    enclosingNode.directives.length === 0
  ) {
    if (isLastComment) {
      addDanglingComment(enclosingNode, comment);
    } else {
      addLeadingComment(enclosingNode, comment);
    }
    return true;
  }
  return false;
}

function handleForComments(enclosingNode, precedingNode, comment) {
  if (
    enclosingNode &&
    (enclosingNode.type === "ForInStatement" ||
      enclosingNode.type === "ForOfStatement")
  ) {
    addLeadingComment(enclosingNode, comment);
    return true;
  }
  return false;
}

function handleImportDeclarationComments(
  text,
  enclosingNode,
  precedingNode,
  comment
) {
  if (
    precedingNode &&
    enclosingNode &&
    enclosingNode.type === "ImportDeclaration" &&
    util$1.hasNewline(text, util$1.locEnd(comment))
  ) {
    addTrailingComment(precedingNode, comment);
    return true;
  }
  return false;
}

function handleAssignmentPatternComments(enclosingNode, comment) {
  if (enclosingNode && enclosingNode.type === "AssignmentPattern") {
    addLeadingComment(enclosingNode, comment);
    return true;
  }
  return false;
}

function handleTypeAliasComments(enclosingNode, followingNode, comment) {
  if (enclosingNode && enclosingNode.type === "TypeAlias") {
    addLeadingComment(enclosingNode, comment);
    return true;
  }
  return false;
}

function handleVariableDeclaratorComments(
  enclosingNode,
  followingNode,
  comment
) {
  if (
    enclosingNode &&
    enclosingNode.type === "VariableDeclarator" &&
    followingNode &&
    (followingNode.type === "ObjectExpression" ||
      followingNode.type === "ArrayExpression")
  ) {
    addLeadingComment(followingNode, comment);
    return true;
  }
  return false;
}

function printComment$1(commentPath, options) {
  const comment = commentPath.getValue();
  comment.printed = true;
  return options.printer.printComment(commentPath, options);
}

function findExpressionIndexForComment(quasis, comment) {
  const startPos = locStart$1(comment) - 1;

  for (let i = 1; i < quasis.length; ++i) {
    if (startPos < getQuasiRange(quasis[i]).start) {
      return i - 1;
    }
  }

  // We haven't found it, it probably means that some of the locations are off.
  // Let's just return the first one.
  /* istanbul ignore next */
  return 0;
}

function getQuasiRange(expr) {
  if (expr.start !== undefined) {
    // Babylon
    return { start: expr.start, end: expr.end };
  }
  // Flow
  return { start: expr.range[0], end: expr.range[1] };
}

function printLeadingComment(commentPath, print, options) {
  const comment = commentPath.getValue();
  const contents = printComment$1(commentPath, options);
  if (!contents) {
    return "";
  }
  const isBlock = util$1.isBlockComment(comment);

  // Leading block comments should see if they need to stay on the
  // same line or not.
  if (isBlock) {
    return concat$1([
      contents,
      util$1.hasNewline(options.originalText, locEnd$1(comment)) ? hardline$1 : " "
    ]);
  }

  return concat$1([contents, hardline$1]);
}

function printTrailingComment(commentPath, print, options) {
  const comment = commentPath.getValue();
  const contents = printComment$1(commentPath, options);
  if (!contents) {
    return "";
  }
  const isBlock = util$1.isBlockComment(comment);

  // We don't want the line to break
  // when the parentParentNode is a ClassDeclaration/-Expression
  // And the parentNode is in the superClass property
  const parentNode = commentPath.getNode(1);
  const parentParentNode = commentPath.getNode(2);
  const isParentSuperClass =
    parentParentNode &&
    (parentParentNode.type === "ClassDeclaration" ||
      parentParentNode.type === "ClassExpression") &&
    parentParentNode.superClass === parentNode;

  if (
    util$1.hasNewline(options.originalText, locStart$1(comment), {
      backwards: true
    })
  ) {
    // This allows comments at the end of nested structures:
    // {
    //   x: 1,
    //   y: 2
    //   // A comment
    // }
    // Those kinds of comments are almost always leading comments, but
    // here it doesn't go "outside" the block and turns it into a
    // trailing comment for `2`. We can simulate the above by checking
    // if this a comment on its own line; normal trailing comments are
    // always at the end of another expression.

    const isLineBeforeEmpty = util$1.isPreviousLineEmpty(
      options.originalText,
      comment
    );

    return lineSuffix(
      concat$1([hardline$1, isLineBeforeEmpty ? hardline$1 : "", contents])
    );
  } else if (isBlock || isParentSuperClass) {
    // Trailing block comments never need a newline
    return concat$1([" ", contents]);
  }

  return concat$1([lineSuffix(" " + contents), !isBlock ? breakParent$1 : ""]);
}

function printDanglingComments(path$$1, options, sameIndent, filter) {
  const parts = [];
  const node = path$$1.getValue();

  if (!node || !node.comments) {
    return "";
  }

  path$$1.each(commentPath => {
    const comment = commentPath.getValue();
    if (
      comment &&
      !comment.leading &&
      !comment.trailing &&
      (!filter || filter(comment))
    ) {
      parts.push(printComment$1(commentPath, options));
    }
  }, "comments");

  if (parts.length === 0) {
    return "";
  }

  if (sameIndent) {
    return join$1(hardline$1, parts);
  }
  return indent$1(concat$1([hardline$1, join$1(hardline$1, parts)]));
}

function prependCursorPlaceholder(path$$1, options, printed) {
  if (path$$1.getNode() === options.cursorNode && path$$1.getValue()) {
    return concat$1([cursor, printed]);
  }
  return printed;
}

function printComments(path$$1, print, options, needsSemi) {
  const value = path$$1.getValue();
  const printed = print(path$$1);
  const comments = value && value.comments;

  if (!comments || comments.length === 0) {
    return prependCursorPlaceholder(path$$1, options, printed);
  }

  const leadingParts = [];
  const trailingParts = [needsSemi ? ";" : "", printed];

  path$$1.each(commentPath => {
    const comment = commentPath.getValue();
    const leading = comment.leading;
    const trailing = comment.trailing;

    if (leading) {
      const contents = printLeadingComment(commentPath, print, options);
      if (!contents) {
        return;
      }
      leadingParts.push(contents);

      const text = options.originalText;
      if (util$1.hasNewline(text, util$1.skipNewline(text, util$1.locEnd(comment)))) {
        leadingParts.push(hardline$1);
      }
    } else if (trailing) {
      trailingParts.push(printTrailingComment(commentPath, print, options));
    }
  }, "comments");

  return prependCursorPlaceholder(
    path$$1,
    options,
    concat$1(leadingParts.concat(trailingParts))
  );
}

var comments = {
  attach,
  printComments,
  printDanglingComments,
  getSortedChildNodes
};

var ast = createCommonjsModule(function (module) {
/*
  Copyright (C) 2013 Yusuke Suzuki <utatane.tea@gmail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS 'AS IS'
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

(function () {
    'use strict';

    function isExpression(node) {
        if (node == null) { return false; }
        switch (node.type) {
            case 'ArrayExpression':
            case 'AssignmentExpression':
            case 'BinaryExpression':
            case 'CallExpression':
            case 'ConditionalExpression':
            case 'FunctionExpression':
            case 'Identifier':
            case 'Literal':
            case 'LogicalExpression':
            case 'MemberExpression':
            case 'NewExpression':
            case 'ObjectExpression':
            case 'SequenceExpression':
            case 'ThisExpression':
            case 'UnaryExpression':
            case 'UpdateExpression':
                return true;
        }
        return false;
    }

    function isIterationStatement(node) {
        if (node == null) { return false; }
        switch (node.type) {
            case 'DoWhileStatement':
            case 'ForInStatement':
            case 'ForStatement':
            case 'WhileStatement':
                return true;
        }
        return false;
    }

    function isStatement(node) {
        if (node == null) { return false; }
        switch (node.type) {
            case 'BlockStatement':
            case 'BreakStatement':
            case 'ContinueStatement':
            case 'DebuggerStatement':
            case 'DoWhileStatement':
            case 'EmptyStatement':
            case 'ExpressionStatement':
            case 'ForInStatement':
            case 'ForStatement':
            case 'IfStatement':
            case 'LabeledStatement':
            case 'ReturnStatement':
            case 'SwitchStatement':
            case 'ThrowStatement':
            case 'TryStatement':
            case 'VariableDeclaration':
            case 'WhileStatement':
            case 'WithStatement':
                return true;
        }
        return false;
    }

    function isSourceElement(node) {
      return isStatement(node) || node != null && node.type === 'FunctionDeclaration';
    }

    function trailingStatement(node) {
        switch (node.type) {
        case 'IfStatement':
            if (node.alternate != null) {
                return node.alternate;
            }
            return node.consequent;

        case 'LabeledStatement':
        case 'ForStatement':
        case 'ForInStatement':
        case 'WhileStatement':
        case 'WithStatement':
            return node.body;
        }
        return null;
    }

    function isProblematicIfStatement(node) {
        var current;

        if (node.type !== 'IfStatement') {
            return false;
        }
        if (node.alternate == null) {
            return false;
        }
        current = node.consequent;
        do {
            if (current.type === 'IfStatement') {
                if (current.alternate == null)  {
                    return true;
                }
            }
            current = trailingStatement(current);
        } while (current);

        return false;
    }

    module.exports = {
        isExpression: isExpression,
        isStatement: isStatement,
        isIterationStatement: isIterationStatement,
        isSourceElement: isSourceElement,
        isProblematicIfStatement: isProblematicIfStatement,

        trailingStatement: trailingStatement
    };
}());
/* vim: set sw=4 ts=4 et tw=80 : */
});

var code = createCommonjsModule(function (module) {
/*
  Copyright (C) 2013-2014 Yusuke Suzuki <utatane.tea@gmail.com>
  Copyright (C) 2014 Ivan Nikulin <ifaaan@gmail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

(function () {
    'use strict';

    var ES6Regex, ES5Regex, NON_ASCII_WHITESPACES, IDENTIFIER_START, IDENTIFIER_PART, ch;

    // See `tools/generate-identifier-regex.js`.
    ES5Regex = {
        // ECMAScript 5.1/Unicode v7.0.0 NonAsciiIdentifierStart:
        NonAsciiIdentifierStart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B2\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA7AD\uA7B0\uA7B1\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB5F\uAB64\uAB65\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/,
        // ECMAScript 5.1/Unicode v7.0.0 NonAsciiIdentifierPart:
        NonAsciiIdentifierPart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B2\u08E4-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58\u0C59\u0C60-\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D60-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA69D\uA69F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA7AD\uA7B0\uA7B1\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB5F\uAB64\uAB65\uABC0-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2D\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/
    };

    ES6Regex = {
        // ECMAScript 6/Unicode v7.0.0 NonAsciiIdentifierStart:
        NonAsciiIdentifierStart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B2\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA7AD\uA7B0\uA7B1\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB5F\uAB64\uAB65\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDE00-\uDE11\uDE13-\uDE2B\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF5D-\uDF61]|\uD805[\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDE00-\uDE2F\uDE44\uDE80-\uDEAA]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF98]|\uD809[\uDC00-\uDC6E]|[\uD80C\uD840-\uD868\uD86A-\uD86C][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D]|\uD87E[\uDC00-\uDE1D]/,
        // ECMAScript 6/Unicode v7.0.0 NonAsciiIdentifierPart:
        NonAsciiIdentifierPart: /[\xAA\xB5\xB7\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B2\u08E4-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58\u0C59\u0C60-\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D60-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u1371\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA69D\uA69F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA7AD\uA7B0\uA7B1\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB5F\uAB64\uAB65\uABC0-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2D\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDD0-\uDDDA\uDE00-\uDE11\uDE13-\uDE37\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF01-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9]|\uD806[\uDCA0-\uDCE9\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF98]|\uD809[\uDC00-\uDC6E]|[\uD80C\uD840-\uD868\uD86A-\uD86C][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/
    };

    function isDecimalDigit(ch) {
        return 0x30 <= ch && ch <= 0x39;  // 0..9
    }

    function isHexDigit(ch) {
        return 0x30 <= ch && ch <= 0x39 ||  // 0..9
            0x61 <= ch && ch <= 0x66 ||     // a..f
            0x41 <= ch && ch <= 0x46;       // A..F
    }

    function isOctalDigit(ch) {
        return ch >= 0x30 && ch <= 0x37;  // 0..7
    }

    // 7.2 White Space

    NON_ASCII_WHITESPACES = [
        0x1680, 0x180E,
        0x2000, 0x2001, 0x2002, 0x2003, 0x2004, 0x2005, 0x2006, 0x2007, 0x2008, 0x2009, 0x200A,
        0x202F, 0x205F,
        0x3000,
        0xFEFF
    ];

    function isWhiteSpace(ch) {
        return ch === 0x20 || ch === 0x09 || ch === 0x0B || ch === 0x0C || ch === 0xA0 ||
            ch >= 0x1680 && NON_ASCII_WHITESPACES.indexOf(ch) >= 0;
    }

    // 7.3 Line Terminators

    function isLineTerminator(ch) {
        return ch === 0x0A || ch === 0x0D || ch === 0x2028 || ch === 0x2029;
    }

    // 7.6 Identifier Names and Identifiers

    function fromCodePoint(cp) {
        if (cp <= 0xFFFF) { return String.fromCharCode(cp); }
        var cu1 = String.fromCharCode(Math.floor((cp - 0x10000) / 0x400) + 0xD800);
        var cu2 = String.fromCharCode(((cp - 0x10000) % 0x400) + 0xDC00);
        return cu1 + cu2;
    }

    IDENTIFIER_START = new Array(0x80);
    for(ch = 0; ch < 0x80; ++ch) {
        IDENTIFIER_START[ch] =
            ch >= 0x61 && ch <= 0x7A ||  // a..z
            ch >= 0x41 && ch <= 0x5A ||  // A..Z
            ch === 0x24 || ch === 0x5F;  // $ (dollar) and _ (underscore)
    }

    IDENTIFIER_PART = new Array(0x80);
    for(ch = 0; ch < 0x80; ++ch) {
        IDENTIFIER_PART[ch] =
            ch >= 0x61 && ch <= 0x7A ||  // a..z
            ch >= 0x41 && ch <= 0x5A ||  // A..Z
            ch >= 0x30 && ch <= 0x39 ||  // 0..9
            ch === 0x24 || ch === 0x5F;  // $ (dollar) and _ (underscore)
    }

    function isIdentifierStartES5(ch) {
        return ch < 0x80 ? IDENTIFIER_START[ch] : ES5Regex.NonAsciiIdentifierStart.test(fromCodePoint(ch));
    }

    function isIdentifierPartES5(ch) {
        return ch < 0x80 ? IDENTIFIER_PART[ch] : ES5Regex.NonAsciiIdentifierPart.test(fromCodePoint(ch));
    }

    function isIdentifierStartES6(ch) {
        return ch < 0x80 ? IDENTIFIER_START[ch] : ES6Regex.NonAsciiIdentifierStart.test(fromCodePoint(ch));
    }

    function isIdentifierPartES6(ch) {
        return ch < 0x80 ? IDENTIFIER_PART[ch] : ES6Regex.NonAsciiIdentifierPart.test(fromCodePoint(ch));
    }

    module.exports = {
        isDecimalDigit: isDecimalDigit,
        isHexDigit: isHexDigit,
        isOctalDigit: isOctalDigit,
        isWhiteSpace: isWhiteSpace,
        isLineTerminator: isLineTerminator,
        isIdentifierStartES5: isIdentifierStartES5,
        isIdentifierPartES5: isIdentifierPartES5,
        isIdentifierStartES6: isIdentifierStartES6,
        isIdentifierPartES6: isIdentifierPartES6
    };
}());
/* vim: set sw=4 ts=4 et tw=80 : */
});

var keyword = createCommonjsModule(function (module) {
/*
  Copyright (C) 2013 Yusuke Suzuki <utatane.tea@gmail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

(function () {
    'use strict';

    var code$$1 = code;

    function isStrictModeReservedWordES6(id) {
        switch (id) {
        case 'implements':
        case 'interface':
        case 'package':
        case 'private':
        case 'protected':
        case 'public':
        case 'static':
        case 'let':
            return true;
        default:
            return false;
        }
    }

    function isKeywordES5(id, strict) {
        // yield should not be treated as keyword under non-strict mode.
        if (!strict && id === 'yield') {
            return false;
        }
        return isKeywordES6(id, strict);
    }

    function isKeywordES6(id, strict) {
        if (strict && isStrictModeReservedWordES6(id)) {
            return true;
        }

        switch (id.length) {
        case 2:
            return (id === 'if') || (id === 'in') || (id === 'do');
        case 3:
            return (id === 'var') || (id === 'for') || (id === 'new') || (id === 'try');
        case 4:
            return (id === 'this') || (id === 'else') || (id === 'case') ||
                (id === 'void') || (id === 'with') || (id === 'enum');
        case 5:
            return (id === 'while') || (id === 'break') || (id === 'catch') ||
                (id === 'throw') || (id === 'const') || (id === 'yield') ||
                (id === 'class') || (id === 'super');
        case 6:
            return (id === 'return') || (id === 'typeof') || (id === 'delete') ||
                (id === 'switch') || (id === 'export') || (id === 'import');
        case 7:
            return (id === 'default') || (id === 'finally') || (id === 'extends');
        case 8:
            return (id === 'function') || (id === 'continue') || (id === 'debugger');
        case 10:
            return (id === 'instanceof');
        default:
            return false;
        }
    }

    function isReservedWordES5(id, strict) {
        return id === 'null' || id === 'true' || id === 'false' || isKeywordES5(id, strict);
    }

    function isReservedWordES6(id, strict) {
        return id === 'null' || id === 'true' || id === 'false' || isKeywordES6(id, strict);
    }

    function isRestrictedWord(id) {
        return id === 'eval' || id === 'arguments';
    }

    function isIdentifierNameES5(id) {
        var i, iz, ch;

        if (id.length === 0) { return false; }

        ch = id.charCodeAt(0);
        if (!code$$1.isIdentifierStartES5(ch)) {
            return false;
        }

        for (i = 1, iz = id.length; i < iz; ++i) {
            ch = id.charCodeAt(i);
            if (!code$$1.isIdentifierPartES5(ch)) {
                return false;
            }
        }
        return true;
    }

    function decodeUtf16(lead, trail) {
        return (lead - 0xD800) * 0x400 + (trail - 0xDC00) + 0x10000;
    }

    function isIdentifierNameES6(id) {
        var i, iz, ch, lowCh, check;

        if (id.length === 0) { return false; }

        check = code$$1.isIdentifierStartES6;
        for (i = 0, iz = id.length; i < iz; ++i) {
            ch = id.charCodeAt(i);
            if (0xD800 <= ch && ch <= 0xDBFF) {
                ++i;
                if (i >= iz) { return false; }
                lowCh = id.charCodeAt(i);
                if (!(0xDC00 <= lowCh && lowCh <= 0xDFFF)) {
                    return false;
                }
                ch = decodeUtf16(ch, lowCh);
            }
            if (!check(ch)) {
                return false;
            }
            check = code$$1.isIdentifierPartES6;
        }
        return true;
    }

    function isIdentifierES5(id, strict) {
        return isIdentifierNameES5(id) && !isReservedWordES5(id, strict);
    }

    function isIdentifierES6(id, strict) {
        return isIdentifierNameES6(id) && !isReservedWordES6(id, strict);
    }

    module.exports = {
        isKeywordES5: isKeywordES5,
        isKeywordES6: isKeywordES6,
        isReservedWordES5: isReservedWordES5,
        isReservedWordES6: isReservedWordES6,
        isRestrictedWord: isRestrictedWord,
        isIdentifierNameES5: isIdentifierNameES5,
        isIdentifierNameES6: isIdentifierNameES6,
        isIdentifierES5: isIdentifierES5,
        isIdentifierES6: isIdentifierES6
    };
}());
/* vim: set sw=4 ts=4 et tw=80 : */
});

var utils$2 = createCommonjsModule(function (module, exports) {
/*
  Copyright (C) 2013 Yusuke Suzuki <utatane.tea@gmail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/


(function () {
    'use strict';

    exports.ast = ast;
    exports.code = code;
    exports.keyword = keyword;
}());
/* vim: set sw=4 ts=4 et tw=80 : */
});

const doc$2 = doc;
const docUtils$3 = doc$2.utils;
const docBuilders$5 = doc$2.builders;
const indent$3 = docBuilders$5.indent;
const join$3 = docBuilders$5.join;
const hardline$3 = docBuilders$5.hardline;
const softline$2 = docBuilders$5.softline;
const literalline$2 = docBuilders$5.literalline;
const concat$4 = docBuilders$5.concat;
const dedentToRoot$1 = docBuilders$5.dedentToRoot;

function embed(path$$1, print, textToDoc /*, options */) {
  const node = path$$1.getValue();
  const parent = path$$1.getParentNode();
  const parentParent = path$$1.getParentNode(1);

  switch (node.type) {
    case "TemplateLiteral": {
      const isCss = [isStyledJsx, isStyledComponents, isCssProp].some(isIt =>
        isIt(path$$1)
      );

      if (isCss) {
        // Get full template literal with expressions replaced by placeholders
        const rawQuasis = node.quasis.map(q => q.value.raw);
        const text = rawQuasis.join("@prettier-placeholder");
        const doc$$2 = textToDoc(text, { parser: "css" });
        return transformCssDoc(doc$$2, path$$1, print);
      }

      /*
       * react-relay and graphql-tag
       * graphql`...`
       * graphql.experimental`...`
       * gql`...`
       *
       * This intentionally excludes Relay Classic tags, as Prettier does not
       * support Relay Classic formatting.
       */
      if (
        parent &&
        ((parent.type === "TaggedTemplateExpression" &&
          ((parent.tag.type === "MemberExpression" &&
            parent.tag.object.name === "graphql" &&
            parent.tag.property.name === "experimental") ||
            (parent.tag.type === "Identifier" &&
              (parent.tag.name === "gql" || parent.tag.name === "graphql")))) ||
          (parent.type === "CallExpression" &&
            parent.callee.type === "Identifier" &&
            parent.callee.name === "graphql"))
      ) {
        const expressionDocs = node.expressions
          ? path$$1.map(print, "expressions")
          : [];

        const numQuasis = node.quasis.length;

        if (numQuasis === 1 && node.quasis[0].value.raw.trim() === "") {
          return "``";
        }

        const parts = [];

        for (let i = 0; i < numQuasis; i++) {
          const templateElement = node.quasis[i];
          const isFirst = i === 0;
          const isLast = i === numQuasis - 1;
          const text = templateElement.value.raw;
          const lines = text.split("\n");
          const numLines = lines.length;
          const expressionDoc = expressionDocs[i];

          const startsWithBlankLine =
            numLines > 2 && lines[0].trim() === "" && lines[1].trim() === "";
          const endsWithBlankLine =
            numLines > 2 &&
            lines[numLines - 1].trim() === "" &&
            lines[numLines - 2].trim() === "";

          const commentsAndWhitespaceOnly = lines.every(line =>
            /^\s*(?:#[^\r\n]*)?$/.test(line)
          );

          // Bail out if an interpolation occurs within a comment.
          if (!isLast && /#[^\r\n]*$/.test(lines[numLines - 1])) {
            return null;
          }

          let doc$$2 = null;

          if (commentsAndWhitespaceOnly) {
            doc$$2 = printGraphqlComments(lines);
          } else {
            try {
              doc$$2 = docUtils$3.stripTrailingHardline(
                textToDoc(text, { parser: "graphql" })
              );
            } catch (_error) {
              // Bail if any part fails to parse.
              return null;
            }
          }

          if (doc$$2) {
            if (!isFirst && startsWithBlankLine) {
              parts.push("");
            }
            parts.push(doc$$2);
            if (!isLast && endsWithBlankLine) {
              parts.push("");
            }
          } else if (!isFirst && !isLast && startsWithBlankLine) {
            parts.push("");
          }

          if (expressionDoc) {
            parts.push(concat$4(["${", expressionDoc, "}"]));
          }
        }

        return concat$4([
          "`",
          indent$3(concat$4([hardline$3, join$3(hardline$3, parts)])),
          hardline$3,
          "`"
        ]);
      }

      break;
    }

    case "TemplateElement": {
      /**
       * md`...`
       * markdown`...`
       */
      if (
        parentParent &&
        (parentParent.type === "TaggedTemplateExpression" &&
          parent.quasis.length === 1 &&
          (parentParent.tag.type === "Identifier" &&
            (parentParent.tag.name === "md" ||
              parentParent.tag.name === "markdown")))
      ) {
        const text = parent.quasis[0].value.cooked;
        const indentation = getIndentation(text);
        const hasIndent = indentation !== "";
        return concat$4([
          hasIndent
            ? indent$3(
                concat$4([
                  softline$2,
                  printMarkdown(
                    text.replace(new RegExp(`^${indentation}`, "gm"), "")
                  )
                ])
              )
            : concat$4([literalline$2, dedentToRoot$1(printMarkdown(text))]),
          softline$2
        ]);
      }

      break;
    }
  }

  function printMarkdown(text) {
    const doc$$2 = textToDoc(text, { parser: "markdown", __inJsTemplate: true });
    return docUtils$3.stripTrailingHardline(escapeBackticks(doc$$2));
  }
}

function getIndentation(str) {
  const firstMatchedIndent = str.match(/^([^\S\n]*)\S/m);
  return firstMatchedIndent === null ? "" : firstMatchedIndent[1];
}

function escapeBackticks(doc$$2) {
  return util$1.mapDoc(doc$$2, currentDoc => {
    if (!currentDoc.parts) {
      return currentDoc;
    }

    const parts = [];

    currentDoc.parts.forEach(part => {
      if (typeof part === "string") {
        parts.push(part.replace(/`/g, "\\`"));
      } else {
        parts.push(part);
      }
    });

    return Object.assign({}, currentDoc, { parts });
  });
}

function transformCssDoc(quasisDoc, path$$1, print) {
  const parentNode = path$$1.getValue();

  const isEmpty =
    parentNode.quasis.length === 1 && !parentNode.quasis[0].value.raw.trim();
  if (isEmpty) {
    return "``";
  }

  const expressionDocs = parentNode.expressions
    ? path$$1.map(print, "expressions")
    : [];
  const newDoc = replacePlaceholders(quasisDoc, expressionDocs);
  /* istanbul ignore if */
  if (!newDoc) {
    throw new Error("Couldn't insert all the expressions");
  }
  return concat$4([
    "`",
    indent$3(concat$4([hardline$3, docUtils$3.stripTrailingHardline(newDoc)])),
    softline$2,
    "`"
  ]);
}

// Search all the placeholders in the quasisDoc tree
// and replace them with the expression docs one by one
// returns a new doc with all the placeholders replaced,
// or null if it couldn't replace any expression
function replacePlaceholders(quasisDoc, expressionDocs) {
  if (!expressionDocs || !expressionDocs.length) {
    return quasisDoc;
  }

  const expressions = expressionDocs.slice();
  const newDoc = docUtils$3.mapDoc(quasisDoc, doc$$2 => {
    if (!doc$$2 || !doc$$2.parts || !doc$$2.parts.length) {
      return doc$$2;
    }
    let parts = doc$$2.parts;
    const atIndex = parts.indexOf("@");
    const placeholderIndex = atIndex + 1;
    if (
      atIndex > -1 &&
      typeof parts[placeholderIndex] === "string" &&
      parts[placeholderIndex].startsWith("prettier-placeholder")
    ) {
      // If placeholder is split, join it
      const at = parts[atIndex];
      const placeholder = parts[placeholderIndex];
      const rest = parts.slice(placeholderIndex + 1);
      parts = parts
        .slice(0, atIndex)
        .concat([at + placeholder])
        .concat(rest);
    }
    const atPlaceholderIndex = parts.findIndex(
      part =>
        typeof part === "string" && part.startsWith("@prettier-placeholder")
    );
    if (atPlaceholderIndex > -1) {
      const placeholder = parts[atPlaceholderIndex];
      const rest = parts.slice(atPlaceholderIndex + 1);

      // When the expression has a suffix appended, like:
      // animation: linear ${time}s ease-out;
      const suffix = placeholder.slice("@prettier-placeholder".length);

      const expression = expressions.shift();
      parts = parts
        .slice(0, atPlaceholderIndex)
        .concat(["${", expression, "}" + suffix])
        .concat(rest);
    }
    return Object.assign({}, doc$$2, {
      parts: parts
    });
  });

  return expressions.length === 0 ? newDoc : null;
}

function printGraphqlComments(lines) {
  const parts = [];
  let seenComment = false;

  lines.map(textLine => textLine.trim()).forEach((textLine, i, array) => {
    // Lines are either whitespace only, or a comment (with poential whitespace
    // around it). Drop whitespace-only lines.
    if (textLine === "") {
      return;
    }

    if (array[i - 1] === "" && seenComment) {
      // If a non-first comment is preceded by a blank (whitespace only) line,
      // add in a blank line.
      parts.push(concat$4([hardline$3, textLine]));
    } else {
      parts.push(textLine);
    }

    seenComment = true;
  });

  // If `lines` was whitespace only, return `null`.
  return parts.length === 0 ? null : join$3(hardline$3, parts);
}

/**
 * Template literal in this context:
 * <style jsx>{`div{color:red}`}</style>
 */
function isStyledJsx(path$$1) {
  const node = path$$1.getValue();
  const parent = path$$1.getParentNode();
  const parentParent = path$$1.getParentNode(1);
  return (
    parentParent &&
    node.quasis &&
    parent.type === "JSXExpressionContainer" &&
    parentParent.type === "JSXElement" &&
    parentParent.openingElement.name.name === "style" &&
    parentParent.openingElement.attributes.some(
      attribute => attribute.name.name === "jsx"
    )
  );
}

/**
 * styled-components template literals
 */
function isStyledComponents(path$$1) {
  const parent = path$$1.getParentNode();

  if (!parent || parent.type !== "TaggedTemplateExpression") {
    return false;
  }

  const tag = parent.tag;

  switch (tag.type) {
    case "MemberExpression":
      return (
        // styled.foo``
        isStyledIdentifier(tag.object) ||
        // Component.extend``
        (/^[A-Z]/.test(tag.object.name) && tag.property.name === "extend")
      );

    case "CallExpression":
      return (
        // styled(Component)``
        isStyledIdentifier(tag.callee) ||
        (tag.callee.type === "MemberExpression" &&
          // styled.foo.attr({})``
          ((tag.callee.object.type === "MemberExpression" &&
            isStyledIdentifier(tag.callee.object.object)) ||
            // styled(Component).attr({})``
            (tag.callee.object.type === "CallExpression" &&
              isStyledIdentifier(tag.callee.object.callee))))
      );

    case "Identifier":
      // css``
      return tag.name === "css";

    default:
      return false;
  }
}

/**
 * JSX element with CSS prop
 */
function isCssProp(path$$1) {
  const parent = path$$1.getParentNode();
  const parentParent = path$$1.getParentNode(1);
  return (
    parentParent &&
    parent.type === "JSXExpressionContainer" &&
    parentParent.type === "JSXAttribute" &&
    parentParent.name.type === "JSXIdentifier" &&
    parentParent.name.name === "css"
  );
}

function isStyledIdentifier(node) {
  return node.type === "Identifier" && node.name === "styled";
}

var embed_1 = embed;

const CATEGORY_JAVASCRIPT = "JavaScript";

// format based on https://github.com/prettier/prettier/blob/master/src/common/support.js
var options = {
  arrowParens: {
    since: "1.9.0",
    category: CATEGORY_JAVASCRIPT,
    type: "choice",
    default: "avoid",
    description: "Include parentheses around a sole arrow function parameter.",
    choices: [
      {
        value: "avoid",
        description: "Omit parens when possible. Example: `x => x`"
      },
      {
        value: "always",
        description: "Always include parens. Example: `(x) => x`"
      }
    ]
  },
  bracketSpacing: {
    since: "0.0.0",
    category: CATEGORY_JAVASCRIPT,
    type: "boolean",
    default: true,
    description: "Print spaces between brackets.",
    oppositeDescription: "Do not print spaces between brackets."
  },
  jsxBracketSameLine: {
    since: "0.17.0",
    category: CATEGORY_JAVASCRIPT,
    type: "boolean",
    default: false,
    description: "Put > on the last line instead of at a new line."
  },
  semi: {
    since: "1.0.0",
    category: CATEGORY_JAVASCRIPT,
    type: "boolean",
    default: true,
    description: "Print semicolons.",
    oppositeDescription:
      "Do not print semicolons, except at the beginning of lines which may need them."
  },
  singleQuote: {
    since: "0.0.0",
    category: CATEGORY_JAVASCRIPT,
    type: "boolean",
    default: false,
    description: "Use single quotes instead of double quotes."
  },
  trailingComma: {
    since: "0.0.0",
    category: CATEGORY_JAVASCRIPT,
    type: "choice",
    default: [
      { since: "0.0.0", value: false },
      { since: "0.19.0", value: "none" }
    ],
    description: "Print trailing commas wherever possible when multi-line.",
    choices: [
      { value: "none", description: "No trailing commas." },
      {
        value: "es5",
        description:
          "Trailing commas where valid in ES5 (objects, arrays, etc.)"
      },
      {
        value: "all",
        description:
          "Trailing commas wherever possible (including function arguments)."
      },
      { value: true, deprecated: "0.19.0", redirect: "es5" },
      { value: false, deprecated: "0.19.0", redirect: "none" }
    ]
  }
};

function clean(ast, newObj, parent) {
  // We remove extra `;` and add them when needed
  if (ast.type === "EmptyStatement") {
    return null;
  }

  // We move text around, including whitespaces and add {" "}
  if (ast.type === "JSXText") {
    return null;
  }
  if (
    ast.type === "JSXExpressionContainer" &&
    ast.expression.type === "Literal" &&
    ast.expression.value === " "
  ) {
    return null;
  }

  // (TypeScript) Ignore `static` in `constructor(static p) {}`
  // and `export` in `constructor(export p) {}`
  if (
    ast.type === "TSParameterProperty" &&
    ast.accessibility === null &&
    !ast.readonly
  ) {
    return {
      type: "Identifier",
      name: ast.parameter.name,
      typeAnnotation: newObj.parameter.typeAnnotation,
      decorators: newObj.decorators
    };
  }

  // (TypeScript) ignore empty `specifiers` array
  if (
    ast.type === "TSNamespaceExportDeclaration" &&
    ast.specifiers &&
    ast.specifiers.length === 0
  ) {
    delete newObj.specifiers;
  }

  // (TypeScript) bypass TSParenthesizedType
  if (
    ast.type === "TSParenthesizedType" &&
    ast.typeAnnotation.type === "TSTypeAnnotation"
  ) {
    return newObj.typeAnnotation.typeAnnotation;
  }

  // We convert <div></div> to <div />
  if (ast.type === "JSXOpeningElement") {
    delete newObj.selfClosing;
  }
  if (ast.type === "JSXElement") {
    delete newObj.closingElement;
  }

  // We change {'key': value} into {key: value}
  if (
    (ast.type === "Property" ||
      ast.type === "MethodDefinition" ||
      ast.type === "ClassProperty" ||
      ast.type === "TSPropertySignature" ||
      ast.type === "ObjectTypeProperty") &&
    typeof ast.key === "object" &&
    ast.key &&
    (ast.key.type === "Literal" || ast.key.type === "Identifier")
  ) {
    delete newObj.key;
  }

  // Remove raw and cooked values from TemplateElement when it's CSS
  // styled-jsx
  if (
    ast.type === "JSXElement" &&
    ast.openingElement.name.name === "style" &&
    ast.openingElement.attributes.some(attr => attr.name.name === "jsx")
  ) {
    const templateLiterals = newObj.children
      .filter(
        child =>
          child.type === "JSXExpressionContainer" &&
          child.expression.type === "TemplateLiteral"
      )
      .map(container => container.expression);

    const quasis = templateLiterals.reduce(
      (quasis, templateLiteral) => quasis.concat(templateLiteral.quasis),
      []
    );

    quasis.forEach(q => delete q.value);
  }

  // CSS template literals in css prop
  if (
    ast.type === "JSXAttribute" &&
    ast.name.name === "css" &&
    ast.value.type === "JSXExpressionContainer" &&
    ast.value.expression.type === "TemplateLiteral"
  ) {
    newObj.value.expression.quasis.forEach(q => delete q.value);
  }

  // styled-components, graphql, markdown
  if (
    ast.type === "TaggedTemplateExpression" &&
    (ast.tag.type === "MemberExpression" ||
      (ast.tag.type === "Identifier" &&
        (ast.tag.name === "gql" ||
          ast.tag.name === "graphql" ||
          ast.tag.name === "css" ||
          ast.tag.name === "md" ||
          ast.tag.name === "markdown")) ||
      ast.tag.type === "CallExpression")
  ) {
    newObj.quasi.quasis.forEach(quasi => delete quasi.value);
  }
  if (
    ast.type === "TemplateLiteral" &&
    parent.type === "CallExpression" &&
    parent.callee.name === "graphql"
  ) {
    newObj.quasis.forEach(quasi => delete quasi.value);
  }
}

var clean_1 = clean;

// TODO(azz): anything that imports from main shouldn't be in a `language-*` dir.


const isIdentifierName = utils$2.keyword.isIdentifierNameES6;





const docBuilders = doc.builders;
const concat = docBuilders.concat;
const join = docBuilders.join;
const line = docBuilders.line;
const hardline = docBuilders.hardline;
const softline = docBuilders.softline;
const literalline = docBuilders.literalline;
const group = docBuilders.group;
const indent = docBuilders.indent;
const align = docBuilders.align;
const conditionalGroup = docBuilders.conditionalGroup;
const fill = docBuilders.fill;
const ifBreak = docBuilders.ifBreak;
const breakParent = docBuilders.breakParent;
const lineSuffixBoundary = docBuilders.lineSuffixBoundary;
const addAlignmentToDoc = docBuilders.addAlignmentToDoc;

const docUtils = doc.utils;
const willBreak = docUtils.willBreak;
const isLineNext = docUtils.isLineNext;
const isEmpty = docUtils.isEmpty;
const rawText = docUtils.rawText;

function shouldPrintComma(options$$1, level) {
  level = level || "es5";

  switch (options$$1.trailingComma) {
    case "all":
      if (level === "all") {
        return true;
      }
    // fallthrough
    case "es5":
      if (level === "es5") {
        return true;
      }
    // fallthrough
    case "none":
    default:
      return false;
  }
}

function genericPrint(path$$1, options$$1, printPath, args) {
  const node = path$$1.getValue();
  let needsParens = false;
  const linesWithoutParens = printPathNoParens(path$$1, options$$1, printPath, args);

  if (!node || isEmpty(linesWithoutParens)) {
    return linesWithoutParens;
  }

  const decorators = [];
  if (
    node.decorators &&
    node.decorators.length > 0 &&
    // If the parent node is an export declaration, it will be
    // responsible for printing node.decorators.
    !util$1.getParentExportDeclaration(path$$1)
  ) {
    let separator = hardline;
    path$$1.each(decoratorPath => {
      let prefix = "@";
      let decorator = decoratorPath.getValue();
      if (decorator.expression) {
        decorator = decorator.expression;
        prefix = "";
      }

      if (
        node.decorators.length === 1 &&
        node.type !== "ClassDeclaration" &&
        node.type !== "MethodDefinition" &&
        node.type !== "ClassMethod" &&
        (decorator.type === "Identifier" ||
          decorator.type === "MemberExpression" ||
          (decorator.type === "CallExpression" &&
            (decorator.arguments.length === 0 ||
              (decorator.arguments.length === 1 &&
                (isStringLiteral(decorator.arguments[0]) ||
                  decorator.arguments[0].type === "Identifier" ||
                  decorator.arguments[0].type === "MemberExpression")))))
      ) {
        separator = line;
      }

      decorators.push(prefix, printPath(decoratorPath), separator);
    }, "decorators");
  } else if (
    util$1.isExportDeclaration(node) &&
    node.declaration &&
    node.declaration.decorators
  ) {
    // Export declarations are responsible for printing any decorators
    // that logically apply to node.declaration.
    path$$1.each(
      decoratorPath => {
        const decorator = decoratorPath.getValue();
        const prefix = decorator.type === "Decorator" ? "" : "@";
        decorators.push(prefix, printPath(decoratorPath), hardline);
      },
      "declaration",
      "decorators"
    );
  } else {
    // Nodes with decorators can't have parentheses, so we can avoid
    // computing path.needsParens() except in this case.
    needsParens = path$$1.needsParens(options$$1);
  }

  const parts = [];
  if (needsParens) {
    parts.unshift("(");
  }

  parts.push(linesWithoutParens);

  if (needsParens) {
    parts.push(")");
  }

  if (decorators.length > 0) {
    return group(concat(decorators.concat(parts)));
  }
  return concat(parts);
}

function hasPrettierIgnore(path$$1) {
  return util$1.hasIgnoreComment(path$$1) || hasJsxIgnoreComment(path$$1);
}

function hasJsxIgnoreComment(path$$1) {
  const node = path$$1.getValue();
  const parent = path$$1.getParentNode();
  if (!parent || !node || !isJSXNode(node) || !isJSXNode(parent)) {
    return false;
  }

  // Lookup the previous sibling, ignoring any empty JSXText elements
  const index = parent.children.indexOf(node);
  let prevSibling = null;
  for (let i = index; i > 0; i--) {
    const candidate = parent.children[i - 1];
    if (candidate.type === "JSXText" && !isMeaningfulJSXText(candidate)) {
      continue;
    }
    prevSibling = candidate;
    break;
  }

  return (
    prevSibling &&
    prevSibling.type === "JSXExpressionContainer" &&
    prevSibling.expression.type === "JSXEmptyExpression" &&
    prevSibling.expression.comments &&
    prevSibling.expression.comments.find(
      comment => comment.value.trim() === "prettier-ignore"
    )
  );
}

function printPathNoParens(path$$1, options$$1, print, args) {
  const n = path$$1.getValue();
  const semi = options$$1.semi ? ";" : "";

  if (!n) {
    return "";
  }

  if (typeof n === "string") {
    return n;
  }

  let parts = [];
  switch (n.type) {
    case "File":
      return path$$1.call(print, "program");
    case "Program":
      // Babel 6
      if (n.directives) {
        path$$1.each(childPath => {
          parts.push(print(childPath), semi, hardline);
          if (
            util$1.isNextLineEmpty(options$$1.originalText, childPath.getValue())
          ) {
            parts.push(hardline);
          }
        }, "directives");
      }

      parts.push(
        path$$1.call(bodyPath => {
          return printStatementSequence(bodyPath, options$$1, print);
        }, "body")
      );

      parts.push(
        comments.printDanglingComments(path$$1, options$$1, /* sameIndent */ true)
      );

      // Only force a trailing newline if there were any contents.
      if (n.body.length || n.comments) {
        parts.push(hardline);
      }

      return concat(parts);
    // Babel extension.
    case "EmptyStatement":
      return "";
    case "ExpressionStatement":
      // Detect Flow-parsed directives
      if (n.directive) {
        return concat([nodeStr(n.expression, options$$1, true), semi]);
      }
      // Do not append semicolon after the only JSX element in a program
      return concat([
        path$$1.call(print, "expression"),
        isTheOnlyJSXElementInMarkdown(options$$1, path$$1) ? "" : semi
      ]); // Babel extension.
    case "ParenthesizedExpression":
      return concat(["(", path$$1.call(print, "expression"), ")"]);
    case "AssignmentExpression":
      return printAssignment(
        n.left,
        path$$1.call(print, "left"),
        concat([" ", n.operator]),
        n.right,
        path$$1.call(print, "right"),
        options$$1
      );
    case "BinaryExpression":
    case "LogicalExpression": {
      const parent = path$$1.getParentNode();
      const parentParent = path$$1.getParentNode(1);
      const isInsideParenthesis =
        n !== parent.body &&
        (parent.type === "IfStatement" ||
          parent.type === "WhileStatement" ||
          parent.type === "DoWhileStatement");

      const parts = printBinaryishExpressions(
        path$$1,
        print,
        options$$1,
        /* isNested */ false,
        isInsideParenthesis
      );

      //   if (
      //     this.hasPlugin("dynamicImports") && this.lookahead().type === tt.parenLeft
      //   ) {
      //
      // looks super weird, we want to break the children if the parent breaks
      //
      //   if (
      //     this.hasPlugin("dynamicImports") &&
      //     this.lookahead().type === tt.parenLeft
      //   ) {
      if (isInsideParenthesis) {
        return concat(parts);
      }

      // Break between the parens in unaries or in a member expression, i.e.
      //
      //   (
      //     a &&
      //     b &&
      //     c
      //   ).call()
      if (
        parent.type === "UnaryExpression" ||
        (parent.type === "MemberExpression" && !parent.computed)
      ) {
        return group(
          concat([indent(concat([softline, concat(parts)])), softline])
        );
      }

      // Avoid indenting sub-expressions in some cases where the first sub-expression is already
      // indented accordingly. We should indent sub-expressions where the first case isn't indented.
      const shouldNotIndent =
        parent.type === "ReturnStatement" ||
        (parent.type === "JSXExpressionContainer" &&
          parentParent.type === "JSXAttribute") ||
        (n === parent.body && parent.type === "ArrowFunctionExpression") ||
        (n !== parent.body && parent.type === "ForStatement") ||
        (parent.type === "ConditionalExpression" &&
          parentParent.type !== "ReturnStatement");

      const shouldIndentIfInlining =
        parent.type === "AssignmentExpression" ||
        parent.type === "VariableDeclarator" ||
        parent.type === "ObjectProperty" ||
        parent.type === "Property";

      const samePrecedenceSubExpression =
        isBinaryish(n.left) && util$1.shouldFlatten(n.operator, n.left.operator);

      if (
        shouldNotIndent ||
        (shouldInlineLogicalExpression(n) && !samePrecedenceSubExpression) ||
        (!shouldInlineLogicalExpression(n) && shouldIndentIfInlining)
      ) {
        return group(concat(parts));
      }

      const rest = concat(parts.slice(1));

      return group(
        concat([
          // Don't include the initial expression in the indentation
          // level. The first item is guaranteed to be the first
          // left-most expression.
          parts.length > 0 ? parts[0] : "",
          indent(rest)
        ])
      );
    }
    case "AssignmentPattern":
      return concat([
        path$$1.call(print, "left"),
        " = ",
        path$$1.call(print, "right")
      ]);
    case "TSTypeAssertionExpression":
      return concat([
        "<",
        path$$1.call(print, "typeAnnotation"),
        ">",
        path$$1.call(print, "expression")
      ]);
    case "MemberExpression": {
      const parent = path$$1.getParentNode();
      let firstNonMemberParent;
      let i = 0;
      do {
        firstNonMemberParent = path$$1.getParentNode(i);
        i++;
      } while (
        firstNonMemberParent &&
        (firstNonMemberParent.type === "MemberExpression" ||
          firstNonMemberParent.type === "TSNonNullExpression")
      );

      const shouldInline =
        (firstNonMemberParent &&
          (firstNonMemberParent.type === "NewExpression" ||
            (firstNonMemberParent.type === "VariableDeclarator" &&
              firstNonMemberParent.id.type !== "Identifier") ||
            (firstNonMemberParent.type === "AssignmentExpression" &&
              firstNonMemberParent.left.type !== "Identifier"))) ||
        n.computed ||
        (n.object.type === "Identifier" &&
          n.property.type === "Identifier" &&
          parent.type !== "MemberExpression");

      return concat([
        path$$1.call(print, "object"),
        shouldInline
          ? printMemberLookup(path$$1, options$$1, print)
          : group(
              indent(
                concat([softline, printMemberLookup(path$$1, options$$1, print)])
              )
            )
      ]);
    }
    case "MetaProperty":
      return concat([
        path$$1.call(print, "meta"),
        ".",
        path$$1.call(print, "property")
      ]);
    case "BindExpression":
      if (n.object) {
        parts.push(path$$1.call(print, "object"));
      }

      parts.push(printBindExpressionCallee(path$$1, options$$1, print));

      return concat(parts);
    case "Identifier": {
      return concat([
        n.name,
        printOptionalToken(path$$1),
        printTypeAnnotation(path$$1, options$$1, print)
      ]);
    }
    case "SpreadElement":
    case "SpreadElementPattern":
    case "RestProperty":
    case "ExperimentalRestProperty":
    case "ExperimentalSpreadProperty":
    case "SpreadProperty":
    case "SpreadPropertyPattern":
    case "RestElement":
    case "ObjectTypeSpreadProperty":
      return concat([
        "...",
        path$$1.call(print, "argument"),
        printTypeAnnotation(path$$1, options$$1, print)
      ]);
    case "FunctionDeclaration":
    case "FunctionExpression":
      if (isNodeStartingWithDeclare(n, options$$1)) {
        parts.push("declare ");
      }
      parts.push(printFunctionDeclaration(path$$1, print, options$$1));
      if (!n.body) {
        parts.push(semi);
      }
      return concat(parts);
    case "ArrowFunctionExpression": {
      if (n.async) {
        parts.push("async ");
      }

      if (shouldPrintParamsWithoutParens(path$$1, options$$1)) {
        parts.push(path$$1.call(print, "params", 0));
      } else {
        parts.push(
          group(
            concat([
              printFunctionParams(
                path$$1,
                print,
                options$$1,
                /* expandLast */ args &&
                  (args.expandLastArg || args.expandFirstArg),
                /* printTypeParams */ true
              ),
              printReturnType(path$$1, print, options$$1)
            ])
          )
        );
      }

      const dangling = comments.printDanglingComments(
        path$$1,
        options$$1,
        /* sameIndent */ true,
        comment => {
          const nextCharacter = util$1.getNextNonSpaceNonCommentCharacterIndex(
            options$$1.originalText,
            comment
          );
          return options$$1.originalText.substr(nextCharacter, 2) === "=>";
        }
      );
      if (dangling) {
        parts.push(" ", dangling);
      }

      parts.push(" =>");

      const body = path$$1.call(bodyPath => print(bodyPath, args), "body");

      // We want to always keep these types of nodes on the same line
      // as the arrow.
      if (
        !hasLeadingOwnLineComment(options$$1.originalText, n.body) &&
        (n.body.type === "ArrayExpression" ||
          n.body.type === "ObjectExpression" ||
          n.body.type === "BlockStatement" ||
          isJSXNode(n.body) ||
          isTemplateOnItsOwnLine(n.body, options$$1.originalText) ||
          n.body.type === "ArrowFunctionExpression")
      ) {
        return group(concat([concat(parts), " ", body]));
      }

      // We handle sequence expressions as the body of arrows specially,
      // so that the required parentheses end up on their own lines.
      if (n.body.type === "SequenceExpression") {
        return group(
          concat([
            concat(parts),
            group(
              concat([" (", indent(concat([softline, body])), softline, ")"])
            )
          ])
        );
      }

      // if the arrow function is expanded as last argument, we are adding a
      // level of indentation and need to add a softline to align the closing )
      // with the opening (, or if it's inside a JSXExpression (e.g. an attribute)
      // we should align the expression's closing } with the line with the opening {.
      const shouldAddSoftLine =
        ((args && args.expandLastArg) ||
          path$$1.getParentNode().type === "JSXExpressionContainer") &&
        !(n.comments && n.comments.length);

      const printTrailingComma =
        args && args.expandLastArg && shouldPrintComma(options$$1, "all");

      // In order to avoid confusion between
      // a => a ? a : a
      // a <= a ? a : a
      const shouldAddParens =
        n.body.type === "ConditionalExpression" &&
        !util$1.startsWithNoLookaheadToken(
          n.body,
          /* forbidFunctionAndClass */ false
        );

      return group(
        concat([
          concat(parts),
          group(
            concat([
              indent(
                concat([
                  line,
                  shouldAddParens ? ifBreak("", "(") : "",
                  body,
                  shouldAddParens ? ifBreak("", ")") : ""
                ])
              ),
              shouldAddSoftLine
                ? concat([ifBreak(printTrailingComma ? "," : ""), softline])
                : ""
            ])
          )
        ])
      );
    }
    case "MethodDefinition":
    case "TSAbstractMethodDefinition":
      if (n.accessibility) {
        parts.push(n.accessibility + " ");
      }
      if (n.static) {
        parts.push("static ");
      }
      if (n.type === "TSAbstractMethodDefinition") {
        parts.push("abstract ");
      }

      parts.push(printMethod(path$$1, options$$1, print));

      return concat(parts);
    case "YieldExpression":
      parts.push("yield");

      if (n.delegate) {
        parts.push("*");
      }
      if (n.argument) {
        parts.push(" ", path$$1.call(print, "argument"));
      }

      return concat(parts);
    case "AwaitExpression":
      return concat(["await ", path$$1.call(print, "argument")]);
    case "ImportSpecifier":
      if (n.importKind) {
        parts.push(path$$1.call(print, "importKind"), " ");
      }

      parts.push(path$$1.call(print, "imported"));

      if (n.local && n.local.name !== n.imported.name) {
        parts.push(" as ", path$$1.call(print, "local"));
      }

      return concat(parts);
    case "ExportSpecifier":
      parts.push(path$$1.call(print, "local"));

      if (n.exported && n.exported.name !== n.local.name) {
        parts.push(" as ", path$$1.call(print, "exported"));
      }

      return concat(parts);
    case "ImportNamespaceSpecifier":
      parts.push("* as ");

      if (n.local) {
        parts.push(path$$1.call(print, "local"));
      } else if (n.id) {
        parts.push(path$$1.call(print, "id"));
      }

      return concat(parts);
    case "ImportDefaultSpecifier":
      if (n.local) {
        return path$$1.call(print, "local");
      }

      return path$$1.call(print, "id");
    case "TSExportAssignment":
      return concat(["export = ", path$$1.call(print, "expression"), semi]);
    case "ExportDefaultDeclaration":
    case "ExportNamedDeclaration":
      return printExportDeclaration(path$$1, options$$1, print);
    case "ExportAllDeclaration":
      parts.push("export ");

      if (n.exportKind === "type") {
        parts.push("type ");
      }

      parts.push("* from ", path$$1.call(print, "source"), semi);

      return concat(parts);

    case "ExportNamespaceSpecifier":
    case "ExportDefaultSpecifier":
      return path$$1.call(print, "exported");
    case "ImportDeclaration": {
      parts.push("import ");

      if (n.importKind && n.importKind !== "value") {
        parts.push(n.importKind + " ");
      }

      const standalones = [];
      const grouped = [];
      if (n.specifiers && n.specifiers.length > 0) {
        path$$1.each(specifierPath => {
          const value = specifierPath.getValue();
          if (
            value.type === "ImportDefaultSpecifier" ||
            value.type === "ImportNamespaceSpecifier"
          ) {
            standalones.push(print(specifierPath));
          } else {
            grouped.push(print(specifierPath));
          }
        }, "specifiers");

        if (standalones.length > 0) {
          parts.push(join(", ", standalones));
        }

        if (standalones.length > 0 && grouped.length > 0) {
          parts.push(", ");
        }

        if (
          grouped.length === 1 &&
          standalones.length === 0 &&
          n.specifiers &&
          !n.specifiers.some(node => node.comments)
        ) {
          parts.push(
            concat([
              "{",
              options$$1.bracketSpacing ? " " : "",
              concat(grouped),
              options$$1.bracketSpacing ? " " : "",
              "}"
            ])
          );
        } else if (grouped.length >= 1) {
          parts.push(
            group(
              concat([
                "{",
                indent(
                  concat([
                    options$$1.bracketSpacing ? line : softline,
                    join(concat([",", line]), grouped)
                  ])
                ),
                ifBreak(shouldPrintComma(options$$1) ? "," : ""),
                options$$1.bracketSpacing ? line : softline,
                "}"
              ])
            )
          );
        }

        parts.push(" from ");
      } else if (
        (n.importKind && n.importKind === "type") ||
        // import {} from 'x'
        /{\s*}/.test(
          options$$1.originalText.slice(util$1.locStart(n), util$1.locStart(n.source))
        )
      ) {
        parts.push("{} from ");
      }

      parts.push(path$$1.call(print, "source"), semi);

      return concat(parts);
    }

    case "Import":
      return "import";
    case "BlockStatement": {
      const naked = path$$1.call(bodyPath => {
        return printStatementSequence(bodyPath, options$$1, print);
      }, "body");

      const hasContent = n.body.find(node => node.type !== "EmptyStatement");
      const hasDirectives = n.directives && n.directives.length > 0;

      const parent = path$$1.getParentNode();
      const parentParent = path$$1.getParentNode(1);
      if (
        !hasContent &&
        !hasDirectives &&
        !hasDanglingComments(n) &&
        (parent.type === "ArrowFunctionExpression" ||
          parent.type === "FunctionExpression" ||
          parent.type === "FunctionDeclaration" ||
          parent.type === "ObjectMethod" ||
          parent.type === "ClassMethod" ||
          parent.type === "ForStatement" ||
          parent.type === "WhileStatement" ||
          parent.type === "DoWhileStatement" ||
          (parent.type === "CatchClause" && !parentParent.finalizer))
      ) {
        return "{}";
      }

      parts.push("{");

      // Babel 6
      if (hasDirectives) {
        path$$1.each(childPath => {
          parts.push(indent(concat([hardline, print(childPath), semi])));
          if (
            util$1.isNextLineEmpty(options$$1.originalText, childPath.getValue())
          ) {
            parts.push(hardline);
          }
        }, "directives");
      }

      if (hasContent) {
        parts.push(indent(concat([hardline, naked])));
      }

      parts.push(comments.printDanglingComments(path$$1, options$$1));
      parts.push(hardline, "}");

      return concat(parts);
    }
    case "ReturnStatement":
      parts.push("return");

      if (n.argument) {
        if (returnArgumentHasLeadingComment(options$$1, n.argument)) {
          parts.push(
            concat([
              " (",
              indent(concat([softline, path$$1.call(print, "argument")])),
              line,
              ")"
            ])
          );
        } else if (
          n.argument.type === "LogicalExpression" ||
          n.argument.type === "BinaryExpression" ||
          n.argument.type === "SequenceExpression"
        ) {
          parts.push(
            group(
              concat([
                ifBreak(" (", " "),
                indent(concat([softline, path$$1.call(print, "argument")])),
                softline,
                ifBreak(")")
              ])
            )
          );
        } else {
          parts.push(" ", path$$1.call(print, "argument"));
        }
      }

      if (hasDanglingComments(n)) {
        parts.push(
          " ",
          comments.printDanglingComments(path$$1, options$$1, /* sameIndent */ true)
        );
      }

      parts.push(semi);

      return concat(parts);
    case "NewExpression":
    case "CallExpression": {
      const isNew = n.type === "NewExpression";

      const optional = printOptionalToken(path$$1);
      if (
        // We want to keep require calls as a unit
        (!isNew &&
          n.callee.type === "Identifier" &&
          n.callee.name === "require") ||
        n.callee.type === "Import" ||
        // Template literals as single arguments
        (n.arguments.length === 1 &&
          isTemplateOnItsOwnLine(n.arguments[0], options$$1.originalText)) ||
        // Keep test declarations on a single line
        // e.g. `it('long name', () => {`
        (!isNew && isTestCall(n))
      ) {
        return concat([
          isNew ? "new " : "",
          path$$1.call(print, "callee"),
          optional,
          path$$1.call(print, "typeParameters"),
          concat(["(", join(", ", path$$1.map(print, "arguments")), ")"])
        ]);
      }

      // We detect calls on member lookups and possibly print them in a
      // special chain format. See `printMemberChain` for more info.
      if (!isNew && isMemberish(n.callee)) {
        return printMemberChain(path$$1, options$$1, print);
      }

      return concat([
        isNew ? "new " : "",
        path$$1.call(print, "callee"),
        optional,
        printFunctionTypeParameters(path$$1, options$$1, print),
        printArgumentsList(path$$1, options$$1, print)
      ]);
    }
    case "TSInterfaceDeclaration":
      if (isNodeStartingWithDeclare(n, options$$1)) {
        parts.push("declare ");
      }

      parts.push(
        n.abstract ? "abstract " : "",
        printTypeScriptModifiers(path$$1, options$$1, print),
        "interface ",
        path$$1.call(print, "id"),
        n.typeParameters ? path$$1.call(print, "typeParameters") : "",
        " "
      );

      if (n.heritage.length) {
        parts.push(
          group(
            indent(
              concat([
                softline,
                "extends ",
                indent(join(concat([",", line]), path$$1.map(print, "heritage"))),
                " "
              ])
            )
          )
        );
      }

      parts.push(path$$1.call(print, "body"));

      return concat(parts);
    case "ObjectExpression":
    case "ObjectPattern":
    case "ObjectTypeAnnotation":
    case "TSInterfaceBody":
    case "TSTypeLiteral": {
      const isTypeAnnotation = n.type === "ObjectTypeAnnotation";
      const shouldBreak =
        n.type === "TSInterfaceBody" ||
        (n.type !== "ObjectPattern" &&
          util$1.hasNewlineInRange(
            options$$1.originalText,
            util$1.locStart(n),
            util$1.locEnd(n)
          ));
      const parent = path$$1.getParentNode(0);
      const isFlowInterfaceLikeBody =
        isTypeAnnotation &&
        parent &&
        (parent.type === "InterfaceDeclaration" ||
          parent.type === "DeclareInterface" ||
          parent.type === "DeclareClass") &&
        path$$1.getName() === "body";
      const separator = isFlowInterfaceLikeBody
        ? ";"
        : n.type === "TSInterfaceBody" || n.type === "TSTypeLiteral"
          ? ifBreak(semi, ";")
          : ",";
      const fields = [];
      const leftBrace = n.exact ? "{|" : "{";
      const rightBrace = n.exact ? "|}" : "}";

      let propertiesField;

      if (n.type === "TSTypeLiteral") {
        propertiesField = "members";
      } else if (n.type === "TSInterfaceBody") {
        propertiesField = "body";
      } else {
        propertiesField = "properties";
      }

      if (isTypeAnnotation) {
        fields.push("indexers", "callProperties");
      }
      fields.push(propertiesField);

      // Unfortunately, things are grouped together in the ast can be
      // interleaved in the source code. So we need to reorder them before
      // printing them.
      const propsAndLoc = [];
      fields.forEach(field => {
        path$$1.each(childPath => {
          const node = childPath.getValue();
          propsAndLoc.push({
            node: node,
            printed: print(childPath),
            loc: util$1.locStart(node)
          });
        }, field);
      });

      let separatorParts = [];
      const props = propsAndLoc.sort((a, b) => a.loc - b.loc).map(prop => {
        const result = concat(separatorParts.concat(group(prop.printed)));
        separatorParts = [separator, line];
        if (
          prop.node.type === "TSPropertySignature" &&
          util$1.hasNodeIgnoreComment(prop.node)
        ) {
          separatorParts.shift();
        }
        if (util$1.isNextLineEmpty(options$$1.originalText, prop.node)) {
          separatorParts.push(hardline);
        }
        return result;
      });

      const lastElem = util$1.getLast(n[propertiesField]);

      const canHaveTrailingSeparator = !(
        lastElem &&
        (lastElem.type === "RestProperty" ||
          lastElem.type === "RestElement" ||
          lastElem.type === "ExperimentalRestProperty" ||
          util$1.hasNodeIgnoreComment(lastElem))
      );

      let content;
      if (props.length === 0 && !n.typeAnnotation) {
        if (!hasDanglingComments(n)) {
          return concat([leftBrace, rightBrace]);
        }

        content = group(
          concat([
            leftBrace,
            comments.printDanglingComments(path$$1, options$$1),
            softline,
            rightBrace,
            printOptionalToken(path$$1)
          ])
        );
      } else {
        content = concat([
          leftBrace,
          indent(
            concat([options$$1.bracketSpacing ? line : softline, concat(props)])
          ),
          ifBreak(
            canHaveTrailingSeparator &&
            (separator !== "," || shouldPrintComma(options$$1))
              ? separator
              : ""
          ),
          concat([options$$1.bracketSpacing ? line : softline, rightBrace]),
          printOptionalToken(path$$1),
          printTypeAnnotation(path$$1, options$$1, print)
        ]);
      }

      // If we inline the object as first argument of the parent, we don't want
      // to create another group so that the object breaks before the return
      // type
      const parentParentParent = path$$1.getParentNode(2);
      if (
        (n.type === "ObjectPattern" &&
          parent &&
          shouldHugArguments(parent) &&
          parent.params[0] === n) ||
        (shouldHugType(n) &&
          parentParentParent &&
          shouldHugArguments(parentParentParent) &&
          parentParentParent.params[0].typeAnnotation.typeAnnotation === n)
      ) {
        return content;
      }

      return group(content, { shouldBreak });
    }
    // Babel 6
    case "ObjectProperty": // Non-standard AST node type.
    case "Property":
      if (n.method || n.kind === "get" || n.kind === "set") {
        return printMethod(path$$1, options$$1, print);
      }

      if (n.shorthand) {
        parts.push(path$$1.call(print, "value"));
      } else {
        let printedLeft;
        if (n.computed) {
          printedLeft = concat(["[", path$$1.call(print, "key"), "]"]);
        } else {
          printedLeft = printPropertyKey(path$$1, options$$1, print);
        }
        parts.push(
          printAssignment(
            n.key,
            printedLeft,
            ":",
            n.value,
            path$$1.call(print, "value"),
            options$$1
          )
        );
      }

      return concat(parts); // Babel 6
    case "ClassMethod":
      if (n.static) {
        parts.push("static ");
      }

      parts = parts.concat(printObjectMethod(path$$1, options$$1, print));

      return concat(parts); // Babel 6
    case "ObjectMethod":
      return printObjectMethod(path$$1, options$$1, print);
    case "Decorator":
      return concat(["@", path$$1.call(print, "expression")]);
    case "ArrayExpression":
    case "ArrayPattern":
      if (n.elements.length === 0) {
        if (!hasDanglingComments(n)) {
          parts.push("[]");
        } else {
          parts.push(
            group(
              concat([
                "[",
                comments.printDanglingComments(path$$1, options$$1),
                softline,
                "]"
              ])
            )
          );
        }
      } else {
        const lastElem = util$1.getLast(n.elements);
        const canHaveTrailingComma = !(
          lastElem && lastElem.type === "RestElement"
        );

        // JavaScript allows you to have empty elements in an array which
        // changes its length based on the number of commas. The algorithm
        // is that if the last argument is null, we need to force insert
        // a comma to ensure JavaScript recognizes it.
        //   [,].length === 1
        //   [1,].length === 1
        //   [1,,].length === 2
        //
        // Note that util.getLast returns null if the array is empty, but
        // we already check for an empty array just above so we are safe
        const needsForcedTrailingComma =
          canHaveTrailingComma && lastElem === null;

        parts.push(
          group(
            concat([
              "[",
              indent(
                concat([
                  softline,
                  printArrayItems(path$$1, options$$1, "elements", print)
                ])
              ),
              needsForcedTrailingComma ? "," : "",
              ifBreak(
                canHaveTrailingComma &&
                !needsForcedTrailingComma &&
                shouldPrintComma(options$$1)
                  ? ","
                  : ""
              ),
              comments.printDanglingComments(
                path$$1,
                options$$1,
                /* sameIndent */ true
              ),
              softline,
              "]"
            ])
          )
        );
      }

      parts.push(
        printOptionalToken(path$$1),
        printTypeAnnotation(path$$1, options$$1, print)
      );

      return concat(parts);
    case "SequenceExpression": {
      const parent = path$$1.getParentNode(0);
      if (
        parent.type === "ExpressionStatement" ||
        parent.type === "ForStatement"
      ) {
        // For ExpressionStatements and for-loop heads, which are among
        // the few places a SequenceExpression appears unparenthesized, we want
        // to indent expressions after the first.
        const parts = [];
        path$$1.each(p => {
          if (p.getName() === 0) {
            parts.push(print(p));
          } else {
            parts.push(",", indent(concat([line, print(p)])));
          }
        }, "expressions");
        return group(concat(parts));
      }
      return group(
        concat([join(concat([",", line]), path$$1.map(print, "expressions"))])
      );
    }
    case "ThisExpression":
      return "this";
    case "Super":
      return "super";
    case "NullLiteral": // Babel 6 Literal split
      return "null";
    case "RegExpLiteral": // Babel 6 Literal split
      return printRegex(n);
    case "NumericLiteral": // Babel 6 Literal split
      return util$1.printNumber(n.extra.raw);
    case "BooleanLiteral": // Babel 6 Literal split
    case "StringLiteral": // Babel 6 Literal split
    case "Literal": {
      if (n.regex) {
        return printRegex(n.regex);
      }
      if (typeof n.value === "number") {
        return util$1.printNumber(n.raw);
      }
      if (typeof n.value !== "string") {
        return "" + n.value;
      }
      // TypeScript workaround for eslint/typescript-eslint-parser#267
      // See corresponding workaround in fast-path.js needsParens()
      const grandParent = path$$1.getParentNode(1);
      const isTypeScriptDirective =
        options$$1.parser === "typescript" &&
        typeof n.value === "string" &&
        grandParent &&
        (grandParent.type === "Program" ||
          grandParent.type === "BlockStatement");

      return nodeStr(n, options$$1, isTypeScriptDirective);
    }
    case "Directive":
      return path$$1.call(print, "value"); // Babel 6
    case "DirectiveLiteral":
      return nodeStr(n, options$$1);
    case "UnaryExpression":
      parts.push(n.operator);

      if (/[a-z]$/.test(n.operator)) {
        parts.push(" ");
      }

      parts.push(path$$1.call(print, "argument"));

      return concat(parts);
    case "UpdateExpression":
      parts.push(path$$1.call(print, "argument"), n.operator);

      if (n.prefix) {
        parts.reverse();
      }

      return concat(parts);
    case "ConditionalExpression": {
      // We print a ConditionalExpression in either "JSX mode" or "normal mode".
      // See tests/jsx/conditional-expression.js for more info.
      let jsxMode = false;
      const parent = path$$1.getParentNode();
      let forceNoIndent = parent.type === "ConditionalExpression";

      // Find the outermost non-ConditionalExpression parent, and the outermost
      // ConditionalExpression parent. We'll use these to determine if we should
      // print in JSX mode.
      let currentParent;
      let previousParent;
      let i = 0;
      do {
        previousParent = currentParent || n;
        currentParent = path$$1.getParentNode(i);
        i++;
      } while (currentParent && currentParent.type === "ConditionalExpression");
      const firstNonConditionalParent = currentParent || parent;
      const lastConditionalParent = previousParent;

      if (
        isJSXNode(n.test) ||
        isJSXNode(n.consequent) ||
        isJSXNode(n.alternate) ||
        conditionalExpressionChainContainsJSX(lastConditionalParent)
      ) {
        jsxMode = true;
        forceNoIndent = true;

        // Even though they don't need parens, we wrap (almost) everything in
        // parens when using ?: within JSX, because the parens are analogous to
        // curly braces in an if statement.
        const wrap = doc$$1 =>
          concat([
            ifBreak("(", ""),
            indent(concat([softline, doc$$1])),
            softline,
            ifBreak(")", "")
          ]);

        // The only things we don't wrap are:
        // * Nested conditional expressions in alternates
        // * null
        const isNull = node =>
          node.type === "NullLiteral" ||
          (node.type === "Literal" && node.value === null);

        parts.push(
          " ? ",
          isNull(n.consequent)
            ? path$$1.call(print, "consequent")
            : wrap(path$$1.call(print, "consequent")),
          " : ",
          n.alternate.type === "ConditionalExpression" || isNull(n.alternate)
            ? path$$1.call(print, "alternate")
            : wrap(path$$1.call(print, "alternate"))
        );
      } else {
        // normal mode
        const part = concat([
          line,
          "? ",
          n.consequent.type === "ConditionalExpression" ? ifBreak("", "(") : "",
          align(2, path$$1.call(print, "consequent")),
          n.consequent.type === "ConditionalExpression" ? ifBreak("", ")") : "",
          line,
          ": ",
          align(2, path$$1.call(print, "alternate"))
        ]);
        parts.push(
          // TODO: remove `!options.useTabs` condition if #3745 merged
          parent.type === "ConditionalExpression" && !options$$1.useTabs
            ? align(Math.max(0, options$$1.tabWidth - 2), part)
            : part
        );
      }

      // In JSX mode, we want a whole chain of ConditionalExpressions to all
      // break if any of them break. That means we should only group around the
      // outer-most ConditionalExpression.
      const maybeGroup = doc$$1 =>
        jsxMode
          ? parent === firstNonConditionalParent ? group(doc$$1) : doc$$1
          : group(doc$$1); // Always group in normal mode.

      // Break the closing paren to keep the chain right after it:
      // (a
      //   ? b
      //   : c
      // ).call()
      const breakClosingParen =
        !jsxMode && parent.type === "MemberExpression" && !parent.computed;

      return maybeGroup(
        concat([
          path$$1.call(print, "test"),
          forceNoIndent ? concat(parts) : indent(concat(parts)),
          breakClosingParen ? softline : ""
        ])
      );
    }
    case "VariableDeclaration": {
      const printed = path$$1.map(childPath => {
        return print(childPath);
      }, "declarations");

      // We generally want to terminate all variable declarations with a
      // semicolon, except when they in the () part of for loops.
      const parentNode = path$$1.getParentNode();

      const isParentForLoop =
        parentNode.type === "ForStatement" ||
        parentNode.type === "ForInStatement" ||
        parentNode.type === "ForOfStatement" ||
        parentNode.type === "ForAwaitStatement";

      const hasValue = n.declarations.some(decl => decl.init);

      let firstVariable;
      if (printed.length === 1) {
        firstVariable = printed[0];
      } else if (printed.length > 1) {
        // Indent first var to comply with eslint one-var rule
        firstVariable = indent(printed[0]);
      }

      parts = [
        isNodeStartingWithDeclare(n, options$$1) ? "declare " : "",
        n.kind,
        firstVariable ? concat([" ", firstVariable]) : "",
        indent(
          concat(
            printed
              .slice(1)
              .map(p =>
                concat([",", hasValue && !isParentForLoop ? hardline : line, p])
              )
          )
        )
      ];

      if (!(isParentForLoop && parentNode.body !== n)) {
        parts.push(semi);
      }

      return group(concat(parts));
    }
    case "VariableDeclarator":
      return printAssignment(
        n.id,
        concat([path$$1.call(print, "id"), path$$1.call(print, "typeParameters")]),
        " =",
        n.init,
        n.init && path$$1.call(print, "init"),
        options$$1
      );
    case "WithStatement":
      return group(
        concat([
          "with (",
          path$$1.call(print, "object"),
          ")",
          adjustClause(n.body, path$$1.call(print, "body"))
        ])
      );
    case "IfStatement": {
      const con = adjustClause(n.consequent, path$$1.call(print, "consequent"));
      const opening = group(
        concat([
          "if (",
          group(
            concat([
              indent(concat([softline, path$$1.call(print, "test")])),
              softline
            ])
          ),
          ")",
          con
        ])
      );

      parts.push(opening);

      if (n.alternate) {
        if (n.consequent.type === "BlockStatement") {
          parts.push(" else");
        } else {
          parts.push(hardline, "else");
        }

        parts.push(
          group(
            adjustClause(
              n.alternate,
              path$$1.call(print, "alternate"),
              n.alternate.type === "IfStatement"
            )
          )
        );
      }

      return concat(parts);
    }
    case "ForStatement": {
      const body = adjustClause(n.body, path$$1.call(print, "body"));

      // We want to keep dangling comments above the loop to stay consistent.
      // Any comment positioned between the for statement and the parentheses
      // is going to be printed before the statement.
      const dangling = comments.printDanglingComments(
        path$$1,
        options$$1,
        /* sameLine */ true
      );
      const printedComments = dangling ? concat([dangling, softline]) : "";

      if (!n.init && !n.test && !n.update) {
        return concat([printedComments, group(concat(["for (;;)", body]))]);
      }

      return concat([
        printedComments,
        group(
          concat([
            "for (",
            group(
              concat([
                indent(
                  concat([
                    softline,
                    path$$1.call(print, "init"),
                    ";",
                    line,
                    path$$1.call(print, "test"),
                    ";",
                    line,
                    path$$1.call(print, "update")
                  ])
                ),
                softline
              ])
            ),
            ")",
            body
          ])
        )
      ]);
    }
    case "WhileStatement":
      return group(
        concat([
          "while (",
          group(
            concat([
              indent(concat([softline, path$$1.call(print, "test")])),
              softline
            ])
          ),
          ")",
          adjustClause(n.body, path$$1.call(print, "body"))
        ])
      );
    case "ForInStatement":
      // Note: esprima can't actually parse "for each (".
      return group(
        concat([
          n.each ? "for each (" : "for (",
          path$$1.call(print, "left"),
          " in ",
          path$$1.call(print, "right"),
          ")",
          adjustClause(n.body, path$$1.call(print, "body"))
        ])
      );

    case "ForOfStatement":
    case "ForAwaitStatement": {
      // Babylon 7 removed ForAwaitStatement in favor of ForOfStatement
      // with `"await": true`:
      // https://github.com/estree/estree/pull/138
      const isAwait = n.type === "ForAwaitStatement" || n.await;

      return group(
        concat([
          "for",
          isAwait ? " await" : "",
          " (",
          path$$1.call(print, "left"),
          " of ",
          path$$1.call(print, "right"),
          ")",
          adjustClause(n.body, path$$1.call(print, "body"))
        ])
      );
    }

    case "DoWhileStatement": {
      const clause = adjustClause(n.body, path$$1.call(print, "body"));
      const doBody = group(concat(["do", clause]));
      parts = [doBody];

      if (n.body.type === "BlockStatement") {
        parts.push(" ");
      } else {
        parts.push(hardline);
      }
      parts.push("while (");

      parts.push(
        group(
          concat([
            indent(concat([softline, path$$1.call(print, "test")])),
            softline
          ])
        ),
        ")",
        semi
      );

      return concat(parts);
    }
    case "DoExpression":
      return concat(["do ", path$$1.call(print, "body")]);
    case "BreakStatement":
      parts.push("break");

      if (n.label) {
        parts.push(" ", path$$1.call(print, "label"));
      }

      parts.push(semi);

      return concat(parts);
    case "ContinueStatement":
      parts.push("continue");

      if (n.label) {
        parts.push(" ", path$$1.call(print, "label"));
      }

      parts.push(semi);

      return concat(parts);
    case "LabeledStatement":
      if (n.body.type === "EmptyStatement") {
        return concat([path$$1.call(print, "label"), ":;"]);
      }

      return concat([
        path$$1.call(print, "label"),
        ": ",
        path$$1.call(print, "body")
      ]);
    case "TryStatement":
      return concat([
        "try ",
        path$$1.call(print, "block"),
        n.handler ? concat([" ", path$$1.call(print, "handler")]) : "",
        n.finalizer ? concat([" finally ", path$$1.call(print, "finalizer")]) : ""
      ]);
    case "CatchClause":
      return concat([
        "catch ",
        n.param ? concat(["(", path$$1.call(print, "param"), ") "]) : "",
        path$$1.call(print, "body")
      ]);
    case "ThrowStatement":
      return concat(["throw ", path$$1.call(print, "argument"), semi]);
    // Note: ignoring n.lexical because it has no printing consequences.
    case "SwitchStatement":
      return concat([
        "switch (",
        path$$1.call(print, "discriminant"),
        ") {",
        n.cases.length > 0
          ? indent(
              concat([
                hardline,
                join(
                  hardline,
                  path$$1.map(casePath => {
                    const caseNode = casePath.getValue();
                    return concat([
                      casePath.call(print),
                      n.cases.indexOf(caseNode) !== n.cases.length - 1 &&
                      util$1.isNextLineEmpty(options$$1.originalText, caseNode)
                        ? hardline
                        : ""
                    ]);
                  }, "cases")
                )
              ])
            )
          : "",
        hardline,
        "}"
      ]);
    case "SwitchCase": {
      if (n.test) {
        parts.push("case ", path$$1.call(print, "test"), ":");
      } else {
        parts.push("default:");
      }

      const consequent = n.consequent.filter(
        node => node.type !== "EmptyStatement"
      );

      if (consequent.length > 0) {
        const cons = path$$1.call(consequentPath => {
          return printStatementSequence(consequentPath, options$$1, print);
        }, "consequent");

        parts.push(
          consequent.length === 1 && consequent[0].type === "BlockStatement"
            ? concat([" ", cons])
            : indent(concat([hardline, cons]))
        );
      }

      return concat(parts);
    }
    // JSX extensions below.
    case "DebuggerStatement":
      return concat(["debugger", semi]);
    case "JSXAttribute":
      parts.push(path$$1.call(print, "name"));

      if (n.value) {
        let res;
        if (isStringLiteral(n.value)) {
          const value = rawText(n.value);
          res = '"' + value.slice(1, -1).replace(/"/g, "&quot;") + '"';
        } else {
          res = path$$1.call(print, "value");
        }
        parts.push("=", res);
      }

      return concat(parts);
    case "JSXIdentifier":
      // Can be removed when this is fixed:
      // https://github.com/eslint/typescript-eslint-parser/issues/337
      if (!n.name) {
        return "this";
      }
      return "" + n.name;
    case "JSXNamespacedName":
      return join(":", [
        path$$1.call(print, "namespace"),
        path$$1.call(print, "name")
      ]);
    case "JSXMemberExpression":
      return join(".", [
        path$$1.call(print, "object"),
        path$$1.call(print, "property")
      ]);
    case "TSQualifiedName":
      return join(".", [path$$1.call(print, "left"), path$$1.call(print, "right")]);
    case "JSXSpreadAttribute":
    case "JSXSpreadChild": {
      return concat([
        "{",
        path$$1.call(p => {
          const printed = concat(["...", print(p)]);
          const n = p.getValue();
          if (!n.comments || !n.comments.length) {
            return printed;
          }
          return concat([
            indent(
              concat([
                softline,
                comments.printComments(p, () => printed, options$$1)
              ])
            ),
            softline
          ]);
        }, n.type === "JSXSpreadAttribute" ? "argument" : "expression"),
        "}"
      ]);
    }
    case "JSXExpressionContainer": {
      const parent = path$$1.getParentNode(0);

      const preventInline =
        parent.type === "JSXAttribute" &&
        n.expression.comments &&
        n.expression.comments.length > 0;

      const shouldInline =
        !preventInline &&
        (n.expression.type === "ArrayExpression" ||
          n.expression.type === "ObjectExpression" ||
          n.expression.type === "ArrowFunctionExpression" ||
          n.expression.type === "CallExpression" ||
          n.expression.type === "FunctionExpression" ||
          n.expression.type === "JSXEmptyExpression" ||
          n.expression.type === "TemplateLiteral" ||
          n.expression.type === "TaggedTemplateExpression" ||
          n.expression.type === "DoExpression" ||
          (isJSXNode(parent) &&
            (n.expression.type === "ConditionalExpression" ||
              isBinaryish(n.expression))));

      if (shouldInline) {
        return group(
          concat(["{", path$$1.call(print, "expression"), lineSuffixBoundary, "}"])
        );
      }

      return group(
        concat([
          "{",
          indent(concat([softline, path$$1.call(print, "expression")])),
          softline,
          lineSuffixBoundary,
          "}"
        ])
      );
    }
    case "JSXFragment":
    case "TSJsxFragment":
    case "JSXElement": {
      const elem = comments.printComments(
        path$$1,
        () => printJSXElement(path$$1, options$$1, print),
        options$$1
      );
      return maybeWrapJSXElementInParens(path$$1, elem);
    }
    case "JSXOpeningElement": {
      const n = path$$1.getValue();

      const nameHasComments =
        n.name && n.name.comments && n.name.comments.length > 0;

      // Don't break self-closing elements with no attributes and no comments
      if (n.selfClosing && !n.attributes.length && !nameHasComments) {
        return concat(["<", path$$1.call(print, "name"), " />"]);
      }

      // don't break up opening elements with a single long text attribute
      if (
        n.attributes &&
        n.attributes.length === 1 &&
        n.attributes[0].value &&
        isStringLiteral(n.attributes[0].value) &&
        // We should break for the following cases:
        // <div
        //   // comment
        //   attr="value"
        // >
        // <div
        //   attr="value"
        //   // comment
        // >
        !nameHasComments &&
        (!n.attributes[0].comments || !n.attributes[0].comments.length)
      ) {
        return group(
          concat([
            "<",
            path$$1.call(print, "name"),
            " ",
            concat(path$$1.map(print, "attributes")),
            n.selfClosing ? " />" : ">"
          ])
        );
      }

      const lastAttrHasTrailingComments =
        n.attributes.length && hasTrailingComment(util$1.getLast(n.attributes));

      const bracketSameLine =
        options$$1.jsxBracketSameLine &&
        // We should print the bracket in a new line for the following cases:
        // <div
        //   // comment
        // >
        // <div
        //   attr // comment
        // >
        (!nameHasComments || n.attributes.length) &&
        !lastAttrHasTrailingComments;

      const separator = n.attributes.length > 1 ? hardline : line;

      return group(
        concat([
          "<",
          path$$1.call(print, "name"),
          concat([
            indent(
              concat(
                path$$1.map(attr => concat([separator, print(attr)]), "attributes")
              )
            ),
            n.selfClosing ? line : bracketSameLine ? ">" : softline
          ]),
          n.selfClosing ? "/>" : bracketSameLine ? "" : ">"
        ])
      );
    }
    case "JSXClosingElement":
      return concat(["</", path$$1.call(print, "name"), ">"]);
    case "JSXOpeningFragment":
    case "JSXClosingFragment":
    case "TSJsxOpeningFragment":
    case "TSJsxClosingFragment": {
      const hasComment = n.comments && n.comments.length;
      const hasOwnLineComment =
        hasComment && !n.comments.every(util$1.isBlockComment);
      const isOpeningFragment =
        n.type === "JSXOpeningFragment" || n.type === "TSJsxOpeningFragment";
      return concat([
        isOpeningFragment ? "<" : "</",
        indent(
          concat([
            hasOwnLineComment
              ? hardline
              : hasComment && !isOpeningFragment ? " " : "",
            comments.printDanglingComments(path$$1, options$$1, true)
          ])
        ),
        hasOwnLineComment ? hardline : "",
        ">"
      ]);
    }
    case "JSXText":
      /* istanbul ignore next */
      throw new Error("JSXTest should be handled by JSXElement");
    case "JSXEmptyExpression": {
      const requiresHardline =
        n.comments && !n.comments.every(util$1.isBlockComment);

      return concat([
        comments.printDanglingComments(
          path$$1,
          options$$1,
          /* sameIndent */ !requiresHardline
        ),
        requiresHardline ? hardline : ""
      ]);
    }
    case "ClassBody":
      if (!n.comments && n.body.length === 0) {
        return "{}";
      }

      return concat([
        "{",
        n.body.length > 0
          ? indent(
              concat([
                hardline,
                path$$1.call(bodyPath => {
                  return printStatementSequence(bodyPath, options$$1, print);
                }, "body")
              ])
            )
          : comments.printDanglingComments(path$$1, options$$1),
        hardline,
        "}"
      ]);
    case "ClassProperty":
    case "TSAbstractClassProperty":
    case "ClassPrivateProperty": {
      if (n.accessibility) {
        parts.push(n.accessibility + " ");
      }
      if (n.static) {
        parts.push("static ");
      }
      if (n.type === "TSAbstractClassProperty") {
        parts.push("abstract ");
      }
      if (n.readonly) {
        parts.push("readonly ");
      }
      const variance = getFlowVariance(n);
      if (variance) {
        parts.push(variance);
      }
      if (n.computed) {
        parts.push("[", path$$1.call(print, "key"), "]");
      } else {
        parts.push(printPropertyKey(path$$1, options$$1, print));
      }
      parts.push(printTypeAnnotation(path$$1, options$$1, print));
      if (n.value) {
        parts.push(
          " =",
          printAssignmentRight(
            n.value,
            path$$1.call(print, "value"),
            false, // canBreak
            options$$1
          )
        );
      }

      parts.push(semi);

      return concat(parts);
    }
    case "ClassDeclaration":
    case "ClassExpression":
    case "TSAbstractClassDeclaration":
      if (isNodeStartingWithDeclare(n, options$$1)) {
        parts.push("declare ");
      }
      parts.push(concat(printClass(path$$1, options$$1, print)));
      return concat(parts);
    case "TSInterfaceHeritage":
      parts.push(path$$1.call(print, "id"));

      if (n.typeParameters) {
        parts.push(path$$1.call(print, "typeParameters"));
      }

      return concat(parts);
    case "TemplateElement":
      return join(literalline, n.value.raw.split(/\r?\n/g));
    case "TemplateLiteral": {
      const expressions = path$$1.map(print, "expressions");

      parts.push("`");

      path$$1.each(childPath => {
        const i = childPath.getName();

        parts.push(print(childPath));

        if (i < expressions.length) {
          // For a template literal of the following form:
          //   `someQuery {
          //     ${call({
          //       a,
          //       b,
          //     })}
          //   }`
          // the expression is on its own line (there is a \n in the previous
          // quasi literal), therefore we want to indent the JavaScript
          // expression inside at the beginning of ${ instead of the beginning
          // of the `.
          const tabWidth = options$$1.tabWidth;
          const indentSize = util$1.getIndentSize(
            childPath.getValue().value.raw,
            tabWidth
          );

          let printed = expressions[i];

          if (
            (n.expressions[i].comments && n.expressions[i].comments.length) ||
            n.expressions[i].type === "MemberExpression" ||
            n.expressions[i].type === "ConditionalExpression"
          ) {
            printed = concat([indent(concat([softline, printed])), softline]);
          }

          const aligned = addAlignmentToDoc(printed, indentSize, tabWidth);

          parts.push(group(concat(["${", aligned, lineSuffixBoundary, "}"])));
        }
      }, "quasis");

      parts.push("`");

      return concat(parts);
    }
    // These types are unprintable because they serve as abstract
    // supertypes for other (printable) types.
    case "TaggedTemplateExpression":
      return concat([path$$1.call(print, "tag"), path$$1.call(print, "quasi")]);
    case "Node":
    case "Printable":
    case "SourceLocation":
    case "Position":
    case "Statement":
    case "Function":
    case "Pattern":
    case "Expression":
    case "Declaration":
    case "Specifier":
    case "NamedSpecifier":
    case "Comment":
    case "MemberTypeAnnotation": // Flow
    case "Type":
      /* istanbul ignore next */
      throw new Error("unprintable type: " + JSON.stringify(n.type));
    // Type Annotations for Facebook Flow, typically stripped out or
    // transformed away before printing.
    case "TypeAnnotation":
    case "TSTypeAnnotation":
      if (n.typeAnnotation) {
        return path$$1.call(print, "typeAnnotation");
      }

      /* istanbul ignore next */
      return "";
    case "TSTupleType":
    case "TupleTypeAnnotation": {
      const typesField = n.type === "TSTupleType" ? "elementTypes" : "types";
      return group(
        concat([
          "[",
          indent(
            concat([
              softline,
              printArrayItems(path$$1, options$$1, typesField, print)
            ])
          ),
          // TypeScript doesn't support trailing commas in tuple types
          n.type === "TSTupleType"
            ? ""
            : ifBreak(shouldPrintComma(options$$1) ? "," : ""),
          comments.printDanglingComments(path$$1, options$$1, /* sameIndent */ true),
          softline,
          "]"
        ])
      );
    }

    case "ExistsTypeAnnotation":
      return "*";
    case "EmptyTypeAnnotation":
      return "empty";
    case "AnyTypeAnnotation":
      return "any";
    case "MixedTypeAnnotation":
      return "mixed";
    case "ArrayTypeAnnotation":
      return concat([path$$1.call(print, "elementType"), "[]"]);
    case "BooleanTypeAnnotation":
      return "boolean";
    case "BooleanLiteralTypeAnnotation":
      return "" + n.value;
    case "DeclareClass":
      return printFlowDeclaration(path$$1, printClass(path$$1, options$$1, print));
    case "DeclareFunction":
      // For TypeScript the DeclareFunction node shares the AST
      // structure with FunctionDeclaration
      if (n.params) {
        return concat([
          "declare ",
          printFunctionDeclaration(path$$1, print, options$$1),
          semi
        ]);
      }
      return printFlowDeclaration(path$$1, [
        "function ",
        path$$1.call(print, "id"),
        n.predicate ? " " : "",
        path$$1.call(print, "predicate"),
        semi
      ]);
    case "DeclareModule":
      return printFlowDeclaration(path$$1, [
        "module ",
        path$$1.call(print, "id"),
        " ",
        path$$1.call(print, "body")
      ]);
    case "DeclareModuleExports":
      return printFlowDeclaration(path$$1, [
        "module.exports",
        ": ",
        path$$1.call(print, "typeAnnotation"),
        semi
      ]);
    case "DeclareVariable":
      return printFlowDeclaration(path$$1, ["var ", path$$1.call(print, "id"), semi]);
    case "DeclareExportAllDeclaration":
      return concat(["declare export * from ", path$$1.call(print, "source")]);
    case "DeclareExportDeclaration":
      return concat(["declare ", printExportDeclaration(path$$1, options$$1, print)]);
    case "DeclareOpaqueType":
    case "OpaqueType": {
      parts.push(
        "opaque type ",
        path$$1.call(print, "id"),
        path$$1.call(print, "typeParameters")
      );

      if (n.supertype) {
        parts.push(": ", path$$1.call(print, "supertype"));
      }

      if (n.impltype) {
        parts.push(" = ", path$$1.call(print, "impltype"));
      }

      parts.push(semi);

      if (n.type === "DeclareOpaqueType") {
        return printFlowDeclaration(path$$1, parts);
      }

      return concat(parts);
    }

    case "FunctionTypeAnnotation":
    case "TSFunctionType": {
      // FunctionTypeAnnotation is ambiguous:
      // declare function foo(a: B): void; OR
      // var A: (a: B) => void;
      const parent = path$$1.getParentNode(0);
      const parentParent = path$$1.getParentNode(1);
      const parentParentParent = path$$1.getParentNode(2);
      let isArrowFunctionTypeAnnotation =
        n.type === "TSFunctionType" ||
        !(
          (parent.type === "ObjectTypeProperty" &&
            !getFlowVariance(parent) &&
            !parent.optional &&
            util$1.locStart(parent) === util$1.locStart(n)) ||
          parent.type === "ObjectTypeCallProperty" ||
          (parentParentParent && parentParentParent.type === "DeclareFunction")
        );

      let needsColon =
        isArrowFunctionTypeAnnotation &&
        (parent.type === "TypeAnnotation" ||
          parent.type === "TSTypeAnnotation");

      // Sadly we can't put it inside of FastPath::needsColon because we are
      // printing ":" as part of the expression and it would put parenthesis
      // around :(
      const needsParens =
        needsColon &&
        isArrowFunctionTypeAnnotation &&
        (parent.type === "TypeAnnotation" ||
          parent.type === "TSTypeAnnotation") &&
        parentParent.type === "ArrowFunctionExpression";

      if (isObjectTypePropertyAFunction(parent)) {
        isArrowFunctionTypeAnnotation = true;
        needsColon = true;
      }

      if (needsParens) {
        parts.push("(");
      }

      parts.push(
        printFunctionParams(
          path$$1,
          print,
          options$$1,
          /* expandArg */ false,
          /* printTypeParams */ true
        )
      );

      // The returnType is not wrapped in a TypeAnnotation, so the colon
      // needs to be added separately.
      if (n.returnType || n.predicate || n.typeAnnotation) {
        parts.push(
          isArrowFunctionTypeAnnotation ? " => " : ": ",
          path$$1.call(print, "returnType"),
          path$$1.call(print, "predicate"),
          path$$1.call(print, "typeAnnotation")
        );
      }
      if (needsParens) {
        parts.push(")");
      }

      return group(concat(parts));
    }
    case "FunctionTypeParam":
      return concat([
        path$$1.call(print, "name"),
        printOptionalToken(path$$1),
        n.name ? ": " : "",
        path$$1.call(print, "typeAnnotation")
      ]);
    case "GenericTypeAnnotation":
      return concat([
        path$$1.call(print, "id"),
        path$$1.call(print, "typeParameters")
      ]);
    case "DeclareInterface":
    case "InterfaceDeclaration": {
      if (
        n.type === "DeclareInterface" ||
        isNodeStartingWithDeclare(n, options$$1)
      ) {
        parts.push("declare ");
      }

      parts.push(
        "interface ",
        path$$1.call(print, "id"),
        path$$1.call(print, "typeParameters")
      );

      if (n["extends"].length > 0) {
        parts.push(
          group(
            indent(
              concat([line, "extends ", join(", ", path$$1.map(print, "extends"))])
            )
          )
        );
      }

      parts.push(" ");
      parts.push(path$$1.call(print, "body"));

      return group(concat(parts));
    }
    case "ClassImplements":
    case "InterfaceExtends":
      return concat([
        path$$1.call(print, "id"),
        path$$1.call(print, "typeParameters")
      ]);
    case "TSIntersectionType":
    case "IntersectionTypeAnnotation": {
      const types = path$$1.map(print, "types");
      const result = [];
      let wasIndented = false;
      for (let i = 0; i < types.length; ++i) {
        if (i === 0) {
          result.push(types[i]);
        } else if (isObjectType(n.types[i - 1]) && isObjectType(n.types[i])) {
          // If both are objects, don't indent
          result.push(
            concat([" & ", wasIndented ? indent(types[i]) : types[i]])
          );
        } else if (!isObjectType(n.types[i - 1]) && !isObjectType(n.types[i])) {
          // If no object is involved, go to the next line if it breaks
          result.push(indent(concat([" &", line, types[i]])));
        } else {
          // If you go from object to non-object or vis-versa, then inline it
          if (i > 1) {
            wasIndented = true;
          }
          result.push(" & ", i > 1 ? indent(types[i]) : types[i]);
        }
      }
      return group(concat(result));
    }
    case "TSUnionType":
    case "UnionTypeAnnotation": {
      // single-line variation
      // A | B | C

      // multi-line variation
      // | A
      // | B
      // | C

      const parent = path$$1.getParentNode();

      // If there's a leading comment, the parent is doing the indentation
      const shouldIndent =
        parent.type !== "TypeParameterInstantiation" &&
        parent.type !== "TSTypeParameterInstantiation" &&
        parent.type !== "GenericTypeAnnotation" &&
        parent.type !== "TSTypeReference" &&
        parent.type !== "FunctionTypeParam" &&
        !(
          (parent.type === "TypeAlias" ||
            parent.type === "VariableDeclarator") &&
          hasLeadingOwnLineComment(options$$1.originalText, n)
        );

      // {
      //   a: string
      // } | null | void
      // should be inlined and not be printed in the multi-line variant
      const shouldHug = shouldHugType(n);

      // We want to align the children but without its comment, so it looks like
      // | child1
      // // comment
      // | child2
      const printed = path$$1.map(typePath => {
        let printedType = typePath.call(print);
        if (!shouldHug) {
          printedType = align(2, printedType);
        }
        return comments.printComments(typePath, () => printedType, options$$1);
      }, "types");

      if (shouldHug) {
        return join(" | ", printed);
      }

      const code = concat([
        ifBreak(concat([shouldIndent ? line : "", "| "])),
        join(concat([line, "| "]), printed)
      ]);

      let hasParens;

      if (n.type === "TSUnionType") {
        const greatGrandParent = path$$1.getParentNode(2);
        const greatGreatGrandParent = path$$1.getParentNode(3);

        hasParens =
          greatGrandParent &&
          greatGrandParent.type === "TSParenthesizedType" &&
          greatGreatGrandParent &&
          (greatGreatGrandParent.type === "TSUnionType" ||
            greatGreatGrandParent.type === "TSIntersectionType");
      } else {
        hasParens = path$$1.needsParens(options$$1);
      }

      if (hasParens) {
        return group(concat([indent(code), softline]));
      }

      return group(shouldIndent ? indent(code) : code);
    }
    case "NullableTypeAnnotation":
      return concat(["?", path$$1.call(print, "typeAnnotation")]);
    case "TSNullKeyword":
    case "NullLiteralTypeAnnotation":
      return "null";
    case "ThisTypeAnnotation":
      return "this";
    case "NumberTypeAnnotation":
      return "number";
    case "ObjectTypeCallProperty":
      if (n.static) {
        parts.push("static ");
      }

      parts.push(path$$1.call(print, "value"));

      return concat(parts);
    case "ObjectTypeIndexer": {
      const variance = getFlowVariance(n);
      return concat([
        variance || "",
        "[",
        path$$1.call(print, "id"),
        n.id ? ": " : "",
        path$$1.call(print, "key"),
        "]: ",
        path$$1.call(print, "value")
      ]);
    }
    case "ObjectTypeProperty": {
      const variance = getFlowVariance(n);

      return concat([
        n.static ? "static " : "",
        isGetterOrSetter(n) ? n.kind + " " : "",
        variance || "",
        printPropertyKey(path$$1, options$$1, print),
        printOptionalToken(path$$1),
        isFunctionNotation(n) ? "" : ": ",
        path$$1.call(print, "value")
      ]);
    }
    case "QualifiedTypeIdentifier":
      return concat([
        path$$1.call(print, "qualification"),
        ".",
        path$$1.call(print, "id")
      ]);
    case "StringLiteralTypeAnnotation":
      return nodeStr(n, options$$1);
    case "NumberLiteralTypeAnnotation":
      assert.strictEqual(typeof n.value, "number");

      if (n.extra != null) {
        return util$1.printNumber(n.extra.raw);
      }
      return util$1.printNumber(n.raw);

    case "StringTypeAnnotation":
      return "string";
    case "DeclareTypeAlias":
    case "TypeAlias": {
      if (
        n.type === "DeclareTypeAlias" ||
        isNodeStartingWithDeclare(n, options$$1)
      ) {
        parts.push("declare ");
      }

      const canBreak = n.right.type === "StringLiteralTypeAnnotation";

      const printed = printAssignmentRight(
        n.right,
        path$$1.call(print, "right"),
        canBreak,
        options$$1
      );

      parts.push(
        "type ",
        path$$1.call(print, "id"),
        path$$1.call(print, "typeParameters"),
        " =",
        printed,
        semi
      );

      return group(concat(parts));
    }
    case "TypeCastExpression":
      return concat([
        "(",
        path$$1.call(print, "expression"),
        ": ",
        path$$1.call(print, "typeAnnotation"),
        ")"
      ]);
    case "TypeParameterDeclaration":
    case "TypeParameterInstantiation":
    case "TSTypeParameterDeclaration":
    case "TSTypeParameterInstantiation":
      return printTypeParameters(path$$1, options$$1, print, "params");

    case "TSTypeParameter":
    case "TypeParameter": {
      const parent = path$$1.getParentNode();
      if (parent.type === "TSMappedType") {
        parts.push(path$$1.call(print, "name"));
        if (n.constraint) {
          parts.push(" in ", path$$1.call(print, "constraint"));
        }
        return concat(parts);
      }

      const variance = getFlowVariance(n);

      if (variance) {
        parts.push(variance);
      }

      parts.push(path$$1.call(print, "name"));

      if (n.bound) {
        parts.push(": ");
        parts.push(path$$1.call(print, "bound"));
      }

      if (n.constraint) {
        parts.push(" extends ", path$$1.call(print, "constraint"));
      }

      if (n["default"]) {
        parts.push(" = ", path$$1.call(print, "default"));
      }

      return concat(parts);
    }
    case "TypeofTypeAnnotation":
      return concat(["typeof ", path$$1.call(print, "argument")]);
    case "VoidTypeAnnotation":
      return "void";
    case "InferredPredicate":
      return "%checks";
    // Unhandled types below. If encountered, nodes of these types should
    // be either left alone or desugared into AST types that are fully
    // supported by the pretty-printer.
    case "DeclaredPredicate":
      return concat(["%checks(", path$$1.call(print, "value"), ")"]);
    case "TSAbstractKeyword":
      return "abstract";
    case "TSAnyKeyword":
      return "any";
    case "TSAsyncKeyword":
      return "async";
    case "TSBooleanKeyword":
      return "boolean";
    case "TSConstKeyword":
      return "const";
    case "TSDeclareKeyword":
      return "declare";
    case "TSExportKeyword":
      return "export";
    case "TSNeverKeyword":
      return "never";
    case "TSNumberKeyword":
      return "number";
    case "TSObjectKeyword":
      return "object";
    case "TSProtectedKeyword":
      return "protected";
    case "TSPrivateKeyword":
      return "private";
    case "TSPublicKeyword":
      return "public";
    case "TSReadonlyKeyword":
      return "readonly";
    case "TSSymbolKeyword":
      return "symbol";
    case "TSStaticKeyword":
      return "static";
    case "TSStringKeyword":
      return "string";
    case "TSUndefinedKeyword":
      return "undefined";
    case "TSVoidKeyword":
      return "void";
    case "TSAsExpression":
      return concat([
        path$$1.call(print, "expression"),
        " as ",
        path$$1.call(print, "typeAnnotation")
      ]);
    case "TSArrayType":
      return concat([path$$1.call(print, "elementType"), "[]"]);
    case "TSPropertySignature": {
      if (n.export) {
        parts.push("export ");
      }
      if (n.accessibility) {
        parts.push(n.accessibility + " ");
      }
      if (n.static) {
        parts.push("static ");
      }
      if (n.readonly) {
        parts.push("readonly ");
      }
      if (n.computed) {
        parts.push("[");
      }

      parts.push(printPropertyKey(path$$1, options$$1, print));

      if (n.computed) {
        parts.push("]");
      }

      parts.push(printOptionalToken(path$$1));

      if (n.typeAnnotation) {
        parts.push(": ");
        parts.push(path$$1.call(print, "typeAnnotation"));
      }

      // This isn't valid semantically, but it's in the AST so we can print it.
      if (n.initializer) {
        parts.push(" = ", path$$1.call(print, "initializer"));
      }

      return concat(parts);
    }
    case "TSParameterProperty":
      if (n.accessibility) {
        parts.push(n.accessibility + " ");
      }
      if (n.export) {
        parts.push("export ");
      }
      if (n.static) {
        parts.push("static ");
      }
      if (n.readonly) {
        parts.push("readonly ");
      }

      parts.push(path$$1.call(print, "parameter"));

      return concat(parts);
    case "TSTypeReference":
      return concat([
        path$$1.call(print, "typeName"),
        printTypeParameters(path$$1, options$$1, print, "typeParameters")
      ]);
    case "TSTypeQuery":
      return concat(["typeof ", path$$1.call(print, "exprName")]);
    case "TSParenthesizedType": {
      return path$$1.call(print, "typeAnnotation");
    }
    case "TSIndexSignature": {
      const parent = path$$1.getParentNode();

      return concat([
        n.export ? "export " : "",
        n.accessibility ? concat([n.accessibility, " "]) : "",
        n.static ? "static " : "",
        n.readonly ? "readonly " : "",
        "[",
        path$$1.call(print, "index"),
        "]: ",
        path$$1.call(print, "typeAnnotation"),
        parent.type === "ClassBody" ? semi : ""
      ]);
    }
    case "TSTypePredicate":
      return concat([
        path$$1.call(print, "parameterName"),
        " is ",
        path$$1.call(print, "typeAnnotation")
      ]);
    case "TSNonNullExpression":
      return concat([path$$1.call(print, "expression"), "!"]);
    case "TSThisType":
      return "this";
    case "TSLastTypeNode":
      return path$$1.call(print, "literal");
    case "TSIndexedAccessType":
      return concat([
        path$$1.call(print, "objectType"),
        "[",
        path$$1.call(print, "indexType"),
        "]"
      ]);
    case "TSConstructSignature":
    case "TSConstructorType":
    case "TSCallSignature": {
      if (n.type !== "TSCallSignature") {
        parts.push("new ");
      }

      parts.push(
        group(
          printFunctionParams(
            path$$1,
            print,
            options$$1,
            /* expandArg */ false,
            /* printTypeParams */ true
          )
        )
      );

      if (n.typeAnnotation) {
        const isType = n.type === "TSConstructorType";
        parts.push(isType ? " => " : ": ", path$$1.call(print, "typeAnnotation"));
      }
      return concat(parts);
    }
    case "TSTypeOperator":
      return concat(["keyof ", path$$1.call(print, "typeAnnotation")]);
    case "TSMappedType":
      return group(
        concat([
          "{",
          indent(
            concat([
              options$$1.bracketSpacing ? line : softline,
              n.readonlyToken
                ? concat([path$$1.call(print, "readonlyToken"), " "])
                : "",
              printTypeScriptModifiers(path$$1, options$$1, print),
              "[",
              path$$1.call(print, "typeParameter"),
              "]",
              n.questionToken ? "?" : "",
              ": ",
              path$$1.call(print, "typeAnnotation")
            ])
          ),
          comments.printDanglingComments(path$$1, options$$1, /* sameIndent */ true),
          options$$1.bracketSpacing ? line : softline,
          "}"
        ])
      );
    case "TSMethodSignature":
      parts.push(
        n.accessibility ? concat([n.accessibility, " "]) : "",
        n.export ? "export " : "",
        n.static ? "static " : "",
        n.readonly ? "readonly " : "",
        n.computed ? "[" : "",
        path$$1.call(print, "key"),
        n.computed ? "]" : "",
        printOptionalToken(path$$1),
        printFunctionParams(
          path$$1,
          print,
          options$$1,
          /* expandArg */ false,
          /* printTypeParams */ true
        )
      );

      if (n.typeAnnotation) {
        parts.push(": ", path$$1.call(print, "typeAnnotation"));
      }
      return group(concat(parts));
    case "TSNamespaceExportDeclaration":
      parts.push("export as namespace ", path$$1.call(print, "name"));

      if (options$$1.semi) {
        parts.push(";");
      }

      return group(concat(parts));
    case "TSEnumDeclaration":
      if (isNodeStartingWithDeclare(n, options$$1)) {
        parts.push("declare ");
      }

      if (n.modifiers) {
        parts.push(printTypeScriptModifiers(path$$1, options$$1, print));
      }
      if (n.const) {
        parts.push("const ");
      }

      parts.push("enum ", path$$1.call(print, "id"), " ");

      if (n.members.length === 0) {
        parts.push(
          group(
            concat([
              "{",
              comments.printDanglingComments(path$$1, options$$1),
              softline,
              "}"
            ])
          )
        );
      } else {
        parts.push(
          group(
            concat([
              "{",
              indent(
                concat([
                  hardline,
                  printArrayItems(path$$1, options$$1, "members", print),
                  shouldPrintComma(options$$1, "es5") ? "," : ""
                ])
              ),
              comments.printDanglingComments(
                path$$1,
                options$$1,
                /* sameIndent */ true
              ),
              hardline,
              "}"
            ])
          )
        );
      }

      return concat(parts);
    case "TSEnumMember":
      parts.push(path$$1.call(print, "id"));
      if (n.initializer) {
        parts.push(" = ", path$$1.call(print, "initializer"));
      }
      return concat(parts);
    case "TSImportEqualsDeclaration":
      parts.push(
        printTypeScriptModifiers(path$$1, options$$1, print),
        "import ",
        path$$1.call(print, "name"),
        " = ",
        path$$1.call(print, "moduleReference")
      );

      if (options$$1.semi) {
        parts.push(";");
      }

      return group(concat(parts));
    case "TSExternalModuleReference":
      return concat(["require(", path$$1.call(print, "expression"), ")"]);
    case "TSModuleDeclaration": {
      const parent = path$$1.getParentNode();
      const isExternalModule = isLiteral(n.id);
      const parentIsDeclaration = parent.type === "TSModuleDeclaration";
      const bodyIsDeclaration = n.body && n.body.type === "TSModuleDeclaration";

      if (parentIsDeclaration) {
        parts.push(".");
      } else {
        if (n.declare === true) {
          parts.push("declare ");
        }
        parts.push(printTypeScriptModifiers(path$$1, options$$1, print));

        // Global declaration looks like this:
        // (declare)? global { ... }
        const isGlobalDeclaration =
          n.id.type === "Identifier" &&
          n.id.name === "global" &&
          !/namespace|module/.test(
            options$$1.originalText.slice(util$1.locStart(n), util$1.locStart(n.id))
          );

        if (!isGlobalDeclaration) {
          parts.push(isExternalModule ? "module " : "namespace ");
        }
      }

      parts.push(path$$1.call(print, "id"));

      if (bodyIsDeclaration) {
        parts.push(path$$1.call(print, "body"));
      } else if (n.body) {
        parts.push(
          " {",
          indent(
            concat([
              line,
              path$$1.call(
                bodyPath =>
                  comments.printDanglingComments(bodyPath, options$$1, true),
                "body"
              ),
              group(path$$1.call(print, "body"))
            ])
          ),
          line,
          "}"
        );
      } else {
        parts.push(semi);
      }

      return concat(parts);
    }
    case "TSModuleBlock":
      return path$$1.call(bodyPath => {
        return printStatementSequence(bodyPath, options$$1, print);
      }, "body");

    case "PrivateName":
      return concat(["#", path$$1.call(print, "id")]);

    default:
      /* istanbul ignore next */
      throw new Error("unknown type: " + JSON.stringify(n.type));
  }
}

function printStatementSequence(path$$1, options$$1, print) {
  const printed = [];

  const bodyNode = path$$1.getNode();
  const isClass = bodyNode.type === "ClassBody";

  path$$1.map((stmtPath, i) => {
    const stmt = stmtPath.getValue();

    // Just in case the AST has been modified to contain falsy
    // "statements," it's safer simply to skip them.
    /* istanbul ignore if */
    if (!stmt) {
      return;
    }

    // Skip printing EmptyStatement nodes to avoid leaving stray
    // semicolons lying around.
    if (stmt.type === "EmptyStatement") {
      return;
    }

    const stmtPrinted = print(stmtPath);
    const text = options$$1.originalText;
    const parts = [];

    // in no-semi mode, prepend statement with semicolon if it might break ASI
    // don't prepend the only JSX element in a program with semicolon
    if (
      !options$$1.semi &&
      !isClass &&
      !isTheOnlyJSXElementInMarkdown(options$$1, stmtPath) &&
      stmtNeedsASIProtection(stmtPath, options$$1)
    ) {
      if (stmt.comments && stmt.comments.some(comment => comment.leading)) {
        parts.push(print(stmtPath, { needsSemi: true }));
      } else {
        parts.push(";", stmtPrinted);
      }
    } else {
      parts.push(stmtPrinted);
    }

    if (!options$$1.semi && isClass) {
      if (classPropMayCauseASIProblems(stmtPath)) {
        parts.push(";");
      } else if (stmt.type === "ClassProperty") {
        const nextChild = bodyNode.body[i + 1];
        if (classChildNeedsASIProtection(nextChild)) {
          parts.push(";");
        }
      }
    }

    if (util$1.isNextLineEmpty(text, stmt) && !isLastStatement(stmtPath)) {
      parts.push(hardline);
    }

    printed.push(concat(parts));
  });

  return join(hardline, printed);
}

function printPropertyKey(path$$1, options$$1, print) {
  const node = path$$1.getNode();
  const key = node.key;

  if (
    isStringLiteral(key) &&
    isIdentifierName(key.value) &&
    !node.computed &&
    options$$1.parser !== "json"
  ) {
    // 'a' -> a
    return path$$1.call(
      keyPath => comments.printComments(keyPath, () => key.value, options$$1),
      "key"
    );
  }
  return path$$1.call(print, "key");
}

function printMethod(path$$1, options$$1, print) {
  const node = path$$1.getNode();
  const semi = options$$1.semi ? ";" : "";
  const kind = node.kind;
  const parts = [];

  if (node.type === "ObjectMethod" || node.type === "ClassMethod") {
    node.value = node;
  }

  if (node.value.async) {
    parts.push("async ");
  }

  if (!kind || kind === "init" || kind === "method" || kind === "constructor") {
    if (node.value.generator) {
      parts.push("*");
    }
  } else {
    assert.ok(kind === "get" || kind === "set");

    parts.push(kind, " ");
  }

  let key = printPropertyKey(path$$1, options$$1, print);

  if (node.computed) {
    key = concat(["[", key, "]"]);
  }

  parts.push(
    key,
    concat(
      path$$1.call(
        valuePath => [
          printFunctionTypeParameters(valuePath, options$$1, print),
          group(
            concat([
              printFunctionParams(valuePath, print, options$$1),
              printReturnType(valuePath, print, options$$1)
            ])
          )
        ],
        "value"
      )
    )
  );

  if (!node.value.body || node.value.body.length === 0) {
    parts.push(semi);
  } else {
    parts.push(" ", path$$1.call(print, "value", "body"));
  }

  return concat(parts);
}

function couldGroupArg(arg) {
  return (
    (arg.type === "ObjectExpression" &&
      (arg.properties.length > 0 || arg.comments)) ||
    (arg.type === "ArrayExpression" &&
      (arg.elements.length > 0 || arg.comments)) ||
    arg.type === "TSTypeAssertionExpression" ||
    arg.type === "TSAsExpression" ||
    arg.type === "FunctionExpression" ||
    (arg.type === "ArrowFunctionExpression" &&
      (arg.body.type === "BlockStatement" ||
        arg.body.type === "ArrowFunctionExpression" ||
        arg.body.type === "ObjectExpression" ||
        arg.body.type === "ArrayExpression" ||
        arg.body.type === "CallExpression" ||
        isJSXNode(arg.body)))
  );
}

function shouldGroupLastArg(args) {
  const lastArg = util$1.getLast(args);
  const penultimateArg = util$1.getPenultimate(args);
  return (
    !hasLeadingComment(lastArg) &&
    !hasTrailingComment(lastArg) &&
    couldGroupArg(lastArg) &&
    // If the last two arguments are of the same type,
    // disable last element expansion.
    (!penultimateArg || penultimateArg.type !== lastArg.type)
  );
}

function shouldGroupFirstArg(args) {
  if (args.length !== 2) {
    return false;
  }

  const firstArg = args[0];
  const secondArg = args[1];
  return (
    (!firstArg.comments || !firstArg.comments.length) &&
    (firstArg.type === "FunctionExpression" ||
      (firstArg.type === "ArrowFunctionExpression" &&
        firstArg.body.type === "BlockStatement")) &&
    !couldGroupArg(secondArg)
  );
}

function printArgumentsList(path$$1, options$$1, print) {
  const args = path$$1.getValue().arguments;

  if (args.length === 0) {
    return concat([
      "(",
      comments.printDanglingComments(path$$1, options$$1, /* sameIndent */ true),
      ")"
    ]);
  }

  let anyArgEmptyLine = false;
  let hasEmptyLineFollowingFirstArg = false;
  const lastArgIndex = args.length - 1;
  const printedArguments = path$$1.map((argPath, index) => {
    const arg = argPath.getNode();
    const parts = [print(argPath)];

    if (index === lastArgIndex) {
      // do nothing
    } else if (util$1.isNextLineEmpty(options$$1.originalText, arg)) {
      if (index === 0) {
        hasEmptyLineFollowingFirstArg = true;
      }

      anyArgEmptyLine = true;
      parts.push(",", hardline, hardline);
    } else {
      parts.push(",", line);
    }

    return concat(parts);
  }, "arguments");

  // This is just an optimization; I think we could return the
  // conditional group for all function calls, but it's more expensive
  // so only do it for specific forms.
  const shouldGroupFirst = shouldGroupFirstArg(args);
  const shouldGroupLast = shouldGroupLastArg(args);
  if (shouldGroupFirst || shouldGroupLast) {
    const shouldBreak =
      (shouldGroupFirst
        ? printedArguments.slice(1).some(willBreak)
        : printedArguments.slice(0, -1).some(willBreak)) || anyArgEmptyLine;

    // We want to print the last argument with a special flag
    let printedExpanded;
    let i = 0;
    path$$1.each(argPath => {
      if (shouldGroupFirst && i === 0) {
        printedExpanded = [
          concat([
            argPath.call(p => print(p, { expandFirstArg: true })),
            printedArguments.length > 1 ? "," : "",
            hasEmptyLineFollowingFirstArg ? hardline : line,
            hasEmptyLineFollowingFirstArg ? hardline : ""
          ])
        ].concat(printedArguments.slice(1));
      }
      if (shouldGroupLast && i === args.length - 1) {
        printedExpanded = printedArguments
          .slice(0, -1)
          .concat(argPath.call(p => print(p, { expandLastArg: true })));
      }
      i++;
    }, "arguments");

    const somePrintedArgumentsWillBreak = printedArguments.some(willBreak);

    const maybeTrailingComma = shouldPrintComma(options$$1, "all") ? "," : "";

    return concat([
      somePrintedArgumentsWillBreak ? breakParent : "",
      conditionalGroup(
        [
          concat([
            ifBreak(
              indent(concat(["(", softline, concat(printedExpanded)])),
              concat(["(", concat(printedExpanded)])
            ),
            somePrintedArgumentsWillBreak
              ? concat([ifBreak(maybeTrailingComma), softline])
              : "",
            ")"
          ]),
          shouldGroupFirst
            ? concat([
                "(",
                group(printedExpanded[0], { shouldBreak: true }),
                concat(printedExpanded.slice(1)),
                ")"
              ])
            : concat([
                "(",
                concat(printedArguments.slice(0, -1)),
                group(util$1.getLast(printedExpanded), {
                  shouldBreak: true
                }),
                ")"
              ]),
          group(
            concat([
              "(",
              indent(concat([line, concat(printedArguments)])),
              maybeTrailingComma,
              line,
              ")"
            ]),
            { shouldBreak: true }
          )
        ],
        { shouldBreak }
      )
    ]);
  }

  return group(
    concat([
      "(",
      indent(concat([softline, concat(printedArguments)])),
      ifBreak(shouldPrintComma(options$$1, "all") ? "," : ""),
      softline,
      ")"
    ]),
    { shouldBreak: printedArguments.some(willBreak) || anyArgEmptyLine }
  );
}

function printTypeAnnotation(path$$1, options$$1, print) {
  const node = path$$1.getValue();
  if (!node.typeAnnotation) {
    return "";
  }

  const parentNode = path$$1.getParentNode();
  const isFunctionDeclarationIdentifier =
    parentNode.type === "DeclareFunction" && parentNode.id === node;

  if (isFlowAnnotationComment(options$$1.originalText, node.typeAnnotation)) {
    return concat([" /*: ", path$$1.call(print, "typeAnnotation"), " */"]);
  }

  return concat([
    isFunctionDeclarationIdentifier ? "" : ": ",
    path$$1.call(print, "typeAnnotation")
  ]);
}

function printFunctionTypeParameters(path$$1, options$$1, print) {
  const fun = path$$1.getValue();
  if (fun.typeParameters) {
    return path$$1.call(print, "typeParameters");
  }
  return "";
}

function printFunctionParams(path$$1, print, options$$1, expandArg, printTypeParams) {
  const fun = path$$1.getValue();
  const paramsField = fun.parameters ? "parameters" : "params";

  const typeParams = printTypeParams
    ? printFunctionTypeParameters(path$$1, options$$1, print)
    : "";

  let printed = [];
  if (fun[paramsField]) {
    printed = path$$1.map(print, paramsField);
  }

  if (fun.rest) {
    printed.push(concat(["...", path$$1.call(print, "rest")]));
  }

  if (printed.length === 0) {
    return concat([
      typeParams,
      "(",
      comments.printDanglingComments(
        path$$1,
        options$$1,
        /* sameIndent */ true,
        comment =>
          util$1.getNextNonSpaceNonCommentCharacter(
            options$$1.originalText,
            comment
          ) === ")"
      ),
      ")"
    ]);
  }

  const lastParam = util$1.getLast(fun[paramsField]);

  // If the parent is a call with the first/last argument expansion and this is the
  // params of the first/last argument, we dont want the arguments to break and instead
  // want the whole expression to be on a new line.
  //
  // Good:                 Bad:
  //   verylongcall(         verylongcall((
  //     (a, b) => {           a,
  //     }                     b,
  //   })                    ) => {
  //                         })
  if (
    expandArg &&
    !(fun[paramsField] && fun[paramsField].some(n => n.comments))
  ) {
    return group(
      concat([
        docUtils.removeLines(typeParams),
        "(",
        join(", ", printed.map(docUtils.removeLines)),
        ")"
      ])
    );
  }

  // Single object destructuring should hug
  //
  // function({
  //   a,
  //   b,
  //   c
  // }) {}
  if (shouldHugArguments(fun)) {
    return concat([typeParams, "(", join(", ", printed), ")"]);
  }

  const parent = path$$1.getParentNode();

  // don't break in specs, eg; `it("should maintain parens around done even when long", (done) => {})`
  if (parent.type === "CallExpression" && isTestCall(parent)) {
    return concat([typeParams, "(", join(", ", printed), ")"]);
  }

  const flowTypeAnnotations = [
    "AnyTypeAnnotation",
    "NullLiteralTypeAnnotation",
    "GenericTypeAnnotation",
    "ThisTypeAnnotation",
    "NumberTypeAnnotation",
    "VoidTypeAnnotation",
    "EmptyTypeAnnotation",
    "MixedTypeAnnotation",
    "BooleanTypeAnnotation",
    "BooleanLiteralTypeAnnotation",
    "StringTypeAnnotation"
  ];

  const isFlowShorthandWithOneArg =
    (isObjectTypePropertyAFunction(parent) ||
      isTypeAnnotationAFunction(parent) ||
      parent.type === "TypeAlias" ||
      parent.type === "UnionTypeAnnotation" ||
      parent.type === "TSUnionType" ||
      parent.type === "IntersectionTypeAnnotation" ||
      (parent.type === "FunctionTypeAnnotation" &&
        parent.returnType === fun)) &&
    fun[paramsField].length === 1 &&
    fun[paramsField][0].name === null &&
    fun[paramsField][0].typeAnnotation &&
    fun.typeParameters === null &&
    flowTypeAnnotations.indexOf(fun[paramsField][0].typeAnnotation.type) !==
      -1 &&
    !(
      fun[paramsField][0].typeAnnotation.type === "GenericTypeAnnotation" &&
      fun[paramsField][0].typeAnnotation.typeParameters
    ) &&
    !fun.rest;

  if (isFlowShorthandWithOneArg) {
    if (options$$1.arrowParens === "always") {
      return concat(["(", concat(printed), ")"]);
    }
    return concat(printed);
  }

  const canHaveTrailingComma =
    !(lastParam && lastParam.type === "RestElement") && !fun.rest;

  return concat([
    typeParams,
    "(",
    indent(concat([softline, join(concat([",", line]), printed)])),
    ifBreak(
      canHaveTrailingComma && shouldPrintComma(options$$1, "all") ? "," : ""
    ),
    softline,
    ")"
  ]);
}

function shouldPrintParamsWithoutParens(path$$1, options$$1) {
  if (options$$1.arrowParens === "always") {
    return false;
  }

  if (options$$1.arrowParens === "avoid") {
    const node = path$$1.getValue();
    return canPrintParamsWithoutParens(node);
  }

  // Fallback default; should be unreachable
  return false;
}

function canPrintParamsWithoutParens(node) {
  return (
    node.params.length === 1 &&
    !node.rest &&
    !node.typeParameters &&
    !hasDanglingComments(node) &&
    node.params[0].type === "Identifier" &&
    !node.params[0].typeAnnotation &&
    !node.params[0].comments &&
    !node.params[0].optional &&
    !node.predicate &&
    !node.returnType
  );
}

function printFunctionDeclaration(path$$1, print, options$$1) {
  const n = path$$1.getValue();
  const parts = [];

  if (n.async) {
    parts.push("async ");
  }

  parts.push("function");

  if (n.generator) {
    parts.push("*");
  }
  if (n.id) {
    parts.push(" ", path$$1.call(print, "id"));
  }

  parts.push(
    printFunctionTypeParameters(path$$1, options$$1, print),
    group(
      concat([
        printFunctionParams(path$$1, print, options$$1),
        printReturnType(path$$1, print, options$$1)
      ])
    ),
    n.body ? " " : "",
    path$$1.call(print, "body")
  );

  return concat(parts);
}

function printObjectMethod(path$$1, options$$1, print) {
  const objMethod = path$$1.getValue();
  const parts = [];

  if (objMethod.async) {
    parts.push("async ");
  }
  if (objMethod.generator) {
    parts.push("*");
  }
  if (
    objMethod.method ||
    objMethod.kind === "get" ||
    objMethod.kind === "set"
  ) {
    return printMethod(path$$1, options$$1, print);
  }

  const key = printPropertyKey(path$$1, options$$1, print);

  if (objMethod.computed) {
    parts.push("[", key, "]");
  } else {
    parts.push(key);
  }

  parts.push(
    printFunctionTypeParameters(path$$1, options$$1, print),
    group(
      concat([
        printFunctionParams(path$$1, print, options$$1),
        printReturnType(path$$1, print, options$$1)
      ])
    ),
    " ",
    path$$1.call(print, "body")
  );

  return concat(parts);
}

function printReturnType(path$$1, print, options$$1) {
  const n = path$$1.getValue();
  const returnType = path$$1.call(print, "returnType");

  if (
    n.returnType &&
    isFlowAnnotationComment(options$$1.originalText, n.returnType)
  ) {
    return concat([" /*: ", returnType, " */"]);
  }

  const parts = [returnType];

  // prepend colon to TypeScript type annotation
  if (n.returnType && n.returnType.typeAnnotation) {
    parts.unshift(": ");
  }

  if (n.predicate) {
    // The return type will already add the colon, but otherwise we
    // need to do it ourselves
    parts.push(n.returnType ? " " : ": ", path$$1.call(print, "predicate"));
  }

  return concat(parts);
}

function printExportDeclaration(path$$1, options$$1, print) {
  const decl = path$$1.getValue();
  const semi = options$$1.semi ? ";" : "";
  const parts = ["export "];

  if (decl["default"] || decl.type === "ExportDefaultDeclaration") {
    parts.push("default ");
  }

  parts.push(
    comments.printDanglingComments(path$$1, options$$1, /* sameIndent */ true)
  );

  if (decl.declaration) {
    parts.push(path$$1.call(print, "declaration"));

    if (
      decl.type === "ExportDefaultDeclaration" &&
      (decl.declaration.type !== "ClassDeclaration" &&
        decl.declaration.type !== "FunctionDeclaration" &&
        decl.declaration.type !== "TSAbstractClassDeclaration")
    ) {
      parts.push(semi);
    }
  } else {
    if (decl.specifiers && decl.specifiers.length > 0) {
      const specifiers = [];
      const defaultSpecifiers = [];
      const namespaceSpecifiers = [];
      path$$1.each(specifierPath => {
        const specifierType = path$$1.getValue().type;
        if (specifierType === "ExportSpecifier") {
          specifiers.push(print(specifierPath));
        } else if (specifierType === "ExportDefaultSpecifier") {
          defaultSpecifiers.push(print(specifierPath));
        } else if (specifierType === "ExportNamespaceSpecifier") {
          namespaceSpecifiers.push(concat(["* as ", print(specifierPath)]));
        }
      }, "specifiers");

      const isNamespaceFollowed =
        namespaceSpecifiers.length !== 0 && specifiers.length !== 0;

      const isDefaultFollowed =
        defaultSpecifiers.length !== 0 &&
        (namespaceSpecifiers.length !== 0 || specifiers.length !== 0);

      parts.push(
        decl.exportKind === "type" ? "type " : "",
        concat(defaultSpecifiers),
        concat([isDefaultFollowed ? ", " : ""]),
        concat(namespaceSpecifiers),
        concat([isNamespaceFollowed ? ", " : ""]),
        specifiers.length !== 0
          ? group(
              concat([
                "{",
                indent(
                  concat([
                    options$$1.bracketSpacing ? line : softline,
                    join(concat([",", line]), specifiers)
                  ])
                ),
                ifBreak(shouldPrintComma(options$$1) ? "," : ""),
                options$$1.bracketSpacing ? line : softline,
                "}"
              ])
            )
          : ""
      );
    } else {
      parts.push("{}");
    }

    if (decl.source) {
      parts.push(" from ", path$$1.call(print, "source"));
    }

    parts.push(semi);
  }

  return concat(parts);
}

function printFlowDeclaration(path$$1, parts) {
  const parentExportDecl = util$1.getParentExportDeclaration(path$$1);

  if (parentExportDecl) {
    assert.strictEqual(parentExportDecl.type, "DeclareExportDeclaration");
  } else {
    // If the parent node has type DeclareExportDeclaration, then it
    // will be responsible for printing the "declare" token. Otherwise
    // it needs to be printed with this non-exported declaration node.
    parts.unshift("declare ");
  }

  return concat(parts);
}

function getFlowVariance(path$$1) {
  if (!path$$1.variance) {
    return null;
  }

  // Babylon 7.0 currently uses variance node type, and flow should
  // follow suit soon:
  // https://github.com/babel/babel/issues/4722
  const variance = path$$1.variance.kind || path$$1.variance;

  switch (variance) {
    case "plus":
      return "+";
    case "minus":
      return "-";
    default:
      /* istanbul ignore next */
      return variance;
  }
}

function printTypeScriptModifiers(path$$1, options$$1, print) {
  const n = path$$1.getValue();
  if (!n.modifiers || !n.modifiers.length) {
    return "";
  }
  return concat([join(" ", path$$1.map(print, "modifiers")), " "]);
}

function printTypeParameters(path$$1, options$$1, print, paramsKey) {
  const n = path$$1.getValue();

  if (!n[paramsKey]) {
    return "";
  }

  // for TypeParameterDeclaration typeParameters is a single node
  if (!Array.isArray(n[paramsKey])) {
    return path$$1.call(print, paramsKey);
  }

  const grandparent = path$$1.getNode(2);

  const isParameterInTestCall =
    grandparent != null &&
    grandparent.type === "CallExpression" &&
    isTestCall(grandparent);

  const shouldInline =
    isParameterInTestCall ||
    n[paramsKey].length === 0 ||
    (n[paramsKey].length === 1 &&
      (shouldHugType(n[paramsKey][0]) ||
        (n[paramsKey][0].type === "GenericTypeAnnotation" &&
          shouldHugType(n[paramsKey][0].id)) ||
        (n[paramsKey][0].type === "TSTypeReference" &&
          shouldHugType(n[paramsKey][0].typeName)) ||
        n[paramsKey][0].type === "NullableTypeAnnotation"));

  if (shouldInline) {
    return concat(["<", join(", ", path$$1.map(print, paramsKey)), ">"]);
  }

  return group(
    concat([
      "<",
      indent(
        concat([
          softline,
          join(concat([",", line]), path$$1.map(print, paramsKey))
        ])
      ),
      ifBreak(
        options$$1.parser !== "typescript" && shouldPrintComma(options$$1, "all")
          ? ","
          : ""
      ),
      softline,
      ">"
    ])
  );
}

function printClass(path$$1, options$$1, print) {
  const n = path$$1.getValue();
  const parts = [];

  if (n.type === "TSAbstractClassDeclaration") {
    parts.push("abstract ");
  }

  parts.push("class");

  if (n.id) {
    parts.push(" ", path$$1.call(print, "id"));
  }

  parts.push(path$$1.call(print, "typeParameters"));

  const partsGroup = [];
  if (n.superClass) {
    const printed = concat([
      "extends ",
      path$$1.call(print, "superClass"),
      path$$1.call(print, "superTypeParameters")
    ]);
    // Keep old behaviour of extends in same line
    // If there is only on extends and there are not comments
    if (
      (!n.implements || n.implements.length === 0) &&
      (!n.superClass.comments || n.superClass.comments.length === 0)
    ) {
      parts.push(
        concat([
          " ",
          path$$1.call(
            superClass =>
              comments.printComments(superClass, () => printed, options$$1),
            "superClass"
          )
        ])
      );
    } else {
      partsGroup.push(
        group(
          concat([
            line,
            path$$1.call(
              superClass =>
                comments.printComments(superClass, () => printed, options$$1),
              "superClass"
            )
          ])
        )
      );
    }
  } else if (n.extends && n.extends.length > 0) {
    parts.push(" extends ", join(", ", path$$1.map(print, "extends")));
  }

  if (n["implements"] && n["implements"].length > 0) {
    partsGroup.push(
      line,
      "implements",
      group(
        indent(
          concat([
            line,
            join(concat([",", line]), path$$1.map(print, "implements"))
          ])
        )
      )
    );
  }

  if (n["mixins"] && n["mixins"].length > 0) {
    partsGroup.push(
      line,
      "mixins ",
      group(indent(join(concat([",", line]), path$$1.map(print, "mixins"))))
    );
  }

  if (partsGroup.length > 0) {
    parts.push(group(indent(concat(partsGroup))));
  }

  if (
    n.body &&
    n.body.comments &&
    hasLeadingOwnLineComment(options$$1.originalText, n.body)
  ) {
    parts.push(hardline);
  } else {
    parts.push(" ");
  }
  parts.push(path$$1.call(print, "body"));

  return parts;
}

function printOptionalToken(path$$1) {
  const node = path$$1.getValue();
  if (!node.optional) {
    return "";
  }
  if (
    node.type === "CallExpression" ||
    (node.type === "MemberExpression" && node.computed)
  ) {
    return "?.";
  }
  return "?";
}

function printMemberLookup(path$$1, options$$1, print) {
  const property = path$$1.call(print, "property");
  const n = path$$1.getValue();
  const optional = printOptionalToken(path$$1);

  if (!n.computed) {
    return concat([optional, ".", property]);
  }

  if (!n.property || isNumericLiteral(n.property)) {
    return concat([optional, "[", property, "]"]);
  }

  return group(
    concat([optional, "[", indent(concat([softline, property])), softline, "]"])
  );
}

function printBindExpressionCallee(path$$1, options$$1, print) {
  return concat(["::", path$$1.call(print, "callee")]);
}

// We detect calls on member expressions specially to format a
// common pattern better. The pattern we are looking for is this:
//
// arr
//   .map(x => x + 1)
//   .filter(x => x > 10)
//   .some(x => x % 2)
//
// The way it is structured in the AST is via a nested sequence of
// MemberExpression and CallExpression. We need to traverse the AST
// and make groups out of it to print it in the desired way.
function printMemberChain(path$$1, options$$1, print) {
  // The first phase is to linearize the AST by traversing it down.
  //
  //   a().b()
  // has the following AST structure:
  //   CallExpression(MemberExpression(CallExpression(Identifier)))
  // and we transform it into
  //   [Identifier, CallExpression, MemberExpression, CallExpression]
  const printedNodes = [];

  // Here we try to retain one typed empty line after each call expression or
  // the first group whether it is in parentheses or not
  function shouldInsertEmptyLineAfter(node) {
    const originalText = options$$1.originalText;
    const nextCharIndex = util$1.getNextNonSpaceNonCommentCharacterIndex(
      originalText,
      node
    );
    const nextChar = originalText.charAt(nextCharIndex);

    // if it is cut off by a parenthesis, we only account for one typed empty
    // line after that parenthesis
    if (nextChar == ")") {
      return util$1.isNextLineEmptyAfterIndex(originalText, nextCharIndex + 1);
    }

    return util$1.isNextLineEmpty(originalText, node);
  }

  function rec(path$$1) {
    const node = path$$1.getValue();
    if (
      node.type === "CallExpression" &&
      (isMemberish(node.callee) || node.callee.type === "CallExpression")
    ) {
      printedNodes.unshift({
        node: node,
        printed: concat([
          comments.printComments(
            path$$1,
            () =>
              concat([
                printOptionalToken(path$$1),
                printFunctionTypeParameters(path$$1, options$$1, print),
                printArgumentsList(path$$1, options$$1, print)
              ]),
            options$$1
          ),
          shouldInsertEmptyLineAfter(node) ? hardline : ""
        ])
      });
      path$$1.call(callee => rec(callee), "callee");
    } else if (isMemberish(node)) {
      printedNodes.unshift({
        node: node,
        printed: comments.printComments(
          path$$1,
          () =>
            node.type === "MemberExpression"
              ? printMemberLookup(path$$1, options$$1, print)
              : printBindExpressionCallee(path$$1, options$$1, print),
          options$$1
        )
      });
      path$$1.call(object => rec(object), "object");
    } else {
      printedNodes.unshift({
        node: node,
        printed: path$$1.call(print)
      });
    }
  }
  // Note: the comments of the root node have already been printed, so we
  // need to extract this first call without printing them as they would
  // if handled inside of the recursive call.
  const node = path$$1.getValue();
  printedNodes.unshift({
    node,
    printed: concat([
      printOptionalToken(path$$1),
      printFunctionTypeParameters(path$$1, options$$1, print),
      printArgumentsList(path$$1, options$$1, print)
    ])
  });
  path$$1.call(callee => rec(callee), "callee");

  // Once we have a linear list of printed nodes, we want to create groups out
  // of it.
  //
  //   a().b.c().d().e
  // will be grouped as
  //   [
  //     [Identifier, CallExpression],
  //     [MemberExpression, MemberExpression, CallExpression],
  //     [MemberExpression, CallExpression],
  //     [MemberExpression],
  //   ]
  // so that we can print it as
  //   a()
  //     .b.c()
  //     .d()
  //     .e

  // The first group is the first node followed by
  //   - as many CallExpression as possible
  //       < fn()()() >.something()
  //   - as many array acessors as possible
  //       < fn()[0][1][2] >.something()
  //   - then, as many MemberExpression as possible but the last one
  //       < this.items >.something()
  const groups = [];
  let currentGroup = [printedNodes[0]];
  let i = 1;
  for (; i < printedNodes.length; ++i) {
    if (
      printedNodes[i].node.type === "CallExpression" ||
      (printedNodes[i].node.type === "MemberExpression" &&
        printedNodes[i].node.computed &&
        isNumericLiteral(printedNodes[i].node.property))
    ) {
      currentGroup.push(printedNodes[i]);
    } else {
      break;
    }
  }
  if (printedNodes[0].node.type !== "CallExpression") {
    for (; i + 1 < printedNodes.length; ++i) {
      if (
        isMemberish(printedNodes[i].node) &&
        isMemberish(printedNodes[i + 1].node)
      ) {
        currentGroup.push(printedNodes[i]);
      } else {
        break;
      }
    }
  }
  groups.push(currentGroup);
  currentGroup = [];

  // Then, each following group is a sequence of MemberExpression followed by
  // a sequence of CallExpression. To compute it, we keep adding things to the
  // group until we has seen a CallExpression in the past and reach a
  // MemberExpression
  let hasSeenCallExpression = false;
  for (; i < printedNodes.length; ++i) {
    if (hasSeenCallExpression && isMemberish(printedNodes[i].node)) {
      // [0] should be appended at the end of the group instead of the
      // beginning of the next one
      if (
        printedNodes[i].node.computed &&
        isNumericLiteral(printedNodes[i].node.property)
      ) {
        currentGroup.push(printedNodes[i]);
        continue;
      }

      groups.push(currentGroup);
      currentGroup = [];
      hasSeenCallExpression = false;
    }

    if (printedNodes[i].node.type === "CallExpression") {
      hasSeenCallExpression = true;
    }
    currentGroup.push(printedNodes[i]);

    if (
      printedNodes[i].node.comments &&
      printedNodes[i].node.comments.some(comment => comment.trailing)
    ) {
      groups.push(currentGroup);
      currentGroup = [];
      hasSeenCallExpression = false;
    }
  }
  if (currentGroup.length > 0) {
    groups.push(currentGroup);
  }

  // There are cases like Object.keys(), Observable.of(), _.values() where
  // they are the subject of all the chained calls and therefore should
  // be kept on the same line:
  //
  //   Object.keys(items)
  //     .filter(x => x)
  //     .map(x => x)
  //
  // In order to detect those cases, we use an heuristic: if the first
  // node is just an identifier with the name starting with a capital
  // letter, just a sequence of _$ or this. The rationale is that they are
  // likely to be factories.
  function isFactory(name) {
    return name.match(/(^[A-Z])|^[_$]+$/);
  }
  const shouldMerge =
    groups.length >= 2 &&
    !groups[1][0].node.comments &&
    ((groups[0].length === 1 &&
      (groups[0][0].node.type === "ThisExpression" ||
        (groups[0][0].node.type === "Identifier" &&
          (isFactory(groups[0][0].node.name) ||
            (groups[1].length && groups[1][0].node.computed))))) ||
      (groups[0].length > 1 &&
        groups[0][groups[0].length - 1].node.type === "MemberExpression" &&
        groups[0][groups[0].length - 1].node.property.type === "Identifier" &&
        (isFactory(groups[0][groups[0].length - 1].node.property.name) ||
          (groups[1].length && groups[1][0].node.computed))));

  function printGroup(printedGroup) {
    return concat(printedGroup.map(tuple => tuple.printed));
  }

  function printIndentedGroup(groups) {
    if (groups.length === 0) {
      return "";
    }
    return indent(
      group(concat([hardline, join(hardline, groups.map(printGroup))]))
    );
  }

  const printedGroups = groups.map(printGroup);
  const oneLine = concat(printedGroups);

  const cutoff = shouldMerge ? 3 : 2;
  const flatGroups = groups
    .slice(0, cutoff)
    .reduce((res, group) => res.concat(group), []);

  const hasComment =
    flatGroups.slice(1, -1).some(node => hasLeadingComment(node.node)) ||
    flatGroups.slice(0, -1).some(node => hasTrailingComment(node.node)) ||
    (groups[cutoff] && hasLeadingComment(groups[cutoff][0].node));

  // If we only have a single `.`, we shouldn't do anything fancy and just
  // render everything concatenated together.
  if (groups.length <= cutoff && !hasComment) {
    return group(oneLine);
  }

  // Find out the last node in the first group and check if it has an
  // empty line after
  const lastNodeBeforeIndent = util$1.getLast(
    shouldMerge ? groups.slice(1, 2)[0] : groups[0]
  ).node;
  const shouldHaveEmptyLineBeforeIndent =
    lastNodeBeforeIndent.type !== "CallExpression" &&
    shouldInsertEmptyLineAfter(lastNodeBeforeIndent);

  const expanded = concat([
    printGroup(groups[0]),
    shouldMerge ? concat(groups.slice(1, 2).map(printGroup)) : "",
    shouldHaveEmptyLineBeforeIndent ? hardline : "",
    printIndentedGroup(groups.slice(shouldMerge ? 2 : 1))
  ]);

  const callExpressionCount = printedNodes.filter(
    tuple => tuple.node.type === "CallExpression"
  ).length;

  // We don't want to print in one line if there's:
  //  * A comment.
  //  * 3 or more chained calls.
  //  * Any group but the last one has a hard line.
  // If the last group is a function it's okay to inline if it fits.
  if (
    hasComment ||
    callExpressionCount >= 3 ||
    printedGroups.slice(0, -1).some(willBreak)
  ) {
    return group(expanded);
  }

  return concat([
    // We only need to check `oneLine` because if `expanded` is chosen
    // that means that the parent group has already been broken
    // naturally
    willBreak(oneLine) || shouldHaveEmptyLineBeforeIndent ? breakParent : "",
    conditionalGroup([oneLine, expanded])
  ]);
}

function isJSXNode(node) {
  return (
    node.type === "JSXElement" ||
    node.type === "JSXFragment" ||
    node.type === "TSJsxFragment"
  );
}

function isEmptyJSXElement(node) {
  if (node.children.length === 0) {
    return true;
  }
  if (node.children.length > 1) {
    return false;
  }

  // if there is one text child and does not contain any meaningful text
  // we can treat the element as empty.
  const child = node.children[0];
  return isLiteral(child) && !isMeaningfulJSXText(child);
}

// Only space, newline, carriage return, and tab are treated as whitespace
// inside JSX.
const jsxWhitespaceChars = " \n\r\t";
const containsNonJsxWhitespaceRegex = new RegExp(
  "[^" + jsxWhitespaceChars + "]"
);
const matchJsxWhitespaceRegex = new RegExp("([" + jsxWhitespaceChars + "]+)");

// Meaningful if it contains non-whitespace characters,
// or it contains whitespace without a new line.
function isMeaningfulJSXText(node) {
  return (
    isLiteral(node) &&
    (containsNonJsxWhitespaceRegex.test(rawText(node)) ||
      !/\n/.test(rawText(node)))
  );
}

function conditionalExpressionChainContainsJSX(node) {
  return Boolean(getConditionalChainContents(node).find(isJSXNode));
}

// If we have nested conditional expressions, we want to print them in JSX mode
// if there's at least one JSXElement somewhere in the tree.
//
// A conditional expression chain like this should be printed in normal mode,
// because there aren't JSXElements anywhere in it:
//
// isA ? "A" : isB ? "B" : isC ? "C" : "Unknown";
//
// But a conditional expression chain like this should be printed in JSX mode,
// because there is a JSXElement in the last ConditionalExpression:
//
// isA ? "A" : isB ? "B" : isC ? "C" : <span className="warning">Unknown</span>;
//
// This type of ConditionalExpression chain is structured like this in the AST:
//
// ConditionalExpression {
//   test: ...,
//   consequent: ...,
//   alternate: ConditionalExpression {
//     test: ...,
//     consequent: ...,
//     alternate: ConditionalExpression {
//       test: ...,
//       consequent: ...,
//       alternate: ...,
//     }
//   }
// }
//
// We want to traverse over that shape and convert it into a flat structure so
// that we can find if there's a JSXElement somewhere inside.
function getConditionalChainContents(node) {
  // Given this code:
  //
  // // Using a ConditionalExpression as the consequent is uncommon, but should
  // // be handled.
  // A ? B : C ? D : E ? F ? G : H : I
  //
  // which has this AST:
  //
  // ConditionalExpression {
  //   test: Identifier(A),
  //   consequent: Identifier(B),
  //   alternate: ConditionalExpression {
  //     test: Identifier(C),
  //     consequent: Identifier(D),
  //     alternate: ConditionalExpression {
  //       test: Identifier(E),
  //       consequent: ConditionalExpression {
  //         test: Identifier(F),
  //         consequent: Identifier(G),
  //         alternate: Identifier(H),
  //       },
  //       alternate: Identifier(I),
  //     }
  //   }
  // }
  //
  // we should return this Array:
  //
  // [
  //   Identifier(A),
  //   Identifier(B),
  //   Identifier(C),
  //   Identifier(D),
  //   Identifier(E),
  //   Identifier(F),
  //   Identifier(G),
  //   Identifier(H),
  //   Identifier(I)
  // ];
  //
  // This loses the information about whether each node was the test,
  // consequent, or alternate, but we don't care about that here- we are only
  // flattening this structure to find if there's any JSXElements inside.
  const nonConditionalExpressions = [];

  function recurse(node) {
    if (node.type === "ConditionalExpression") {
      recurse(node.test);
      recurse(node.consequent);
      recurse(node.alternate);
    } else {
      nonConditionalExpressions.push(node);
    }
  }
  recurse(node);

  return nonConditionalExpressions;
}

// Detect an expression node representing `{" "}`
function isJSXWhitespaceExpression(node) {
  return (
    node.type === "JSXExpressionContainer" &&
    isLiteral(node.expression) &&
    node.expression.value === " " &&
    !node.expression.comments
  );
}

// JSX Children are strange, mostly for two reasons:
// 1. JSX reads newlines into string values, instead of skipping them like JS
// 2. up to one whitespace between elements within a line is significant,
//    but not between lines.
//
// Leading, trailing, and lone whitespace all need to
// turn themselves into the rather ugly `{' '}` when breaking.
//
// We print JSX using the `fill` doc primitive.
// This requires that we give it an array of alternating
// content and whitespace elements.
// To ensure this we add dummy `""` content elements as needed.
function printJSXChildren(path$$1, options$$1, print, jsxWhitespace) {
  const n = path$$1.getValue();
  const children = [];

  // using `map` instead of `each` because it provides `i`
  path$$1.map((childPath, i) => {
    const child = childPath.getValue();
    if (isLiteral(child)) {
      const text = rawText(child);

      // Contains a non-whitespace character
      if (isMeaningfulJSXText(child)) {
        const words = text.split(matchJsxWhitespaceRegex);

        // Starts with whitespace
        if (words[0] === "") {
          children.push("");
          words.shift();
          if (/\n/.test(words[0])) {
            children.push(hardline);
          } else {
            children.push(jsxWhitespace);
          }
          words.shift();
        }

        let endWhitespace;
        // Ends with whitespace
        if (util$1.getLast(words) === "") {
          words.pop();
          endWhitespace = words.pop();
        }

        // This was whitespace only without a new line.
        if (words.length === 0) {
          return;
        }

        words.forEach((word, i) => {
          if (i % 2 === 1) {
            children.push(line);
          } else {
            children.push(word);
          }
        });

        if (endWhitespace !== undefined) {
          if (/\n/.test(endWhitespace)) {
            children.push(hardline);
          } else {
            children.push(jsxWhitespace);
          }
        } else {
          // Ideally this would be a `hardline` to allow a break between
          // tags and text.
          // Unfortunately Facebook have a custom translation pipeline
          // (https://github.com/prettier/prettier/issues/1581#issuecomment-300975032)
          // that uses the JSX syntax, but does not follow the React whitespace
          // rules.
          // Ensuring that we never have a break between tags and text in JSX
          // will allow Facebook to adopt Prettier without too much of an
          // adverse effect on formatting algorithm.
          children.push("");
        }
      } else if (/\n/.test(text)) {
        // Keep (up to one) blank line between tags/expressions/text.
        // Note: We don't keep blank lines between text elements.
        if (text.match(/\n/g).length > 1) {
          children.push("");
          children.push(hardline);
        }
      } else {
        children.push("");
        children.push(jsxWhitespace);
      }
    } else {
      const printedChild = print(childPath);
      children.push(printedChild);

      const next = n.children[i + 1];
      const directlyFollowedByMeaningfulText =
        next && isMeaningfulJSXText(next) && !/^[ \n\r\t]/.test(rawText(next));
      if (directlyFollowedByMeaningfulText) {
        // Potentially this could be a hardline as well.
        // See the comment above about the Facebook translation pipeline as
        // to why this is an empty string.
        children.push("");
      } else {
        children.push(hardline);
      }
    }
  }, "children");

  return children;
}

// JSX expands children from the inside-out, instead of the outside-in.
// This is both to break children before attributes,
// and to ensure that when children break, their parents do as well.
//
// Any element that is written without any newlines and fits on a single line
// is left that way.
// Not only that, any user-written-line containing multiple JSX siblings
// should also be kept on one line if possible,
// so each user-written-line is wrapped in its own group.
//
// Elements that contain newlines or don't fit on a single line (recursively)
// are fully-split, using hardline and shouldBreak: true.
//
// To support that case properly, all leading and trailing spaces
// are stripped from the list of children, and replaced with a single hardline.
function printJSXElement(path$$1, options$$1, print) {
  const n = path$$1.getValue();

  // Turn <div></div> into <div />
  if (n.type === "JSXElement" && isEmptyJSXElement(n)) {
    n.openingElement.selfClosing = true;
    return path$$1.call(print, "openingElement");
  }

  const openingLines =
    n.type === "JSXElement"
      ? path$$1.call(print, "openingElement")
      : path$$1.call(print, "openingFragment");
  const closingLines =
    n.type === "JSXElement"
      ? path$$1.call(print, "closingElement")
      : path$$1.call(print, "closingFragment");

  if (
    n.children.length === 1 &&
    n.children[0].type === "JSXExpressionContainer" &&
    (n.children[0].expression.type === "TemplateLiteral" ||
      n.children[0].expression.type === "TaggedTemplateExpression")
  ) {
    return concat([
      openingLines,
      concat(path$$1.map(print, "children")),
      closingLines
    ]);
  }

  // Convert `{" "}` to text nodes containing a space.
  // This makes it easy to turn them into `jsxWhitespace` which
  // can then print as either a space or `{" "}` when breaking.
  n.children = n.children.map(child => {
    if (isJSXWhitespaceExpression(child)) {
      return {
        type: "JSXText",
        value: " ",
        raw: " "
      };
    }
    return child;
  });

  const containsTag = n.children.filter(isJSXNode).length > 0;
  const containsMultipleExpressions =
    n.children.filter(child => child.type === "JSXExpressionContainer").length >
    1;
  const containsMultipleAttributes =
    n.type === "JSXElement" && n.openingElement.attributes.length > 1;

  // Record any breaks. Should never go from true to false, only false to true.
  let forcedBreak =
    willBreak(openingLines) ||
    containsTag ||
    containsMultipleAttributes ||
    containsMultipleExpressions;

  const rawJsxWhitespace = options$$1.singleQuote ? "{' '}" : '{" "}';
  const jsxWhitespace = ifBreak(concat([rawJsxWhitespace, softline]), " ");

  const children = printJSXChildren(path$$1, options$$1, print, jsxWhitespace);

  const containsText =
    n.children.filter(child => isMeaningfulJSXText(child)).length > 0;

  // We can end up we multiple whitespace elements with empty string
  // content between them.
  // We need to remove empty whitespace and softlines before JSX whitespace
  // to get the correct output.
  for (let i = children.length - 2; i >= 0; i--) {
    const isPairOfEmptyStrings = children[i] === "" && children[i + 1] === "";
    const isPairOfHardlines =
      children[i] === hardline &&
      children[i + 1] === "" &&
      children[i + 2] === hardline;
    const isLineFollowedByJSXWhitespace =
      (children[i] === softline || children[i] === hardline) &&
      children[i + 1] === "" &&
      children[i + 2] === jsxWhitespace;
    const isJSXWhitespaceFollowedByLine =
      children[i] === jsxWhitespace &&
      children[i + 1] === "" &&
      (children[i + 2] === softline || children[i + 2] === hardline);
    const isDoubleJSXWhitespace =
      children[i] === jsxWhitespace &&
      children[i + 1] === "" &&
      children[i + 2] === jsxWhitespace;

    if (
      (isPairOfHardlines && containsText) ||
      isPairOfEmptyStrings ||
      isLineFollowedByJSXWhitespace ||
      isDoubleJSXWhitespace
    ) {
      children.splice(i, 2);
    } else if (isJSXWhitespaceFollowedByLine) {
      children.splice(i + 1, 2);
    }
  }

  // Trim trailing lines (or empty strings)
  while (
    children.length &&
    (isLineNext(util$1.getLast(children)) || isEmpty(util$1.getLast(children)))
  ) {
    children.pop();
  }

  // Trim leading lines (or empty strings)
  while (
    children.length &&
    (isLineNext(children[0]) || isEmpty(children[0])) &&
    (isLineNext(children[1]) || isEmpty(children[1]))
  ) {
    children.shift();
    children.shift();
  }

  // Tweak how we format children if outputting this element over multiple lines.
  // Also detect whether we will force this element to output over multiple lines.
  const multilineChildren = [];
  children.forEach((child, i) => {
    // There are a number of situations where we need to ensure we display
    // whitespace as `{" "}` when outputting this element over multiple lines.
    if (child === jsxWhitespace) {
      if (i === 1 && children[i - 1] === "") {
        if (children.length === 2) {
          // Solitary whitespace
          multilineChildren.push(rawJsxWhitespace);
          return;
        }
        // Leading whitespace
        multilineChildren.push(concat([rawJsxWhitespace, hardline]));
        return;
      } else if (i === children.length - 1) {
        // Trailing whitespace
        multilineChildren.push(rawJsxWhitespace);
        return;
      } else if (children[i - 1] === "" && children[i - 2] === hardline) {
        // Whitespace after line break
        multilineChildren.push(rawJsxWhitespace);
        return;
      }
    }

    multilineChildren.push(child);

    if (willBreak(child)) {
      forcedBreak = true;
    }
  });

  // If there is text we use `fill` to fit as much onto each line as possible.
  // When there is no text (just tags and expressions) we use `group`
  // to output each on a separate line.
  const content = containsText
    ? fill(multilineChildren)
    : group(concat(multilineChildren), { shouldBreak: true });

  const multiLineElem = group(
    concat([
      openingLines,
      indent(concat([hardline, content])),
      hardline,
      closingLines
    ])
  );

  if (forcedBreak) {
    return multiLineElem;
  }

  return conditionalGroup([
    group(concat([openingLines, concat(children), closingLines])),
    multiLineElem
  ]);
}

function maybeWrapJSXElementInParens(path$$1, elem) {
  const parent = path$$1.getParentNode();
  if (!parent) {
    return elem;
  }

  const NO_WRAP_PARENTS = {
    ArrayExpression: true,
    JSXAttribute: true,
    JSXElement: true,
    JSXExpressionContainer: true,
    JSXFragment: true,
    TSJsxFragment: true,
    ExpressionStatement: true,
    CallExpression: true,
    ConditionalExpression: true
  };
  if (NO_WRAP_PARENTS[parent.type]) {
    return elem;
  }

  return group(
    concat([
      ifBreak("("),
      indent(concat([softline, elem])),
      softline,
      ifBreak(")")
    ])
  );
}

function isBinaryish(node) {
  return node.type === "BinaryExpression" || node.type === "LogicalExpression";
}

function isMemberish(node) {
  return (
    node.type === "MemberExpression" ||
    (node.type === "BindExpression" && node.object)
  );
}

function shouldInlineLogicalExpression(node) {
  if (node.type !== "LogicalExpression") {
    return false;
  }

  if (
    node.right.type === "ObjectExpression" &&
    node.right.properties.length !== 0
  ) {
    return true;
  }

  if (
    node.right.type === "ArrayExpression" &&
    node.right.elements.length !== 0
  ) {
    return true;
  }

  if (isJSXNode(node.right)) {
    return true;
  }

  return false;
}

// For binary expressions to be consistent, we need to group
// subsequent operators with the same precedence level under a single
// group. Otherwise they will be nested such that some of them break
// onto new lines but not all. Operators with the same precedence
// level should either all break or not. Because we group them by
// precedence level and the AST is structured based on precedence
// level, things are naturally broken up correctly, i.e. `&&` is
// broken before `+`.
function printBinaryishExpressions(
  path$$1,
  print,
  options$$1,
  isNested,
  isInsideParenthesis
) {
  let parts = [];
  const node = path$$1.getValue();

  // We treat BinaryExpression and LogicalExpression nodes the same.
  if (isBinaryish(node)) {
    // Put all operators with the same precedence level in the same
    // group. The reason we only need to do this with the `left`
    // expression is because given an expression like `1 + 2 - 3`, it
    // is always parsed like `((1 + 2) - 3)`, meaning the `left` side
    // is where the rest of the expression will exist. Binary
    // expressions on the right side mean they have a difference
    // precedence level and should be treated as a separate group, so
    // print them normally. (This doesn't hold for the `**` operator,
    // which is unique in that it is right-associative.)
    if (util$1.shouldFlatten(node.operator, node.left.operator)) {
      // Flatten them out by recursively calling this function.
      parts = parts.concat(
        path$$1.call(
          left =>
            printBinaryishExpressions(
              left,
              print,
              options$$1,
              /* isNested */ true,
              isInsideParenthesis
            ),
          "left"
        )
      );
    } else {
      parts.push(path$$1.call(print, "left"));
    }

    const shouldInline = shouldInlineLogicalExpression(node);
    const lineBeforeOperator = node.operator === "|>";

    const right = shouldInline
      ? concat([node.operator, " ", path$$1.call(print, "right")])
      : concat([
          lineBeforeOperator ? softline : "",
          node.operator,
          lineBeforeOperator ? " " : line,
          path$$1.call(print, "right")
        ]);

    // If there's only a single binary expression, we want to create a group
    // in order to avoid having a small right part like -1 be on its own line.
    const parent = path$$1.getParentNode();
    const shouldGroup =
      !(isInsideParenthesis && node.type === "LogicalExpression") &&
      parent.type !== node.type &&
      node.left.type !== node.type &&
      node.right.type !== node.type;

    parts.push(" ", shouldGroup ? group(right) : right);

    // The root comments are already printed, but we need to manually print
    // the other ones since we don't call the normal print on BinaryExpression,
    // only for the left and right parts
    if (isNested && node.comments) {
      parts = comments.printComments(path$$1, () => concat(parts), options$$1);
    }
  } else {
    // Our stopping case. Simply print the node normally.
    parts.push(path$$1.call(print));
  }

  return parts;
}

function printAssignmentRight(rightNode, printedRight, canBreak, options$$1) {
  if (hasLeadingOwnLineComment(options$$1.originalText, rightNode)) {
    return indent(concat([hardline, printedRight]));
  }

  if (canBreak) {
    return indent(concat([line, printedRight]));
  }

  return concat([" ", printedRight]);
}

function printAssignment(
  leftNode,
  printedLeft,
  operator,
  rightNode,
  printedRight,
  options$$1
) {
  if (!rightNode) {
    return printedLeft;
  }

  const canBreak =
    (isBinaryish(rightNode) && !shouldInlineLogicalExpression(rightNode)) ||
    (rightNode.type === "ConditionalExpression" &&
      isBinaryish(rightNode.test) &&
      !shouldInlineLogicalExpression(rightNode.test)) ||
    ((leftNode.type === "Identifier" ||
      isStringLiteral(leftNode) ||
      leftNode.type === "MemberExpression") &&
      (isStringLiteral(rightNode) || isMemberExpressionChain(rightNode)));

  const printed = printAssignmentRight(
    rightNode,
    printedRight,
    canBreak,
    options$$1
  );

  return group(concat([printedLeft, operator, printed]));
}

function adjustClause(node, clause, forceSpace) {
  if (node.type === "EmptyStatement") {
    return ";";
  }

  if (node.type === "BlockStatement" || forceSpace) {
    return concat([" ", clause]);
  }

  return indent(concat([line, clause]));
}

function nodeStr(node, options$$1, isFlowOrTypeScriptDirectiveLiteral) {
  const raw = rawText(node);
  const isDirectiveLiteral =
    isFlowOrTypeScriptDirectiveLiteral || node.type === "DirectiveLiteral";
  return util$1.printString(raw, options$$1, isDirectiveLiteral);
}

function printRegex(node) {
  const flags = node.flags
    .split("")
    .sort()
    .join("");
  return `/${node.pattern}/${flags}`;
}

function isLastStatement(path$$1) {
  const parent = path$$1.getParentNode();
  if (!parent) {
    return true;
  }
  const node = path$$1.getValue();
  const body = (parent.body || parent.consequent).filter(
    stmt => stmt.type !== "EmptyStatement"
  );
  return body && body[body.length - 1] === node;
}

function hasLeadingComment(node) {
  return node.comments && node.comments.some(comment => comment.leading);
}

function hasTrailingComment(node) {
  return node.comments && node.comments.some(comment => comment.trailing);
}

function hasLeadingOwnLineComment(text, node) {
  if (isJSXNode(node)) {
    return util$1.hasNodeIgnoreComment(node);
  }

  const res =
    node.comments &&
    node.comments.some(
      comment => comment.leading && util$1.hasNewline(text, util$1.locEnd(comment))
    );
  return res;
}

function hasNakedLeftSide(node) {
  return (
    node.type === "AssignmentExpression" ||
    node.type === "BinaryExpression" ||
    node.type === "LogicalExpression" ||
    node.type === "ConditionalExpression" ||
    node.type === "CallExpression" ||
    node.type === "MemberExpression" ||
    node.type === "SequenceExpression" ||
    node.type === "TaggedTemplateExpression" ||
    (node.type === "BindExpression" && !node.object) ||
    (node.type === "UpdateExpression" && !node.prefix)
  );
}

function isFlowAnnotationComment(text, typeAnnotation) {
  const start = util$1.locStart(typeAnnotation);
  const end = util$1.skipWhitespace(text, util$1.locEnd(typeAnnotation));
  return text.substr(start, 2) === "/*" && text.substr(end, 2) === "*/";
}

function getLeftSide(node) {
  if (node.expressions) {
    return node.expressions[0];
  }
  return (
    node.left ||
    node.test ||
    node.callee ||
    node.object ||
    node.tag ||
    node.argument ||
    node.expression
  );
}

function getLeftSidePathName(path$$1, node) {
  if (node.expressions) {
    return ["expressions", 0];
  }
  if (node.left) {
    return ["left"];
  }
  if (node.test) {
    return ["test"];
  }
  if (node.callee) {
    return ["callee"];
  }
  if (node.object) {
    return ["object"];
  }
  if (node.tag) {
    return ["tag"];
  }
  if (node.argument) {
    return ["argument"];
  }
  if (node.expression) {
    return ["expression"];
  }
  throw new Error("Unexpected node has no left side", node);
}

function exprNeedsASIProtection(path$$1, options$$1) {
  const node = path$$1.getValue();

  const maybeASIProblem =
    path$$1.needsParens(options$$1) ||
    node.type === "ParenthesizedExpression" ||
    node.type === "TypeCastExpression" ||
    (node.type === "ArrowFunctionExpression" &&
      !shouldPrintParamsWithoutParens(path$$1, options$$1)) ||
    node.type === "ArrayExpression" ||
    node.type === "ArrayPattern" ||
    (node.type === "UnaryExpression" &&
      node.prefix &&
      (node.operator === "+" || node.operator === "-")) ||
    node.type === "TemplateLiteral" ||
    node.type === "TemplateElement" ||
    isJSXNode(node) ||
    node.type === "BindExpression" ||
    node.type === "RegExpLiteral" ||
    (node.type === "Literal" && node.pattern) ||
    (node.type === "Literal" && node.regex);

  if (maybeASIProblem) {
    return true;
  }

  if (!hasNakedLeftSide(node)) {
    return false;
  }

  return path$$1.call.apply(
    path$$1,
    [childPath => exprNeedsASIProtection(childPath, options$$1)].concat(
      getLeftSidePathName(path$$1, node)
    )
  );
}

function stmtNeedsASIProtection(path$$1, options$$1) {
  const node = path$$1.getNode();

  if (node.type !== "ExpressionStatement") {
    return false;
  }

  return path$$1.call(
    childPath => exprNeedsASIProtection(childPath, options$$1),
    "expression"
  );
}

function classPropMayCauseASIProblems(path$$1) {
  const node = path$$1.getNode();

  if (node.type !== "ClassProperty") {
    return false;
  }

  const name = node.key && node.key.name;

  // this isn't actually possible yet with most parsers available today
  // so isn't properly tested yet.
  if (
    (name === "static" || name === "get" || name === "set") &&
    !node.value &&
    !node.typeAnnotation
  ) {
    return true;
  }
}

function classChildNeedsASIProtection(node) {
  if (!node) {
    return;
  }

  if (!node.computed) {
    const name = node.key && node.key.name;
    if (name === "in" || name === "instanceof") {
      return true;
    }
  }
  switch (node.type) {
    case "ClassProperty":
    case "TSAbstractClassProperty":
      return node.computed;
    case "MethodDefinition": // Flow
    case "TSAbstractMethodDefinition": // TypeScript
    case "ClassMethod": {
      // Babylon
      const isAsync = node.value ? node.value.async : node.async;
      const isGenerator = node.value ? node.value.generator : node.generator;
      if (
        isAsync ||
        node.static ||
        node.kind === "get" ||
        node.kind === "set"
      ) {
        return false;
      }
      if (node.computed || isGenerator) {
        return true;
      }
      return false;
    }

    default:
      /* istanbul ignore next */
      return false;
  }
}

// This recurses the return argument, looking for the first token
// (the leftmost leaf node) and, if it (or its parents) has any
// leadingComments, returns true (so it can be wrapped in parens).
function returnArgumentHasLeadingComment(options$$1, argument) {
  if (hasLeadingOwnLineComment(options$$1.originalText, argument)) {
    return true;
  }

  if (hasNakedLeftSide(argument)) {
    let leftMost = argument;
    let newLeftMost;
    while ((newLeftMost = getLeftSide(leftMost))) {
      leftMost = newLeftMost;

      if (hasLeadingOwnLineComment(options$$1.originalText, leftMost)) {
        return true;
      }
    }
  }

  return false;
}

function isMemberExpressionChain(node) {
  if (node.type !== "MemberExpression") {
    return false;
  }
  if (node.object.type === "Identifier") {
    return true;
  }
  return isMemberExpressionChain(node.object);
}

// Hack to differentiate between the following two which have the same ast
// type T = { method: () => void };
// type T = { method(): void };
function isObjectTypePropertyAFunction(node) {
  return (
    node.type === "ObjectTypeProperty" &&
    node.value.type === "FunctionTypeAnnotation" &&
    !node.static &&
    !isFunctionNotation(node)
  );
}

// TODO: This is a bad hack and we need a better way to distinguish between
// arrow functions and otherwise
function isFunctionNotation(node) {
  return isGetterOrSetter(node) || sameLocStart(node, node.value);
}

function isGetterOrSetter(node) {
  return node.kind === "get" || node.kind === "set";
}

function sameLocStart(nodeA, nodeB) {
  return util$1.locStart(nodeA) === util$1.locStart(nodeB);
}

// Hack to differentiate between the following two which have the same ast
// declare function f(a): void;
// var f: (a) => void;
function isTypeAnnotationAFunction(node) {
  return (
    (node.type === "TypeAnnotation" || node.type === "TSTypeAnnotation") &&
    node.typeAnnotation.type === "FunctionTypeAnnotation" &&
    !node.static &&
    !sameLocStart(node, node.typeAnnotation)
  );
}

function isNodeStartingWithDeclare(node, options$$1) {
  if (!(options$$1.parser === "flow" || options$$1.parser === "typescript")) {
    return false;
  }
  return (
    options$$1.originalText
      .slice(0, util$1.locStart(node))
      .match(/declare[ \t]*$/) ||
    options$$1.originalText
      .slice(node.range[0], node.range[1])
      .startsWith("declare ")
  );
}

function shouldHugType(node) {
  if (isObjectType(node)) {
    return true;
  }

  if (node.type === "UnionTypeAnnotation" || node.type === "TSUnionType") {
    const voidCount = node.types.filter(
      n =>
        n.type === "VoidTypeAnnotation" ||
        n.type === "TSVoidKeyword" ||
        n.type === "NullLiteralTypeAnnotation" ||
        n.type === "TSNullKeyword"
    ).length;

    const objectCount = node.types.filter(
      n =>
        n.type === "ObjectTypeAnnotation" ||
        n.type === "TSTypeLiteral" ||
        // This is a bit aggressive but captures Array<{x}>
        n.type === "GenericTypeAnnotation" ||
        n.type === "TSTypeReference"
    ).length;

    if (node.types.length - 1 === voidCount && objectCount > 0) {
      return true;
    }
  }

  return false;
}

function shouldHugArguments(fun) {
  return (
    fun &&
    fun.params &&
    fun.params.length === 1 &&
    !fun.params[0].comments &&
    (fun.params[0].type === "ObjectPattern" ||
      fun.params[0].type === "ArrayPattern" ||
      (fun.params[0].type === "Identifier" &&
        fun.params[0].typeAnnotation &&
        (fun.params[0].typeAnnotation.type === "TypeAnnotation" ||
          fun.params[0].typeAnnotation.type === "TSTypeAnnotation") &&
        isObjectType(fun.params[0].typeAnnotation.typeAnnotation)) ||
      (fun.params[0].type === "FunctionTypeParam" &&
        isObjectType(fun.params[0].typeAnnotation)) ||
      (fun.params[0].type === "AssignmentPattern" &&
        (fun.params[0].left.type === "ObjectPattern" ||
          fun.params[0].left.type === "ArrayPattern") &&
        (fun.params[0].right.type === "Identifier" ||
          (fun.params[0].right.type === "ObjectExpression" &&
            fun.params[0].right.properties.length === 0) ||
          (fun.params[0].right.type === "ArrayExpression" &&
            fun.params[0].right.elements.length === 0)))) &&
    !fun.rest
  );
}

function templateLiteralHasNewLines(template) {
  return template.quasis.some(quasi => quasi.value.raw.includes("\n"));
}

function isTemplateOnItsOwnLine(n, text) {
  return (
    ((n.type === "TemplateLiteral" && templateLiteralHasNewLines(n)) ||
      (n.type === "TaggedTemplateExpression" &&
        templateLiteralHasNewLines(n.quasi))) &&
    !util$1.hasNewline(text, util$1.locStart(n), { backwards: true })
  );
}

function printArrayItems(path$$1, options$$1, printPath, print) {
  const printedElements = [];
  let separatorParts = [];

  path$$1.each(childPath => {
    printedElements.push(concat(separatorParts));
    printedElements.push(group(print(childPath)));

    separatorParts = [",", line];
    if (
      childPath.getValue() &&
      util$1.isNextLineEmpty(options$$1.originalText, childPath.getValue())
    ) {
      separatorParts.push(softline);
    }
  }, printPath);

  return concat(printedElements);
}

function hasDanglingComments(node) {
  return (
    node.comments &&
    node.comments.some(comment => !comment.leading && !comment.trailing)
  );
}

function isLiteral(node) {
  return (
    node.type === "BooleanLiteral" ||
    node.type === "DirectiveLiteral" ||
    node.type === "Literal" ||
    node.type === "NullLiteral" ||
    node.type === "NumericLiteral" ||
    node.type === "RegExpLiteral" ||
    node.type === "StringLiteral" ||
    node.type === "TemplateLiteral" ||
    node.type === "TSTypeLiteral" ||
    node.type === "JSXText"
  );
}

function isNumericLiteral(node) {
  return (
    node.type === "NumericLiteral" ||
    (node.type === "Literal" && typeof node.value === "number")
  );
}

function isStringLiteral(node) {
  return (
    node.type === "StringLiteral" ||
    (node.type === "Literal" && typeof node.value === "string")
  );
}

function isObjectType(n) {
  return n.type === "ObjectTypeAnnotation" || n.type === "TSTypeLiteral";
}

// eg; `describe("some string", (done) => {})`
function isTestCall(n) {
  const unitTestRe = /^(skip|(f|x)?(it|describe|test))$/;
  return (
    ((n.callee.type === "Identifier" && unitTestRe.test(n.callee.name)) ||
      (n.callee.type === "MemberExpression" &&
        n.callee.object.type === "Identifier" &&
        n.callee.property.type === "Identifier" &&
        unitTestRe.test(n.callee.object.name) &&
        (n.callee.property.name === "only" ||
          n.callee.property.name === "skip"))) &&
    n.arguments.length === 2 &&
    (n.arguments[0].type === "StringLiteral" ||
      n.arguments[0].type === "TemplateLiteral" ||
      (n.arguments[0].type === "Literal" &&
        typeof n.arguments[0].value === "string")) &&
    (n.arguments[1].type === "FunctionExpression" ||
      n.arguments[1].type === "ArrowFunctionExpression") &&
    n.arguments[1].params.length <= 1
  );
}

function isTheOnlyJSXElementInMarkdown(options$$1, path$$1) {
  if (options$$1.parentParser !== "markdown") {
    return false;
  }

  const node = path$$1.getNode();

  if (!node.expression || !isJSXNode(node.expression)) {
    return false;
  }

  const parent = path$$1.getParentNode();

  return parent.type === "Program" && parent.body.length == 1;
}

function willPrintOwnComments(path$$1) {
  const node = path$$1.getValue();
  const parent = path$$1.getParentNode();

  return (
    ((node && isJSXNode(node)) ||
      (parent &&
        (parent.type === "JSXSpreadAttribute" ||
          parent.type === "JSXSpreadChild" ||
          parent.type === "UnionTypeAnnotation" ||
          parent.type === "TSUnionType" ||
          ((parent.type === "ClassDeclaration" ||
            parent.type === "ClassExpression") &&
            parent.superClass === node)))) &&
    !util$1.hasIgnoreComment(path$$1)
  );
}

function canAttachComment(node) {
  return (
    node.type &&
    node.type !== "CommentBlock" &&
    node.type !== "CommentLine" &&
    node.type !== "Line" &&
    node.type !== "Block" &&
    node.type !== "EmptyStatement" &&
    node.type !== "TemplateElement" &&
    node.type !== "Import" &&
    !(node.callee && node.callee.type === "Import")
  );
}

function printComment(commentPath, options$$1) {
  const comment = commentPath.getValue();

  switch (comment.type) {
    case "CommentBlock":
    case "Block": {
      if (isJsDocComment(comment)) {
        return printJsDocComment(comment);
      }

      const isInsideFlowComment =
        options$$1.originalText.substr(util$1.locEnd(comment) - 3, 3) === "*-/";

      return "/*" + comment.value + (isInsideFlowComment ? "*-/" : "*/");
    }
    case "CommentLine":
    case "Line":
      // Print shebangs with the proper comment characters
      if (options$$1.originalText.slice(util$1.locStart(comment)).startsWith("#!")) {
        return "#!" + comment.value.trimRight();
      }
      return "//" + comment.value.trimRight();
    default:
      throw new Error("Not a comment: " + JSON.stringify(comment));
  }
}

function isJsDocComment(comment) {
  const lines = comment.value.split("\n");
  return (
    lines.length > 1 &&
    lines.slice(0, lines.length - 1).every(line => line.trim()[0] === "*")
  );
}

function printJsDocComment(comment) {
  const lines = comment.value.split("\n");

  return concat([
    "/*",
    join(
      hardline,
      lines.map(
        (line, index) =>
          (index > 0 ? " " : "") +
          (index < lines.length - 1 ? line.trim() : line.trimLeft())
      )
    ),
    "*/"
  ]);
}

var printerEstree = {
  options: options,
  print: genericPrint,
  embed: embed_1,
  massageAstNode: clean_1,
  hasPrettierIgnore,
  willPrintOwnComments,
  canAttachComment,
  printComment
};

// Based on:
// https://github.com/github/linguist/blob/master/lib/linguist/languages.yml

const languages = [
  {
    name: "JavaScript",
    since: "0.0.0",
    parsers: ["babylon", "flow"],
    group: "JavaScript",
    tmScope: "source.js",
    aceMode: "javascript",
    codemirrorMode: "javascript",
    codemirrorMimeType: "text/javascript",
    aliases: ["js", "node"],
    extensions: [
      ".js",
      "._js",
      ".bones",
      ".es",
      ".es6",
      ".frag",
      ".gs",
      ".jake",
      ".jsb",
      ".jscad",
      ".jsfl",
      ".jsm",
      ".jss",
      ".mjs",
      ".njs",
      ".pac",
      ".sjs",
      ".ssjs",
      ".xsjs",
      ".xsjslib"
    ],
    filenames: ["Jakefile"],
    linguistLanguageId: 183,
    vscodeLanguageIds: ["javascript"]
  },
  {
    name: "JSX",
    since: "0.0.0",
    parsers: ["babylon", "flow"],
    group: "JavaScript",
    extensions: [".jsx"],
    tmScope: "source.js.jsx",
    aceMode: "javascript",
    codemirrorMode: "jsx",
    codemirrorMimeType: "text/jsx",
    liguistLanguageId: 178,
    vscodeLanguageIds: ["javascriptreact"]
  },
  {
    name: "TypeScript",
    since: "1.4.0",
    parsers: ["typescript-eslint"],
    group: "JavaScript",
    aliases: ["ts"],
    extensions: [".ts", ".tsx"],
    tmScope: "source.ts",
    aceMode: "typescript",
    codemirrorMode: "javascript",
    codemirrorMimeType: "application/typescript",
    liguistLanguageId: 378,
    vscodeLanguageIds: ["typescript", "typescriptreact"]
  },
  {
    name: "JSON",
    since: "1.5.0",
    parsers: ["json"],
    group: "JavaScript",
    tmScope: "source.json",
    aceMode: "json",
    codemirrorMode: "javascript",
    codemirrorMimeType: "application/json",
    extensions: [
      ".json",
      ".json5",
      ".geojson",
      ".JSON-tmLanguage",
      ".topojson"
    ],
    filenames: [
      ".arcconfig",
      ".jshintrc",
      ".babelrc",
      ".eslintrc",
      ".prettierrc",
      "composer.lock",
      "mcmod.info"
    ],
    linguistLanguageId: 174,
    vscodeLanguageIds: ["json", "jsonc"]
  }
];

const typescript = {
  get parse() {
    return require("./parser-typescript");
  },
  astFormat: "estree"
};

const babylon = {
  get parse() {
    return require("./parser-babylon");
  },
  astFormat: "estree"
};

const parsers = {
  babylon,
  json: babylon,
  flow: {
    get parse() {
      return require("./parser-flow");
    },
    astFormat: "estree"
  },
  "typescript-eslint": typescript,
  // TODO: Delete this in 2.0
  typescript
};

const printers = {
  estree: printerEstree
};

var languageJs = {
  languages,
  parsers,
  printers
};

function clean$2(ast, newObj) {
  if (
    ast.type === "media-query" ||
    ast.type === "media-query-list" ||
    ast.type === "media-feature-expression"
  ) {
    delete newObj.value;
  }

  if (ast.type === "css-rule") {
    delete newObj.params;
  }

  if (ast.type === "selector-combinator") {
    newObj.value = newObj.value.replace(/\s+/g, " ");
  }

  if (ast.type === "media-feature") {
    newObj.value = newObj.value.replace(/ /g, "");
  }

  if (
    (ast.type === "value-word" && ast.isColor && ast.isHex) ||
    ast.type === "media-feature" ||
    ast.type === "selector-root-invalid" ||
    ast.type === "selector-pseudo"
  ) {
    newObj.value = newObj.value.toLowerCase();
  }
  if (ast.type === "css-decl") {
    newObj.prop = newObj.prop.toLowerCase();
  }
  if (ast.type === "css-atrule" || ast.type === "css-import") {
    newObj.name = newObj.name.toLowerCase();
  }
  if (ast.type === "value-number") {
    newObj.unit = newObj.unit.toLowerCase();
  }

  if (
    (ast.type === "media-feature" ||
      ast.type === "media-keyword" ||
      ast.type === "media-type" ||
      ast.type === "media-unknown" ||
      ast.type === "media-url" ||
      ast.type === "media-value" ||
      ast.type === "selector-root-invalid" ||
      ast.type === "selector-attribute" ||
      ast.type === "selector-string" ||
      ast.type === "selector-class" ||
      ast.type === "selector-combinator" ||
      ast.type === "value-string") &&
    newObj.value
  ) {
    newObj.value = cleanCSSStrings(newObj.value);
  }

  if (ast.type === "css-import" && newObj.importPath) {
    newObj.importPath = cleanCSSStrings(newObj.importPath);
  }

  if (ast.type === "selector-attribute" && newObj.value) {
    newObj.value = newObj.value.replace(/^['"]|['"]$/g, "");
    delete newObj.quoted;
  }

  if (
    (ast.type === "media-value" ||
      ast.type === "media-type" ||
      ast.type === "value-number" ||
      ast.type === "selector-root-invalid" ||
      ast.type === "selector-class" ||
      ast.type === "selector-combinator" ||
      ast.type === "selector-tag") &&
    newObj.value
  ) {
    newObj.value = newObj.value.replace(
      /([\d.eE+-]+)([a-zA-Z]*)/g,
      (match, numStr, unit) => {
        const num = Number(numStr);
        return isNaN(num) ? match : num + unit.toLowerCase();
      }
    );
  }
}

function cleanCSSStrings(value) {
  return value.replace(/'/g, '"').replace(/\\([^a-fA-F\d])/g, "$1");
}

var clean_1$2 = clean$2;

// format based on https://github.com/prettier/prettier/blob/master/src/common/support.js
var options$2 = {
  singleQuote: options.singleQuote
};

const docBuilders$6 = doc.builders;
const concat$5 = docBuilders$6.concat;
const join$4 = docBuilders$6.join;
const line$2 = docBuilders$6.line;
const hardline$4 = docBuilders$6.hardline;
const softline$3 = docBuilders$6.softline;
const group$2 = docBuilders$6.group;
const fill$3 = docBuilders$6.fill;
const indent$4 = docBuilders$6.indent;


const removeLines$1 = doc.utils.removeLines;

function genericPrint$1(path$$1, options, print) {
  const n = path$$1.getValue();

  /* istanbul ignore if */
  if (!n) {
    return "";
  }

  if (typeof n === "string") {
    return n;
  }

  switch (n.type) {
    case "css-root": {
      const nodes = printNodeSequence(path$$1, options, print);

      if (nodes.parts.length) {
        return concat$5([nodes, hardline$4]);
      }

      return nodes;
    }
    case "css-comment": {
      if (n.raws.content) {
        return n.raws.content;
      }
      const text = options.originalText.slice(util$1.locStart(n), util$1.locEnd(n));
      const rawText = n.raws.text || n.text;
      // Workaround a bug where the location is off.
      // https://github.com/postcss/postcss-scss/issues/63
      if (text.indexOf(rawText) === -1) {
        if (n.raws.inline) {
          return concat$5(["// ", rawText]);
        }
        return concat$5(["/* ", rawText, " */"]);
      }
      return text;
    }
    case "css-rule": {
      return concat$5([
        path$$1.call(print, "selector"),
        n.important ? " !important" : "",
        n.nodes
          ? concat$5([
              " {",
              n.nodes.length > 0
                ? indent$4(
                    concat$5([hardline$4, printNodeSequence(path$$1, options, print)])
                  )
                : "",
              hardline$4,
              "}"
            ])
          : ";"
      ]);
    }
    case "css-decl": {
      // When the following less construct &:extend(.foo); is parsed with scss,
      // it will put a space after `:` and break it. Ideally we should parse
      // less files with less, but we can hardcode this to work with scss as
      // well.
      const isValueExtend =
        n.value.type === "value-root" &&
        n.value.group.type === "value-value" &&
        n.value.group.group.type === "value-func" &&
        n.value.group.group.value === "extend";
      const isComposed =
        n.value.type === "value-root" &&
        n.value.group.type === "value-value" &&
        n.prop === "composes";

      return concat$5([
        n.raws.before.replace(/[\s;]/g, ""),
        maybeToLowerCase(n.prop),
        ":",
        isValueExtend ? "" : " ",
        isComposed
          ? removeLines$1(path$$1.call(print, "value"))
          : path$$1.call(print, "value"),
        n.important ? " !important" : "",
        n.default ? " !default" : "",
        n.nodes
          ? concat$5([
              " {",
              indent$4(
                concat$5([softline$3, printNodeSequence(path$$1, options, print)])
              ),
              softline$3,
              "}"
            ])
          : ";"
      ]);
    }
    case "css-atrule": {
      const hasParams =
        n.params &&
        !(n.params.type === "media-query-list" && n.params.value === "");
      const isDetachedRulesetCall =
        hasParams &&
        n.params.type === "media-query-list" &&
        /^\(\s*\)$/.test(n.params.value);
      return concat$5([
        "@",
        // If a Less file ends up being parsed with the SCSS parser, Less
        // variable declarations will be parsed as atrules with names ending
        // with a colon, so keep the original case then.
        isDetachedRulesetCall || n.name.endsWith(":")
          ? n.name
          : maybeToLowerCase(n.name),
        hasParams
          ? concat$5([
              isDetachedRulesetCall ? "" : " ",
              path$$1.call(print, "params")
            ])
          : "",
        n.nodes
          ? concat$5([
              " {",
              indent$4(
                concat$5([
                  n.nodes.length > 0 ? softline$3 : "",
                  printNodeSequence(path$$1, options, print)
                ])
              ),
              softline$3,
              "}"
            ])
          : ";"
      ]);
    }
    case "css-import": {
      return concat$5([
        "@",
        maybeToLowerCase(n.name),
        " ",
        n.directives ? concat$5([n.directives, " "]) : "",
        adjustStrings(n.importPath, options),
        n.nodes.length > 0
          ? concat$5([
              " {",
              indent$4(
                concat$5([softline$3, printNodeSequence(path$$1, options, print)])
              ),
              softline$3,
              "}"
            ])
          : ";"
      ]);
    }
    // postcss-media-query-parser
    case "media-query-list": {
      const parts = [];
      path$$1.each(childPath => {
        const node = childPath.getValue();
        if (node.type === "media-query" && node.value === "") {
          return;
        }
        parts.push(childPath.call(print));
      }, "nodes");
      return group$2(indent$4(join$4(concat$5([",", line$2]), parts)));
    }
    case "media-query": {
      return join$4(" ", path$$1.map(print, "nodes"));
    }
    case "media-type": {
      const parent = path$$1.getParentNode(2);
      if (
        parent.type === "css-atrule" &&
        parent.name.toLowerCase() === "charset"
      ) {
        return n.value;
      }
      return adjustNumbers(adjustStrings(n.value, options));
    }
    case "media-feature-expression": {
      if (!n.nodes) {
        return n.value;
      }
      return concat$5(["(", concat$5(path$$1.map(print, "nodes")), ")"]);
    }
    case "media-feature": {
      return maybeToLowerCase(
        adjustStrings(n.value.replace(/ +/g, " "), options)
      );
    }
    case "media-colon": {
      return concat$5([n.value, " "]);
    }
    case "media-value": {
      return adjustNumbers(adjustStrings(n.value, options));
    }
    case "media-keyword": {
      return adjustStrings(n.value, options);
    }
    case "media-url": {
      return adjustStrings(n.value, options);
    }
    case "media-unknown": {
      return adjustStrings(n.value, options);
    }
    // postcss-selector-parser
    case "selector-root-invalid": {
      // This is likely a SCSS nested property: `background: { color: red; }`.
      return adjustNumbers(adjustStrings(maybeToLowerCase(n.value), options));
    }
    case "selector-root": {
      return group$2(join$4(concat$5([",", hardline$4]), path$$1.map(print, "nodes")));
    }
    case "selector-comment": {
      return n.value;
    }
    case "selector-string": {
      return adjustStrings(n.value, options);
    }
    case "selector-tag": {
      return adjustNumbers(n.value);
    }
    case "selector-id": {
      return concat$5(["#", n.value]);
    }
    case "selector-class": {
      return concat$5([".", adjustNumbers(adjustStrings(n.value, options))]);
    }
    case "selector-attribute": {
      return concat$5([
        "[",
        n.attribute,
        n.operator ? n.operator : "",
        n.value
          ? quoteAttributeValue(adjustStrings(n.value, options), options)
          : "",
        n.insensitive ? " i" : "",
        "]"
      ]);
    }
    case "selector-combinator": {
      if (n.value === "+" || n.value === ">" || n.value === "~") {
        const parent = path$$1.getParentNode();
        const leading =
          parent.type === "selector-selector" && parent.nodes[0] === n
            ? ""
            : line$2;
        const isLastNode = parent.nodes.length - 1 === parent.nodes.indexOf(n);
        return concat$5([leading, n.value, isLastNode ? "" : " "]);
      }
      const leading = n.value.trim().startsWith("(") ? line$2 : "";
      const value =
        adjustNumbers(adjustStrings(n.value.trim(), options)) || line$2;
      return concat$5([leading, value]);
    }
    case "selector-universal": {
      return n.value;
    }
    case "selector-selector": {
      return group$2(indent$4(concat$5(path$$1.map(print, "nodes"))));
    }
    case "selector-pseudo": {
      return concat$5([
        maybeToLowerCase(n.value),
        n.nodes && n.nodes.length > 0
          ? concat$5(["(", join$4(", ", path$$1.map(print, "nodes")), ")"])
          : ""
      ]);
    }
    case "selector-nesting": {
      return printValue(n.value);
    }
    // postcss-values-parser
    case "value-root": {
      return path$$1.call(print, "group");
    }
    case "value-comma_group": {
      const parent = path$$1.getParentNode();
      let declParent;
      let i = 0;
      do {
        declParent = path$$1.getParentNode(i++);
      } while (declParent && declParent.type !== "css-decl");

      const declParentProp = declParent.prop.toLowerCase();
      const isGridValue =
        parent.type === "value-value" &&
        (declParentProp === "grid" ||
          declParentProp.startsWith("grid-template"));

      const printed = path$$1.map(print, "groups");
      const parts = [];
      let didBreak = false;
      for (let i = 0; i < n.groups.length; ++i) {
        parts.push(printed[i]);
        if (
          i !== n.groups.length - 1 &&
          n.groups[i + 1].raws &&
          n.groups[i + 1].raws.before !== ""
        ) {
          if (isGridValue) {
            if (
              n.groups[i].source.start.line !==
              n.groups[i + 1].source.start.line
            ) {
              parts.push(hardline$4);
              didBreak = true;
            } else {
              parts.push(" ");
            }
          } else if (
            n.groups[i + 1].type === "value-operator" &&
            ["+", "-", "/", "*", "%"].indexOf(n.groups[i + 1].value) !== -1
          ) {
            parts.push(" ");
          } else {
            parts.push(line$2);
          }
        }
      }

      if (didBreak) {
        parts.unshift(hardline$4);
      }

      return group$2(indent$4(fill$3(parts)));
    }
    case "value-paren_group": {
      const parent = path$$1.getParentNode();
      const isURLCall =
        parent && parent.type === "value-func" && parent.value === "url";

      if (
        isURLCall &&
        (n.groups.length === 1 ||
          (n.groups.length > 0 &&
            n.groups[0].type === "value-comma_group" &&
            n.groups[0].groups.length > 0 &&
            n.groups[0].groups[0].type === "value-word" &&
            n.groups[0].groups[0].value === "data"))
      ) {
        return concat$5([
          n.open ? path$$1.call(print, "open") : "",
          join$4(",", path$$1.map(print, "groups")),
          n.close ? path$$1.call(print, "close") : ""
        ]);
      }

      if (!n.open) {
        const printed = path$$1.map(print, "groups");
        const res = [];

        for (let i = 0; i < printed.length; i++) {
          if (i !== 0) {
            res.push(concat$5([",", line$2]));
          }
          res.push(printed[i]);
        }
        return group$2(indent$4(fill$3(res)));
      }

      const declaration = path$$1.getParentNode(2);
      const isMap =
        declaration &&
        declaration.type === "css-decl" &&
        declaration.prop.startsWith("$");

      return group$2(
        concat$5([
          n.open ? path$$1.call(print, "open") : "",
          indent$4(
            concat$5([
              softline$3,
              join$4(
                concat$5([",", isMap ? hardline$4 : line$2]),
                path$$1.map(print, "groups")
              )
            ])
          ),
          softline$3,
          n.close ? path$$1.call(print, "close") : ""
        ])
      );
    }
    case "value-value": {
      return path$$1.call(print, "group");
    }
    case "value-func": {
      return concat$5([n.value, path$$1.call(print, "group")]);
    }
    case "value-paren": {
      if (n.raws.before !== "") {
        return concat$5([line$2, n.value]);
      }
      return n.value;
    }
    case "value-number": {
      return concat$5([printNumber$1(n.value), maybeToLowerCase(n.unit)]);
    }
    case "value-operator": {
      return n.value;
    }
    case "value-word": {
      if (n.isColor && n.isHex) {
        return n.value.toLowerCase();
      }
      return n.value;
    }
    case "value-colon": {
      return n.value;
    }
    case "value-comma": {
      return concat$5([n.value, " "]);
    }
    case "value-string": {
      return util$1.printString(n.raws.quote + n.value + n.raws.quote, options);
    }
    case "value-atword": {
      return concat$5(["@", n.value]);
    }

    default:
      /* istanbul ignore next */
      throw new Error("unknown postcss type: " + JSON.stringify(n.type));
  }
}

function printNodeSequence(path$$1, options, print) {
  const node = path$$1.getValue();
  const parts = [];
  let i = 0;
  path$$1.map(pathChild => {
    const prevNode = node.nodes[i - 1];
    if (
      prevNode &&
      prevNode.type === "css-comment" &&
      prevNode.text.trim() === "prettier-ignore"
    ) {
      const childNode = pathChild.getValue();
      parts.push(
        options.originalText.slice(
          util$1.locStart(childNode),
          util$1.locEnd(childNode)
        )
      );
    } else {
      parts.push(pathChild.call(print));
    }

    if (i !== node.nodes.length - 1) {
      if (
        (node.nodes[i + 1].type === "css-comment" &&
          !util$1.hasNewline(
            options.originalText,
            util$1.locStart(node.nodes[i + 1]),
            { backwards: true }
          )) ||
        (node.nodes[i + 1].type === "css-atrule" &&
          node.nodes[i + 1].name === "else" &&
          node.nodes[i].type !== "css-comment")
      ) {
        parts.push(" ");
      } else {
        parts.push(hardline$4);
        if (util$1.isNextLineEmpty(options.originalText, pathChild.getValue())) {
          parts.push(hardline$4);
        }
      }
    }
    i++;
  }, "nodes");

  return concat$5(parts);
}

function printValue(value) {
  return value;
}

const STRING_REGEX = /(['"])(?:(?!\1)[^\\]|\\[\s\S])*\1/g;
const NUMBER_REGEX = /(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?/g;
const STANDARD_UNIT_REGEX = /[a-zA-Z]+/g;
const WORD_PART_REGEX = /[$@]?[a-zA-Z_\u0080-\uFFFF][\w\-\u0080-\uFFFF]*/g;
const ADJUST_NUMBERS_REGEX = RegExp(
  STRING_REGEX.source +
    `|` +
    `(${WORD_PART_REGEX.source})?` +
    `(${NUMBER_REGEX.source})` +
    `(${STANDARD_UNIT_REGEX.source})?`,
  "g"
);

function adjustStrings(value, options) {
  return value.replace(STRING_REGEX, match => util$1.printString(match, options));
}

function quoteAttributeValue(value, options) {
  const quote = options.singleQuote ? "'" : '"';
  return value.includes('"') || value.includes("'")
    ? value
    : quote + value + quote;
}

function adjustNumbers(value) {
  return value.replace(
    ADJUST_NUMBERS_REGEX,
    (match, quote, wordPart, number, unit) =>
      !wordPart && number
        ? (wordPart || "") + printNumber$1(number) + maybeToLowerCase(unit || "")
        : match
  );
}

function printNumber$1(rawNumber) {
  return (
    util$1
      .printNumber(rawNumber)
      // Remove trailing `.0`.
      .replace(/\.0(?=$|e)/, "")
  );
}

function maybeToLowerCase(value) {
  return value.includes("$") ||
    value.includes("@") ||
    value.includes("#") ||
    value.startsWith("%") ||
    value.startsWith("--")
    ? value
    : value.toLowerCase();
}

var printerPostcss = {
  options: options$2,
  print: genericPrint$1,
  hasPrettierIgnore: util$1.hasIgnoreComment,
  massageAstNode: clean_1$2
};

// Based on:
// https://github.com/github/linguist/blob/master/lib/linguist/languages.yml

const languages$1 = [
  {
    name: "CSS",
    since: "1.4.0",
    parsers: ["css"],
    group: "CSS",
    tmScope: "source.css",
    aceMode: "css",
    codemirrorMode: "css",
    codemirrorMimeType: "text/css",
    extensions: [".css", ".pcss", ".postcss"],
    liguistLanguageId: 50,
    vscodeLanguageIds: ["css", "postcss"]
  },
  {
    name: "Less",
    since: "1.4.0",
    parsers: ["less"],
    group: "CSS",
    extensions: [".less"],
    tmScope: "source.css.less",
    aceMode: "less",
    codemirrorMode: "css",
    codemirrorMimeType: "text/css",
    liguistLanguageId: 198,
    vscodeLanguageIds: ["less"]
  },
  {
    name: "SCSS",
    since: "1.4.0",
    parsers: ["scss"],
    group: "CSS",
    tmScope: "source.scss",
    aceMode: "scss",
    codemirrorMode: "css",
    codemirrorMimeType: "text/x-scss",
    extensions: [".scss"],
    liguistLanguageId: 329,
    vscodeLanguageIds: ["scss"]
  }
];

const postcss = {
  get parse() {
    return require("./parser-postcss");
  },
  astFormat: "postcss"
};

// TODO: switch these to just `postcss` and use `language` instead.
const parsers$1 = {
  css: postcss,
  less: postcss,
  scss: postcss
};

const printers$1 = {
  postcss: printerPostcss
};

var languageCss = {
  languages: languages$1,
  parsers: parsers$1,
  printers: printers$1
};

const concat$6 = docBuilders$2.concat;
const join$5 = docBuilders$2.join;
const softline$4 = docBuilders$2.softline;
const hardline$5 = docBuilders$2.hardline;
const line$3 = docBuilders$2.line;
const group$3 = docBuilders$2.group;
const indent$5 = docBuilders$2.indent;
const ifBreak$2 = docBuilders$2.ifBreak;

// http://w3c.github.io/html/single-page.html#void-elements
const voidTags = [
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
];

// Formatter based on @glimmerjs/syntax's built-in test formatter:
// https://github.com/glimmerjs/glimmer-vm/blob/master/packages/%40glimmer/syntax/lib/generation/print.ts

function print(path$$1, options, print) {
  const n = path$$1.getValue();

  /* istanbul ignore if*/
  if (!n) {
    return "";
  }

  switch (n.type) {
    case "Program": {
      return group$3(
        join$5(softline$4, path$$1.map(print, "body").filter(text => text !== ""))
      );
    }
    case "ElementNode": {
      const isVoid = voidTags.indexOf(n.tag) !== -1;
      const closeTag = isVoid ? concat$6([" />", softline$4]) : ">";
      const hasChildren = n.children.length > 0;
      const getParams = (path$$1, print) =>
        indent$5(
          concat$6([
            n.attributes.length ? line$3 : "",
            join$5(line$3, path$$1.map(print, "attributes")),

            n.modifiers.length ? line$3 : "",
            join$5(line$3, path$$1.map(print, "modifiers")),

            n.comments.length ? line$3 : "",
            join$5(line$3, path$$1.map(print, "comments"))
          ])
        );

      // The problem here is that I want to not break at all if the children
      // would not break but I need to force an indent, so I use a hardline.
      /**
       * What happens now:
       * <div>
       *   Hello
       * </div>
       * ==>
       * <div>Hello</div>
       * This is due to me using hasChildren to decide to put the hardline in.
       * I would rather use a {DOES THE WHOLE THING NEED TO BREAK}
       */
      return concat$6([
        group$3(
          concat$6([
            "<",
            n.tag,
            getParams(path$$1, print),
            ifBreak$2(softline$4, ""),
            closeTag
          ])
        ),
        group$3(
          concat$6([
            indent$5(join$5(softline$4, [""].concat(path$$1.map(print, "children")))),
            ifBreak$2(hasChildren ? hardline$5 : "", ""),
            !isVoid ? concat$6(["</", n.tag, ">"]) : ""
          ])
        )
      ]);
    }
    case "BlockStatement": {
      const pp = path$$1.getParentNode(1);
      const isElseIf = pp && pp.inverse && pp.inverse.body[0] === n;
      const hasElseIf =
        n.inverse &&
        n.inverse.body[0] &&
        n.inverse.body[0].type === "BlockStatement";
      const indentElse = hasElseIf ? a => a : indent$5;
      if (n.inverse) {
        return concat$6([
          isElseIf
            ? concat$6(["{{else ", printPathParams(path$$1, print), "}}"])
            : printOpenBlock(path$$1, print),
          indent$5(concat$6([hardline$5, path$$1.call(print, "program")])),
          n.inverse && !hasElseIf ? concat$6([hardline$5, "{{else}}"]) : "",
          n.inverse
            ? indentElse(concat$6([hardline$5, path$$1.call(print, "inverse")]))
            : "",
          isElseIf ? "" : concat$6([hardline$5, printCloseBlock(path$$1, print)])
        ]);
      }
      /**
       * I want this boolean to be: if params are going to cause a break,
       * not that it has params.
       */
      const hasParams = n.params.length > 0 || n.hash.pairs.length > 0;
      const hasChildren = n.program.body.length > 0;
      return concat$6([
        printOpenBlock(path$$1, print),
        group$3(
          concat$6([
            indent$5(concat$6([softline$4, path$$1.call(print, "program")])),
            hasParams && hasChildren ? hardline$5 : "",
            printCloseBlock(path$$1, print)
          ])
        )
      ]);
    }
    case "ElementModifierStatement":
    case "MustacheStatement": {
      const pp = path$$1.getParentNode(1);
      const isConcat = pp && pp.type === "ConcatStatement";
      return group$3(
        concat$6([
          /*n.escaped ? "{{{" : */ "{{",
          printPathParams(path$$1, print),
          isConcat ? "" : softline$4,
          /*.escaped ? "}}}" :*/ "}}"
        ])
      );
    }
    case "SubExpression": {
      return group$3(
        concat$6([
          "(",
          printPath(path$$1, print),
          indent$5(concat$6([line$3, group$3(join$5(line$3, getParams(path$$1, print)))])),
          softline$4,
          ")"
        ])
      );
    }
    case "AttrNode": {
      const quote = n.value.type === "TextNode" ? '"' : "";
      return concat$6([n.name, "=", quote, path$$1.call(print, "value"), quote]);
    }
    case "ConcatStatement": {
      return concat$6([
        '"',
        group$3(
          indent$5(
            join$5(
              softline$4,
              path$$1
                .map(partPath => print(partPath), "parts")
                .filter(a => a !== "")
            )
          )
        ),
        '"'
      ]);
    }
    case "Hash": {
      return concat$6([join$5(line$3, path$$1.map(print, "pairs"))]);
    }
    case "HashPair": {
      return concat$6([n.key, "=", path$$1.call(print, "value")]);
    }
    case "TextNode": {
      return n.chars.replace(/^\s+/, "").replace(/\s+$/, "");
    }
    case "MustacheCommentStatement": {
      const dashes = n.value.indexOf("}}") > -1 ? "--" : "";
      return concat$6(["{{!", dashes, n.value, dashes, "}}"]);
    }
    case "PathExpression": {
      return n.original;
    }
    case "BooleanLiteral": {
      return String(n.value);
    }
    case "CommentStatement": {
      return concat$6(["<!--", n.value, "-->"]);
    }
    case "StringLiteral": {
      return `"${n.value}"`;
    }
    case "NumberLiteral": {
      return String(n.value);
    }
    case "UndefinedLiteral": {
      return "undefined";
    }
    case "NullLiteral": {
      return "null";
    }

    /* istanbul ignore next */
    default:
      throw new Error("unknown glimmer type: " + JSON.stringify(n.type));
  }
}

function printPath(path$$1, print) {
  return path$$1.call(print, "path");
}

function getParams(path$$1, print) {
  const node = path$$1.getValue();
  let parts = [];

  if (node.params.length > 0) {
    parts = parts.concat(path$$1.map(print, "params"));
  }

  if (node.hash && node.hash.pairs.length > 0) {
    parts.push(path$$1.call(print, "hash"));
  }
  return parts;
}

function printPathParams(path$$1, print) {
  let parts = [];

  parts.push(printPath(path$$1, print));
  parts = parts.concat(getParams(path$$1, print));

  return indent$5(group$3(join$5(line$3, parts)));
}

function printBlockParams(path$$1) {
  const block = path$$1.getValue();
  if (!block.program || !block.program.blockParams.length) {
    return "";
  }
  return concat$6([" as |", block.program.blockParams.join(" "), "|"]);
}

function printOpenBlock(path$$1, print) {
  return group$3(
    concat$6([
      "{{#",
      printPathParams(path$$1, print),
      printBlockParams(path$$1, print),
      softline$4,
      "}}"
    ])
  );
}

function printCloseBlock(path$$1, print) {
  return concat$6(["{{/", path$$1.call(print, "path"), "}}"]);
}

function clean$4(ast, newObj) {
  // (Glimmer/HTML) ignore TextNode whitespace
  if (ast.type === "TextNode") {
    if (ast.chars.replace(/\s+/, "") === "") {
      return null;
    }
    newObj.chars = ast.chars.replace(/^\s+/, "").replace(/\s+$/, "");
  }
}

var printerGlimmer = {
  print,
  massageAstNode: clean$4
};

// Based on:
// https://github.com/github/linguist/blob/master/lib/linguist/languages.yml

const languages$2 = [
  {
    type: "markup",
    group: "HTML",
    aliases: ["hbs", "htmlbars"],
    extensions: [".handlebars", ".hbs"],
    tm_scope: "text.html.handlebars",
    ace_mode: "handlebars",
    language_id: 155
  }
];

const parsers$2 = {
  glimmer: {
    get parse() {
      return require("./parser-glimmer");
    },
    astFormat: "glimmer"
  }
};

const printers$2 = {
  glimmer: printerGlimmer
};

var languageHandlebars = {
  languages: languages$2,
  parsers: parsers$2,
  printers: printers$2
};

// format based on https://github.com/prettier/prettier/blob/master/src/common/support.js
var options$4 = {
  bracketSpacing: options.bracketSpacing
};

const docBuilders$7 = doc.builders;
const concat$7 = docBuilders$7.concat;
const join$6 = docBuilders$7.join;
const hardline$6 = docBuilders$7.hardline;
const line$4 = docBuilders$7.line;
const softline$5 = docBuilders$7.softline;
const group$4 = docBuilders$7.group;
const indent$6 = docBuilders$7.indent;
const ifBreak$3 = docBuilders$7.ifBreak;




function genericPrint$2(path$$1, options, print) {
  const n = path$$1.getValue();
  if (!n) {
    return "";
  }

  if (typeof n === "string") {
    return n;
  }

  switch (n.kind) {
    case "Document": {
      return concat$7([
        join$6(concat$7([hardline$6, hardline$6]), path$$1.map(print, "definitions")),
        hardline$6
      ]);
    }
    case "OperationDefinition": {
      const hasOperation = options.originalText[util$1.locStart(n)] !== "{";
      const hasName = !!n.name;
      return concat$7([
        hasOperation ? n.operation : "",
        hasOperation && hasName ? concat$7([" ", path$$1.call(print, "name")]) : "",
        n.variableDefinitions && n.variableDefinitions.length
          ? group$4(
              concat$7([
                "(",
                indent$6(
                  concat$7([
                    softline$5,
                    join$6(
                      concat$7([ifBreak$3("", ", "), softline$5]),
                      path$$1.map(print, "variableDefinitions")
                    )
                  ])
                ),
                softline$5,
                ")"
              ])
            )
          : "",
        printDirectives(path$$1, print, n),
        n.selectionSet ? (!hasOperation && !hasName ? "" : " ") : "",
        path$$1.call(print, "selectionSet")
      ]);
    }
    case "FragmentDefinition": {
      return concat$7([
        "fragment ",
        path$$1.call(print, "name"),
        " on ",
        path$$1.call(print, "typeCondition"),
        printDirectives(path$$1, print, n),
        " ",
        path$$1.call(print, "selectionSet")
      ]);
    }
    case "SelectionSet": {
      return concat$7([
        "{",
        indent$6(
          concat$7([
            hardline$6,
            join$6(
              hardline$6,
              path$$1.call(
                selectionsPath => printSequence(selectionsPath, options, print),
                "selections"
              )
            )
          ])
        ),
        hardline$6,
        "}"
      ]);
    }
    case "Field": {
      return group$4(
        concat$7([
          n.alias ? concat$7([path$$1.call(print, "alias"), ": "]) : "",
          path$$1.call(print, "name"),
          n.arguments.length > 0
            ? group$4(
                concat$7([
                  "(",
                  indent$6(
                    concat$7([
                      softline$5,
                      join$6(
                        concat$7([ifBreak$3("", ", "), softline$5]),
                        path$$1.call(
                          argsPath => printSequence(argsPath, options, print),
                          "arguments"
                        )
                      )
                    ])
                  ),
                  softline$5,
                  ")"
                ])
              )
            : "",
          printDirectives(path$$1, print, n),
          n.selectionSet ? " " : "",
          path$$1.call(print, "selectionSet")
        ])
      );
    }
    case "Name": {
      return n.value;
    }
    case "StringValue": {
      if (n.block) {
        return concat$7([
          '"""',
          hardline$6,
          join$6(hardline$6, n.value.replace(/"""/g, "\\$&").split("\n")),
          hardline$6,
          '"""'
        ]);
      }
      return concat$7(['"', n.value.replace(/["\\]/g, "\\$&"), '"']);
    }
    case "IntValue":
    case "FloatValue":
    case "EnumValue": {
      return n.value;
    }
    case "BooleanValue": {
      return n.value ? "true" : "false";
    }
    case "NullValue": {
      return "null";
    }
    case "Variable": {
      return concat$7(["$", path$$1.call(print, "name")]);
    }
    case "ListValue": {
      return group$4(
        concat$7([
          "[",
          indent$6(
            concat$7([
              softline$5,
              join$6(
                concat$7([ifBreak$3("", ", "), softline$5]),
                path$$1.map(print, "values")
              )
            ])
          ),
          softline$5,
          "]"
        ])
      );
    }
    case "ObjectValue": {
      return group$4(
        concat$7([
          "{",
          options.bracketSpacing && n.fields.length > 0 ? " " : "",
          indent$6(
            concat$7([
              softline$5,
              join$6(
                concat$7([ifBreak$3("", ", "), softline$5]),
                path$$1.map(print, "fields")
              )
            ])
          ),
          softline$5,
          ifBreak$3("", options.bracketSpacing && n.fields.length > 0 ? " " : ""),
          "}"
        ])
      );
    }
    case "ObjectField":
    case "Argument": {
      return concat$7([
        path$$1.call(print, "name"),
        ": ",
        path$$1.call(print, "value")
      ]);
    }

    case "Directive": {
      return concat$7([
        "@",
        path$$1.call(print, "name"),
        n.arguments.length > 0
          ? group$4(
              concat$7([
                "(",
                indent$6(
                  concat$7([
                    softline$5,
                    join$6(
                      concat$7([ifBreak$3("", ", "), softline$5]),
                      path$$1.call(
                        argsPath => printSequence(argsPath, options, print),
                        "arguments"
                      )
                    )
                  ])
                ),
                softline$5,
                ")"
              ])
            )
          : ""
      ]);
    }

    case "NamedType": {
      return path$$1.call(print, "name");
    }

    case "VariableDefinition": {
      return concat$7([
        path$$1.call(print, "variable"),
        ": ",
        path$$1.call(print, "type"),
        n.defaultValue ? concat$7([" = ", path$$1.call(print, "defaultValue")]) : ""
      ]);
    }

    case "TypeExtensionDefinition": {
      return concat$7(["extend ", path$$1.call(print, "definition")]);
    }

    case "ObjectTypeExtension":
    case "ObjectTypeDefinition": {
      return concat$7([
        path$$1.call(print, "description"),
        n.description ? hardline$6 : "",
        n.kind === "ObjectTypeExtension" ? "extend " : "",
        "type ",
        path$$1.call(print, "name"),
        n.interfaces.length > 0
          ? concat$7([" implements ", join$6(", ", path$$1.map(print, "interfaces"))])
          : "",
        printDirectives(path$$1, print, n),
        n.fields.length > 0
          ? concat$7([
              " {",
              indent$6(
                concat$7([
                  hardline$6,
                  join$6(
                    hardline$6,
                    path$$1.call(
                      fieldsPath => printSequence(fieldsPath, options, print),
                      "fields"
                    )
                  )
                ])
              ),
              hardline$6,
              "}"
            ])
          : ""
      ]);
    }

    case "FieldDefinition": {
      return concat$7([
        path$$1.call(print, "description"),
        n.description ? hardline$6 : "",
        path$$1.call(print, "name"),
        n.arguments.length > 0
          ? group$4(
              concat$7([
                "(",
                indent$6(
                  concat$7([
                    softline$5,
                    join$6(
                      concat$7([ifBreak$3("", ", "), softline$5]),
                      path$$1.call(
                        argsPath => printSequence(argsPath, options, print),
                        "arguments"
                      )
                    )
                  ])
                ),
                softline$5,
                ")"
              ])
            )
          : "",
        ": ",
        path$$1.call(print, "type"),
        printDirectives(path$$1, print, n)
      ]);
    }

    case "DirectiveDefinition": {
      return concat$7([
        path$$1.call(print, "description"),
        n.description ? hardline$6 : "",
        "directive ",
        "@",
        path$$1.call(print, "name"),
        n.arguments.length > 0
          ? group$4(
              concat$7([
                "(",
                indent$6(
                  concat$7([
                    softline$5,
                    join$6(
                      concat$7([ifBreak$3("", ", "), softline$5]),
                      path$$1.call(
                        argsPath => printSequence(argsPath, options, print),
                        "arguments"
                      )
                    )
                  ])
                ),
                softline$5,
                ")"
              ])
            )
          : "",
        concat$7([" on ", join$6(" | ", path$$1.map(print, "locations"))])
      ]);
    }

    case "EnumTypeExtension":
    case "EnumTypeDefinition": {
      return concat$7([
        path$$1.call(print, "description"),
        n.description ? hardline$6 : "",
        n.kind === "EnumTypeExtension" ? "extend " : "",
        "enum ",
        path$$1.call(print, "name"),
        printDirectives(path$$1, print, n),

        n.values.length > 0
          ? concat$7([
              " {",
              indent$6(
                concat$7([
                  hardline$6,
                  join$6(
                    hardline$6,
                    path$$1.call(
                      valuesPath => printSequence(valuesPath, options, print),
                      "values"
                    )
                  )
                ])
              ),
              hardline$6,
              "}"
            ])
          : ""
      ]);
    }

    case "EnumValueDefinition": {
      return concat$7([
        path$$1.call(print, "description"),
        n.description ? hardline$6 : "",
        path$$1.call(print, "name"),
        printDirectives(path$$1, print, n)
      ]);
    }

    case "InputValueDefinition": {
      return concat$7([
        path$$1.call(print, "description"),
        n.description ? (n.description.block ? hardline$6 : line$4) : "",
        path$$1.call(print, "name"),
        ": ",
        path$$1.call(print, "type"),
        n.defaultValue ? concat$7([" = ", path$$1.call(print, "defaultValue")]) : "",
        printDirectives(path$$1, print, n)
      ]);
    }

    case "InputObjectTypeExtension":
    case "InputObjectTypeDefinition": {
      return concat$7([
        path$$1.call(print, "description"),
        n.description ? hardline$6 : "",
        n.kind === "InputObjectTypeExtension" ? "extend " : "",
        "input ",
        path$$1.call(print, "name"),
        printDirectives(path$$1, print, n),
        n.fields.length > 0
          ? concat$7([
              " {",
              indent$6(
                concat$7([
                  hardline$6,
                  join$6(
                    hardline$6,
                    path$$1.call(
                      fieldsPath => printSequence(fieldsPath, options, print),
                      "fields"
                    )
                  )
                ])
              ),
              hardline$6,
              "}"
            ])
          : ""
      ]);
    }

    case "SchemaDefinition": {
      return concat$7([
        "schema",
        printDirectives(path$$1, print, n),
        " {",
        n.operationTypes.length > 0
          ? indent$6(
              concat$7([
                hardline$6,
                join$6(
                  hardline$6,
                  path$$1.call(
                    opsPath => printSequence(opsPath, options, print),
                    "operationTypes"
                  )
                )
              ])
            )
          : "",
        hardline$6,
        "}"
      ]);
    }

    case "OperationTypeDefinition": {
      return concat$7([
        path$$1.call(print, "operation"),
        ": ",
        path$$1.call(print, "type")
      ]);
    }

    case "InterfaceTypeExtension":
    case "InterfaceTypeDefinition": {
      return concat$7([
        path$$1.call(print, "description"),
        n.description ? hardline$6 : "",
        n.kind === "InterfaceTypeExtension" ? "extend " : "",
        "interface ",
        path$$1.call(print, "name"),
        printDirectives(path$$1, print, n),

        n.fields.length > 0
          ? concat$7([
              " {",
              indent$6(
                concat$7([
                  hardline$6,
                  join$6(
                    hardline$6,
                    path$$1.call(
                      fieldsPath => printSequence(fieldsPath, options, print),
                      "fields"
                    )
                  )
                ])
              ),
              hardline$6,
              "}"
            ])
          : ""
      ]);
    }

    case "FragmentSpread": {
      return concat$7([
        "...",
        path$$1.call(print, "name"),
        printDirectives(path$$1, print, n)
      ]);
    }

    case "InlineFragment": {
      return concat$7([
        "...",
        n.typeCondition
          ? concat$7([" on ", path$$1.call(print, "typeCondition")])
          : "",
        printDirectives(path$$1, print, n),
        " ",
        path$$1.call(print, "selectionSet")
      ]);
    }

    case "UnionTypeExtension":
    case "UnionTypeDefinition": {
      return group$4(
        concat$7([
          path$$1.call(print, "description"),
          n.description ? hardline$6 : "",
          group$4(
            concat$7([
              n.kind === "UnionTypeExtension" ? "extend " : "",
              "union ",
              path$$1.call(print, "name"),
              printDirectives(path$$1, print, n),
              n.types.length > 0
                ? concat$7([
                    " =",
                    ifBreak$3("", " "),
                    indent$6(
                      concat$7([
                        ifBreak$3(concat$7([line$4, "  "])),
                        join$6(concat$7([line$4, "| "]), path$$1.map(print, "types"))
                      ])
                    )
                  ])
                : ""
            ])
          )
        ])
      );
    }

    case "ScalarTypeExtension":
    case "ScalarTypeDefinition": {
      return concat$7([
        path$$1.call(print, "description"),
        n.description ? hardline$6 : "",
        n.kind === "ScalarTypeExtension" ? "extend " : "",
        "scalar ",
        path$$1.call(print, "name"),
        printDirectives(path$$1, print, n)
      ]);
    }

    case "NonNullType": {
      return concat$7([path$$1.call(print, "type"), "!"]);
    }

    case "ListType": {
      return concat$7(["[", path$$1.call(print, "type"), "]"]);
    }

    default:
      /* istanbul ignore next */
      throw new Error("unknown graphql type: " + JSON.stringify(n.kind));
  }
}

function printDirectives(path$$1, print, n) {
  if (n.directives.length === 0) {
    return "";
  }

  return concat$7([
    " ",
    group$4(
      indent$6(
        concat$7([
          softline$5,
          join$6(
            concat$7([ifBreak$3("", " "), softline$5]),
            path$$1.map(print, "directives")
          )
        ])
      )
    )
  ]);
}

function printSequence(sequencePath, options, print) {
  const count = sequencePath.getValue().length;

  return sequencePath.map((path$$1, i) => {
    const printed = print(path$$1);

    if (
      util$1.isNextLineEmpty(options.originalText, path$$1.getValue()) &&
      i < count - 1
    ) {
      return concat$7([printed, hardline$6]);
    }

    return printed;
  });
}

function canAttachComment$1(node) {
  return node.kind && node.kind !== "Comment";
}

function printComment$2(commentPath) {
  const comment = commentPath.getValue();

  switch (comment.kind) {
    case "Comment":
      return "#" + comment.value.trimRight();
    default:
      throw new Error("Not a comment: " + JSON.stringify(comment));
  }
}

var printerGraphql = {
  options: options$4,
  print: genericPrint$2,
  hasPrettierIgnore: util$1.hasIgnoreComment,
  printComment: printComment$2,
  canAttachComment: canAttachComment$1
};

// Based on:
// https://github.com/github/linguist/blob/master/lib/linguist/languages.yml

const languages$3 = [
  {
    name: "GraphQL",
    since: "1.5.0",
    parsers: ["graphql"],
    extensions: [".graphql", ".gql"],
    tmScope: "source.graphql",
    aceMode: "text",
    liguistLanguageId: 139,
    vscodeLanguageIds: ["graphql"]
  }
];

const parsers$3 = {
  graphql: {
    get parse() {
      return require("./parser-graphql");
    },
    astFormat: "graphql"
  }
};

const printers$3 = {
  graphql: printerGraphql
};

var languageGraphql = {
  languages: languages$3,
  parsers: parsers$3,
  printers: printers$3
};

const docBuilders$9 = doc.builders;
const hardline$8 = docBuilders$9.hardline;
const concat$9 = docBuilders$9.concat;
const markAsRoot$1 = docBuilders$9.markAsRoot;

function embed$2(path$$1, print, textToDoc, options) {
  const node = path$$1.getValue();

  if (node.type === "code") {
    const parser = getParserName(node.lang);
    if (parser) {
      const styleUnit = options.__inJsTemplate ? "~" : "`";
      const style = styleUnit.repeat(
        Math.max(3, util$1.getMaxContinuousCount(node.value, styleUnit) + 1)
      );
      const doc$$2 = textToDoc(node.value, { parser });
      return markAsRoot$1(
        concat$9([
          style,
          node.lang,
          hardline$8,
          replaceNewlinesWithHardlines(doc$$2),
          style
        ])
      );
    }
  }

  return null;

  function getParserName(lang) {
    const supportInfo = support.getSupportInfo(null, {
      plugins: options.plugins,
      pluginsLoaded: true
    });
    const language = supportInfo.languages.find(
      language =>
        language.name.toLowerCase() === lang ||
        (language.extensions &&
          language.extensions.find(ext => ext.substring(1) === lang))
    );
    if (language) {
      return language.parsers[0];
    }

    return null;
  }

  function replaceNewlinesWithHardlines(doc$$2) {
    return util$1.mapDoc(
      doc$$2,
      currentDoc =>
        typeof currentDoc === "string" && currentDoc.includes("\n")
          ? concat$9(
              currentDoc
                .split(/(\n)/g)
                .map((v, i) => (i % 2 === 0 ? v : hardline$8))
            )
          : currentDoc
    );
  }
}

var embed_1$2 = embed$2;

const CATEGORY_MARKDOWN = "Markdown";

// format based on https://github.com/prettier/prettier/blob/master/src/common/support.js
var options$6 = {
  proseWrap: {
    since: "1.8.2",
    category: CATEGORY_MARKDOWN,
    type: "choice",
    default: [
      { since: "1.8.2", value: true },
      { since: "1.9.0", value: "preserve" }
    ],
    description: "How to wrap prose. (markdown)",
    choices: [
      {
        since: "1.9.0",
        value: "always",
        description: "Wrap prose if it exceeds the print width."
      },
      {
        since: "1.9.0",
        value: "never",
        description: "Do not wrap prose."
      },
      {
        since: "1.9.0",
        value: "preserve",
        description: "Wrap prose as-is."
      },
      { value: false, deprecated: "1.9.0", redirect: "never" },
      { value: true, deprecated: "1.9.0", redirect: "always" }
    ]
  },
  singleQuote: options.singleQuote
};

const docBuilders$8 = doc.builders;
const concat$8 = docBuilders$8.concat;
const join$7 = docBuilders$8.join;
const line$5 = docBuilders$8.line;
const hardline$7 = docBuilders$8.hardline;
const softline$6 = docBuilders$8.softline;
const fill$4 = docBuilders$8.fill;
const align$2 = docBuilders$8.align;
const printDocToString$2 = doc.printer.printDocToString;


const SINGLE_LINE_NODE_TYPES = [
  "heading",
  "tableCell",
  "footnoteDefinition",
  "link"
];

const SIBLING_NODE_TYPES = ["listItem", "definition", "footnoteDefinition"];

const INLINE_NODE_TYPES = [
  "inlineCode",
  "emphasis",
  "strong",
  "delete",
  "link",
  "linkReference",
  "image",
  "imageReference",
  "footnote",
  "footnoteReference",
  "sentence",
  "whitespace",
  "word",
  "break"
];

const INLINE_NODE_WRAPPER_TYPES = INLINE_NODE_TYPES.concat([
  "tableCell",
  "paragraph",
  "heading"
]);

function genericPrint$3(path$$1, options, print) {
  const node = path$$1.getValue();

  if (shouldRemainTheSameContent(path$$1)) {
    return concat$8(
      util$1
        .splitText(
          options.originalText.slice(
            node.position.start.offset,
            node.position.end.offset
          )
        )
        .map(
          node =>
            node.type === "word"
              ? node.value
              : node.value === "" ? "" : printLine(path$$1, node.value, options)
        )
    );
  }

  switch (node.type) {
    case "root":
      return concat$8([
        normalizeDoc(printChildren(path$$1, options, print)),
        hardline$7
      ]);
    case "paragraph":
      return printChildren(path$$1, options, print, {
        postprocessor: fill$4
      });
    case "sentence":
      return printChildren(path$$1, options, print);
    case "word":
      return node.value
        .replace(/[*]/g, "\\*") // escape all `*`
        .replace(
          new RegExp(
            [
              `(^|[${util$1.punctuationCharRange}])(_+)`,
              `(_+)([${util$1.punctuationCharRange}]|$)`
            ].join("|"),
            "g"
          ),
          (_, text1, underscore1, underscore2, text2) =>
            (underscore1
              ? `${text1}${underscore1}`
              : `${underscore2}${text2}`
            ).replace(/_/g, "\\_")
        ); // escape all `_` except concating with non-punctuation, e.g. `1_2_3` is not considered emphasis
    case "whitespace": {
      const parentNode = path$$1.getParentNode();
      const index = parentNode.children.indexOf(node);
      const nextNode = parentNode.children[index + 1];

      const proseWrap =
        // leading char that may cause different syntax
        nextNode && /^>|^([-+*]|#{1,6}|[0-9]+[.)])$/.test(nextNode.value)
          ? "never"
          : options.proseWrap;

      return printLine(path$$1, node.value, { proseWrap });
    }
    case "emphasis": {
      const parentNode = path$$1.getParentNode();
      const index = parentNode.children.indexOf(node);
      const prevNode = parentNode.children[index - 1];
      const nextNode = parentNode.children[index + 1];
      const hasPrevOrNextWord = // `1*2*3` is considered emphais but `1_2_3` is not
        (prevNode &&
          prevNode.type === "sentence" &&
          prevNode.children.length > 0 &&
          util$1.getLast(prevNode.children).type === "word" &&
          !util$1.getLast(prevNode.children).hasTrailingPunctuation) ||
        (nextNode &&
          nextNode.type === "sentence" &&
          nextNode.children.length > 0 &&
          nextNode.children[0].type === "word" &&
          !nextNode.children[0].hasLeadingPunctuation);
      const style =
        hasPrevOrNextWord || getAncestorNode(path$$1, "emphasis") ? "*" : "_";
      return concat$8([style, printChildren(path$$1, options, print), style]);
    }
    case "strong":
      return concat$8(["**", printChildren(path$$1, options, print), "**"]);
    case "delete":
      return concat$8(["~~", printChildren(path$$1, options, print), "~~"]);
    case "inlineCode": {
      const backtickCount = util$1.getMaxContinuousCount(node.value, "`");
      const style = backtickCount === 1 ? "``" : "`";
      const gap = backtickCount ? " " : "";
      return concat$8([style, gap, node.value, gap, style]);
    }
    case "link":
      switch (options.originalText[node.position.start.offset]) {
        case "<":
          return concat$8(["<", node.url, ">"]);
        case "[":
          return concat$8([
            "[",
            printChildren(path$$1, options, print),
            "](",
            printUrl(node.url, ")"),
            printTitle(node.title, options),
            ")"
          ]);
        default:
          return options.originalText.slice(
            node.position.start.offset,
            node.position.end.offset
          );
      }
    case "image":
      return concat$8([
        "![",
        node.alt || "",
        "](",
        printUrl(node.url, ")"),
        printTitle(node.title, options),
        ")"
      ]);
    case "blockquote":
      return concat$8(["> ", align$2("> ", printChildren(path$$1, options, print))]);
    case "heading":
      return concat$8([
        "#".repeat(node.depth) + " ",
        printChildren(path$$1, options, print)
      ]);
    case "code": {
      if (
        // the first char may point to `\n`, e.g. `\n\t\tbar`, just ignore it
        /^\n?( {4,}|\t)/.test(
          options.originalText.slice(
            node.position.start.offset,
            node.position.end.offset
          )
        )
      ) {
        // indented code block
        const alignment = " ".repeat(4);
        return align$2(
          alignment,
          concat$8([alignment, join$7(hardline$7, node.value.split("\n"))])
        );
      }

      // fenced code block
      const styleUnit = options.__inJsTemplate ? "~" : "`";
      const style = styleUnit.repeat(
        Math.max(3, util$1.getMaxContinuousCount(node.value, styleUnit) + 1)
      );
      return concat$8([
        style,
        node.lang || "",
        hardline$7,
        join$7(hardline$7, node.value.split("\n")),
        hardline$7,
        style
      ]);
    }
    case "yaml":
      return concat$8(["---", hardline$7, node.value, hardline$7, "---"]);
    case "toml":
      return concat$8(["+++", hardline$7, node.value, hardline$7, "+++"]);
    case "html": {
      const parentNode = path$$1.getParentNode();
      return parentNode.type === "root" &&
        util$1.getLast(parentNode.children) === node
        ? node.value.trimRight()
        : node.value;
    }
    case "list": {
      const nthSiblingIndex = getNthListSiblingIndex(
        node,
        path$$1.getParentNode()
      );

      const isGitDiffFriendlyOrderedList =
        node.ordered &&
        node.children.length > 1 &&
        /^\s*1(\.|\))/.test(
          options.originalText.slice(
            node.children[1].position.start.offset,
            node.children[1].position.end.offset
          )
        );

      return printChildren(path$$1, options, print, {
        processor: (childPath, index) => {
          const prefix = node.ordered
            ? (index === 0
                ? node.start
                : isGitDiffFriendlyOrderedList ? 1 : node.start + index) +
              (nthSiblingIndex % 2 === 0 ? ". " : ") ")
            : nthSiblingIndex % 2 === 0 ? "* " : "- ";
          return concat$8([
            prefix,
            align$2(
              " ".repeat(prefix.length),
              printListItem(childPath, options, print, prefix)
            )
          ]);
        }
      });
    }
    case "thematicBreak": {
      const counter = getAncestorCounter(path$$1, "list");
      if (counter === -1) {
        return "---";
      }
      const nthSiblingIndex = getNthListSiblingIndex(
        path$$1.getParentNode(counter),
        path$$1.getParentNode(counter + 1)
      );
      return nthSiblingIndex % 2 === 0 ? "---" : "***";
    }
    case "linkReference":
      return concat$8([
        "[",
        printChildren(path$$1, options, print),
        "]",
        node.referenceType === "full"
          ? concat$8(["[", node.identifier, "]"])
          : node.referenceType === "collapsed" ? "[]" : ""
      ]);
    case "imageReference":
      switch (node.referenceType) {
        case "full":
          return concat$8(["![", node.alt || "", "][", node.identifier, "]"]);
        default:
          return concat$8([
            "![",
            node.alt,
            "]",
            node.referenceType === "collapsed" ? "[]" : ""
          ]);
      }
    case "definition":
      return concat$8([
        "[",
        node.identifier,
        "]: ",
        printUrl(node.url),
        printTitle(node.title, options)
      ]);
    case "footnote":
      return concat$8(["[^", printChildren(path$$1, options, print), "]"]);
    case "footnoteReference":
      return concat$8(["[^", node.identifier, "]"]);
    case "footnoteDefinition":
      return concat$8([
        "[^",
        node.identifier,
        "]: ",
        printChildren(path$$1, options, print)
      ]);
    case "table":
      return printTable(path$$1, options, print);
    case "tableCell":
      return printChildren(path$$1, options, print);
    case "break":
      return concat$8([
        /\s/.test(options.originalText[node.position.start.offset])
          ? "  "
          : "\\",
        hardline$7
      ]);
    case "tableRow": // handled in "table"
    case "listItem": // handled in "list"
    default:
      throw new Error(`Unknown markdown type ${JSON.stringify(node.type)}`);
  }
}

function printListItem(path$$1, options, print, listPrefix) {
  const node = path$$1.getValue();
  const prefix = node.checked === null ? "" : node.checked ? "[x] " : "[ ] ";
  return concat$8([
    prefix,
    printChildren(path$$1, options, print, {
      processor: (childPath, index) => {
        if (index === 0 && childPath.getValue().type !== "list") {
          return align$2(" ".repeat(prefix.length), childPath.call(print));
        }

        const alignment = " ".repeat(
          clamp(options.tabWidth - listPrefix.length, 0, 3) // 4 will cause indented codeblock
        );
        return concat$8([alignment, align$2(alignment, childPath.call(print))]);
      }
    })
  ]);
}

function getNthListSiblingIndex(node, parentNode) {
  return getNthSiblingIndex(
    node,
    parentNode,
    siblingNode => siblingNode.ordered === node.ordered
  );
}

function getNthSiblingIndex(node, parentNode, condition) {
  condition = condition || (() => true);

  let index = -1;

  for (const childNode of parentNode.children) {
    if (childNode.type === node.type && condition(childNode)) {
      index++;
    } else {
      index = -1;
    }

    if (childNode === node) {
      return index;
    }
  }
}

function getAncestorCounter(path$$1, typeOrTypes) {
  const types = [].concat(typeOrTypes);

  let counter = -1;
  let ancestorNode;

  while ((ancestorNode = path$$1.getParentNode(++counter))) {
    if (types.indexOf(ancestorNode.type) !== -1) {
      return counter;
    }
  }

  return -1;
}

function getAncestorNode(path$$1, typeOrTypes) {
  const counter = getAncestorCounter(path$$1, typeOrTypes);
  return counter === -1 ? null : path$$1.getParentNode(counter);
}

function printLine(path$$1, value, options) {
  if (options.proseWrap === "preserve" && value === "\n") {
    return hardline$7;
  }

  const isBreakable =
    options.proseWrap === "always" &&
    !getAncestorNode(path$$1, SINGLE_LINE_NODE_TYPES);
  return value !== ""
    ? isBreakable ? line$5 : " "
    : isBreakable ? softline$6 : "";
}

function printTable(path$$1, options, print) {
  const node = path$$1.getValue();
  const contents = []; // { [rowIndex: number]: { [columnIndex: number]: string } }

  path$$1.map(rowPath => {
    const rowContents = [];

    rowPath.map(cellPath => {
      rowContents.push(
        printDocToString$2(cellPath.call(print), options).formatted
      );
    }, "children");

    contents.push(rowContents);
  }, "children");

  const columnMaxWidths = contents.reduce(
    (currentWidths, rowContents) =>
      currentWidths.map((width, columnIndex) =>
        Math.max(width, util$1.getStringWidth(rowContents[columnIndex]))
      ),
    contents[0].map(() => 3) // minimum width = 3 (---, :--, :-:, --:)
  );

  return join$7(hardline$7, [
    printRow(contents[0]),
    printSeparator(),
    join$7(hardline$7, contents.slice(1).map(printRow))
  ]);

  function printSeparator() {
    return concat$8([
      "| ",
      join$7(
        " | ",
        columnMaxWidths.map((width, index) => {
          switch (node.align[index]) {
            case "left":
              return ":" + "-".repeat(width - 1);
            case "right":
              return "-".repeat(width - 1) + ":";
            case "center":
              return ":" + "-".repeat(width - 2) + ":";
            default:
              return "-".repeat(width);
          }
        })
      ),
      " |"
    ]);
  }

  function printRow(rowContents) {
    return concat$8([
      "| ",
      join$7(
        " | ",
        rowContents.map((rowContent, columnIndex) => {
          switch (node.align[columnIndex]) {
            case "right":
              return alignRight(rowContent, columnMaxWidths[columnIndex]);
            case "center":
              return alignCenter(rowContent, columnMaxWidths[columnIndex]);
            default:
              return alignLeft(rowContent, columnMaxWidths[columnIndex]);
          }
        })
      ),
      " |"
    ]);
  }

  function alignLeft(text, width) {
    return concat$8([text, " ".repeat(width - util$1.getStringWidth(text))]);
  }

  function alignRight(text, width) {
    return concat$8([" ".repeat(width - util$1.getStringWidth(text)), text]);
  }

  function alignCenter(text, width) {
    const spaces = width - util$1.getStringWidth(text);
    const left = Math.floor(spaces / 2);
    const right = spaces - left;
    return concat$8([" ".repeat(left), text, " ".repeat(right)]);
  }
}

function printChildren(path$$1, options, print, events) {
  events = events || {};

  const postprocessor = events.postprocessor || concat$8;
  const processor = events.processor || (childPath => childPath.call(print));

  const node = path$$1.getValue();
  const parts = [];

  let counter = 0;
  let lastChildNode;
  let prettierIgnore = false;

  path$$1.map((childPath, index) => {
    const childNode = childPath.getValue();

    const result = prettierIgnore
      ? options.originalText.slice(
          childNode.position.start.offset,
          childNode.position.end.offset
        )
      : processor(childPath, index);

    prettierIgnore = false;

    if (result !== false) {
      prettierIgnore = isPrettierIgnore(childNode);

      const data = {
        parts,
        index: counter++,
        prevNode: lastChildNode,
        parentNode: node,
        options
      };

      if (!shouldNotPrePrintHardline(childNode, data)) {
        parts.push(hardline$7);

        if (
          shouldPrePrintDoubleHardline(childNode, data) ||
          shouldPrePrintTripleHardline(childNode, data)
        ) {
          parts.push(hardline$7);
        }

        if (shouldPrePrintTripleHardline(childNode, data)) {
          parts.push(hardline$7);
        }
      }

      parts.push(result);

      lastChildNode = childNode;
    }
  }, "children");

  return postprocessor(parts);
}

function isPrettierIgnore(node) {
  return (
    node.type === "html" && /^<!--\s*prettier-ignore\s*-->$/.test(node.value)
  );
}

function shouldNotPrePrintHardline(node, data) {
  const isFirstNode = data.parts.length === 0;
  const isInlineNode = INLINE_NODE_TYPES.indexOf(node.type) !== -1;

  const isInlineHTML =
    node.type === "html" &&
    INLINE_NODE_WRAPPER_TYPES.indexOf(data.parentNode.type) !== -1;

  return isFirstNode || isInlineNode || isInlineHTML;
}

function shouldPrePrintDoubleHardline(node, data) {
  const isSequence = (data.prevNode && data.prevNode.type) === node.type;
  const isSiblingNode =
    isSequence && SIBLING_NODE_TYPES.indexOf(node.type) !== -1;

  const isInTightListItem =
    data.parentNode.type === "listItem" && !data.parentNode.loose;

  const isPrevNodeLooseListItem =
    data.prevNode && data.prevNode.type === "listItem" && data.prevNode.loose;

  const isPrevNodePrettierIgnore = isPrettierIgnore(data.prevNode);

  return (
    isPrevNodeLooseListItem ||
    !(isSiblingNode || isInTightListItem || isPrevNodePrettierIgnore)
  );
}

function shouldPrePrintTripleHardline(node, data) {
  const isPrevNodeList = data.prevNode && data.prevNode.type === "list";
  const isIndentedCode =
    node.type === "code" &&
    /\s/.test(data.options.originalText[node.position.start.offset]);

  return isPrevNodeList && isIndentedCode;
}

function shouldRemainTheSameContent(path$$1) {
  const ancestorNode = getAncestorNode(path$$1, [
    "linkReference",
    "imageReference"
  ]);

  return (
    ancestorNode &&
    (ancestorNode.type !== "linkReference" ||
      ancestorNode.referenceType !== "full")
  );
}

function normalizeDoc(doc$$2) {
  return util$1.mapDoc(doc$$2, currentDoc => {
    if (!currentDoc.parts) {
      return currentDoc;
    }

    if (currentDoc.type === "concat" && currentDoc.parts.length === 1) {
      return currentDoc.parts[0];
    }

    const parts = [];

    currentDoc.parts.forEach(part => {
      if (part.type === "concat") {
        parts.push.apply(parts, part.parts);
      } else if (part !== "") {
        parts.push(part);
      }
    });

    return Object.assign({}, currentDoc, {
      parts: normalizeParts(parts)
    });
  });
}

function printUrl(url$$1, dangerousCharOrChars) {
  const dangerousChars = [" "].concat(dangerousCharOrChars || []);
  return new RegExp(dangerousChars.map(x => `\\${x}`).join("|")).test(url$$1)
    ? `<${url$$1}>`
    : url$$1;
}

function printTitle(title, options) {
  if (!title) {
    return "";
  }
  if (title.includes('"') && title.includes("'") && !title.includes(")")) {
    return ` (${title})`; // avoid escaped quotes
  }
  // faster than using RegExps: https://jsperf.com/performance-of-match-vs-split
  const singleCount = title.split("'").length - 1;
  const doubleCount = title.split('"').length - 1;
  const quote =
    singleCount > doubleCount
      ? '"'
      : doubleCount > singleCount ? "'" : options.singleQuote ? "'" : '"';
  title = title.replace(new RegExp(`(${quote})`, "g"), "\\$1");
  return ` ${quote}${title}${quote}`;
}

function normalizeParts(parts) {
  return parts.reduce((current, part) => {
    const lastPart = util$1.getLast(current);

    if (typeof lastPart === "string" && typeof part === "string") {
      current.splice(-1, 1, lastPart + part);
    } else {
      current.push(part);
    }

    return current;
  }, []);
}

function clamp(value, min, max) {
  return value < min ? min : value > max ? max : value;
}

function clean$5(ast, newObj) {
  // for markdown codeblock
  if (ast.type === "code") {
    delete newObj.value;
  }
  // for markdown whitespace: "\n" and " " are considered the same
  if (ast.type === "whitespace" && ast.value === "\n") {
    newObj.value = " ";
  }
}

var printerMarkdown = {
  options: options$6,
  print: genericPrint$3,
  embed: embed_1$2,
  massageAstNode: clean$5,
  hasPrettierIgnore: util$1.hasIgnoreComment
};

// Based on:
// https://github.com/github/linguist/blob/master/lib/linguist/languages.yml

const languages$4 = [
  {
    name: "Markdown",
    since: "1.8.0",
    parsers: ["remark"],
    aliases: ["pandoc"],
    aceMode: "markdown",
    codemirrorMode: "gfm",
    codemirrorMimeType: "text/x-gfm",
    wrap: true,
    extensions: [
      ".md",
      ".markdown",
      ".mdown",
      ".mdwn",
      ".mkd",
      ".mkdn",
      ".mkdown",
      ".ron",
      ".workbook"
    ],
    filenames: ["README"],
    tmScope: "source.gfm",
    linguistLanguageId: 222,
    vscodeLanguageIds: ["markdown"]
  }
];

const remark = {
  get parse() {
    return require("./parser-markdown");
  },
  astFormat: "mdast"
};

const parsers$4 = {
  remark,
  // TODO: Delete this in 2.0
  markdown: remark
};

const printers$4 = {
  mdast: printerMarkdown
};

var languageMarkdown = {
  languages: languages$4,
  parsers: parsers$4,
  printers: printers$4
};

const docUtils$4 = doc.utils;
const docBuilders$11 = doc.builders;
const hardline$10 = docBuilders$11.hardline;
const concat$11 = docBuilders$11.concat;

function embed$4(path$$1, print, textToDoc, options) {
  const node = path$$1.getValue();

  switch (node.type) {
    case "text": {
      const parent = path$$1.getParentNode();
      // Inline JavaScript
      if (
        parent.type === "script" &&
        ((!parent.attribs.lang && !parent.attribs.lang) ||
          parent.attribs.type === "text/javascript" ||
          parent.attribs.type === "application/javascript")
      ) {
        const parser = options.parser === "flow" ? "flow" : "babylon";
        const doc$$2 = textToDoc(getText(options, node), { parser });
        return concat$11([hardline$10, doc$$2]);
      }

      // Inline TypeScript
      if (
        parent.type === "script" &&
        (parent.attribs.type === "application/x-typescript" ||
          parent.attribs.lang === "ts")
      ) {
        const doc$$2 = textToDoc(
          getText(options, node),
          { parser: "typescript" },
          options
        );
        return concat$11([hardline$10, doc$$2]);
      }

      // Inline Styles
      if (parent.type === "style") {
        const doc$$2 = textToDoc(getText(options, node), { parser: "css" });
        return concat$11([hardline$10, docUtils$4.stripTrailingHardline(doc$$2)]);
      }

      break;
    }

    case "attribute": {
      /*
       * Vue binding sytax: JS expressions
       * :class="{ 'some-key': value }"
       * v-bind:id="'list-' + id"
       * v-if="foo && !bar"
       * @click="someFunction()"
       */
      if (/(^@)|(^v-)|:/.test(node.key) && !/^\w+$/.test(node.value)) {
        const doc$$2 = textToDoc(node.value, {
          parser: parseJavaScriptExpression,
          // Use singleQuote since HTML attributes use double-quotes.
          // TODO(azz): We still need to do an entity escape on the attribute.
          singleQuote: true
        });
        return concat$11([
          node.key,
          '="',
          util$1.hasNewlineInRange(node.value, 0, node.value.length)
            ? doc$$2
            : docUtils$4.removeLines(doc$$2),
          '"'
        ]);
      }
    }
  }
}

function parseJavaScriptExpression(text, parsers) {
  // Force parsing as an expression
  const ast = parsers.babylon(`(${text})`);
  // Extract expression from the declaration
  return {
    type: "File",
    program: ast.program.body[0].expression
  };
}

function getText(options, node) {
  return options.originalText.slice(util$1.locStart(node), util$1.locEnd(node));
}

var embed_1$4 = embed$4;

const docBuilders$10 = doc.builders;
const concat$10 = docBuilders$10.concat;
const join$8 = docBuilders$10.join;
const hardline$9 = docBuilders$10.hardline;
const line$6 = docBuilders$10.line;
const softline$7 = docBuilders$10.softline;
const group$5 = docBuilders$10.group;
const indent$7 = docBuilders$10.indent;
// const ifBreak = docBuilders.ifBreak;

// http://w3c.github.io/html/single-page.html#void-elements
const voidTags$1 = {
  area: true,
  base: true,
  br: true,
  col: true,
  embed: true,
  hr: true,
  img: true,
  input: true,
  link: true,
  meta: true,
  param: true,
  source: true,
  track: true,
  wbr: true
};

function genericPrint$4(path$$1, options, print) {
  const n = path$$1.getValue();
  if (!n) {
    return "";
  }

  if (typeof n === "string") {
    return n;
  }

  switch (n.type) {
    case "root": {
      return printChildren$1(path$$1, print);
    }
    case "directive": {
      return concat$10(["<", n.data, ">", hardline$9]);
    }
    case "text": {
      return n.data.replace(/\s+/g, " ").trim();
    }
    case "script":
    case "style":
    case "tag": {
      const selfClose = voidTags$1[n.name] ? ">" : " />";
      const children = printChildren$1(path$$1, print);

      const hasNewline = util$1.hasNewlineInRange(
        options.originalText,
        util$1.locStart(n),
        util$1.locEnd(n)
      );

      return group$5(
        concat$10([
          hasNewline ? hardline$9 : "",
          "<",
          n.name,
          printAttributes(path$$1, print),

          n.children.length ? ">" : selfClose,

          n.name.toLowerCase() === "html"
            ? concat$10([hardline$9, children])
            : indent$7(children),
          n.children.length ? concat$10([softline$7, "</", n.name, ">"]) : hardline$9
        ])
      );
    }
    case "comment": {
      return concat$10(["<!-- ", n.data.trim(), " -->"]);
    }
    case "attribute": {
      if (!n.value) {
        return n.key;
      }
      return concat$10([n.key, '="', n.value, '"']);
    }

    default:
      /* istanbul ignore next */
      throw new Error("unknown htmlparser2 type: " + n.type);
  }
}

function printAttributes(path$$1, print) {
  const node = path$$1.getValue();

  return concat$10([
    node.attributes.length ? " " : "",
    indent$7(join$8(line$6, path$$1.map(print, "attributes")))
  ]);
}

function printChildren$1(path$$1, print) {
  const children = [];
  path$$1.each(childPath => {
    const child = childPath.getValue();
    if (child.type !== "text") {
      children.push(hardline$9);
    }
    children.push(childPath.call(print));
  }, "children");
  return concat$10(children);
}

var printerHtmlparser2 = {
  print: genericPrint$4,
  embed: embed_1$4,
  hasPrettierIgnore: util$1.hasIgnoreComment
};

// Based on:
// https://github.com/github/linguist/blob/master/lib/linguist/languages.yml

const languages$5 = [
  {
    name: "HTML",
    since: undefined, // unreleased
    parsers: ["parse5"],
    group: "HTML",
    tmScope: "text.html.basic",
    aceMode: "html",
    codemirrorMode: "htmlmixed",
    codemirrorMimeType: "text/html",
    aliases: ["xhtml"],
    extensions: [".html", ".htm", ".html.hl", ".inc", ".st", ".xht", ".xhtml"],
    linguistLanguageId: 146,
    vscodeLanguageIds: ["html"]
  }
];

const parsers$5 = {
  parse5: {
    get parse() {
      return require("./parser-parse5");
    },
    astFormat: "htmlparser2"
  }
};

const printers$5 = {
  htmlparser2: printerHtmlparser2
};

var languageHtml = {
  languages: languages$5,
  parsers: parsers$5,
  printers: printers$5
};

const docBuilders$13 = doc.builders;
const concat$13 = docBuilders$13.concat;
const hardline$12 = docBuilders$13.hardline;

function embed$6(path$$1, print, textToDoc, options) {
  const node = path$$1.getValue();
  const parent = path$$1.getParentNode();
  if (!parent || parent.tag !== "root") {
    return null;
  }

  let parser;

  if (node.tag === "style") {
    const langAttr = node.attrs.find(attr => attr.name === "lang");
    if (!langAttr || langAttr.value === "postcss") {
      parser = "css";
    } else if (langAttr.value === "scss") {
      parser = "scss";
    } else if (langAttr.value === "less") {
      parser = "less";
    }
  }

  if (node.tag === "script") {
    const langAttr = node.attrs.find(attr => attr.name === "lang");
    if (!langAttr) {
      parser = "babylon";
    } else if (langAttr.value === "ts" || langAttr.value === "tsx") {
      parser = "typescript";
    }
  }

  if (!parser) {
    return null;
  }

  return concat$13([
    options.originalText.slice(node.start, node.contentStart),
    hardline$12,
    textToDoc(options.originalText.slice(node.contentStart, node.contentEnd), {
      parser
    }),
    options.originalText.slice(node.contentEnd, node.end)
  ]);
}

var embed_1$6 = embed$6;

const docBuilders$12 = doc.builders;
const concat$12 = docBuilders$12.concat;
const hardline$11 = docBuilders$12.hardline;

function genericPrint$5(path$$1, options, print) {
  const n = path$$1.getValue();
  const res = [];
  let index = n.start;

  path$$1.each(childPath => {
    const child = childPath.getValue();
    res.push(options.originalText.slice(index, child.start));
    res.push(childPath.call(print));
    index = child.end;
  }, "children");

  // If there are no children, we just print the node from start to end.
  // Otherwise, index should point to the end of the last child, and we
  // need to print the closing tag.
  res.push(options.originalText.slice(index, n.end));

  // Only force a trailing newline if there were any contents.
  if (n.tag === "root" && n.children.length) {
    res.push(hardline$11);
  }

  return concat$12(res);
}

const clean$6 = (ast, newObj) => {
  delete newObj.contentStart;
  delete newObj.contentEnd;
};

var printerVue = {
  print: genericPrint$5,
  embed: embed_1$6,
  massageAstNode: clean$6
};

// Based on:
// https://github.com/github/linguist/blob/master/lib/linguist/languages.yml

const languages$6 = [
  {
    name: "Vue",
    since: "1.10.0",
    parsers: ["vue"],
    group: "HTML",
    tmScope: "text.html.vue",
    aceMode: "html",
    codemirrorMode: "htmlmixed",
    codemirrorMimeType: "text/html",
    extensions: [".vue"],
    linguistLanguageId: 146,
    vscodeLanguageIds: ["vue"]
  }
];

const parsers$6 = {
  vue: {
    get parse() {
      return require("./parser-vue");
    },
    astFormat: "vue"
  }
};

const printers$6 = {
  vue: printerVue
};

var languageVue = {
  languages: languages$6,
  parsers: parsers$6,
  printers: printers$6
};

function loadPlugins(plugins) {
  plugins = plugins || [];

  const internalPlugins = [
    languageJs,
    languageCss,
    languageHandlebars,
    languageGraphql,
    languageMarkdown,
    languageHtml,
    languageVue
  ];

  const externalPlugins = plugins
    .concat(
      getPluginsFromPackage(
        readPkgUp.sync({
          normalize: false
        }).pkg
      )
    )
    .map(plugin => {
      if (typeof plugin !== "string") {
        return plugin;
      }

      const pluginPath = resolve.sync(plugin, { basedir: process.cwd() });
      return require(pluginPath);
    });

  return deduplicate(internalPlugins.concat(externalPlugins));
}

function getPluginsFromPackage(pkg) {
  if (!pkg) {
    return [];
  }
  const deps = Object.assign({}, pkg.dependencies, pkg.devDependencies);
  return Object.keys(deps).filter(
    dep =>
      dep.startsWith("prettier-plugin-") || dep.startsWith("@prettier/plugin-")
  );
}

function deduplicate(items) {
  const uniqItems = [];
  for (const item of items) {
    if (uniqItems.indexOf(item) < 0) {
      uniqItems.push(item);
    }
  }
  return uniqItems;
}

var loadPlugins_1 = loadPlugins;

var require$$0$12 = ( _package$1 && _package ) || _package$1;

const currentVersion = require$$0$12.version;


const CATEGORY_GLOBAL = "Global";
const CATEGORY_SPECIAL = "Special";

/**
 * @typedef {Object} OptionInfo
 * @property {string} since - available since version
 * @property {string} category
 * @property {'int' | 'boolean' | 'choice' | 'path'} type
 * @property {boolean} array - indicate it's an array of the specified type
 * @property {boolean?} deprecated - deprecated since version
 * @property {OptionRedirectInfo?} redirect - redirect deprecated option
 * @property {string} description
 * @property {string?} oppositeDescription - for `false` option
 * @property {OptionValueInfo} default
 * @property {OptionRangeInfo?} range - for type int
 * @property {OptionChoiceInfo?} choices - for type choice
 * @property {(value: any) => boolean} exception
 *
 * @typedef {number | boolean | string} OptionValue
 * @typedef {OptionValue | [{ value: OptionValue[] }] | Array<{ since: string, value: OptionValue}>} OptionValueInfo
 *
 * @typedef {Object} OptionRedirectInfo
 * @property {string} option
 * @property {OptionValue} value
 *
 * @typedef {Object} OptionRangeInfo
 * @property {number} start - recommended range start
 * @property {number} end - recommended range end
 * @property {number} step - recommended range step
 *
 * @typedef {Object} OptionChoiceInfo
 * @property {boolean | string} value - boolean for the option that is originally boolean type
 * @property {string?} description - undefined if redirect
 * @property {string?} since - undefined if available since the first version of the option
 * @property {string?} deprecated - deprecated since version
 * @property {OptionValueInfo?} redirect - redirect deprecated value
 */
/** @type {{ [name: string]: OptionInfo } */
const supportOptions = {
  cursorOffset: {
    since: "1.4.0",
    category: CATEGORY_SPECIAL,
    type: "int",
    default: -1,
    range: { start: -1, end: Infinity, step: 1 },
    description: dedent_1`
      Print (to stderr) where a cursor at the given position would move to after formatting.
      This option cannot be used with --range-start and --range-end.
    `
  },
  filepath: {
    since: "1.4.0",
    category: CATEGORY_SPECIAL,
    type: "path",
    default: undefined,
    description:
      "Specify the input filepath. This will be used to do parser inference."
  },
  insertPragma: {
    since: "1.8.0",
    category: CATEGORY_SPECIAL,
    type: "boolean",
    default: false,
    description: "Insert @format pragma into file's first docblock comment."
  },
  parser: {
    since: "0.0.10",
    category: CATEGORY_GLOBAL,
    type: "choice",
    default: "babylon",
    description: "Which parser to use.",
    exception: value =>
      typeof value === "string" || typeof value === "function",
    choices: [
      { value: "flow", description: "Flow" },
      { value: "babylon", description: "JavaScript" },
      { value: "typescript", since: "1.4.0", description: "TypeScript" },
      { value: "css", since: "1.7.1", description: "CSS" },
      {
        value: "postcss",
        since: "1.4.0",
        description: "CSS/Less/SCSS",
        deprecated: "1.7.1",
        redirect: "css"
      },
      { value: "less", since: "1.7.1", description: "Less" },
      { value: "scss", since: "1.7.1", description: "SCSS" },
      { value: "json", since: "1.5.0", description: "JSON" },
      { value: "graphql", since: "1.5.0", description: "GraphQL" },
      { value: "markdown", since: "1.8.0", description: "Markdown" },
      { value: "vue", since: "1.10.0", description: "Vue" }
    ]
  },
  plugins: {
    since: "1.10.0",
    type: "path",
    array: true,
    default: [{ value: [] }],
    category: CATEGORY_GLOBAL,
    description:
      "Add a plugin. Multiple plugins can be passed as separate `--plugin`s.",
    exception: value => typeof value === "string" || typeof value === "object"
  },
  printWidth: {
    since: "0.0.0",
    category: CATEGORY_GLOBAL,
    type: "int",
    default: 80,
    description: "The line length where Prettier will try wrap.",
    range: { start: 0, end: Infinity, step: 1 }
  },
  rangeEnd: {
    since: "1.4.0",
    category: CATEGORY_SPECIAL,
    type: "int",
    default: Infinity,
    range: { start: 0, end: Infinity, step: 1 },
    description: dedent_1`
      Format code ending at a given character offset (exclusive).
      The range will extend forwards to the end of the selected statement.
      This option cannot be used with --cursor-offset.
    `
  },
  rangeStart: {
    since: "1.4.0",
    category: CATEGORY_SPECIAL,
    type: "int",
    default: 0,
    range: { start: 0, end: Infinity, step: 1 },
    description: dedent_1`
      Format code starting at a given character offset.
      The range will extend backwards to the start of the first line containing the selected statement.
      This option cannot be used with --cursor-offset.
    `
  },
  requirePragma: {
    since: "1.7.0",
    category: CATEGORY_SPECIAL,
    type: "boolean",
    default: false,
    description: dedent_1`
      Require either '@prettier' or '@format' to be present in the file's first docblock comment
      in order for it to be formatted.
    `
  },
  tabWidth: {
    type: "int",
    category: CATEGORY_GLOBAL,
    default: 2,
    description: "Number of spaces per indentation level.",
    range: { start: 0, end: Infinity, step: 1 }
  },
  useFlowParser: {
    since: "0.0.0",
    category: CATEGORY_GLOBAL,
    type: "boolean",
    default: false,
    deprecated: "0.0.10",
    description: "Use flow parser.",
    redirect: { option: "parser", value: "flow" }
  },
  useTabs: {
    since: "1.0.0",
    category: CATEGORY_GLOBAL,
    type: "boolean",
    default: false,
    description: "Indent with tabs instead of spaces."
  }
};

function getSupportInfo$1(version, opts) {
  opts = Object.assign(
    {
      plugins: [],
      pluginsLoaded: false,
      showUnreleased: false,
      showDeprecated: false
    },
    opts
  );

  if (!version) {
    version = currentVersion;
  }

  const plugins = opts.pluginsLoaded ? opts.plugins : loadPlugins_1(opts.plugins);

  const options = util$1
    .arrayify(
      Object.assign(
        plugins
          .reduce(
            (currentPrinters, plugin) =>
              currentPrinters.concat(
                Object.keys(plugin.printers).map(
                  printerName => plugin.printers[printerName]
                )
              ),
            []
          )
          .reduce(
            (currentOptions, printer) =>
              Object.assign(currentOptions, printer.options),
            {}
          ),
        supportOptions
      ),
      "name"
    )
    .sort((a, b) => (a.name === b.name ? 0 : a.name < b.name ? -1 : 1))
    .filter(filterSince)
    .filter(filterDeprecated)
    .map(mapDeprecated)
    .map(option => {
      const newOption = Object.assign({}, option);

      if (Array.isArray(newOption.default)) {
        newOption.default =
          newOption.default.length === 1
            ? newOption.default[0].value
            : newOption.default
                .filter(filterSince)
                .sort((info1, info2) =>
                  semver.compare(info2.since, info1.since)
                )[0].value;
      }

      if (Array.isArray(newOption.choices)) {
        newOption.choices = newOption.choices
          .filter(filterSince)
          .filter(filterDeprecated)
          .map(mapDeprecated);
      }

      return newOption;
    });

  const usePostCssParser = semver.lt(version, "1.7.1");

  const languages = plugins
    .reduce((all, plugin) => all.concat(plugin.languages), [])
    .filter(language => language.since && semver.gte(version, language.since))
    .map(language => {
      // Prevent breaking changes
      if (language.name === "Markdown") {
        return Object.assign({}, language, {
          parsers: ["markdown"]
        });
      }
      if (language.name === "TypeScript") {
        return Object.assign({}, language, {
          parsers: ["typescript"]
        });
      }

      if (usePostCssParser && language.group === "CSS") {
        return Object.assign({}, language, {
          parsers: ["postcss"]
        });
      }
      return language;
    });

  return { languages, options };

  function filterSince(object) {
    return (
      opts.showUnreleased ||
      !("since" in object) ||
      (object.since && semver.gte(version, object.since))
    );
  }
  function filterDeprecated(object) {
    return (
      opts.showDeprecated ||
      !("deprecated" in object) ||
      (object.deprecated && semver.lt(version, object.deprecated))
    );
  }
  function mapDeprecated(object) {
    if (!object.deprecated || opts.showDeprecated) {
      return object;
    }
    const newObject = Object.assign({}, object);
    delete newObject.deprecated;
    delete newObject.redirect;
    return newObject;
  }
}

var support = {
  getSupportInfo: getSupportInfo$1
};

const startsWithNoLookaheadToken$1 = util$1.startsWithNoLookaheadToken;

function FastPath(value) {
  assert.ok(this instanceof FastPath);
  this.stack = [value];
}

// The name of the current property is always the penultimate element of
// this.stack, and always a String.
FastPath.prototype.getName = function getName() {
  const s = this.stack;
  const len = s.length;
  if (len > 1) {
    return s[len - 2];
  }
  // Since the name is always a string, null is a safe sentinel value to
  // return if we do not know the name of the (root) value.
  /* istanbul ignore next */
  return null;
};

// The value of the current property is always the final element of
// this.stack.
FastPath.prototype.getValue = function getValue() {
  const s = this.stack;
  return s[s.length - 1];
};

function getNodeHelper(path$$1, count) {
  const s = path$$1.stack;

  for (let i = s.length - 1; i >= 0; i -= 2) {
    const value = s[i];

    if (value && !Array.isArray(value) && --count < 0) {
      return value;
    }
  }

  return null;
}

FastPath.prototype.getNode = function getNode(count) {
  return getNodeHelper(this, ~~count);
};

FastPath.prototype.getParentNode = function getParentNode(count) {
  return getNodeHelper(this, ~~count + 1);
};

// Temporarily push properties named by string arguments given after the
// callback function onto this.stack, then call the callback with a
// reference to this (modified) FastPath object. Note that the stack will
// be restored to its original state after the callback is finished, so it
// is probably a mistake to retain a reference to the path.
FastPath.prototype.call = function call(callback /*, name1, name2, ... */) {
  const s = this.stack;
  const origLen = s.length;
  let value = s[origLen - 1];
  const argc = arguments.length;
  for (let i = 1; i < argc; ++i) {
    const name = arguments[i];
    value = value[name];
    s.push(name, value);
  }
  const result = callback(this);
  s.length = origLen;
  return result;
};

// Similar to FastPath.prototype.call, except that the value obtained by
// accessing this.getValue()[name1][name2]... should be array-like. The
// callback will be called with a reference to this path object for each
// element of the array.
FastPath.prototype.each = function each(callback /*, name1, name2, ... */) {
  const s = this.stack;
  const origLen = s.length;
  let value = s[origLen - 1];
  const argc = arguments.length;

  for (let i = 1; i < argc; ++i) {
    const name = arguments[i];
    value = value[name];
    s.push(name, value);
  }

  for (let i = 0; i < value.length; ++i) {
    if (i in value) {
      s.push(i, value[i]);
      // If the callback needs to know the value of i, call
      // path.getName(), assuming path is the parameter name.
      callback(this);
      s.length -= 2;
    }
  }

  s.length = origLen;
};

// Similar to FastPath.prototype.each, except that the results of the
// callback function invocations are stored in an array and returned at
// the end of the iteration.
FastPath.prototype.map = function map(callback /*, name1, name2, ... */) {
  const s = this.stack;
  const origLen = s.length;
  let value = s[origLen - 1];
  const argc = arguments.length;

  for (let i = 1; i < argc; ++i) {
    const name = arguments[i];
    value = value[name];
    s.push(name, value);
  }

  const result = new Array(value.length);

  for (let i = 0; i < value.length; ++i) {
    if (i in value) {
      s.push(i, value[i]);
      result[i] = callback(this, i);
      s.length -= 2;
    }
  }

  s.length = origLen;

  return result;
};

FastPath.prototype.needsParens = function(options) {
  const parent = this.getParentNode();
  if (!parent) {
    return false;
  }

  const name = this.getName();
  const node = this.getNode();

  // If the value of this path is some child of a Node and not a Node
  // itself, then it doesn't need parentheses. Only Node objects (in
  // fact, only Expression nodes) need parentheses.
  if (this.getValue() !== node) {
    return false;
  }

  // Only statements don't need parentheses.
  if (isStatement(node)) {
    return false;
  }

  // Closure compiler requires that type casted expressions to be surrounded by
  // parentheses.
  if (util$1.hasClosureCompilerTypeCastComment(options.originalText, node)) {
    return true;
  }

  // Identifiers never need parentheses.
  if (node.type === "Identifier") {
    return false;
  }

  if (parent.type === "ParenthesizedExpression") {
    return false;
  }

  // Add parens around the extends clause of a class. It is needed for almost
  // all expressions.
  if (
    (parent.type === "ClassDeclaration" || parent.type === "ClassExpression") &&
    parent.superClass === node &&
    (node.type === "ArrowFunctionExpression" ||
      node.type === "AssignmentExpression" ||
      node.type === "AwaitExpression" ||
      node.type === "BinaryExpression" ||
      node.type === "ConditionalExpression" ||
      node.type === "LogicalExpression" ||
      node.type === "NewExpression" ||
      node.type === "ObjectExpression" ||
      node.type === "ParenthesizedExpression" ||
      node.type === "SequenceExpression" ||
      node.type === "TaggedTemplateExpression" ||
      node.type === "UnaryExpression" ||
      node.type === "UpdateExpression" ||
      node.type === "YieldExpression")
  ) {
    return true;
  }

  if (
    (parent.type === "ArrowFunctionExpression" &&
    parent.body === node &&
    node.type !== "SequenceExpression" && // these have parens added anyway
      startsWithNoLookaheadToken$1(node, /* forbidFunctionAndClass */ false)) ||
    (parent.type === "ExpressionStatement" &&
      startsWithNoLookaheadToken$1(node, /* forbidFunctionAndClass */ true))
  ) {
    return true;
  }

  switch (node.type) {
    case "CallExpression": {
      let firstParentNotMemberExpression = parent;
      let i = 0;
      while (
        firstParentNotMemberExpression &&
        firstParentNotMemberExpression.type === "MemberExpression"
      ) {
        firstParentNotMemberExpression = this.getParentNode(++i);
      }

      if (
        firstParentNotMemberExpression.type === "NewExpression" &&
        firstParentNotMemberExpression.callee === this.getParentNode(i - 1)
      ) {
        return true;
      }
      return false;
    }

    case "SpreadElement":
    case "SpreadProperty":
      return (
        parent.type === "MemberExpression" &&
        name === "object" &&
        parent.object === node
      );

    case "UpdateExpression":
      if (parent.type === "UnaryExpression") {
        return (
          node.prefix &&
          ((node.operator === "++" && parent.operator === "+") ||
            (node.operator === "--" && parent.operator === "-"))
        );
      }
    // else fallthrough
    case "UnaryExpression":
      switch (parent.type) {
        case "UnaryExpression":
          return (
            node.operator === parent.operator &&
            (node.operator === "+" || node.operator === "-")
          );

        case "MemberExpression":
          return name === "object" && parent.object === node;

        case "TaggedTemplateExpression":
          return true;

        case "NewExpression":
        case "CallExpression":
          return name === "callee" && parent.callee === node;

        case "BinaryExpression":
          return parent.operator === "**" && name === "left";

        default:
          return false;
      }

    case "BinaryExpression": {
      if (parent.type === "UpdateExpression") {
        return true;
      }

      const isLeftOfAForStatement = node => {
        let i = 0;
        while (node) {
          const parent = this.getParentNode(i++);
          if (!parent) {
            return false;
          }
          if (parent.type === "ForStatement" && parent.init === node) {
            return true;
          }
          node = parent;
        }
        return false;
      };
      if (node.operator === "in" && isLeftOfAForStatement(node)) {
        return true;
      }
    }
    // fallthrough
    case "TSTypeAssertionExpression":
    case "TSAsExpression":
    case "LogicalExpression":
      switch (parent.type) {
        case "ConditionalExpression":
          return node.type === "TSAsExpression";

        case "CallExpression":
        case "NewExpression":
          return name === "callee" && parent.callee === node;

        case "ClassDeclaration":
        case "TSAbstractClassDeclaration":
          return name === "superClass" && parent.superClass === node;
        case "TSTypeAssertionExpression":
        case "TaggedTemplateExpression":
        case "UnaryExpression":
        case "SpreadElement":
        case "SpreadProperty":
        case "ExperimentalSpreadProperty":
        case "BindExpression":
        case "AwaitExpression":
        case "TSAsExpression":
        case "TSNonNullExpression":
          return true;

        case "MemberExpression":
          return name === "object" && parent.object === node;

        case "AssignmentExpression":
          return (
            parent.left === node &&
            (node.type === "TSTypeAssertionExpression" ||
              node.type === "TSAsExpression")
          );
        case "Decorator":
          return (
            parent.expression === node &&
            (node.type === "TSTypeAssertionExpression" ||
              node.type === "TSAsExpression")
          );

        case "BinaryExpression":
        case "LogicalExpression": {
          if (!node.operator && node.type !== "TSTypeAssertionExpression") {
            return true;
          }

          const po = parent.operator;
          const pp = util$1.getPrecedence(po);
          const no = node.operator;
          const np = util$1.getPrecedence(no);

          if (pp > np) {
            return true;
          }

          if ((po === "||" || po === "??") && no === "&&") {
            return true;
          }

          if (pp === np && name === "right") {
            assert.strictEqual(parent.right, node);
            return true;
          }

          if (pp === np && !util$1.shouldFlatten(po, no)) {
            return true;
          }

          // Add parenthesis when working with binary operators
          // It's not stricly needed but helps with code understanding
          if (util$1.isBitwiseOperator(po)) {
            return true;
          }

          return false;
        }

        default:
          return false;
      }

    case "TSParenthesizedType": {
      const grandParent = this.getParentNode(1);
      if (
        (parent.type === "TSTypeParameter" ||
          parent.type === "TypeParameter" ||
          parent.type === "VariableDeclarator" ||
          parent.type === "TSTypeAnnotation" ||
          parent.type === "GenericTypeAnnotation" ||
          parent.type === "TSTypeReference") &&
        (node.typeAnnotation.type === "TSTypeAnnotation" &&
          node.typeAnnotation.typeAnnotation.type !== "TSFunctionType" &&
          grandParent.type !== "TSTypeOperator")
      ) {
        return false;
      }
      // Delegate to inner TSParenthesizedType
      if (node.typeAnnotation.type === "TSParenthesizedType") {
        return false;
      }
      return true;
    }

    case "SequenceExpression":
      switch (parent.type) {
        case "ReturnStatement":
          return false;

        case "ForStatement":
          // Although parentheses wouldn't hurt around sequence
          // expressions in the head of for loops, traditional style
          // dictates that e.g. i++, j++ should not be wrapped with
          // parentheses.
          return false;

        case "ExpressionStatement":
          return name !== "expression";

        case "ArrowFunctionExpression":
          // We do need parentheses, but SequenceExpressions are handled
          // specially when printing bodies of arrow functions.
          return name !== "body";

        default:
          // Otherwise err on the side of overparenthesization, adding
          // explicit exceptions above if this proves overzealous.
          return true;
      }

    case "YieldExpression":
      if (
        parent.type === "UnaryExpression" ||
        parent.type === "AwaitExpression" ||
        parent.type === "TSAsExpression" ||
        parent.type === "TSNonNullExpression"
      ) {
        return true;
      }
    // else fallthrough
    case "AwaitExpression":
      switch (parent.type) {
        case "TaggedTemplateExpression":
        case "BinaryExpression":
        case "LogicalExpression":
        case "SpreadElement":
        case "SpreadProperty":
        case "ExperimentalSpreadProperty":
        case "TSAsExpression":
        case "TSNonNullExpression":
          return true;

        case "MemberExpression":
          return parent.object === node;

        case "NewExpression":
        case "CallExpression":
          return parent.callee === node;

        case "ConditionalExpression":
          return parent.test === node;

        default:
          return false;
      }

    case "ArrayTypeAnnotation":
      return parent.type === "NullableTypeAnnotation";

    case "IntersectionTypeAnnotation":
    case "UnionTypeAnnotation":
      return (
        parent.type === "ArrayTypeAnnotation" ||
        parent.type === "NullableTypeAnnotation" ||
        parent.type === "IntersectionTypeAnnotation" ||
        parent.type === "UnionTypeAnnotation"
      );

    case "NullableTypeAnnotation":
      return parent.type === "ArrayTypeAnnotation";

    case "FunctionTypeAnnotation":
      return (
        parent.type === "UnionTypeAnnotation" ||
        parent.type === "IntersectionTypeAnnotation" ||
        parent.type === "ArrayTypeAnnotation"
      );

    case "StringLiteral":
    case "NumericLiteral":
    case "Literal":
      if (
        typeof node.value === "string" &&
        parent.type === "ExpressionStatement" &&
        // TypeScript workaround for eslint/typescript-eslint-parser#267
        // See corresponding workaround in printer.js case: "Literal"
        ((options.parser !== "typescript" && !parent.directive) ||
          (options.parser === "typescript" &&
            options.originalText.substr(util$1.locStart(node) - 1, 1) === "("))
      ) {
        // To avoid becoming a directive
        const grandParent = this.getParentNode(1);

        return (
          grandParent.type === "Program" ||
          grandParent.type === "BlockStatement"
        );
      }

      return (
        parent.type === "MemberExpression" &&
        typeof node.value === "number" &&
        name === "object" &&
        parent.object === node
      );

    case "AssignmentExpression": {
      const grandParent = this.getParentNode(1);

      if (parent.type === "ArrowFunctionExpression" && parent.body === node) {
        return true;
      } else if (
        parent.type === "ClassProperty" &&
        parent.key === node &&
        parent.computed
      ) {
        return false;
      } else if (
        parent.type === "TSPropertySignature" &&
        parent.name === node
      ) {
        return false;
      } else if (
        parent.type === "ForStatement" &&
        (parent.init === node || parent.update === node)
      ) {
        return false;
      } else if (parent.type === "ExpressionStatement") {
        return node.left.type === "ObjectPattern";
      } else if (parent.type === "TSPropertySignature" && parent.key === node) {
        return false;
      } else if (parent.type === "AssignmentExpression") {
        return false;
      } else if (
        parent.type === "SequenceExpression" &&
        grandParent &&
        grandParent.type === "ForStatement" &&
        (grandParent.init === parent || grandParent.update === parent)
      ) {
        return false;
      }
      return true;
    }
    case "ConditionalExpression":
      switch (parent.type) {
        case "TaggedTemplateExpression":
        case "UnaryExpression":
        case "SpreadElement":
        case "SpreadProperty":
        case "ExperimentalSpreadProperty":
        case "BinaryExpression":
        case "LogicalExpression":
        case "ExportDefaultDeclaration":
        case "AwaitExpression":
        case "JSXSpreadAttribute":
        case "TSTypeAssertionExpression":
        case "TSAsExpression":
        case "TSNonNullExpression":
          return true;

        case "NewExpression":
        case "CallExpression":
          return name === "callee" && parent.callee === node;

        case "ConditionalExpression":
          return name === "test" && parent.test === node;

        case "MemberExpression":
          return name === "object" && parent.object === node;

        default:
          return false;
      }

    case "FunctionExpression":
      switch (parent.type) {
        case "CallExpression":
          return name === "callee"; // Not strictly necessary, but it's clearer to the reader if IIFEs are wrapped in parentheses.
        case "TaggedTemplateExpression":
          return true; // This is basically a kind of IIFE.
        case "ExportDefaultDeclaration":
          return true;
        default:
          return false;
      }

    case "ArrowFunctionExpression":
      switch (parent.type) {
        case "CallExpression":
          return name === "callee";

        case "NewExpression":
          return name === "callee";

        case "MemberExpression":
          return name === "object";

        case "TSAsExpression":
        case "BindExpression":
        case "TaggedTemplateExpression":
        case "UnaryExpression":
        case "LogicalExpression":
        case "BinaryExpression":
        case "AwaitExpression":
        case "TSTypeAssertionExpression":
          return true;

        case "ConditionalExpression":
          return name === "test";

        default:
          return false;
      }

    case "ClassExpression":
      return parent.type === "ExportDefaultDeclaration";
  }

  return false;
};

function isStatement(node) {
  return (
    node.type === "BlockStatement" ||
    node.type === "BreakStatement" ||
    node.type === "ClassBody" ||
    node.type === "ClassDeclaration" ||
    node.type === "ClassMethod" ||
    node.type === "ClassProperty" ||
    node.type === "ClassPrivateProperty" ||
    node.type === "ContinueStatement" ||
    node.type === "DebuggerStatement" ||
    node.type === "DeclareClass" ||
    node.type === "DeclareExportAllDeclaration" ||
    node.type === "DeclareExportDeclaration" ||
    node.type === "DeclareFunction" ||
    node.type === "DeclareInterface" ||
    node.type === "DeclareModule" ||
    node.type === "DeclareModuleExports" ||
    node.type === "DeclareVariable" ||
    node.type === "DoWhileStatement" ||
    node.type === "ExportAllDeclaration" ||
    node.type === "ExportDefaultDeclaration" ||
    node.type === "ExportNamedDeclaration" ||
    node.type === "ExpressionStatement" ||
    node.type === "ForAwaitStatement" ||
    node.type === "ForInStatement" ||
    node.type === "ForOfStatement" ||
    node.type === "ForStatement" ||
    node.type === "FunctionDeclaration" ||
    node.type === "IfStatement" ||
    node.type === "ImportDeclaration" ||
    node.type === "InterfaceDeclaration" ||
    node.type === "LabeledStatement" ||
    node.type === "MethodDefinition" ||
    node.type === "ReturnStatement" ||
    node.type === "SwitchStatement" ||
    node.type === "ThrowStatement" ||
    node.type === "TryStatement" ||
    node.type === "TSAbstractClassDeclaration" ||
    node.type === "TSEnumDeclaration" ||
    node.type === "TSImportEqualsDeclaration" ||
    node.type === "TSInterfaceDeclaration" ||
    node.type === "TSModuleDeclaration" ||
    node.type === "TSNamespaceExportDeclaration" ||
    node.type === "TypeAlias" ||
    node.type === "VariableDeclaration" ||
    node.type === "WhileStatement" ||
    node.type === "WithStatement"
  );
}

var fastPath = FastPath;

/* eslint-disable no-nested-ternary */
var arr = [];
var charCodeCache = [];

var leven = function (a, b) {
	if (a === b) {
		return 0;
	}

	var swap = a;

	// Swapping the strings if `a` is longer than `b` so we know which one is the
	// shortest & which one is the longest
	if (a.length > b.length) {
		a = b;
		b = swap;
	}

	var aLen = a.length;
	var bLen = b.length;

	if (aLen === 0) {
		return bLen;
	}

	if (bLen === 0) {
		return aLen;
	}

	// Performing suffix trimming:
	// We can linearly drop suffix common to both strings since they
	// don't increase distance at all
	// Note: `~-` is the bitwise way to perform a `- 1` operation
	while (aLen > 0 && (a.charCodeAt(~-aLen) === b.charCodeAt(~-bLen))) {
		aLen--;
		bLen--;
	}

	if (aLen === 0) {
		return bLen;
	}

	// Performing prefix trimming
	// We can linearly drop prefix common to both strings since they
	// don't increase distance at all
	var start = 0;

	while (start < aLen && (a.charCodeAt(start) === b.charCodeAt(start))) {
		start++;
	}

	aLen -= start;
	bLen -= start;

	if (aLen === 0) {
		return bLen;
	}

	var bCharCode;
	var ret;
	var tmp;
	var tmp2;
	var i = 0;
	var j = 0;

	while (i < aLen) {
		charCodeCache[start + i] = a.charCodeAt(start + i);
		arr[i] = ++i;
	}

	while (j < bLen) {
		bCharCode = b.charCodeAt(start + j);
		tmp = j++;
		ret = j;

		for (i = 0; i < aLen; i++) {
			tmp2 = bCharCode === charCodeCache[start + i] ? tmp : tmp + 1;
			tmp = arr[i];
			ret = arr[i] = tmp > ret ? tmp2 > ret ? ret + 1 : tmp2 : tmp2 > tmp ? tmp + 1 : tmp2;
		}
	}

	return ret;
};

function apiDescriptor(name, value) {
  return arguments.length === 1
    ? JSON.stringify(name)
    : `\`{ ${apiDescriptor(name)}: ${JSON.stringify(value)} }\``;
}

function cliDescriptor(name, value) {
  return value === false
    ? `\`--no-${name}\``
    : value === true || arguments.length === 1
      ? `\`--${name}\``
      : value === ""
        ? `\`--${name}\` without an argument`
        : `\`--${name}=${value}\``;
}

var optionsDescriptor = {
  apiDescriptor,
  cliDescriptor
};

function validateOption(value, optionInfo, opts) {
  opts = opts || {};
  const descriptor = opts.descriptor || optionsDescriptor.apiDescriptor;

  if (
    typeof optionInfo.exception === "function" &&
    optionInfo.exception(value)
  ) {
    return;
  }

  try {
    validateOptionType(value, optionInfo);
  } catch (error) {
    throw new Error(
      `Invalid \`${descriptor(optionInfo.name)}\` value. ${
        error.message
      }, but received \`${JSON.stringify(value)}\`.`
    );
  }
}

function validateOptionType(value, optionInfo) {
  if (optionInfo.array) {
    if (!Array.isArray(value)) {
      throw new Error(`Expected an array`);
    }
    value.forEach(v =>
      validateOptionType(v, Object.assign({}, optionInfo, { array: false }))
    );
  } else {
    switch (optionInfo.type) {
      case "int":
        validateIntOption(value);
        break;
      case "boolean":
        validateBooleanOption(value);
        break;
      case "choice":
        validateChoiceOption(value, optionInfo.choices);
        break;
    }
  }
}

function validateBooleanOption(value) {
  if (typeof value !== "boolean") {
    throw new Error(`Expected a boolean`);
  }
}

function validateIntOption(value) {
  if (
    !(
      typeof value === "number" &&
      Math.floor(value) === value &&
      value >= 0 &&
      value !== Infinity
    )
  ) {
    throw new Error(`Expected an integer`);
  }
}

function validateChoiceOption(value, choiceInfos) {
  if (!choiceInfos.some(choiceInfo => choiceInfo.value === value)) {
    const choices = choiceInfos
      .filter(choiceInfo => !choiceInfo.deprecated)
      .map(choiceInfo => JSON.stringify(choiceInfo.value))
      .sort();
    const head = choices.slice(0, -2);
    const tail = choices.slice(-2);
    throw new Error(`Expected ${head.concat(tail.join(" or ")).join(", ")}`);
  }
}

var optionsValidator = { validateOption };

function normalizeOptions$1(options, optionInfos, opts) {
  opts = opts || {};
  const logger =
    opts.logger === false
      ? { warn() {} }
      : opts.logger !== undefined ? opts.logger : console;
  const descriptor = opts.descriptor || optionsDescriptor.apiDescriptor;
  const passThrough = opts.passThrough || [];

  const optionInfoMap = optionInfos.reduce(
    (reduced, optionInfo) =>
      Object.assign(reduced, { [optionInfo.name]: optionInfo }),
    {}
  );
  const normalizedOptions = Object.keys(options).reduce((newOptions, key) => {
    const optionInfo = optionInfoMap[key];

    let optionName = key;
    let optionValue = options[key];

    if (!optionInfo) {
      if (passThrough === true || passThrough.indexOf(optionName) !== -1) {
        newOptions[optionName] = optionValue;
      } else {
        logger.warn(
          createUnknownOptionMessage(
            optionName,
            optionValue,
            optionInfos,
            descriptor
          )
        );
      }
      return newOptions;
    }

    if (!optionInfo.deprecated) {
      optionValue = normalizeOption(optionValue, optionInfo);
    } else if (typeof optionInfo.redirect === "string") {
      logger.warn(createRedirectOptionMessage(optionInfo, descriptor));
      optionName = optionInfo.redirect;
    } else if (optionValue) {
      logger.warn(createRedirectOptionMessage(optionInfo, descriptor));
      optionValue = optionInfo.redirect.value;
      optionName = optionInfo.redirect.option;
    }

    if (optionInfo.choices) {
      const choiceInfo = optionInfo.choices.find(
        choice => choice.value === optionValue
      );
      if (choiceInfo && choiceInfo.deprecated) {
        logger.warn(
          createRedirectChoiceMessage(optionInfo, choiceInfo, descriptor)
        );
        optionValue = choiceInfo.redirect;
      }
    }

    if (optionInfo.array && !Array.isArray(optionValue)) {
      optionValue = [optionValue];
    }

    if (optionValue !== optionInfo.default) {
      optionsValidator.validateOption(optionValue, optionInfoMap[optionName], {
        descriptor
      });
    }

    newOptions[optionName] = optionValue;
    return newOptions;
  }, {});

  return normalizedOptions;
}

function normalizeOption(option, optionInfo) {
  return optionInfo.type === "int" ? Number(option) : option;
}

function createUnknownOptionMessage(key, value, optionInfos, descriptor) {
  const messages = [`Ignored unknown option ${descriptor(key, value)}.`];

  const suggestedOptionInfo = optionInfos.find(
    optionInfo => leven(optionInfo.name, key) < 3
  );
  if (suggestedOptionInfo) {
    messages.push(`Did you mean ${JSON.stringify(suggestedOptionInfo.name)}?`);
  }

  return messages.join(" ");
}

function createRedirectOptionMessage(optionInfo, descriptor) {
  return `${descriptor(
    optionInfo.name
  )} is deprecated. Prettier now treats it as ${
    typeof optionInfo.redirect === "string"
      ? descriptor(optionInfo.redirect)
      : descriptor(optionInfo.redirect.option, optionInfo.redirect.value)
  }.`;
}

function createRedirectChoiceMessage(optionInfo, choiceInfo, descriptor) {
  return `${descriptor(
    optionInfo.name,
    choiceInfo.value
  )} is deprecated. Prettier now treats it as ${descriptor(
    optionInfo.name,
    choiceInfo.redirect
  )}.`;
}

function normalizeApiOptions(options, optionInfos, opts) {
  return normalizeOptions$1(
    options,
    optionInfos,
    Object.assign({ descriptor: optionsDescriptor.apiDescriptor }, opts)
  );
}

function normalizeCliOptions(options, optionInfos, opts) {
  const args = options["_"] || [];

  const newOptions = normalizeOptions$1(
    Object.keys(options).reduce(
      (reduced, key) =>
        Object.assign(
          reduced,
          key.length === 1 // omit alias
            ? null
            : { [key]: options[key] }
        ),
      {}
    ),
    optionInfos,
    Object.assign({ descriptor: optionsDescriptor.cliDescriptor }, opts)
  );
  newOptions["_"] = args;

  return newOptions;
}

var optionsNormalizer = {
  normalizeApiOptions,
  normalizeCliOptions
};

class ConfigError$1 extends Error {}
class DebugError extends Error {}

var errors = {
  ConfigError: ConfigError$1,
  DebugError
};

var jsTokens = createCommonjsModule(function (module, exports) {
// Copyright 2014, 2015, 2016, 2017 Simon Lydell
// License: MIT. (See LICENSE.)

Object.defineProperty(exports, "__esModule", {
  value: true
});

// This regex comes from regex.coffee, and is inserted here by generate-index.js
// (run `npm run build`).
exports.default = /((['"])(?:(?!\2|\\).|\\(?:\r\n|[\s\S]))*(\2)?|`(?:[^`\\$]|\\[\s\S]|\$(?!\{)|\$\{(?:[^{}]|\{[^}]*\}?)*\}?)*(`)?)|(\/\/.*)|(\/\*(?:[^*]|\*(?!\/))*(\*\/)?)|(\/(?!\*)(?:\[(?:(?![\]\\]).|\\.)*\]|(?![\/\]\\]).|\\.)+\/(?:(?!\s*(?:\b|[\u0080-\uFFFF$\\'"~({]|[+\-!](?!=)|\.?\d))|[gmiyu]{1,5}\b(?![\u0080-\uFFFF$\\]|\s*(?:[+\-*%&|^<>!=?({]|\/(?![\/*])))))|(0[xX][\da-fA-F]+|0[oO][0-7]+|0[bB][01]+|(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?)|((?!\d)(?:(?!\s)[$\w\u0080-\uFFFF]|\\u[\da-fA-F]{4}|\\u\{[\da-fA-F]+\})+)|(--|\+\+|&&|\|\||=>|\.{3}|(?:[+\-\/%&|^]|\*{1,2}|<{1,2}|>{1,3}|!=?|={1,2})=?|[?~.,:;[\](){}])|(\s+)|(^$|[\s\S])/g;

exports.matchToToken = function(match) {
  var token = {type: "invalid", value: match[0]};
       if (match[ 1]) token.type = "string" , token.closed = !!(match[3] || match[4]);
  else if (match[ 5]) token.type = "comment";
  else if (match[ 6]) token.type = "comment", token.closed = !!match[7];
  else if (match[ 8]) token.type = "regex";
  else if (match[ 9]) token.type = "number";
  else if (match[10]) token.type = "name";
  else if (match[11]) token.type = "punctuator";
  else if (match[12]) token.type = "whitespace";
  return token
};
});

unwrapExports(jsTokens);

var colorName = {
	"aliceblue": [240, 248, 255],
	"antiquewhite": [250, 235, 215],
	"aqua": [0, 255, 255],
	"aquamarine": [127, 255, 212],
	"azure": [240, 255, 255],
	"beige": [245, 245, 220],
	"bisque": [255, 228, 196],
	"black": [0, 0, 0],
	"blanchedalmond": [255, 235, 205],
	"blue": [0, 0, 255],
	"blueviolet": [138, 43, 226],
	"brown": [165, 42, 42],
	"burlywood": [222, 184, 135],
	"cadetblue": [95, 158, 160],
	"chartreuse": [127, 255, 0],
	"chocolate": [210, 105, 30],
	"coral": [255, 127, 80],
	"cornflowerblue": [100, 149, 237],
	"cornsilk": [255, 248, 220],
	"crimson": [220, 20, 60],
	"cyan": [0, 255, 255],
	"darkblue": [0, 0, 139],
	"darkcyan": [0, 139, 139],
	"darkgoldenrod": [184, 134, 11],
	"darkgray": [169, 169, 169],
	"darkgreen": [0, 100, 0],
	"darkgrey": [169, 169, 169],
	"darkkhaki": [189, 183, 107],
	"darkmagenta": [139, 0, 139],
	"darkolivegreen": [85, 107, 47],
	"darkorange": [255, 140, 0],
	"darkorchid": [153, 50, 204],
	"darkred": [139, 0, 0],
	"darksalmon": [233, 150, 122],
	"darkseagreen": [143, 188, 143],
	"darkslateblue": [72, 61, 139],
	"darkslategray": [47, 79, 79],
	"darkslategrey": [47, 79, 79],
	"darkturquoise": [0, 206, 209],
	"darkviolet": [148, 0, 211],
	"deeppink": [255, 20, 147],
	"deepskyblue": [0, 191, 255],
	"dimgray": [105, 105, 105],
	"dimgrey": [105, 105, 105],
	"dodgerblue": [30, 144, 255],
	"firebrick": [178, 34, 34],
	"floralwhite": [255, 250, 240],
	"forestgreen": [34, 139, 34],
	"fuchsia": [255, 0, 255],
	"gainsboro": [220, 220, 220],
	"ghostwhite": [248, 248, 255],
	"gold": [255, 215, 0],
	"goldenrod": [218, 165, 32],
	"gray": [128, 128, 128],
	"green": [0, 128, 0],
	"greenyellow": [173, 255, 47],
	"grey": [128, 128, 128],
	"honeydew": [240, 255, 240],
	"hotpink": [255, 105, 180],
	"indianred": [205, 92, 92],
	"indigo": [75, 0, 130],
	"ivory": [255, 255, 240],
	"khaki": [240, 230, 140],
	"lavender": [230, 230, 250],
	"lavenderblush": [255, 240, 245],
	"lawngreen": [124, 252, 0],
	"lemonchiffon": [255, 250, 205],
	"lightblue": [173, 216, 230],
	"lightcoral": [240, 128, 128],
	"lightcyan": [224, 255, 255],
	"lightgoldenrodyellow": [250, 250, 210],
	"lightgray": [211, 211, 211],
	"lightgreen": [144, 238, 144],
	"lightgrey": [211, 211, 211],
	"lightpink": [255, 182, 193],
	"lightsalmon": [255, 160, 122],
	"lightseagreen": [32, 178, 170],
	"lightskyblue": [135, 206, 250],
	"lightslategray": [119, 136, 153],
	"lightslategrey": [119, 136, 153],
	"lightsteelblue": [176, 196, 222],
	"lightyellow": [255, 255, 224],
	"lime": [0, 255, 0],
	"limegreen": [50, 205, 50],
	"linen": [250, 240, 230],
	"magenta": [255, 0, 255],
	"maroon": [128, 0, 0],
	"mediumaquamarine": [102, 205, 170],
	"mediumblue": [0, 0, 205],
	"mediumorchid": [186, 85, 211],
	"mediumpurple": [147, 112, 219],
	"mediumseagreen": [60, 179, 113],
	"mediumslateblue": [123, 104, 238],
	"mediumspringgreen": [0, 250, 154],
	"mediumturquoise": [72, 209, 204],
	"mediumvioletred": [199, 21, 133],
	"midnightblue": [25, 25, 112],
	"mintcream": [245, 255, 250],
	"mistyrose": [255, 228, 225],
	"moccasin": [255, 228, 181],
	"navajowhite": [255, 222, 173],
	"navy": [0, 0, 128],
	"oldlace": [253, 245, 230],
	"olive": [128, 128, 0],
	"olivedrab": [107, 142, 35],
	"orange": [255, 165, 0],
	"orangered": [255, 69, 0],
	"orchid": [218, 112, 214],
	"palegoldenrod": [238, 232, 170],
	"palegreen": [152, 251, 152],
	"paleturquoise": [175, 238, 238],
	"palevioletred": [219, 112, 147],
	"papayawhip": [255, 239, 213],
	"peachpuff": [255, 218, 185],
	"peru": [205, 133, 63],
	"pink": [255, 192, 203],
	"plum": [221, 160, 221],
	"powderblue": [176, 224, 230],
	"purple": [128, 0, 128],
	"rebeccapurple": [102, 51, 153],
	"red": [255, 0, 0],
	"rosybrown": [188, 143, 143],
	"royalblue": [65, 105, 225],
	"saddlebrown": [139, 69, 19],
	"salmon": [250, 128, 114],
	"sandybrown": [244, 164, 96],
	"seagreen": [46, 139, 87],
	"seashell": [255, 245, 238],
	"sienna": [160, 82, 45],
	"silver": [192, 192, 192],
	"skyblue": [135, 206, 235],
	"slateblue": [106, 90, 205],
	"slategray": [112, 128, 144],
	"slategrey": [112, 128, 144],
	"snow": [255, 250, 250],
	"springgreen": [0, 255, 127],
	"steelblue": [70, 130, 180],
	"tan": [210, 180, 140],
	"teal": [0, 128, 128],
	"thistle": [216, 191, 216],
	"tomato": [255, 99, 71],
	"turquoise": [64, 224, 208],
	"violet": [238, 130, 238],
	"wheat": [245, 222, 179],
	"white": [255, 255, 255],
	"whitesmoke": [245, 245, 245],
	"yellow": [255, 255, 0],
	"yellowgreen": [154, 205, 50]
};

var conversions = createCommonjsModule(function (module) {
/* MIT license */


// NOTE: conversions should only return primitive values (i.e. arrays, or
//       values that give correct `typeof` results).
//       do not use box values types (i.e. Number(), String(), etc.)

var reverseKeywords = {};
for (var key in colorName) {
	if (colorName.hasOwnProperty(key)) {
		reverseKeywords[colorName[key]] = key;
	}
}

var convert = module.exports = {
	rgb: {channels: 3, labels: 'rgb'},
	hsl: {channels: 3, labels: 'hsl'},
	hsv: {channels: 3, labels: 'hsv'},
	hwb: {channels: 3, labels: 'hwb'},
	cmyk: {channels: 4, labels: 'cmyk'},
	xyz: {channels: 3, labels: 'xyz'},
	lab: {channels: 3, labels: 'lab'},
	lch: {channels: 3, labels: 'lch'},
	hex: {channels: 1, labels: ['hex']},
	keyword: {channels: 1, labels: ['keyword']},
	ansi16: {channels: 1, labels: ['ansi16']},
	ansi256: {channels: 1, labels: ['ansi256']},
	hcg: {channels: 3, labels: ['h', 'c', 'g']},
	apple: {channels: 3, labels: ['r16', 'g16', 'b16']},
	gray: {channels: 1, labels: ['gray']}
};

// hide .channels and .labels properties
for (var model in convert) {
	if (convert.hasOwnProperty(model)) {
		if (!('channels' in convert[model])) {
			throw new Error('missing channels property: ' + model);
		}

		if (!('labels' in convert[model])) {
			throw new Error('missing channel labels property: ' + model);
		}

		if (convert[model].labels.length !== convert[model].channels) {
			throw new Error('channel and label counts mismatch: ' + model);
		}

		var channels = convert[model].channels;
		var labels = convert[model].labels;
		delete convert[model].channels;
		delete convert[model].labels;
		Object.defineProperty(convert[model], 'channels', {value: channels});
		Object.defineProperty(convert[model], 'labels', {value: labels});
	}
}

convert.rgb.hsl = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var min = Math.min(r, g, b);
	var max = Math.max(r, g, b);
	var delta = max - min;
	var h;
	var s;
	var l;

	if (max === min) {
		h = 0;
	} else if (r === max) {
		h = (g - b) / delta;
	} else if (g === max) {
		h = 2 + (b - r) / delta;
	} else if (b === max) {
		h = 4 + (r - g) / delta;
	}

	h = Math.min(h * 60, 360);

	if (h < 0) {
		h += 360;
	}

	l = (min + max) / 2;

	if (max === min) {
		s = 0;
	} else if (l <= 0.5) {
		s = delta / (max + min);
	} else {
		s = delta / (2 - max - min);
	}

	return [h, s * 100, l * 100];
};

convert.rgb.hsv = function (rgb) {
	var r = rgb[0];
	var g = rgb[1];
	var b = rgb[2];
	var min = Math.min(r, g, b);
	var max = Math.max(r, g, b);
	var delta = max - min;
	var h;
	var s;
	var v;

	if (max === 0) {
		s = 0;
	} else {
		s = (delta / max * 1000) / 10;
	}

	if (max === min) {
		h = 0;
	} else if (r === max) {
		h = (g - b) / delta;
	} else if (g === max) {
		h = 2 + (b - r) / delta;
	} else if (b === max) {
		h = 4 + (r - g) / delta;
	}

	h = Math.min(h * 60, 360);

	if (h < 0) {
		h += 360;
	}

	v = ((max / 255) * 1000) / 10;

	return [h, s, v];
};

convert.rgb.hwb = function (rgb) {
	var r = rgb[0];
	var g = rgb[1];
	var b = rgb[2];
	var h = convert.rgb.hsl(rgb)[0];
	var w = 1 / 255 * Math.min(r, Math.min(g, b));

	b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));

	return [h, w * 100, b * 100];
};

convert.rgb.cmyk = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var c;
	var m;
	var y;
	var k;

	k = Math.min(1 - r, 1 - g, 1 - b);
	c = (1 - r - k) / (1 - k) || 0;
	m = (1 - g - k) / (1 - k) || 0;
	y = (1 - b - k) / (1 - k) || 0;

	return [c * 100, m * 100, y * 100, k * 100];
};

/**
 * See https://en.m.wikipedia.org/wiki/Euclidean_distance#Squared_Euclidean_distance
 * */
function comparativeDistance(x, y) {
	return (
		Math.pow(x[0] - y[0], 2) +
		Math.pow(x[1] - y[1], 2) +
		Math.pow(x[2] - y[2], 2)
	);
}

convert.rgb.keyword = function (rgb) {
	var reversed = reverseKeywords[rgb];
	if (reversed) {
		return reversed;
	}

	var currentClosestDistance = Infinity;
	var currentClosestKeyword;

	for (var keyword in colorName) {
		if (colorName.hasOwnProperty(keyword)) {
			var value = colorName[keyword];

			// Compute comparative distance
			var distance = comparativeDistance(rgb, value);

			// Check if its less, if so set as closest
			if (distance < currentClosestDistance) {
				currentClosestDistance = distance;
				currentClosestKeyword = keyword;
			}
		}
	}

	return currentClosestKeyword;
};

convert.keyword.rgb = function (keyword) {
	return colorName[keyword];
};

convert.rgb.xyz = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;

	// assume sRGB
	r = r > 0.04045 ? Math.pow(((r + 0.055) / 1.055), 2.4) : (r / 12.92);
	g = g > 0.04045 ? Math.pow(((g + 0.055) / 1.055), 2.4) : (g / 12.92);
	b = b > 0.04045 ? Math.pow(((b + 0.055) / 1.055), 2.4) : (b / 12.92);

	var x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);
	var y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
	var z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);

	return [x * 100, y * 100, z * 100];
};

convert.rgb.lab = function (rgb) {
	var xyz = convert.rgb.xyz(rgb);
	var x = xyz[0];
	var y = xyz[1];
	var z = xyz[2];
	var l;
	var a;
	var b;

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
	y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
	z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);

	l = (116 * y) - 16;
	a = 500 * (x - y);
	b = 200 * (y - z);

	return [l, a, b];
};

convert.hsl.rgb = function (hsl) {
	var h = hsl[0] / 360;
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var t1;
	var t2;
	var t3;
	var rgb;
	var val;

	if (s === 0) {
		val = l * 255;
		return [val, val, val];
	}

	if (l < 0.5) {
		t2 = l * (1 + s);
	} else {
		t2 = l + s - l * s;
	}

	t1 = 2 * l - t2;

	rgb = [0, 0, 0];
	for (var i = 0; i < 3; i++) {
		t3 = h + 1 / 3 * -(i - 1);
		if (t3 < 0) {
			t3++;
		}
		if (t3 > 1) {
			t3--;
		}

		if (6 * t3 < 1) {
			val = t1 + (t2 - t1) * 6 * t3;
		} else if (2 * t3 < 1) {
			val = t2;
		} else if (3 * t3 < 2) {
			val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
		} else {
			val = t1;
		}

		rgb[i] = val * 255;
	}

	return rgb;
};

convert.hsl.hsv = function (hsl) {
	var h = hsl[0];
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var smin = s;
	var lmin = Math.max(l, 0.01);
	var sv;
	var v;

	l *= 2;
	s *= (l <= 1) ? l : 2 - l;
	smin *= lmin <= 1 ? lmin : 2 - lmin;
	v = (l + s) / 2;
	sv = l === 0 ? (2 * smin) / (lmin + smin) : (2 * s) / (l + s);

	return [h, sv * 100, v * 100];
};

convert.hsv.rgb = function (hsv) {
	var h = hsv[0] / 60;
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;
	var hi = Math.floor(h) % 6;

	var f = h - Math.floor(h);
	var p = 255 * v * (1 - s);
	var q = 255 * v * (1 - (s * f));
	var t = 255 * v * (1 - (s * (1 - f)));
	v *= 255;

	switch (hi) {
		case 0:
			return [v, t, p];
		case 1:
			return [q, v, p];
		case 2:
			return [p, v, t];
		case 3:
			return [p, q, v];
		case 4:
			return [t, p, v];
		case 5:
			return [v, p, q];
	}
};

convert.hsv.hsl = function (hsv) {
	var h = hsv[0];
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;
	var vmin = Math.max(v, 0.01);
	var lmin;
	var sl;
	var l;

	l = (2 - s) * v;
	lmin = (2 - s) * vmin;
	sl = s * vmin;
	sl /= (lmin <= 1) ? lmin : 2 - lmin;
	sl = sl || 0;
	l /= 2;

	return [h, sl * 100, l * 100];
};

// http://dev.w3.org/csswg/css-color/#hwb-to-rgb
convert.hwb.rgb = function (hwb) {
	var h = hwb[0] / 360;
	var wh = hwb[1] / 100;
	var bl = hwb[2] / 100;
	var ratio = wh + bl;
	var i;
	var v;
	var f;
	var n;

	// wh + bl cant be > 1
	if (ratio > 1) {
		wh /= ratio;
		bl /= ratio;
	}

	i = Math.floor(6 * h);
	v = 1 - bl;
	f = 6 * h - i;

	if ((i & 0x01) !== 0) {
		f = 1 - f;
	}

	n = wh + f * (v - wh); // linear interpolation

	var r;
	var g;
	var b;
	switch (i) {
		default:
		case 6:
		case 0: r = v; g = n; b = wh; break;
		case 1: r = n; g = v; b = wh; break;
		case 2: r = wh; g = v; b = n; break;
		case 3: r = wh; g = n; b = v; break;
		case 4: r = n; g = wh; b = v; break;
		case 5: r = v; g = wh; b = n; break;
	}

	return [r * 255, g * 255, b * 255];
};

convert.cmyk.rgb = function (cmyk) {
	var c = cmyk[0] / 100;
	var m = cmyk[1] / 100;
	var y = cmyk[2] / 100;
	var k = cmyk[3] / 100;
	var r;
	var g;
	var b;

	r = 1 - Math.min(1, c * (1 - k) + k);
	g = 1 - Math.min(1, m * (1 - k) + k);
	b = 1 - Math.min(1, y * (1 - k) + k);

	return [r * 255, g * 255, b * 255];
};

convert.xyz.rgb = function (xyz) {
	var x = xyz[0] / 100;
	var y = xyz[1] / 100;
	var z = xyz[2] / 100;
	var r;
	var g;
	var b;

	r = (x * 3.2406) + (y * -1.5372) + (z * -0.4986);
	g = (x * -0.9689) + (y * 1.8758) + (z * 0.0415);
	b = (x * 0.0557) + (y * -0.2040) + (z * 1.0570);

	// assume sRGB
	r = r > 0.0031308
		? ((1.055 * Math.pow(r, 1.0 / 2.4)) - 0.055)
		: r * 12.92;

	g = g > 0.0031308
		? ((1.055 * Math.pow(g, 1.0 / 2.4)) - 0.055)
		: g * 12.92;

	b = b > 0.0031308
		? ((1.055 * Math.pow(b, 1.0 / 2.4)) - 0.055)
		: b * 12.92;

	r = Math.min(Math.max(0, r), 1);
	g = Math.min(Math.max(0, g), 1);
	b = Math.min(Math.max(0, b), 1);

	return [r * 255, g * 255, b * 255];
};

convert.xyz.lab = function (xyz) {
	var x = xyz[0];
	var y = xyz[1];
	var z = xyz[2];
	var l;
	var a;
	var b;

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
	y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
	z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);

	l = (116 * y) - 16;
	a = 500 * (x - y);
	b = 200 * (y - z);

	return [l, a, b];
};

convert.lab.xyz = function (lab) {
	var l = lab[0];
	var a = lab[1];
	var b = lab[2];
	var x;
	var y;
	var z;

	y = (l + 16) / 116;
	x = a / 500 + y;
	z = y - b / 200;

	var y2 = Math.pow(y, 3);
	var x2 = Math.pow(x, 3);
	var z2 = Math.pow(z, 3);
	y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787;
	x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787;
	z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787;

	x *= 95.047;
	y *= 100;
	z *= 108.883;

	return [x, y, z];
};

convert.lab.lch = function (lab) {
	var l = lab[0];
	var a = lab[1];
	var b = lab[2];
	var hr;
	var h;
	var c;

	hr = Math.atan2(b, a);
	h = hr * 360 / 2 / Math.PI;

	if (h < 0) {
		h += 360;
	}

	c = Math.sqrt(a * a + b * b);

	return [l, c, h];
};

convert.lch.lab = function (lch) {
	var l = lch[0];
	var c = lch[1];
	var h = lch[2];
	var a;
	var b;
	var hr;

	hr = h / 360 * 2 * Math.PI;
	a = c * Math.cos(hr);
	b = c * Math.sin(hr);

	return [l, a, b];
};

convert.rgb.ansi16 = function (args) {
	var r = args[0];
	var g = args[1];
	var b = args[2];
	var value = 1 in arguments ? arguments[1] : convert.rgb.hsv(args)[2]; // hsv -> ansi16 optimization

	value = Math.round(value / 50);

	if (value === 0) {
		return 30;
	}

	var ansi = 30
		+ ((Math.round(b / 255) << 2)
		| (Math.round(g / 255) << 1)
		| Math.round(r / 255));

	if (value === 2) {
		ansi += 60;
	}

	return ansi;
};

convert.hsv.ansi16 = function (args) {
	// optimization here; we already know the value and don't need to get
	// it converted for us.
	return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
};

convert.rgb.ansi256 = function (args) {
	var r = args[0];
	var g = args[1];
	var b = args[2];

	// we use the extended greyscale palette here, with the exception of
	// black and white. normal palette only has 4 greyscale shades.
	if (r === g && g === b) {
		if (r < 8) {
			return 16;
		}

		if (r > 248) {
			return 231;
		}

		return Math.round(((r - 8) / 247) * 24) + 232;
	}

	var ansi = 16
		+ (36 * Math.round(r / 255 * 5))
		+ (6 * Math.round(g / 255 * 5))
		+ Math.round(b / 255 * 5);

	return ansi;
};

convert.ansi16.rgb = function (args) {
	var color = args % 10;

	// handle greyscale
	if (color === 0 || color === 7) {
		if (args > 50) {
			color += 3.5;
		}

		color = color / 10.5 * 255;

		return [color, color, color];
	}

	var mult = (~~(args > 50) + 1) * 0.5;
	var r = ((color & 1) * mult) * 255;
	var g = (((color >> 1) & 1) * mult) * 255;
	var b = (((color >> 2) & 1) * mult) * 255;

	return [r, g, b];
};

convert.ansi256.rgb = function (args) {
	// handle greyscale
	if (args >= 232) {
		var c = (args - 232) * 10 + 8;
		return [c, c, c];
	}

	args -= 16;

	var rem;
	var r = Math.floor(args / 36) / 5 * 255;
	var g = Math.floor((rem = args % 36) / 6) / 5 * 255;
	var b = (rem % 6) / 5 * 255;

	return [r, g, b];
};

convert.rgb.hex = function (args) {
	var integer = ((Math.round(args[0]) & 0xFF) << 16)
		+ ((Math.round(args[1]) & 0xFF) << 8)
		+ (Math.round(args[2]) & 0xFF);

	var string = integer.toString(16).toUpperCase();
	return '000000'.substring(string.length) + string;
};

convert.hex.rgb = function (args) {
	var match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
	if (!match) {
		return [0, 0, 0];
	}

	var colorString = match[0];

	if (match[0].length === 3) {
		colorString = colorString.split('').map(function (char) {
			return char + char;
		}).join('');
	}

	var integer = parseInt(colorString, 16);
	var r = (integer >> 16) & 0xFF;
	var g = (integer >> 8) & 0xFF;
	var b = integer & 0xFF;

	return [r, g, b];
};

convert.rgb.hcg = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var max = Math.max(Math.max(r, g), b);
	var min = Math.min(Math.min(r, g), b);
	var chroma = (max - min);
	var grayscale;
	var hue;

	if (chroma < 1) {
		grayscale = min / (1 - chroma);
	} else {
		grayscale = 0;
	}

	if (chroma <= 0) {
		hue = 0;
	} else
	if (max === r) {
		hue = ((g - b) / chroma) % 6;
	} else
	if (max === g) {
		hue = 2 + (b - r) / chroma;
	} else {
		hue = 4 + (r - g) / chroma + 4;
	}

	hue /= 6;
	hue %= 1;

	return [hue * 360, chroma * 100, grayscale * 100];
};

convert.hsl.hcg = function (hsl) {
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var c = 1;
	var f = 0;

	if (l < 0.5) {
		c = 2.0 * s * l;
	} else {
		c = 2.0 * s * (1.0 - l);
	}

	if (c < 1.0) {
		f = (l - 0.5 * c) / (1.0 - c);
	}

	return [hsl[0], c * 100, f * 100];
};

convert.hsv.hcg = function (hsv) {
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;

	var c = s * v;
	var f = 0;

	if (c < 1.0) {
		f = (v - c) / (1 - c);
	}

	return [hsv[0], c * 100, f * 100];
};

convert.hcg.rgb = function (hcg) {
	var h = hcg[0] / 360;
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	if (c === 0.0) {
		return [g * 255, g * 255, g * 255];
	}

	var pure = [0, 0, 0];
	var hi = (h % 1) * 6;
	var v = hi % 1;
	var w = 1 - v;
	var mg = 0;

	switch (Math.floor(hi)) {
		case 0:
			pure[0] = 1; pure[1] = v; pure[2] = 0; break;
		case 1:
			pure[0] = w; pure[1] = 1; pure[2] = 0; break;
		case 2:
			pure[0] = 0; pure[1] = 1; pure[2] = v; break;
		case 3:
			pure[0] = 0; pure[1] = w; pure[2] = 1; break;
		case 4:
			pure[0] = v; pure[1] = 0; pure[2] = 1; break;
		default:
			pure[0] = 1; pure[1] = 0; pure[2] = w;
	}

	mg = (1.0 - c) * g;

	return [
		(c * pure[0] + mg) * 255,
		(c * pure[1] + mg) * 255,
		(c * pure[2] + mg) * 255
	];
};

convert.hcg.hsv = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	var v = c + g * (1.0 - c);
	var f = 0;

	if (v > 0.0) {
		f = c / v;
	}

	return [hcg[0], f * 100, v * 100];
};

convert.hcg.hsl = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	var l = g * (1.0 - c) + 0.5 * c;
	var s = 0;

	if (l > 0.0 && l < 0.5) {
		s = c / (2 * l);
	} else
	if (l >= 0.5 && l < 1.0) {
		s = c / (2 * (1 - l));
	}

	return [hcg[0], s * 100, l * 100];
};

convert.hcg.hwb = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;
	var v = c + g * (1.0 - c);
	return [hcg[0], (v - c) * 100, (1 - v) * 100];
};

convert.hwb.hcg = function (hwb) {
	var w = hwb[1] / 100;
	var b = hwb[2] / 100;
	var v = 1 - b;
	var c = v - w;
	var g = 0;

	if (c < 1) {
		g = (v - c) / (1 - c);
	}

	return [hwb[0], c * 100, g * 100];
};

convert.apple.rgb = function (apple) {
	return [(apple[0] / 65535) * 255, (apple[1] / 65535) * 255, (apple[2] / 65535) * 255];
};

convert.rgb.apple = function (rgb) {
	return [(rgb[0] / 255) * 65535, (rgb[1] / 255) * 65535, (rgb[2] / 255) * 65535];
};

convert.gray.rgb = function (args) {
	return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
};

convert.gray.hsl = convert.gray.hsv = function (args) {
	return [0, 0, args[0]];
};

convert.gray.hwb = function (gray) {
	return [0, 100, gray[0]];
};

convert.gray.cmyk = function (gray) {
	return [0, 0, 0, gray[0]];
};

convert.gray.lab = function (gray) {
	return [gray[0], 0, 0];
};

convert.gray.hex = function (gray) {
	var val = Math.round(gray[0] / 100 * 255) & 0xFF;
	var integer = (val << 16) + (val << 8) + val;

	var string = integer.toString(16).toUpperCase();
	return '000000'.substring(string.length) + string;
};

convert.rgb.gray = function (rgb) {
	var val = (rgb[0] + rgb[1] + rgb[2]) / 3;
	return [val / 255 * 100];
};
});

/*
	this function routes a model to all other models.

	all functions that are routed have a property `.conversion` attached
	to the returned synthetic function. This property is an array
	of strings, each with the steps in between the 'from' and 'to'
	color models (inclusive).

	conversions that are not possible simply are not included.
*/

// https://jsperf.com/object-keys-vs-for-in-with-closure/3
var models$1 = Object.keys(conversions);

function buildGraph() {
	var graph = {};

	for (var len = models$1.length, i = 0; i < len; i++) {
		graph[models$1[i]] = {
			// http://jsperf.com/1-vs-infinity
			// micro-opt, but this is simple.
			distance: -1,
			parent: null
		};
	}

	return graph;
}

// https://en.wikipedia.org/wiki/Breadth-first_search
function deriveBFS(fromModel) {
	var graph = buildGraph();
	var queue = [fromModel]; // unshift -> queue -> pop

	graph[fromModel].distance = 0;

	while (queue.length) {
		var current = queue.pop();
		var adjacents = Object.keys(conversions[current]);

		for (var len = adjacents.length, i = 0; i < len; i++) {
			var adjacent = adjacents[i];
			var node = graph[adjacent];

			if (node.distance === -1) {
				node.distance = graph[current].distance + 1;
				node.parent = current;
				queue.unshift(adjacent);
			}
		}
	}

	return graph;
}

function link(from, to) {
	return function (args) {
		return to(from(args));
	};
}

function wrapConversion(toModel, graph) {
	var path$$1 = [graph[toModel].parent, toModel];
	var fn = conversions[graph[toModel].parent][toModel];

	var cur = graph[toModel].parent;
	while (graph[cur].parent) {
		path$$1.unshift(graph[cur].parent);
		fn = link(conversions[graph[cur].parent][cur], fn);
		cur = graph[cur].parent;
	}

	fn.conversion = path$$1;
	return fn;
}

var route = function (fromModel) {
	var graph = deriveBFS(fromModel);
	var conversion = {};

	var models = Object.keys(graph);
	for (var len = models.length, i = 0; i < len; i++) {
		var toModel = models[i];
		var node = graph[toModel];

		if (node.parent === null) {
			// no possible conversion, or this node is the source model.
			continue;
		}

		conversion[toModel] = wrapConversion(toModel, graph);
	}

	return conversion;
};

var convert = {};

var models = Object.keys(conversions);

function wrapRaw(fn) {
	var wrappedFn = function (args) {
		if (args === undefined || args === null) {
			return args;
		}

		if (arguments.length > 1) {
			args = Array.prototype.slice.call(arguments);
		}

		return fn(args);
	};

	// preserve .conversion property if there is one
	if ('conversion' in fn) {
		wrappedFn.conversion = fn.conversion;
	}

	return wrappedFn;
}

function wrapRounded(fn) {
	var wrappedFn = function (args) {
		if (args === undefined || args === null) {
			return args;
		}

		if (arguments.length > 1) {
			args = Array.prototype.slice.call(arguments);
		}

		var result = fn(args);

		// we're assuming the result is an array here.
		// see notice in conversions.js; don't use box types
		// in conversion functions.
		if (typeof result === 'object') {
			for (var len = result.length, i = 0; i < len; i++) {
				result[i] = Math.round(result[i]);
			}
		}

		return result;
	};

	// preserve .conversion property if there is one
	if ('conversion' in fn) {
		wrappedFn.conversion = fn.conversion;
	}

	return wrappedFn;
}

models.forEach(function (fromModel) {
	convert[fromModel] = {};

	Object.defineProperty(convert[fromModel], 'channels', {value: conversions[fromModel].channels});
	Object.defineProperty(convert[fromModel], 'labels', {value: conversions[fromModel].labels});

	var routes = route(fromModel);
	var routeModels = Object.keys(routes);

	routeModels.forEach(function (toModel) {
		var fn = routes[toModel];

		convert[fromModel][toModel] = wrapRounded(fn);
		convert[fromModel][toModel].raw = wrapRaw(fn);
	});
});

var colorConvert = convert;

var ansiStyles = createCommonjsModule(function (module) {
'use strict';


const wrapAnsi16 = (fn, offset) => function () {
	const code = fn.apply(colorConvert, arguments);
	return `\u001B[${code + offset}m`;
};

const wrapAnsi256 = (fn, offset) => function () {
	const code = fn.apply(colorConvert, arguments);
	return `\u001B[${38 + offset};5;${code}m`;
};

const wrapAnsi16m = (fn, offset) => function () {
	const rgb = fn.apply(colorConvert, arguments);
	return `\u001B[${38 + offset};2;${rgb[0]};${rgb[1]};${rgb[2]}m`;
};

function assembleStyles() {
	const styles = {
		modifier: {
			reset: [0, 0],
			// 21 isn't widely supported and 22 does the same thing
			bold: [1, 22],
			dim: [2, 22],
			italic: [3, 23],
			underline: [4, 24],
			inverse: [7, 27],
			hidden: [8, 28],
			strikethrough: [9, 29]
		},
		color: {
			black: [30, 39],
			red: [31, 39],
			green: [32, 39],
			yellow: [33, 39],
			blue: [34, 39],
			magenta: [35, 39],
			cyan: [36, 39],
			white: [37, 39],
			gray: [90, 39],

			// Bright color
			redBright: [91, 39],
			greenBright: [92, 39],
			yellowBright: [93, 39],
			blueBright: [94, 39],
			magentaBright: [95, 39],
			cyanBright: [96, 39],
			whiteBright: [97, 39]
		},
		bgColor: {
			bgBlack: [40, 49],
			bgRed: [41, 49],
			bgGreen: [42, 49],
			bgYellow: [43, 49],
			bgBlue: [44, 49],
			bgMagenta: [45, 49],
			bgCyan: [46, 49],
			bgWhite: [47, 49],

			// Bright color
			bgBlackBright: [100, 49],
			bgRedBright: [101, 49],
			bgGreenBright: [102, 49],
			bgYellowBright: [103, 49],
			bgBlueBright: [104, 49],
			bgMagentaBright: [105, 49],
			bgCyanBright: [106, 49],
			bgWhiteBright: [107, 49]
		}
	};

	// Fix humans
	styles.color.grey = styles.color.gray;

	Object.keys(styles).forEach(groupName => {
		const group = styles[groupName];

		Object.keys(group).forEach(styleName => {
			const style = group[styleName];

			styles[styleName] = {
				open: `\u001B[${style[0]}m`,
				close: `\u001B[${style[1]}m`
			};

			group[styleName] = styles[styleName];
		});

		Object.defineProperty(styles, groupName, {
			value: group,
			enumerable: false
		});
	});

	const rgb2rgb = (r, g, b) => [r, g, b];

	styles.color.close = '\u001B[39m';
	styles.bgColor.close = '\u001B[49m';

	styles.color.ansi = {};
	styles.color.ansi256 = {};
	styles.color.ansi16m = {
		rgb: wrapAnsi16m(rgb2rgb, 0)
	};

	styles.bgColor.ansi = {};
	styles.bgColor.ansi256 = {};
	styles.bgColor.ansi16m = {
		rgb: wrapAnsi16m(rgb2rgb, 10)
	};

	for (const key of Object.keys(colorConvert)) {
		if (typeof colorConvert[key] !== 'object') {
			continue;
		}

		const suite = colorConvert[key];

		if ('ansi16' in suite) {
			styles.color.ansi[key] = wrapAnsi16(suite.ansi16, 0);
			styles.bgColor.ansi[key] = wrapAnsi16(suite.ansi16, 10);
		}

		if ('ansi256' in suite) {
			styles.color.ansi256[key] = wrapAnsi256(suite.ansi256, 0);
			styles.bgColor.ansi256[key] = wrapAnsi256(suite.ansi256, 10);
		}

		if ('rgb' in suite) {
			styles.color.ansi16m[key] = wrapAnsi16m(suite.rgb, 0);
			styles.bgColor.ansi16m[key] = wrapAnsi16m(suite.rgb, 10);
		}
	}

	return styles;
}

Object.defineProperty(module, 'exports', {
	enumerable: true,
	get: assembleStyles
});
});

var hasFlag = function (flag, argv) {
	argv = argv || process.argv;

	var terminatorPos = argv.indexOf('--');
	var prefix = /^-{1,2}/.test(flag) ? '' : '--';
	var pos = argv.indexOf(prefix + flag);

	return pos !== -1 && (terminatorPos === -1 ? true : pos < terminatorPos);
};

var supportsColor = createCommonjsModule(function (module) {
'use strict';



const env = process.env;

const support = level => {
	if (level === 0) {
		return false;
	}

	return {
		level,
		hasBasic: true,
		has256: level >= 2,
		has16m: level >= 3
	};
};

let supportLevel = (() => {
	if (hasFlag('no-color') ||
		hasFlag('no-colors') ||
		hasFlag('color=false')) {
		return 0;
	}

	if (hasFlag('color=16m') ||
		hasFlag('color=full') ||
		hasFlag('color=truecolor')) {
		return 3;
	}

	if (hasFlag('color=256')) {
		return 2;
	}

	if (hasFlag('color') ||
		hasFlag('colors') ||
		hasFlag('color=true') ||
		hasFlag('color=always')) {
		return 1;
	}

	if (process.stdout && !process.stdout.isTTY) {
		return 0;
	}

	if (process.platform === 'win32') {
		// Node.js 7.5.0 is the first version of Node.js to include a patch to
		// libuv that enables 256 color output on Windows. Anything earlier and it
		// won't work. However, here we target Node.js 8 at minimum as it is an LTS
		// release, and Node.js 7 is not. Windows 10 build 10586 is the first Windows
		// release that supports 256 colors.
		const osRelease = os.release().split('.');
		if (
			Number(process.version.split('.')[0]) >= 8 &&
			Number(osRelease[0]) >= 10 &&
			Number(osRelease[2]) >= 10586
		) {
			return 2;
		}

		return 1;
	}

	if ('CI' in env) {
		if ('TRAVIS' in env || env.CI === 'Travis' || 'CIRCLECI' in env) {
			return 1;
		}

		return 0;
	}

	if ('TEAMCITY_VERSION' in env) {
		return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
	}

	if ('TERM_PROGRAM' in env) {
		const version = parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);

		switch (env.TERM_PROGRAM) {
			case 'iTerm.app':
				return version >= 3 ? 3 : 2;
			case 'Hyper':
				return 3;
			case 'Apple_Terminal':
				return 2;
			// No default
		}
	}

	if (/^(screen|xterm)-256(?:color)?/.test(env.TERM)) {
		return 2;
	}

	if (/^screen|^xterm|^vt100|color|ansi|cygwin|linux/i.test(env.TERM)) {
		return 1;
	}

	if ('COLORTERM' in env) {
		return 1;
	}

	if (env.TERM === 'dumb') {
		return 0;
	}

	return 0;
})();

if ('FORCE_COLOR' in env) {
	supportLevel = parseInt(env.FORCE_COLOR, 10) === 0 ? 0 : (supportLevel || 1);
}

module.exports = process && support(supportLevel);
});

var templates = createCommonjsModule(function (module) {
'use strict';
const TEMPLATE_REGEX = /(?:\\(u[a-f\d]{4}|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi;
const STYLE_REGEX = /(?:^|\.)(\w+)(?:\(([^)]*)\))?/g;
const STRING_REGEX = /^(['"])((?:\\.|(?!\1)[^\\])*)\1$/;
const ESCAPE_REGEX = /\\(u[a-f\d]{4}|x[a-f\d]{2}|.)|([^\\])/gi;

const ESCAPES = new Map([
	['n', '\n'],
	['r', '\r'],
	['t', '\t'],
	['b', '\b'],
	['f', '\f'],
	['v', '\v'],
	['0', '\0'],
	['\\', '\\'],
	['e', '\u001B'],
	['a', '\u0007']
]);

function unescape(c) {
	if ((c[0] === 'u' && c.length === 5) || (c[0] === 'x' && c.length === 3)) {
		return String.fromCharCode(parseInt(c.slice(1), 16));
	}

	return ESCAPES.get(c) || c;
}

function parseArguments(name, args) {
	const results = [];
	const chunks = args.trim().split(/\s*,\s*/g);
	let matches;

	for (const chunk of chunks) {
		if (!isNaN(chunk)) {
			results.push(Number(chunk));
		} else if ((matches = chunk.match(STRING_REGEX))) {
			results.push(matches[2].replace(ESCAPE_REGEX, (m, escape, chr) => escape ? unescape(escape) : chr));
		} else {
			throw new Error(`Invalid Chalk template style argument: ${chunk} (in style '${name}')`);
		}
	}

	return results;
}

function parseStyle(style) {
	STYLE_REGEX.lastIndex = 0;

	const results = [];
	let matches;

	while ((matches = STYLE_REGEX.exec(style)) !== null) {
		const name = matches[1];

		if (matches[2]) {
			const args = parseArguments(name, matches[2]);
			results.push([name].concat(args));
		} else {
			results.push([name]);
		}
	}

	return results;
}

function buildStyle(chalk, styles) {
	const enabled = {};

	for (const layer of styles) {
		for (const style of layer.styles) {
			enabled[style[0]] = layer.inverse ? null : style.slice(1);
		}
	}

	let current = chalk;
	for (const styleName of Object.keys(enabled)) {
		if (Array.isArray(enabled[styleName])) {
			if (!(styleName in current)) {
				throw new Error(`Unknown Chalk style: ${styleName}`);
			}

			if (enabled[styleName].length > 0) {
				current = current[styleName].apply(current, enabled[styleName]);
			} else {
				current = current[styleName];
			}
		}
	}

	return current;
}

module.exports = (chalk, tmp) => {
	const styles = [];
	const chunks = [];
	let chunk = [];

	// eslint-disable-next-line max-params
	tmp.replace(TEMPLATE_REGEX, (m, escapeChar, inverse, style, close, chr) => {
		if (escapeChar) {
			chunk.push(unescape(escapeChar));
		} else if (style) {
			const str = chunk.join('');
			chunk = [];
			chunks.push(styles.length === 0 ? str : buildStyle(chalk, styles)(str));
			styles.push({inverse, styles: parseStyle(style)});
		} else if (close) {
			if (styles.length === 0) {
				throw new Error('Found extraneous } in Chalk template literal');
			}

			chunks.push(buildStyle(chalk, styles)(chunk.join('')));
			chunk = [];
			styles.pop();
		} else {
			chunk.push(chr);
		}
	});

	chunks.push(chunk.join(''));

	if (styles.length > 0) {
		const errMsg = `Chalk template literal is missing ${styles.length} closing bracket${styles.length === 1 ? '' : 's'} (\`}\`)`;
		throw new Error(errMsg);
	}

	return chunks.join('');
};
});

var chalk = createCommonjsModule(function (module) {
'use strict';






const isSimpleWindowsTerm = process.platform === 'win32' && !(process.env.TERM || '').toLowerCase().startsWith('xterm');

// `supportsColor.level` → `ansiStyles.color[name]` mapping
const levelMapping = ['ansi', 'ansi', 'ansi256', 'ansi16m'];

// `color-convert` models to exclude from the Chalk API due to conflicts and such
const skipModels = new Set(['gray']);

const styles = Object.create(null);

function applyOptions(obj, options) {
	options = options || {};

	// Detect level if not set manually
	const scLevel = supportsColor ? supportsColor.level : 0;
	obj.level = options.level === undefined ? scLevel : options.level;
	obj.enabled = 'enabled' in options ? options.enabled : obj.level > 0;
}

function Chalk(options) {
	// We check for this.template here since calling `chalk.constructor()`
	// by itself will have a `this` of a previously constructed chalk object
	if (!this || !(this instanceof Chalk) || this.template) {
		const chalk = {};
		applyOptions(chalk, options);

		chalk.template = function () {
			const args = [].slice.call(arguments);
			return chalkTag.apply(null, [chalk.template].concat(args));
		};

		Object.setPrototypeOf(chalk, Chalk.prototype);
		Object.setPrototypeOf(chalk.template, chalk);

		chalk.template.constructor = Chalk;

		return chalk.template;
	}

	applyOptions(this, options);
}

// Use bright blue on Windows as the normal blue color is illegible
if (isSimpleWindowsTerm) {
	ansiStyles.blue.open = '\u001B[94m';
}

for (const key of Object.keys(ansiStyles)) {
	ansiStyles[key].closeRe = new RegExp(escapeStringRegexp(ansiStyles[key].close), 'g');

	styles[key] = {
		get() {
			const codes = ansiStyles[key];
			return build.call(this, this._styles ? this._styles.concat(codes) : [codes], this._empty, key);
		}
	};
}

styles.visible = {
	get() {
		return build.call(this, this._styles || [], true, 'visible');
	}
};

ansiStyles.color.closeRe = new RegExp(escapeStringRegexp(ansiStyles.color.close), 'g');
for (const model of Object.keys(ansiStyles.color.ansi)) {
	if (skipModels.has(model)) {
		continue;
	}

	styles[model] = {
		get() {
			const level = this.level;
			return function () {
				const open = ansiStyles.color[levelMapping[level]][model].apply(null, arguments);
				const codes = {
					open,
					close: ansiStyles.color.close,
					closeRe: ansiStyles.color.closeRe
				};
				return build.call(this, this._styles ? this._styles.concat(codes) : [codes], this._empty, model);
			};
		}
	};
}

ansiStyles.bgColor.closeRe = new RegExp(escapeStringRegexp(ansiStyles.bgColor.close), 'g');
for (const model of Object.keys(ansiStyles.bgColor.ansi)) {
	if (skipModels.has(model)) {
		continue;
	}

	const bgModel = 'bg' + model[0].toUpperCase() + model.slice(1);
	styles[bgModel] = {
		get() {
			const level = this.level;
			return function () {
				const open = ansiStyles.bgColor[levelMapping[level]][model].apply(null, arguments);
				const codes = {
					open,
					close: ansiStyles.bgColor.close,
					closeRe: ansiStyles.bgColor.closeRe
				};
				return build.call(this, this._styles ? this._styles.concat(codes) : [codes], this._empty, model);
			};
		}
	};
}

const proto = Object.defineProperties(() => {}, styles);

function build(_styles, _empty, key) {
	const builder = function () {
		return applyStyle.apply(builder, arguments);
	};

	builder._styles = _styles;
	builder._empty = _empty;

	const self = this;

	Object.defineProperty(builder, 'level', {
		enumerable: true,
		get() {
			return self.level;
		},
		set(level) {
			self.level = level;
		}
	});

	Object.defineProperty(builder, 'enabled', {
		enumerable: true,
		get() {
			return self.enabled;
		},
		set(enabled) {
			self.enabled = enabled;
		}
	});

	// See below for fix regarding invisible grey/dim combination on Windows
	builder.hasGrey = this.hasGrey || key === 'gray' || key === 'grey';

	// `__proto__` is used because we must return a function, but there is
	// no way to create a function with a different prototype
	builder.__proto__ = proto; // eslint-disable-line no-proto

	return builder;
}

function applyStyle() {
	// Support varags, but simply cast to string in case there's only one arg
	const args = arguments;
	const argsLen = args.length;
	let str = String(arguments[0]);

	if (argsLen === 0) {
		return '';
	}

	if (argsLen > 1) {
		// Don't slice `arguments`, it prevents V8 optimizations
		for (let a = 1; a < argsLen; a++) {
			str += ' ' + args[a];
		}
	}

	if (!this.enabled || this.level <= 0 || !str) {
		return this._empty ? '' : str;
	}

	// Turns out that on Windows dimmed gray text becomes invisible in cmd.exe,
	// see https://github.com/chalk/chalk/issues/58
	// If we're on Windows and we're dealing with a gray color, temporarily make 'dim' a noop.
	const originalDim = ansiStyles.dim.open;
	if (isSimpleWindowsTerm && this.hasGrey) {
		ansiStyles.dim.open = '';
	}

	for (const code of this._styles.slice().reverse()) {
		// Replace any instances already present with a re-opening code
		// otherwise only the part of the string until said closing code
		// will be colored, and the rest will simply be 'plain'.
		str = code.open + str.replace(code.closeRe, code.open) + code.close;

		// Close the styling before a linebreak and reopen
		// after next line to fix a bleed issue on macOS
		// https://github.com/chalk/chalk/pull/92
		str = str.replace(/\r?\n/g, `${code.close}$&${code.open}`);
	}

	// Reset the original `dim` if we changed it to work around the Windows dimmed gray issue
	ansiStyles.dim.open = originalDim;

	return str;
}

function chalkTag(chalk, strings) {
	if (!Array.isArray(strings)) {
		// If chalk() was called by itself or with a string,
		// return the string itself as a string.
		return [].slice.call(arguments, 1).join(' ');
	}

	const args = [].slice.call(arguments, 2);
	const parts = [strings.raw[0]];

	for (let i = 1; i < strings.length; i++) {
		parts.push(String(args[i - 1]).replace(/[{}\\]/g, '\\$&'));
		parts.push(String(strings.raw[i]));
	}

	return templates(chalk, parts.join(''));
}

Object.defineProperties(Chalk.prototype, styles);

module.exports = Chalk(); // eslint-disable-line new-cap
module.exports.supportsColor = supportsColor;
module.exports.default = module.exports; // For TypeScript
});

var lib$4 = createCommonjsModule(function (module, exports) {
"use strict";

exports.__esModule = true;
exports.codeFrameColumns = codeFrameColumns;
exports.default = _default;

var _jsTokens = _interopRequireWildcard(jsTokens);

var _esutils = _interopRequireDefault(utils$2);

var _chalk = _interopRequireDefault(chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var deprecationWarningShown = false;

function getDefs(chalk$$1) {
  return {
    keyword: chalk$$1.cyan,
    capitalized: chalk$$1.yellow,
    jsx_tag: chalk$$1.yellow,
    punctuator: chalk$$1.yellow,
    number: chalk$$1.magenta,
    string: chalk$$1.green,
    regex: chalk$$1.magenta,
    comment: chalk$$1.grey,
    invalid: chalk$$1.white.bgRed.bold,
    gutter: chalk$$1.grey,
    marker: chalk$$1.red.bold
  };
}

var NEWLINE = /\r\n|[\n\r\u2028\u2029]/;
var JSX_TAG = /^[a-z][\w-]*$/i;
var BRACKET = /^[()[\]{}]$/;

function getTokenType(match) {
  var _match$slice = match.slice(-2),
      offset = _match$slice[0],
      text = _match$slice[1];

  var token = (0, _jsTokens.matchToToken)(match);

  if (token.type === "name") {
    if (_esutils.default.keyword.isReservedWordES6(token.value)) {
      return "keyword";
    }

    if (JSX_TAG.test(token.value) && (text[offset - 1] === "<" || text.substr(offset - 2, 2) == "</")) {
      return "jsx_tag";
    }

    if (token.value[0] !== token.value[0].toLowerCase()) {
      return "capitalized";
    }
  }

  if (token.type === "punctuator" && BRACKET.test(token.value)) {
    return "bracket";
  }

  if (token.type === "invalid" && (token.value === "@" || token.value === "#")) {
    return "punctuator";
  }

  return token.type;
}

function highlight(defs, text) {
  return text.replace(_jsTokens.default, function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var type = getTokenType(args);
    var colorize = defs[type];

    if (colorize) {
      return args[0].split(NEWLINE).map(function (str) {
        return colorize(str);
      }).join("\n");
    } else {
      return args[0];
    }
  });
}

function getMarkerLines(loc, source, opts) {
  var startLoc = Object.assign({}, {
    column: 0,
    line: -1
  }, loc.start);
  var endLoc = Object.assign({}, startLoc, loc.end);
  var linesAbove = opts.linesAbove || 2;
  var linesBelow = opts.linesBelow || 3;
  var startLine = startLoc.line;
  var startColumn = startLoc.column;
  var endLine = endLoc.line;
  var endColumn = endLoc.column;
  var start = Math.max(startLine - (linesAbove + 1), 0);
  var end = Math.min(source.length, endLine + linesBelow);

  if (startLine === -1) {
    start = 0;
  }

  if (endLine === -1) {
    end = source.length;
  }

  var lineDiff = endLine - startLine;
  var markerLines = {};

  if (lineDiff) {
    for (var i = 0; i <= lineDiff; i++) {
      var lineNumber = i + startLine;

      if (!startColumn) {
        markerLines[lineNumber] = true;
      } else if (i === 0) {
        var sourceLength = source[lineNumber - 1].length;
        markerLines[lineNumber] = [startColumn, sourceLength - startColumn];
      } else if (i === lineDiff) {
        markerLines[lineNumber] = [0, endColumn];
      } else {
        var _sourceLength = source[lineNumber - i].length;
        markerLines[lineNumber] = [0, _sourceLength];
      }
    }
  } else {
    if (startColumn === endColumn) {
      if (startColumn) {
        markerLines[startLine] = [startColumn, 0];
      } else {
        markerLines[startLine] = true;
      }
    } else {
      markerLines[startLine] = [startColumn, endColumn - startColumn];
    }
  }

  return {
    start: start,
    end: end,
    markerLines: markerLines
  };
}

function codeFrameColumns(rawLines, loc, opts) {
  if (opts === void 0) {
    opts = {};
  }

  var highlighted = opts.highlightCode && _chalk.default.supportsColor || opts.forceColor;
  var chalk$$1 = _chalk.default;

  if (opts.forceColor) {
    chalk$$1 = new _chalk.default.constructor({
      enabled: true
    });
  }

  var maybeHighlight = function maybeHighlight(chalkFn, string) {
    return highlighted ? chalkFn(string) : string;
  };

  var defs = getDefs(chalk$$1);
  if (highlighted) rawLines = highlight(defs, rawLines);
  var lines = rawLines.split(NEWLINE);

  var _getMarkerLines = getMarkerLines(loc, lines, opts),
      start = _getMarkerLines.start,
      end = _getMarkerLines.end,
      markerLines = _getMarkerLines.markerLines;

  var numberMaxWidth = String(end).length;
  var frame = lines.slice(start, end).map(function (line, index) {
    var number = start + 1 + index;
    var paddedNumber = (" " + number).slice(-numberMaxWidth);
    var gutter = " " + paddedNumber + " | ";
    var hasMarker = markerLines[number];

    if (hasMarker) {
      var markerLine = "";

      if (Array.isArray(hasMarker)) {
        var markerSpacing = line.slice(0, Math.max(hasMarker[0] - 1, 0)).replace(/[^\t]/g, " ");
        var numberOfMarkers = hasMarker[1] || 1;
        markerLine = ["\n ", maybeHighlight(defs.gutter, gutter.replace(/\d/g, " ")), markerSpacing, maybeHighlight(defs.marker, "^").repeat(numberOfMarkers)].join("");
      }

      return [maybeHighlight(defs.marker, ">"), maybeHighlight(defs.gutter, gutter), line, markerLine].join("");
    } else {
      return " " + maybeHighlight(defs.gutter, gutter) + line;
    }
  }).join("\n");

  if (highlighted) {
    return chalk$$1.reset(frame);
  } else {
    return frame;
  }
}

function _default(rawLines, lineNumber, colNumber, opts) {
  if (opts === void 0) {
    opts = {};
  }

  if (!deprecationWarningShown) {
    deprecationWarningShown = true;
    var deprecationError = new Error("Passing lineNumber and colNumber is deprecated to @babel/code-frame. Please use `codeFrameColumns`.");
    deprecationError.name = "DeprecationWarning";

    if (process.emitWarning) {
      process.emitWarning(deprecationError);
    } else {
      console.warn(deprecationError);
    }
  }

  colNumber = Math.max(colNumber, 0);
  var location = {
    start: {
      column: colNumber,
      line: lineNumber
    }
  };
  return codeFrameColumns(rawLines, location, opts);
}
});

unwrapExports(lib$4);

const ConfigError = errors.ConfigError;

function getParsers(options) {
  return options.plugins.reduce(
    (parsers, plugin) => Object.assign({}, parsers, plugin.parsers),
    {}
  );
}

function resolveParser$1(opts, parsers) {
  parsers = parsers || getParsers(opts);

  if (typeof opts.parser === "function") {
    // Custom parser API always works with JavaScript.
    return {
      parse: opts.parser,
      astFormat: "estree"
    };
  }

  if (typeof opts.parser === "string") {
    if (parsers.hasOwnProperty(opts.parser)) {
      return parsers[opts.parser];
    }
    try {
      return {
        parse: require(path.resolve(process.cwd(), opts.parser)),
        astFormat: "estree"
      };
    } catch (err) {
      /* istanbul ignore next */
      throw new ConfigError(`Couldn't resolve parser "${opts.parser}"`);
    }
  }
  /* istanbul ignore next */
  return parsers.babylon;
}

function parse$4(text, opts) {
  const parsers = getParsers(opts);

  // Copy the "parse" function from parser to a new object whose values are
  // functions. Use defineProperty()/getOwnPropertyDescriptor() such that we
  // don't invoke the parser.parse getters.
  const parsersForCustomParserApi = Object.keys(parsers).reduce(
    (object, parserName) =>
      Object.defineProperty(
        object,
        parserName,
        Object.getOwnPropertyDescriptor(parsers[parserName], "parse")
      ),
    {}
  );

  const parser = resolveParser$1(opts, parsers);

  try {
    if (parser.preprocess) {
      text = parser.preprocess(text, opts);
    }

    return {
      text,
      ast: parser.parse(text, parsersForCustomParserApi, opts)
    };
  } catch (error) {
    const loc = error.loc;

    if (loc) {
      const codeFrame = lib$4;
      error.codeFrame = codeFrame.codeFrameColumns(text, loc, {
        highlightCode: true
      });
      error.message += "\n" + error.codeFrame;
      throw error;
    }

    /* istanbul ignore next */
    throw error.stack;
  }
}

var parser$3 = { parse: parse$4, resolveParser: resolveParser$1 };

function getPrinter(options) {
  const astFormat = options.astFormat;

  if (!astFormat) {
    throw new Error("getPrinter() requires astFormat to be set");
  }
  const printerPlugin = options.plugins.find(
    plugin => plugin.printers[astFormat]
  );
  if (!printerPlugin) {
    throw new Error(
      `Couldn't find printer plugin for AST format "${astFormat}"`
    );
  }

  return printerPlugin.printers[astFormat];
}

var getPrinter_1 = getPrinter;

const getSupportInfo$2 = support.getSupportInfo;
const supportInfo = getSupportInfo$2(null, { showUnreleased: true });


const resolveParser = parser$3.resolveParser;


const hiddenDefaults = {
  astFormat: "estree",
  printer: {}
};

const defaults = supportInfo.options.reduce(
  (reduced, optionInfo) =>
    Object.assign(reduced, { [optionInfo.name]: optionInfo.default }),
  Object.assign({}, hiddenDefaults)
);

// Copy options and fill in default values.
function normalize$2(options, opts) {
  opts = opts || {};

  const rawOptions = Object.assign({}, options);
  rawOptions.plugins = loadPlugins_1(rawOptions.plugins);

  if (opts.inferParser !== false) {
    if (
      rawOptions.filepath &&
      (!rawOptions.parser || rawOptions.parser === defaults.parser)
    ) {
      const inferredParser = inferParser(
        rawOptions.filepath,
        rawOptions.plugins
      );
      if (inferredParser) {
        rawOptions.parser = inferredParser;
      }
    }
  }

  rawOptions.astFormat = resolveParser(rawOptions).astFormat;
  rawOptions.printer = getPrinter_1(rawOptions);

  Object.keys(defaults).forEach(k => {
    if (rawOptions[k] == null) {
      rawOptions[k] = defaults[k];
    }
  });

  if (rawOptions.parser === "json") {
    rawOptions.trailingComma = "none";
  }

  return optionsNormalizer.normalizeApiOptions(
    rawOptions,
    supportInfo.options,
    Object.assign({ passThrough: Object.keys(hiddenDefaults) }, opts)
  );
}

function inferParser(filepath, plugins) {
  const extension = path.extname(filepath);
  const filename = path.basename(filepath).toLowerCase();

  const language = getSupportInfo$2(null, {
    plugins,
    pluginsLoaded: true
  }).languages.find(
    language =>
      typeof language.since === "string" &&
      (language.extensions.indexOf(extension) > -1 ||
        (language.filenames &&
          language.filenames.find(name => name.toLowerCase() === filename)))
  );

  return language && language.parsers[0];
}

var options$8 = { normalize: normalize$2, defaults, hiddenDefaults };

const normalize$1 = options$8.normalize;


function printSubtree(path$$1, print, options) {
  if (options.printer.embed) {
    return options.printer.embed(
      path$$1,
      print,
      (text, partialNextOptions) =>
        textToDoc(text, partialNextOptions, options),
      options
    );
  }
}

function textToDoc(text, partialNextOptions, parentOptions) {
  const nextOptions = normalize$1(
    Object.assign({}, parentOptions, partialNextOptions, {
      parentParser: parentOptions.parser,
      originalText: text
    }),
    { passThrough: true, inferParser: false }
  );

  const result = parser$3.parse(text, nextOptions);
  const ast = result.ast;
  text = result.text;

  const astComments = ast.comments;
  delete ast.comments;
  comments.attach(astComments, ast, text, nextOptions);
  return astToDoc(ast, nextOptions);
}

var multiparser = {
  printSubtree
};

const doc$3 = doc;
const docBuilders$14 = doc$3.builders;
const concat$14 = docBuilders$14.concat;
const hardline$13 = docBuilders$14.hardline;
const addAlignmentToDoc$2 = docBuilders$14.addAlignmentToDoc;
const docUtils$5 = doc$3.utils;

function printAstToDoc(ast, options, addAlignmentSize) {
  addAlignmentSize = addAlignmentSize || 0;

  const printer = options.printer;
  const cache = new Map();

  function printGenerically(path$$1, args) {
    const node = path$$1.getValue();

    const shouldCache = node && typeof node === "object" && args === undefined;
    if (shouldCache && cache.has(node)) {
      return cache.get(node);
    }

    // We let JSXElement print its comments itself because it adds () around
    // UnionTypeAnnotation has to align the child without the comments
    let res;
    if (printer.willPrintOwnComments && printer.willPrintOwnComments(path$$1)) {
      res = genericPrint$6(path$$1, options, printGenerically, args);
    } else {
      res = comments.printComments(
        path$$1,
        p => genericPrint$6(p, options, printGenerically, args),
        options,
        args && args.needsSemi
      );
    }

    if (shouldCache) {
      cache.set(node, res);
    }

    return res;
  }

  let doc$$2 = printGenerically(new fastPath(ast));
  if (addAlignmentSize > 0) {
    // Add a hardline to make the indents take effect
    // It should be removed in index.js format()
    doc$$2 = addAlignmentToDoc$2(
      docUtils$5.removeLines(concat$14([hardline$13, doc$$2])),
      addAlignmentSize,
      options.tabWidth
    );
  }
  docUtils$5.propagateBreaks(doc$$2);

  if (options.parser === "json") {
    doc$$2 = concat$14([doc$$2, hardline$13]);
  }

  return doc$$2;
}

function genericPrint$6(path$$1, options, printPath, args) {
  assert.ok(path$$1 instanceof fastPath);

  const node = path$$1.getValue();
  const printer = options.printer;

  // Escape hatch
  if (printer.hasPrettierIgnore && printer.hasPrettierIgnore(path$$1)) {
    return options.originalText.slice(util$1.locStart(node), util$1.locEnd(node));
  }

  if (node) {
    try {
      // Potentially switch to a different parser
      const sub = multiparser.printSubtree(path$$1, printPath, options);
      if (sub) {
        return sub;
      }
    } catch (error) {
      /* istanbul ignore if */
      if (process.env.PRETTIER_DEBUG) {
        throw error;
      }
      // Continue with current parser
    }
  }

  return printer.print(path$$1, options, printPath, args);
}

var astToDoc = printAstToDoc;

var concatMap = function (xs, fn) {
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        var x = fn(xs[i], i);
        if (isArray(x)) res.push.apply(res, x);
        else res.push(x);
    }
    return res;
};

var isArray = Array.isArray || function (xs) {
    return Object.prototype.toString.call(xs) === '[object Array]';
};

var balancedMatch = balanced;
function balanced(a, b, str) {
  if (a instanceof RegExp) a = maybeMatch(a, str);
  if (b instanceof RegExp) b = maybeMatch(b, str);

  var r = range(a, b, str);

  return r && {
    start: r[0],
    end: r[1],
    pre: str.slice(0, r[0]),
    body: str.slice(r[0] + a.length, r[1]),
    post: str.slice(r[1] + b.length)
  };
}

function maybeMatch(reg, str) {
  var m = str.match(reg);
  return m ? m[0] : null;
}

balanced.range = range;
function range(a, b, str) {
  var begs, beg, left, right, result;
  var ai = str.indexOf(a);
  var bi = str.indexOf(b, ai + 1);
  var i = ai;

  if (ai >= 0 && bi > 0) {
    begs = [];
    left = str.length;

    while (i >= 0 && !result) {
      if (i == ai) {
        begs.push(i);
        ai = str.indexOf(a, i + 1);
      } else if (begs.length == 1) {
        result = [ begs.pop(), bi ];
      } else {
        beg = begs.pop();
        if (beg < left) {
          left = beg;
          right = bi;
        }

        bi = str.indexOf(b, i + 1);
      }

      i = ai < bi && ai >= 0 ? ai : bi;
    }

    if (begs.length) {
      result = [ left, right ];
    }
  }

  return result;
}

var braceExpansion = expandTop;

var escSlash = '\0SLASH'+Math.random()+'\0';
var escOpen = '\0OPEN'+Math.random()+'\0';
var escClose = '\0CLOSE'+Math.random()+'\0';
var escComma = '\0COMMA'+Math.random()+'\0';
var escPeriod = '\0PERIOD'+Math.random()+'\0';

function numeric(str) {
  return parseInt(str, 10) == str
    ? parseInt(str, 10)
    : str.charCodeAt(0);
}

function escapeBraces(str) {
  return str.split('\\\\').join(escSlash)
            .split('\\{').join(escOpen)
            .split('\\}').join(escClose)
            .split('\\,').join(escComma)
            .split('\\.').join(escPeriod);
}

function unescapeBraces(str) {
  return str.split(escSlash).join('\\')
            .split(escOpen).join('{')
            .split(escClose).join('}')
            .split(escComma).join(',')
            .split(escPeriod).join('.');
}


// Basically just str.split(","), but handling cases
// where we have nested braced sections, which should be
// treated as individual members, like {a,{b,c},d}
function parseCommaParts(str) {
  if (!str)
    return [''];

  var parts = [];
  var m = balancedMatch('{', '}', str);

  if (!m)
    return str.split(',');

  var pre = m.pre;
  var body = m.body;
  var post = m.post;
  var p = pre.split(',');

  p[p.length-1] += '{' + body + '}';
  var postParts = parseCommaParts(post);
  if (post.length) {
    p[p.length-1] += postParts.shift();
    p.push.apply(p, postParts);
  }

  parts.push.apply(parts, p);

  return parts;
}

function expandTop(str) {
  if (!str)
    return [];

  // I don't know why Bash 4.3 does this, but it does.
  // Anything starting with {} will have the first two bytes preserved
  // but *only* at the top level, so {},a}b will not expand to anything,
  // but a{},b}c will be expanded to [a}c,abc].
  // One could argue that this is a bug in Bash, but since the goal of
  // this module is to match Bash's rules, we escape a leading {}
  if (str.substr(0, 2) === '{}') {
    str = '\\{\\}' + str.substr(2);
  }

  return expand(escapeBraces(str), true).map(unescapeBraces);
}

function embrace(str) {
  return '{' + str + '}';
}
function isPadded(el) {
  return /^-?0\d/.test(el);
}

function lte(i, y) {
  return i <= y;
}
function gte(i, y) {
  return i >= y;
}

function expand(str, isTop) {
  var expansions = [];

  var m = balancedMatch('{', '}', str);
  if (!m || /\$$/.test(m.pre)) return [str];

  var isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
  var isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
  var isSequence = isNumericSequence || isAlphaSequence;
  var isOptions = m.body.indexOf(',') >= 0;
  if (!isSequence && !isOptions) {
    // {a},b}
    if (m.post.match(/,.*\}/)) {
      str = m.pre + '{' + m.body + escClose + m.post;
      return expand(str);
    }
    return [str];
  }

  var n;
  if (isSequence) {
    n = m.body.split(/\.\./);
  } else {
    n = parseCommaParts(m.body);
    if (n.length === 1) {
      // x{{a,b}}y ==> x{a}y x{b}y
      n = expand(n[0], false).map(embrace);
      if (n.length === 1) {
        var post = m.post.length
          ? expand(m.post, false)
          : [''];
        return post.map(function(p) {
          return m.pre + n[0] + p;
        });
      }
    }
  }

  // at this point, n is the parts, and we know it's not a comma set
  // with a single entry.

  // no need to expand pre, since it is guaranteed to be free of brace-sets
  var pre = m.pre;
  var post = m.post.length
    ? expand(m.post, false)
    : [''];

  var N;

  if (isSequence) {
    var x = numeric(n[0]);
    var y = numeric(n[1]);
    var width = Math.max(n[0].length, n[1].length);
    var incr = n.length == 3
      ? Math.abs(numeric(n[2]))
      : 1;
    var test = lte;
    var reverse = y < x;
    if (reverse) {
      incr *= -1;
      test = gte;
    }
    var pad = n.some(isPadded);

    N = [];

    for (var i = x; test(i, y); i += incr) {
      var c;
      if (isAlphaSequence) {
        c = String.fromCharCode(i);
        if (c === '\\')
          c = '';
      } else {
        c = String(i);
        if (pad) {
          var need = width - c.length;
          if (need > 0) {
            var z = new Array(need + 1).join('0');
            if (i < 0)
              c = '-' + z + c.slice(1);
            else
              c = z + c;
          }
        }
      }
      N.push(c);
    }
  } else {
    N = concatMap(n, function(el) { return expand(el, false) });
  }

  for (var j = 0; j < N.length; j++) {
    for (var k = 0; k < post.length; k++) {
      var expansion = pre + N[j] + post[k];
      if (!isTop || isSequence || expansion)
        expansions.push(expansion);
    }
  }

  return expansions;
}

var minimatch_1 = minimatch;
minimatch.Minimatch = Minimatch;

var path$3 = { sep: '/' };
try {
  path$3 = path;
} catch (er) {}

var GLOBSTAR = minimatch.GLOBSTAR = Minimatch.GLOBSTAR = {};


var plTypes = {
  '!': { open: '(?:(?!(?:', close: '))[^/]*?)'},
  '?': { open: '(?:', close: ')?' },
  '+': { open: '(?:', close: ')+' },
  '*': { open: '(?:', close: ')*' },
  '@': { open: '(?:', close: ')' }
};

// any single thing other than /
// don't need to escape / when using new RegExp()
var qmark = '[^/]';

// * => any number of characters
var star = qmark + '*?';

// ** when dots are allowed.  Anything goes, except .. and .
// not (^ or / followed by one or two dots followed by $ or /),
// followed by anything, any number of times.
var twoStarDot = '(?:(?!(?:\\\/|^)(?:\\.{1,2})($|\\\/)).)*?';

// not a ^ or / followed by a dot,
// followed by anything, any number of times.
var twoStarNoDot = '(?:(?!(?:\\\/|^)\\.).)*?';

// characters that need to be escaped in RegExp.
var reSpecials = charSet('().*{}+?[]^$\\!');

// "abc" -> { a:true, b:true, c:true }
function charSet (s) {
  return s.split('').reduce(function (set, c) {
    set[c] = true;
    return set
  }, {})
}

// normalizes slashes.
var slashSplit = /\/+/;

minimatch.filter = filter;
function filter (pattern, options) {
  options = options || {};
  return function (p, i, list) {
    return minimatch(p, pattern, options)
  }
}

function ext (a, b) {
  a = a || {};
  b = b || {};
  var t = {};
  Object.keys(b).forEach(function (k) {
    t[k] = b[k];
  });
  Object.keys(a).forEach(function (k) {
    t[k] = a[k];
  });
  return t
}

minimatch.defaults = function (def) {
  if (!def || !Object.keys(def).length) return minimatch

  var orig = minimatch;

  var m = function minimatch (p, pattern, options) {
    return orig.minimatch(p, pattern, ext(def, options))
  };

  m.Minimatch = function Minimatch (pattern, options) {
    return new orig.Minimatch(pattern, ext(def, options))
  };

  return m
};

Minimatch.defaults = function (def) {
  if (!def || !Object.keys(def).length) return Minimatch
  return minimatch.defaults(def).Minimatch
};

function minimatch (p, pattern, options) {
  if (typeof pattern !== 'string') {
    throw new TypeError('glob pattern string required')
  }

  if (!options) options = {};

  // shortcut: comments match nothing.
  if (!options.nocomment && pattern.charAt(0) === '#') {
    return false
  }

  // "" only matches ""
  if (pattern.trim() === '') return p === ''

  return new Minimatch(pattern, options).match(p)
}

function Minimatch (pattern, options) {
  if (!(this instanceof Minimatch)) {
    return new Minimatch(pattern, options)
  }

  if (typeof pattern !== 'string') {
    throw new TypeError('glob pattern string required')
  }

  if (!options) options = {};
  pattern = pattern.trim();

  // windows support: need to use /, not \
  if (path$3.sep !== '/') {
    pattern = pattern.split(path$3.sep).join('/');
  }

  this.options = options;
  this.set = [];
  this.pattern = pattern;
  this.regexp = null;
  this.negate = false;
  this.comment = false;
  this.empty = false;

  // make the set of regexps etc.
  this.make();
}

Minimatch.prototype.debug = function () {};

Minimatch.prototype.make = make;
function make () {
  // don't do it more than once.
  if (this._made) return

  var pattern = this.pattern;
  var options = this.options;

  // empty patterns and comments match nothing.
  if (!options.nocomment && pattern.charAt(0) === '#') {
    this.comment = true;
    return
  }
  if (!pattern) {
    this.empty = true;
    return
  }

  // step 1: figure out negation, etc.
  this.parseNegate();

  // step 2: expand braces
  var set = this.globSet = this.braceExpand();

  if (options.debug) this.debug = console.error;

  this.debug(this.pattern, set);

  // step 3: now we have a set, so turn each one into a series of path-portion
  // matching patterns.
  // These will be regexps, except in the case of "**", which is
  // set to the GLOBSTAR object for globstar behavior,
  // and will not contain any / characters
  set = this.globParts = set.map(function (s) {
    return s.split(slashSplit)
  });

  this.debug(this.pattern, set);

  // glob --> regexps
  set = set.map(function (s, si, set) {
    return s.map(this.parse, this)
  }, this);

  this.debug(this.pattern, set);

  // filter out everything that didn't compile properly.
  set = set.filter(function (s) {
    return s.indexOf(false) === -1
  });

  this.debug(this.pattern, set);

  this.set = set;
}

Minimatch.prototype.parseNegate = parseNegate;
function parseNegate () {
  var pattern = this.pattern;
  var negate = false;
  var options = this.options;
  var negateOffset = 0;

  if (options.nonegate) return

  for (var i = 0, l = pattern.length
    ; i < l && pattern.charAt(i) === '!'
    ; i++) {
    negate = !negate;
    negateOffset++;
  }

  if (negateOffset) this.pattern = pattern.substr(negateOffset);
  this.negate = negate;
}

// Brace expansion:
// a{b,c}d -> abd acd
// a{b,}c -> abc ac
// a{0..3}d -> a0d a1d a2d a3d
// a{b,c{d,e}f}g -> abg acdfg acefg
// a{b,c}d{e,f}g -> abdeg acdeg abdeg abdfg
//
// Invalid sets are not expanded.
// a{2..}b -> a{2..}b
// a{b}c -> a{b}c
minimatch.braceExpand = function (pattern, options) {
  return braceExpand(pattern, options)
};

Minimatch.prototype.braceExpand = braceExpand;

function braceExpand (pattern, options) {
  if (!options) {
    if (this instanceof Minimatch) {
      options = this.options;
    } else {
      options = {};
    }
  }

  pattern = typeof pattern === 'undefined'
    ? this.pattern : pattern;

  if (typeof pattern === 'undefined') {
    throw new TypeError('undefined pattern')
  }

  if (options.nobrace ||
    !pattern.match(/\{.*\}/)) {
    // shortcut. no need to expand.
    return [pattern]
  }

  return braceExpansion(pattern)
}

// parse a component of the expanded set.
// At this point, no pattern may contain "/" in it
// so we're going to return a 2d array, where each entry is the full
// pattern, split on '/', and then turned into a regular expression.
// A regexp is made at the end which joins each array with an
// escaped /, and another full one which joins each regexp with |.
//
// Following the lead of Bash 4.1, note that "**" only has special meaning
// when it is the *only* thing in a path portion.  Otherwise, any series
// of * is equivalent to a single *.  Globstar behavior is enabled by
// default, and can be disabled by setting options.noglobstar.
Minimatch.prototype.parse = parse$5;
var SUBPARSE = {};
function parse$5 (pattern, isSub) {
  if (pattern.length > 1024 * 64) {
    throw new TypeError('pattern is too long')
  }

  var options = this.options;

  // shortcuts
  if (!options.noglobstar && pattern === '**') return GLOBSTAR
  if (pattern === '') return ''

  var re = '';
  var hasMagic = !!options.nocase;
  var escaping = false;
  // ? => one single character
  var patternListStack = [];
  var negativeLists = [];
  var stateChar;
  var inClass = false;
  var reClassStart = -1;
  var classStart = -1;
  // . and .. never match anything that doesn't start with .,
  // even when options.dot is set.
  var patternStart = pattern.charAt(0) === '.' ? '' // anything
  // not (start or / followed by . or .. followed by / or end)
  : options.dot ? '(?!(?:^|\\\/)\\.{1,2}(?:$|\\\/))'
  : '(?!\\.)';
  var self = this;

  function clearStateChar () {
    if (stateChar) {
      // we had some state-tracking character
      // that wasn't consumed by this pass.
      switch (stateChar) {
        case '*':
          re += star;
          hasMagic = true;
        break
        case '?':
          re += qmark;
          hasMagic = true;
        break
        default:
          re += '\\' + stateChar;
        break
      }
      self.debug('clearStateChar %j %j', stateChar, re);
      stateChar = false;
    }
  }

  for (var i = 0, len = pattern.length, c
    ; (i < len) && (c = pattern.charAt(i))
    ; i++) {
    this.debug('%s\t%s %s %j', pattern, i, re, c);

    // skip over any that are escaped.
    if (escaping && reSpecials[c]) {
      re += '\\' + c;
      escaping = false;
      continue
    }

    switch (c) {
      case '/':
        // completely not allowed, even escaped.
        // Should already be path-split by now.
        return false

      case '\\':
        clearStateChar();
        escaping = true;
      continue

      // the various stateChar values
      // for the "extglob" stuff.
      case '?':
      case '*':
      case '+':
      case '@':
      case '!':
        this.debug('%s\t%s %s %j <-- stateChar', pattern, i, re, c);

        // all of those are literals inside a class, except that
        // the glob [!a] means [^a] in regexp
        if (inClass) {
          this.debug('  in class');
          if (c === '!' && i === classStart + 1) c = '^';
          re += c;
          continue
        }

        // if we already have a stateChar, then it means
        // that there was something like ** or +? in there.
        // Handle the stateChar, then proceed with this one.
        self.debug('call clearStateChar %j', stateChar);
        clearStateChar();
        stateChar = c;
        // if extglob is disabled, then +(asdf|foo) isn't a thing.
        // just clear the statechar *now*, rather than even diving into
        // the patternList stuff.
        if (options.noext) clearStateChar();
      continue

      case '(':
        if (inClass) {
          re += '(';
          continue
        }

        if (!stateChar) {
          re += '\\(';
          continue
        }

        patternListStack.push({
          type: stateChar,
          start: i - 1,
          reStart: re.length,
          open: plTypes[stateChar].open,
          close: plTypes[stateChar].close
        });
        // negation is (?:(?!js)[^/]*)
        re += stateChar === '!' ? '(?:(?!(?:' : '(?:';
        this.debug('plType %j %j', stateChar, re);
        stateChar = false;
      continue

      case ')':
        if (inClass || !patternListStack.length) {
          re += '\\)';
          continue
        }

        clearStateChar();
        hasMagic = true;
        var pl = patternListStack.pop();
        // negation is (?:(?!js)[^/]*)
        // The others are (?:<pattern>)<type>
        re += pl.close;
        if (pl.type === '!') {
          negativeLists.push(pl);
        }
        pl.reEnd = re.length;
      continue

      case '|':
        if (inClass || !patternListStack.length || escaping) {
          re += '\\|';
          escaping = false;
          continue
        }

        clearStateChar();
        re += '|';
      continue

      // these are mostly the same in regexp and glob
      case '[':
        // swallow any state-tracking char before the [
        clearStateChar();

        if (inClass) {
          re += '\\' + c;
          continue
        }

        inClass = true;
        classStart = i;
        reClassStart = re.length;
        re += c;
      continue

      case ']':
        //  a right bracket shall lose its special
        //  meaning and represent itself in
        //  a bracket expression if it occurs
        //  first in the list.  -- POSIX.2 2.8.3.2
        if (i === classStart + 1 || !inClass) {
          re += '\\' + c;
          escaping = false;
          continue
        }

        // handle the case where we left a class open.
        // "[z-a]" is valid, equivalent to "\[z-a\]"
        if (inClass) {
          // split where the last [ was, make sure we don't have
          // an invalid re. if so, re-walk the contents of the
          // would-be class to re-translate any characters that
          // were passed through as-is
          // TODO: It would probably be faster to determine this
          // without a try/catch and a new RegExp, but it's tricky
          // to do safely.  For now, this is safe and works.
          var cs = pattern.substring(classStart + 1, i);
          try {
            RegExp('[' + cs + ']');
          } catch (er) {
            // not a valid class!
            var sp = this.parse(cs, SUBPARSE);
            re = re.substr(0, reClassStart) + '\\[' + sp[0] + '\\]';
            hasMagic = hasMagic || sp[1];
            inClass = false;
            continue
          }
        }

        // finish up the class.
        hasMagic = true;
        inClass = false;
        re += c;
      continue

      default:
        // swallow any state char that wasn't consumed
        clearStateChar();

        if (escaping) {
          // no need
          escaping = false;
        } else if (reSpecials[c]
          && !(c === '^' && inClass)) {
          re += '\\';
        }

        re += c;

    } // switch
  } // for

  // handle the case where we left a class open.
  // "[abc" is valid, equivalent to "\[abc"
  if (inClass) {
    // split where the last [ was, and escape it
    // this is a huge pita.  We now have to re-walk
    // the contents of the would-be class to re-translate
    // any characters that were passed through as-is
    cs = pattern.substr(classStart + 1);
    sp = this.parse(cs, SUBPARSE);
    re = re.substr(0, reClassStart) + '\\[' + sp[0];
    hasMagic = hasMagic || sp[1];
  }

  // handle the case where we had a +( thing at the *end*
  // of the pattern.
  // each pattern list stack adds 3 chars, and we need to go through
  // and escape any | chars that were passed through as-is for the regexp.
  // Go through and escape them, taking care not to double-escape any
  // | chars that were already escaped.
  for (pl = patternListStack.pop(); pl; pl = patternListStack.pop()) {
    var tail = re.slice(pl.reStart + pl.open.length);
    this.debug('setting tail', re, pl);
    // maybe some even number of \, then maybe 1 \, followed by a |
    tail = tail.replace(/((?:\\{2}){0,64})(\\?)\|/g, function (_, $1, $2) {
      if (!$2) {
        // the | isn't already escaped, so escape it.
        $2 = '\\';
      }

      // need to escape all those slashes *again*, without escaping the
      // one that we need for escaping the | character.  As it works out,
      // escaping an even number of slashes can be done by simply repeating
      // it exactly after itself.  That's why this trick works.
      //
      // I am sorry that you have to see this.
      return $1 + $1 + $2 + '|'
    });

    this.debug('tail=%j\n   %s', tail, tail, pl, re);
    var t = pl.type === '*' ? star
      : pl.type === '?' ? qmark
      : '\\' + pl.type;

    hasMagic = true;
    re = re.slice(0, pl.reStart) + t + '\\(' + tail;
  }

  // handle trailing things that only matter at the very end.
  clearStateChar();
  if (escaping) {
    // trailing \\
    re += '\\\\';
  }

  // only need to apply the nodot start if the re starts with
  // something that could conceivably capture a dot
  var addPatternStart = false;
  switch (re.charAt(0)) {
    case '.':
    case '[':
    case '(': addPatternStart = true;
  }

  // Hack to work around lack of negative lookbehind in JS
  // A pattern like: *.!(x).!(y|z) needs to ensure that a name
  // like 'a.xyz.yz' doesn't match.  So, the first negative
  // lookahead, has to look ALL the way ahead, to the end of
  // the pattern.
  for (var n = negativeLists.length - 1; n > -1; n--) {
    var nl = negativeLists[n];

    var nlBefore = re.slice(0, nl.reStart);
    var nlFirst = re.slice(nl.reStart, nl.reEnd - 8);
    var nlLast = re.slice(nl.reEnd - 8, nl.reEnd);
    var nlAfter = re.slice(nl.reEnd);

    nlLast += nlAfter;

    // Handle nested stuff like *(*.js|!(*.json)), where open parens
    // mean that we should *not* include the ) in the bit that is considered
    // "after" the negated section.
    var openParensBefore = nlBefore.split('(').length - 1;
    var cleanAfter = nlAfter;
    for (i = 0; i < openParensBefore; i++) {
      cleanAfter = cleanAfter.replace(/\)[+*?]?/, '');
    }
    nlAfter = cleanAfter;

    var dollar = '';
    if (nlAfter === '' && isSub !== SUBPARSE) {
      dollar = '$';
    }
    var newRe = nlBefore + nlFirst + nlAfter + dollar + nlLast;
    re = newRe;
  }

  // if the re is not "" at this point, then we need to make sure
  // it doesn't match against an empty path part.
  // Otherwise a/* will match a/, which it should not.
  if (re !== '' && hasMagic) {
    re = '(?=.)' + re;
  }

  if (addPatternStart) {
    re = patternStart + re;
  }

  // parsing just a piece of a larger pattern.
  if (isSub === SUBPARSE) {
    return [re, hasMagic]
  }

  // skip the regexp for non-magical patterns
  // unescape anything in it, though, so that it'll be
  // an exact match against a file etc.
  if (!hasMagic) {
    return globUnescape(pattern)
  }

  var flags = options.nocase ? 'i' : '';
  try {
    var regExp = new RegExp('^' + re + '$', flags);
  } catch (er) {
    // If it was an invalid regular expression, then it can't match
    // anything.  This trick looks for a character after the end of
    // the string, which is of course impossible, except in multi-line
    // mode, but it's not a /m regex.
    return new RegExp('$.')
  }

  regExp._glob = pattern;
  regExp._src = re;

  return regExp
}

minimatch.makeRe = function (pattern, options) {
  return new Minimatch(pattern, options || {}).makeRe()
};

Minimatch.prototype.makeRe = makeRe;
function makeRe () {
  if (this.regexp || this.regexp === false) return this.regexp

  // at this point, this.set is a 2d array of partial
  // pattern strings, or "**".
  //
  // It's better to use .match().  This function shouldn't
  // be used, really, but it's pretty convenient sometimes,
  // when you just want to work with a regex.
  var set = this.set;

  if (!set.length) {
    this.regexp = false;
    return this.regexp
  }
  var options = this.options;

  var twoStar = options.noglobstar ? star
    : options.dot ? twoStarDot
    : twoStarNoDot;
  var flags = options.nocase ? 'i' : '';

  var re = set.map(function (pattern) {
    return pattern.map(function (p) {
      return (p === GLOBSTAR) ? twoStar
      : (typeof p === 'string') ? regExpEscape(p)
      : p._src
    }).join('\\\/')
  }).join('|');

  // must match entire pattern
  // ending in a * or ** will make it less strict.
  re = '^(?:' + re + ')$';

  // can match anything, as long as it's not this.
  if (this.negate) re = '^(?!' + re + ').*$';

  try {
    this.regexp = new RegExp(re, flags);
  } catch (ex) {
    this.regexp = false;
  }
  return this.regexp
}

minimatch.match = function (list, pattern, options) {
  options = options || {};
  var mm = new Minimatch(pattern, options);
  list = list.filter(function (f) {
    return mm.match(f)
  });
  if (mm.options.nonull && !list.length) {
    list.push(pattern);
  }
  return list
};

Minimatch.prototype.match = match;
function match (f, partial) {
  this.debug('match', f, this.pattern);
  // short-circuit in the case of busted things.
  // comments, etc.
  if (this.comment) return false
  if (this.empty) return f === ''

  if (f === '/' && partial) return true

  var options = this.options;

  // windows: need to use /, not \
  if (path$3.sep !== '/') {
    f = f.split(path$3.sep).join('/');
  }

  // treat the test path as a set of pathparts.
  f = f.split(slashSplit);
  this.debug(this.pattern, 'split', f);

  // just ONE of the pattern sets in this.set needs to match
  // in order for it to be valid.  If negating, then just one
  // match means that we have failed.
  // Either way, return on the first hit.

  var set = this.set;
  this.debug(this.pattern, 'set', set);

  // Find the basename of the path by looking for the last non-empty segment
  var filename;
  var i;
  for (i = f.length - 1; i >= 0; i--) {
    filename = f[i];
    if (filename) break
  }

  for (i = 0; i < set.length; i++) {
    var pattern = set[i];
    var file = f;
    if (options.matchBase && pattern.length === 1) {
      file = [filename];
    }
    var hit = this.matchOne(file, pattern, partial);
    if (hit) {
      if (options.flipNegate) return true
      return !this.negate
    }
  }

  // didn't get any hits.  this is success if it's a negative
  // pattern, failure otherwise.
  if (options.flipNegate) return false
  return this.negate
}

// set partial to true to test if, for example,
// "/a/b" matches the start of "/*/b/*/d"
// Partial means, if you run out of file before you run
// out of pattern, then that's fine, as long as all
// the parts match.
Minimatch.prototype.matchOne = function (file, pattern, partial) {
  var options = this.options;

  this.debug('matchOne',
    { 'this': this, file: file, pattern: pattern });

  this.debug('matchOne', file.length, pattern.length);

  for (var fi = 0,
      pi = 0,
      fl = file.length,
      pl = pattern.length
      ; (fi < fl) && (pi < pl)
      ; fi++, pi++) {
    this.debug('matchOne loop');
    var p = pattern[pi];
    var f = file[fi];

    this.debug(pattern, p, f);

    // should be impossible.
    // some invalid regexp stuff in the set.
    if (p === false) return false

    if (p === GLOBSTAR) {
      this.debug('GLOBSTAR', [pattern, p, f]);

      // "**"
      // a/**/b/**/c would match the following:
      // a/b/x/y/z/c
      // a/x/y/z/b/c
      // a/b/x/b/x/c
      // a/b/c
      // To do this, take the rest of the pattern after
      // the **, and see if it would match the file remainder.
      // If so, return success.
      // If not, the ** "swallows" a segment, and try again.
      // This is recursively awful.
      //
      // a/**/b/**/c matching a/b/x/y/z/c
      // - a matches a
      // - doublestar
      //   - matchOne(b/x/y/z/c, b/**/c)
      //     - b matches b
      //     - doublestar
      //       - matchOne(x/y/z/c, c) -> no
      //       - matchOne(y/z/c, c) -> no
      //       - matchOne(z/c, c) -> no
      //       - matchOne(c, c) yes, hit
      var fr = fi;
      var pr = pi + 1;
      if (pr === pl) {
        this.debug('** at the end');
        // a ** at the end will just swallow the rest.
        // We have found a match.
        // however, it will not swallow /.x, unless
        // options.dot is set.
        // . and .. are *never* matched by **, for explosively
        // exponential reasons.
        for (; fi < fl; fi++) {
          if (file[fi] === '.' || file[fi] === '..' ||
            (!options.dot && file[fi].charAt(0) === '.')) return false
        }
        return true
      }

      // ok, let's see if we can swallow whatever we can.
      while (fr < fl) {
        var swallowee = file[fr];

        this.debug('\nglobstar while', file, fr, pattern, pr, swallowee);

        // XXX remove this slice.  Just pass the start index.
        if (this.matchOne(file.slice(fr), pattern.slice(pr), partial)) {
          this.debug('globstar found match!', fr, fl, swallowee);
          // found a match.
          return true
        } else {
          // can't swallow "." or ".." ever.
          // can only swallow ".foo" when explicitly asked.
          if (swallowee === '.' || swallowee === '..' ||
            (!options.dot && swallowee.charAt(0) === '.')) {
            this.debug('dot detected!', file, fr, pattern, pr);
            break
          }

          // ** swallows a segment, and continue.
          this.debug('globstar swallow a segment, and continue');
          fr++;
        }
      }

      // no match was found.
      // However, in partial mode, we can't say this is necessarily over.
      // If there's more *pattern* left, then
      if (partial) {
        // ran out of file
        this.debug('\n>>> no match, partial?', file, fr, pattern, pr);
        if (fr === fl) return true
      }
      return false
    }

    // something other than **
    // non-magic patterns just have to match exactly
    // patterns with magic have been turned into regexps.
    var hit;
    if (typeof p === 'string') {
      if (options.nocase) {
        hit = f.toLowerCase() === p.toLowerCase();
      } else {
        hit = f === p;
      }
      this.debug('string match', p, f, hit);
    } else {
      hit = f.match(p);
      this.debug('pattern match', p, f, hit);
    }

    if (!hit) return false
  }

  // Note: ending in / means that we'll get a final ""
  // at the end of the pattern.  This can only match a
  // corresponding "" at the end of the file.
  // If the file ends in /, then it can only match a
  // a pattern that ends in /, unless the pattern just
  // doesn't have any more for it. But, a/b/ should *not*
  // match "a/b/*", even though "" matches against the
  // [^/]*? pattern, except in partial mode, where it might
  // simply not be reached yet.
  // However, a/b/ should still satisfy a/*

  // now either we fell off the end of the pattern, or we're done.
  if (fi === fl && pi === pl) {
    // ran out of pattern and filename at the same time.
    // an exact hit!
    return true
  } else if (fi === fl) {
    // ran out of file, but still had pattern left.
    // this is ok if we're doing the match as part of
    // a glob fs traversal.
    return partial
  } else if (pi === pl) {
    // ran out of pattern, still have file left.
    // this is only acceptable if we're on the very last
    // empty segment of a file with a trailing slash.
    // a/* should match a/b/
    var emptyFileEnd = (fi === fl - 1) && (file[fi] === '');
    return emptyFileEnd
  }

  // should be unreachable.
  throw new Error('wtf?')
};

// replace stuff like \* with *
function globUnescape (s) {
  return s.replace(/\\(.)/g, '$1')
}

function regExpEscape (s) {
  return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

var mimicFn = (to, from) => {
	// TODO: use `Reflect.ownKeys()` when targeting Node.js 6
	for (const prop of Object.getOwnPropertyNames(from).concat(Object.getOwnPropertySymbols(from))) {
		Object.defineProperty(to, prop, Object.getOwnPropertyDescriptor(from, prop));
	}
};

var mem = createCommonjsModule(function (module) {
'use strict';


const cacheStore = new WeakMap();

const defaultCacheKey = function (x) {
	if (arguments.length === 1 && (x === null || x === undefined || (typeof x !== 'function' && typeof x !== 'object'))) {
		return x;
	}

	return JSON.stringify(arguments);
};

module.exports = (fn, opts) => {
	opts = Object.assign({
		cacheKey: defaultCacheKey,
		cache: new Map()
	}, opts);

	const memoized = function () {
		const cache = cacheStore.get(memoized);
		const key = opts.cacheKey.apply(null, arguments);

		if (cache.has(key)) {
			const c = cache.get(key);

			if (typeof opts.maxAge !== 'number' || Date.now() < c.maxAge) {
				return c.data;
			}
		}

		const ret = fn.apply(null, arguments);

		cache.set(key, {
			data: ret,
			maxAge: Date.now() + (opts.maxAge || 0)
		});

		return ret;
	};

	mimicFn(memoized, fn);

	cacheStore.set(memoized, opts.cache);

	return memoized;
};

module.exports.clear = fn => {
	const cache = cacheStore.get(fn);

	if (cache && typeof cache.clear === 'function') {
		cache.clear();
	}
};
});

var es5 = createCommonjsModule(function (module) {
var isES5 = (function(){
    "use strict";
    return this === undefined;
})();

if (isES5) {
    module.exports = {
        freeze: Object.freeze,
        defineProperty: Object.defineProperty,
        getDescriptor: Object.getOwnPropertyDescriptor,
        keys: Object.keys,
        names: Object.getOwnPropertyNames,
        getPrototypeOf: Object.getPrototypeOf,
        isArray: Array.isArray,
        isES5: isES5,
        propertyIsWritable: function(obj, prop) {
            var descriptor = Object.getOwnPropertyDescriptor(obj, prop);
            return !!(!descriptor || descriptor.writable || descriptor.set);
        }
    };
} else {
    var has = {}.hasOwnProperty;
    var str = {}.toString;
    var proto = {}.constructor.prototype;

    var ObjectKeys = function (o) {
        var ret = [];
        for (var key in o) {
            if (has.call(o, key)) {
                ret.push(key);
            }
        }
        return ret;
    };

    var ObjectGetDescriptor = function(o, key) {
        return {value: o[key]};
    };

    var ObjectDefineProperty = function (o, key, desc) {
        o[key] = desc.value;
        return o;
    };

    var ObjectFreeze = function (obj) {
        return obj;
    };

    var ObjectGetPrototypeOf = function (obj) {
        try {
            return Object(obj).constructor.prototype;
        }
        catch (e) {
            return proto;
        }
    };

    var ArrayIsArray = function (obj) {
        try {
            return str.call(obj) === "[object Array]";
        }
        catch(e) {
            return false;
        }
    };

    module.exports = {
        isArray: ArrayIsArray,
        keys: ObjectKeys,
        names: ObjectKeys,
        defineProperty: ObjectDefineProperty,
        getDescriptor: ObjectGetDescriptor,
        freeze: ObjectFreeze,
        getPrototypeOf: ObjectGetPrototypeOf,
        isES5: isES5,
        propertyIsWritable: function() {
            return true;
        }
    };
}
});

var canEvaluate = typeof navigator == "undefined";

var errorObj = {e: {}};
var tryCatchTarget;
var globalObject = typeof self !== "undefined" ? self :
    typeof window !== "undefined" ? window :
    typeof commonjsGlobal !== "undefined" ? commonjsGlobal :
    commonjsGlobal !== undefined ? commonjsGlobal : null;

function tryCatcher() {
    try {
        var target = tryCatchTarget;
        tryCatchTarget = null;
        return target.apply(this, arguments);
    } catch (e) {
        errorObj.e = e;
        return errorObj;
    }
}
function tryCatch(fn) {
    tryCatchTarget = fn;
    return tryCatcher;
}

var inherits = function(Child, Parent) {
    var hasProp = {}.hasOwnProperty;

    function T() {
        this.constructor = Child;
        this.constructor$ = Parent;
        for (var propertyName in Parent.prototype) {
            if (hasProp.call(Parent.prototype, propertyName) &&
                propertyName.charAt(propertyName.length-1) !== "$"
           ) {
                this[propertyName + "$"] = Parent.prototype[propertyName];
            }
        }
    }
    T.prototype = Parent.prototype;
    Child.prototype = new T();
    return Child.prototype;
};


function isPrimitive(val) {
    return val == null || val === true || val === false ||
        typeof val === "string" || typeof val === "number";

}

function isObject(value) {
    return typeof value === "function" ||
           typeof value === "object" && value !== null;
}

function maybeWrapAsError(maybeError) {
    if (!isPrimitive(maybeError)) return maybeError;

    return new Error(safeToString(maybeError));
}

function withAppended(target, appendee) {
    var len = target.length;
    var ret = new Array(len + 1);
    var i;
    for (i = 0; i < len; ++i) {
        ret[i] = target[i];
    }
    ret[i] = appendee;
    return ret;
}

function getDataPropertyOrDefault(obj, key, defaultValue) {
    if (es5.isES5) {
        var desc = Object.getOwnPropertyDescriptor(obj, key);

        if (desc != null) {
            return desc.get == null && desc.set == null
                    ? desc.value
                    : defaultValue;
        }
    } else {
        return {}.hasOwnProperty.call(obj, key) ? obj[key] : undefined;
    }
}

function notEnumerableProp(obj, name, value) {
    if (isPrimitive(obj)) return obj;
    var descriptor = {
        value: value,
        configurable: true,
        enumerable: false,
        writable: true
    };
    es5.defineProperty(obj, name, descriptor);
    return obj;
}

function thrower(r) {
    throw r;
}

var inheritedDataKeys = (function() {
    var excludedPrototypes = [
        Array.prototype,
        Object.prototype,
        Function.prototype
    ];

    var isExcludedProto = function(val) {
        for (var i = 0; i < excludedPrototypes.length; ++i) {
            if (excludedPrototypes[i] === val) {
                return true;
            }
        }
        return false;
    };

    if (es5.isES5) {
        var getKeys = Object.getOwnPropertyNames;
        return function(obj) {
            var ret = [];
            var visitedKeys = Object.create(null);
            while (obj != null && !isExcludedProto(obj)) {
                var keys;
                try {
                    keys = getKeys(obj);
                } catch (e) {
                    return ret;
                }
                for (var i = 0; i < keys.length; ++i) {
                    var key = keys[i];
                    if (visitedKeys[key]) continue;
                    visitedKeys[key] = true;
                    var desc = Object.getOwnPropertyDescriptor(obj, key);
                    if (desc != null && desc.get == null && desc.set == null) {
                        ret.push(key);
                    }
                }
                obj = es5.getPrototypeOf(obj);
            }
            return ret;
        };
    } else {
        var hasProp = {}.hasOwnProperty;
        return function(obj) {
            if (isExcludedProto(obj)) return [];
            var ret = [];

            /*jshint forin:false */
            enumeration: for (var key in obj) {
                if (hasProp.call(obj, key)) {
                    ret.push(key);
                } else {
                    for (var i = 0; i < excludedPrototypes.length; ++i) {
                        if (hasProp.call(excludedPrototypes[i], key)) {
                            continue enumeration;
                        }
                    }
                    ret.push(key);
                }
            }
            return ret;
        };
    }

})();

var thisAssignmentPattern = /this\s*\.\s*\S+\s*=/;
function isClass(fn) {
    try {
        if (typeof fn === "function") {
            var keys = es5.names(fn.prototype);

            var hasMethods = es5.isES5 && keys.length > 1;
            var hasMethodsOtherThanConstructor = keys.length > 0 &&
                !(keys.length === 1 && keys[0] === "constructor");
            var hasThisAssignmentAndStaticMethods =
                thisAssignmentPattern.test(fn + "") && es5.names(fn).length > 0;

            if (hasMethods || hasMethodsOtherThanConstructor ||
                hasThisAssignmentAndStaticMethods) {
                return true;
            }
        }
        return false;
    } catch (e) {
        return false;
    }
}

function toFastProperties(obj) {
    /*jshint -W027,-W055,-W031*/
    function FakeConstructor() {}
    FakeConstructor.prototype = obj;
    var l = 8;
    while (l--) new FakeConstructor();
    return obj;
    eval(obj);
}

var rident = /^[a-z$_][a-z$_0-9]*$/i;
function isIdentifier(str) {
    return rident.test(str);
}

function filledRange(count, prefix, suffix) {
    var ret = new Array(count);
    for(var i = 0; i < count; ++i) {
        ret[i] = prefix + i + suffix;
    }
    return ret;
}

function safeToString(obj) {
    try {
        return obj + "";
    } catch (e) {
        return "[no string representation]";
    }
}

function isError(obj) {
    return obj !== null &&
           typeof obj === "object" &&
           typeof obj.message === "string" &&
           typeof obj.name === "string";
}

function markAsOriginatingFromRejection(e) {
    try {
        notEnumerableProp(e, "isOperational", true);
    }
    catch(ignore) {}
}

function originatesFromRejection(e) {
    if (e == null) return false;
    return ((e instanceof Error["__BluebirdErrorTypes__"].OperationalError) ||
        e["isOperational"] === true);
}

function canAttachTrace(obj) {
    return isError(obj) && es5.propertyIsWritable(obj, "stack");
}

var ensureErrorObject = (function() {
    if (!("stack" in new Error())) {
        return function(value) {
            if (canAttachTrace(value)) return value;
            try {throw new Error(safeToString(value));}
            catch(err) {return err;}
        };
    } else {
        return function(value) {
            if (canAttachTrace(value)) return value;
            return new Error(safeToString(value));
        };
    }
})();

function classString(obj) {
    return {}.toString.call(obj);
}

function copyDescriptors(from, to, filter) {
    var keys = es5.names(from);
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        if (filter(key)) {
            try {
                es5.defineProperty(to, key, es5.getDescriptor(from, key));
            } catch (ignore) {}
        }
    }
}

var asArray = function(v) {
    if (es5.isArray(v)) {
        return v;
    }
    return null;
};

if (typeof Symbol !== "undefined" && Symbol.iterator) {
    var ArrayFrom = typeof Array.from === "function" ? function(v) {
        return Array.from(v);
    } : function(v) {
        var ret = [];
        var it = v[Symbol.iterator]();
        var itResult;
        while (!((itResult = it.next()).done)) {
            ret.push(itResult.value);
        }
        return ret;
    };

    asArray = function(v) {
        if (es5.isArray(v)) {
            return v;
        } else if (v != null && typeof v[Symbol.iterator] === "function") {
            return ArrayFrom(v);
        }
        return null;
    };
}

var isNode = typeof process !== "undefined" &&
        classString(process).toLowerCase() === "[object process]";

var hasEnvVariables = typeof process !== "undefined" &&
    typeof process.env !== "undefined";

function env(key) {
    return hasEnvVariables ? process.env[key] : undefined;
}

function getNativePromise() {
    if (typeof Promise === "function") {
        try {
            var promise = new Promise(function(){});
            if ({}.toString.call(promise) === "[object Promise]") {
                return Promise;
            }
        } catch (e) {}
    }
}

function domainBind(self, cb) {
    return self.bind(cb);
}

var ret = {
    isClass: isClass,
    isIdentifier: isIdentifier,
    inheritedDataKeys: inheritedDataKeys,
    getDataPropertyOrDefault: getDataPropertyOrDefault,
    thrower: thrower,
    isArray: es5.isArray,
    asArray: asArray,
    notEnumerableProp: notEnumerableProp,
    isPrimitive: isPrimitive,
    isObject: isObject,
    isError: isError,
    canEvaluate: canEvaluate,
    errorObj: errorObj,
    tryCatch: tryCatch,
    inherits: inherits,
    withAppended: withAppended,
    maybeWrapAsError: maybeWrapAsError,
    toFastProperties: toFastProperties,
    filledRange: filledRange,
    toString: safeToString,
    canAttachTrace: canAttachTrace,
    ensureErrorObject: ensureErrorObject,
    originatesFromRejection: originatesFromRejection,
    markAsOriginatingFromRejection: markAsOriginatingFromRejection,
    classString: classString,
    copyDescriptors: copyDescriptors,
    hasDevTools: typeof chrome !== "undefined" && chrome &&
                 typeof chrome.loadTimes === "function",
    isNode: isNode,
    hasEnvVariables: hasEnvVariables,
    env: env,
    global: globalObject,
    getNativePromise: getNativePromise,
    domainBind: domainBind
};
ret.isRecentNode = ret.isNode && (function() {
    var version = process.versions.node.split(".").map(Number);
    return (version[0] === 0 && version[1] > 10) || (version[0] > 0);
})();

if (ret.isNode) ret.toFastProperties(process);

try {throw new Error(); } catch (e) {ret.lastLineError = e;}
var util$6 = ret;

var schedule;
var noAsyncScheduler = function() {
    throw new Error("No async scheduler available\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
};
var NativePromise = util$6.getNativePromise();
if (util$6.isNode && typeof MutationObserver === "undefined") {
    var GlobalSetImmediate = commonjsGlobal.setImmediate;
    var ProcessNextTick = process.nextTick;
    schedule = util$6.isRecentNode
                ? function(fn) { GlobalSetImmediate.call(commonjsGlobal, fn); }
                : function(fn) { ProcessNextTick.call(process, fn); };
} else if (typeof NativePromise === "function" &&
           typeof NativePromise.resolve === "function") {
    var nativePromise = NativePromise.resolve();
    schedule = function(fn) {
        nativePromise.then(fn);
    };
} else if ((typeof MutationObserver !== "undefined") &&
          !(typeof window !== "undefined" &&
            window.navigator &&
            (window.navigator.standalone || window.cordova))) {
    schedule = (function() {
        var div = document.createElement("div");
        var opts = {attributes: true};
        var toggleScheduled = false;
        var div2 = document.createElement("div");
        var o2 = new MutationObserver(function() {
            div.classList.toggle("foo");
            toggleScheduled = false;
        });
        o2.observe(div2, opts);

        var scheduleToggle = function() {
            if (toggleScheduled) return;
            toggleScheduled = true;
            div2.classList.toggle("foo");
        };

        return function schedule(fn) {
            var o = new MutationObserver(function() {
                o.disconnect();
                fn();
            });
            o.observe(div, opts);
            scheduleToggle();
        };
    })();
} else if (typeof setImmediate !== "undefined") {
    schedule = function (fn) {
        setImmediate(fn);
    };
} else if (typeof setTimeout !== "undefined") {
    schedule = function (fn) {
        setTimeout(fn, 0);
    };
} else {
    schedule = noAsyncScheduler;
}
var schedule_1 = schedule;

function arrayMove(src, srcIndex, dst, dstIndex, len) {
    for (var j = 0; j < len; ++j) {
        dst[j + dstIndex] = src[j + srcIndex];
        src[j + srcIndex] = void 0;
    }
}

function Queue(capacity) {
    this._capacity = capacity;
    this._length = 0;
    this._front = 0;
}

Queue.prototype._willBeOverCapacity = function (size) {
    return this._capacity < size;
};

Queue.prototype._pushOne = function (arg) {
    var length = this.length();
    this._checkCapacity(length + 1);
    var i = (this._front + length) & (this._capacity - 1);
    this[i] = arg;
    this._length = length + 1;
};

Queue.prototype.push = function (fn, receiver, arg) {
    var length = this.length() + 3;
    if (this._willBeOverCapacity(length)) {
        this._pushOne(fn);
        this._pushOne(receiver);
        this._pushOne(arg);
        return;
    }
    var j = this._front + length - 3;
    this._checkCapacity(length);
    var wrapMask = this._capacity - 1;
    this[(j + 0) & wrapMask] = fn;
    this[(j + 1) & wrapMask] = receiver;
    this[(j + 2) & wrapMask] = arg;
    this._length = length;
};

Queue.prototype.shift = function () {
    var front = this._front,
        ret = this[front];

    this[front] = undefined;
    this._front = (front + 1) & (this._capacity - 1);
    this._length--;
    return ret;
};

Queue.prototype.length = function () {
    return this._length;
};

Queue.prototype._checkCapacity = function (size) {
    if (this._capacity < size) {
        this._resizeTo(this._capacity << 1);
    }
};

Queue.prototype._resizeTo = function (capacity) {
    var oldCapacity = this._capacity;
    this._capacity = capacity;
    var front = this._front;
    var length = this._length;
    var moveItemsCount = (front + length) & (oldCapacity - 1);
    arrayMove(this, 0, this, oldCapacity, moveItemsCount);
};

var queue = Queue;

var firstLineError;
try {throw new Error(); } catch (e) {firstLineError = e;}




function Async() {
    this._customScheduler = false;
    this._isTickUsed = false;
    this._lateQueue = new queue(16);
    this._normalQueue = new queue(16);
    this._haveDrainedQueues = false;
    this._trampolineEnabled = true;
    var self = this;
    this.drainQueues = function () {
        self._drainQueues();
    };
    this._schedule = schedule_1;
}

Async.prototype.setScheduler = function(fn) {
    var prev = this._schedule;
    this._schedule = fn;
    this._customScheduler = true;
    return prev;
};

Async.prototype.hasCustomScheduler = function() {
    return this._customScheduler;
};

Async.prototype.enableTrampoline = function() {
    this._trampolineEnabled = true;
};

Async.prototype.disableTrampolineIfNecessary = function() {
    if (util$6.hasDevTools) {
        this._trampolineEnabled = false;
    }
};

Async.prototype.haveItemsQueued = function () {
    return this._isTickUsed || this._haveDrainedQueues;
};


Async.prototype.fatalError = function(e, isNode) {
    if (isNode) {
        process.stderr.write("Fatal " + (e instanceof Error ? e.stack : e) +
            "\n");
        process.exit(2);
    } else {
        this.throwLater(e);
    }
};

Async.prototype.throwLater = function(fn, arg) {
    if (arguments.length === 1) {
        arg = fn;
        fn = function () { throw arg; };
    }
    if (typeof setTimeout !== "undefined") {
        setTimeout(function() {
            fn(arg);
        }, 0);
    } else try {
        this._schedule(function() {
            fn(arg);
        });
    } catch (e) {
        throw new Error("No async scheduler available\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
};

function AsyncInvokeLater(fn, receiver, arg) {
    this._lateQueue.push(fn, receiver, arg);
    this._queueTick();
}

function AsyncInvoke(fn, receiver, arg) {
    this._normalQueue.push(fn, receiver, arg);
    this._queueTick();
}

function AsyncSettlePromises(promise) {
    this._normalQueue._pushOne(promise);
    this._queueTick();
}

if (!util$6.hasDevTools) {
    Async.prototype.invokeLater = AsyncInvokeLater;
    Async.prototype.invoke = AsyncInvoke;
    Async.prototype.settlePromises = AsyncSettlePromises;
} else {
    Async.prototype.invokeLater = function (fn, receiver, arg) {
        if (this._trampolineEnabled) {
            AsyncInvokeLater.call(this, fn, receiver, arg);
        } else {
            this._schedule(function() {
                setTimeout(function() {
                    fn.call(receiver, arg);
                }, 100);
            });
        }
    };

    Async.prototype.invoke = function (fn, receiver, arg) {
        if (this._trampolineEnabled) {
            AsyncInvoke.call(this, fn, receiver, arg);
        } else {
            this._schedule(function() {
                fn.call(receiver, arg);
            });
        }
    };

    Async.prototype.settlePromises = function(promise) {
        if (this._trampolineEnabled) {
            AsyncSettlePromises.call(this, promise);
        } else {
            this._schedule(function() {
                promise._settlePromises();
            });
        }
    };
}

Async.prototype._drainQueue = function(queue$$1) {
    while (queue$$1.length() > 0) {
        var fn = queue$$1.shift();
        if (typeof fn !== "function") {
            fn._settlePromises();
            continue;
        }
        var receiver = queue$$1.shift();
        var arg = queue$$1.shift();
        fn.call(receiver, arg);
    }
};

Async.prototype._drainQueues = function () {
    this._drainQueue(this._normalQueue);
    this._reset();
    this._haveDrainedQueues = true;
    this._drainQueue(this._lateQueue);
};

Async.prototype._queueTick = function () {
    if (!this._isTickUsed) {
        this._isTickUsed = true;
        this._schedule(this.drainQueues);
    }
};

Async.prototype._reset = function () {
    this._isTickUsed = false;
};

var async$3 = Async;
var firstLineError_1 = firstLineError;

async$3.firstLineError = firstLineError_1;

var Objectfreeze = es5.freeze;

var inherits$1 = util$6.inherits;
var notEnumerableProp$1 = util$6.notEnumerableProp;

function subError(nameProperty, defaultMessage) {
    function SubError(message) {
        if (!(this instanceof SubError)) return new SubError(message);
        notEnumerableProp$1(this, "message",
            typeof message === "string" ? message : defaultMessage);
        notEnumerableProp$1(this, "name", nameProperty);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        } else {
            Error.call(this);
        }
    }
    inherits$1(SubError, Error);
    return SubError;
}

var _TypeError;
var _RangeError;
var Warning = subError("Warning", "warning");
var CancellationError = subError("CancellationError", "cancellation error");
var TimeoutError = subError("TimeoutError", "timeout error");
var AggregateError = subError("AggregateError", "aggregate error");
try {
    _TypeError = TypeError;
    _RangeError = RangeError;
} catch(e) {
    _TypeError = subError("TypeError", "type error");
    _RangeError = subError("RangeError", "range error");
}

var methods = ("join pop push shift unshift slice filter forEach some " +
    "every map indexOf lastIndexOf reduce reduceRight sort reverse").split(" ");

for (var i = 0; i < methods.length; ++i) {
    if (typeof Array.prototype[methods[i]] === "function") {
        AggregateError.prototype[methods[i]] = Array.prototype[methods[i]];
    }
}

es5.defineProperty(AggregateError.prototype, "length", {
    value: 0,
    configurable: false,
    writable: true,
    enumerable: true
});
AggregateError.prototype["isOperational"] = true;
var level = 0;
AggregateError.prototype.toString = function() {
    var indent = Array(level * 4 + 1).join(" ");
    var ret = "\n" + indent + "AggregateError of:" + "\n";
    level++;
    indent = Array(level * 4 + 1).join(" ");
    for (var i = 0; i < this.length; ++i) {
        var str = this[i] === this ? "[Circular AggregateError]" : this[i] + "";
        var lines = str.split("\n");
        for (var j = 0; j < lines.length; ++j) {
            lines[j] = indent + lines[j];
        }
        str = lines.join("\n");
        ret += str + "\n";
    }
    level--;
    return ret;
};

function OperationalError(message) {
    if (!(this instanceof OperationalError))
        return new OperationalError(message);
    notEnumerableProp$1(this, "name", "OperationalError");
    notEnumerableProp$1(this, "message", message);
    this.cause = message;
    this["isOperational"] = true;

    if (message instanceof Error) {
        notEnumerableProp$1(this, "message", message.message);
        notEnumerableProp$1(this, "stack", message.stack);
    } else if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
    }

}
inherits$1(OperationalError, Error);

var errorTypes = Error["__BluebirdErrorTypes__"];
if (!errorTypes) {
    errorTypes = Objectfreeze({
        CancellationError: CancellationError,
        TimeoutError: TimeoutError,
        OperationalError: OperationalError,
        RejectionError: OperationalError,
        AggregateError: AggregateError
    });
    es5.defineProperty(Error, "__BluebirdErrorTypes__", {
        value: errorTypes,
        writable: false,
        enumerable: false,
        configurable: false
    });
}

var errors$2 = {
    Error: Error,
    TypeError: _TypeError,
    RangeError: _RangeError,
    CancellationError: errorTypes.CancellationError,
    OperationalError: errorTypes.OperationalError,
    TimeoutError: errorTypes.TimeoutError,
    AggregateError: errorTypes.AggregateError,
    Warning: Warning
};

var thenables = function(Promise, INTERNAL) {
var util$$1 = util$6;
var errorObj = util$$1.errorObj;
var isObject = util$$1.isObject;

function tryConvertToPromise(obj, context) {
    if (isObject(obj)) {
        if (obj instanceof Promise) return obj;
        var then = getThen(obj);
        if (then === errorObj) {
            if (context) context._pushContext();
            var ret = Promise.reject(then.e);
            if (context) context._popContext();
            return ret;
        } else if (typeof then === "function") {
            if (isAnyBluebirdPromise(obj)) {
                var ret = new Promise(INTERNAL);
                obj._then(
                    ret._fulfill,
                    ret._reject,
                    undefined,
                    ret,
                    null
                );
                return ret;
            }
            return doThenable(obj, then, context);
        }
    }
    return obj;
}

function doGetThen(obj) {
    return obj.then;
}

function getThen(obj) {
    try {
        return doGetThen(obj);
    } catch (e) {
        errorObj.e = e;
        return errorObj;
    }
}

var hasProp = {}.hasOwnProperty;
function isAnyBluebirdPromise(obj) {
    try {
        return hasProp.call(obj, "_promise0");
    } catch (e) {
        return false;
    }
}

function doThenable(x, then, context) {
    var promise = new Promise(INTERNAL);
    var ret = promise;
    if (context) context._pushContext();
    promise._captureStackTrace();
    if (context) context._popContext();
    var synchronous = true;
    var result = util$$1.tryCatch(then).call(x, resolve, reject);
    synchronous = false;

    if (promise && result === errorObj) {
        promise._rejectCallback(result.e, true, true);
        promise = null;
    }

    function resolve(value) {
        if (!promise) return;
        promise._resolveCallback(value);
        promise = null;
    }

    function reject(reason) {
        if (!promise) return;
        promise._rejectCallback(reason, synchronous, true);
        promise = null;
    }
    return ret;
}

return tryConvertToPromise;
};

var promise_array = function(Promise, INTERNAL, tryConvertToPromise,
    apiRejection, Proxyable) {
var util$$1 = util$6;
var isArray = util$$1.isArray;

function toResolutionValue(val) {
    switch(val) {
    case -2: return [];
    case -3: return {};
    case -6: return new Map();
    }
}

function PromiseArray(values) {
    var promise = this._promise = new Promise(INTERNAL);
    if (values instanceof Promise) {
        promise._propagateFrom(values, 3);
    }
    promise._setOnCancel(this);
    this._values = values;
    this._length = 0;
    this._totalResolved = 0;
    this._init(undefined, -2);
}
util$$1.inherits(PromiseArray, Proxyable);

PromiseArray.prototype.length = function () {
    return this._length;
};

PromiseArray.prototype.promise = function () {
    return this._promise;
};

PromiseArray.prototype._init = function init(_, resolveValueIfEmpty) {
    var values = tryConvertToPromise(this._values, this._promise);
    if (values instanceof Promise) {
        values = values._target();
        var bitField = values._bitField;
        
        this._values = values;

        if (((bitField & 50397184) === 0)) {
            this._promise._setAsyncGuaranteed();
            return values._then(
                init,
                this._reject,
                undefined,
                this,
                resolveValueIfEmpty
           );
        } else if (((bitField & 33554432) !== 0)) {
            values = values._value();
        } else if (((bitField & 16777216) !== 0)) {
            return this._reject(values._reason());
        } else {
            return this._cancel();
        }
    }
    values = util$$1.asArray(values);
    if (values === null) {
        var err = apiRejection(
            "expecting an array or an iterable object but got " + util$$1.classString(values)).reason();
        this._promise._rejectCallback(err, false);
        return;
    }

    if (values.length === 0) {
        if (resolveValueIfEmpty === -5) {
            this._resolveEmptyArray();
        }
        else {
            this._resolve(toResolutionValue(resolveValueIfEmpty));
        }
        return;
    }
    this._iterate(values);
};

PromiseArray.prototype._iterate = function(values) {
    var len = this.getActualLength(values.length);
    this._length = len;
    this._values = this.shouldCopyValues() ? new Array(len) : this._values;
    var result = this._promise;
    var isResolved = false;
    var bitField = null;
    for (var i = 0; i < len; ++i) {
        var maybePromise = tryConvertToPromise(values[i], result);

        if (maybePromise instanceof Promise) {
            maybePromise = maybePromise._target();
            bitField = maybePromise._bitField;
        } else {
            bitField = null;
        }

        if (isResolved) {
            if (bitField !== null) {
                maybePromise.suppressUnhandledRejections();
            }
        } else if (bitField !== null) {
            if (((bitField & 50397184) === 0)) {
                maybePromise._proxy(this, i);
                this._values[i] = maybePromise;
            } else if (((bitField & 33554432) !== 0)) {
                isResolved = this._promiseFulfilled(maybePromise._value(), i);
            } else if (((bitField & 16777216) !== 0)) {
                isResolved = this._promiseRejected(maybePromise._reason(), i);
            } else {
                isResolved = this._promiseCancelled(i);
            }
        } else {
            isResolved = this._promiseFulfilled(maybePromise, i);
        }
    }
    if (!isResolved) result._setAsyncGuaranteed();
};

PromiseArray.prototype._isResolved = function () {
    return this._values === null;
};

PromiseArray.prototype._resolve = function (value) {
    this._values = null;
    this._promise._fulfill(value);
};

PromiseArray.prototype._cancel = function() {
    if (this._isResolved() || !this._promise._isCancellable()) return;
    this._values = null;
    this._promise._cancel();
};

PromiseArray.prototype._reject = function (reason) {
    this._values = null;
    this._promise._rejectCallback(reason, false);
};

PromiseArray.prototype._promiseFulfilled = function (value, index) {
    this._values[index] = value;
    var totalResolved = ++this._totalResolved;
    if (totalResolved >= this._length) {
        this._resolve(this._values);
        return true;
    }
    return false;
};

PromiseArray.prototype._promiseCancelled = function() {
    this._cancel();
    return true;
};

PromiseArray.prototype._promiseRejected = function (reason) {
    this._totalResolved++;
    this._reject(reason);
    return true;
};

PromiseArray.prototype._resultCancelled = function() {
    if (this._isResolved()) return;
    var values = this._values;
    this._cancel();
    if (values instanceof Promise) {
        values.cancel();
    } else {
        for (var i = 0; i < values.length; ++i) {
            if (values[i] instanceof Promise) {
                values[i].cancel();
            }
        }
    }
};

PromiseArray.prototype.shouldCopyValues = function () {
    return true;
};

PromiseArray.prototype.getActualLength = function (len) {
    return len;
};

return PromiseArray;
};

var context = function(Promise) {
var longStackTraces = false;
var contextStack = [];

Promise.prototype._promiseCreated = function() {};
Promise.prototype._pushContext = function() {};
Promise.prototype._popContext = function() {return null;};
Promise._peekContext = Promise.prototype._peekContext = function() {};

function Context() {
    this._trace = new Context.CapturedTrace(peekContext());
}
Context.prototype._pushContext = function () {
    if (this._trace !== undefined) {
        this._trace._promiseCreated = null;
        contextStack.push(this._trace);
    }
};

Context.prototype._popContext = function () {
    if (this._trace !== undefined) {
        var trace = contextStack.pop();
        var ret = trace._promiseCreated;
        trace._promiseCreated = null;
        return ret;
    }
    return null;
};

function createContext() {
    if (longStackTraces) return new Context();
}

function peekContext() {
    var lastIndex = contextStack.length - 1;
    if (lastIndex >= 0) {
        return contextStack[lastIndex];
    }
    return undefined;
}
Context.CapturedTrace = null;
Context.create = createContext;
Context.deactivateLongStackTraces = function() {};
Context.activateLongStackTraces = function() {
    var Promise_pushContext = Promise.prototype._pushContext;
    var Promise_popContext = Promise.prototype._popContext;
    var Promise_PeekContext = Promise._peekContext;
    var Promise_peekContext = Promise.prototype._peekContext;
    var Promise_promiseCreated = Promise.prototype._promiseCreated;
    Context.deactivateLongStackTraces = function() {
        Promise.prototype._pushContext = Promise_pushContext;
        Promise.prototype._popContext = Promise_popContext;
        Promise._peekContext = Promise_PeekContext;
        Promise.prototype._peekContext = Promise_peekContext;
        Promise.prototype._promiseCreated = Promise_promiseCreated;
        longStackTraces = false;
    };
    longStackTraces = true;
    Promise.prototype._pushContext = Context.prototype._pushContext;
    Promise.prototype._popContext = Context.prototype._popContext;
    Promise._peekContext = Promise.prototype._peekContext = peekContext;
    Promise.prototype._promiseCreated = function() {
        var ctx = this._peekContext();
        if (ctx && ctx._promiseCreated == null) ctx._promiseCreated = this;
    };
};
return Context;
};

var debuggability = function(Promise, Context) {
var getDomain = Promise._getDomain;
var async = Promise._async;
var Warning = errors$2.Warning;
var util$$1 = util$6;
var canAttachTrace = util$$1.canAttachTrace;
var unhandledRejectionHandled;
var possiblyUnhandledRejection;
var bluebirdFramePattern =
    /[\\\/]bluebird[\\\/]js[\\\/](release|debug|instrumented)/;
var nodeFramePattern = /\((?:timers\.js):\d+:\d+\)/;
var parseLinePattern = /[\/<\(](.+?):(\d+):(\d+)\)?\s*$/;
var stackFramePattern = null;
var formatStack = null;
var indentStackFrames = false;
var printWarning;
var debugging = !!(util$$1.env("BLUEBIRD_DEBUG") != 0 &&
                        (false ||
                         util$$1.env("BLUEBIRD_DEBUG") ||
                         util$$1.env("NODE_ENV") === "development"));

var warnings = !!(util$$1.env("BLUEBIRD_WARNINGS") != 0 &&
    (debugging || util$$1.env("BLUEBIRD_WARNINGS")));

var longStackTraces = !!(util$$1.env("BLUEBIRD_LONG_STACK_TRACES") != 0 &&
    (debugging || util$$1.env("BLUEBIRD_LONG_STACK_TRACES")));

var wForgottenReturn = util$$1.env("BLUEBIRD_W_FORGOTTEN_RETURN") != 0 &&
    (warnings || !!util$$1.env("BLUEBIRD_W_FORGOTTEN_RETURN"));

Promise.prototype.suppressUnhandledRejections = function() {
    var target = this._target();
    target._bitField = ((target._bitField & (~1048576)) |
                      524288);
};

Promise.prototype._ensurePossibleRejectionHandled = function () {
    if ((this._bitField & 524288) !== 0) return;
    this._setRejectionIsUnhandled();
    async.invokeLater(this._notifyUnhandledRejection, this, undefined);
};

Promise.prototype._notifyUnhandledRejectionIsHandled = function () {
    fireRejectionEvent("rejectionHandled",
                                  unhandledRejectionHandled, undefined, this);
};

Promise.prototype._setReturnedNonUndefined = function() {
    this._bitField = this._bitField | 268435456;
};

Promise.prototype._returnedNonUndefined = function() {
    return (this._bitField & 268435456) !== 0;
};

Promise.prototype._notifyUnhandledRejection = function () {
    if (this._isRejectionUnhandled()) {
        var reason = this._settledValue();
        this._setUnhandledRejectionIsNotified();
        fireRejectionEvent("unhandledRejection",
                                      possiblyUnhandledRejection, reason, this);
    }
};

Promise.prototype._setUnhandledRejectionIsNotified = function () {
    this._bitField = this._bitField | 262144;
};

Promise.prototype._unsetUnhandledRejectionIsNotified = function () {
    this._bitField = this._bitField & (~262144);
};

Promise.prototype._isUnhandledRejectionNotified = function () {
    return (this._bitField & 262144) > 0;
};

Promise.prototype._setRejectionIsUnhandled = function () {
    this._bitField = this._bitField | 1048576;
};

Promise.prototype._unsetRejectionIsUnhandled = function () {
    this._bitField = this._bitField & (~1048576);
    if (this._isUnhandledRejectionNotified()) {
        this._unsetUnhandledRejectionIsNotified();
        this._notifyUnhandledRejectionIsHandled();
    }
};

Promise.prototype._isRejectionUnhandled = function () {
    return (this._bitField & 1048576) > 0;
};

Promise.prototype._warn = function(message, shouldUseOwnTrace, promise) {
    return warn(message, shouldUseOwnTrace, promise || this);
};

Promise.onPossiblyUnhandledRejection = function (fn) {
    var domain = getDomain();
    possiblyUnhandledRejection =
        typeof fn === "function" ? (domain === null ?
                                            fn : util$$1.domainBind(domain, fn))
                                 : undefined;
};

Promise.onUnhandledRejectionHandled = function (fn) {
    var domain = getDomain();
    unhandledRejectionHandled =
        typeof fn === "function" ? (domain === null ?
                                            fn : util$$1.domainBind(domain, fn))
                                 : undefined;
};

var disableLongStackTraces = function() {};
Promise.longStackTraces = function () {
    if (async.haveItemsQueued() && !config.longStackTraces) {
        throw new Error("cannot enable long stack traces after promises have been created\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
    if (!config.longStackTraces && longStackTracesIsSupported()) {
        var Promise_captureStackTrace = Promise.prototype._captureStackTrace;
        var Promise_attachExtraTrace = Promise.prototype._attachExtraTrace;
        config.longStackTraces = true;
        disableLongStackTraces = function() {
            if (async.haveItemsQueued() && !config.longStackTraces) {
                throw new Error("cannot enable long stack traces after promises have been created\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
            }
            Promise.prototype._captureStackTrace = Promise_captureStackTrace;
            Promise.prototype._attachExtraTrace = Promise_attachExtraTrace;
            Context.deactivateLongStackTraces();
            async.enableTrampoline();
            config.longStackTraces = false;
        };
        Promise.prototype._captureStackTrace = longStackTracesCaptureStackTrace;
        Promise.prototype._attachExtraTrace = longStackTracesAttachExtraTrace;
        Context.activateLongStackTraces();
        async.disableTrampolineIfNecessary();
    }
};

Promise.hasLongStackTraces = function () {
    return config.longStackTraces && longStackTracesIsSupported();
};

var fireDomEvent = (function() {
    try {
        if (typeof CustomEvent === "function") {
            var event = new CustomEvent("CustomEvent");
            util$$1.global.dispatchEvent(event);
            return function(name, event) {
                var domEvent = new CustomEvent(name.toLowerCase(), {
                    detail: event,
                    cancelable: true
                });
                return !util$$1.global.dispatchEvent(domEvent);
            };
        } else if (typeof Event === "function") {
            var event = new Event("CustomEvent");
            util$$1.global.dispatchEvent(event);
            return function(name, event) {
                var domEvent = new Event(name.toLowerCase(), {
                    cancelable: true
                });
                domEvent.detail = event;
                return !util$$1.global.dispatchEvent(domEvent);
            };
        } else {
            var event = document.createEvent("CustomEvent");
            event.initCustomEvent("testingtheevent", false, true, {});
            util$$1.global.dispatchEvent(event);
            return function(name, event) {
                var domEvent = document.createEvent("CustomEvent");
                domEvent.initCustomEvent(name.toLowerCase(), false, true,
                    event);
                return !util$$1.global.dispatchEvent(domEvent);
            };
        }
    } catch (e) {}
    return function() {
        return false;
    };
})();

var fireGlobalEvent = (function() {
    if (util$$1.isNode) {
        return function() {
            return process.emit.apply(process, arguments);
        };
    } else {
        if (!util$$1.global) {
            return function() {
                return false;
            };
        }
        return function(name) {
            var methodName = "on" + name.toLowerCase();
            var method = util$$1.global[methodName];
            if (!method) return false;
            method.apply(util$$1.global, [].slice.call(arguments, 1));
            return true;
        };
    }
})();

function generatePromiseLifecycleEventObject(name, promise) {
    return {promise: promise};
}

var eventToObjectGenerator = {
    promiseCreated: generatePromiseLifecycleEventObject,
    promiseFulfilled: generatePromiseLifecycleEventObject,
    promiseRejected: generatePromiseLifecycleEventObject,
    promiseResolved: generatePromiseLifecycleEventObject,
    promiseCancelled: generatePromiseLifecycleEventObject,
    promiseChained: function(name, promise, child) {
        return {promise: promise, child: child};
    },
    warning: function(name, warning) {
        return {warning: warning};
    },
    unhandledRejection: function (name, reason, promise) {
        return {reason: reason, promise: promise};
    },
    rejectionHandled: generatePromiseLifecycleEventObject
};

var activeFireEvent = function (name) {
    var globalEventFired = false;
    try {
        globalEventFired = fireGlobalEvent.apply(null, arguments);
    } catch (e) {
        async.throwLater(e);
        globalEventFired = true;
    }

    var domEventFired = false;
    try {
        domEventFired = fireDomEvent(name,
                    eventToObjectGenerator[name].apply(null, arguments));
    } catch (e) {
        async.throwLater(e);
        domEventFired = true;
    }

    return domEventFired || globalEventFired;
};

Promise.config = function(opts) {
    opts = Object(opts);
    if ("longStackTraces" in opts) {
        if (opts.longStackTraces) {
            Promise.longStackTraces();
        } else if (!opts.longStackTraces && Promise.hasLongStackTraces()) {
            disableLongStackTraces();
        }
    }
    if ("warnings" in opts) {
        var warningsOption = opts.warnings;
        config.warnings = !!warningsOption;
        wForgottenReturn = config.warnings;

        if (util$$1.isObject(warningsOption)) {
            if ("wForgottenReturn" in warningsOption) {
                wForgottenReturn = !!warningsOption.wForgottenReturn;
            }
        }
    }
    if ("cancellation" in opts && opts.cancellation && !config.cancellation) {
        if (async.haveItemsQueued()) {
            throw new Error(
                "cannot enable cancellation after promises are in use");
        }
        Promise.prototype._clearCancellationData =
            cancellationClearCancellationData;
        Promise.prototype._propagateFrom = cancellationPropagateFrom;
        Promise.prototype._onCancel = cancellationOnCancel;
        Promise.prototype._setOnCancel = cancellationSetOnCancel;
        Promise.prototype._attachCancellationCallback =
            cancellationAttachCancellationCallback;
        Promise.prototype._execute = cancellationExecute;
        propagateFromFunction = cancellationPropagateFrom;
        config.cancellation = true;
    }
    if ("monitoring" in opts) {
        if (opts.monitoring && !config.monitoring) {
            config.monitoring = true;
            Promise.prototype._fireEvent = activeFireEvent;
        } else if (!opts.monitoring && config.monitoring) {
            config.monitoring = false;
            Promise.prototype._fireEvent = defaultFireEvent;
        }
    }
    return Promise;
};

function defaultFireEvent() { return false; }

Promise.prototype._fireEvent = defaultFireEvent;
Promise.prototype._execute = function(executor, resolve, reject) {
    try {
        executor(resolve, reject);
    } catch (e) {
        return e;
    }
};
Promise.prototype._onCancel = function () {};
Promise.prototype._setOnCancel = function (handler) {  };
Promise.prototype._attachCancellationCallback = function(onCancel) {
    
};
Promise.prototype._captureStackTrace = function () {};
Promise.prototype._attachExtraTrace = function () {};
Promise.prototype._clearCancellationData = function() {};
Promise.prototype._propagateFrom = function (parent, flags) {
    
    
};

function cancellationExecute(executor, resolve, reject) {
    var promise = this;
    try {
        executor(resolve, reject, function(onCancel) {
            if (typeof onCancel !== "function") {
                throw new TypeError("onCancel must be a function, got: " +
                                    util$$1.toString(onCancel));
            }
            promise._attachCancellationCallback(onCancel);
        });
    } catch (e) {
        return e;
    }
}

function cancellationAttachCancellationCallback(onCancel) {
    if (!this._isCancellable()) return this;

    var previousOnCancel = this._onCancel();
    if (previousOnCancel !== undefined) {
        if (util$$1.isArray(previousOnCancel)) {
            previousOnCancel.push(onCancel);
        } else {
            this._setOnCancel([previousOnCancel, onCancel]);
        }
    } else {
        this._setOnCancel(onCancel);
    }
}

function cancellationOnCancel() {
    return this._onCancelField;
}

function cancellationSetOnCancel(onCancel) {
    this._onCancelField = onCancel;
}

function cancellationClearCancellationData() {
    this._cancellationParent = undefined;
    this._onCancelField = undefined;
}

function cancellationPropagateFrom(parent, flags) {
    if ((flags & 1) !== 0) {
        this._cancellationParent = parent;
        var branchesRemainingToCancel = parent._branchesRemainingToCancel;
        if (branchesRemainingToCancel === undefined) {
            branchesRemainingToCancel = 0;
        }
        parent._branchesRemainingToCancel = branchesRemainingToCancel + 1;
    }
    if ((flags & 2) !== 0 && parent._isBound()) {
        this._setBoundTo(parent._boundTo);
    }
}

function bindingPropagateFrom(parent, flags) {
    if ((flags & 2) !== 0 && parent._isBound()) {
        this._setBoundTo(parent._boundTo);
    }
}
var propagateFromFunction = bindingPropagateFrom;

function boundValueFunction() {
    var ret = this._boundTo;
    if (ret !== undefined) {
        if (ret instanceof Promise) {
            if (ret.isFulfilled()) {
                return ret.value();
            } else {
                return undefined;
            }
        }
    }
    return ret;
}

function longStackTracesCaptureStackTrace() {
    this._trace = new CapturedTrace(this._peekContext());
}

function longStackTracesAttachExtraTrace(error, ignoreSelf) {
    if (canAttachTrace(error)) {
        var trace = this._trace;
        if (trace !== undefined) {
            if (ignoreSelf) trace = trace._parent;
        }
        if (trace !== undefined) {
            trace.attachExtraTrace(error);
        } else if (!error.__stackCleaned__) {
            var parsed = parseStackAndMessage(error);
            util$$1.notEnumerableProp(error, "stack",
                parsed.message + "\n" + parsed.stack.join("\n"));
            util$$1.notEnumerableProp(error, "__stackCleaned__", true);
        }
    }
}

function checkForgottenReturns(returnValue, promiseCreated, name, promise,
                               parent) {
    if (returnValue === undefined && promiseCreated !== null &&
        wForgottenReturn) {
        if (parent !== undefined && parent._returnedNonUndefined()) return;
        if ((promise._bitField & 65535) === 0) return;

        if (name) name = name + " ";
        var handlerLine = "";
        var creatorLine = "";
        if (promiseCreated._trace) {
            var traceLines = promiseCreated._trace.stack.split("\n");
            var stack = cleanStack(traceLines);
            for (var i = stack.length - 1; i >= 0; --i) {
                var line = stack[i];
                if (!nodeFramePattern.test(line)) {
                    var lineMatches = line.match(parseLinePattern);
                    if (lineMatches) {
                        handlerLine  = "at " + lineMatches[1] +
                            ":" + lineMatches[2] + ":" + lineMatches[3] + " ";
                    }
                    break;
                }
            }

            if (stack.length > 0) {
                var firstUserLine = stack[0];
                for (var i = 0; i < traceLines.length; ++i) {

                    if (traceLines[i] === firstUserLine) {
                        if (i > 0) {
                            creatorLine = "\n" + traceLines[i - 1];
                        }
                        break;
                    }
                }

            }
        }
        var msg = "a promise was created in a " + name +
            "handler " + handlerLine + "but was not returned from it, " +
            "see http://goo.gl/rRqMUw" +
            creatorLine;
        promise._warn(msg, true, promiseCreated);
    }
}

function deprecated(name, replacement) {
    var message = name +
        " is deprecated and will be removed in a future version.";
    if (replacement) message += " Use " + replacement + " instead.";
    return warn(message);
}

function warn(message, shouldUseOwnTrace, promise) {
    if (!config.warnings) return;
    var warning = new Warning(message);
    var ctx;
    if (shouldUseOwnTrace) {
        promise._attachExtraTrace(warning);
    } else if (config.longStackTraces && (ctx = Promise._peekContext())) {
        ctx.attachExtraTrace(warning);
    } else {
        var parsed = parseStackAndMessage(warning);
        warning.stack = parsed.message + "\n" + parsed.stack.join("\n");
    }

    if (!activeFireEvent("warning", warning)) {
        formatAndLogError(warning, "", true);
    }
}

function reconstructStack(message, stacks) {
    for (var i = 0; i < stacks.length - 1; ++i) {
        stacks[i].push("From previous event:");
        stacks[i] = stacks[i].join("\n");
    }
    if (i < stacks.length) {
        stacks[i] = stacks[i].join("\n");
    }
    return message + "\n" + stacks.join("\n");
}

function removeDuplicateOrEmptyJumps(stacks) {
    for (var i = 0; i < stacks.length; ++i) {
        if (stacks[i].length === 0 ||
            ((i + 1 < stacks.length) && stacks[i][0] === stacks[i+1][0])) {
            stacks.splice(i, 1);
            i--;
        }
    }
}

function removeCommonRoots(stacks) {
    var current = stacks[0];
    for (var i = 1; i < stacks.length; ++i) {
        var prev = stacks[i];
        var currentLastIndex = current.length - 1;
        var currentLastLine = current[currentLastIndex];
        var commonRootMeetPoint = -1;

        for (var j = prev.length - 1; j >= 0; --j) {
            if (prev[j] === currentLastLine) {
                commonRootMeetPoint = j;
                break;
            }
        }

        for (var j = commonRootMeetPoint; j >= 0; --j) {
            var line = prev[j];
            if (current[currentLastIndex] === line) {
                current.pop();
                currentLastIndex--;
            } else {
                break;
            }
        }
        current = prev;
    }
}

function cleanStack(stack) {
    var ret = [];
    for (var i = 0; i < stack.length; ++i) {
        var line = stack[i];
        var isTraceLine = "    (No stack trace)" === line ||
            stackFramePattern.test(line);
        var isInternalFrame = isTraceLine && shouldIgnore(line);
        if (isTraceLine && !isInternalFrame) {
            if (indentStackFrames && line.charAt(0) !== " ") {
                line = "    " + line;
            }
            ret.push(line);
        }
    }
    return ret;
}

function stackFramesAsArray(error) {
    var stack = error.stack.replace(/\s+$/g, "").split("\n");
    for (var i = 0; i < stack.length; ++i) {
        var line = stack[i];
        if ("    (No stack trace)" === line || stackFramePattern.test(line)) {
            break;
        }
    }
    if (i > 0 && error.name != "SyntaxError") {
        stack = stack.slice(i);
    }
    return stack;
}

function parseStackAndMessage(error) {
    var stack = error.stack;
    var message = error.toString();
    stack = typeof stack === "string" && stack.length > 0
                ? stackFramesAsArray(error) : ["    (No stack trace)"];
    return {
        message: message,
        stack: error.name == "SyntaxError" ? stack : cleanStack(stack)
    };
}

function formatAndLogError(error, title, isSoft) {
    if (typeof console !== "undefined") {
        var message;
        if (util$$1.isObject(error)) {
            var stack = error.stack;
            message = title + formatStack(stack, error);
        } else {
            message = title + String(error);
        }
        if (typeof printWarning === "function") {
            printWarning(message, isSoft);
        } else if (typeof console.log === "function" ||
            typeof console.log === "object") {
            console.log(message);
        }
    }
}

function fireRejectionEvent(name, localHandler, reason, promise) {
    var localEventFired = false;
    try {
        if (typeof localHandler === "function") {
            localEventFired = true;
            if (name === "rejectionHandled") {
                localHandler(promise);
            } else {
                localHandler(reason, promise);
            }
        }
    } catch (e) {
        async.throwLater(e);
    }

    if (name === "unhandledRejection") {
        if (!activeFireEvent(name, reason, promise) && !localEventFired) {
            formatAndLogError(reason, "Unhandled rejection ");
        }
    } else {
        activeFireEvent(name, promise);
    }
}

function formatNonError(obj) {
    var str;
    if (typeof obj === "function") {
        str = "[function " +
            (obj.name || "anonymous") +
            "]";
    } else {
        str = obj && typeof obj.toString === "function"
            ? obj.toString() : util$$1.toString(obj);
        var ruselessToString = /\[object [a-zA-Z0-9$_]+\]/;
        if (ruselessToString.test(str)) {
            try {
                var newStr = JSON.stringify(obj);
                str = newStr;
            }
            catch(e) {

            }
        }
        if (str.length === 0) {
            str = "(empty array)";
        }
    }
    return ("(<" + snip(str) + ">, no stack trace)");
}

function snip(str) {
    var maxChars = 41;
    if (str.length < maxChars) {
        return str;
    }
    return str.substr(0, maxChars - 3) + "...";
}

function longStackTracesIsSupported() {
    return typeof captureStackTrace === "function";
}

var shouldIgnore = function() { return false; };
var parseLineInfoRegex = /[\/<\(]([^:\/]+):(\d+):(?:\d+)\)?\s*$/;
function parseLineInfo(line) {
    var matches = line.match(parseLineInfoRegex);
    if (matches) {
        return {
            fileName: matches[1],
            line: parseInt(matches[2], 10)
        };
    }
}

function setBounds(firstLineError, lastLineError) {
    if (!longStackTracesIsSupported()) return;
    var firstStackLines = firstLineError.stack.split("\n");
    var lastStackLines = lastLineError.stack.split("\n");
    var firstIndex = -1;
    var lastIndex = -1;
    var firstFileName;
    var lastFileName;
    for (var i = 0; i < firstStackLines.length; ++i) {
        var result = parseLineInfo(firstStackLines[i]);
        if (result) {
            firstFileName = result.fileName;
            firstIndex = result.line;
            break;
        }
    }
    for (var i = 0; i < lastStackLines.length; ++i) {
        var result = parseLineInfo(lastStackLines[i]);
        if (result) {
            lastFileName = result.fileName;
            lastIndex = result.line;
            break;
        }
    }
    if (firstIndex < 0 || lastIndex < 0 || !firstFileName || !lastFileName ||
        firstFileName !== lastFileName || firstIndex >= lastIndex) {
        return;
    }

    shouldIgnore = function(line) {
        if (bluebirdFramePattern.test(line)) return true;
        var info = parseLineInfo(line);
        if (info) {
            if (info.fileName === firstFileName &&
                (firstIndex <= info.line && info.line <= lastIndex)) {
                return true;
            }
        }
        return false;
    };
}

function CapturedTrace(parent) {
    this._parent = parent;
    this._promisesCreated = 0;
    var length = this._length = 1 + (parent === undefined ? 0 : parent._length);
    captureStackTrace(this, CapturedTrace);
    if (length > 32) this.uncycle();
}
util$$1.inherits(CapturedTrace, Error);
Context.CapturedTrace = CapturedTrace;

CapturedTrace.prototype.uncycle = function() {
    var length = this._length;
    if (length < 2) return;
    var nodes = [];
    var stackToIndex = {};

    for (var i = 0, node = this; node !== undefined; ++i) {
        nodes.push(node);
        node = node._parent;
    }
    length = this._length = i;
    for (var i = length - 1; i >= 0; --i) {
        var stack = nodes[i].stack;
        if (stackToIndex[stack] === undefined) {
            stackToIndex[stack] = i;
        }
    }
    for (var i = 0; i < length; ++i) {
        var currentStack = nodes[i].stack;
        var index = stackToIndex[currentStack];
        if (index !== undefined && index !== i) {
            if (index > 0) {
                nodes[index - 1]._parent = undefined;
                nodes[index - 1]._length = 1;
            }
            nodes[i]._parent = undefined;
            nodes[i]._length = 1;
            var cycleEdgeNode = i > 0 ? nodes[i - 1] : this;

            if (index < length - 1) {
                cycleEdgeNode._parent = nodes[index + 1];
                cycleEdgeNode._parent.uncycle();
                cycleEdgeNode._length =
                    cycleEdgeNode._parent._length + 1;
            } else {
                cycleEdgeNode._parent = undefined;
                cycleEdgeNode._length = 1;
            }
            var currentChildLength = cycleEdgeNode._length + 1;
            for (var j = i - 2; j >= 0; --j) {
                nodes[j]._length = currentChildLength;
                currentChildLength++;
            }
            return;
        }
    }
};

CapturedTrace.prototype.attachExtraTrace = function(error) {
    if (error.__stackCleaned__) return;
    this.uncycle();
    var parsed = parseStackAndMessage(error);
    var message = parsed.message;
    var stacks = [parsed.stack];

    var trace = this;
    while (trace !== undefined) {
        stacks.push(cleanStack(trace.stack.split("\n")));
        trace = trace._parent;
    }
    removeCommonRoots(stacks);
    removeDuplicateOrEmptyJumps(stacks);
    util$$1.notEnumerableProp(error, "stack", reconstructStack(message, stacks));
    util$$1.notEnumerableProp(error, "__stackCleaned__", true);
};

var captureStackTrace = (function stackDetection() {
    var v8stackFramePattern = /^\s*at\s*/;
    var v8stackFormatter = function(stack, error) {
        if (typeof stack === "string") return stack;

        if (error.name !== undefined &&
            error.message !== undefined) {
            return error.toString();
        }
        return formatNonError(error);
    };

    if (typeof Error.stackTraceLimit === "number" &&
        typeof Error.captureStackTrace === "function") {
        Error.stackTraceLimit += 6;
        stackFramePattern = v8stackFramePattern;
        formatStack = v8stackFormatter;
        var captureStackTrace = Error.captureStackTrace;

        shouldIgnore = function(line) {
            return bluebirdFramePattern.test(line);
        };
        return function(receiver, ignoreUntil) {
            Error.stackTraceLimit += 6;
            captureStackTrace(receiver, ignoreUntil);
            Error.stackTraceLimit -= 6;
        };
    }
    var err = new Error();

    if (typeof err.stack === "string" &&
        err.stack.split("\n")[0].indexOf("stackDetection@") >= 0) {
        stackFramePattern = /@/;
        formatStack = v8stackFormatter;
        indentStackFrames = true;
        return function captureStackTrace(o) {
            o.stack = new Error().stack;
        };
    }

    var hasStackAfterThrow;
    try { throw new Error(); }
    catch(e) {
        hasStackAfterThrow = ("stack" in e);
    }
    if (!("stack" in err) && hasStackAfterThrow &&
        typeof Error.stackTraceLimit === "number") {
        stackFramePattern = v8stackFramePattern;
        formatStack = v8stackFormatter;
        return function captureStackTrace(o) {
            Error.stackTraceLimit += 6;
            try { throw new Error(); }
            catch(e) { o.stack = e.stack; }
            Error.stackTraceLimit -= 6;
        };
    }

    formatStack = function(stack, error) {
        if (typeof stack === "string") return stack;

        if ((typeof error === "object" ||
            typeof error === "function") &&
            error.name !== undefined &&
            error.message !== undefined) {
            return error.toString();
        }
        return formatNonError(error);
    };

    return null;

})([]);

if (typeof console !== "undefined" && typeof console.warn !== "undefined") {
    printWarning = function (message) {
        console.warn(message);
    };
    if (util$$1.isNode && process.stderr.isTTY) {
        printWarning = function(message, isSoft) {
            var color = isSoft ? "\u001b[33m" : "\u001b[31m";
            console.warn(color + message + "\u001b[0m\n");
        };
    } else if (!util$$1.isNode && typeof (new Error().stack) === "string") {
        printWarning = function(message, isSoft) {
            console.warn("%c" + message,
                        isSoft ? "color: darkorange" : "color: red");
        };
    }
}

var config = {
    warnings: warnings,
    longStackTraces: false,
    cancellation: false,
    monitoring: false
};

if (longStackTraces) Promise.longStackTraces();

return {
    longStackTraces: function() {
        return config.longStackTraces;
    },
    warnings: function() {
        return config.warnings;
    },
    cancellation: function() {
        return config.cancellation;
    },
    monitoring: function() {
        return config.monitoring;
    },
    propagateFromFunction: function() {
        return propagateFromFunction;
    },
    boundValueFunction: function() {
        return boundValueFunction;
    },
    checkForgottenReturns: checkForgottenReturns,
    setBounds: setBounds,
    warn: warn,
    deprecated: deprecated,
    CapturedTrace: CapturedTrace,
    fireDomEvent: fireDomEvent,
    fireGlobalEvent: fireGlobalEvent
};
};

var catch_filter = function(NEXT_FILTER) {
var util$$1 = util$6;
var getKeys = es5.keys;
var tryCatch = util$$1.tryCatch;
var errorObj = util$$1.errorObj;

function catchFilter(instances, cb, promise) {
    return function(e) {
        var boundTo = promise._boundValue();
        predicateLoop: for (var i = 0; i < instances.length; ++i) {
            var item = instances[i];

            if (item === Error ||
                (item != null && item.prototype instanceof Error)) {
                if (e instanceof item) {
                    return tryCatch(cb).call(boundTo, e);
                }
            } else if (typeof item === "function") {
                var matchesPredicate = tryCatch(item).call(boundTo, e);
                if (matchesPredicate === errorObj) {
                    return matchesPredicate;
                } else if (matchesPredicate) {
                    return tryCatch(cb).call(boundTo, e);
                }
            } else if (util$$1.isObject(e)) {
                var keys = getKeys(item);
                for (var j = 0; j < keys.length; ++j) {
                    var key = keys[j];
                    if (item[key] != e[key]) {
                        continue predicateLoop;
                    }
                }
                return tryCatch(cb).call(boundTo, e);
            }
        }
        return NEXT_FILTER;
    };
}

return catchFilter;
};

var _finally = function(Promise, tryConvertToPromise, NEXT_FILTER) {
var util$$1 = util$6;
var CancellationError = Promise.CancellationError;
var errorObj = util$$1.errorObj;
var catchFilter = catch_filter(NEXT_FILTER);

function PassThroughHandlerContext(promise, type, handler) {
    this.promise = promise;
    this.type = type;
    this.handler = handler;
    this.called = false;
    this.cancelPromise = null;
}

PassThroughHandlerContext.prototype.isFinallyHandler = function() {
    return this.type === 0;
};

function FinallyHandlerCancelReaction(finallyHandler) {
    this.finallyHandler = finallyHandler;
}

FinallyHandlerCancelReaction.prototype._resultCancelled = function() {
    checkCancel(this.finallyHandler);
};

function checkCancel(ctx, reason) {
    if (ctx.cancelPromise != null) {
        if (arguments.length > 1) {
            ctx.cancelPromise._reject(reason);
        } else {
            ctx.cancelPromise._cancel();
        }
        ctx.cancelPromise = null;
        return true;
    }
    return false;
}

function succeed() {
    return finallyHandler.call(this, this.promise._target()._settledValue());
}
function fail(reason) {
    if (checkCancel(this, reason)) return;
    errorObj.e = reason;
    return errorObj;
}
function finallyHandler(reasonOrValue) {
    var promise = this.promise;
    var handler = this.handler;

    if (!this.called) {
        this.called = true;
        var ret = this.isFinallyHandler()
            ? handler.call(promise._boundValue())
            : handler.call(promise._boundValue(), reasonOrValue);
        if (ret === NEXT_FILTER) {
            return ret;
        } else if (ret !== undefined) {
            promise._setReturnedNonUndefined();
            var maybePromise = tryConvertToPromise(ret, promise);
            if (maybePromise instanceof Promise) {
                if (this.cancelPromise != null) {
                    if (maybePromise._isCancelled()) {
                        var reason =
                            new CancellationError("late cancellation observer");
                        promise._attachExtraTrace(reason);
                        errorObj.e = reason;
                        return errorObj;
                    } else if (maybePromise.isPending()) {
                        maybePromise._attachCancellationCallback(
                            new FinallyHandlerCancelReaction(this));
                    }
                }
                return maybePromise._then(
                    succeed, fail, undefined, this, undefined);
            }
        }
    }

    if (promise.isRejected()) {
        checkCancel(this);
        errorObj.e = reasonOrValue;
        return errorObj;
    } else {
        checkCancel(this);
        return reasonOrValue;
    }
}

Promise.prototype._passThrough = function(handler, type, success, fail) {
    if (typeof handler !== "function") return this.then();
    return this._then(success,
                      fail,
                      undefined,
                      new PassThroughHandlerContext(this, type, handler),
                      undefined);
};

Promise.prototype.lastly =
Promise.prototype["finally"] = function (handler) {
    return this._passThrough(handler,
                             0,
                             finallyHandler,
                             finallyHandler);
};


Promise.prototype.tap = function (handler) {
    return this._passThrough(handler, 1, finallyHandler);
};

Promise.prototype.tapCatch = function (handlerOrPredicate) {
    var len = arguments.length;
    if(len === 1) {
        return this._passThrough(handlerOrPredicate,
                                 1,
                                 undefined,
                                 finallyHandler);
    } else {
         var catchInstances = new Array(len - 1),
            j = 0, i;
        for (i = 0; i < len - 1; ++i) {
            var item = arguments[i];
            if (util$$1.isObject(item)) {
                catchInstances[j++] = item;
            } else {
                return Promise.reject(new TypeError(
                    "tapCatch statement predicate: "
                    + "expecting an object but got " + util$$1.classString(item)
                ));
            }
        }
        catchInstances.length = j;
        var handler = arguments[i];
        return this._passThrough(catchFilter(catchInstances, handler, this),
                                 1,
                                 undefined,
                                 finallyHandler);
    }

};

return PassThroughHandlerContext;
};

var maybeWrapAsError$1 = util$6.maybeWrapAsError;

var OperationalError$1 = errors$2.OperationalError;


function isUntypedError(obj) {
    return obj instanceof Error &&
        es5.getPrototypeOf(obj) === Error.prototype;
}

var rErrorKey = /^(?:name|message|stack|cause)$/;
function wrapAsOperationalError(obj) {
    var ret;
    if (isUntypedError(obj)) {
        ret = new OperationalError$1(obj);
        ret.name = obj.name;
        ret.message = obj.message;
        ret.stack = obj.stack;
        var keys = es5.keys(obj);
        for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            if (!rErrorKey.test(key)) {
                ret[key] = obj[key];
            }
        }
        return ret;
    }
    util$6.markAsOriginatingFromRejection(obj);
    return obj;
}

function nodebackForPromise(promise, multiArgs) {
    return function(err, value) {
        if (promise === null) return;
        if (err) {
            var wrapped = wrapAsOperationalError(maybeWrapAsError$1(err));
            promise._attachExtraTrace(wrapped);
            promise._reject(wrapped);
        } else if (!multiArgs) {
            promise._fulfill(value);
        } else {
            var $_len = arguments.length;var args = new Array(Math.max($_len - 1, 0)); for(var $_i = 1; $_i < $_len; ++$_i) {args[$_i - 1] = arguments[$_i];}
            promise._fulfill(args);
        }
        promise = null;
    };
}

var nodeback = nodebackForPromise;

var method =
function(Promise, INTERNAL, tryConvertToPromise, apiRejection, debug) {
var util$$1 = util$6;
var tryCatch = util$$1.tryCatch;

Promise.method = function (fn) {
    if (typeof fn !== "function") {
        throw new Promise.TypeError("expecting a function but got " + util$$1.classString(fn));
    }
    return function () {
        var ret = new Promise(INTERNAL);
        ret._captureStackTrace();
        ret._pushContext();
        var value = tryCatch(fn).apply(this, arguments);
        var promiseCreated = ret._popContext();
        debug.checkForgottenReturns(
            value, promiseCreated, "Promise.method", ret);
        ret._resolveFromSyncValue(value);
        return ret;
    };
};

Promise.attempt = Promise["try"] = function (fn) {
    if (typeof fn !== "function") {
        return apiRejection("expecting a function but got " + util$$1.classString(fn));
    }
    var ret = new Promise(INTERNAL);
    ret._captureStackTrace();
    ret._pushContext();
    var value;
    if (arguments.length > 1) {
        debug.deprecated("calling Promise.try with more than 1 argument");
        var arg = arguments[1];
        var ctx = arguments[2];
        value = util$$1.isArray(arg) ? tryCatch(fn).apply(ctx, arg)
                                  : tryCatch(fn).call(ctx, arg);
    } else {
        value = tryCatch(fn)();
    }
    var promiseCreated = ret._popContext();
    debug.checkForgottenReturns(
        value, promiseCreated, "Promise.try", ret);
    ret._resolveFromSyncValue(value);
    return ret;
};

Promise.prototype._resolveFromSyncValue = function (value) {
    if (value === util$$1.errorObj) {
        this._rejectCallback(value.e, false);
    } else {
        this._resolveCallback(value, true);
    }
};
};

var bind = function(Promise, INTERNAL, tryConvertToPromise, debug) {
var calledBind = false;
var rejectThis = function(_, e) {
    this._reject(e);
};

var targetRejected = function(e, context) {
    context.promiseRejectionQueued = true;
    context.bindingPromise._then(rejectThis, rejectThis, null, this, e);
};

var bindingResolved = function(thisArg, context) {
    if (((this._bitField & 50397184) === 0)) {
        this._resolveCallback(context.target);
    }
};

var bindingRejected = function(e, context) {
    if (!context.promiseRejectionQueued) this._reject(e);
};

Promise.prototype.bind = function (thisArg) {
    if (!calledBind) {
        calledBind = true;
        Promise.prototype._propagateFrom = debug.propagateFromFunction();
        Promise.prototype._boundValue = debug.boundValueFunction();
    }
    var maybePromise = tryConvertToPromise(thisArg);
    var ret = new Promise(INTERNAL);
    ret._propagateFrom(this, 1);
    var target = this._target();
    ret._setBoundTo(maybePromise);
    if (maybePromise instanceof Promise) {
        var context = {
            promiseRejectionQueued: false,
            promise: ret,
            target: target,
            bindingPromise: maybePromise
        };
        target._then(INTERNAL, targetRejected, undefined, ret, context);
        maybePromise._then(
            bindingResolved, bindingRejected, undefined, ret, context);
        ret._setOnCancel(maybePromise);
    } else {
        ret._resolveCallback(target);
    }
    return ret;
};

Promise.prototype._setBoundTo = function (obj) {
    if (obj !== undefined) {
        this._bitField = this._bitField | 2097152;
        this._boundTo = obj;
    } else {
        this._bitField = this._bitField & (~2097152);
    }
};

Promise.prototype._isBound = function () {
    return (this._bitField & 2097152) === 2097152;
};

Promise.bind = function (thisArg, value) {
    return Promise.resolve(value).bind(thisArg);
};
};

var cancel = function(Promise, PromiseArray, apiRejection, debug) {
var util$$1 = util$6;
var tryCatch = util$$1.tryCatch;
var errorObj = util$$1.errorObj;
var async = Promise._async;

Promise.prototype["break"] = Promise.prototype.cancel = function() {
    if (!debug.cancellation()) return this._warn("cancellation is disabled");

    var promise = this;
    var child = promise;
    while (promise._isCancellable()) {
        if (!promise._cancelBy(child)) {
            if (child._isFollowing()) {
                child._followee().cancel();
            } else {
                child._cancelBranched();
            }
            break;
        }

        var parent = promise._cancellationParent;
        if (parent == null || !parent._isCancellable()) {
            if (promise._isFollowing()) {
                promise._followee().cancel();
            } else {
                promise._cancelBranched();
            }
            break;
        } else {
            if (promise._isFollowing()) promise._followee().cancel();
            promise._setWillBeCancelled();
            child = promise;
            promise = parent;
        }
    }
};

Promise.prototype._branchHasCancelled = function() {
    this._branchesRemainingToCancel--;
};

Promise.prototype._enoughBranchesHaveCancelled = function() {
    return this._branchesRemainingToCancel === undefined ||
           this._branchesRemainingToCancel <= 0;
};

Promise.prototype._cancelBy = function(canceller) {
    if (canceller === this) {
        this._branchesRemainingToCancel = 0;
        this._invokeOnCancel();
        return true;
    } else {
        this._branchHasCancelled();
        if (this._enoughBranchesHaveCancelled()) {
            this._invokeOnCancel();
            return true;
        }
    }
    return false;
};

Promise.prototype._cancelBranched = function() {
    if (this._enoughBranchesHaveCancelled()) {
        this._cancel();
    }
};

Promise.prototype._cancel = function() {
    if (!this._isCancellable()) return;
    this._setCancelled();
    async.invoke(this._cancelPromises, this, undefined);
};

Promise.prototype._cancelPromises = function() {
    if (this._length() > 0) this._settlePromises();
};

Promise.prototype._unsetOnCancel = function() {
    this._onCancelField = undefined;
};

Promise.prototype._isCancellable = function() {
    return this.isPending() && !this._isCancelled();
};

Promise.prototype.isCancellable = function() {
    return this.isPending() && !this.isCancelled();
};

Promise.prototype._doInvokeOnCancel = function(onCancelCallback, internalOnly) {
    if (util$$1.isArray(onCancelCallback)) {
        for (var i = 0; i < onCancelCallback.length; ++i) {
            this._doInvokeOnCancel(onCancelCallback[i], internalOnly);
        }
    } else if (onCancelCallback !== undefined) {
        if (typeof onCancelCallback === "function") {
            if (!internalOnly) {
                var e = tryCatch(onCancelCallback).call(this._boundValue());
                if (e === errorObj) {
                    this._attachExtraTrace(e.e);
                    async.throwLater(e.e);
                }
            }
        } else {
            onCancelCallback._resultCancelled(this);
        }
    }
};

Promise.prototype._invokeOnCancel = function() {
    var onCancelCallback = this._onCancel();
    this._unsetOnCancel();
    async.invoke(this._doInvokeOnCancel, this, onCancelCallback);
};

Promise.prototype._invokeInternalOnCancel = function() {
    if (this._isCancellable()) {
        this._doInvokeOnCancel(this._onCancel(), true);
        this._unsetOnCancel();
    }
};

Promise.prototype._resultCancelled = function() {
    this.cancel();
};

};

var direct_resolve = function(Promise) {
function returner() {
    return this.value;
}
function thrower() {
    throw this.reason;
}

Promise.prototype["return"] =
Promise.prototype.thenReturn = function (value) {
    if (value instanceof Promise) value.suppressUnhandledRejections();
    return this._then(
        returner, undefined, undefined, {value: value}, undefined);
};

Promise.prototype["throw"] =
Promise.prototype.thenThrow = function (reason) {
    return this._then(
        thrower, undefined, undefined, {reason: reason}, undefined);
};

Promise.prototype.catchThrow = function (reason) {
    if (arguments.length <= 1) {
        return this._then(
            undefined, thrower, undefined, {reason: reason}, undefined);
    } else {
        var _reason = arguments[1];
        var handler = function() {throw _reason;};
        return this.caught(reason, handler);
    }
};

Promise.prototype.catchReturn = function (value) {
    if (arguments.length <= 1) {
        if (value instanceof Promise) value.suppressUnhandledRejections();
        return this._then(
            undefined, returner, undefined, {value: value}, undefined);
    } else {
        var _value = arguments[1];
        if (_value instanceof Promise) _value.suppressUnhandledRejections();
        var handler = function() {return _value;};
        return this.caught(value, handler);
    }
};
};

var synchronous_inspection = function(Promise) {
function PromiseInspection(promise) {
    if (promise !== undefined) {
        promise = promise._target();
        this._bitField = promise._bitField;
        this._settledValueField = promise._isFateSealed()
            ? promise._settledValue() : undefined;
    }
    else {
        this._bitField = 0;
        this._settledValueField = undefined;
    }
}

PromiseInspection.prototype._settledValue = function() {
    return this._settledValueField;
};

var value = PromiseInspection.prototype.value = function () {
    if (!this.isFulfilled()) {
        throw new TypeError("cannot get fulfillment value of a non-fulfilled promise\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
    return this._settledValue();
};

var reason = PromiseInspection.prototype.error =
PromiseInspection.prototype.reason = function () {
    if (!this.isRejected()) {
        throw new TypeError("cannot get rejection reason of a non-rejected promise\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
    return this._settledValue();
};

var isFulfilled = PromiseInspection.prototype.isFulfilled = function() {
    return (this._bitField & 33554432) !== 0;
};

var isRejected = PromiseInspection.prototype.isRejected = function () {
    return (this._bitField & 16777216) !== 0;
};

var isPending = PromiseInspection.prototype.isPending = function () {
    return (this._bitField & 50397184) === 0;
};

var isResolved = PromiseInspection.prototype.isResolved = function () {
    return (this._bitField & 50331648) !== 0;
};

PromiseInspection.prototype.isCancelled = function() {
    return (this._bitField & 8454144) !== 0;
};

Promise.prototype.__isCancelled = function() {
    return (this._bitField & 65536) === 65536;
};

Promise.prototype._isCancelled = function() {
    return this._target().__isCancelled();
};

Promise.prototype.isCancelled = function() {
    return (this._target()._bitField & 8454144) !== 0;
};

Promise.prototype.isPending = function() {
    return isPending.call(this._target());
};

Promise.prototype.isRejected = function() {
    return isRejected.call(this._target());
};

Promise.prototype.isFulfilled = function() {
    return isFulfilled.call(this._target());
};

Promise.prototype.isResolved = function() {
    return isResolved.call(this._target());
};

Promise.prototype.value = function() {
    return value.call(this._target());
};

Promise.prototype.reason = function() {
    var target = this._target();
    target._unsetRejectionIsUnhandled();
    return reason.call(target);
};

Promise.prototype._value = function() {
    return this._settledValue();
};

Promise.prototype._reason = function() {
    this._unsetRejectionIsUnhandled();
    return this._settledValue();
};

Promise.PromiseInspection = PromiseInspection;
};

var join$9 =
function(Promise, PromiseArray, tryConvertToPromise, INTERNAL, async,
         getDomain) {
var util$$1 = util$6;
var canEvaluate = util$$1.canEvaluate;
var tryCatch = util$$1.tryCatch;
var errorObj = util$$1.errorObj;
var reject;

{
if (canEvaluate) {
    var thenCallback = function(i) {
        return new Function("value", "holder", "                             \n\
            'use strict';                                                    \n\
            holder.pIndex = value;                                           \n\
            holder.checkFulfillment(this);                                   \n\
            ".replace(/Index/g, i));
    };

    var promiseSetter = function(i) {
        return new Function("promise", "holder", "                           \n\
            'use strict';                                                    \n\
            holder.pIndex = promise;                                         \n\
            ".replace(/Index/g, i));
    };

    var generateHolderClass = function(total) {
        var props = new Array(total);
        for (var i = 0; i < props.length; ++i) {
            props[i] = "this.p" + (i+1);
        }
        var assignment = props.join(" = ") + " = null;";
        var cancellationCode= "var promise;\n" + props.map(function(prop) {
            return "                                                         \n\
                promise = " + prop + ";                                      \n\
                if (promise instanceof Promise) {                            \n\
                    promise.cancel();                                        \n\
                }                                                            \n\
            ";
        }).join("\n");
        var passedArguments = props.join(", ");
        var name = "Holder$" + total;


        var code = "return function(tryCatch, errorObj, Promise, async) {    \n\
            'use strict';                                                    \n\
            function [TheName](fn) {                                         \n\
                [TheProperties]                                              \n\
                this.fn = fn;                                                \n\
                this.asyncNeeded = true;                                     \n\
                this.now = 0;                                                \n\
            }                                                                \n\
                                                                             \n\
            [TheName].prototype._callFunction = function(promise) {          \n\
                promise._pushContext();                                      \n\
                var ret = tryCatch(this.fn)([ThePassedArguments]);           \n\
                promise._popContext();                                       \n\
                if (ret === errorObj) {                                      \n\
                    promise._rejectCallback(ret.e, false);                   \n\
                } else {                                                     \n\
                    promise._resolveCallback(ret);                           \n\
                }                                                            \n\
            };                                                               \n\
                                                                             \n\
            [TheName].prototype.checkFulfillment = function(promise) {       \n\
                var now = ++this.now;                                        \n\
                if (now === [TheTotal]) {                                    \n\
                    if (this.asyncNeeded) {                                  \n\
                        async.invoke(this._callFunction, this, promise);     \n\
                    } else {                                                 \n\
                        this._callFunction(promise);                         \n\
                    }                                                        \n\
                                                                             \n\
                }                                                            \n\
            };                                                               \n\
                                                                             \n\
            [TheName].prototype._resultCancelled = function() {              \n\
                [CancellationCode]                                           \n\
            };                                                               \n\
                                                                             \n\
            return [TheName];                                                \n\
        }(tryCatch, errorObj, Promise, async);                               \n\
        ";

        code = code.replace(/\[TheName\]/g, name)
            .replace(/\[TheTotal\]/g, total)
            .replace(/\[ThePassedArguments\]/g, passedArguments)
            .replace(/\[TheProperties\]/g, assignment)
            .replace(/\[CancellationCode\]/g, cancellationCode);

        return new Function("tryCatch", "errorObj", "Promise", "async", code)
                           (tryCatch, errorObj, Promise, async);
    };

    var holderClasses = [];
    var thenCallbacks = [];
    var promiseSetters = [];

    for (var i = 0; i < 8; ++i) {
        holderClasses.push(generateHolderClass(i + 1));
        thenCallbacks.push(thenCallback(i + 1));
        promiseSetters.push(promiseSetter(i + 1));
    }

    reject = function (reason) {
        this._reject(reason);
    };
}}

Promise.join = function () {
    var last = arguments.length - 1;
    var fn;
    if (last > 0 && typeof arguments[last] === "function") {
        fn = arguments[last];
        {
            if (last <= 8 && canEvaluate) {
                var ret = new Promise(INTERNAL);
                ret._captureStackTrace();
                var HolderClass = holderClasses[last - 1];
                var holder = new HolderClass(fn);
                var callbacks = thenCallbacks;

                for (var i = 0; i < last; ++i) {
                    var maybePromise = tryConvertToPromise(arguments[i], ret);
                    if (maybePromise instanceof Promise) {
                        maybePromise = maybePromise._target();
                        var bitField = maybePromise._bitField;
                        
                        if (((bitField & 50397184) === 0)) {
                            maybePromise._then(callbacks[i], reject,
                                               undefined, ret, holder);
                            promiseSetters[i](maybePromise, holder);
                            holder.asyncNeeded = false;
                        } else if (((bitField & 33554432) !== 0)) {
                            callbacks[i].call(ret,
                                              maybePromise._value(), holder);
                        } else if (((bitField & 16777216) !== 0)) {
                            ret._reject(maybePromise._reason());
                        } else {
                            ret._cancel();
                        }
                    } else {
                        callbacks[i].call(ret, maybePromise, holder);
                    }
                }

                if (!ret._isFateSealed()) {
                    if (holder.asyncNeeded) {
                        var domain = getDomain();
                        if (domain !== null) {
                            holder.fn = util$$1.domainBind(domain, holder.fn);
                        }
                    }
                    ret._setAsyncGuaranteed();
                    ret._setOnCancel(holder);
                }
                return ret;
            }
        }
    }
    var $_len = arguments.length;var args = new Array($_len); for(var $_i = 0; $_i < $_len; ++$_i) {args[$_i] = arguments[$_i];}
    if (fn) args.pop();
    var ret = new PromiseArray(args).promise();
    return fn !== undefined ? ret.spread(fn) : ret;
};

};

var map = function(Promise,
                          PromiseArray,
                          apiRejection,
                          tryConvertToPromise,
                          INTERNAL,
                          debug) {
var getDomain = Promise._getDomain;
var util$$1 = util$6;
var tryCatch = util$$1.tryCatch;
var errorObj = util$$1.errorObj;
var async = Promise._async;

function MappingPromiseArray(promises, fn, limit, _filter) {
    this.constructor$(promises);
    this._promise._captureStackTrace();
    var domain = getDomain();
    this._callback = domain === null ? fn : util$$1.domainBind(domain, fn);
    this._preservedValues = _filter === INTERNAL
        ? new Array(this.length())
        : null;
    this._limit = limit;
    this._inFlight = 0;
    this._queue = [];
    async.invoke(this._asyncInit, this, undefined);
}
util$$1.inherits(MappingPromiseArray, PromiseArray);

MappingPromiseArray.prototype._asyncInit = function() {
    this._init$(undefined, -2);
};

MappingPromiseArray.prototype._init = function () {};

MappingPromiseArray.prototype._promiseFulfilled = function (value, index) {
    var values = this._values;
    var length = this.length();
    var preservedValues = this._preservedValues;
    var limit = this._limit;

    if (index < 0) {
        index = (index * -1) - 1;
        values[index] = value;
        if (limit >= 1) {
            this._inFlight--;
            this._drainQueue();
            if (this._isResolved()) return true;
        }
    } else {
        if (limit >= 1 && this._inFlight >= limit) {
            values[index] = value;
            this._queue.push(index);
            return false;
        }
        if (preservedValues !== null) preservedValues[index] = value;

        var promise = this._promise;
        var callback = this._callback;
        var receiver = promise._boundValue();
        promise._pushContext();
        var ret = tryCatch(callback).call(receiver, value, index, length);
        var promiseCreated = promise._popContext();
        debug.checkForgottenReturns(
            ret,
            promiseCreated,
            preservedValues !== null ? "Promise.filter" : "Promise.map",
            promise
        );
        if (ret === errorObj) {
            this._reject(ret.e);
            return true;
        }

        var maybePromise = tryConvertToPromise(ret, this._promise);
        if (maybePromise instanceof Promise) {
            maybePromise = maybePromise._target();
            var bitField = maybePromise._bitField;
            
            if (((bitField & 50397184) === 0)) {
                if (limit >= 1) this._inFlight++;
                values[index] = maybePromise;
                maybePromise._proxy(this, (index + 1) * -1);
                return false;
            } else if (((bitField & 33554432) !== 0)) {
                ret = maybePromise._value();
            } else if (((bitField & 16777216) !== 0)) {
                this._reject(maybePromise._reason());
                return true;
            } else {
                this._cancel();
                return true;
            }
        }
        values[index] = ret;
    }
    var totalResolved = ++this._totalResolved;
    if (totalResolved >= length) {
        if (preservedValues !== null) {
            this._filter(values, preservedValues);
        } else {
            this._resolve(values);
        }
        return true;
    }
    return false;
};

MappingPromiseArray.prototype._drainQueue = function () {
    var queue = this._queue;
    var limit = this._limit;
    var values = this._values;
    while (queue.length > 0 && this._inFlight < limit) {
        if (this._isResolved()) return;
        var index = queue.pop();
        this._promiseFulfilled(values[index], index);
    }
};

MappingPromiseArray.prototype._filter = function (booleans, values) {
    var len = values.length;
    var ret = new Array(len);
    var j = 0;
    for (var i = 0; i < len; ++i) {
        if (booleans[i]) ret[j++] = values[i];
    }
    ret.length = j;
    this._resolve(ret);
};

MappingPromiseArray.prototype.preservedValues = function () {
    return this._preservedValues;
};

function map(promises, fn, options, _filter) {
    if (typeof fn !== "function") {
        return apiRejection("expecting a function but got " + util$$1.classString(fn));
    }

    var limit = 0;
    if (options !== undefined) {
        if (typeof options === "object" && options !== null) {
            if (typeof options.concurrency !== "number") {
                return Promise.reject(
                    new TypeError("'concurrency' must be a number but it is " +
                                    util$$1.classString(options.concurrency)));
            }
            limit = options.concurrency;
        } else {
            return Promise.reject(new TypeError(
                            "options argument must be an object but it is " +
                             util$$1.classString(options)));
        }
    }
    limit = typeof limit === "number" &&
        isFinite(limit) && limit >= 1 ? limit : 0;
    return new MappingPromiseArray(promises, fn, limit, _filter).promise();
}

Promise.prototype.map = function (fn, options) {
    return map(this, fn, options, null);
};

Promise.map = function (promises, fn, options, _filter) {
    return map(promises, fn, options, _filter);
};


};

var cr = Object.create;
if (cr) {
    var callerCache = cr(null);
    var getterCache = cr(null);
    callerCache[" size"] = getterCache[" size"] = 0;
}

var call_get = function(Promise) {
var util$$1 = util$6;
var canEvaluate = util$$1.canEvaluate;
var isIdentifier = util$$1.isIdentifier;

var getMethodCaller;
var getGetter;
{
var makeMethodCaller = function (methodName) {
    return new Function("ensureMethod", "                                    \n\
        return function(obj) {                                               \n\
            'use strict'                                                     \n\
            var len = this.length;                                           \n\
            ensureMethod(obj, 'methodName');                                 \n\
            switch(len) {                                                    \n\
                case 1: return obj.methodName(this[0]);                      \n\
                case 2: return obj.methodName(this[0], this[1]);             \n\
                case 3: return obj.methodName(this[0], this[1], this[2]);    \n\
                case 0: return obj.methodName();                             \n\
                default:                                                     \n\
                    return obj.methodName.apply(obj, this);                  \n\
            }                                                                \n\
        };                                                                   \n\
        ".replace(/methodName/g, methodName))(ensureMethod);
};

var makeGetter = function (propertyName) {
    return new Function("obj", "                                             \n\
        'use strict';                                                        \n\
        return obj.propertyName;                                             \n\
        ".replace("propertyName", propertyName));
};

var getCompiled = function(name, compiler, cache) {
    var ret = cache[name];
    if (typeof ret !== "function") {
        if (!isIdentifier(name)) {
            return null;
        }
        ret = compiler(name);
        cache[name] = ret;
        cache[" size"]++;
        if (cache[" size"] > 512) {
            var keys = Object.keys(cache);
            for (var i = 0; i < 256; ++i) delete cache[keys[i]];
            cache[" size"] = keys.length - 256;
        }
    }
    return ret;
};

getMethodCaller = function(name) {
    return getCompiled(name, makeMethodCaller, callerCache);
};

getGetter = function(name) {
    return getCompiled(name, makeGetter, getterCache);
};
}

function ensureMethod(obj, methodName) {
    var fn;
    if (obj != null) fn = obj[methodName];
    if (typeof fn !== "function") {
        var message = "Object " + util$$1.classString(obj) + " has no method '" +
            util$$1.toString(methodName) + "'";
        throw new Promise.TypeError(message);
    }
    return fn;
}

function caller(obj) {
    var methodName = this.pop();
    var fn = ensureMethod(obj, methodName);
    return fn.apply(obj, this);
}
Promise.prototype.call = function (methodName) {
    var $_len = arguments.length;var args = new Array(Math.max($_len - 1, 0)); for(var $_i = 1; $_i < $_len; ++$_i) {args[$_i - 1] = arguments[$_i];}
    {
        if (canEvaluate) {
            var maybeCaller = getMethodCaller(methodName);
            if (maybeCaller !== null) {
                return this._then(
                    maybeCaller, undefined, undefined, args, undefined);
            }
        }
    }
    args.push(methodName);
    return this._then(caller, undefined, undefined, args, undefined);
};

function namedGetter(obj) {
    return obj[this];
}
function indexedGetter(obj) {
    var index = +this;
    if (index < 0) index = Math.max(0, index + obj.length);
    return obj[index];
}
Promise.prototype.get = function (propertyName) {
    var isIndex = (typeof propertyName === "number");
    var getter;
    if (!isIndex) {
        if (canEvaluate) {
            var maybeGetter = getGetter(propertyName);
            getter = maybeGetter !== null ? maybeGetter : namedGetter;
        } else {
            getter = namedGetter;
        }
    } else {
        getter = indexedGetter;
    }
    return this._then(getter, undefined, undefined, propertyName, undefined);
};
};

var using = function (Promise, apiRejection, tryConvertToPromise,
    createContext, INTERNAL, debug) {
    var util$$1 = util$6;
    var TypeError = errors$2.TypeError;
    var inherits = util$6.inherits;
    var errorObj = util$$1.errorObj;
    var tryCatch = util$$1.tryCatch;
    var NULL = {};

    function thrower(e) {
        setTimeout(function(){throw e;}, 0);
    }

    function castPreservingDisposable(thenable) {
        var maybePromise = tryConvertToPromise(thenable);
        if (maybePromise !== thenable &&
            typeof thenable._isDisposable === "function" &&
            typeof thenable._getDisposer === "function" &&
            thenable._isDisposable()) {
            maybePromise._setDisposable(thenable._getDisposer());
        }
        return maybePromise;
    }
    function dispose(resources, inspection) {
        var i = 0;
        var len = resources.length;
        var ret = new Promise(INTERNAL);
        function iterator() {
            if (i >= len) return ret._fulfill();
            var maybePromise = castPreservingDisposable(resources[i++]);
            if (maybePromise instanceof Promise &&
                maybePromise._isDisposable()) {
                try {
                    maybePromise = tryConvertToPromise(
                        maybePromise._getDisposer().tryDispose(inspection),
                        resources.promise);
                } catch (e) {
                    return thrower(e);
                }
                if (maybePromise instanceof Promise) {
                    return maybePromise._then(iterator, thrower,
                                              null, null, null);
                }
            }
            iterator();
        }
        iterator();
        return ret;
    }

    function Disposer(data, promise, context) {
        this._data = data;
        this._promise = promise;
        this._context = context;
    }

    Disposer.prototype.data = function () {
        return this._data;
    };

    Disposer.prototype.promise = function () {
        return this._promise;
    };

    Disposer.prototype.resource = function () {
        if (this.promise().isFulfilled()) {
            return this.promise().value();
        }
        return NULL;
    };

    Disposer.prototype.tryDispose = function(inspection) {
        var resource = this.resource();
        var context = this._context;
        if (context !== undefined) context._pushContext();
        var ret = resource !== NULL
            ? this.doDispose(resource, inspection) : null;
        if (context !== undefined) context._popContext();
        this._promise._unsetDisposable();
        this._data = null;
        return ret;
    };

    Disposer.isDisposer = function (d) {
        return (d != null &&
                typeof d.resource === "function" &&
                typeof d.tryDispose === "function");
    };

    function FunctionDisposer(fn, promise, context) {
        this.constructor$(fn, promise, context);
    }
    inherits(FunctionDisposer, Disposer);

    FunctionDisposer.prototype.doDispose = function (resource, inspection) {
        var fn = this.data();
        return fn.call(resource, resource, inspection);
    };

    function maybeUnwrapDisposer(value) {
        if (Disposer.isDisposer(value)) {
            this.resources[this.index]._setDisposable(value);
            return value.promise();
        }
        return value;
    }

    function ResourceList(length) {
        this.length = length;
        this.promise = null;
        this[length-1] = null;
    }

    ResourceList.prototype._resultCancelled = function() {
        var len = this.length;
        for (var i = 0; i < len; ++i) {
            var item = this[i];
            if (item instanceof Promise) {
                item.cancel();
            }
        }
    };

    Promise.using = function () {
        var len = arguments.length;
        if (len < 2) return apiRejection(
                        "you must pass at least 2 arguments to Promise.using");
        var fn = arguments[len - 1];
        if (typeof fn !== "function") {
            return apiRejection("expecting a function but got " + util$$1.classString(fn));
        }
        var input;
        var spreadArgs = true;
        if (len === 2 && Array.isArray(arguments[0])) {
            input = arguments[0];
            len = input.length;
            spreadArgs = false;
        } else {
            input = arguments;
            len--;
        }
        var resources = new ResourceList(len);
        for (var i = 0; i < len; ++i) {
            var resource = input[i];
            if (Disposer.isDisposer(resource)) {
                var disposer = resource;
                resource = resource.promise();
                resource._setDisposable(disposer);
            } else {
                var maybePromise = tryConvertToPromise(resource);
                if (maybePromise instanceof Promise) {
                    resource =
                        maybePromise._then(maybeUnwrapDisposer, null, null, {
                            resources: resources,
                            index: i
                    }, undefined);
                }
            }
            resources[i] = resource;
        }

        var reflectedResources = new Array(resources.length);
        for (var i = 0; i < reflectedResources.length; ++i) {
            reflectedResources[i] = Promise.resolve(resources[i]).reflect();
        }

        var resultPromise = Promise.all(reflectedResources)
            .then(function(inspections) {
                for (var i = 0; i < inspections.length; ++i) {
                    var inspection = inspections[i];
                    if (inspection.isRejected()) {
                        errorObj.e = inspection.error();
                        return errorObj;
                    } else if (!inspection.isFulfilled()) {
                        resultPromise.cancel();
                        return;
                    }
                    inspections[i] = inspection.value();
                }
                promise._pushContext();

                fn = tryCatch(fn);
                var ret = spreadArgs
                    ? fn.apply(undefined, inspections) : fn(inspections);
                var promiseCreated = promise._popContext();
                debug.checkForgottenReturns(
                    ret, promiseCreated, "Promise.using", promise);
                return ret;
            });

        var promise = resultPromise.lastly(function() {
            var inspection = new Promise.PromiseInspection(resultPromise);
            return dispose(resources, inspection);
        });
        resources.promise = promise;
        promise._setOnCancel(resources);
        return promise;
    };

    Promise.prototype._setDisposable = function (disposer) {
        this._bitField = this._bitField | 131072;
        this._disposer = disposer;
    };

    Promise.prototype._isDisposable = function () {
        return (this._bitField & 131072) > 0;
    };

    Promise.prototype._getDisposer = function () {
        return this._disposer;
    };

    Promise.prototype._unsetDisposable = function () {
        this._bitField = this._bitField & (~131072);
        this._disposer = undefined;
    };

    Promise.prototype.disposer = function (fn) {
        if (typeof fn === "function") {
            return new FunctionDisposer(fn, this, createContext());
        }
        throw new TypeError();
    };

};

var timers$1 = function(Promise, INTERNAL, debug) {
var util$$1 = util$6;
var TimeoutError = Promise.TimeoutError;

function HandleWrapper(handle)  {
    this.handle = handle;
}

HandleWrapper.prototype._resultCancelled = function() {
    clearTimeout(this.handle);
};

var afterValue = function(value) { return delay(+this).thenReturn(value); };
var delay = Promise.delay = function (ms, value) {
    var ret;
    var handle;
    if (value !== undefined) {
        ret = Promise.resolve(value)
                ._then(afterValue, null, null, ms, undefined);
        if (debug.cancellation() && value instanceof Promise) {
            ret._setOnCancel(value);
        }
    } else {
        ret = new Promise(INTERNAL);
        handle = setTimeout(function() { ret._fulfill(); }, +ms);
        if (debug.cancellation()) {
            ret._setOnCancel(new HandleWrapper(handle));
        }
        ret._captureStackTrace();
    }
    ret._setAsyncGuaranteed();
    return ret;
};

Promise.prototype.delay = function (ms) {
    return delay(ms, this);
};

var afterTimeout = function (promise, message, parent) {
    var err;
    if (typeof message !== "string") {
        if (message instanceof Error) {
            err = message;
        } else {
            err = new TimeoutError("operation timed out");
        }
    } else {
        err = new TimeoutError(message);
    }
    util$$1.markAsOriginatingFromRejection(err);
    promise._attachExtraTrace(err);
    promise._reject(err);

    if (parent != null) {
        parent.cancel();
    }
};

function successClear(value) {
    clearTimeout(this.handle);
    return value;
}

function failureClear(reason) {
    clearTimeout(this.handle);
    throw reason;
}

Promise.prototype.timeout = function (ms, message) {
    ms = +ms;
    var ret, parent;

    var handleWrapper = new HandleWrapper(setTimeout(function timeoutTimeout() {
        if (ret.isPending()) {
            afterTimeout(ret, message, parent);
        }
    }, ms));

    if (debug.cancellation()) {
        parent = this.then();
        ret = parent._then(successClear, failureClear,
                            undefined, handleWrapper, undefined);
        ret._setOnCancel(handleWrapper);
    } else {
        ret = this._then(successClear, failureClear,
                            undefined, handleWrapper, undefined);
    }

    return ret;
};

};

var generators = function(Promise,
                          apiRejection,
                          INTERNAL,
                          tryConvertToPromise,
                          Proxyable,
                          debug) {
var errors = errors$2;
var TypeError = errors.TypeError;
var util$$1 = util$6;
var errorObj = util$$1.errorObj;
var tryCatch = util$$1.tryCatch;
var yieldHandlers = [];

function promiseFromYieldHandler(value, yieldHandlers, traceParent) {
    for (var i = 0; i < yieldHandlers.length; ++i) {
        traceParent._pushContext();
        var result = tryCatch(yieldHandlers[i])(value);
        traceParent._popContext();
        if (result === errorObj) {
            traceParent._pushContext();
            var ret = Promise.reject(errorObj.e);
            traceParent._popContext();
            return ret;
        }
        var maybePromise = tryConvertToPromise(result, traceParent);
        if (maybePromise instanceof Promise) return maybePromise;
    }
    return null;
}

function PromiseSpawn(generatorFunction, receiver, yieldHandler, stack) {
    if (debug.cancellation()) {
        var internal = new Promise(INTERNAL);
        var _finallyPromise = this._finallyPromise = new Promise(INTERNAL);
        this._promise = internal.lastly(function() {
            return _finallyPromise;
        });
        internal._captureStackTrace();
        internal._setOnCancel(this);
    } else {
        var promise = this._promise = new Promise(INTERNAL);
        promise._captureStackTrace();
    }
    this._stack = stack;
    this._generatorFunction = generatorFunction;
    this._receiver = receiver;
    this._generator = undefined;
    this._yieldHandlers = typeof yieldHandler === "function"
        ? [yieldHandler].concat(yieldHandlers)
        : yieldHandlers;
    this._yieldedPromise = null;
    this._cancellationPhase = false;
}
util$$1.inherits(PromiseSpawn, Proxyable);

PromiseSpawn.prototype._isResolved = function() {
    return this._promise === null;
};

PromiseSpawn.prototype._cleanup = function() {
    this._promise = this._generator = null;
    if (debug.cancellation() && this._finallyPromise !== null) {
        this._finallyPromise._fulfill();
        this._finallyPromise = null;
    }
};

PromiseSpawn.prototype._promiseCancelled = function() {
    if (this._isResolved()) return;
    var implementsReturn = typeof this._generator["return"] !== "undefined";

    var result;
    if (!implementsReturn) {
        var reason = new Promise.CancellationError(
            "generator .return() sentinel");
        Promise.coroutine.returnSentinel = reason;
        this._promise._attachExtraTrace(reason);
        this._promise._pushContext();
        result = tryCatch(this._generator["throw"]).call(this._generator,
                                                         reason);
        this._promise._popContext();
    } else {
        this._promise._pushContext();
        result = tryCatch(this._generator["return"]).call(this._generator,
                                                          undefined);
        this._promise._popContext();
    }
    this._cancellationPhase = true;
    this._yieldedPromise = null;
    this._continue(result);
};

PromiseSpawn.prototype._promiseFulfilled = function(value) {
    this._yieldedPromise = null;
    this._promise._pushContext();
    var result = tryCatch(this._generator.next).call(this._generator, value);
    this._promise._popContext();
    this._continue(result);
};

PromiseSpawn.prototype._promiseRejected = function(reason) {
    this._yieldedPromise = null;
    this._promise._attachExtraTrace(reason);
    this._promise._pushContext();
    var result = tryCatch(this._generator["throw"])
        .call(this._generator, reason);
    this._promise._popContext();
    this._continue(result);
};

PromiseSpawn.prototype._resultCancelled = function() {
    if (this._yieldedPromise instanceof Promise) {
        var promise = this._yieldedPromise;
        this._yieldedPromise = null;
        promise.cancel();
    }
};

PromiseSpawn.prototype.promise = function () {
    return this._promise;
};

PromiseSpawn.prototype._run = function () {
    this._generator = this._generatorFunction.call(this._receiver);
    this._receiver =
        this._generatorFunction = undefined;
    this._promiseFulfilled(undefined);
};

PromiseSpawn.prototype._continue = function (result) {
    var promise = this._promise;
    if (result === errorObj) {
        this._cleanup();
        if (this._cancellationPhase) {
            return promise.cancel();
        } else {
            return promise._rejectCallback(result.e, false);
        }
    }

    var value = result.value;
    if (result.done === true) {
        this._cleanup();
        if (this._cancellationPhase) {
            return promise.cancel();
        } else {
            return promise._resolveCallback(value);
        }
    } else {
        var maybePromise = tryConvertToPromise(value, this._promise);
        if (!(maybePromise instanceof Promise)) {
            maybePromise =
                promiseFromYieldHandler(maybePromise,
                                        this._yieldHandlers,
                                        this._promise);
            if (maybePromise === null) {
                this._promiseRejected(
                    new TypeError(
                        "A value %s was yielded that could not be treated as a promise\u000a\u000a    See http://goo.gl/MqrFmX\u000a\u000a".replace("%s", String(value)) +
                        "From coroutine:\u000a" +
                        this._stack.split("\n").slice(1, -7).join("\n")
                    )
                );
                return;
            }
        }
        maybePromise = maybePromise._target();
        var bitField = maybePromise._bitField;
        
        if (((bitField & 50397184) === 0)) {
            this._yieldedPromise = maybePromise;
            maybePromise._proxy(this, null);
        } else if (((bitField & 33554432) !== 0)) {
            Promise._async.invoke(
                this._promiseFulfilled, this, maybePromise._value()
            );
        } else if (((bitField & 16777216) !== 0)) {
            Promise._async.invoke(
                this._promiseRejected, this, maybePromise._reason()
            );
        } else {
            this._promiseCancelled();
        }
    }
};

Promise.coroutine = function (generatorFunction, options) {
    if (typeof generatorFunction !== "function") {
        throw new TypeError("generatorFunction must be a function\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
    var yieldHandler = Object(options).yieldHandler;
    var PromiseSpawn$ = PromiseSpawn;
    var stack = new Error().stack;
    return function () {
        var generator = generatorFunction.apply(this, arguments);
        var spawn = new PromiseSpawn$(undefined, undefined, yieldHandler,
                                      stack);
        var ret = spawn.promise();
        spawn._generator = generator;
        spawn._promiseFulfilled(undefined);
        return ret;
    };
};

Promise.coroutine.addYieldHandler = function(fn) {
    if (typeof fn !== "function") {
        throw new TypeError("expecting a function but got " + util$$1.classString(fn));
    }
    yieldHandlers.push(fn);
};

Promise.spawn = function (generatorFunction) {
    debug.deprecated("Promise.spawn()", "Promise.coroutine()");
    if (typeof generatorFunction !== "function") {
        return apiRejection("generatorFunction must be a function\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
    var spawn = new PromiseSpawn(generatorFunction, this);
    var ret = spawn.promise();
    spawn._run(Promise.spawn);
    return ret;
};
};

var nodeify = function(Promise) {
var util$$1 = util$6;
var async = Promise._async;
var tryCatch = util$$1.tryCatch;
var errorObj = util$$1.errorObj;

function spreadAdapter(val, nodeback) {
    var promise = this;
    if (!util$$1.isArray(val)) return successAdapter.call(promise, val, nodeback);
    var ret =
        tryCatch(nodeback).apply(promise._boundValue(), [null].concat(val));
    if (ret === errorObj) {
        async.throwLater(ret.e);
    }
}

function successAdapter(val, nodeback) {
    var promise = this;
    var receiver = promise._boundValue();
    var ret = val === undefined
        ? tryCatch(nodeback).call(receiver, null)
        : tryCatch(nodeback).call(receiver, null, val);
    if (ret === errorObj) {
        async.throwLater(ret.e);
    }
}
function errorAdapter(reason, nodeback) {
    var promise = this;
    if (!reason) {
        var newReason = new Error(reason + "");
        newReason.cause = reason;
        reason = newReason;
    }
    var ret = tryCatch(nodeback).call(promise._boundValue(), reason);
    if (ret === errorObj) {
        async.throwLater(ret.e);
    }
}

Promise.prototype.asCallback = Promise.prototype.nodeify = function (nodeback,
                                                                     options) {
    if (typeof nodeback == "function") {
        var adapter = successAdapter;
        if (options !== undefined && Object(options).spread) {
            adapter = spreadAdapter;
        }
        this._then(
            adapter,
            errorAdapter,
            undefined,
            this,
            nodeback
        );
    }
    return this;
};
};

var promisify = function(Promise, INTERNAL) {
var THIS = {};
var util$$1 = util$6;
var nodebackForPromise = nodeback;
var withAppended = util$$1.withAppended;
var maybeWrapAsError = util$$1.maybeWrapAsError;
var canEvaluate = util$$1.canEvaluate;
var TypeError = errors$2.TypeError;
var defaultSuffix = "Async";
var defaultPromisified = {__isPromisified__: true};
var noCopyProps = [
    "arity",    "length",
    "name",
    "arguments",
    "caller",
    "callee",
    "prototype",
    "__isPromisified__"
];
var noCopyPropsPattern = new RegExp("^(?:" + noCopyProps.join("|") + ")$");

var defaultFilter = function(name) {
    return util$$1.isIdentifier(name) &&
        name.charAt(0) !== "_" &&
        name !== "constructor";
};

function propsFilter(key) {
    return !noCopyPropsPattern.test(key);
}

function isPromisified(fn) {
    try {
        return fn.__isPromisified__ === true;
    }
    catch (e) {
        return false;
    }
}

function hasPromisified(obj, key, suffix) {
    var val = util$$1.getDataPropertyOrDefault(obj, key + suffix,
                                            defaultPromisified);
    return val ? isPromisified(val) : false;
}
function checkValid(ret, suffix, suffixRegexp) {
    for (var i = 0; i < ret.length; i += 2) {
        var key = ret[i];
        if (suffixRegexp.test(key)) {
            var keyWithoutAsyncSuffix = key.replace(suffixRegexp, "");
            for (var j = 0; j < ret.length; j += 2) {
                if (ret[j] === keyWithoutAsyncSuffix) {
                    throw new TypeError("Cannot promisify an API that has normal methods with '%s'-suffix\u000a\u000a    See http://goo.gl/MqrFmX\u000a"
                        .replace("%s", suffix));
                }
            }
        }
    }
}

function promisifiableMethods(obj, suffix, suffixRegexp, filter) {
    var keys = util$$1.inheritedDataKeys(obj);
    var ret = [];
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var value = obj[key];
        var passesDefaultFilter = filter === defaultFilter
            ? true : defaultFilter(key, value, obj);
        if (typeof value === "function" &&
            !isPromisified(value) &&
            !hasPromisified(obj, key, suffix) &&
            filter(key, value, obj, passesDefaultFilter)) {
            ret.push(key, value);
        }
    }
    checkValid(ret, suffix, suffixRegexp);
    return ret;
}

var escapeIdentRegex = function(str) {
    return str.replace(/([$])/, "\\$");
};

var makeNodePromisifiedEval;
{
var switchCaseArgumentOrder = function(likelyArgumentCount) {
    var ret = [likelyArgumentCount];
    var min = Math.max(0, likelyArgumentCount - 1 - 3);
    for(var i = likelyArgumentCount - 1; i >= min; --i) {
        ret.push(i);
    }
    for(var i = likelyArgumentCount + 1; i <= 3; ++i) {
        ret.push(i);
    }
    return ret;
};

var argumentSequence = function(argumentCount) {
    return util$$1.filledRange(argumentCount, "_arg", "");
};

var parameterDeclaration = function(parameterCount) {
    return util$$1.filledRange(
        Math.max(parameterCount, 3), "_arg", "");
};

var parameterCount = function(fn) {
    if (typeof fn.length === "number") {
        return Math.max(Math.min(fn.length, 1023 + 1), 0);
    }
    return 0;
};

makeNodePromisifiedEval =
function(callback, receiver, originalName, fn, _, multiArgs) {
    var newParameterCount = Math.max(0, parameterCount(fn) - 1);
    var argumentOrder = switchCaseArgumentOrder(newParameterCount);
    var shouldProxyThis = typeof callback === "string" || receiver === THIS;

    function generateCallForArgumentCount(count) {
        var args = argumentSequence(count).join(", ");
        var comma = count > 0 ? ", " : "";
        var ret;
        if (shouldProxyThis) {
            ret = "ret = callback.call(this, {{args}}, nodeback); break;\n";
        } else {
            ret = receiver === undefined
                ? "ret = callback({{args}}, nodeback); break;\n"
                : "ret = callback.call(receiver, {{args}}, nodeback); break;\n";
        }
        return ret.replace("{{args}}", args).replace(", ", comma);
    }

    function generateArgumentSwitchCase() {
        var ret = "";
        for (var i = 0; i < argumentOrder.length; ++i) {
            ret += "case " + argumentOrder[i] +":" +
                generateCallForArgumentCount(argumentOrder[i]);
        }

        ret += "                                                             \n\
        default:                                                             \n\
            var args = new Array(len + 1);                                   \n\
            var i = 0;                                                       \n\
            for (var i = 0; i < len; ++i) {                                  \n\
               args[i] = arguments[i];                                       \n\
            }                                                                \n\
            args[i] = nodeback;                                              \n\
            [CodeForCall]                                                    \n\
            break;                                                           \n\
        ".replace("[CodeForCall]", (shouldProxyThis
                                ? "ret = callback.apply(this, args);\n"
                                : "ret = callback.apply(receiver, args);\n"));
        return ret;
    }

    var getFunctionCode = typeof callback === "string"
                                ? ("this != null ? this['"+callback+"'] : fn")
                                : "fn";
    var body = "'use strict';                                                \n\
        var ret = function (Parameters) {                                    \n\
            'use strict';                                                    \n\
            var len = arguments.length;                                      \n\
            var promise = new Promise(INTERNAL);                             \n\
            promise._captureStackTrace();                                    \n\
            var nodeback = nodebackForPromise(promise, " + multiArgs + ");   \n\
            var ret;                                                         \n\
            var callback = tryCatch([GetFunctionCode]);                      \n\
            switch(len) {                                                    \n\
                [CodeForSwitchCase]                                          \n\
            }                                                                \n\
            if (ret === errorObj) {                                          \n\
                promise._rejectCallback(maybeWrapAsError(ret.e), true, true);\n\
            }                                                                \n\
            if (!promise._isFateSealed()) promise._setAsyncGuaranteed();     \n\
            return promise;                                                  \n\
        };                                                                   \n\
        notEnumerableProp(ret, '__isPromisified__', true);                   \n\
        return ret;                                                          \n\
    ".replace("[CodeForSwitchCase]", generateArgumentSwitchCase())
        .replace("[GetFunctionCode]", getFunctionCode);
    body = body.replace("Parameters", parameterDeclaration(newParameterCount));
    return new Function("Promise",
                        "fn",
                        "receiver",
                        "withAppended",
                        "maybeWrapAsError",
                        "nodebackForPromise",
                        "tryCatch",
                        "errorObj",
                        "notEnumerableProp",
                        "INTERNAL",
                        body)(
                    Promise,
                    fn,
                    receiver,
                    withAppended,
                    maybeWrapAsError,
                    nodebackForPromise,
                    util$$1.tryCatch,
                    util$$1.errorObj,
                    util$$1.notEnumerableProp,
                    INTERNAL);
};
}

function makeNodePromisifiedClosure(callback, receiver, _, fn, __, multiArgs) {
    var defaultThis = (function() {return this;})();
    var method = callback;
    if (typeof method === "string") {
        callback = fn;
    }
    function promisified() {
        var _receiver = receiver;
        if (receiver === THIS) _receiver = this;
        var promise = new Promise(INTERNAL);
        promise._captureStackTrace();
        var cb = typeof method === "string" && this !== defaultThis
            ? this[method] : callback;
        var fn = nodebackForPromise(promise, multiArgs);
        try {
            cb.apply(_receiver, withAppended(arguments, fn));
        } catch(e) {
            promise._rejectCallback(maybeWrapAsError(e), true, true);
        }
        if (!promise._isFateSealed()) promise._setAsyncGuaranteed();
        return promise;
    }
    util$$1.notEnumerableProp(promisified, "__isPromisified__", true);
    return promisified;
}

var makeNodePromisified = canEvaluate
    ? makeNodePromisifiedEval
    : makeNodePromisifiedClosure;

function promisifyAll(obj, suffix, filter, promisifier, multiArgs) {
    var suffixRegexp = new RegExp(escapeIdentRegex(suffix) + "$");
    var methods =
        promisifiableMethods(obj, suffix, suffixRegexp, filter);

    for (var i = 0, len = methods.length; i < len; i+= 2) {
        var key = methods[i];
        var fn = methods[i+1];
        var promisifiedKey = key + suffix;
        if (promisifier === makeNodePromisified) {
            obj[promisifiedKey] =
                makeNodePromisified(key, THIS, key, fn, suffix, multiArgs);
        } else {
            var promisified = promisifier(fn, function() {
                return makeNodePromisified(key, THIS, key,
                                           fn, suffix, multiArgs);
            });
            util$$1.notEnumerableProp(promisified, "__isPromisified__", true);
            obj[promisifiedKey] = promisified;
        }
    }
    util$$1.toFastProperties(obj);
    return obj;
}

function promisify(callback, receiver, multiArgs) {
    return makeNodePromisified(callback, receiver, undefined,
                                callback, null, multiArgs);
}

Promise.promisify = function (fn, options) {
    if (typeof fn !== "function") {
        throw new TypeError("expecting a function but got " + util$$1.classString(fn));
    }
    if (isPromisified(fn)) {
        return fn;
    }
    options = Object(options);
    var receiver = options.context === undefined ? THIS : options.context;
    var multiArgs = !!options.multiArgs;
    var ret = promisify(fn, receiver, multiArgs);
    util$$1.copyDescriptors(fn, ret, propsFilter);
    return ret;
};

Promise.promisifyAll = function (target, options) {
    if (typeof target !== "function" && typeof target !== "object") {
        throw new TypeError("the target of promisifyAll must be an object or a function\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
    options = Object(options);
    var multiArgs = !!options.multiArgs;
    var suffix = options.suffix;
    if (typeof suffix !== "string") suffix = defaultSuffix;
    var filter = options.filter;
    if (typeof filter !== "function") filter = defaultFilter;
    var promisifier = options.promisifier;
    if (typeof promisifier !== "function") promisifier = makeNodePromisified;

    if (!util$$1.isIdentifier(suffix)) {
        throw new RangeError("suffix must be a valid identifier\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }

    var keys = util$$1.inheritedDataKeys(target);
    for (var i = 0; i < keys.length; ++i) {
        var value = target[keys[i]];
        if (keys[i] !== "constructor" &&
            util$$1.isClass(value)) {
            promisifyAll(value.prototype, suffix, filter, promisifier,
                multiArgs);
            promisifyAll(value, suffix, filter, promisifier, multiArgs);
        }
    }

    return promisifyAll(target, suffix, filter, promisifier, multiArgs);
};
};

var props = function(
    Promise, PromiseArray, tryConvertToPromise, apiRejection) {
var util$$1 = util$6;
var isObject = util$$1.isObject;
var es5$$2 = es5;
var Es6Map;
if (typeof Map === "function") Es6Map = Map;

var mapToEntries = (function() {
    var index = 0;
    var size = 0;

    function extractEntry(value, key) {
        this[index] = value;
        this[index + size] = key;
        index++;
    }

    return function mapToEntries(map) {
        size = map.size;
        index = 0;
        var ret = new Array(map.size * 2);
        map.forEach(extractEntry, ret);
        return ret;
    };
})();

var entriesToMap = function(entries) {
    var ret = new Es6Map();
    var length = entries.length / 2 | 0;
    for (var i = 0; i < length; ++i) {
        var key = entries[length + i];
        var value = entries[i];
        ret.set(key, value);
    }
    return ret;
};

function PropertiesPromiseArray(obj) {
    var isMap = false;
    var entries;
    if (Es6Map !== undefined && obj instanceof Es6Map) {
        entries = mapToEntries(obj);
        isMap = true;
    } else {
        var keys = es5$$2.keys(obj);
        var len = keys.length;
        entries = new Array(len * 2);
        for (var i = 0; i < len; ++i) {
            var key = keys[i];
            entries[i] = obj[key];
            entries[i + len] = key;
        }
    }
    this.constructor$(entries);
    this._isMap = isMap;
    this._init$(undefined, isMap ? -6 : -3);
}
util$$1.inherits(PropertiesPromiseArray, PromiseArray);

PropertiesPromiseArray.prototype._init = function () {};

PropertiesPromiseArray.prototype._promiseFulfilled = function (value, index) {
    this._values[index] = value;
    var totalResolved = ++this._totalResolved;
    if (totalResolved >= this._length) {
        var val;
        if (this._isMap) {
            val = entriesToMap(this._values);
        } else {
            val = {};
            var keyOffset = this.length();
            for (var i = 0, len = this.length(); i < len; ++i) {
                val[this._values[i + keyOffset]] = this._values[i];
            }
        }
        this._resolve(val);
        return true;
    }
    return false;
};

PropertiesPromiseArray.prototype.shouldCopyValues = function () {
    return false;
};

PropertiesPromiseArray.prototype.getActualLength = function (len) {
    return len >> 1;
};

function props(promises) {
    var ret;
    var castValue = tryConvertToPromise(promises);

    if (!isObject(castValue)) {
        return apiRejection("cannot await properties of a non-object\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    } else if (castValue instanceof Promise) {
        ret = castValue._then(
            Promise.props, undefined, undefined, undefined, undefined);
    } else {
        ret = new PropertiesPromiseArray(castValue).promise();
    }

    if (castValue instanceof Promise) {
        ret._propagateFrom(castValue, 2);
    }
    return ret;
}

Promise.prototype.props = function () {
    return props(this);
};

Promise.props = function (promises) {
    return props(promises);
};
};

var race = function(
    Promise, INTERNAL, tryConvertToPromise, apiRejection) {
var util$$1 = util$6;

var raceLater = function (promise) {
    return promise.then(function(array) {
        return race(array, promise);
    });
};

function race(promises, parent) {
    var maybePromise = tryConvertToPromise(promises);

    if (maybePromise instanceof Promise) {
        return raceLater(maybePromise);
    } else {
        promises = util$$1.asArray(promises);
        if (promises === null)
            return apiRejection("expecting an array or an iterable object but got " + util$$1.classString(promises));
    }

    var ret = new Promise(INTERNAL);
    if (parent !== undefined) {
        ret._propagateFrom(parent, 3);
    }
    var fulfill = ret._fulfill;
    var reject = ret._reject;
    for (var i = 0, len = promises.length; i < len; ++i) {
        var val = promises[i];

        if (val === undefined && !(i in promises)) {
            continue;
        }

        Promise.cast(val)._then(fulfill, reject, undefined, ret, null);
    }
    return ret;
}

Promise.race = function (promises) {
    return race(promises, undefined);
};

Promise.prototype.race = function () {
    return race(this, undefined);
};

};

var reduce = function(Promise,
                          PromiseArray,
                          apiRejection,
                          tryConvertToPromise,
                          INTERNAL,
                          debug) {
var getDomain = Promise._getDomain;
var util$$1 = util$6;
var tryCatch = util$$1.tryCatch;

function ReductionPromiseArray(promises, fn, initialValue, _each) {
    this.constructor$(promises);
    var domain = getDomain();
    this._fn = domain === null ? fn : util$$1.domainBind(domain, fn);
    if (initialValue !== undefined) {
        initialValue = Promise.resolve(initialValue);
        initialValue._attachCancellationCallback(this);
    }
    this._initialValue = initialValue;
    this._currentCancellable = null;
    if(_each === INTERNAL) {
        this._eachValues = Array(this._length);
    } else if (_each === 0) {
        this._eachValues = null;
    } else {
        this._eachValues = undefined;
    }
    this._promise._captureStackTrace();
    this._init$(undefined, -5);
}
util$$1.inherits(ReductionPromiseArray, PromiseArray);

ReductionPromiseArray.prototype._gotAccum = function(accum) {
    if (this._eachValues !== undefined && 
        this._eachValues !== null && 
        accum !== INTERNAL) {
        this._eachValues.push(accum);
    }
};

ReductionPromiseArray.prototype._eachComplete = function(value) {
    if (this._eachValues !== null) {
        this._eachValues.push(value);
    }
    return this._eachValues;
};

ReductionPromiseArray.prototype._init = function() {};

ReductionPromiseArray.prototype._resolveEmptyArray = function() {
    this._resolve(this._eachValues !== undefined ? this._eachValues
                                                 : this._initialValue);
};

ReductionPromiseArray.prototype.shouldCopyValues = function () {
    return false;
};

ReductionPromiseArray.prototype._resolve = function(value) {
    this._promise._resolveCallback(value);
    this._values = null;
};

ReductionPromiseArray.prototype._resultCancelled = function(sender) {
    if (sender === this._initialValue) return this._cancel();
    if (this._isResolved()) return;
    this._resultCancelled$();
    if (this._currentCancellable instanceof Promise) {
        this._currentCancellable.cancel();
    }
    if (this._initialValue instanceof Promise) {
        this._initialValue.cancel();
    }
};

ReductionPromiseArray.prototype._iterate = function (values) {
    this._values = values;
    var value;
    var i;
    var length = values.length;
    if (this._initialValue !== undefined) {
        value = this._initialValue;
        i = 0;
    } else {
        value = Promise.resolve(values[0]);
        i = 1;
    }

    this._currentCancellable = value;

    if (!value.isRejected()) {
        for (; i < length; ++i) {
            var ctx = {
                accum: null,
                value: values[i],
                index: i,
                length: length,
                array: this
            };
            value = value._then(gotAccum, undefined, undefined, ctx, undefined);
        }
    }

    if (this._eachValues !== undefined) {
        value = value
            ._then(this._eachComplete, undefined, undefined, this, undefined);
    }
    value._then(completed, completed, undefined, value, this);
};

Promise.prototype.reduce = function (fn, initialValue) {
    return reduce(this, fn, initialValue, null);
};

Promise.reduce = function (promises, fn, initialValue, _each) {
    return reduce(promises, fn, initialValue, _each);
};

function completed(valueOrReason, array) {
    if (this.isFulfilled()) {
        array._resolve(valueOrReason);
    } else {
        array._reject(valueOrReason);
    }
}

function reduce(promises, fn, initialValue, _each) {
    if (typeof fn !== "function") {
        return apiRejection("expecting a function but got " + util$$1.classString(fn));
    }
    var array = new ReductionPromiseArray(promises, fn, initialValue, _each);
    return array.promise();
}

function gotAccum(accum) {
    this.accum = accum;
    this.array._gotAccum(accum);
    var value = tryConvertToPromise(this.value, this.array._promise);
    if (value instanceof Promise) {
        this.array._currentCancellable = value;
        return value._then(gotValue, undefined, undefined, this, undefined);
    } else {
        return gotValue.call(this, value);
    }
}

function gotValue(value) {
    var array = this.array;
    var promise = array._promise;
    var fn = tryCatch(array._fn);
    promise._pushContext();
    var ret;
    if (array._eachValues !== undefined) {
        ret = fn.call(promise._boundValue(), value, this.index, this.length);
    } else {
        ret = fn.call(promise._boundValue(),
                              this.accum, value, this.index, this.length);
    }
    if (ret instanceof Promise) {
        array._currentCancellable = ret;
    }
    var promiseCreated = promise._popContext();
    debug.checkForgottenReturns(
        ret,
        promiseCreated,
        array._eachValues !== undefined ? "Promise.each" : "Promise.reduce",
        promise
    );
    return ret;
}
};

var settle =
    function(Promise, PromiseArray, debug) {
var PromiseInspection = Promise.PromiseInspection;
var util$$1 = util$6;

function SettledPromiseArray(values) {
    this.constructor$(values);
}
util$$1.inherits(SettledPromiseArray, PromiseArray);

SettledPromiseArray.prototype._promiseResolved = function (index, inspection) {
    this._values[index] = inspection;
    var totalResolved = ++this._totalResolved;
    if (totalResolved >= this._length) {
        this._resolve(this._values);
        return true;
    }
    return false;
};

SettledPromiseArray.prototype._promiseFulfilled = function (value, index) {
    var ret = new PromiseInspection();
    ret._bitField = 33554432;
    ret._settledValueField = value;
    return this._promiseResolved(index, ret);
};
SettledPromiseArray.prototype._promiseRejected = function (reason, index) {
    var ret = new PromiseInspection();
    ret._bitField = 16777216;
    ret._settledValueField = reason;
    return this._promiseResolved(index, ret);
};

Promise.settle = function (promises) {
    debug.deprecated(".settle()", ".reflect()");
    return new SettledPromiseArray(promises).promise();
};

Promise.prototype.settle = function () {
    return Promise.settle(this);
};
};

var some =
function(Promise, PromiseArray, apiRejection) {
var util$$1 = util$6;
var RangeError = errors$2.RangeError;
var AggregateError = errors$2.AggregateError;
var isArray = util$$1.isArray;
var CANCELLATION = {};


function SomePromiseArray(values) {
    this.constructor$(values);
    this._howMany = 0;
    this._unwrap = false;
    this._initialized = false;
}
util$$1.inherits(SomePromiseArray, PromiseArray);

SomePromiseArray.prototype._init = function () {
    if (!this._initialized) {
        return;
    }
    if (this._howMany === 0) {
        this._resolve([]);
        return;
    }
    this._init$(undefined, -5);
    var isArrayResolved = isArray(this._values);
    if (!this._isResolved() &&
        isArrayResolved &&
        this._howMany > this._canPossiblyFulfill()) {
        this._reject(this._getRangeError(this.length()));
    }
};

SomePromiseArray.prototype.init = function () {
    this._initialized = true;
    this._init();
};

SomePromiseArray.prototype.setUnwrap = function () {
    this._unwrap = true;
};

SomePromiseArray.prototype.howMany = function () {
    return this._howMany;
};

SomePromiseArray.prototype.setHowMany = function (count) {
    this._howMany = count;
};

SomePromiseArray.prototype._promiseFulfilled = function (value) {
    this._addFulfilled(value);
    if (this._fulfilled() === this.howMany()) {
        this._values.length = this.howMany();
        if (this.howMany() === 1 && this._unwrap) {
            this._resolve(this._values[0]);
        } else {
            this._resolve(this._values);
        }
        return true;
    }
    return false;

};
SomePromiseArray.prototype._promiseRejected = function (reason) {
    this._addRejected(reason);
    return this._checkOutcome();
};

SomePromiseArray.prototype._promiseCancelled = function () {
    if (this._values instanceof Promise || this._values == null) {
        return this._cancel();
    }
    this._addRejected(CANCELLATION);
    return this._checkOutcome();
};

SomePromiseArray.prototype._checkOutcome = function() {
    if (this.howMany() > this._canPossiblyFulfill()) {
        var e = new AggregateError();
        for (var i = this.length(); i < this._values.length; ++i) {
            if (this._values[i] !== CANCELLATION) {
                e.push(this._values[i]);
            }
        }
        if (e.length > 0) {
            this._reject(e);
        } else {
            this._cancel();
        }
        return true;
    }
    return false;
};

SomePromiseArray.prototype._fulfilled = function () {
    return this._totalResolved;
};

SomePromiseArray.prototype._rejected = function () {
    return this._values.length - this.length();
};

SomePromiseArray.prototype._addRejected = function (reason) {
    this._values.push(reason);
};

SomePromiseArray.prototype._addFulfilled = function (value) {
    this._values[this._totalResolved++] = value;
};

SomePromiseArray.prototype._canPossiblyFulfill = function () {
    return this.length() - this._rejected();
};

SomePromiseArray.prototype._getRangeError = function (count) {
    var message = "Input array must contain at least " +
            this._howMany + " items but contains only " + count + " items";
    return new RangeError(message);
};

SomePromiseArray.prototype._resolveEmptyArray = function () {
    this._reject(this._getRangeError(0));
};

function some(promises, howMany) {
    if ((howMany | 0) !== howMany || howMany < 0) {
        return apiRejection("expecting a positive integer\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
    var ret = new SomePromiseArray(promises);
    var promise = ret.promise();
    ret.setHowMany(howMany);
    ret.init();
    return promise;
}

Promise.some = function (promises, howMany) {
    return some(promises, howMany);
};

Promise.prototype.some = function (howMany) {
    return some(this, howMany);
};

Promise._SomePromiseArray = SomePromiseArray;
};

var filter$1 = function(Promise, INTERNAL) {
var PromiseMap = Promise.map;

Promise.prototype.filter = function (fn, options) {
    return PromiseMap(this, fn, options, INTERNAL);
};

Promise.filter = function (promises, fn, options) {
    return PromiseMap(promises, fn, options, INTERNAL);
};
};

var each = function(Promise, INTERNAL) {
var PromiseReduce = Promise.reduce;
var PromiseAll = Promise.all;

function promiseAllThis() {
    return PromiseAll(this);
}

function PromiseMapSeries(promises, fn) {
    return PromiseReduce(promises, fn, INTERNAL, INTERNAL);
}

Promise.prototype.each = function (fn) {
    return PromiseReduce(this, fn, INTERNAL, 0)
              ._then(promiseAllThis, undefined, undefined, this, undefined);
};

Promise.prototype.mapSeries = function (fn) {
    return PromiseReduce(this, fn, INTERNAL, INTERNAL);
};

Promise.each = function (promises, fn) {
    return PromiseReduce(promises, fn, INTERNAL, 0)
              ._then(promiseAllThis, undefined, undefined, promises, undefined);
};

Promise.mapSeries = PromiseMapSeries;
};

var any = function(Promise) {
var SomePromiseArray = Promise._SomePromiseArray;
function any(promises) {
    var ret = new SomePromiseArray(promises);
    var promise = ret.promise();
    ret.setHowMany(1);
    ret.setUnwrap();
    ret.init();
    return promise;
}

Promise.any = function (promises) {
    return any(promises);
};

Promise.prototype.any = function () {
    return any(this);
};

};

var promise = createCommonjsModule(function (module) {
"use strict";
module.exports = function() {
var makeSelfResolutionError = function () {
    return new TypeError("circular promise resolution chain\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
};
var reflectHandler = function() {
    return new Promise.PromiseInspection(this._target());
};
var apiRejection = function(msg) {
    return Promise.reject(new TypeError(msg));
};
function Proxyable() {}
var UNDEFINED_BINDING = {};
var util$$1 = util$6;

var getDomain;
if (util$$1.isNode) {
    getDomain = function() {
        var ret = process.domain;
        if (ret === undefined) ret = null;
        return ret;
    };
} else {
    getDomain = function() {
        return null;
    };
}
util$$1.notEnumerableProp(Promise, "_getDomain", getDomain);

var es5$$1 = es5;
var Async = async$3;
var async = new Async();
es5$$1.defineProperty(Promise, "_async", {value: async});
var errors = errors$2;
var TypeError = Promise.TypeError = errors.TypeError;
Promise.RangeError = errors.RangeError;
var CancellationError = Promise.CancellationError = errors.CancellationError;
Promise.TimeoutError = errors.TimeoutError;
Promise.OperationalError = errors.OperationalError;
Promise.RejectionError = errors.OperationalError;
Promise.AggregateError = errors.AggregateError;
var INTERNAL = function(){};
var APPLY = {};
var NEXT_FILTER = {};
var tryConvertToPromise = thenables(Promise, INTERNAL);
var PromiseArray =
    promise_array(Promise, INTERNAL,
                               tryConvertToPromise, apiRejection, Proxyable);
var Context = context(Promise);
 /*jshint unused:false*/
var createContext = Context.create;
var debug = debuggability(Promise, Context);
var CapturedTrace = debug.CapturedTrace;
var PassThroughHandlerContext =
    _finally(Promise, tryConvertToPromise, NEXT_FILTER);
var catchFilter = catch_filter(NEXT_FILTER);
var nodebackForPromise = nodeback;
var errorObj = util$$1.errorObj;
var tryCatch = util$$1.tryCatch;
function check(self, executor) {
    if (self == null || self.constructor !== Promise) {
        throw new TypeError("the promise constructor cannot be invoked directly\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
    if (typeof executor !== "function") {
        throw new TypeError("expecting a function but got " + util$$1.classString(executor));
    }

}

function Promise(executor) {
    if (executor !== INTERNAL) {
        check(this, executor);
    }
    this._bitField = 0;
    this._fulfillmentHandler0 = undefined;
    this._rejectionHandler0 = undefined;
    this._promise0 = undefined;
    this._receiver0 = undefined;
    this._resolveFromExecutor(executor);
    this._promiseCreated();
    this._fireEvent("promiseCreated", this);
}

Promise.prototype.toString = function () {
    return "[object Promise]";
};

Promise.prototype.caught = Promise.prototype["catch"] = function (fn) {
    var len = arguments.length;
    if (len > 1) {
        var catchInstances = new Array(len - 1),
            j = 0, i;
        for (i = 0; i < len - 1; ++i) {
            var item = arguments[i];
            if (util$$1.isObject(item)) {
                catchInstances[j++] = item;
            } else {
                return apiRejection("Catch statement predicate: " +
                    "expecting an object but got " + util$$1.classString(item));
            }
        }
        catchInstances.length = j;
        fn = arguments[i];
        return this.then(undefined, catchFilter(catchInstances, fn, this));
    }
    return this.then(undefined, fn);
};

Promise.prototype.reflect = function () {
    return this._then(reflectHandler,
        reflectHandler, undefined, this, undefined);
};

Promise.prototype.then = function (didFulfill, didReject) {
    if (debug.warnings() && arguments.length > 0 &&
        typeof didFulfill !== "function" &&
        typeof didReject !== "function") {
        var msg = ".then() only accepts functions but was passed: " +
                util$$1.classString(didFulfill);
        if (arguments.length > 1) {
            msg += ", " + util$$1.classString(didReject);
        }
        this._warn(msg);
    }
    return this._then(didFulfill, didReject, undefined, undefined, undefined);
};

Promise.prototype.done = function (didFulfill, didReject) {
    var promise =
        this._then(didFulfill, didReject, undefined, undefined, undefined);
    promise._setIsFinal();
};

Promise.prototype.spread = function (fn) {
    if (typeof fn !== "function") {
        return apiRejection("expecting a function but got " + util$$1.classString(fn));
    }
    return this.all()._then(fn, undefined, undefined, APPLY, undefined);
};

Promise.prototype.toJSON = function () {
    var ret = {
        isFulfilled: false,
        isRejected: false,
        fulfillmentValue: undefined,
        rejectionReason: undefined
    };
    if (this.isFulfilled()) {
        ret.fulfillmentValue = this.value();
        ret.isFulfilled = true;
    } else if (this.isRejected()) {
        ret.rejectionReason = this.reason();
        ret.isRejected = true;
    }
    return ret;
};

Promise.prototype.all = function () {
    if (arguments.length > 0) {
        this._warn(".all() was passed arguments but it does not take any");
    }
    return new PromiseArray(this).promise();
};

Promise.prototype.error = function (fn) {
    return this.caught(util$$1.originatesFromRejection, fn);
};

Promise.getNewLibraryCopy = module.exports;

Promise.is = function (val) {
    return val instanceof Promise;
};

Promise.fromNode = Promise.fromCallback = function(fn) {
    var ret = new Promise(INTERNAL);
    ret._captureStackTrace();
    var multiArgs = arguments.length > 1 ? !!Object(arguments[1]).multiArgs
                                         : false;
    var result = tryCatch(fn)(nodebackForPromise(ret, multiArgs));
    if (result === errorObj) {
        ret._rejectCallback(result.e, true);
    }
    if (!ret._isFateSealed()) ret._setAsyncGuaranteed();
    return ret;
};

Promise.all = function (promises) {
    return new PromiseArray(promises).promise();
};

Promise.cast = function (obj) {
    var ret = tryConvertToPromise(obj);
    if (!(ret instanceof Promise)) {
        ret = new Promise(INTERNAL);
        ret._captureStackTrace();
        ret._setFulfilled();
        ret._rejectionHandler0 = obj;
    }
    return ret;
};

Promise.resolve = Promise.fulfilled = Promise.cast;

Promise.reject = Promise.rejected = function (reason) {
    var ret = new Promise(INTERNAL);
    ret._captureStackTrace();
    ret._rejectCallback(reason, true);
    return ret;
};

Promise.setScheduler = function(fn) {
    if (typeof fn !== "function") {
        throw new TypeError("expecting a function but got " + util$$1.classString(fn));
    }
    return async.setScheduler(fn);
};

Promise.prototype._then = function (
    didFulfill,
    didReject,
    _,    receiver,
    internalData
) {
    var haveInternalData = internalData !== undefined;
    var promise = haveInternalData ? internalData : new Promise(INTERNAL);
    var target = this._target();
    var bitField = target._bitField;

    if (!haveInternalData) {
        promise._propagateFrom(this, 3);
        promise._captureStackTrace();
        if (receiver === undefined &&
            ((this._bitField & 2097152) !== 0)) {
            if (!((bitField & 50397184) === 0)) {
                receiver = this._boundValue();
            } else {
                receiver = target === this ? undefined : this._boundTo;
            }
        }
        this._fireEvent("promiseChained", this, promise);
    }

    var domain = getDomain();
    if (!((bitField & 50397184) === 0)) {
        var handler, value, settler = target._settlePromiseCtx;
        if (((bitField & 33554432) !== 0)) {
            value = target._rejectionHandler0;
            handler = didFulfill;
        } else if (((bitField & 16777216) !== 0)) {
            value = target._fulfillmentHandler0;
            handler = didReject;
            target._unsetRejectionIsUnhandled();
        } else {
            settler = target._settlePromiseLateCancellationObserver;
            value = new CancellationError("late cancellation observer");
            target._attachExtraTrace(value);
            handler = didReject;
        }

        async.invoke(settler, target, {
            handler: domain === null ? handler
                : (typeof handler === "function" &&
                    util$$1.domainBind(domain, handler)),
            promise: promise,
            receiver: receiver,
            value: value
        });
    } else {
        target._addCallbacks(didFulfill, didReject, promise, receiver, domain);
    }

    return promise;
};

Promise.prototype._length = function () {
    return this._bitField & 65535;
};

Promise.prototype._isFateSealed = function () {
    return (this._bitField & 117506048) !== 0;
};

Promise.prototype._isFollowing = function () {
    return (this._bitField & 67108864) === 67108864;
};

Promise.prototype._setLength = function (len) {
    this._bitField = (this._bitField & -65536) |
        (len & 65535);
};

Promise.prototype._setFulfilled = function () {
    this._bitField = this._bitField | 33554432;
    this._fireEvent("promiseFulfilled", this);
};

Promise.prototype._setRejected = function () {
    this._bitField = this._bitField | 16777216;
    this._fireEvent("promiseRejected", this);
};

Promise.prototype._setFollowing = function () {
    this._bitField = this._bitField | 67108864;
    this._fireEvent("promiseResolved", this);
};

Promise.prototype._setIsFinal = function () {
    this._bitField = this._bitField | 4194304;
};

Promise.prototype._isFinal = function () {
    return (this._bitField & 4194304) > 0;
};

Promise.prototype._unsetCancelled = function() {
    this._bitField = this._bitField & (~65536);
};

Promise.prototype._setCancelled = function() {
    this._bitField = this._bitField | 65536;
    this._fireEvent("promiseCancelled", this);
};

Promise.prototype._setWillBeCancelled = function() {
    this._bitField = this._bitField | 8388608;
};

Promise.prototype._setAsyncGuaranteed = function() {
    if (async.hasCustomScheduler()) return;
    this._bitField = this._bitField | 134217728;
};

Promise.prototype._receiverAt = function (index) {
    var ret = index === 0 ? this._receiver0 : this[
            index * 4 - 4 + 3];
    if (ret === UNDEFINED_BINDING) {
        return undefined;
    } else if (ret === undefined && this._isBound()) {
        return this._boundValue();
    }
    return ret;
};

Promise.prototype._promiseAt = function (index) {
    return this[
            index * 4 - 4 + 2];
};

Promise.prototype._fulfillmentHandlerAt = function (index) {
    return this[
            index * 4 - 4 + 0];
};

Promise.prototype._rejectionHandlerAt = function (index) {
    return this[
            index * 4 - 4 + 1];
};

Promise.prototype._boundValue = function() {};

Promise.prototype._migrateCallback0 = function (follower) {
    var bitField = follower._bitField;
    var fulfill = follower._fulfillmentHandler0;
    var reject = follower._rejectionHandler0;
    var promise = follower._promise0;
    var receiver = follower._receiverAt(0);
    if (receiver === undefined) receiver = UNDEFINED_BINDING;
    this._addCallbacks(fulfill, reject, promise, receiver, null);
};

Promise.prototype._migrateCallbackAt = function (follower, index) {
    var fulfill = follower._fulfillmentHandlerAt(index);
    var reject = follower._rejectionHandlerAt(index);
    var promise = follower._promiseAt(index);
    var receiver = follower._receiverAt(index);
    if (receiver === undefined) receiver = UNDEFINED_BINDING;
    this._addCallbacks(fulfill, reject, promise, receiver, null);
};

Promise.prototype._addCallbacks = function (
    fulfill,
    reject,
    promise,
    receiver,
    domain
) {
    var index = this._length();

    if (index >= 65535 - 4) {
        index = 0;
        this._setLength(0);
    }

    if (index === 0) {
        this._promise0 = promise;
        this._receiver0 = receiver;
        if (typeof fulfill === "function") {
            this._fulfillmentHandler0 =
                domain === null ? fulfill : util$$1.domainBind(domain, fulfill);
        }
        if (typeof reject === "function") {
            this._rejectionHandler0 =
                domain === null ? reject : util$$1.domainBind(domain, reject);
        }
    } else {
        var base = index * 4 - 4;
        this[base + 2] = promise;
        this[base + 3] = receiver;
        if (typeof fulfill === "function") {
            this[base + 0] =
                domain === null ? fulfill : util$$1.domainBind(domain, fulfill);
        }
        if (typeof reject === "function") {
            this[base + 1] =
                domain === null ? reject : util$$1.domainBind(domain, reject);
        }
    }
    this._setLength(index + 1);
    return index;
};

Promise.prototype._proxy = function (proxyable, arg) {
    this._addCallbacks(undefined, undefined, arg, proxyable, null);
};

Promise.prototype._resolveCallback = function(value, shouldBind) {
    if (((this._bitField & 117506048) !== 0)) return;
    if (value === this)
        return this._rejectCallback(makeSelfResolutionError(), false);
    var maybePromise = tryConvertToPromise(value, this);
    if (!(maybePromise instanceof Promise)) return this._fulfill(value);

    if (shouldBind) this._propagateFrom(maybePromise, 2);

    var promise = maybePromise._target();

    if (promise === this) {
        this._reject(makeSelfResolutionError());
        return;
    }

    var bitField = promise._bitField;
    if (((bitField & 50397184) === 0)) {
        var len = this._length();
        if (len > 0) promise._migrateCallback0(this);
        for (var i = 1; i < len; ++i) {
            promise._migrateCallbackAt(this, i);
        }
        this._setFollowing();
        this._setLength(0);
        this._setFollowee(promise);
    } else if (((bitField & 33554432) !== 0)) {
        this._fulfill(promise._value());
    } else if (((bitField & 16777216) !== 0)) {
        this._reject(promise._reason());
    } else {
        var reason = new CancellationError("late cancellation observer");
        promise._attachExtraTrace(reason);
        this._reject(reason);
    }
};

Promise.prototype._rejectCallback =
function(reason, synchronous, ignoreNonErrorWarnings) {
    var trace = util$$1.ensureErrorObject(reason);
    var hasStack = trace === reason;
    if (!hasStack && !ignoreNonErrorWarnings && debug.warnings()) {
        var message = "a promise was rejected with a non-error: " +
            util$$1.classString(reason);
        this._warn(message, true);
    }
    this._attachExtraTrace(trace, synchronous ? hasStack : false);
    this._reject(reason);
};

Promise.prototype._resolveFromExecutor = function (executor) {
    if (executor === INTERNAL) return;
    var promise = this;
    this._captureStackTrace();
    this._pushContext();
    var synchronous = true;
    var r = this._execute(executor, function(value) {
        promise._resolveCallback(value);
    }, function (reason) {
        promise._rejectCallback(reason, synchronous);
    });
    synchronous = false;
    this._popContext();

    if (r !== undefined) {
        promise._rejectCallback(r, true);
    }
};

Promise.prototype._settlePromiseFromHandler = function (
    handler, receiver, value, promise
) {
    var bitField = promise._bitField;
    if (((bitField & 65536) !== 0)) return;
    promise._pushContext();
    var x;
    if (receiver === APPLY) {
        if (!value || typeof value.length !== "number") {
            x = errorObj;
            x.e = new TypeError("cannot .spread() a non-array: " +
                                    util$$1.classString(value));
        } else {
            x = tryCatch(handler).apply(this._boundValue(), value);
        }
    } else {
        x = tryCatch(handler).call(receiver, value);
    }
    var promiseCreated = promise._popContext();
    bitField = promise._bitField;
    if (((bitField & 65536) !== 0)) return;

    if (x === NEXT_FILTER) {
        promise._reject(value);
    } else if (x === errorObj) {
        promise._rejectCallback(x.e, false);
    } else {
        debug.checkForgottenReturns(x, promiseCreated, "",  promise, this);
        promise._resolveCallback(x);
    }
};

Promise.prototype._target = function() {
    var ret = this;
    while (ret._isFollowing()) ret = ret._followee();
    return ret;
};

Promise.prototype._followee = function() {
    return this._rejectionHandler0;
};

Promise.prototype._setFollowee = function(promise) {
    this._rejectionHandler0 = promise;
};

Promise.prototype._settlePromise = function(promise, handler, receiver, value) {
    var isPromise = promise instanceof Promise;
    var bitField = this._bitField;
    var asyncGuaranteed = ((bitField & 134217728) !== 0);
    if (((bitField & 65536) !== 0)) {
        if (isPromise) promise._invokeInternalOnCancel();

        if (receiver instanceof PassThroughHandlerContext &&
            receiver.isFinallyHandler()) {
            receiver.cancelPromise = promise;
            if (tryCatch(handler).call(receiver, value) === errorObj) {
                promise._reject(errorObj.e);
            }
        } else if (handler === reflectHandler) {
            promise._fulfill(reflectHandler.call(receiver));
        } else if (receiver instanceof Proxyable) {
            receiver._promiseCancelled(promise);
        } else if (isPromise || promise instanceof PromiseArray) {
            promise._cancel();
        } else {
            receiver.cancel();
        }
    } else if (typeof handler === "function") {
        if (!isPromise) {
            handler.call(receiver, value, promise);
        } else {
            if (asyncGuaranteed) promise._setAsyncGuaranteed();
            this._settlePromiseFromHandler(handler, receiver, value, promise);
        }
    } else if (receiver instanceof Proxyable) {
        if (!receiver._isResolved()) {
            if (((bitField & 33554432) !== 0)) {
                receiver._promiseFulfilled(value, promise);
            } else {
                receiver._promiseRejected(value, promise);
            }
        }
    } else if (isPromise) {
        if (asyncGuaranteed) promise._setAsyncGuaranteed();
        if (((bitField & 33554432) !== 0)) {
            promise._fulfill(value);
        } else {
            promise._reject(value);
        }
    }
};

Promise.prototype._settlePromiseLateCancellationObserver = function(ctx) {
    var handler = ctx.handler;
    var promise = ctx.promise;
    var receiver = ctx.receiver;
    var value = ctx.value;
    if (typeof handler === "function") {
        if (!(promise instanceof Promise)) {
            handler.call(receiver, value, promise);
        } else {
            this._settlePromiseFromHandler(handler, receiver, value, promise);
        }
    } else if (promise instanceof Promise) {
        promise._reject(value);
    }
};

Promise.prototype._settlePromiseCtx = function(ctx) {
    this._settlePromise(ctx.promise, ctx.handler, ctx.receiver, ctx.value);
};

Promise.prototype._settlePromise0 = function(handler, value, bitField) {
    var promise = this._promise0;
    var receiver = this._receiverAt(0);
    this._promise0 = undefined;
    this._receiver0 = undefined;
    this._settlePromise(promise, handler, receiver, value);
};

Promise.prototype._clearCallbackDataAtIndex = function(index) {
    var base = index * 4 - 4;
    this[base + 2] =
    this[base + 3] =
    this[base + 0] =
    this[base + 1] = undefined;
};

Promise.prototype._fulfill = function (value) {
    var bitField = this._bitField;
    if (((bitField & 117506048) >>> 16)) return;
    if (value === this) {
        var err = makeSelfResolutionError();
        this._attachExtraTrace(err);
        return this._reject(err);
    }
    this._setFulfilled();
    this._rejectionHandler0 = value;

    if ((bitField & 65535) > 0) {
        if (((bitField & 134217728) !== 0)) {
            this._settlePromises();
        } else {
            async.settlePromises(this);
        }
    }
};

Promise.prototype._reject = function (reason) {
    var bitField = this._bitField;
    if (((bitField & 117506048) >>> 16)) return;
    this._setRejected();
    this._fulfillmentHandler0 = reason;

    if (this._isFinal()) {
        return async.fatalError(reason, util$$1.isNode);
    }

    if ((bitField & 65535) > 0) {
        async.settlePromises(this);
    } else {
        this._ensurePossibleRejectionHandled();
    }
};

Promise.prototype._fulfillPromises = function (len, value) {
    for (var i = 1; i < len; i++) {
        var handler = this._fulfillmentHandlerAt(i);
        var promise = this._promiseAt(i);
        var receiver = this._receiverAt(i);
        this._clearCallbackDataAtIndex(i);
        this._settlePromise(promise, handler, receiver, value);
    }
};

Promise.prototype._rejectPromises = function (len, reason) {
    for (var i = 1; i < len; i++) {
        var handler = this._rejectionHandlerAt(i);
        var promise = this._promiseAt(i);
        var receiver = this._receiverAt(i);
        this._clearCallbackDataAtIndex(i);
        this._settlePromise(promise, handler, receiver, reason);
    }
};

Promise.prototype._settlePromises = function () {
    var bitField = this._bitField;
    var len = (bitField & 65535);

    if (len > 0) {
        if (((bitField & 16842752) !== 0)) {
            var reason = this._fulfillmentHandler0;
            this._settlePromise0(this._rejectionHandler0, reason, bitField);
            this._rejectPromises(len, reason);
        } else {
            var value = this._rejectionHandler0;
            this._settlePromise0(this._fulfillmentHandler0, value, bitField);
            this._fulfillPromises(len, value);
        }
        this._setLength(0);
    }
    this._clearCancellationData();
};

Promise.prototype._settledValue = function() {
    var bitField = this._bitField;
    if (((bitField & 33554432) !== 0)) {
        return this._rejectionHandler0;
    } else if (((bitField & 16777216) !== 0)) {
        return this._fulfillmentHandler0;
    }
};

function deferResolve(v) {this.promise._resolveCallback(v);}
function deferReject(v) {this.promise._rejectCallback(v, false);}

Promise.defer = Promise.pending = function() {
    debug.deprecated("Promise.defer", "new Promise");
    var promise = new Promise(INTERNAL);
    return {
        promise: promise,
        resolve: deferResolve,
        reject: deferReject
    };
};

util$$1.notEnumerableProp(Promise,
                       "_makeSelfResolutionError",
                       makeSelfResolutionError);

method(Promise, INTERNAL, tryConvertToPromise, apiRejection,
    debug);
bind(Promise, INTERNAL, tryConvertToPromise, debug);
cancel(Promise, PromiseArray, apiRejection, debug);
direct_resolve(Promise);
synchronous_inspection(Promise);
join$9(
    Promise, PromiseArray, tryConvertToPromise, INTERNAL, async, getDomain);
Promise.Promise = Promise;
Promise.version = "3.5.0";
map(Promise, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug);
call_get(Promise);
using(Promise, apiRejection, tryConvertToPromise, createContext, INTERNAL, debug);
timers$1(Promise, INTERNAL, debug);
generators(Promise, apiRejection, INTERNAL, tryConvertToPromise, Proxyable, debug);
nodeify(Promise);
promisify(Promise, INTERNAL);
props(Promise, PromiseArray, tryConvertToPromise, apiRejection);
race(Promise, INTERNAL, tryConvertToPromise, apiRejection);
reduce(Promise, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug);
settle(Promise, PromiseArray, debug);
some(Promise, PromiseArray, apiRejection);
filter$1(Promise, INTERNAL);
each(Promise, INTERNAL);
any(Promise);
                                                         
    util$$1.toFastProperties(Promise);                                          
    util$$1.toFastProperties(Promise.prototype);                                
    function fillTypes(value) {                                              
        var p = new Promise(INTERNAL);                                       
        p._fulfillmentHandler0 = value;                                      
        p._rejectionHandler0 = value;                                        
        p._promise0 = value;                                                 
        p._receiver0 = value;                                                
    }                                                                        
    // Complete slack tracking, opt out of field-type tracking and           
    // stabilize map                                                         
    fillTypes({a: 1});                                                       
    fillTypes({b: 2});                                                       
    fillTypes({c: 3});                                                       
    fillTypes(1);                                                            
    fillTypes(function(){});                                                 
    fillTypes(undefined);                                                    
    fillTypes(false);                                                        
    fillTypes(new Promise(INTERNAL));                                        
    debug.setBounds(Async.firstLineError, util$$1.lastLineError);               
    return Promise;                                                          

};
});

var old;
if (typeof Promise !== "undefined") old = Promise;
function noConflict() {
    try { if (Promise === bluebird) Promise = old; }
    catch (e) {}
    return bluebird;
}
var bluebird = promise();
bluebird.noConflict = noConflict;
var bluebird_1 = bluebird;

// Based on iniparser by shockie <https://npmjs.org/package/iniparser>

/*
 * get the file handler
 */


/*
 * define the possible values:
 * section: [section]
 * param: key=value
 * comment: ;this is a comment
 */
var regex = {
  section: /^\s*\[(([^#;]|\\#|\\;)+)\]\s*([#;].*)?$/,
  param: /^\s*([\w\.\-\_]+)\s*[=:]\s*(.*?)\s*([#;].*)?$/,
  comment: /^\s*[#;].*$/
};

/*
 * parses a .ini file
 * @param: {String} file, the location of the .ini file
 * @param: {Function} callback, the function that will be called when parsing is done
 * @return: none
 */
var parse_1 = function (file, callback) {
  if (!callback) {
    return;
  }
  fs.readFile(file, 'utf8', function (err, data) {
    if (err) {
      callback(err);
    } else {
      callback(null, parse(data));
    }
  });
};

var parseSync$1 = function (file) {
  return parse(fs.readFileSync(file, 'utf8'));
};

var parseString$1 = function (data) {
  var sectionBody = {};
  var sectionName = null;
  var value = [[sectionName, sectionBody]];
  var lines = data.split(/\r\n|\r|\n/);
  lines.forEach(function (line) {
    var match;
    if (regex.comment.test(line)) {
      return;
    } else if (regex.param.test(line)) {
      match = line.match(regex.param);
      sectionBody[match[1]] = match[2];
    } else if (regex.section.test(line)) {
      match = line.match(regex.section);
      sectionName = match[1];
      sectionBody = {};
      value.push([sectionName, sectionBody]);
    }
  });
  return value;
};

var ini = {
	parse: parse_1,
	parseSync: parseSync$1,
	parseString: parseString$1
};

var hasOwnProperty = Object.prototype.hasOwnProperty;

var pseudomap = PseudoMap;

function PseudoMap (set) {
  if (!(this instanceof PseudoMap)) // whyyyyyyy
    throw new TypeError("Constructor PseudoMap requires 'new'")

  this.clear();

  if (set) {
    if ((set instanceof PseudoMap) ||
        (typeof Map === 'function' && set instanceof Map))
      set.forEach(function (value, key) {
        this.set(key, value);
      }, this);
    else if (Array.isArray(set))
      set.forEach(function (kv) {
        this.set(kv[0], kv[1]);
      }, this);
    else
      throw new TypeError('invalid argument')
  }
}

PseudoMap.prototype.forEach = function (fn, thisp) {
  thisp = thisp || this;
  Object.keys(this._data).forEach(function (k) {
    if (k !== 'size')
      fn.call(thisp, this._data[k].value, this._data[k].key);
  }, this);
};

PseudoMap.prototype.has = function (k) {
  return !!find(this._data, k)
};

PseudoMap.prototype.get = function (k) {
  var res = find(this._data, k);
  return res && res.value
};

PseudoMap.prototype.set = function (k, v) {
  set(this._data, k, v);
};

PseudoMap.prototype.delete = function (k) {
  var res = find(this._data, k);
  if (res) {
    delete this._data[res._index];
    this._data.size--;
  }
};

PseudoMap.prototype.clear = function () {
  var data = Object.create(null);
  data.size = 0;

  Object.defineProperty(this, '_data', {
    value: data,
    enumerable: false,
    configurable: true,
    writable: false
  });
};

Object.defineProperty(PseudoMap.prototype, 'size', {
  get: function () {
    return this._data.size
  },
  set: function (n) {},
  enumerable: true,
  configurable: true
});

PseudoMap.prototype.values =
PseudoMap.prototype.keys =
PseudoMap.prototype.entries = function () {
  throw new Error('iterators are not implemented in this version')
};

// Either identical, or both NaN
function same (a, b) {
  return a === b || a !== a && b !== b
}

function Entry$1 (k, v, i) {
  this.key = k;
  this.value = v;
  this._index = i;
}

function find (data, k) {
  for (var i = 0, s = '_' + k, key = s;
       hasOwnProperty.call(data, key);
       key = s + i++) {
    if (same(data[key].key, k))
      return data[key]
  }
}

function set (data, k, v) {
  for (var i = 0, s = '_' + k, key = s;
       hasOwnProperty.call(data, key);
       key = s + i++) {
    if (same(data[key].key, k)) {
      data[key].value = v;
      return
    }
  }
  data.size++;
  data[key] = new Entry$1(k, v, key);
}

var map$2 = createCommonjsModule(function (module) {
if (process.env.npm_package_name === 'pseudomap' &&
    process.env.npm_lifecycle_script === 'test')
  process.env.TEST_PSEUDOMAP = 'true';

if (typeof Map === 'function' && !process.env.TEST_PSEUDOMAP) {
  module.exports = Map;
} else {
  module.exports = pseudomap;
}
});

var lruCache = LRUCache;

// This will be a proper iterable 'Map' in engines that support it,
// or a fakey-fake PseudoMap in older versions.


function naiveLength () { return 1 }

function LRUCache (options) {
  if (!(this instanceof LRUCache))
    return new LRUCache(options)

  if (typeof options === 'number')
    options = { max: options };

  if (!options)
    options = {};

  this._max = options.max;
  // Kind of weird to have a default max of Infinity, but oh well.
  if (!this._max || !(typeof this._max === "number") || this._max <= 0 )
    this._max = Infinity;

  this._lengthCalculator = options.length || naiveLength;
  if (typeof this._lengthCalculator !== "function")
    this._lengthCalculator = naiveLength;

  this._allowStale = options.stale || false;
  this._maxAge = options.maxAge || null;
  this._dispose = options.dispose;
  this.reset();
}

// resize the cache when the max changes.
Object.defineProperty(LRUCache.prototype, "max",
  { set : function (mL) {
      if (!mL || !(typeof mL === "number") || mL <= 0 ) mL = Infinity;
      this._max = mL;
      if (this._length > this._max) trim(this);
    }
  , get : function () { return this._max }
  , enumerable : true
  });

// resize the cache when the lengthCalculator changes.
Object.defineProperty(LRUCache.prototype, "lengthCalculator",
  { set : function (lC) {
      if (typeof lC !== "function") {
        this._lengthCalculator = naiveLength;
        this._length = this._lruList.size;
        this._cache.forEach(function (value, key) {
          value.length = 1;
        });
      } else {
        this._lengthCalculator = lC;
        this._length = 0;
        this._cache.forEach(function (value, key) {
          value.length = this._lengthCalculator(value.value, key);
          this._length += value.length;
        }, this);
      }

      if (this._length > this._max) trim(this);
    }
  , get : function () { return this._lengthCalculator }
  , enumerable : true
  });

Object.defineProperty(LRUCache.prototype, "length",
  { get : function () { return this._length }
  , enumerable : true
  });

Object.defineProperty(LRUCache.prototype, "itemCount",
  { get : function () { return this._lruList.size }
  , enumerable : true
  });

function reverseKeys (map) {
  // keys live in lruList map in insertion order.
  // we want them in reverse insertion order.
  // flip the list of keys.
  var itemCount = map.size;
  var keys = new Array(itemCount);
  var i = itemCount;
  map.forEach(function (value, key) {
    keys[--i] = key;
  });

  return keys
}

LRUCache.prototype.rforEach = function (fn, thisp) {
  thisp = thisp || this;
  this._lruList.forEach(function (hit) {
    forEachStep(this, fn, hit, thisp);
  }, this);
};

function forEachStep (self, fn, hit, thisp) {
  if (isStale(self, hit)) {
    del(self, hit);
    if (!self._allowStale) {
      hit = undefined;
    }
  }
  if (hit) {
    fn.call(thisp, hit.value, hit.key, self);
  }
}


LRUCache.prototype.forEach = function (fn, thisp) {
  thisp = thisp || this;

  var keys = reverseKeys(this._lruList);
  for (var k = 0; k < keys.length; k++) {
    var hit = this._lruList.get(keys[k]);
    forEachStep(this, fn, hit, thisp);
  }
};

LRUCache.prototype.keys = function () {
  return reverseKeys(this._lruList).map(function (k) {
    return this._lruList.get(k).key
  }, this)
};

LRUCache.prototype.values = function () {
  return reverseKeys(this._lruList).map(function (k) {
    return this._lruList.get(k).value
  }, this)
};

LRUCache.prototype.reset = function () {
  if (this._dispose && this._cache) {
    this._cache.forEach(function (entry, key) {
      this._dispose(key, entry.value);
    }, this);
  }

  this._cache = new map$2(); // hash of items by key
  this._lruList = new map$2(); // list of items in order of use recency
  this._mru = 0; // most recently used
  this._lru = 0; // least recently used
  this._length = 0; // number of items in the list
};

LRUCache.prototype.dump = function () {
  var arr = [];
  var i = 0;
  var size = this._lruList.size;
  return reverseKeys(this._lruList).map(function (k) {
    var hit = this._lruList.get(k);
    if (!isStale(this, hit)) {
      return {
        k: hit.key,
        v: hit.value,
        e: hit.now + (hit.maxAge || 0)
      }
    }
  }, this).filter(function (h) {
    return h
  })
};

LRUCache.prototype.dumpLru = function () {
  return this._lruList
};

LRUCache.prototype.set = function (key, value, maxAge) {
  maxAge = maxAge || this._maxAge;

  var now = maxAge ? Date.now() : 0;
  var len = this._lengthCalculator(value, key);

  if (this._cache.has(key)) {
    if (len > this._max) {
      del(this, this._cache.get(key));
      return false
    }

    var item = this._cache.get(key);

    // dispose of the old one before overwriting
    if (this._dispose)
      this._dispose(key, item.value);

    item.now = now;
    item.maxAge = maxAge;
    item.value = value;
    this._length += (len - item.length);
    item.length = len;
    this.get(key);

    if (this._length > this._max)
      trim(this);

    return true
  }

  var hit = new Entry(key, value, this._mru, len, now, maxAge);
  incMru(this);

  // oversized objects fall out of cache automatically.
  if (hit.length > this._max) {
    if (this._dispose) this._dispose(key, value);
    return false
  }

  this._length += hit.length;
  this._cache.set(key, hit);
  this._lruList.set(hit.lu, hit);

  if (this._length > this._max)
    trim(this);

  return true
};

LRUCache.prototype.has = function (key) {
  if (!this._cache.has(key)) return false
  var hit = this._cache.get(key);
  if (isStale(this, hit)) {
    return false
  }
  return true
};

LRUCache.prototype.get = function (key) {
  return get(this, key, true)
};

LRUCache.prototype.peek = function (key) {
  return get(this, key, false)
};

LRUCache.prototype.pop = function () {
  var hit = this._lruList.get(this._lru);
  del(this, hit);
  return hit || null
};

LRUCache.prototype.del = function (key) {
  del(this, this._cache.get(key));
};

LRUCache.prototype.load = function (arr) {
  //reset the cache
  this.reset();

  var now = Date.now();
  // A previous serialized cache has the most recent items first
  for (var l = arr.length - 1; l >= 0; l--) {
    var hit = arr[l];
    var expiresAt = hit.e || 0;
    if (expiresAt === 0) {
      // the item was created without expiration in a non aged cache
      this.set(hit.k, hit.v);
    } else {
      var maxAge = expiresAt - now;
      // dont add already expired items
      if (maxAge > 0) {
        this.set(hit.k, hit.v, maxAge);
      }
    }
  }
};

function get (self, key, doUse) {
  var hit = self._cache.get(key);
  if (hit) {
    if (isStale(self, hit)) {
      del(self, hit);
      if (!self._allowStale) hit = undefined;
    } else {
      if (doUse) use(self, hit);
    }
    if (hit) hit = hit.value;
  }
  return hit
}

function isStale(self, hit) {
  if (!hit || (!hit.maxAge && !self._maxAge)) return false
  var stale = false;
  var diff = Date.now() - hit.now;
  if (hit.maxAge) {
    stale = diff > hit.maxAge;
  } else {
    stale = self._maxAge && (diff > self._maxAge);
  }
  return stale;
}

function use (self, hit) {
  shiftLU(self, hit);
  hit.lu = self._mru;
  incMru(self);
  self._lruList.set(hit.lu, hit);
}

function trim (self) {
  if (self._length > self._max) {
    var keys = reverseKeys(self._lruList);
    for (var k = keys.length - 1; self._length > self._max; k--) {
      // We know that we're about to delete this one, and also
      // what the next least recently used key will be, so just
      // go ahead and set it now.
      self._lru = keys[k - 1];
      del(self, self._lruList.get(keys[k]));
    }
  }
}

function shiftLU (self, hit) {
  self._lruList.delete(hit.lu);
  if (hit.lu === self._lru)
    self._lru = reverseKeys(self._lruList).pop();
}

function del (self, hit) {
  if (hit) {
    if (self._dispose) self._dispose(hit.key, hit.value);
    self._length -= hit.length;
    self._cache.delete(hit.key);
    shiftLU(self, hit);
  }
}

// classy, since V8 prefers predictable objects.
function Entry (key, value, lu, length, now, maxAge) {
  this.key = key;
  this.value = value;
  this.lu = lu;
  this.length = length;
  this.now = now;
  if (maxAge) this.maxAge = maxAge;
}


// Incrementers and decrementers that loop at MAX_SAFE_INTEGER
// only relevant for the lu, lru, and mru counters, since they
// get touched a lot and can get very large. Also, since they
// only go upwards, and the sets will tend to be much smaller than
// the max, we can very well assume that a very small number comes
// after a very large number, rather than before it.
var maxSafeInt = Number.MAX_SAFE_INTEGER || 9007199254740991;
function intInc (number) {
  return (number === maxSafeInt) ? 0 : number + 1
}
function incMru (self) {
  do {
    self._mru = intInc(self._mru);
  } while (self._lruList.has(self._mru))
}

var sigmund_1 = sigmund;
function sigmund (subject, maxSessions) {
    maxSessions = maxSessions || 10;
    var notes = [];
    var analysis = '';
    var RE = RegExp;

    function psychoAnalyze (subject, session) {
        if (session > maxSessions) return;

        if (typeof subject === 'function' ||
            typeof subject === 'undefined') {
            return;
        }

        if (typeof subject !== 'object' || !subject ||
            (subject instanceof RE)) {
            analysis += subject;
            return;
        }

        if (notes.indexOf(subject) !== -1 || session === maxSessions) return;

        notes.push(subject);
        analysis += '{';
        Object.keys(subject).forEach(function (issue, _, __) {
            // pseudo-private values.  skip those.
            if (issue.charAt(0) === '_') return;
            var to = typeof subject[issue];
            if (to === 'function' || to === 'undefined') return;
            analysis += issue;
            psychoAnalyze(subject[issue], session + 1);
        });
    }
    psychoAnalyze(subject, 0);
    return analysis;
}

// vim: set softtabstop=4 shiftwidth=4:

var fnmatch$1 = createCommonjsModule(function (module, exports) {
// Based on minimatch.js by isaacs <https://npmjs.org/package/minimatch>

  var platform = typeof process === "object" ? process.platform : "win32";

  if (module) module.exports = minimatch;
  else exports.minimatch = minimatch;

  minimatch.Minimatch = Minimatch;

  var cache = minimatch.cache = new lruCache({max: 100})
    , GLOBSTAR = minimatch.GLOBSTAR = Minimatch.GLOBSTAR = {};

  var qmark = "[^/]"

    // * => any number of characters
    , star = qmark + "*?"

    // ** when dots are allowed.  Anything goes, except .. and .
    // not (^ or / followed by one or two dots followed by $ or /),
    // followed by anything, any number of times.
    , twoStarDot = "(?:(?!(?:\\\/|^)(?:\\.{1,2})($|\\\/)).)*?"

    // not a ^ or / followed by a dot,
    // followed by anything, any number of times.
    , twoStarNoDot = "(?:(?!(?:\\\/|^)\\.).)*?"

    // characters that need to be escaped in RegExp.
    , reSpecials = charSet("().*{}+?[]^$\\!");

// "abc" -> { a:true, b:true, c:true }
  function charSet (s) {
    return s.split("").reduce(function (set, c) {
      set[c] = true;
      return set
    }, {})
  }

// normalizes slashes.
  var slashSplit = /\/+/;

  minimatch.monkeyPatch = monkeyPatch;
  function monkeyPatch () {
    var desc = Object.getOwnPropertyDescriptor(String.prototype, "match");
    var orig = desc.value;
    desc.value = function (p) {
      if (p instanceof Minimatch) return p.match(this)
      return orig.call(this, p)
    };
    Object.defineProperty(String.prototype, desc);
  }

  minimatch.filter = filter;
  function filter (pattern, options) {
    options = options || {};
    return function (p, i, list) {
      return minimatch(p, pattern, options)
    }
  }

  function ext (a, b) {
    a = a || {};
    b = b || {};
    var t = {};
    Object.keys(b).forEach(function (k) {
      t[k] = b[k];
    });
    Object.keys(a).forEach(function (k) {
      t[k] = a[k];
    });
    return t
  }

  minimatch.defaults = function (def) {
    if (!def || !Object.keys(def).length) return minimatch

    var orig = minimatch;

    var m = function minimatch (p, pattern, options) {
      return orig.minimatch(p, pattern, ext(def, options))
    };

    m.Minimatch = function Minimatch (pattern, options) {
      return new orig.Minimatch(pattern, ext(def, options))
    };

    return m
  };

  Minimatch.defaults = function (def) {
    if (!def || !Object.keys(def).length) return Minimatch
    return minimatch.defaults(def).Minimatch
  };


  function minimatch (p, pattern, options) {
    if (typeof pattern !== "string") {
      throw new TypeError("glob pattern string required")
    }

    if (!options) options = {};

        // shortcut: comments match nothing.
    if (!options.nocomment && pattern.charAt(0) === "#") {
      return false
    }

    // "" only matches ""
    if (pattern.trim() === "") return p === ""

    return new Minimatch(pattern, options).match(p)
  }

  function Minimatch (pattern, options) {
    if (!(this instanceof Minimatch)) {
      return new Minimatch(pattern, options, cache)
    }

    if (typeof pattern !== "string") {
      throw new TypeError("glob pattern string required")
    }

    if (!options) options = {};

        // windows: need to use /, not \
        // On other platforms, \ is a valid (albeit bad) filename char.
    if (platform === "win32") {
      pattern = pattern.split("\\").join("/");
    }

    // lru storage.
    // these things aren't particularly big, but walking down the string
    // and turning it into a regexp can get pretty costly.
    var cacheKey = pattern + "\n" + sigmund_1(options);
    var cached = minimatch.cache.get(cacheKey);
    if (cached) return cached
    minimatch.cache.set(cacheKey, this);

    this.options = options;
    this.set = [];
    this.pattern = pattern;
    this.regexp = null;
    this.negate = false;
    this.comment = false;
    this.empty = false;

      // make the set of regexps etc.
    this.make();
  }

  Minimatch.prototype.make = make;
  function make () {
    // don't do it more than once.
    if (this._made) return

    var pattern = this.pattern;
    var options = this.options;

      // empty patterns and comments match nothing.
    if (!options.nocomment && pattern.charAt(0) === "#") {
      this.comment = true;
      return
    }
    if (!pattern) {
      this.empty = true;
      return
    }

    // step 1: figure out negation, etc.
    this.parseNegate();

      // step 2: expand braces
    var set = this.globSet = this.braceExpand();

    if (options.debug) console.error(this.pattern, set);

        // step 3: now we have a set, so turn each one into a series of path-portion
        // matching patterns.
        // These will be regexps, except in the case of "**", which is
        // set to the GLOBSTAR object for globstar behavior,
        // and will not contain any / characters
    set = this.globParts = set.map(function (s) {
        return s.split(slashSplit)
      });

    if (options.debug) console.error(this.pattern, set);

        // glob --> regexps
    set = set.map(function (s, si, set) {
      return s.map(this.parse, this)
    }, this);

    if (options.debug) console.error(this.pattern, set);

        // filter out everything that didn't compile properly.
    set = set.filter(function (s) {
      return -1 === s.indexOf(false)
    });

    if (options.debug) console.error(this.pattern, set);

    this.set = set;
  }

  Minimatch.prototype.parseNegate = parseNegate;
  function parseNegate () {
    var pattern = this.pattern
      , negate = false
      , options = this.options
      , negateOffset = 0;

    if (options.nonegate) return

    for ( var i = 0, l = pattern.length
      ; i < l && pattern.charAt(i) === "!"
      ; i ++) {
      negate = !negate;
      negateOffset ++;
    }

    if (negateOffset) this.pattern = pattern.substr(negateOffset);
    this.negate = negate;
  }

// Brace expansion:
// a{b,c}d -> abd acd
// a{b,}c -> abc ac
// a{0..3}d -> a0d a1d a2d a3d
// a{b,c{d,e}f}g -> abg acdfg acefg
// a{b,c}d{e,f}g -> abdeg acdeg abdeg abdfg
//
// Invalid sets are not expanded.
// a{2..}b -> a{2..}b
// a{b}c -> a{b}c
  minimatch.braceExpand = function (pattern, options) {
    return new Minimatch(pattern, options).braceExpand()
  };

  Minimatch.prototype.braceExpand = braceExpand;
  function braceExpand (pattern, options) {
    options = options || this.options;
    pattern = typeof pattern === "undefined"
        ? this.pattern : pattern;

    if (typeof pattern === "undefined") {
      throw new Error("undefined pattern")
    }

    if (options.nobrace ||
      !pattern.match(/\{.*\}/)) {
      // shortcut. no need to expand.
      return [pattern]
    }

    var escaping = false;

      // examples and comments refer to this crazy pattern:
      // a{b,c{d,e},{f,g}h}x{y,z}
      // expected:
      // abxy
      // abxz
      // acdxy
      // acdxz
      // acexy
      // acexz
      // afhxy
      // afhxz
      // aghxy
      // aghxz

      // everything before the first \{ is just a prefix.
      // So, we pluck that off, and work with the rest,
      // and then prepend it to everything we find.
    if (pattern.charAt(0) !== "{") {
      // console.error(pattern)
      var prefix = null;
      for (var i = 0, l = pattern.length; i < l; i ++) {
        var c = pattern.charAt(i);
          // console.error(i, c)
        if (c === "\\") {
          escaping = !escaping;
        } else if (c === "{" && !escaping) {
          prefix = pattern.substr(0, i);
          break
        }
      }

      // actually no sets, all { were escaped.
      if (prefix === null) {
        // console.error("no sets")
        return [pattern]
      }

      var tail = braceExpand(pattern.substr(i), options);
      return tail.map(function (t) {
        return prefix + t
      })
    }

    // now we have something like:
    // {b,c{d,e},{f,g}h}x{y,z}
    // walk through the set, expanding each part, until
    // the set ends.  then, we'll expand the suffix.
    // If the set only has a single member, then'll put the {} back

    // first, handle numeric sets, since they're easier
    var numset = pattern.match(/^\{(-?[0-9]+)\.\.(-?[0-9]+)\}/);
    if (numset) {
      // console.error("numset", numset[1], numset[2])
      var suf = braceExpand(pattern.substr(numset[0].length), options)
        , start = +numset[1]
        , end = +numset[2]
        , inc = start > end ? -1 : 1
        , set = [];
      for (var i = start; i != (end + inc); i += inc) {
        // append all the suffixes
        for (var ii = 0, ll = suf.length; ii < ll; ii ++) {
          set.push(i + suf[ii]);
        }
      }
      return set
    }

    // ok, walk through the set
    // We hope, somewhat optimistically, that there
    // will be a } at the end.
    // If the closing brace isn't found, then the pattern is
    // interpreted as braceExpand("\\" + pattern) so that
    // the leading \{ will be interpreted literally.
    var i = 1 // skip the \{
      , depth = 1
      , set = []
      , member = ""
      , sawEnd = false
      , escaping = false;

    function addMember () {
      set.push(member);
      member = "";
    }

    // console.error("Entering for")
    FOR: for (i = 1, l = pattern.length; i < l; i ++) {
        var c = pattern.charAt(i);
          // console.error("", i, c)

        if (escaping) {
          escaping = false;
          member += "\\" + c;
        } else {
          switch (c) {
            case "\\":
              escaping = true;
              continue

            case "{":
              depth ++;
              member += "{";
              continue

            case "}":
              depth --;
                // if this closes the actual set, then we're done
              if (depth === 0) {
                addMember();
                  // pluck off the close-brace
                i ++;
                break FOR
              } else {
                member += c;
                continue
              }

            case ",":
              if (depth === 1) {
                addMember();
              } else {
                member += c;
              }
              continue

            default:
              member += c;
              continue
          } // switch
        } // else
      } // for

    // now we've either finished the set, and the suffix is
    // pattern.substr(i), or we have *not* closed the set,
    // and need to escape the leading brace
    if (depth !== 0) {
      // console.error("didn't close", pattern)
      return braceExpand("\\" + pattern, options)
    }

    // x{y,z} -> ["xy", "xz"]
    // console.error("set", set)
    // console.error("suffix", pattern.substr(i))
    var suf = braceExpand(pattern.substr(i), options);
      // ["b", "c{d,e}","{f,g}h"] ->
      //   [["b"], ["cd", "ce"], ["fh", "gh"]]
    var addBraces = set.length === 1;
      // console.error("set pre-expanded", set)
    set = set.map(function (p) {
      return braceExpand(p, options)
    });
      // console.error("set expanded", set)


      // [["b"], ["cd", "ce"], ["fh", "gh"]] ->
      //   ["b", "cd", "ce", "fh", "gh"]
    set = set.reduce(function (l, r) {
      return l.concat(r)
    });

    if (addBraces) {
      set = set.map(function (s) {
        return "{" + s + "}"
      });
    }

    // now attach the suffixes.
    var ret = [];
    for (var i = 0, l = set.length; i < l; i ++) {
      for (var ii = 0, ll = suf.length; ii < ll; ii ++) {
        ret.push(set[i] + suf[ii]);
      }
    }
    return ret
  }

// parse a component of the expanded set.
// At this point, no pattern may contain "/" in it
// so we're going to return a 2d array, where each entry is the full
// pattern, split on '/', and then turned into a regular expression.
// A regexp is made at the end which joins each array with an
// escaped /, and another full one which joins each regexp with |.
//
// Following the lead of Bash 4.1, note that "**" only has special meaning
// when it is the *only* thing in a path portion.  Otherwise, any series
// of * is equivalent to a single *.  Globstar behavior is enabled by
// default, and can be disabled by setting options.noglobstar.
  Minimatch.prototype.parse = parse;
  var SUBPARSE = {};
  function parse (pattern, isSub) {
    var options = this.options;

      // shortcuts
    if (!options.noglobstar && pattern === "**") return GLOBSTAR
    if (pattern === "") return ""

    var re = ""
      , hasMagic = !!options.nocase
      , escaping = false
      // ? => one single character
      , patternListStack = []
      , plType
      , stateChar
      , inClass = false
      , reClassStart = -1
      , classStart = -1
      // . and .. never match anything that doesn't start with .,
      // even when options.dot is set.
      , patternStart = pattern.charAt(0) === "." ? "" // anything
        // not (start or / followed by . or .. followed by / or end)
        : options.dot ? "(?!(?:^|\\\/)\\.{1,2}(?:$|\\\/))"
          : "(?!\\.)";

    function clearStateChar () {
      if (stateChar) {
        // we had some state-tracking character
        // that wasn't consumed by this pass.
        switch (stateChar) {
          case "*":
            re += star;
            hasMagic = true;
            break
          case "?":
            re += qmark;
            hasMagic = true;
            break
          default:
            re += "\\"+stateChar;
            break
        }
        stateChar = false;
      }
    }

    for ( var i = 0, len = pattern.length, c
      ; (i < len) && (c = pattern.charAt(i))
      ; i ++ ) {

      if (options.debug) {
        console.error("%s\t%s %s %j", pattern, i, re, c);
      }

      // skip over any that are escaped.
      if (escaping && reSpecials[c]) {
        re += "\\" + c;
        escaping = false;
        continue
      }

      SWITCH: switch (c) {
          case "/":
            // completely not allowed, even escaped.
            // Should already be path-split by now.
            return false

          case "\\":
            clearStateChar();
            escaping = true;
            continue

          // the various stateChar values
          // for the "extglob" stuff.
          case "?":
          case "*":
          case "+":
          case "@":
          case "!":
            if (options.debug) {
              console.error("%s\t%s %s %j <-- stateChar", pattern, i, re, c);
            }

            // all of those are literals inside a class, except that
            // the glob [!a] means [^a] in regexp
            if (inClass) {
              if (c === "!" && i === classStart + 1) c = "^";
              re += c;
              continue
            }

            // if we already have a stateChar, then it means
            // that there was something like ** or +? in there.
            // Handle the stateChar, then proceed with this one.
            clearStateChar();
            stateChar = c;
              // if extglob is disabled, then +(asdf|foo) isn't a thing.
              // just clear the statechar *now*, rather than even diving into
              // the patternList stuff.
            if (options.noext) clearStateChar();
            continue

          case "(":
            if (inClass) {
              re += "(";
              continue
            }

            if (!stateChar) {
              re += "\\(";
              continue
            }

            plType = stateChar;
            patternListStack.push({ type: plType
              , start: i - 1
              , reStart: re.length });
              // negation is (?:(?!js)[^/]*)
            re += stateChar === "!" ? "(?:(?!" : "(?:";
            stateChar = false;
            continue

          case ")":
            if (inClass || !patternListStack.length) {
              re += "\\)";
              continue
            }

            hasMagic = true;
            re += ")";
            plType = patternListStack.pop().type;
              // negation is (?:(?!js)[^/]*)
              // The others are (?:<pattern>)<type>
            switch (plType) {
              case "!":
                re += "[^/]*?)";
                break
              case "?":
              case "+":
              case "*": re += plType;
              case "@": break // the default anyway
            }
            continue

          case "|":
            if (inClass || !patternListStack.length || escaping) {
              re += "\\|";
              escaping = false;
              continue
            }

            re += "|";
            continue

          // these are mostly the same in regexp and glob
          case "[":
            // swallow any state-tracking char before the [
            clearStateChar();

            if (inClass) {
              re += "\\" + c;
              continue
            }

            inClass = true;
            classStart = i;
            reClassStart = re.length;
            re += c;
            continue

          case "]":
            //  a right bracket shall lose its special
            //  meaning and represent itself in
            //  a bracket expression if it occurs
            //  first in the list.  -- POSIX.2 2.8.3.2
            if (i === classStart + 1 || !inClass) {
              re += "\\" + c;
              escaping = false;
              continue
            }

            // finish up the class.
            hasMagic = true;
            inClass = false;
            re += c;
            continue

          default:
            // swallow any state char that wasn't consumed
            clearStateChar();

            if (escaping) {
              // no need
              escaping = false;
            } else if (reSpecials[c]
              && !(c === "^" && inClass)) {
              re += "\\";
            }

            re += c;

        } // switch
    } // for


    // handle the case where we left a class open.
    // "[abc" is valid, equivalent to "\[abc"
    if (inClass) {
      // split where the last [ was, and escape it
      // this is a huge pita.  We now have to re-walk
      // the contents of the would-be class to re-translate
      // any characters that were passed through as-is
      var cs = pattern.substr(classStart + 1)
        , sp = this.parse(cs, SUBPARSE);
      re = re.substr(0, reClassStart) + "\\[" + sp[0];
      hasMagic = hasMagic || sp[1];
    }

    // handle the case where we had a +( thing at the *end*
    // of the pattern.
    // each pattern list stack adds 3 chars, and we need to go through
    // and escape any | chars that were passed through as-is for the regexp.
    // Go through and escape them, taking care not to double-escape any
    // | chars that were already escaped.
    var pl;
    while (pl = patternListStack.pop()) {
      var tail = re.slice(pl.reStart + 3);
        // maybe some even number of \, then maybe 1 \, followed by a |
      tail = tail.replace(/((?:\\{2})*)(\\?)\|/g, function (_, $1, $2) {
        if (!$2) {
          // the | isn't already escaped, so escape it.
          $2 = "\\";
        }

        // need to escape all those slashes *again*, without escaping the
        // one that we need for escaping the | character.  As it works out,
        // escaping an even number of slashes can be done by simply repeating
        // it exactly after itself.  That's why this trick works.
        //
        // I am sorry that you have to see this.
        return $1 + $1 + $2 + "|"
      });

        // console.error("tail=%j\n   %s", tail, tail)
      var t = pl.type === "*" ? star
          : pl.type === "?" ? qmark
            : "\\" + pl.type;

      hasMagic = true;
      re = re.slice(0, pl.reStart)
        + t + "\\("
        + tail;
    }

    // handle trailing things that only matter at the very end.
    clearStateChar();
    if (escaping) {
      // trailing \\
      re += "\\\\";
    }

    // only need to apply the nodot start if the re starts with
    // something that could conceivably capture a dot
    var addPatternStart = false;
    switch (re.charAt(0)) {
      case ".":
      case "[":
      case "(": addPatternStart = true;
    }

    // if the re is not "" at this point, then we need to make sure
    // it doesn't match against an empty path part.
    // Otherwise a/* will match a/, which it should not.
    if (re !== "" && hasMagic) re = "(?=.)" + re;

    if (addPatternStart) re = patternStart + re;

        // parsing just a piece of a larger pattern.
    if (isSub === SUBPARSE) {
      return [ re, hasMagic ]
    }

    // skip the regexp for non-magical patterns
    // unescape anything in it, though, so that it'll be
    // an exact match against a file etc.
    if (!hasMagic) {
      return globUnescape(pattern)
    }

    var flags = options.nocase ? "i" : ""
      , regExp = new RegExp("^" + re + "$", flags);

    regExp._glob = pattern;
    regExp._src = re;

    return regExp
  }

  minimatch.makeRe = function (pattern, options) {
    return new Minimatch(pattern, options || {}).makeRe()
  };

  Minimatch.prototype.makeRe = makeRe;
  function makeRe () {
    if (this.regexp || this.regexp === false) return this.regexp

        // at this point, this.set is a 2d array of partial
        // pattern strings, or "**".
        //
        // It's better to use .match().  This function shouldn't
        // be used, really, but it's pretty convenient sometimes,
        // when you just want to work with a regex.
    var set = this.set;

    if (!set.length) return this.regexp = false
    var options = this.options;

    var twoStar = options.noglobstar ? star
        : options.dot ? twoStarDot
          : twoStarNoDot
      , flags = options.nocase ? "i" : "";

    var re = set.map(function (pattern) {
      return pattern.map(function (p) {
        return (p === GLOBSTAR) ? twoStar
            : (typeof p === "string") ? regExpEscape(p)
              : p._src
      }).join("\\\/")
    }).join("|");

      // must match entire pattern
      // ending in a * or ** will make it less strict.
    re = "^(?:" + re + ")$";

      // can match anything, as long as it's not this.
    if (this.negate) re = "^(?!" + re + ").*$";

    try {
      return this.regexp = new RegExp(re, flags)
    } catch (ex) {
        return this.regexp = false
      }
  }

  minimatch.match = function (list, pattern, options) {
    var mm = new Minimatch(pattern, options);
    list = list.filter(function (f) {
      return mm.match(f)
    });
    if (options.nonull && !list.length) {
      list.push(pattern);
    }
    return list
  };

  Minimatch.prototype.match = match;
  function match (f, partial) {
    // console.error("match", f, this.pattern)
    // short-circuit in the case of busted things.
    // comments, etc.
    if (this.comment) return false
    if (this.empty) return f === ""

    if (f === "/" && partial) return true

    var options = this.options;

      // windows: need to use /, not \
      // On other platforms, \ is a valid (albeit bad) filename char.
    if (platform === "win32") {
      f = f.split("\\").join("/");
    }

    // treat the test path as a set of pathparts.
    f = f.split(slashSplit);
    if (options.debug) {
      console.error(this.pattern, "split", f);
    }

    // just ONE of the pattern sets in this.set needs to match
    // in order for it to be valid.  If negating, then just one
    // match means that we have failed.
    // Either way, return on the first hit.

    var set = this.set;
      // console.error(this.pattern, "set", set)

    for (var i = 0, l = set.length; i < l; i ++) {
      var pattern = set[i];
      var hit = this.matchOne(f, pattern, partial);
      if (hit) {
        if (options.flipNegate) return true
        return !this.negate
      }
    }

    // didn't get any hits.  this is success if it's a negative
    // pattern, failure otherwise.
    if (options.flipNegate) return false
    return this.negate
  }

// set partial to true to test if, for example,
// "/a/b" matches the start of "/*/b/*/d"
// Partial means, if you run out of file before you run
// out of pattern, then that's fine, as long as all
// the parts match.
  Minimatch.prototype.matchOne = function (file, pattern, partial) {
    var options = this.options;

    if (options.debug) {
      console.error("matchOne",
      { "this": this
        , file: file
        , pattern: pattern });
    }

    if (options.matchBase && pattern.length === 1) {
      file = path.basename(file.join("/")).split("/");
    }

    if (options.debug) {
      console.error("matchOne", file.length, pattern.length);
    }

    for ( var fi = 0
        , pi = 0
        , fl = file.length
        , pl = pattern.length
      ; (fi < fl) && (pi < pl)
      ; fi ++, pi ++ ) {

      if (options.debug) {
        console.error("matchOne loop");
      }
      var p = pattern[pi]
        , f = file[fi];

      if (options.debug) {
        console.error(pattern, p, f);
      }

      // should be impossible.
      // some invalid regexp stuff in the set.
      if (p === false) return false

      if (p === GLOBSTAR) {
        if (options.debug)
          console.error('GLOBSTAR', [pattern, p, f]);

            // "**"
            // a/**/b/**/c would match the following:
            // a/b/x/y/z/c
            // a/x/y/z/b/c
            // a/b/x/b/x/c
            // a/b/c
            // To do this, take the rest of the pattern after
            // the **, and see if it would match the file remainder.
            // If so, return success.
            // If not, the ** "swallows" a segment, and try again.
            // This is recursively awful.
            //
            // a/**/b/**/c matching a/b/x/y/z/c
            // - a matches a
            // - doublestar
            //   - matchOne(b/x/y/z/c, b/**/c)
            //     - b matches b
            //     - doublestar
            //       - matchOne(x/y/z/c, c) -> no
            //       - matchOne(y/z/c, c) -> no
            //       - matchOne(z/c, c) -> no
            //       - matchOne(c, c) yes, hit
        var fr = fi
          , pr = pi + 1;
        if (pr === pl) {
          if (options.debug)
            console.error('** at the end');
              // a ** at the end will just swallow the rest.
              // We have found a match.
              // however, it will not swallow /.x, unless
              // options.dot is set.
              // . and .. are *never* matched by **, for explosively
              // exponential reasons.
          for ( ; fi < fl; fi ++) {
            if (file[fi] === "." || file[fi] === ".." ||
            (!options.dot && file[fi].charAt(0) === ".")) return false
          }
          return true
        }

        // ok, let's see if we can swallow whatever we can.
        WHILE: while (fr < fl) {
            var swallowee = file[fr];

            if (options.debug) {
              console.error('\nglobstar while',
                file, fr, pattern, pr, swallowee);
            }

            // XXX remove this slice.  Just pass the start index.
            if (this.matchOne(file.slice(fr), pattern.slice(pr), partial)) {
              if (options.debug)
                console.error('globstar found match!', fr, fl, swallowee);
                  // found a match.
              return true
            } else {
              // can't swallow "." or ".." ever.
              // can only swallow ".foo" when explicitly asked.
              if (swallowee === "." || swallowee === ".." ||
              (!options.dot && swallowee.charAt(0) === ".")) {
                if (options.debug)
                  console.error("dot detected!", file, fr, pattern, pr);
                break WHILE
              }

              // ** swallows a segment, and continue.
              if (options.debug)
                console.error('globstar swallow a segment, and continue');
              fr ++;
            }
          }
        // no match was found.
        // However, in partial mode, we can't say this is necessarily over.
        // If there's more *pattern* left, then
        if (partial) {
          // ran out of file
          // console.error("\n>>> no match, partial?", file, fr, pattern, pr)
          if (fr === fl) return true
        }
        return false
      }

      // something other than **
      // non-magic patterns just have to match exactly
      // patterns with magic have been turned into regexps.
      var hit;
      if (typeof p === "string") {
        if (options.nocase) {
          hit = f.toLowerCase() === p.toLowerCase();
        } else {
          hit = f === p;
        }
        if (options.debug) {
          console.error("string match", p, f, hit);
        }
      } else {
        hit = f.match(p);
        if (options.debug) {
          console.error("pattern match", p, f, hit);
        }
      }

      if (!hit) return false
    }

    // Note: ending in / means that we'll get a final ""
    // at the end of the pattern.  This can only match a
    // corresponding "" at the end of the file.
    // If the file ends in /, then it can only match a
    // a pattern that ends in /, unless the pattern just
    // doesn't have any more for it. But, a/b/ should *not*
    // match "a/b/*", even though "" matches against the
    // [^/]*? pattern, except in partial mode, where it might
    // simply not be reached yet.
    // However, a/b/ should still satisfy a/*

    // now either we fell off the end of the pattern, or we're done.
    if (fi === fl && pi === pl) {
      // ran out of pattern and filename at the same time.
      // an exact hit!
      return true
    } else if (fi === fl) {
      // ran out of file, but still had pattern left.
      // this is ok if we're doing the match as part of
      // a glob fs traversal.
      return partial
    } else if (pi === pl) {
      // ran out of pattern, still have file left.
      // this is only acceptable if we're on the very last
      // empty segment of a file with a trailing slash.
      // a/* should match a/b/
      var emptyFileEnd = (fi === fl - 1) && (file[fi] === "");
      return emptyFileEnd
    }

    // should be unreachable.
    throw new Error("wtf?")
  };


// replace stuff like \* with *
  function globUnescape (s) {
    return s.replace(/\\(.)/g, "$1")
  }


  function regExpEscape (s) {
    return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
  }
});

var name$1 = "editorconfig";
var version$2 = "0.14.2";
var description$1 = "EditorConfig File Locator and Interpreter for Node.js";
var keywords = ["editorconfig","core"];
var main$1 = "editorconfig.js";
var bin$1 = {"editorconfig":"bin/editorconfig"};
var contributors = ["Hong Xu (topbug.net)","Jed Mao (https://github.com/jedmao/)","Trey Hunner (http://treyhunner.com)"];
var directories = {"bin":"./bin","lib":"./lib"};
var scripts$1 = {"pretest":"cmake .","test":"npm run lint && ctest .","test-verbose":"npm run lint && ctest -VV --output-on-failure .","lint":"eclint check --indent_size ignore editorconfig.js README.md \"bin/**\" \"lib/**\""};
var repository$1 = {"type":"git","url":"git://github.com/editorconfig/editorconfig-core-js.git"};
var bugs$1 = "https://github.com/editorconfig/editorconfig-core-js/issues";
var author$1 = "EditorConfig Team";
var license$1 = "MIT";
var dependencies$1 = {"bluebird":"^3.0.5","commander":"^2.9.0","lru-cache":"^3.2.0","semver":"^5.1.0","sigmund":"^1.0.1"};
var devDependencies$1 = {"eclint":"^1.1.5","mocha":"^2.3.4","should":"^7.1.1"};
var _package$2 = {
	name: name$1,
	version: version$2,
	description: description$1,
	keywords: keywords,
	main: main$1,
	bin: bin$1,
	contributors: contributors,
	directories: directories,
	scripts: scripts$1,
	repository: repository$1,
	bugs: bugs$1,
	author: author$1,
	license: license$1,
	dependencies: dependencies$1,
	devDependencies: devDependencies$1
};

var _package$3 = Object.freeze({
	name: name$1,
	version: version$2,
	description: description$1,
	keywords: keywords,
	main: main$1,
	bin: bin$1,
	contributors: contributors,
	directories: directories,
	scripts: scripts$1,
	repository: repository$1,
	bugs: bugs$1,
	author: author$1,
	license: license$1,
	dependencies: dependencies$1,
	devDependencies: devDependencies$1,
	default: _package$2
});

var pkg = ( _package$3 && _package$2 ) || _package$3;

var whenReadFile = bluebird_1.promisify(fs.readFile);





var knownProps = [
  'end_of_line',
  'indent_style',
  'indent_size',
  'insert_final_newline',
  'trim_trailing_whitespace',
  'charset'
].reduce(function (set, prop) {
  set[prop] = true;
  return set;
}, {});

function fnmatch(filepath, glob) {
  var matchOptions = {matchBase: true, dot: true, noext: true};
  glob = glob.replace(/\*\*/g, '{*,**/**/**}');
  return fnmatch$1(filepath, glob, matchOptions);
}

function getConfigFileNames(filepath, options) {
  var paths = [];
  do {
    filepath = path.dirname(filepath);
    paths.push(path.join(filepath, options.config));
  } while (filepath !== options.root);
  return paths;
}

function getFilepathRoot(filepath) {
  if (path.parse !== undefined) {
    // Node.js >= 0.11.15
    return path.parse(filepath).root;
  }
  if (os.platform() === 'win32') {
    return path.resolve(filepath).match(/^(\\\\[^\\]+\\)?[^\\]+\\/)[0];
  }
  return '/';
}

function processMatches(matches, version) {
  // Set indent_size to "tab" if indent_size is unspecified and
  // indent_style is set to "tab".
  if ("indent_style" in matches && matches.indent_style === "tab" &&
    !("indent_size" in matches) && semver.gte(version, "0.10.0")) {
    matches.indent_size = "tab";
  }

  // Set tab_width to indent_size if indent_size is specified and
  // tab_width is unspecified
  if ("indent_size" in matches && !("tab_width" in matches) &&
  matches.indent_size !== "tab")
    matches.tab_width = matches.indent_size;

  // Set indent_size to tab_width if indent_size is "tab"
  if("indent_size" in matches && "tab_width" in matches &&
  matches.indent_size === "tab")
    matches.indent_size = matches.tab_width;

  return matches;
}

function processOptions(options, filepath) {
  options = options || {};
  return {
    config: options.config || '.editorconfig',
    version: options.version || pkg.version,
    root: path.resolve(options.root || getFilepathRoot(filepath))
  };
}

function buildFullGlob(pathPrefix, glob) {
  switch (glob.indexOf('/')) {
    case -1: glob = "**/" + glob; break;
    case  0: glob = glob.substring(1); break;
  }
  return path.join(pathPrefix, glob);
}

function extendProps(props, options) {
  for (var key in options) {
    var value = options[key];
    key = key.toLowerCase();
    if (knownProps[key]) {
      value = value.toLowerCase();
    }
    try {
      value = JSON.parse(value);
    } catch(e) {}
    if (typeof value === 'undefined' || value === null) {
      // null and undefined are values specific to JSON (no special meaning
      // in editorconfig) & should just be returned as regular strings.
      value = String(value);
    }
    props[key] = value;
  }
  return props;
}

function parseFromFiles(filepath, files, options) {
  return getConfigsForFiles(files).then(function (configs) {
    return configs.reverse();
  }).reduce(function (matches, file) {
    var pathPrefix = path.dirname(file.name);
    file.contents.forEach(function (section) {
      var glob = section[0], options = section[1];
      if (!glob) return;
      var fullGlob = buildFullGlob(pathPrefix, glob);
      if (!fnmatch(filepath, fullGlob)) return;
      matches = extendProps(matches, options);
    });
    return matches;
  }, {}).then(function (matches) {
    return processMatches(matches, options.version);
  });
}

function parseFromFilesSync(filepath, files, options) {
  var configs = getConfigsForFilesSync(files);
  configs.reverse();
  var matches = {};
  configs.forEach(function(config) {
    var pathPrefix = path.dirname(config.name);
    config.contents.forEach(function(section) {
      var glob = section[0], options = section[1];
      if (!glob) return;
      var fullGlob = buildFullGlob(pathPrefix, glob);
      if (!fnmatch(filepath, fullGlob)) return;
      matches = extendProps(matches, options);
    });
  });
  return processMatches(matches, options.version);
}

function StopReduce(array) {
  this.array = array;
}

StopReduce.prototype = Object.create(Error.prototype);

function getConfigsForFiles(files) {
  return bluebird_1.reduce(files, function (configs, file) {
    var contents = ini.parseString(file.contents);
    configs.push({
      name: file.name,
      contents: contents
    });
    if ((contents[0][1].root || '').toLowerCase() === 'true') {
      return bluebird_1.reject(new StopReduce(configs));
    }
    return configs;
  }, []).catch(StopReduce, function (stop) {
    return stop.array;
  });
}

function getConfigsForFilesSync(files) {
  var configs = [];
  for (var i in files) {
    var file = files[i];
    var contents = ini.parseString(file.contents);
    configs.push({
      name: file.name,
      contents: contents
    });
    if ((contents[0][1].root || '').toLowerCase() === 'true') {
      break;
    }
  }
  return configs;
}

function readConfigFiles(filepaths) {
  return bluebird_1.map(filepaths, function (path$$2) {
    return whenReadFile(path$$2, 'utf-8').catch(function () {
      return '';
    }).then(function (contents) {
      return {name: path$$2, contents: contents};
    });
  });
}

function readConfigFilesSync(filepaths) {
  var files = [];
  var file;
  filepaths.forEach(function(filepath) {
    try {
      file = fs.readFileSync(filepath, 'utf8');
    } catch (e) {
      file = '';
    }
    files.push({name: filepath, contents: file});
  });
  return files;
}

var parseFromFiles_1 = function (filepath, files, options) {
  return new bluebird_1 (function (resolve, reject) {
    filepath = path.resolve(filepath);
    options = processOptions(options, filepath);
    resolve(parseFromFiles(filepath, files, options));
  });
};

var parseFromFilesSync_1 = function (filepath, files, options) {
  filepath = path.resolve(filepath);
  options = processOptions(options, filepath);
  return parseFromFilesSync(filepath, files, options);
};

var parse$6 = function (filepath, options) {
  return new bluebird_1 (function (resolve, reject) {
    filepath = path.resolve(filepath);
    options = processOptions(options, filepath);
    var filepaths = getConfigFileNames(filepath, options);
    var files = readConfigFiles(filepaths);
    resolve(parseFromFiles(filepath, files, options));
  });
};

var parseSync = function (filepath, options) {
    filepath = path.resolve(filepath);
    options = processOptions(options, filepath);
    var filepaths = getConfigFileNames(filepath, options);
    var files = readConfigFilesSync(filepaths);
    return parseFromFilesSync(filepath, files, options);
};

var parseString = ini.parseString;

var editorconfig = {
	parseFromFiles: parseFromFiles_1,
	parseFromFilesSync: parseFromFilesSync_1,
	parse: parse$6,
	parseSync: parseSync,
	parseString: parseString
};

var editorconfigToPrettier = editorConfigToPrettier;

function editorConfigToPrettier(editorConfig) {
  if (!editorConfig || Object.keys(editorConfig).length === 0) {
    return null;
  }

  const result = {};

  if (editorConfig.indent_style) {
    result.useTabs = editorConfig.indent_style === "tab";
  }

  if (editorConfig.indent_size === "tab") {
    result.useTabs = true;
  }

  if (result.useTabs && editorConfig.tab_width) {
    result.tabWidth = editorConfig.tab_width;
  } else if (
    editorConfig.indent_style === "space" &&
    editorConfig.indent_size &&
    editorConfig.indent_size !== "tab"
  ) {
    result.tabWidth = editorConfig.indent_size;
  } else if (editorConfig.tab_width !== undefined) {
    result.tabWidth = editorConfig.tab_width;
  }

  if (editorConfig.max_line_length && editorConfig.max_line_length !== "off") {
    result.printWidth = editorConfig.max_line_length;
  }

  if (editorConfig.quote_type === "single") {
    result.singleQuote = true;
  } else if (editorConfig.quote_type === "double") {
    result.singleQuote = false;
  }

  return result;
}

function markerExists (files, markers) {
  return markers.some(function(marker) {
    return files.some(function(file) {
      return file === marker;
    });
  });
}

function traverseFolder (directory, levels, markers) {
  var files = fs.readdirSync(directory);
  if (levels === 0) {
    return null;
  } else if (markerExists(files, markers)) {
    return directory;
  } else {
    return traverseFolder(path.resolve(directory, '..'), levels - 1, markers);
  }
}

var findProjectRoot = function findRoot(dir, opts) { 
  if (!dir) throw new Error("Directory not defined");
  opts = opts || {};
  var levels  = opts.maxDepth || findRoot.MAX_DEPTH;
  var markers = opts.markers  || findRoot.MARKERS;
  return traverseFolder(dir, levels, markers); 
};

var MAX_DEPTH = 9;
var MARKERS   = [ '.git', '.hg' ];

findProjectRoot.MAX_DEPTH = MAX_DEPTH;
findProjectRoot.MARKERS = MARKERS;

var resolveConfigEditorconfig = createCommonjsModule(function (module) {
"use strict";








const maybeParse = (filePath, config, parse) => {
  const root = findProjectRoot(path.dirname(path.resolve(filePath)));
  return filePath && !config && parse(filePath, { root });
};

const editorconfigAsyncNoCache = (filePath, config) => {
  return Promise.resolve(maybeParse(filePath, config, editorconfig.parse)).then(
    editorconfigToPrettier
  );
};
const editorconfigAsyncWithCache = mem(editorconfigAsyncNoCache);

const editorconfigSyncNoCache = (filePath, config) => {
  return editorconfigToPrettier(
    maybeParse(filePath, config, editorconfig.parseSync)
  );
};
const editorconfigSyncWithCache = mem(editorconfigSyncNoCache);

function getLoadFunction(opts) {
  if (!opts.editorconfig) {
    return () => null;
  }

  if (opts.sync) {
    return opts.cache ? editorconfigSyncWithCache : editorconfigSyncNoCache;
  }

  return opts.cache ? editorconfigAsyncWithCache : editorconfigAsyncNoCache;
}

function clearCache() {
  mem.clear(editorconfigSyncWithCache);
  mem.clear(editorconfigAsyncWithCache);
}

module.exports = {
  getLoadFunction,
  clearCache
};
});

var thirdParty$1 = ( thirdParty && thirdParty__default ) || thirdParty;

var resolveConfig_1 = createCommonjsModule(function (module) {
"use strict";








const getExplorerMemoized = mem(opts =>
  thirdParty$1.cosmiconfig("prettier", {
    sync: opts.sync,
    cache: opts.cache,
    rcExtensions: true,
    transform: result => {
      if (result && result.config) {
        delete result.config.$schema;
      }
      return result;
    }
  })
);

/** @param {{ cache: boolean, sync: boolean }} opts */
function getLoadFunction(opts) {
  // Normalize opts before passing to a memoized function
  opts = Object.assign({ sync: false, cache: false }, opts);
  return getExplorerMemoized(opts).load;
}

function _resolveConfig(filePath, opts, sync) {
  opts = Object.assign({ useCache: true }, opts);
  const loadOpts = {
    cache: !!opts.useCache,
    sync: !!sync,
    editorconfig: !!opts.editorconfig
  };
  const load = getLoadFunction(loadOpts);
  const loadEditorConfig = resolveConfigEditorconfig.getLoadFunction(loadOpts);
  const arr = [load, loadEditorConfig].map(l => l(filePath, opts.config));

  const unwrapAndMerge = arr => {
    const result = arr[0];
    const editorConfigured = arr[1];
    const merged = Object.assign(
      {},
      editorConfigured,
      mergeOverrides(Object.assign({}, result), filePath)
    );

    if (!result && !editorConfigured) {
      return null;
    }

    return merged;
  };

  if (loadOpts.sync) {
    return unwrapAndMerge(arr);
  }

  return Promise.all(arr).then(unwrapAndMerge);
}

const resolveConfig = (filePath, opts) => _resolveConfig(filePath, opts, false);

resolveConfig.sync = (filePath, opts) => _resolveConfig(filePath, opts, true);

function clearCache() {
  mem.clear(getExplorerMemoized);
  resolveConfigEditorconfig.clearCache();
}

function resolveConfigFile(filePath) {
  const load = getLoadFunction({ sync: false });
  return load(filePath).then(result => {
    return result ? result.filepath : null;
  });
}

resolveConfigFile.sync = filePath => {
  const load = getLoadFunction({ sync: true });
  const result = load(filePath);
  return result ? result.filepath : null;
};

function mergeOverrides(configResult, filePath) {
  const options = Object.assign({}, configResult.config);
  if (filePath && options.overrides) {
    const relativeFilePath = path.relative(
      path.dirname(configResult.filepath),
      filePath
    );
    for (const override of options.overrides) {
      if (
        pathMatchesGlobs(
          relativeFilePath,
          override.files,
          override.excludeFiles
        )
      ) {
        Object.assign(options, override.options);
      }
    }
  }

  delete options.overrides;
  return options;
}

// Based on eslint: https://github.com/eslint/eslint/blob/master/lib/config/config-ops.js
function pathMatchesGlobs(filePath, patterns, excludedPatterns) {
  const patternList = [].concat(patterns);
  const excludedPatternList = [].concat(excludedPatterns || []);
  const opts = { matchBase: true };

  return (
    patternList.some(pattern => minimatch_1(filePath, pattern, opts)) &&
    !excludedPatternList.some(excludedPattern =>
      minimatch_1(filePath, excludedPattern, opts)
    )
  );
}

module.exports = {
  resolveConfig,
  resolveConfigFile,
  clearCache
};
});

const version = require$$0$12.version;


const getSupportInfo = support.getSupportInfo;



const normalizeOptions = options$8.normalize;





const printDocToString = doc.printer.printDocToString;
const printDocToDebug = doc.debug.printDocToDebug;

function guessLineEnding(text) {
  const index = text.indexOf("\n");
  if (index >= 0 && text.charAt(index - 1) === "\r") {
    return "\r\n";
  }
  return "\n";
}

function attachComments(text, ast, opts) {
  const astComments = ast.comments;
  if (astComments) {
    delete ast.comments;
    comments.attach(astComments, ast, text, opts);
  }
  ast.tokens = [];
  opts.originalText = text.trimRight();
  return astComments;
}

function hasPragma(text) {
  const pragmas = Object.keys(build.parse(build.extract(text)));
  return pragmas.indexOf("prettier") !== -1 || pragmas.indexOf("format") !== -1;
}

function ensureAllCommentsPrinted(astComments) {
  if (!astComments) {
    return;
  }

  for (let i = 0; i < astComments.length; ++i) {
    if (astComments[i].value.trim() === "prettier-ignore") {
      // If there's a prettier-ignore, we're not printing that sub-tree so we
      // don't know if the comments was printed or not.
      return;
    }
  }

  astComments.forEach(comment => {
    if (!comment.printed) {
      throw new Error(
        'Comment "' +
          comment.value.trim() +
          '" was not printed. Please report this error!'
      );
    }
    delete comment.printed;
  });
}

function formatWithCursor(text, opts, addAlignmentSize) {
  if (opts.requirePragma && !hasPragma(text)) {
    return { formatted: text };
  }

  const UTF8BOM = 0xfeff;
  const hasUnicodeBOM = text.charCodeAt(0) === UTF8BOM;
  if (hasUnicodeBOM) {
    text = text.substring(1);
  }

  if (
    opts.insertPragma &&
    !hasPragma(text) &&
    opts.rangeStart === 0 &&
    opts.rangeEnd === Infinity
  ) {
    const parsedDocblock = build.parseWithComments(build.extract(text));
    const pragmas = Object.assign({ format: "" }, parsedDocblock.pragmas);
    const newDocblock = build.print({
      pragmas,
      comments: parsedDocblock.comments.replace(/^(\s+?\r?\n)+/, "") // remove leading newlines
    });
    const strippedText = build.strip(text);
    const separatingNewlines = strippedText.startsWith("\n") ? "\n" : "\n\n";
    text = newDocblock + separatingNewlines + strippedText;
  }

  addAlignmentSize = addAlignmentSize || 0;

  const result = parser$3.parse(text, opts);
  const ast = result.ast;
  text = result.text;

  const formattedRangeOnly = formatRange(text, opts, ast);
  if (formattedRangeOnly) {
    return { formatted: formattedRangeOnly };
  }

  let cursorOffset;
  if (opts.cursorOffset >= 0) {
    const cursorNodeAndParents = findNodeAtOffset(ast, opts.cursorOffset, opts);
    const cursorNode = cursorNodeAndParents.node;
    if (cursorNode) {
      cursorOffset = opts.cursorOffset - util$1.locStart(cursorNode);
      opts.cursorNode = cursorNode;
    }
  }

  const astComments = attachComments(text, ast, opts);
  const doc$$1 = astToDoc(ast, opts, addAlignmentSize);
  opts.newLine = guessLineEnding(text);
  const toStringResult = printDocToString(doc$$1, opts);
  let str = toStringResult.formatted;
  if (hasUnicodeBOM) {
    str = String.fromCharCode(UTF8BOM) + str;
  }
  const cursorOffsetResult = toStringResult.cursor;
  ensureAllCommentsPrinted(astComments);
  // Remove extra leading indentation as well as the added indentation after last newline
  if (addAlignmentSize > 0) {
    return { formatted: str.trim() + opts.newLine };
  }

  if (cursorOffset !== undefined) {
    return {
      formatted: str,
      cursorOffset: cursorOffsetResult + cursorOffset
    };
  }

  return { formatted: str };
}

function format(text, opts, addAlignmentSize) {
  return formatWithCursor(text, opts, addAlignmentSize).formatted;
}

function findSiblingAncestors(startNodeAndParents, endNodeAndParents) {
  let resultStartNode = startNodeAndParents.node;
  let resultEndNode = endNodeAndParents.node;

  if (resultStartNode === resultEndNode) {
    return {
      startNode: resultStartNode,
      endNode: resultEndNode
    };
  }

  for (const endParent of endNodeAndParents.parentNodes) {
    if (
      endParent.type !== "Program" &&
      endParent.type !== "File" &&
      util$1.locStart(endParent) >= util$1.locStart(startNodeAndParents.node)
    ) {
      resultEndNode = endParent;
    } else {
      break;
    }
  }

  for (const startParent of startNodeAndParents.parentNodes) {
    if (
      startParent.type !== "Program" &&
      startParent.type !== "File" &&
      util$1.locEnd(startParent) <= util$1.locEnd(endNodeAndParents.node)
    ) {
      resultStartNode = startParent;
    } else {
      break;
    }
  }

  return {
    startNode: resultStartNode,
    endNode: resultEndNode
  };
}

function findNodeAtOffset(node, offset, options, predicate, parentNodes) {
  predicate = predicate || (() => true);
  parentNodes = parentNodes || [];
  const start = util$1.locStart(node);
  const end = util$1.locEnd(node);
  if (start <= offset && offset <= end) {
    for (const childNode of comments.getSortedChildNodes(
      node,
      undefined /* text */,
      options
    )) {
      const childResult = findNodeAtOffset(
        childNode,
        offset,
        options,
        predicate,
        [node].concat(parentNodes)
      );
      if (childResult) {
        return childResult;
      }
    }

    if (predicate(node)) {
      return {
        node: node,
        parentNodes: parentNodes
      };
    }
  }
}

// See https://www.ecma-international.org/ecma-262/5.1/#sec-A.5
function isSourceElement(opts, node) {
  if (node == null) {
    return false;
  }
  // JS and JS like to avoid repetitions
  const jsSourceElements = [
    "FunctionDeclaration",
    "BlockStatement",
    "BreakStatement",
    "ContinueStatement",
    "DebuggerStatement",
    "DoWhileStatement",
    "EmptyStatement",
    "ExpressionStatement",
    "ForInStatement",
    "ForStatement",
    "IfStatement",
    "LabeledStatement",
    "ReturnStatement",
    "SwitchStatement",
    "ThrowStatement",
    "TryStatement",
    "VariableDeclaration",
    "WhileStatement",
    "WithStatement",
    "ClassDeclaration", // ES 2015
    "ImportDeclaration", // Module
    "ExportDefaultDeclaration", // Module
    "ExportNamedDeclaration", // Module
    "ExportAllDeclaration", // Module
    "TypeAlias", // Flow
    "InterfaceDeclaration", // Flow, Typescript
    "TypeAliasDeclaration", // Typescript
    "ExportAssignment", // Typescript
    "ExportDeclaration" // Typescript
  ];
  const jsonSourceElements = [
    "ObjectExpression",
    "ArrayExpression",
    "StringLiteral",
    "NumericLiteral",
    "BooleanLiteral",
    "NullLiteral"
  ];
  const graphqlSourceElements = [
    "OperationDefinition",
    "FragmentDefinition",
    "VariableDefinition",
    "TypeExtensionDefinition",
    "ObjectTypeDefinition",
    "FieldDefinition",
    "DirectiveDefinition",
    "EnumTypeDefinition",
    "EnumValueDefinition",
    "InputValueDefinition",
    "InputObjectTypeDefinition",
    "SchemaDefinition",
    "OperationTypeDefinition",
    "InterfaceTypeDefinition",
    "UnionTypeDefinition",
    "ScalarTypeDefinition"
  ];
  switch (opts.parser) {
    case "flow":
    case "babylon":
    case "typescript":
      return jsSourceElements.indexOf(node.type) > -1;
    case "json":
      return jsonSourceElements.indexOf(node.type) > -1;
    case "graphql":
      return graphqlSourceElements.indexOf(node.kind) > -1;
  }
  return false;
}

function calculateRange(text, opts, ast) {
  // Contract the range so that it has non-whitespace characters at its endpoints.
  // This ensures we can format a range that doesn't end on a node.
  const rangeStringOrig = text.slice(opts.rangeStart, opts.rangeEnd);
  const startNonWhitespace = Math.max(
    opts.rangeStart + rangeStringOrig.search(/\S/),
    opts.rangeStart
  );
  let endNonWhitespace;
  for (
    endNonWhitespace = opts.rangeEnd;
    endNonWhitespace > opts.rangeStart;
    --endNonWhitespace
  ) {
    if (text[endNonWhitespace - 1].match(/\S/)) {
      break;
    }
  }

  const startNodeAndParents = findNodeAtOffset(
    ast,
    startNonWhitespace,
    opts,
    node => isSourceElement(opts, node)
  );
  const endNodeAndParents = findNodeAtOffset(
    ast,
    endNonWhitespace,
    opts,
    node => isSourceElement(opts, node)
  );

  if (!startNodeAndParents || !endNodeAndParents) {
    return {
      rangeStart: 0,
      rangeEnd: 0
    };
  }

  const siblingAncestors = findSiblingAncestors(
    startNodeAndParents,
    endNodeAndParents
  );
  const startNode = siblingAncestors.startNode;
  const endNode = siblingAncestors.endNode;
  const rangeStart = Math.min(util$1.locStart(startNode), util$1.locStart(endNode));
  const rangeEnd = Math.max(util$1.locEnd(startNode), util$1.locEnd(endNode));

  return {
    rangeStart: rangeStart,
    rangeEnd: rangeEnd
  };
}

function formatRange(text, opts, ast) {
  if (opts.rangeStart <= 0 && text.length <= opts.rangeEnd) {
    return;
  }

  const range = calculateRange(text, opts, ast);
  const rangeStart = range.rangeStart;
  const rangeEnd = range.rangeEnd;
  const rangeString = text.slice(rangeStart, rangeEnd);

  // Try to extend the range backwards to the beginning of the line.
  // This is so we can detect indentation correctly and restore it.
  // Use `Math.min` since `lastIndexOf` returns 0 when `rangeStart` is 0
  const rangeStart2 = Math.min(
    rangeStart,
    text.lastIndexOf("\n", rangeStart) + 1
  );
  const indentString = text.slice(rangeStart2, rangeStart);

  const alignmentSize = util$1.getAlignmentSize(indentString, opts.tabWidth);

  const rangeFormatted = format(
    rangeString,
    Object.assign({}, opts, {
      rangeStart: 0,
      rangeEnd: Infinity,
      printWidth: opts.printWidth - alignmentSize
    }),
    alignmentSize
  );

  // Since the range contracts to avoid trailing whitespace,
  // we need to remove the newline that was inserted by the `format` call.
  const rangeTrimmed = rangeFormatted.trimRight();

  return text.slice(0, rangeStart) + rangeTrimmed + text.slice(rangeEnd);
}

var prettier = {
  formatWithCursor: function(text, opts) {
    return formatWithCursor(text, normalizeOptions(opts));
  },

  format: function(text, opts) {
    return format(text, normalizeOptions(opts));
  },

  check: function(text, opts) {
    try {
      const formatted = format(text, normalizeOptions(opts));
      return formatted === text;
    } catch (e) {
      return false;
    }
  },

  doc,

  resolveConfig: resolveConfig_1.resolveConfig,
  clearConfigCache: resolveConfig_1.clearCache,

  getSupportInfo,

  version,

  /* istanbul ignore next */
  __debug: {
    parse: function(text, opts) {
      opts = normalizeOptions(opts);
      return parser$3.parse(text, opts);
    },
    formatAST: function(ast, opts) {
      opts = normalizeOptions(opts);
      const doc$$1 = astToDoc(ast, opts);
      const str = printDocToString(doc$$1, opts);
      return str;
    },
    // Doesn't handle shebang for now
    formatDoc: function(doc$$1, opts) {
      opts = normalizeOptions(opts);
      const debug = printDocToDebug(doc$$1);
      const str = format(debug, opts);
      return str;
    },
    printToDoc: function(text, opts) {
      opts = normalizeOptions(opts);
      const result = parser$3.parse(text, opts);
      const ast = result.ast;
      text = result.text;
      attachComments(text, ast, opts);
      const doc$$1 = astToDoc(ast, opts);
      return doc$$1;
    },
    printDocToString: function(doc$$1, opts) {
      opts = normalizeOptions(opts);
      const str = printDocToString(doc$$1, opts);
      return str;
    }
  }
};

module.exports = prettier;
