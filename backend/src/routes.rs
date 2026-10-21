use utoipa_axum::router::OpenApiRouter;

use crate::common::state::AppState;

mod health;

pub fn router() -> OpenApiRouter<AppState> {
    OpenApiRouter::new().merge(health::router())
}
