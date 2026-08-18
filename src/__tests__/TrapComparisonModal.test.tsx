import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TrapComparisonModal } from '../components/TrapComparisonModal';

describe('TrapComparisonModal Component', () => {
  it('renders benchmark table when open', () => {
    render(<TrapComparisonModal isOpen={true} onClose={vi.fn()} />);

    expect(screen.getByText(/The "Built-in Trap" Benchmark Matrix/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Naive Keyword Matcher/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/ReelMind Cognitive Agent/i).length).toBeGreaterThan(0);
  });

  it('does not render when closed', () => {
    const { container } = render(<TrapComparisonModal isOpen={false} onClose={vi.fn()} />);
    expect(container.firstChild).toBeNull();
  });

  it('calls onClose when close button clicked', () => {
    const handleClose = vi.fn();
    render(<TrapComparisonModal isOpen={true} onClose={handleClose} />);

    const closeBtn = screen.getByLabelText(/Close Benchmark Modal/i);
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
