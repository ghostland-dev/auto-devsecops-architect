
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import HeroSection from "@/components/HeroSection";
import FeatureSection from "@/components/FeatureSection";
import TestimonialSection from "@/components/TestimonialSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <FeatureSection />
        <section className="py-16 bg-slate-50">
          <div className="container px-4 mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Comment ça fonctionne</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold mb-4">1</div>
                  <CardTitle>Configurez</CardTitle>
                  <CardDescription>Spécifiez votre stack technique et vos préférences de déploiement</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Sélectionnez votre langage, framework, outils CI/CD, et configurations cloud souhaitées via une interface intuitive.</p>
                </CardContent>
              </Card>
              
              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold mb-4">2</div>
                  <CardTitle>Générez</CardTitle>
                  <CardDescription>Notre moteur intelligent crée tous vos fichiers DevSecOps</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Dockerfiles, manifests K8s, scripts Terraform, workflows CI/CD et bien plus sont générés en quelques secondes.</p>
                </CardContent>
              </Card>
              
              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold mb-4">3</div>
                  <CardTitle>Déployez</CardTitle>
                  <CardDescription>Téléchargez votre package DevSecOps prêt à l'emploi</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Un dossier structuré et documenté contenant tous les fichiers nécessaires pour votre déploiement sécurisé.</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex justify-center mt-12">
              <Button 
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all"
                onClick={() => navigate("/configurator")}
              >
                Démarrer un nouveau projet
              </Button>
            </div>
          </div>
        </section>
        <TestimonialSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
