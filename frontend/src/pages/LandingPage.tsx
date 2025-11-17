import { useEffect, useState } from 'react';
import Navbar from '../components/common/Navbar';
import ProjectCard, { type Project } from '../components/landing/ProjectCard';
import ClientCard, { type Client } from '../components/landing/ClientCard';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import { API_ENDPOINTS } from '../constants/api';
import apiClient from '../services/apiClient';
import toast from 'react-hot-toast';
import '../styles.css';

const LandingPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [loadingClients, setLoadingClients] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [submittingNewsletter, setSubmittingNewsletter] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoadingProjects(true);
        const res = await apiClient.get<Project[]>(API_ENDPOINTS.projects.public);
        setProjects(res.data);
      } catch (error) {
        toast.error('Failed to load projects');
      } finally {
        setLoadingProjects(false);
      }
    };

    const fetchClients = async () => {
      try {
        setLoadingClients(true);
        const res = await apiClient.get<Client[]>(API_ENDPOINTS.clients.public);
        setClients(res.data);
      } catch (error) {
        toast.error('Failed to load clients');
      } finally {
        setLoadingClients(false);
      }
    };

    fetchProjects();
    fetchClients();
  }, []);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) {
      toast.error('Please enter an email');
      return;
    }

    try {
      setSubmittingNewsletter(true);
      await apiClient.post(API_ENDPOINTS.newsletter.public, { email: newsletterEmail });
      toast.success('Subscribed successfully');
      setNewsletterEmail('');
    } catch (error: unknown) {
      toast.error('Subscription failed');
    } finally {
      setSubmittingNewsletter(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Newsletter Bar */}
      <section className="bg-primary text-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between py-4 gap-4">
          <div className="flex items-center gap-8">
            <nav className="flex md:hidden items-center gap-4 text-sm">
              <a href="#home" className="nav-link">
                Home
              </a>
              <a href="#projects" className="nav-link">
                Projects
              </a>
              <a href="#testimonials" className="nav-link">
                Testimonials
              </a>
            </nav>
          </div>
          <form onSubmit={handleNewsletterSubmit} className="flex items-center gap-3">
            <span className="hidden md:inline text-sm font-medium">Subscribe Us</span>
            <div className="newsletter-input-wrapper">
              <input
                type="email"
                className="newsletter-input"
                placeholder="Enter Email Address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
              />
              <button type="submit" className="newsletter-btn" disabled={submittingNewsletter}>
                {submittingNewsletter ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1">
        {/* Projects Section */}
        <section id="projects" className="py-12 md:py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="section-title">Our Projects</h2>
            <p className="section-subtitle">
              Explore our latest work across consultation, design and marketing.
            </p>
            {loadingProjects ? (
              <Loader />
            ) : projects.length === 0 ? (
              <div className="empty-state">No projects found.</div>
            ) : (
              <div className="card-grid">
                {projects.map((project) => (
                  <ProjectCard key={project._id} project={project} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Happy Clients Section */}
        <section id="testimonials" className="py-12 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="section-title">Happy Clients</h2>
            <p className="section-subtitle">
              Hear what our clients say about working with our team.
            </p>
            {loadingClients ? (
              <Loader />
            ) : clients.length === 0 ? (
              <div className="empty-state">No clients found.</div>
            ) : (
              <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-5">
                {clients.map((client) => (
                  <ClientCard key={client._id} client={client} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Contact / CTA placeholder */}
        <section id="contact" className="py-12 md:py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3">Ready to discuss your project?</h2>
              <p className="text-gray-600 text-sm md:text-base max-w-xl">
                Get in touch with our team to explore how we can help you with consultation, design and marketing solutions.
              </p>
            </div>
            <div className="flex gap-3">
              <Button>Contact Us</Button>
              <Button variant="outline">View Projects</Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4 text-xs md:text-sm text-gray-500 flex flex-col md:flex-row items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} Flipr. All rights reserved.</span>
          <span>Admin? <Button as="button" className="px-2 py-1 text-xs" /></span>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
