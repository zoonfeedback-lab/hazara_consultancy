export type AdminActionResult<T = null> =
  | { success: true; data: T }
  | { success: false; error: string };

export function adminActionError<T = null>(error: unknown, fallback: string): AdminActionResult<T> {
  console.error(fallback, error);
  return { error: fallback, success: false };
}
