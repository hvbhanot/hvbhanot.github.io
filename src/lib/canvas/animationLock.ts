/** At most one continuous autoplay canvas holds the lock at a time. */

let holder: string | null = null;

export function acquireLock(id: string): boolean {
  if (holder === null || holder === id) {
    holder = id;
    return true;
  }
  return false;
}

export function releaseLock(id: string): void {
  if (holder === id) holder = null;
}

export function currentLock(): string | null {
  return holder;
}
