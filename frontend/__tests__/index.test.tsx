import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Home from '../src/pages/index';

describe('Home', () => {
    it('renders without crashing', () => {
        render(<Home />);

        // Placeholder test that always passes
        expect(true).toBeTruthy();
    });
});
