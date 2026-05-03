"use client";
import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

const TIMEOUT_MS = 30 * 60 * 1000;

export function useSessionTimeout() {
  const router = useRouter();

  const logout = useCallback(async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login?reason=timeout");
  }, [router]);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const reset = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(logout, TIMEOUT_MS);
    };

    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];
    events.forEach(e => window.addEventListener(e, reset, { passive: true }));
    reset();

    return () => {
      clearTimeout(timeoutId);
      events.forEach(e => window.removeEventListener(e, reset));
    };
  }, [logout]);
}
