import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { AgentDashboard } from '../components/AgentDashboard';
import { RecommendationResult } from '../types/reel';

const mockRecommendation: RecommendationResult = {
  output: {
    'CURRENT REEL': 'Java NullPointer Meme',
    'INTEREST DETECTED': 'Distributed Systems & Microservices',
    'WHY': 'High retention on concurrency and error handling content.',
    'RECOMMENDED TECH REEL': 'Distributed Transactions in Production',
    'CATEGORY': 'HLD',
    'WHY THIS RECOMMENDATION': 'Connects developer debugging to real-world distributed architectures.',
    'DIFFICULTY': 'Intermediate',
    'CONFIDENCE': 'High',
  },
  trapDetected: true,
  trapExplanation: 'Avoided naive Java syntax loop recommendation.',
  naiveRecommendationAlternative: {
    title: 'Generic Java For-Loops Tutorial',
    category: 'Java Syntax (Shallow)',
    whyItFails: 'Fails to detect latent engineering depth and serves boring syntax loops.',
  },
  chainOfThought: [
    {
      id: 'step-1',
      phase: 'INGESTION',
      title: 'Multimodal Interaction Stream Ingestion',
      description: 'Ingested 2 reel interactions.',
      status: 'completed',
      timestamp: '12:00:00 PM',
    },
  ],
  interestVector: [
    { name: 'Distributed Systems & HLD', score: 92, category: 'HLD' },
  ],
  pedagogicalBridge: 'From NPE jokes to microservice resilience.',
  antiHypeVerification: {
    isHypeFree: true,
    educationalDepthScore: 95,
    actionableTakeaways: ['Understand Saga choreographies', 'Design idempotency keys'],
  },
};

describe('AgentDashboard Component', () => {
  it('renders cognitive architecture metrics and trap detection alert', () => {
    render(<AgentDashboard recommendation={mockRecommendation} onOpenTrapModal={vi.fn()} />);

    expect(screen.getByText('AI Agent Reasoning Core')).toBeInTheDocument();
    expect(screen.getByText(/Live CoT Trace/i)).toBeInTheDocument();
    expect(screen.getByText(/Inferred Latent Affinity Vectors/i)).toBeInTheDocument();
    expect(screen.getByText(/Anti-Hype Filter Rating:/i)).toBeInTheDocument();
  });
});
