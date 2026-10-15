use utoipa_axum::router::OpenApiRouter;

mod health;

pub fn router() -> OpenApiRouter<()> {
    OpenApiRouter::new().merge(health::router())
}
