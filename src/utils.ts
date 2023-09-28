export const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  } else if (typeof error === "string") {
    return error;
  }

  try {
    return Object.prototype.toString.call(error);
  } catch {
    return "Unknown error";
  }
};
