// https://mochajs.org/#configuring-mocha-nodejs

module.exports = {
    ui: "bdd",
    timeout: "60000",
    exit: true,
    failZero: true,
    forbidPending: true,
    colors: true,
    diff: true,
    fullTrace: true,
    inlineDiffs: true,
    reporter: "spec"
}