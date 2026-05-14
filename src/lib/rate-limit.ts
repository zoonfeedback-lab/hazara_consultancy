const loginAttempts = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(identifier: string): {
  allowed: boolean;
  remainingAttempts: number;
  resetInSeconds: number;
} {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000;
  const maxAttempts = 5;

  const record = loginAttempts.get(identifier);

  if (!record || now > record.resetAt) {
    loginAttempts.set(identifier, { count: 1, resetAt: now + windowMs });
    return {
      allowed: true,
      remainingAttempts: maxAttempts - 1,
      resetInSeconds: Math.ceil(windowMs / 1000),
    };
  }

  if (record.count >= maxAttempts) {
    return {
      allowed: false,
      remainingAttempts: 0,
      resetInSeconds: Math.ceil((record.resetAt - now) / 1000),
    };
  }

  record.count++;
  return {
    allowed: true,
    remainingAttempts: maxAttempts - record.count,
    resetInSeconds: Math.ceil((record.resetAt - now) / 1000),
  };
}

export function resetRateLimit(identifier: string): void {
  loginAttempts.delete(identifier);
}
