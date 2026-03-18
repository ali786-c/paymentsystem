# Project Specific Rules - Upgrader Pay Hub

## Deployment
- **Frontend Build Destination**: Whenever the `frontend` is built (e.g., `npm run build`), the contents of `frontend/dist/` must be copied to the root directory `upgrader-pay-hub/`.
- **Backend Sync**: Do NOT copy frontend assets directly into `api/public/` unless specifically requested for troubleshooting. The root directory is the primary entry point for the application.

## Version Control
- Always verify built assets in the root folder before finalizing a deployment-related task.
