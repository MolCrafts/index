import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { ChevronDown, Menu } from "lucide-react";
import { ecosystemCategories } from "../lib/ecosystem";
import { pathProductSlug } from "../lib/routes";
import { cn } from "../lib/utils";
import { LogoIcon } from "./Icons";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [currentPath, setCurrentPath] = useState(
    typeof window !== "undefined" ? window.location.pathname : "/",
  );
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  const isSubpage = currentPath !== "/";
  /**
   * Gate on a real product slug, not on `isSubpage`. The old version built the docs URL
   * from `currentPath.split("/")[1]`, so any 404 path — `/foobar` — produced a prominent
   * link to `docs.molcrafts.org/foobar/`, a guaranteed dead end shown to a visitor who is
   * already lost. Anything that is not a known product falls back to the docs root.
   */
  const productSlug = pathProductSlug(currentPath);
  const docsLink = productSlug
    ? `https://docs.molcrafts.org/${productSlug}/`
    : "https://docs.molcrafts.org/";

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 300);
  };

  return (
    <motion.header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-border/50",
        "bg-background/70 backdrop-blur-2xl backdrop-saturate-150",
        "shadow-[0_1px_0_0_rgba(var(--accent-rgb),0.06)]",
      )}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container relative mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <div className="flex items-center">
          <motion.a
            rel="noreferrer noopener"
            href="/"
            className="font-bold text-2xl flex items-center space-x-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <LogoIcon />
            <span className="text-foreground">MolCrafts</span>
          </motion.a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2 h-full">
          <motion.a
            href="/"
            className={cn(
              "rounded-md px-4 py-2 text-sm font-medium transition-colors",
              currentPath === "/"
                ? "bg-primary/5 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
            whileHover={{ y: -1 }}
          >
            Home
          </motion.a>

          {/* Ecosystem Dropdown with Hover Bridge */}
          <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <button
              type="button"
              /* Hover alone left this unreachable by keyboard and by touch, which made the
                 whole product catalog unreachable from the nav on mobile. */
              onClick={() => setDropdownOpen((open) => !open)}
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
              className={cn(
                "flex items-center gap-1 rounded-md px-4 py-2 text-sm font-medium transition-colors",
                dropdownOpen
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              Projects
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  dropdownOpen && "rotate-180",
                )}
              />
            </button>

            {/* Hover Bridge - Invisible div to bridge any gap between button and menu */}
            {dropdownOpen && (
              <div className="absolute top-full left-0 w-full h-8 z-10" aria-hidden="true" />
            )}

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className={cn(
                    "absolute top-full left-1/2 z-50 w-max -translate-x-1/2 overflow-hidden rounded-2xl p-5",
                    "border border-border/40 bg-background/85 backdrop-blur-2xl backdrop-saturate-150",
                    "shadow-[0_24px_80px_-20px_rgba(0,0,0,0.45),0_0_0_1px_rgba(var(--accent-rgb),0.06)]",
                  )}
                >
                  {/* Ambient glow — no frame */}
                  <div className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full bg-[rgba(var(--accent-rgb),0.12)] blur-[70px]" />

                  <div className="relative flex max-w-[min(90vw,72rem)] flex-row flex-wrap gap-8 px-1 py-1">
                    {ecosystemCategories.map((category, catIdx) => (
                      <div key={category.title} className="flex w-44 flex-col gap-1">
                        <div className="mb-1 px-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                          {category.title}
                        </div>
                        <div className="flex flex-col gap-0.5">
                          {category.items.map((item, itemIdx) => (
                            <motion.a
                              key={item.title}
                              href={item.href}
                              target={item.external ? "_blank" : undefined}
                              rel={item.external ? "noreferrer noopener" : undefined}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                delay: (catIdx * category.items.length + itemIdx) * 0.04,
                              }}
                              className="group flex items-baseline gap-2 px-1 py-1.5 transition-all"
                            >
                              <span
                                className={`text-sm font-semibold duration-200 group-hover:translate-x-1 ${item.color}`}
                              >
                                {item.title}
                              </span>
                              <span className="text-[11px] text-muted-foreground/80">
                                {item.role}
                              </span>
                            </motion.a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {!isSubpage && (
            <motion.a
              href="#participate"
              className="rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              whileHover={{ y: -1 }}
            >
              Work with us
            </motion.a>
          )}

          {/* Docs used to render only on subpages, so the homepage nav never offered the
              single most valuable destination for this audience. Now always present. */}
          <motion.a
            href={docsLink}
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            whileHover={{ y: -1 }}
          >
            Docs
          </motion.a>
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-3">
            <Button asChild variant="ghost" size="icon" className="ghost">
              <a rel="noreferrer noopener" href="https://github.com/MolCrafts" target="_blank">
                <GitHubLogoIcon className="h-[1.1rem] w-[1.2rem]" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
            <ModeToggle />
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <ModeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="p-2 -mr-2">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] border-l border-border">
                <SheetHeader className="text-left mb-8">
                  <SheetTitle className="text-xl font-bold text-foreground">MolCrafts</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-3">
                  <a
                    href="/"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-accent transition-all font-medium"
                  >
                    Home
                  </a>

                  <div className="flex flex-col gap-4">
                    {ecosystemCategories.map((category) => (
                      <div key={category.title} className="flex flex-col gap-1">
                        <div className="px-4 py-1 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                          {category.title}
                        </div>
                        <div className="grid gap-1 px-2">
                          {category.items.map((item) => (
                            <a
                              key={item.title}
                              href={item.href}
                              target={item.external ? "_blank" : undefined}
                              rel={item.external ? "noreferrer noopener" : undefined}
                              onClick={() => setIsOpen(false)}
                              className={
                                "flex items-baseline gap-2 p-3 rounded-lg hover:bg-accent transition-all"
                              }
                            >
                              <span className={`text-sm font-semibold ${item.color}`}>
                                {item.title}
                              </span>
                              <span className="text-xs text-muted-foreground">· {item.role}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {!isSubpage && (
                    <>
                      <SheetClose asChild>
                        <a
                          href="#projects"
                          className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all hover:bg-accent"
                        >
                          Projects
                        </a>
                      </SheetClose>
                      <SheetClose asChild>
                        <a
                          href="#approach"
                          className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all hover:bg-accent"
                        >
                          Approach
                        </a>
                      </SheetClose>
                      <SheetClose asChild>
                        <a
                          href="#participate"
                          className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all hover:bg-accent"
                        >
                          Work with us
                        </a>
                      </SheetClose>
                    </>
                  )}

                  <a
                    href={docsLink}
                    target="_blank"
                    rel="noreferrer noopener"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all hover:bg-accent"
                  >
                    Docs
                  </a>

                  <div className="mt-8 flex flex-col gap-4 border-t border-border pt-6">
                    <a
                      href="https://github.com/MolCrafts"
                      target="_blank"
                      className="flex items-center justify-center gap-3 rounded-xl bg-muted px-4 py-4 text-center text-sm font-bold transition-colors hover:bg-muted/80"
                      rel="noreferrer noopener"
                    >
                      <GitHubLogoIcon className="h-5 w-5" />
                      GitHub
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
};
