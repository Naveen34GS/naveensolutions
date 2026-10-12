import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SERVICES_DATA } from '../data/services';
import { ServiceItem } from '../types';
import { ServiceCard } from '../components/services/ServiceCard';
import { ServiceDetailModal } from '../components/services/ServiceDetailModal';
import { useAuth } from '../context/AuthContext';
import { Search, Filter } from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setPendingService } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [modalService, setModalService] = useState<ServiceItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'development', label: 'Development' },
    { id: 'integration', label: 'Integration' },
    { id: 'cloud-devops', label: 'Cloud & DevOps' },
    { id: 'ai-automation', label: 'AI & Automation' },
    { id: 'data-qa', label: 'Data & QA' },
  ];

  const filteredServices = SERVICES_DATA.filter(service => {
    const matchesCat = selectedCategory === 'all' || service.category === selectedCategory;
    const query = searchQuery.toLowerCase();
    const matchesSearch = !query || 
      service.name.toLowerCase().includes(query) ||
      service.shortDescription.toLowerCase().includes(query) ||
      service.techTags.some(t => t.toLowerCase().includes(query));
    return matchesCat && matchesSearch;
  });

  const handleSelectService = (service: ServiceItem) => {
    setPendingService(service.id);
    if (!isAuthenticated) {
      navigate(`/login?redirect=/assessment/new?serviceId=${service.id}`);
    } else {
      navigate(`/assessment/new?serviceId=${service.id}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header */}
      <div>
        <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
          Engineering Capabilities
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mt-1">
          Explore Technical Services & Capabilities
        </h1>
        <p className="text-sm text-slate-400 mt-2 max-w-2xl">
          Browse through Devmock's full-spectrum engineering practices. Every service is backed by standardized architecture patterns, clear test frameworks, and milestone delivery.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center bg-slate-900/60 border border-slate-800 p-3.5 rounded-2xl">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by tech (e.g. React, Docker, Python, AWS)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedCategory === c.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onSelect={handleSelectService}
            onViewDetails={(svc) => setModalService(svc)}
          />
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center py-16 bg-slate-900/30 rounded-2xl border border-slate-800/50">
          <p className="text-slate-400 text-sm">No capabilities found matching "{searchQuery}".</p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
            className="mt-3 text-xs text-blue-400 hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Detail Modal */}
      <ServiceDetailModal
        service={modalService}
        isOpen={!!modalService}
        onClose={() => setModalService(null)}
        onEvaluate={handleSelectService}
      />
    </div>
  );
};
