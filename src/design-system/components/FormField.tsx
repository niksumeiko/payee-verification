import {
    cloneElement,
    ComponentProps,
    isValidElement,
    PropsWithChildren,
    ReactElement,
    ReactNode,
    useId,
} from 'react';

interface Props extends ComponentProps<'div'> {
    label: ReactNode;
    children: ReactElement<{ id?: string }>;
}

export const FormField = ({ children, label, className = '', ...props }: Props) => {
    const id = useId();

    return (
        <div {...props} className={`mt-6 pb-0 ${className}`}>
            <FormLabel htmlFor={id}>{label}</FormLabel>
            {isValidElement(children) ? cloneElement(children, { id }) : children}
        </div>
    );
};

export const FormLabel = ({
    children,
    className = '',
    htmlFor,
    ...props
}: PropsWithChildren<ComponentProps<'label'>>) => (
    <label
        {...props}
        htmlFor={htmlFor}
        className={`inline-flex items-center gap-1 text-xl text-gray-700 ${className}`}
    >
        {children}
    </label>
);
