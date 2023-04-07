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
      const text = getSource(node);
      const regex = new RegExp(`${delimiter}`, "g");
      let startIndex = 0;
      let match;
      let isFirstMatch = true;
      let lastErrorStart = -1;

      while ((match = regex.exec(text)) !== null) {
        const endIndex = match.index;
        const contentLength =
          endIndex - startIndex - (isFirstMatch ? 0 : delimiter.length);

        if (contentLength > chunkSize) {
          if (lastErrorStart === -1) {
            lastErrorStart = startIndex + (isFirstMatch ? 0 : delimiter.length);
          }
        } else {
          if (lastErrorStart !== -1) {
            const matchRange = [lastErrorStart, endIndex];
            const ruleError = new RuleError("Found Error.", {
              padding: locator.range(matchRange),
            });
            report(node, ruleError);
            lastErrorStart = -1;
          }
        }
        startIndex = endIndex;
        isFirstMatch = false;
      }

      // Check the last segment
      const remainingLength = text.length - startIndex - delimiter.length;
      if (remainingLength > chunkSize) {
        if (lastErrorStart === -1) {
          lastErrorStart = startIndex + delimiter.length;
        }
        const matchRange = [lastErrorStart, text.length];
        const ruleError = new RuleError("Found Error.", {
          padding: locator.range(matchRange),
        });
        report(node, ruleError);
      } else if (lastErrorStart !== -1) {
        const matchRange = [lastErrorStart, startIndex];
        const ruleError = new RuleError("Found Error.", {
          padding: locator.range(matchRange),
        });
        report(node, ruleError);
      }
    },
  };
}
