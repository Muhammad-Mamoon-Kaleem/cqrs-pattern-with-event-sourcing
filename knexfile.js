module.exports = {
  development: {
    client: "pg",
    connection: {
      host: process.env.POSTGRES_HOST || "postgres",
      port: process.env.POSTGRES_PORT || 5432,
      user: process.env.POSTGRES_USER || "postgres",
      password: process.env.POSTGRES_PASSWORD || "786666",
      database: process.env.POSTGRES_DB || "cqrs_demo",
    },
    migrations: {
      directory: "./migrations",
    },
  },
};