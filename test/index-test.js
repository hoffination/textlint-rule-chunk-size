import TextLintTester from "textlint-tester";
import rule from "../src/index";

const tester = new TextLintTester();
// ruleName, rule, { valid, invalid }
tester.run("chunk size rule", rule, {
  valid: [
    // no problem
    "page: 123\npage: 345",
    {
      text: "it should be ok",
      options: {
        chunkSize: 10,
        delimiter: "page: ",
      },
    },
  ],
  invalid: [
    // single match
    {
      text: "page: 123456789012\npage: 345",
      options: {
        chunkSize: 10,
        delimiter: "page: ",
      },
      errors: [
        {
          message: "Found Error.",
          range: [6, 25],
        },
      ],
    },
    {
      text: "p: 123456789012\np: 345",
      options: {
        chunkSize: 10,
        delimiter: "p: ",
      },
      errors: [
        {
          message: "Found Error.",
          range: [3, 19],
        },
      ],
    },
  ],
});

// tester.run("chunk size rule", rule, {
//   valid: [
//     // no problem
//     "p: 123\np: 345",
//     {
//       text: "it should be ok",
//       options: {
//         chunkSize: 10,
//         delimiter: "p: ",
//       },
//     },
//   ],
//   invalid: [
//     // single match
//     {
//       text: "p: 123456789012\np: 345",
//       errors: [
//         {
//           message: "Found Error.",
//           range: [6, 25],
//         },
//       ],
//     },
//   ],
// });
