import path from 'path';

module.exports = {
  process(sourceText: string, sourcePath: string, options: any) {
    return {
      code: `module.exports = ${JSON.stringify(path.basename(sourcePath))};`,
    };
  },
};
