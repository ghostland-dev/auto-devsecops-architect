
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  popular?: boolean;
}

const pricingPlans: PricingPlan[] = [
  {
    name: "Gratuit",
    price: "0€",
    description: "Pour les petits projets et l'apprentissage",
    features: [
      "1 pipeline DevSecOps",
      "Dockerfile de base",
      "Configurations limitées",
      "Documentation de base",
      "Support communautaire"
    ],
    buttonText: "Commencer gratuitement"
  },
  {
    name: "Pro",
    price: "29€/mois",
    description: "Pour les professionnels et petites équipes",
    features: [
      "10 pipelines DevSecOps",
      "Configurations avancées",
      "Terraform & Kubernetes",
      "Support par email",
      "Mises à jour mensuelles",
      "Analyses de sécurité"
    ],
    buttonText: "Essai gratuit de 14 jours",
    popular: true
  },
  {
    name: "Entreprise",
    price: "99€/mois",
    description: "Pour les grandes équipes et organisations",
    features: [
      "Pipelines illimités",
      "Support prioritaire",
      "Formation dédiée",
      "Déploiements multi-cloud",
      "Personnalisation complète",
      "Audit de sécurité mensuel",
      "SLA garanti"
    ],
    buttonText: "Contacter les ventes"
  }
];

const Pricing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold text-slate-900 mb-4">Tarification simple et transparente</h1>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Choisissez le plan qui correspond à vos besoins. Tous les plans incluent notre générateur DevSecOps de base.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {pricingPlans.map((plan) => (
                <div 
                  key={plan.name}
                  className={`rounded-xl border ${plan.popular ? 'border-indigo-500 ring-2 ring-indigo-500 ring-opacity-50' : 'border-slate-200'} bg-white shadow-sm overflow-hidden`}
                >
                  {plan.popular && (
                    <div className="bg-indigo-500 text-white text-center py-1.5 text-sm font-medium">
                      Populaire
                    </div>
                  )}
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-slate-900">{plan.name}</h3>
                    <div className="mt-4 flex items-baseline">
                      <span className="text-3xl font-bold text-slate-900">{plan.price}</span>
                      {plan.price !== "0€" && <span className="ml-1 text-slate-500">/mois</span>}
                    </div>
                    <p className="mt-2 text-slate-600">{plan.description}</p>
                    
                    <ul className="mt-6 space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start">
                          <Check className="h-5 w-5 text-indigo-500 flex-shrink-0 mr-2" />
                          <span className="text-slate-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-8">
                      <Button 
                        className={`w-full ${plan.popular ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50'}`}
                      >
                        {plan.buttonText}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-20 text-center">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Questions fréquentes</h2>
              <div className="max-w-3xl mx-auto grid gap-6">
                <div className="bg-white p-6 rounded-lg border border-slate-200">
                  <h3 className="font-semibold text-slate-900">Puis-je changer de plan à tout moment ?</h3>
                  <p className="mt-2 text-slate-600">Oui, vous pouvez passer à un plan supérieur ou inférieur à tout moment. Les ajustements de facturation seront calculés au prorata.</p>
                </div>
                <div className="bg-white p-6 rounded-lg border border-slate-200">
                  <h3 className="font-semibold text-slate-900">Y a-t-il un engagement minimum ?</h3>
                  <p className="mt-2 text-slate-600">Non, tous nos plans sont facturés mensuellement et vous pouvez annuler à tout moment.</p>
                </div>
                <div className="bg-white p-6 rounded-lg border border-slate-200">
                  <h3 className="font-semibold text-slate-900">Comment fonctionne l'essai gratuit ?</h3>
                  <p className="mt-2 text-slate-600">L'essai gratuit de 14 jours vous donne un accès complet à toutes les fonctionnalités du plan Pro. Aucune carte de crédit n'est requise pour commencer.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Pricing;
