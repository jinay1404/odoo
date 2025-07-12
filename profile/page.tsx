'use client';

import { useState } from 'react';
import { Camera, Upload, Save, User, MapPin, Clock, Award } from 'lucide-react';
import SkillTag from '@/components/SkillTag';
import ToggleVisibility from '@/components/ToggleVisibility';
import { currentUser, availableSkills, locations } from '@/utils/dummyData';
import Image from 'next/image';

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    name: currentUser.name,
    email: currentUser.email,
    location: currentUser.location,
    skillsOffered: [...currentUser.skillsOffered],
    skillsWanted: [...currentUser.skillsWanted],
    availability: [...currentUser.availability],
    isPublic: currentUser.isPublic
  });

  const [showSkillSuggestions, setShowSkillSuggestions] = useState(false);
  const [skillType, setSkillType] = useState<'offered' | 'wanted'>('offered');
  const [newSkill, setNewSkill] = useState('');

  const availabilityOptions = ['Weekdays', 'Evenings', 'Weekends'];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addSkill = (skill: string, type: 'offered' | 'wanted') => {
    const fieldName = type === 'offered' ? 'skillsOffered' : 'skillsWanted';
    if (!formData[fieldName].includes(skill)) {
      handleInputChange(fieldName, [...formData[fieldName], skill]);
    }
    setNewSkill('');
    setShowSkillSuggestions(false);
  };

  const removeSkill = (skill: string, type: 'offered' | 'wanted') => {
    const fieldName = type === 'offered' ? 'skillsOffered' : 'skillsWanted';
    handleInputChange(fieldName, formData[fieldName].filter(s => s !== skill));
  };

  const toggleAvailability = (time: string) => {
    const newAvailability = formData.availability.includes(time)
      ? formData.availability.filter(a => a !== time)
      : [...formData.availability, time];
    handleInputChange('availability', newAvailability);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Profile updated:', formData);
    alert('Profile updated successfully! (This is a demo)');
  };

  const filteredSkillSuggestions = availableSkills.filter(skill =>
    skill.toLowerCase().includes(newSkill.toLowerCase()) &&
    !formData[skillType === 'offered' ? 'skillsOffered' : 'skillsWanted'].includes(skill)
  ).slice(0, 8);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">
            Manage your profile information and skill preferences.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Profile Picture */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Profile Picture</h2>
            <div className="flex items-center gap-6">
              <div className="relative">
                <Image
                  src={currentUser.profilePic}
                  alt="Profile"
                  width={96}
                  height={96}
                  className="rounded-full object-cover"
                />
                <button
                  type="button"
                  className="absolute bottom-0 right-0 bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full shadow-lg transition-colors"
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div>
                <button
                  type="button"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  Upload New Photo
                </button>
                <p className="text-sm text-gray-500 mt-2">
                  JPG, PNG or GIF. Max size 5MB.
                </p>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            
            <div className="mt-6">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Location
              </label>
              <select
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Skills Offered */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5" />
              Skills I Can Teach
            </h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {formData.skillsOffered.map(skill => (
                <SkillTag
                  key={skill}
                  skill={skill}
                  type="offered"
                  removable
                  onRemove={(skill) => removeSkill(skill, 'offered')}
                />
              ))}
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Add a skill you can teach..."
                value={newSkill}
                onChange={(e) => {
                  setNewSkill(e.target.value);
                  setSkillType('offered');
                  setShowSkillSuggestions(true);
                }}
                onFocus={() => {
                  setSkillType('offered');
                  setShowSkillSuggestions(true);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              {showSkillSuggestions && skillType === 'offered' && filteredSkillSuggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                  {filteredSkillSuggestions.map(skill => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => addSkill(skill, 'offered')}
                      className="w-full px-3 py-2 text-left hover:bg-gray-100 transition-colors"
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Skills Wanted */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills I Want to Learn</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {formData.skillsWanted.map(skill => (
                <SkillTag
                  key={skill}
                  skill={skill}
                  type="wanted"
                  removable
                  onRemove={(skill) => removeSkill(skill, 'wanted')}
                />
              ))}
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Add a skill you want to learn..."
                value={newSkill}
                onChange={(e) => {
                  setNewSkill(e.target.value);
                  setSkillType('wanted');
                  setShowSkillSuggestions(true);
                }}
                onFocus={() => {
                  setSkillType('wanted');
                  setShowSkillSuggestions(true);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              {showSkillSuggestions && skillType === 'wanted' && filteredSkillSuggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                  {filteredSkillSuggestions.map(skill => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => addSkill(skill, 'wanted')}
                      className="w-full px-3 py-2 text-left hover:bg-gray-100 transition-colors"
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Availability */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Availability
            </h2>
            <div className="space-y-3">
              {availabilityOptions.map(option => (
                <label key={option} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.availability.includes(option)}
                    onChange={() => toggleAvailability(option)}
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <span className="ml-3 text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Visibility Toggle */}
          <ToggleVisibility
            initialValue={formData.isPublic}
            onChange={(isPublic) => handleInputChange('isPublic', isPublic)}
          />

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}