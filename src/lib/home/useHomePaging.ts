import { prefersReducedMotion } from "@/lib/animations";
import { useEffect } from "react";
import { resolveHomeHash } from "./data";
import { HomeWheelGesture, homeScrollStops, nextHomeStop } from "./paging";

/** Discrete navigation on the homepage; normal document scrolling elsewhere. */
export function useHomePaging() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-home-pager]");
    if (!root) return;
    const wheel = new HomeWheelGesture();
    let destination: number | null = null;
    let resizeTimer: ReturnType<typeof setTimeout>;
    let touch: { x: number; y: number; used: boolean; target: EventTarget | null } | null = null;
    const screens = () => Array.from(root.querySelectorAll<HTMLElement>("[data-home-stop]"));
    const top = (el: HTMLElement) => el.getBoundingClientRect().top + window.scrollY;
    const stops = () =>
      homeScrollStops(
        screens().map((el) => ({ top: top(el), height: el.offsetHeight })),
        window.innerHeight,
        Math.max(0, document.documentElement.scrollHeight - window.innerHeight),
      );
    const blocked = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return false;
      if (
        target.closest(
          '[role="dialog"], [role="menu"], [role="listbox"], textarea, select, [contenteditable="true"]',
        )
      )
        return true;
      for (let el: Element | null = target; el && el !== root; el = el.parentElement) {
        const { overflowY } = getComputedStyle(el);
        if (/auto|scroll/.test(overflowY) && el.scrollHeight > el.clientHeight + 2) return true;
      }
      return false;
    };
    const go = (position: number, hash?: string, animate = true) => {
      const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      const y = Math.max(0, Math.min(position, max));
      const smooth = animate && !prefersReducedMotion();
      destination = smooth && Math.abs(window.scrollY - y) > 2 ? y : null;
      window.scrollTo({ top: y, behavior: smooth ? "smooth" : "instant" });
      const screen = screens()
        .reverse()
        .find((el) => top(el) <= y + 2);
      const id = hash ?? screen?.dataset.homeStop;
      if (id && window.location.hash !== `#${id}`) window.history.replaceState(null, "", `#${id}`);
    };
    // Use the selected stop while scrolling, so a second deliberate gesture
    // continues from that screen rather than snapping to an intermediate offset.
    const step = (direction: number) =>
      go(nextHomeStop(stops(), destination ?? window.scrollY, direction));
    const onScrollEnd = () => {
      destination = null;
    };
    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY) || blocked(event.target))
        return;
      event.preventDefault();
      const delta =
        event.deltaY *
        (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1);
      const direction = wheel.consume(delta, performance.now());
      if (direction) step(direction);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey || blocked(event.target)) return;
      if (
        event.target instanceof Element &&
        (event.target.closest("input") ||
          (["ArrowDown", "ArrowUp", " "].includes(event.key) &&
            event.target.closest('button, a, [role="radiogroup"], [role="tablist"]')))
      )
        return;
      if (
        event.repeat &&
        ["ArrowDown", "ArrowUp", "PageDown", "PageUp", " ", "Home", "End"].includes(event.key)
      ) {
        event.preventDefault();
        return;
      }
      const direction = {
        ArrowDown: 1,
        PageDown: 1,
        ArrowUp: -1,
        PageUp: -1,
        " ": event.shiftKey ? -1 : 1,
      }[event.key];
      if (direction) {
        event.preventDefault();
        step(direction);
      } else if (event.key === "Home" || event.key === "End") {
        event.preventDefault();
        go(event.key === "Home" ? 0 : (stops().at(-1) ?? 0));
      }
    };
    const onTouchStart = (event: TouchEvent) => {
      touch =
        event.touches.length === 1
          ? {
              x: event.touches[0].clientX,
              y: event.touches[0].clientY,
              used: false,
              target: event.target,
            }
          : null;
    };
    const onTouchMove = (event: TouchEvent) => {
      if (!touch || event.touches.length !== 1 || blocked(touch.target)) return;
      const dx = touch.x - event.touches[0].clientX;
      const dy = touch.y - event.touches[0].clientY;
      if (Math.abs(dx) > Math.abs(dy)) return;
      event.preventDefault();
      if (!touch.used && Math.abs(dy) >= 20) {
        touch.used = true;
        step(Math.sign(dy));
      }
    };
    const openHash = (animate = true) => {
      const id = resolveHomeHash(window.location.hash);
      const section = id ? document.getElementById(id) : null;
      const stop = section?.closest<HTMLElement>("[data-home-stop]");
      if (stop) go(top(stop), id ?? undefined, animate);
    };
    const onHistory = () => openHash();
    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const link =
        event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
      if (
        !link ||
        link.origin !== window.location.origin ||
        link.pathname !== window.location.pathname
      )
        return;
      const id = resolveHomeHash(link.hash);
      const stop = id
        ? document.getElementById(id)?.closest<HTMLElement>("[data-home-stop]")
        : null;
      if (!stop) return;
      event.preventDefault();
      if (window.location.hash !== `#${id}`) window.history.pushState(null, "", `#${id}`);
      go(top(stop), id ?? undefined);
    };
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => openHash(false), 120);
    };
    openHash(false);
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("hashchange", onHistory);
    window.addEventListener("popstate", onHistory);
    window.addEventListener("scrollend", onScrollEnd);
    window.addEventListener("resize", onResize);
    document.addEventListener("click", onClick);
    return () => {
      if (destination !== null) window.scrollTo({ top: window.scrollY, behavior: "instant" });
      clearTimeout(resizeTimer);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("hashchange", onHistory);
      window.removeEventListener("popstate", onHistory);
      window.removeEventListener("scrollend", onScrollEnd);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("click", onClick);
    };
  }, []);
}
