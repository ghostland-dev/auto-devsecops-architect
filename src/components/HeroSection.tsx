
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative bg-gradient-to-br from-indigo-900 via-indigo-700 to-blue-800 py-20 md:py-32">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptMi0yaDF2MWgtMXYtMXptLTIgMmgxdjFoLTF2LTF6bS0yLTJoMXY1aC0xdi01em0tMi0yaDF2OWgtMXYtOXptLTIgMGgxdjloLTF2LTl6TTI0IDMwaDR2MWgtNHYtMXptLTIgMmMwLTEuMS45LTIgMi0yczIgLjkgMiAyLS45IDItMiAyLTItLjktMi0yem05LTEyaDFWMmgtMXYxNnptLTEyIDJoOXYxaC05di0xem0xMC0yaDF2MmgtMXYtMnptMi0yaDF2NGgtMXYtNHptMiAwaDFWNGgtMXYxNHptLTYgMmgxdjVoLTF2LTV6bS0yLTJoMXY5aC0xdi05em0tMiAwaDF2OWgtMXYtOXptLTItNGgxdjEzaC0xVjE0em0tMi0yaDF2MTdoLTFWMTJ6bS0yIDRoMXYxM2gtMVYxNnptMTIgMTBoMXYxaC0xdi0xem0tOCAwaDF2MWgtMXYtMXptLTIgMWgxdjFoLTF2LTF6TTQwIDRoMXYzaC0xVjR6bTAgOGgxdjJoLTF2LTJ6TTIyIDRoNnYxaC02VjR6bTAgMmgzdjFoLTN2LTF6bTAgNGgzdjFoLTNWMTB6bTAtMmg2djFoLTZWOHptMCA2aDN2MWgtM3YtMXptMCAyaDZ2MWgtNnYtMXoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-60"></div>
      <div className="container px-4 mx-auto relative">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">
            Déployez en toute sécurité<br/>
            <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              avec DevSecOps Generator
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-indigo-100 mb-10 max-w-3xl mx-auto">
            Générez automatiquement tous vos fichiers DevSecOps en quelques clics.
            Dockerfiles, manifestes Kubernetes, pipelines CI/CD et Terraform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all"
              onClick={() => navigate("/configurator")}
            >
              Commencer gratuitement
            </Button>
            <Button 
              variant="outline" 
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-lg"
              onClick={() => navigate("/documentation")}
            >
              Voir la documentation
            </Button>
          </div>
        </div>
        
        <div className="mt-16 bg-white/10 backdrop-blur-sm p-4 rounded-xl shadow-xl max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4">
              <div className="text-4xl font-bold text-white mb-2">100+</div>
              <div className="text-indigo-200">Templates</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-white mb-2">10+</div>
              <div className="text-indigo-200">Stacks techniques</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-white mb-2">5+</div>
              <div className="text-indigo-200">Providers Cloud</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-white mb-2">99%</div>
              <div className="text-indigo-200">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
