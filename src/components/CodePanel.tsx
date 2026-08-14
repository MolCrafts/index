import { Card } from "@/components/ui/card";
import { CODE_HIGHLIGHTER } from "@/lib/styleTokens";
import { SyntaxHighlighter } from "@/lib/syntaxHighlighter";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { Key } from "react";

interface CodePanelProps {
  /** Changing this re-mounts the panel so a snippet swap animates in. */
  snippetKey: Key;
  filename: string;
  /** Prism language id, resolved by the caller from its own snippet shape. */
  language: string;
  code: string;
  /** Product accent gradient stop for the hairline across the panel top. */
  glowLine: string;
}

/**
 * Terminal-style snippet panel shared by every product landing page.
 *
 * The chrome (surface, header bar, traffic lights, filename) is identical across
 * products; only the snippet and the accent hairline change. Product pages own
 * their own language resolution because their snippet shapes differ.
 */
export function CodePanel({ snippetKey, filename, language, code, glowLine }: CodePanelProps) {
  return (
    <motion.div
      key={snippetKey}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="sticky top-32 w-full lg:w-7/12"
    >
      <Card className="relative overflow-hidden rounded-2xl border-zinc-800/60 bg-code-surface shadow-2xl">
        <div
          className={cn(
            "absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent to-transparent",
            glowLine,
          )}
          aria-hidden="true"
        />
        <div className="flex items-center justify-between border-b border-zinc-800/40 bg-code-chrome px-6 py-4">
          <div className="flex space-x-2" aria-hidden="true">
            <div className="h-3 w-3 rounded-full bg-zinc-700" />
            <div className="h-3 w-3 rounded-full bg-zinc-700" />
            <div className="h-3 w-3 rounded-full bg-zinc-700" />
          </div>
          <div className="font-mono text-mini font-medium uppercase tracking-[0.15em] text-zinc-500">
            {filename}
          </div>
        </div>

        <div className="flex min-h-[420px] items-center overflow-x-auto bg-code-well p-6 font-mono text-[13px] leading-relaxed [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:text-sm md:p-8 md:text-snippet">
          <SyntaxHighlighter
            language={language}
            className={CODE_HIGHLIGHTER}
            useInlineStyles={false}
            wrapLines={true}
            showLineNumbers={false}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      </Card>
    </motion.div>
  );
}
