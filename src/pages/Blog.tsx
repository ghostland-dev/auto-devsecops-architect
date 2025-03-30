
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  imageUrl: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Meilleurs pratiques DevSecOps pour 2023",
    excerpt: "Découvrez les pratiques essentielles pour intégrer la sécurité dans votre pipeline DevOps pour une livraison continue sécurisée.",
    date: "15 Mars 2023",
    author: "Sophie Martin",
    category: "DevSecOps",
    imageUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "2",
    title: "Docker vs Kubernetes: Quand utiliser l'un ou l'autre?",
    excerpt: "Une analyse comparative approfondie entre Docker et Kubernetes pour vous aider à choisir la meilleure solution pour votre projet.",
    date: "23 Avril 2023",
    author: "Thomas Dubois",
    category: "Conteneurisation",
    imageUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "3",
    title: "Automatiser vos déploiements avec GitHub Actions",
    excerpt: "Guide étape par étape pour configurer des workflows CI/CD efficaces avec GitHub Actions pour vos projets DevOps.",
    date: "7 Mai 2023",
    author: "Claire Lefèvre",
    category: "CI/CD",
    imageUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "4",
    title: "Infrastructure as Code avec Terraform",
    excerpt: "Comment gérer votre infrastructure cloud de manière efficace et reproductible avec Terraform et les principes IaC.",
    date: "19 Juin 2023",
    author: "Lucas Bernard",
    category: "IaC",
    imageUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "5",
    title: "Sécuriser vos conteneurs Docker en production",
    excerpt: "Stratégies avancées pour sécuriser vos conteneurs Docker et protéger vos applications en environnement de production.",
    date: "2 Juillet 2023",
    author: "Émilie Dupont",
    category: "Sécurité",
    imageUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "6",
    title: "Monitoring et observabilité dans un écosystème DevOps",
    excerpt: "Comment implémenter une stratégie efficace de monitoring et d'observabilité pour vos applications distribuées.",
    date: "14 Août 2023",
    author: "Alexandre Moreau",
    category: "Monitoring",
    imageUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  }
];

const categories = ["Tous", "DevSecOps", "Conteneurisation", "CI/CD", "IaC", "Sécurité", "Monitoring"];

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Tous" || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <section className="py-16 px-4 bg-gradient-to-r from-indigo-100 to-purple-100">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-slate-900 mb-6">Blog DevSecOps</h1>
            <p className="text-xl text-slate-700 max-w-3xl mx-auto mb-8">
              Dernières actualités, guides et bonnes pratiques pour optimiser votre pipeline DevSecOps
            </p>
            
            <div className="flex max-w-2xl mx-auto">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <Input
                  className="pl-10 pr-4 py-6 rounded-l-md border-r-0 focus-visible:ring-indigo-500"
                  placeholder="Rechercher un article..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button className="rounded-l-none bg-indigo-600 hover:bg-indigo-700">
                Rechercher
              </Button>
            </div>
          </div>
        </section>
        
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={selectedCategory === category ? "bg-indigo-600 hover:bg-indigo-700" : ""}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map(post => (
                <article key={post.id} className="bg-white rounded-lg overflow-hidden shadow-md border border-slate-200 transition-transform hover:scale-[1.02]">
                  <img 
                    src={post.imageUrl} 
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-medium text-indigo-600">{post.category}</span>
                      <span className="text-sm text-slate-500">{post.date}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{post.title}</h3>
                    <p className="text-slate-600 mb-4">{post.excerpt}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-500">Par {post.author}</span>
                      <Button variant="link" className="text-indigo-600 p-0">
                        <Link to={`/blog/${post.id}`}>Lire la suite</Link>
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            
            {filteredPosts.length === 0 && (
              <div className="text-center py-20">
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Aucun article trouvé</h3>
                <p className="text-slate-600">Essayez de modifier vos critères de recherche</p>
              </div>
            )}
            
            {filteredPosts.length > 0 && (
              <div className="mt-12 text-center">
                <Button variant="outline" className="font-medium">
                  Charger plus d'articles
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;
