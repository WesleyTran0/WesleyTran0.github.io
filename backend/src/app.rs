use axum::Router;
use tower_http::trace::TraceLayer;

use crate::routes;

pub fn build() -> Router<()> {
    Router::new()
        .nest("/v1", routes::router())
        .layer(TraceLayer::new_for_http())
}
