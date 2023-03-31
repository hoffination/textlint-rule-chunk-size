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
    [Syntax.Str](node) {
      // "Str" node
      const text = getSource(node); // Get text
      console.log(chunkSize, delimiter, text);
      const regex = new RegExp(
        `(?<=${delimiter})[^(${delimiter})]{${chunkSize},}(${delimiter})`,
        "g"
      );
      const matches = text.matchAll(regex);
      for (const match of matches) {
        const index = match.index ?? 0;
        const matchRange = [index, index + match[0].length];
        const ruleError = new RuleError("Found Error.", {
          padding: locator.range(matchRange),
        });
        report(node, ruleError);
      }
    },
  };
}
