import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ReelPlayer } from '../components/ReelPlayer';
import { SAMPLE_REELS } from '../data/sampleReels';

describe('ReelPlayer Component', () => {
  it('renders reel player with current reel creator info', () => {
    render(
      <ReelPlayer
        currentReelIndex={0}
        onSelectReelIndex={vi.fn()}
        watchHistory={[]}
        onUpdateWatchHistory={vi.fn()}
        onApplyPreset={vi.fn()}
        activePresetId={null}
        allReels={SAMPLE_REELS}
      />
    );

    expect(screen.getAllByText(/Reels/i).length).toBeGreaterThan(0);
    expect(screen.getByText(SAMPLE_REELS[0].creator)).toBeInTheDocument();
  });

  it('renders preset scenario buttons', () => {
    render(
      <ReelPlayer
        currentReelIndex={0}
        onSelectReelIndex={vi.fn()}
        watchHistory={[]}
        onUpdateWatchHistory={vi.fn()}
        onApplyPreset={vi.fn()}
        activePresetId={null}
        allReels={SAMPLE_REELS}
      />
    );

    expect(screen.getByText(/Built-in Trap/i)).toBeInTheDocument();
  });

  it('calls onApplyPreset when a preset button is clicked', () => {
    const handleApplyPreset = vi.fn();
    render(
      <ReelPlayer
        currentReelIndex={0}
        onSelectReelIndex={vi.fn()}
        watchHistory={[]}
        onUpdateWatchHistory={vi.fn()}
        onApplyPreset={handleApplyPreset}
        activePresetId={null}
        allReels={SAMPLE_REELS}
      />
    );

    const trapButton = screen.getByText(/Built-in Trap/i);
    fireEvent.click(trapButton);
    expect(handleApplyPreset).toHaveBeenCalledWith('built-in-trap');
  });
});
