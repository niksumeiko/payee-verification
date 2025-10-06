import { FC } from 'react';
import {
    CheckCircleIcon,
    ExclamationTriangleIcon,
    InformationCircleIcon,
} from '@heroicons/react/24/solid';

type PayeeVerification = {
    state: 'MATCH' | 'CLOSE_MATCH' | 'PARTIAL_MATCH' | 'NO_MATCH';
    name?: string;
};

type Props = {
    verification?: PayeeVerification;
};

export const PayeeVerificationIcon: FC<Props> = ({ verification }) => {
    if (verification?.state === 'MATCH') {
        return (
            <CheckCircleIcon
                data-test="payee-verification-icon"
                className={`h-5 w-5 text-green-500`}
                title="Verified"
                aria-hidden="true"
            />
        );
    }

    if (verification?.state === 'CLOSE_MATCH') {
        return (
            <InformationCircleIcon
                data-test="payee-verification-icon"
                className={`h-5 w-5 text-blue-500`}
                title="Close match"
                aria-hidden="true"
            />
        );
    }

    if (verification?.state === 'PARTIAL_MATCH') {
        return (
            <ExclamationTriangleIcon
                data-test="payee-verification-icon"
                className={`h-5 w-5 text-amber-500`}
                title="Partial match"
                aria-hidden="true"
            />
        );
    }

    return null;
};
