import React from 'react';
import {render} from '@testing-library/react-native';
import TrendingPeople from '../src/components/TrendingPeople';

test('renders TrendingPeople component', () => {
  render(<TrendingPeople />);
});
