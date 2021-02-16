const envs = {
    dev: {
        port: 5050,
    },
    production: {
        port: 8000,
    },
};

module.exports = envs[process.env?.NODE_ENV] ?? envs.dev;
