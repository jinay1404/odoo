'use client';

import { useState } from 'react';
import { 
  Users, 
  MessageSquare, 
  Shield, 
  TrendingUp, 
  Search,
  Ban,
  Eye,
  Flag,
  Megaphone,
  Download,
  MoreHorizontal
} from 'lucide-react';
import { dummyUsers } from '@/utils/dummyData';
import Image from 'next/image';

export default function AdminPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);

  const stats = [
    { label: 'Total Users', value: '2,547', icon: Users, change: '+12%' },
    { label: 'Active Swaps', value: '156', icon: MessageSquare, change: '+8%' },
    { label: 'Reports Pending', value: '3', icon: Flag, change: '-25%' },
    { label: 'Growth Rate', value: '15.3%', icon: TrendingUp, change: '+3%' },
  ];

  const filteredUsers = dummyUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUserAction = (action: string, userId: string) => {
    console.log(`${action} user:`, userId);
    alert(`${action} action executed for user ${userId} (This is a demo)`);
  };

  const handleBulkAction = (action: string) => {
    console.log(`${action} selected users:`, selectedUsers);
    alert(`${action} action executed for ${selectedUsers.length} users (This is a demo)`);
    setSelectedUsers([]);
  };

  const handleUserSelect = (userId: string) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    setSelectedUsers(
      selectedUsers.length === filteredUsers.length 
        ? [] 
        : filteredUsers.map(user => user.id)
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">
            Monitor platform activity and manage user interactions.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-green-600">{stat.change} from last month</p>
                  </div>
                  <div className="bg-indigo-100 p-3 rounded-lg">
                    <Icon className="w-6 h-6 text-indigo-600" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Actions Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setShowAnnouncementModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
              >
                <Megaphone className="w-4 h-4" />
                Send Announcement
              </button>
              <button
                onClick={() => handleBulkAction('Export')}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
              >
                <Download className="w-4 h-4" />
                Export Data
              </button>
            </div>
            
            {selectedUsers.length > 0 && (
              <div className="flex gap-2">
                <button
                  onClick={() => handleBulkAction('Ban')}
                  className="flex items-center gap-2 px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-sm font-medium transition-colors"
                >
                  <Ban className="w-4 h-4" />
                  Ban Selected ({selectedUsers.length})
                </button>
              </div>
            )}
          </div>
        </div>

        {/* User Management */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">User Management</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* User Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                      onChange={handleSelectAll}
                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Skills
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleUserSelect(user.id)}
                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Image
                          src={user.profilePic}
                          alt={user.name}
                          width={32}
                          height={32}
                          className="rounded-full object-cover mr-3"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.location}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {user.skillsOffered.length + user.skillsWanted.length} skills
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.isPublic 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {user.isPublic ? 'Active' : 'Private'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleUserAction('View', user.id)}
                          className="text-indigo-600 hover:text-indigo-700 p-1 hover:bg-indigo-50 rounded"
                          title="View Profile"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleUserAction('Moderate', user.id)}
                          className="text-yellow-600 hover:text-yellow-700 p-1 hover:bg-yellow-50 rounded"
                          title="Moderate"
                        >
                          <Flag className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleUserAction('Ban', user.id)}
                          className="text-red-600 hover:text-red-700 p-1 hover:bg-red-50 rounded"
                          title="Ban User"
                        >
                          <Ban className="w-4 h-4" />
                        </button>
                        <button
                          className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-50 rounded"
                          title="More Actions"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Announcement Modal */}
        {showAnnouncementModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Send Platform Announcement</h3>
                <textarea
                  placeholder="Enter your announcement message..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none mb-4"
                />
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowAnnouncementModal(false)}
                    className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      alert('Announcement sent! (This is a demo)');
                      setShowAnnouncementModal(false);
                    }}
                    className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}