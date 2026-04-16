import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, Download, Eye, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ProjectDetail = () => {
  const { id } = useParams();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <Link to="/explore" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-secondary transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Explore
      </Link>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="mb-6 flex items-start gap-4">
            <div className="h-14 w-14 shrink-0 rounded-xl bg-gradient-to-br from-primary to-secondary" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">aura-llm-7b</h1>
              <p className="text-sm text-muted-foreground">by <span className="text-secondary font-medium">aura-labs</span></p>
            </div>
          </div>

          <div className="mb-4 flex flex-wrap gap-2">
            <Badge className="bg-secondary/10 text-secondary border-0">model</Badge>
            <Badge className="bg-secondary/10 text-secondary border-0">llm</Badge>
            <Badge className="bg-secondary/10 text-secondary border-0">edge</Badge>
          </div>

          <Card className="mb-6">
            <CardHeader><CardTitle className="text-lg">README.md</CardTitle></CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <h3 className="text-foreground font-semibold">Aura LLM 7B</h3>
              <p>A lightweight 7-billion parameter language model optimized for edge inference on consumer hardware. Designed for the Web4 ecosystem with built-in support for decentralized model serving.</p>
              <h4 className="text-foreground font-semibold mt-4">Quick Start</h4>
              <pre className="rounded-lg bg-muted p-4 text-xs overflow-x-auto">
{`from aura import AutoModel

model = AutoModel.from_hub("aura-labs/aura-llm-7b")
output = model.generate("Explain Web4 in simple terms")`}
              </pre>
              <h4 className="text-foreground font-semibold mt-4">Features</h4>
              <ul className="list-disc pl-4 space-y-1">
                <li>4-bit quantization support</li>
                <li>ONNX and TensorRT export</li>
                <li>Built-in tokenizer</li>
                <li>Decentralized inference endpoints</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardContent className="p-5 space-y-4">
              <Button className="w-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 gap-2">
                <Download className="h-4 w-4" /> Download
              </Button>
              <Button variant="outline" className="w-full gap-2">
                <Star className="h-4 w-4" /> Star
              </Button>
              <div className="grid grid-cols-2 gap-3 pt-2 border-t">
                <div className="text-center">
                  <p className="text-xl font-bold text-foreground">1,240</p>
                  <p className="text-xs text-muted-foreground">Stars</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-foreground">312</p>
                  <p className="text-xs text-muted-foreground">Forks</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-foreground">45K</p>
                  <p className="text-xs text-muted-foreground">Downloads</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-foreground">8.2K</p>
                  <p className="text-xs text-muted-foreground">Views</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5 space-y-3">
              <h3 className="font-semibold text-foreground text-sm">Contributors</h3>
              <div className="flex -space-x-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-gradient-to-br from-primary to-secondary" />
                ))}
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium text-muted-foreground">
                  +12
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5 space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><Calendar className="h-4 w-4" /> Updated 3 days ago</div>
              <div className="flex items-center gap-2"><Eye className="h-4 w-4" /> Apache 2.0 License</div>
              <div className="flex items-center gap-2"><User className="h-4 w-4" /> 17 contributors</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
