// Babel plugin to transform react-native-maps imports to react-native-web-google-api-maps
// This plugin is designed to work with Babel 7 and should be added to your Babel configuration
// in the plugins section. It will replace imports from 'react-native-maps' with
// 'react-native-web-google-api-maps' for web platforms.
// Usage:
// 1. Install the package: npm install --save react-native-web-google-api-maps
// 2. Add the plugin to your Babel configuration (babel.config.js or .babelrc):
//    {
//        plugins: ['react-native-web-google-api-maps/babel']
//    }
// 3. Make sure to set the appropriate environment variables for the plugin to work correctly.
//    - PLATFORM: Set to "web" or "react-native-web".
//    - TARGET: Set to "web" or "react-native-web".
//    - BABEL_ENV: Set to "web" or "react-native-web".
//    - REACT_NATIVE_PLATFORM: Set to "web" or "react-native-web".
//    - NODE_ENV: Set to "development" or "production".
// 4. Use the plugin in your React Native project for web builds.
// 5. The plugin will automatically replace imports from 'react-native-maps' with
//    'react-native-web-google-api-maps' for the specified platforms.
// 6. The plugin will also handle default and named imports correctly.

module.exports = function reactNativeWebGoogleApiMaps({ types: t }) {
    function isWebPlatform() {
        const WEB_ENV_VALUES = ["web", "react-native-web", "browser"];
        const envs = [
            process.env.PLATFORM,
            process.env.TARGET,
            process.env.BABEL_ENV,
            process.env.REACT_NATIVE_PLATFORM,
            process.env.NODE_ENV,
        ];
        return envs.some((env) => WEB_ENV_VALUES.includes(env));
    }

    return {
        name: "react-native-web-google-api-maps-alias",
        visitor: {
            ImportDeclaration(path) {
                if (!isWebPlatform()) return;

                const source = path.node.source.value;
                if (source !== "react-native-maps") return;

                const newImports = path.node.specifiers.map((specifier) => {
                    const localName = specifier.local.name;
                    const importedName =
                        specifier.type === "ImportDefaultSpecifier"
                            ? "MapView"
                            : specifier.imported.name;

                    return t.importDeclaration(
                        [t.importDefaultSpecifier(t.identifier(localName))],
                        t.stringLiteral(
                            `react-native-web-google-api-maps/dist/${importedName}`,
                        ),
                    );
                });

                path.replaceWithMultiple(newImports);
            },
        },
    };
};
