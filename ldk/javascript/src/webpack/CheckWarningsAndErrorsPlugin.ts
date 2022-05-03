import { Compiler, WebpackError } from 'webpack';

const assetName = 'loop.js';
const warningMsg =
  'Please provide a way for users to open your Loop. You can do this using the ui.loopOpenHandler. This is required to submit your Loop.';
const plugin = 'CheckLoopOpenHandlerPlugin';
export class CheckWarningsAndErrorsPlugin {
  apply(compiler: Compiler): void {
    compiler.hooks.thisCompilation.tap(plugin, (compilation) => {
      compilation.hooks.afterOptimizeAssets.tap({ name: plugin }, (assets) => {
        const loopjs = assets[assetName];
        if (loopjs) {
          const fileContent = loopjs.source();
          if (!fileContent?.includes('ui.loopOpenHandler(')) {
            const openHandlerMissingWarning = new WebpackError(warningMsg);
            openHandlerMissingWarning.file = assetName;
            compilation.warnings.push(openHandlerMissingWarning);
          }
          if (fileContent?.includes('screen.ocr(')) {
            const ocrDeprecationWarningMsg =
              '[screen.ocr] ocr will be deprecated soon. Please use listenOcrMonitor instead.';
            const openHandlerMissingWarning = new WebpackError(ocrDeprecationWarningMsg);
            compilation.warnings.push(openHandlerMissingWarning);
          }
        }
      });
    });
  }
}
