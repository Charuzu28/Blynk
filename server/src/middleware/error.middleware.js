export const errorHandler = (
  error,
  req,
  res,
  next
) => {
  console.error(error);

  if (error instanceof SyntaxError && "body" in error) {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON request body",
    });
  }

  const statusCode =
    error.statusCode ||
    error.status ||
    500;

  const message =
    statusCode === 500
      ? "Internal server error"
      : error.message || "Request failed";

  const response = {
    success: false,
    message,
  };

  if (
    process.env.NODE_ENV !== "production" &&
    statusCode === 500
  ) {
    response.stack = error.stack;
  }

  return res
    .status(statusCode)
    .json(response);
};