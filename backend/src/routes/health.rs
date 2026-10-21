use axum::Json;
use serde::Serialize;
use utoipa::ToSchema;
use utoipa_axum::router::OpenApiRouter;
use utoipa_axum::routes;

use crate::common::state::AppState;

#[derive(Serialize, ToSchema)]
struct HealthResponse {
    status: String,
}

/// This is a health query to see if the api is healthy
#[utoipa::path(
    get, 
    path = "/health",
    responses(
        (status = 200, description = "Health checked successfully", body = HealthResponse),
    ),
)]
async fn health_check() -> Json<HealthResponse> {
    Json(HealthResponse {
        status: "ok".to_string(),
    })
}

pub fn router() -> OpenApiRouter<AppState> {
    OpenApiRouter::new().routes(routes!(health_check))
}
