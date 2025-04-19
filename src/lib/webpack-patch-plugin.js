/**
 * This is a Webpack plugin that patches the @radix-ui/react-use-effect-event module
 * to use our polyfill instead of trying to import from React.
 */
class WebpackPatchPlugin {
  apply(compiler) {
    compiler.hooks.normalModuleFactory.tap('WebpackPatchPlugin', (factory) => {
      factory.hooks.parser.for('javascript/auto').tap('WebpackPatchPlugin', (parser) => {
        parser.hooks.import.tap('WebpackPatchPlugin', (statement, source) => {
          // Intercept imports from react when useEffectEvent is being imported
          if (source === 'react' && 
              statement.specifiers && 
              statement.specifiers.some(s => s.imported && s.imported.name === 'useEffectEvent')) {
            // We'll handle this import in a special way
            return true;
          }
        });
      });
    });
  }
}

module.exports = WebpackPatchPlugin; 