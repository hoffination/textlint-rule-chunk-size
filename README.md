# textlint-rule-chunk-size



## Install

Install with [npm](https://www.npmjs.com/):

    npm install textlint-rule-chunk-size

## Usage

Via `.textlintrc.json`(Recommended)

```json
{
    "rules": {
        "chunk-size": {
            "chunkSize": 2000,
            "delimiter": "page: "
        }
    }
}
```

`chunkSize` is the maximum number of characters in a chunk. More than this number will throw a lint error.

`delimiter` is the string that separates chunks.

Via CLI

```
textlint --rule chunk-size README.md
```

### Build

Builds source codes for publish to the `lib` folder.
You can write ES2015+ source codes in `src/` folder.

    npm run build

### Tests

Run test code in `test` folder.
Test textlint rule by [textlint-tester](https://github.com/textlint/textlint-tester).

    npm test

## License

ISC © 
