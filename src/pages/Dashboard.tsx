import { Plus, Star, Eye, GitFork, Bell, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const recentProjects = [
  { title: "aura-llm-7b", updated: "3 hours ago", stars: 1240 },
  { title: "tokenizer-fast", updated: "1 day ago", stars: 560 },
  { title: "web4-starter", updated: "3 days ago", stars: 320 },
];

const notifications = [
  { text: "alex_web4 starred your project aura-llm-7b", time: "1h ago" },
  { text: "New comment on 'Best practices for deploying models'", time: "3h ago" },
  { text: "ml_beginner forked tokenizer-fast", time: "5h ago" },
];

const Dashboard = () => (
  <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
    <div className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground text-sm">Welcome back, Sarah 👋</p>
      </div>
      <Button className="bg-primary text-primary-foreground font-semibold hover:bg-primary/90 gap-2">
        <Plus className="h-4 w-4" /> New Project
      </Button>
    </div>

    {/* Stats */}
    <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
      {[
        { icon: Star, label: "Total Stars", value: "2,300" },
        { icon: Eye, label: "Profile Views", value: "1.2K" },
        { icon: GitFork, label: "Forks", value: "486" },
        { icon: Bell, label: "Notifications", value: "3" },
      ].map((s) => (
        <Card key={s.label}>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <s.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>

    <div className="grid gap-6 lg:grid-cols-2">
      {/* Recent Projects */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Your Projects</CardTitle>
          <Button variant="ghost" size="sm" className="text-secondary gap-1">View all <ArrowUpRight className="h-3 w-3" /></Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentProjects.map((p) => (
            <div key={p.title} className="flex items-center justify-between rounded-lg border p-3 hover:border-secondary/40 transition-colors cursor-pointer">
              <div>
                <p className="text-sm font-semibold text-foreground">{p.title}</p>
                <p className="text-xs text-muted-foreground">Updated {p.updated}</p>
              </div>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Star className="h-3.5 w-3.5" /> {p.stars}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Notifications</CardTitle>
          <Button variant="ghost" size="sm" className="text-secondary">Mark all read</Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {notifications.map((n, i) => (
            <div key={i} className="flex items-start gap-3 rounded-lg border p-3">
              <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-secondary" />
              <div>
                <p className="text-sm text-foreground">{n.text}</p>
                <p className="text-xs text-muted-foreground">{n.time}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  </div>
);

export default Dashboard;
