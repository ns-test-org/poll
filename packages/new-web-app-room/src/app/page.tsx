'use client';

import { useState } from 'react';

const pollOptions = [
  { id: 1, text: '🍕 Pepperoni', votes: 0 },
  { id: 2, text: '🍄 Mushrooms', votes: 0 },
  { id: 3, text: '🍍 Pineapple', votes: 0 },
  { id: 4, text: '🧀 Extra Cheese', votes: 0 },
];

export default function PollApp() {
  const [options, setOptions] = useState(pollOptions);
  const [hasVoted, setHasVoted] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const totalVotes = options.reduce((sum, option) => sum + option.votes, 0);

  const handleVote = (optionId: number) => {
    if (hasVoted) return;

    setOptions(prev => 
      prev.map(option => 
        option.id === optionId 
          ? { ...option, votes: option.votes + 1 }
          : option
      )
    );
    setSelectedOption(optionId);
    setHasVoted(true);
  };

  const resetPoll = () => {
    setOptions(pollOptions.map(option => ({ ...option, votes: 0 })));
    setHasVoted(false);
    setSelectedOption(null);
  };

  const getPercentage = (votes: number) => {
    if (totalVotes === 0) return 0;
    return Math.round((votes / totalVotes) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-6">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md w-full shadow-2xl border border-white/20">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            🍕 Pizza Poll
          </h1>
          <p className="text-white/80">
            What's the best pizza topping?
          </p>
        </div>

        <div className="space-y-4 mb-6">
          {options.map((option) => {
            const percentage = getPercentage(option.votes);
            const isSelected = selectedOption === option.id;
            
            return (
              <button
                key={option.id}
                onClick={() => handleVote(option.id)}
                disabled={hasVoted}
                className={`w-full p-4 rounded-xl transition-all duration-300 relative overflow-hidden ${
                  hasVoted
                    ? isSelected
                      ? 'bg-green-500/30 border-2 border-green-400'
                      : 'bg-white/10 border border-white/20'
                    : 'bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 cursor-pointer'
                }`}
              >
                {hasVoted && (
                  <div
                    className="absolute left-0 top-0 h-full bg-gradient-to-r from-purple-500/30 to-blue-500/30 transition-all duration-1000 ease-out"
                    style={{ width: `${percentage}%` }}
                  />
                )}
                
                <div className="relative flex items-center justify-between text-white">
                  <span className="font-medium">{option.text}</span>
                  {hasVoted && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{option.votes}</span>
                      <span className="text-sm font-bold">{percentage}%</span>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {hasVoted && (
          <div className="text-center space-y-4">
            <p className="text-white/80">
              Total votes: <span className="font-bold text-white">{totalVotes}</span>
            </p>
            <button
              onClick={resetPoll}
              className="px-6 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors duration-200 border border-white/30"
            >
              Reset Poll
            </button>
          </div>
        )}

        {!hasVoted && (
          <p className="text-center text-white/60 text-sm">
            Click an option to vote!
          </p>
        )}
      </div>
    </div>
  );
}

