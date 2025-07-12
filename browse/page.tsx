'use client';

import { useState, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import UserCard from '@/components/UserCard';
import SkillTag from '@/components/SkillTag';
import { dummyUsers, availableSkills, locations } from '@/utils/dummyData';

export default function BrowsePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const availabilityOptions = ['Weekdays', 'Evenings', 'Weekends'];

  const filteredUsers = useMemo(() => {
    return dummyUsers.filter(user => {
      // Search term filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesName = user.name.toLowerCase().includes(searchLower);
        const matchesSkills = user.skillsOffered.some(skill => 
          skill.toLowerCase().includes(searchLower)
        ) || user.skillsWanted.some(skill => 
          skill.toLowerCase().includes(searchLower)
        );
        if (!matchesName && !matchesSkills) return false;
      }

      // Skills filter
      if (selectedSkills.length > 0) {
        const hasMatchingSkill = selectedSkills.some(skill =>
          user.skillsOffered.includes(skill) || user.skillsWanted.includes(skill)
        );
        if (!hasMatchingSkill) return false;
      }

      // Location filter
      if (selectedLocations.length > 0) {
        if (!selectedLocations.includes(user.location)) return false;
      }

      // Availability filter
      if (selectedAvailability.length > 0) {
        const hasMatchingAvailability = selectedAvailability.some(availability =>
          user.availability.includes(availability)
        );
        if (!hasMatchingAvailability) return false;
      }

      return true;
    });
  }, [searchTerm, selectedSkills, selectedLocations, selectedAvailability]);

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleLocationToggle = (location: string) => {
    setSelectedLocations(prev =>
      prev.includes(location)
        ? prev.filter(l => l !== location)
        : [...prev, location]
    );
  };

  const handleAvailabilityToggle = (availability: string) => {
    setSelectedAvailability(prev =>
      prev.includes(availability)
        ? prev.filter(a => a !== availability)
        : [...prev, availability]
    );
  };

  const clearAllFilters = () => {
    setSelectedSkills([]);
    setSelectedLocations([]);
    setSelectedAvailability([]);
    setSearchTerm('');
  };

  const handleRequestSwap = (userId: string) => {
    // Mock function - would open swap request modal in real app
    console.log('Requesting swap with user:', userId);
    alert('Swap request sent! (This is a demo)');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Skills</h1>
          <p className="text-gray-600">
            Discover amazing people ready to share their knowledge and learn from you.
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Filter Toggle */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span>Filters</span>
              {(selectedSkills.length + selectedLocations.length + selectedAvailability.length) > 0 && (
                <span className="bg-indigo-600 text-white text-xs rounded-full px-2 py-1">
                  {selectedSkills.length + selectedLocations.length + selectedAvailability.length}
                </span>
              )}
            </button>

            {(selectedSkills.length + selectedLocations.length + selectedAvailability.length) > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-sm text-indigo-600 hover:text-indigo-700"
              >
                Clear all filters
              </button>
            )}
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-6 space-y-6 border-t border-gray-200 pt-6">
              {/* Skills Filter */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {availableSkills.slice(0, 12).map(skill => (
                    <button
                      key={skill}
                      onClick={() => handleSkillToggle(skill)}
                      className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                        selectedSkills.includes(skill)
                          ? 'bg-indigo-100 text-indigo-700 border-indigo-200'
                          : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>

              {/* Location Filter */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Location</h3>
                <div className="flex flex-wrap gap-2">
                  {locations.slice(0, 8).map(location => (
                    <button
                      key={location}
                      onClick={() => handleLocationToggle(location)}
                      className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                        selectedLocations.includes(location)
                          ? 'bg-indigo-100 text-indigo-700 border-indigo-200'
                          : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                      }`}
                    >
                      {location}
                    </button>
                  ))}
                </div>
              </div>

              {/* Availability Filter */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Availability</h3>
                <div className="flex flex-wrap gap-2">
                  {availabilityOptions.map(availability => (
                    <button
                      key={availability}
                      onClick={() => handleAvailabilityToggle(availability)}
                      className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                        selectedAvailability.includes(availability)
                          ? 'bg-indigo-100 text-indigo-700 border-indigo-200'
                          : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                      }`}
                    >
                      {availability}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredUsers.length} of {dummyUsers.length} users
          </p>
        </div>

        {/* User Grid */}
        {filteredUsers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map(user => (
              <UserCard 
                key={user.id} 
                user={user} 
                onRequestSwap={handleRequestSwap}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Filter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search terms or filters to find more matches.
            </p>
            <button
              onClick={clearAllFilters}
              className="text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}