use anyhow::Context;

pub struct Config {
    pub port: u16,
    pub database_url: String,
    pub frontend_origin: String,
}

impl Config {
    pub fn from_env() -> anyhow::Result<Self> {
        dotenvy::dotenv().ok();
        let port = match std::env::var("PORT") {
            Ok(port_str) => port_str
                .parse::<u16>()
                .context("PORT must be an integer betewen 0 and 65535.")?,
            Err(_) => 3000,
        };

        let database_url = std::env::var("DATABASE_URL").context("DATABASE_URL must be set")?;
        let frontend_origin =
            std::env::var("FRONTEND_ORIGIN").context("FRONTEND_ORIGIN must be set")?;

        Ok(Config {
            port,
            database_url,
            frontend_origin,
        })
    }
}
