
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface BlogPostType {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  category: string;
  imageUrl: string;
}

// Sample blog post data
const blogPosts: Record<string, BlogPostType> = {
  "1": {
    id: "1",
    title: "Meilleurs pratiques DevSecOps pour 2023",
    content: `
      <p>Le DevSecOps est devenu une approche incontournable pour les entreprises cherchant à intégrer la sécurité tout au long du cycle de développement logiciel. Plutôt que de considérer la sécurité comme une étape finale, le DevSecOps l'intègre dès le début et à chaque étape du processus.</p>
      
      <h2>1. Sécurité dès la conception</h2>
      
      <p>La première étape consiste à intégrer les considérations de sécurité dès la phase de conception. Cela signifie:</p>
      
      <ul>
        <li>Réaliser des analyses de menaces au début du projet</li>
        <li>Définir des exigences de sécurité claires</li>
        <li>Former les développeurs aux principes de codage sécurisé</li>
      </ul>
      
      <h2>2. Automatisation des tests de sécurité</h2>
      
      <p>L'automatisation est au cœur du DevSecOps. Il est essentiel d'intégrer des tests de sécurité automatisés dans votre pipeline CI/CD:</p>
      
      <ul>
        <li>Analyse statique du code (SAST) pour détecter les vulnérabilités dans le code source</li>
        <li>Analyse dynamique des applications (DAST) pour évaluer les applications en cours d'exécution</li>
        <li>Tests de pénétration automatisés</li>
        <li>Analyse des dépendances pour identifier les vulnérabilités dans les bibliothèques tierces</li>
      </ul>
      
      <h2>3. Infrastructure as Code sécurisée</h2>
      
      <p>L'infrastructure as Code (IaC) doit également suivre des pratiques de sécurité rigoureuses:</p>
      
      <ul>
        <li>Analyser les configurations IaC pour détecter les erreurs de configuration de sécurité</li>
        <li>Utiliser des modèles pré-approuvés et sécurisés</li>
        <li>Appliquer le principe du moindre privilège dans toutes les configurations</li>
      </ul>
      
      <h2>4. Gestion des secrets</h2>
      
      <p>La gestion sécurisée des secrets est cruciale:</p>
      
      <ul>
        <li>Utiliser des coffres-forts pour les secrets (comme HashiCorp Vault ou AWS Secrets Manager)</li>
        <li>Éviter de stocker des secrets dans le code source ou les fichiers de configuration</li>
        <li>Rotation régulière des clés et des secrets</li>
      </ul>
      
      <h2>5. Surveillance continue et réponse aux incidents</h2>
      
      <p>Enfin, la sécurité ne s'arrête pas au déploiement:</p>
      
      <ul>
        <li>Mettre en place une surveillance continue de la sécurité</li>
        <li>Créer des plans de réponse aux incidents efficaces</li>
        <li>Réaliser des analyses post-incident pour améliorer continuellement la sécurité</li>
      </ul>
      
      <p>En intégrant ces pratiques DevSecOps, les organisations peuvent non seulement améliorer leur posture de sécurité, mais aussi accélérer leur développement en évitant les retards causés par les problèmes de sécurité découverts tardivement.</p>
    `,
    date: "15 Mars 2023",
    author: "Sophie Martin",
    category: "DevSecOps",
    imageUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
  },
  "2": {
    id: "2",
    title: "Docker vs Kubernetes: Quand utiliser l'un ou l'autre?",
    content: `
      <p>La conteneurisation a révolutionné le déploiement d'applications, et Docker et Kubernetes sont deux technologies clés dans cet écosystème. Bien qu'ils soient souvent mentionnés ensemble, ils répondent à des besoins différents et peuvent être utilisés indépendamment ou conjointement.</p>
      
      <h2>Docker: La plateforme de conteneurisation</h2>
      
      <p>Docker est avant tout une plateforme permettant de créer, distribuer et exécuter des applications dans des conteneurs.</p>
      
      <h3>Avantages de Docker:</h3>
      
      <ul>
        <li>Facilité d'utilisation et courbe d'apprentissage accessible</li>
        <li>Excellent pour les environnements de développement local</li>
        <li>Parfait pour les applications simples ou monolithiques</li>
        <li>Idéal pour l'isolation d'applications</li>
      </ul>
      
      <h3>Cas d'utilisation idéaux pour Docker seul:</h3>
      
      <ul>
        <li>Développement local et tests</li>
        <li>Applications petites à moyennes avec des exigences de déploiement simples</li>
        <li>CI/CD pour les tests d'intégration</li>
        <li>Applications monolithiques qui bénéficient de l'isolation</li>
      </ul>
      
      <h2>Kubernetes: L'orchestrateur de conteneurs</h2>
      
      <p>Kubernetes est une plateforme d'orchestration qui gère le déploiement, la mise à l'échelle et l'exploitation de multiples conteneurs.</p>
      
      <h3>Avantages de Kubernetes:</h3>
      
      <ul>
        <li>Mise à l'échelle automatique des applications</li>
        <li>Haute disponibilité et tolérance aux pannes</li>
        <li>Équilibrage de charge intégré</li>
        <li>Déploiements sans interruption de service</li>
        <li>Gestion avancée de la configuration et des secrets</li>
      </ul>
      
      <h3>Cas d'utilisation idéaux pour Kubernetes:</h3>
      
      <ul>
        <li>Applications distribuées à grande échelle</li>
        <li>Microservices</li>
        <li>Applications critiques nécessitant une haute disponibilité</li>
        <li>Systèmes nécessitant une évolutivité automatique</li>
        <li>Environnements de production complexes multi-cloud ou hybrides</li>
      </ul>
      
      <h2>Docker et Kubernetes ensemble</h2>
      
      <p>Dans de nombreux cas, les équipes utilisent Docker pour créer leurs conteneurs et Kubernetes pour les orchestrer en production.</p>
      
      <p>Ce flux de travail typique comprend:</p>
      
      <ol>
        <li>Développement d'applications et création d'images Docker localement</li>
        <li>Test des conteneurs Docker individuellement</li>
        <li>Stockage des images dans un registre de conteneurs</li>
        <li>Déploiement et gestion des conteneurs en production avec Kubernetes</li>
      </ol>
      
      <h2>Comment choisir?</h2>
      
      <p>Pour décider quelle technologie utiliser, posez-vous ces questions:</p>
      
      <ul>
        <li><strong>Complexité de l'application:</strong> Simple (Docker) vs. Complexe/distribuée (Kubernetes)</li>
        <li><strong>Besoins de mise à l'échelle:</strong> Statique (Docker) vs. Dynamique (Kubernetes)</li>
        <li><strong>Expertise de l'équipe:</strong> Kubernetes a une courbe d'apprentissage plus raide</li>
        <li><strong>Budget et ressources:</strong> Kubernetes nécessite plus d'investissement initial</li>
      </ul>
      
      <p>En conclusion, Docker et Kubernetes ne sont pas mutuellement exclusifs mais complémentaires. Pour de nombreuses organisations, le parcours commence par Docker pour la conteneurisation, puis évolue vers Kubernetes lorsque les besoins d'orchestration deviennent plus complexes.</p>
    `,
    date: "23 Avril 2023",
    author: "Thomas Dubois",
    category: "Conteneurisation",
    imageUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
  }
};

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const post = id ? blogPosts[id] : null;

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Article introuvable</h1>
            <p className="text-slate-600 mb-6">L'article que vous recherchez n'existe pas ou a été supprimé.</p>
            <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
              <Link to="/blog">Retour au blog</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <Button 
            variant="outline" 
            className="mb-8 flex items-center gap-2"
            asChild
          >
            <Link to="/blog">
              <ArrowLeft className="h-4 w-4" />
              Retour au blog
            </Link>
          </Button>
          
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                {post.category}
              </span>
              <span className="text-slate-500">{post.date}</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {post.title}
            </h1>
            
            <div className="flex items-center">
              <div className="bg-indigo-600 h-10 w-10 rounded-full flex items-center justify-center text-white font-medium">
                {post.author.charAt(0)}
              </div>
              <span className="ml-3 text-slate-700">Par {post.author}</span>
            </div>
          </div>
          
          <div className="mb-10">
            <img 
              src={post.imageUrl} 
              alt={post.title}
              className="w-full h-[400px] object-cover rounded-lg"
            />
          </div>
          
          <div 
            className="prose prose-slate prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          <div className="mt-12 pt-8 border-t border-slate-200">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">Partagez cet article</h3>
            <div className="flex gap-4">
              <Button variant="outline" className="rounded-full w-12 h-12 p-0 flex items-center justify-center">
                <span className="sr-only">Partager sur Twitter</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </Button>
              <Button variant="outline" className="rounded-full w-12 h-12 p-0 flex items-center justify-center">
                <span className="sr-only">Partager sur LinkedIn</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                </svg>
              </Button>
              <Button variant="outline" className="rounded-full w-12 h-12 p-0 flex items-center justify-center">
                <span className="sr-only">Partager sur Facebook</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPost;
