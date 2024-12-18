import React from 'react';
import Button from '@/components/ui/Button';
import ScoreInput from '@/components/ui/ScoreInput';

interface ScoreSectionProps {
  scores: string[];
  onScoreChange: (index: number, score: string) => void;
  onAddScore: () => void;
  onRemoveScore: (index: number) => void;
}

export default function ScoreSection({
  scores,
  onScoreChange,
  onAddScore,
  onRemoveScore
}: ScoreSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-700">Score</h2>
        {scores.length < 3 && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onAddScore}
            className="text-sm"
          >
            Ajouter un set
          </Button>
        )}
      </div>

      {scores.map((score, index) => (
        <div key={index} className="flex items-center gap-2">
          <div className="flex-1">
            <ScoreInput
              value={score}
              onChange={(newScore) => onScoreChange(index, newScore)}
            />
          </div>
          {scores.length > 1 && (
            <button
              type="button"
              onClick={() => onRemoveScore(index)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          )}
        </div>
      ))}
    </div>
  );
}