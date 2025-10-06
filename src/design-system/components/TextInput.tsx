import type { ComponentProps } from 'react';
import cx from 'classnames';

export const TextInput = ({ className, ...props }: ComponentProps<'input'>) => (
    <input
        {...props}
        className={`w-full px-3 py-2 text-lg shadow-sm border border-gray-200 ${cx(
            className,
            {
                'text-gray-400 bg-gray-100': props.disabled,
            },
        )}`}
    />
);
