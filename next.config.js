const withPlugins = require("next-compose-plugins");

module.exports = withPlugins([], {
    images: {
        domains: ["medusa-public-images.s3.eu-west-1.amazonaws.com"],
    },
});
