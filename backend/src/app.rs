use axum::Router;
use tower_http::trace::TraceLayer;
use utoipa::OpenApi;
use utoipa_axum::router::OpenApiRouter;
use utoipa_swagger_ui::SwaggerUi;

use crate::{docs::ApiDoc, routes};

pub fn build() -> Router<()> {
    let (plain, spec) = OpenApiRouter::with_openapi(ApiDoc::openapi())
        .nest("/v1", routes::router())
        .split_for_parts();

    plain
        .merge(SwaggerUi::new("/docs").url("/openapi.json", spec))
        .layer(TraceLayer::new_for_http())
}
