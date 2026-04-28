import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface LegalLayoutProps {
  title: string;
  updated: string;
  children: ReactNode;
}

export const LegalLayout = ({ title, updated, children }: LegalLayoutProps) => (
  <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
    <div className="mb-8 flex flex-wrap gap-4 text-sm">
      <Link to="/terms" className="text-foreground/70 hover:text-foreground transition-colors">Terms</Link>
      <Link to="/privacy" className="text-foreground/70 hover:text-foreground transition-colors">Privacy</Link>
      <Link to="/refunds" className="text-foreground/70 hover:text-foreground transition-colors">Refunds</Link>
    </div>
    <h1 className="text-4xl font-bold text-foreground mb-2">{title}</h1>
    <p className="text-sm text-foreground/60 mb-10">Last updated: {updated}</p>
    <article className="prose prose-slate max-w-none prose-headings:text-foreground prose-p:text-foreground/80 prose-li:text-foreground/80 prose-a:text-primary prose-strong:text-foreground">
      {children}
    </article>
  </main>
);
