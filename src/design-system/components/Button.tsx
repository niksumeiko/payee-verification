import type { ComponentProps, PropsWithChildren } from 'react';
import cx from 'classnames';

export const Button = ({
    children,
    className = '',
    ...props
}: PropsWithChildren<ComponentProps<'button'>>) => (
    <button
        {...props}
        className={cx(
            'py-2 px-4',
            'cursor-pointer text-white bg-blue-500 hover:bg-blue-700 active:bg-blue-800',
            className,
        )}
    >
        {children}
    </button>
);
