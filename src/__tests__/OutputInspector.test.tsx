import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { OutputInspector } from '../components/OutputInspector';
import { RecommendationResult } from '../types/reel';

const mockRecommendation: RecommendationResult = {
  output: {
    'CURRENT REEL': 'Java NullPointer Meme',
    'INTEREST DETECTED': 'Distributed Systems & Microservices',
    'WHY': 'High retention on concurrency and error handling content.',
    'RECOMMENDED TECH REEL': 'Distributed Transactions (Saga Pattern) in Production',
    'CATEGORY': 'HLD',
    'WHY THIS RECOMMENDATION': 'Connects developer debugging to real-world distributed architectures.',
    'DIFFICULTY': 'Intermediate',
    'CONFIDENCE': 'High',
  },
  trapDetected: true,
  trapExplanation: 'Avoided naive Java syntax loop recommendation.',
  chainOfThought: [],
  interestVector: [],
  pedagogicalBridge: 'From NPE jokes to saga patterns',
  antiHypeVerification: {
    isHypeFree: true,
    educationalDepthScore: 94,
    actionableTakeaways: ['Understand Saga choreographies', 'Handle compensating transactions'],
  },
};

describe('OutputInspector Component', () => {
  it('renders all 8 contract output keys and their values', () => {
    render(<OutputInspector recommendation={mockRecommendation} />);

    expect(screen.getByText('CURRENT REEL')).toBeInTheDocument();
    expect(screen.getByText('INTEREST DETECTED')).toBeInTheDocument();
    expect(screen.getByText('WHY:')).toBeInTheDocument();
    expect(screen.getByText('RECOMMENDED TECH REEL')).toBeInTheDocument();
    expect(screen.getByText('CATEGORY:')).toBeInTheDocument();
    expect(screen.getByText('WHY THIS RECOMMENDATION:')).toBeInTheDocument();
    expect(screen.getByText('DIFFICULTY:')).toBeInTheDocument();
    expect(screen.getByText('CONFIDENCE:')).toBeInTheDocument();

    expect(screen.getByText('Distributed Transactions (Saga Pattern) in Production')).toBeInTheDocument();
  });
});
