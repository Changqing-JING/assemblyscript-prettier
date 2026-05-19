export const magic = "MAGIC_ASSEMBLYSCRIPT_PRETTIER_1996";
const prefix = "/*" + magic;
const postfix = magic + "*/";

async function loadAssemblyScriptParser() {
  try {
    return await import("../warpo/assemblyscript/build-parser/index-parser.bundle.js");
  } catch (error) {
    if (error?.code !== "ERR_MODULE_NOT_FOUND") {
      throw error;
    }

    return import("../warpo/assemblyscript/build-parser/index-parser.js");
  }
}

export async function preProcess(code) {
  const assemblyscript = await loadAssemblyScriptParser();
  const visitDecorators = (node) => {
    let list = [];
    let _visit = (_node) => {
      if (Array.isArray(_node?.statements)) {
        _node.statements.forEach((statement) => {
          _visit(statement);
        });
      }
      if (Array.isArray(_node?.members)) {
        _node.members.forEach((statement) => {
          _visit(statement);
        });
      }
      if (_node.decorators) {
        list.push(
          ..._node.decorators.map((decorator) => {
            return { start: decorator.range.start, end: decorator.range.end };
          })
        );
      }
    };
    _visit(node);
    return list;
  };

  let parser = new assemblyscript.Parser();
  parser.parseFile(code, "pre_process.ts", false);
  let source = parser.sources[0];

  const decorators = visitDecorators(source);
  decorators.sort((a, b) => a.start - b.start);
  let cursor = 0;
  const removeDecoratorCodes = decorators.map((decorator) => {
    let s1 = code.slice(cursor, decorator.start);
    let s2 = code.slice(decorator.start, decorator.end);
    cursor = decorator.end;
    return `${s1}${prefix}${s2}`;
  });
  removeDecoratorCodes.push(code.slice(cursor));
  return removeDecoratorCodes.join(postfix);
}
