const { Transformer } = require("@parcel/plugin");

module.exports = new Transformer({
    transform({ asset }) {
        let code = "module.exports = {\n";
        const assets = [];

        for (let variant of ["3x", "2x", "1x"]) {
            const uniqueKey = variant;
            asset.addDependency({
                moduleSpecifier: uniqueKey,
            });
            assets.push({
                type: "png",
                uniqueKey,
                content: variant,
                isIsolated: true,
            });
            code +=
                JSON.stringify(variant) +
                ": require(" +
                JSON.stringify(uniqueKey) +
                "),\n";
        }
        code += "}";
        asset.type = "js";
        asset.pipeline = undefined;
        asset.setCode(code);
        return [asset, ...assets];
    },
});
