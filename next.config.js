const withTM = require("next-transpile-modules")(["three"]);
module.exports = withTM();

// module.exports = {
//   images: {
//     domains: ["uunicorns.mypinata.cloud", "localhost"],
//   },
//   experimental: { esmExternals: true },
// };
