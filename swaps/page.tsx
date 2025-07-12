'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SwapCard from '@/components/SwapCard';
import FeedbackModal from '@/components/FeedbackModal';
import { dummySwaps, Swap } from '@/utils/dummyData';
import { Clock, CheckCircle, AlertCircle } from 'lucide-react';

export default function SwapsPage() {
  const [feedbackModal, setFeedbackModal] = useState<{
    isOpen: boolean;
    swap: Swap | null;
  }>({ isOpen: false, swap: null });

  const pendingSwaps = dummySwaps.filter(swap => swap.status === 'pending');
  const acceptedSwaps = dummySwaps.filter(swap => swap.status === 'accepted');
  const completedSwaps = dummySwaps.filter(swap => swap.status === 'completed');

  const handleAccept = (swapId: string) => {
    console.log('Accepting swap:', swapId);
    alert('Swap accepted! (This is a demo)');
  };

  const handleReject = (swapId: string) => {
    console.log('Rejecting swap:', swapId);
    alert('Swap rejected! (This is a demo)');
  };

  const handleCancel = (swapId: string) => {
    console.log('Cancelling swap:', swapId);
    alert('Swap cancelled! (This is a demo)');
  };

  const handleProvideFeedback = (swap: Swap) => {
    setFeedbackModal({ isOpen: true, swap });
  };

  const handleFeedbackSubmit = (rating: number, comment: string) => {
    console.log('Feedback submitted:', { rating, comment, swapId: feedbackModal.swap?.id });
    setFeedbackModal({ isOpen: false, swap: null });
  };

  const EmptyState = ({ 
    icon: Icon, 
    title, 
    description 
  }: { 
    icon: any; 
    title: string; 
    description: string; 
  }) => (
    <div className="text-center py-12">
      <Icon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Skill Swaps</h1>
          <p className="text-gray-600">
            Manage your skill exchange requests and track your learning progress.
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="pending" className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Pending ({pendingSwaps.length})
            </TabsTrigger>
            <TabsTrigger value="accepted" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Accepted ({acceptedSwaps.length})
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Completed ({completedSwaps.length})
            </TabsTrigger>
          </TabsList>

          {/* Pending Swaps */}
          <TabsContent value="pending">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Pending Requests</h2>
              {pendingSwaps.length > 0 ? (
                <div className="grid gap-6">
                  {pendingSwaps.map(swap => (
                    <SwapCard
                      key={swap.id}
                      swap={swap}
                      onAccept={handleAccept}
                      onReject={handleReject}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={AlertCircle}
                  title="No pending requests"
                  description="You don't have any pending skill swap requests at the moment."
                />
              )}
            </div>
          </TabsContent>

          {/* Accepted Swaps */}
          <TabsContent value="accepted">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Accepted Swaps</h2>
              {acceptedSwaps.length > 0 ? (
                <div className="grid gap-6">
                  {acceptedSwaps.map(swap => (
                    <SwapCard
                      key={swap.id}
                      swap={swap}
                      onCancel={handleCancel}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={Clock}
                  title="No accepted swaps"
                  description="You don't have any accepted skill swaps scheduled yet."
                />
              )}
            </div>
          </TabsContent>

          {/* Completed Swaps */}
          <TabsContent value="completed">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Completed Swaps</h2>
              {completedSwaps.length > 0 ? (
                <div className="grid gap-6">
                  {completedSwaps.map(swap => (
                    <SwapCard
                      key={swap.id}
                      swap={swap}
                      onProvideFeedback={handleProvideFeedback}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={CheckCircle}
                  title="No completed swaps"
                  description="Complete your first skill swap to see it here!"
                />
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Feedback Modal */}
        {feedbackModal.swap && (
          <FeedbackModal
            isOpen={feedbackModal.isOpen}
            onClose={() => setFeedbackModal({ isOpen: false, swap: null })}
            user={feedbackModal.swap.toUser}
            swapDetails={{
              skill: feedbackModal.swap.requestedSkill,
              date: feedbackModal.swap.scheduledDate || feedbackModal.swap.createdAt
            }}
            onSubmit={handleFeedbackSubmit}
          />
        )}
      </div>
    </div>
  );
}