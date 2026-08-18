import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Navbar } from '../components/Navbar';

describe('Navbar Component', () => {
  it('renders brand title and version correctly', () => {
    render(
      <Navbar
        activePage="reels"
        onSelectPage={vi.fn()}
        onOpenTrapModal={vi.fn()}
        onResetSession={vi.fn()}
        isTrapActive={false}
      />
    );

    expect(screen.getByText('ReelMind AI')).toBeInTheDocument();
    expect(screen.getByText('v2.0')).toBeInTheDocument();
  });

  it('handles tab switching correctly using accessible role and label', () => {
    const handleSelect = vi.fn();
    render(
      <Navbar
        activePage="reels"
        onSelectPage={handleSelect}
        onOpenTrapModal={vi.fn()}
        onResetSession={vi.fn()}
        isTrapActive={false}
      />
    );

    const splitTab = screen.getByRole('tab', { name: /Split Co-Pilot View/i });
    fireEvent.click(splitTab);
    expect(handleSelect).toHaveBeenCalledWith('split');
  });

  it('triggers session reset when clicking the reset button', () => {
    const handleReset = vi.fn();
    render(
      <Navbar
        activePage="reels"
        onSelectPage={vi.fn()}
        onOpenTrapModal={vi.fn()}
        onResetSession={handleReset}
        isTrapActive={false}
      />
    );

    const resetBtn = screen.getByRole('button', { name: /Reset watch history/i });
    fireEvent.click(resetBtn);
    expect(handleReset).toHaveBeenCalledTimes(1);
  });
});
