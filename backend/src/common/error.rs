use axum::{Json, http::StatusCode, response::IntoResponse};
use serde::Serialize;
use thiserror::Error;
use utoipa::ToSchema;

#[derive(Serialize, ToSchema, Debug)]
pub struct FieldError {
    pub field: String,
    pub message: String,
}

#[derive(Error, Debug)]
pub enum AppError {
    #[error("validation error")]
    Validation(Vec<FieldError>),
    #[error("unauthorized")]
    Unauthorized,
    #[error("forbidden")]
    Forbidden,
    #[error("not found")]
    NotFound,
    #[error(transparent)]
    Internal(#[from] anyhow::Error),
}

#[derive(Serialize, ToSchema)]
struct ErrorResponse {
    error: ErrorBody,
}

#[derive(Serialize, ToSchema)]
struct ErrorBody {
    code: String,
    message: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    details: Option<Vec<FieldError>>,
}

impl IntoResponse for AppError {
    fn into_response(self) -> axum::http::Response<axum::body::Body> {
        let (status, code, message, details) = match self {
            AppError::Validation(field_errors) => (
                StatusCode::UNPROCESSABLE_ENTITY,
                "validation_failed",
                "request validation failed",
                Some(field_errors),
            ),
            AppError::Unauthorized => (
                StatusCode::UNAUTHORIZED,
                "unauthorized",
                "authentication required",
                None,
            ),
            AppError::Forbidden => (
                StatusCode::FORBIDDEN,
                "forbidden",
                "you do not have access to this resource",
                None,
            ),
            AppError::NotFound => (
                StatusCode::NOT_FOUND,
                "not_found",
                "resource not found",
                None,
            ),
            AppError::Internal(error) => {
                tracing::error!("{error:#}");
                (
                    StatusCode::INTERNAL_SERVER_ERROR,
                    "internal",
                    "internal server error",
                    None,
                )
            }
        };
        let body = ErrorResponse {
            error: ErrorBody {
                code: code.to_string(),
                message: message.to_string(),
                details,
            },
        };

        (status, Json(body)).into_response()
    }
}
