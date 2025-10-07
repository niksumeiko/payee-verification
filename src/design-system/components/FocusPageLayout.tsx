import type { PropsWithChildren } from 'react';

type Props = {
    className?: string;
};

export const FocusPageLayout = ({
    children,
    className = '',
}: PropsWithChildren<Props>) => {
    return (
        <div className="container mx-auto h-screen" style={{ maxWidth: '640px' }}>
            <div className="pt-8 md:pt-16 h-full">
                <div className={`py-4 px-10 h-full bg-white rounded-t-md ${className}`}>
                    {children}
                </div>
            </div>
        </div>
    );
};
