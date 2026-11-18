use std::sync::Arc;

use sqlx::PgPool;

use crate::common::config::Config;

#[derive(Clone)]
pub struct AppState {
    pub pool: PgPool,
    pub config: Arc<Config>,
}
