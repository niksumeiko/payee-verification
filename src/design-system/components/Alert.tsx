import type { ComponentProps, PropsWithChildren, ReactNode } from 'react';
import cx from 'classnames';

interface Props extends ComponentProps<'div'> {
    variant: keyof typeof classNameByVariant;
    button?: ReactNode;
}

const classNameByVariant = {
    error: 'bg-red-100',
    info: 'border-s-4 border-blue-300/40 bg-sky-50',
    success: 'border-s-4 border-green-300/40 bg-green-50',
    warning: 'border-s-4 border-amber-300/40 bg-amber-50',
};

export const Alert = ({
    children,
    variant,
    button,
    className = '',
    ...props
}: PropsWithChildren<Props>) => (
    <div
        {...props}
        role="alert"
        className={cx(
            'flex items-center justify-between gap-4 px-4 mt-1',
            className,
            classNameByVariant[variant],
        )}
    >
        <div className="flex-1 py-4">{children}</div>
        {button && <div className="shrink-0">{button}</div>}
    </div>
);
