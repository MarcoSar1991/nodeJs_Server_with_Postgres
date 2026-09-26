const Sentry = require("@sentry/node");

Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.APP_ENV || "development",
});

module.exports = Sentry;