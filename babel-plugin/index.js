module.exports = function reactNativeWebMapsPlugin({ types: t }) {
    return {
        name: "react-native-web-maps-alias",
        visitor: {
            ImportDeclaration(path, state) {
                const isWeb = state.opts.platform === "web";
                if (!isWeb) return;

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
                            `react-native-maps-web/${importedName}`,
                        ),
                    );
                });

                path.replaceWithMultiple(newImports);
            },
        },
    };
};
