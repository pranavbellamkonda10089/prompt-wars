import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { App } from '../App';

describe('App Integration & End-to-End State Lifecycle', () => {
  it('renders application with top navigation, reel player, and AI status pill', () => {
    render(<App />);

    expect(screen.getByText('ReelMind AI')).toBeInTheDocument();
    expect(screen.getByText('AI Latent Detection')).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Reels Feed View/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Split Co-Pilot View/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /AI Intelligence Reasoning Dashboard/i })).toBeInTheDocument();
  });

  it('switches views to Split Co-Pilot and AI Dashboard', () => {
    render(<App />);

    // Switch to Split View
    const splitTab = screen.getByRole('tab', { name: /Split Co-Pilot View/i });
    fireEvent.click(splitTab);
    expect(screen.getByText('AI Agent Reasoning Core')).toBeInTheDocument();

    // Switch to AI Dashboard View
    const agentTab = screen.getByRole('tab', { name: /AI Intelligence Reasoning Dashboard/i });
    fireEvent.click(agentTab);
    expect(screen.getByText(/AI Intelligence & Cognitive Reasoning Center/i)).toBeInTheDocument();

    // Switch back to Reels Feed
    const backBtn = screen.getByRole('button', { name: /Return to Reels Feed/i });
    fireEvent.click(backBtn);
    expect(screen.getByText('AI Latent Detection')).toBeInTheDocument();
  });

  it('opens and closes the Live AI Recommendation drawer', () => {
    render(<App />);

    const inspectBtn = screen.getByRole('button', { name: /Inspect AI recommendation/i });
    fireEvent.click(inspectBtn);

    expect(screen.getByRole('dialog', { name: /Live AI Recommendation/i })).toBeInTheDocument();

    const closeBtn = screen.getByRole('button', { name: /Close recommendation modal/i });
    fireEvent.click(closeBtn);

    expect(screen.queryByRole('dialog', { name: /Live AI Recommendation/i })).not.toBeInTheDocument();
  });

  it('opens and closes the Built-in Trap benchmark modal', () => {
    render(<App />);

    const trapBenchmarkBtn = screen.getByRole('button', { name: /Open Built-in Trap Benchmark Matrix Comparison/i });
    fireEvent.click(trapBenchmarkBtn);

    expect(screen.getByRole('dialog', { name: /Naive Keyword Matcher vs. ReelMind Cognitive Agent/i })).toBeInTheDocument();

    const closeBtn = screen.getByRole('button', { name: /Close Benchmark Modal/i });
    fireEvent.click(closeBtn);

    expect(screen.queryByRole('dialog', { name: /Naive Keyword Matcher vs. ReelMind Cognitive Agent/i })).not.toBeInTheDocument();
  });

  it('applies Built-in Trap scenario preset and updates recommendation state', () => {
    render(<App />);

    const trapPresetBtn = screen.getByText(/Built-in Trap/i);
    fireEvent.click(trapPresetBtn);

    // After applying the trap preset, trap should be active
    expect(screen.getByText(/Trap Avoided/i)).toBeInTheDocument();
  });
});
