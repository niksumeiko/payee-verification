import { FocusPageLayout, HeroTitle } from '@design-system';

import { Index } from './Index';

export const routes = [
    {
        index: true,
        path: '/',
        element: <Index />,
    },
    {
        path: '*',
        element: (
            <FocusPageLayout>
                <HeroTitle title="Page not found" disabled />
            </FocusPageLayout>
        ),
    },
];
