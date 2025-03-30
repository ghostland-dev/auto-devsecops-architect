
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    quote: "Nous avons économisé plus de 15 jours de travail DevOps grâce à cette plateforme. Les fichiers générés suivent parfaitement les bonnes pratiques que nous appliquons.",
    author: "Marie Dupont",
    role: "CTO, TechStartup"
  },
  {
    quote: "L'équipe de développement peut maintenant se concentrer sur le code métier plutôt que sur la configuration DevOps. Un gain de temps précieux pour nous.",
    author: "Thomas Leblanc",
    role: "Lead Developer, FinTech Solutions"
  },
  {
    quote: "Nous avons pu migrer notre application monolithique vers des microservices sur Kubernetes en un temps record grâce à cette solution.",
    author: "Sophie Martin",
    role: "DevOps Engineer, E-commerce Plus"
  }
];

const TestimonialSection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-indigo-50 to-white">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Ce que nos utilisateurs disent</h2>
          <p className="text-xl text-gray-600">
            Des équipes de toutes tailles utilisent notre outil pour accélérer leurs déploiements
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="mb-4">
                  {Array(5).fill(0).map((_, i) => (
                    <svg key={i} className="inline-block w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-indigo-600 font-semibold">
                      {testimonial.author.split(' ').map(name => name[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
