import { Link } from "react-router-dom";
import { Zap } from "lucide-react";

const Footer = () => (
  <footer className="border-t bg-muted/30">
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2 mb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Zap className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-foreground">
              Aura<span className="text-secondary">Collective</span>
            </span>
          </Link>
          <p className="text-sm text-muted-foreground">
            The open infrastructure for Web4 developers.
          </p>
          <div className="mt-4 flex gap-3">
            <a href="#" className="text-muted-foreground hover:text-secondary transition-colors"><Github className="h-5 w-5" /></a>
            <a href="#" className="text-muted-foreground hover:text-secondary transition-colors"><Twitter className="h-5 w-5" /></a>
          </div>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-foreground">Platform</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/explore" className="hover:text-secondary transition-colors">Explore</Link></li>
            <li><Link to="/community" className="hover:text-secondary transition-colors">Community</Link></li>
            <li><Link to="/docs" className="hover:text-secondary transition-colors">Documentation</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-foreground">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-secondary transition-colors">About</a></li>
            <li><a href="#" className="hover:text-secondary transition-colors">Blog</a></li>
            <li><a href="#" className="hover:text-secondary transition-colors">Careers</a></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-foreground">Legal</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-secondary transition-colors">Privacy</a></li>
            <li><a href="#" className="hover:text-secondary transition-colors">Terms</a></li>
            <li><a href="#" className="hover:text-secondary transition-colors">License</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-8 border-t pt-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} AuraCollective. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
