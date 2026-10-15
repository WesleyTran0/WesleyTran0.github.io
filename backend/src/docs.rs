use utoipa::OpenApi;

#[derive(OpenApi)]
#[openapi(info(title = "wTran API", description = "Happy go lucky api",))]
pub struct ApiDoc;
