/**
 * @param {import("@textlint/types").TextlintRuleContext} context
 * @param {import("@textlint/types").TextlintRuleOptions<{ chunkSize?: number, delimiter?: string}>} options
 * @returns {import("@textlint/types").TextlintRuleCreator}
 */
export default function (context, options = {}) {
  const { Syntax, RuleError, report, getSource, locator } = context;
  const chunkSize = options.chunkSize || 2000;
  const delimiter = options.delimiter || `page: `;

  return {
    [Syntax.Document](node) {
      // "Str" node
      const text = getSource(node); // Get text
      console.log("text: ", text.length);
      // console.log(chunkSize, delimiter, text);
      const regex = new RegExp(`${delimiter}`, "gm");
      const matches = text.matchAll(regex);
      let last = 0;

      for (const match of matches) {
        if (match.index - last > chunkSize) {
          console.log("ERROR: ", match.index, last, delimiter.length);
          const index = match.index ?? 0;
          const matchRange = [last + delimiter.length, index];
          const ruleError = new RuleError("Found Error.", {
            padding: locator.range(matchRange),
          });
          report(node, ruleError);
        }
        last = match.index ?? 0;
      }
    },
  };
}
