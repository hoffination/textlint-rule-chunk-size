import TextLintTester from "textlint-tester";
import rule from "../src/index";

const longString = `page: 1

DUNGEON MASTERS GUIDE

SPECIAL REFERENCE WORK

DUNGEON MASTERS GUIDE

A COMPILED VOLUME OF INFORMATION PRIMARILY USED BY ADVANCED DUNGEONS & DRAGONS'" GAME REFEREES, INCLUDING: COMBAT TABLES; MONSTER LISTS AND ENCOUNTERS; TREASURE AND MAGIC TABLES AND DESCRIPTIONS; RANDOM DUNGEON GENERATION; RANDOM WILDERNESS TERRAIN GENERATION; SUGGESTIONS ON GAMEMASTERING; AND MORE.

By Gary Gygax © 1979 — T5R Gaines

All rights reserved

Illustrations by David C. Sutherland III D. A. Trampier Darlene Pekul Will McLean David S. La Force Erol Otus

Cover by David C. Sutherland III

FOREWORD

Is Dungeon Mastering an art or a science? An interesting question!

If you consider the pure creative aspect of starting from scratch, the "personal touch" of individual flair that goes into preparing and running a unique campaign, or the particular style of moderating a game adventure, then Dungeon Mastering may indeed be thought of as an art.

If you consider the aspect of experimentation, the painstaking effort of preparation and attention to detail, and the continuing search for new ideas and approaches, then Dungeon Mastering is perhaps more like a science — not always exacting in a literal sense, but exacting in terms of what is required to do the job well.page: 1`;

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
      description: "match 10 error",
      text: "page: 123456789012\npage: 345",
      options: {
        chunkSize: 10,
        delimiter: "page: ",
      },
      errors: [
        {
          message: "Found Error.",
          range: [6, 19],
        },
      ],
    },
    {
      description: "match 10 different delimiter error",
      text: "p: 123456789012\np: 345",
      options: {
        chunkSize: 10,
        delimiter: "p: ",
      },
      errors: [
        {
          message: "Found Error.",
          range: [3, 16],
        },
      ],
    },
    {
      description: "match long string error",
      text: longString,
      options: {
        chunkSize: 10,
        delimiter: "page: ",
      },
      errors: [
        {
          message: "Found Error.",
          range: [6, 1263],
        },
      ],
    },
  ],
});
