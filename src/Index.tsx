import {
    Alert,
    Button,
    FocusPageLayout,
    FormField,
    HeroTitle,
    PageContents,
    TextInput,
} from '@design-system';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { PayeeVerificationIcon } from './PayeeVerificationIcon';
import { useRef } from 'react';

type PayeeVerification = {
    state: 'MATCH' | 'CLOSE_MATCH' | 'PARTIAL_MATCH' | 'NO_MATCH';
    name?: string;
};

type FormValues = {
    payeeName: string;
    payeeAccountNumber: string;
};

export const Index = () => {
    const { register, setValue, watch } = useForm<FormValues>({
        defaultValues: {
            payeeName: '',
            payeeAccountNumber: '',
        },
    });
    const payeeName = watch('payeeName');
    const payeeAccountNumber = watch('payeeAccountNumber');
    const input = (payeeAccountNumber + payeeName).toLowerCase().replace(/\s+/, '');
    const { data: verification } = useQuery<PayeeVerification>({
        queryKey: ['verifications', input],
        queryFn: async () => {
            try {
                const response = await fetch(
                    `http://localhost:3000/payee-verification/${input}`,
                );

                if (!response.ok) {
                    return { state: 'NO_MATCH' };
                }

                return response.json();
            } catch {
                return { state: 'NO_MATCH' };
            }
        },
        enabled: Boolean(payeeAccountNumber && payeeName),
    });
    const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    return (
        <FocusPageLayout>
            <HeroTitle title="Payee verification" />
            <PageContents>
                <form>
                    <FormField
                        label={
                            <>
                                Payee name{' '}
                                <PayeeVerificationIcon verification={verification} />
                            </>
                        }
                    >
                        <TextInput
                            {...register('payeeName')}
                            data-test="payee-name"
                            onChange={(e) => {
                                clearTimeout(debounceRef.current);
                                debounceRef.current = setTimeout(() => {
                                    setValue('payeeName', e.target.value.trim());
                                }, 3000);
                            }}
                            onBlur={(e) => {
                                clearTimeout(debounceRef.current);
                                setValue('payeeName', e.target.value.trim(), {
                                    shouldValidate: true,
                                });
                            }}
                        />
                    </FormField>
                    {verification?.state === 'MATCH' && (
                        <Alert variant="success" data-test="payee-verification-info">
                            This payee is verified
                        </Alert>
                    )}
                    {verification?.state === 'CLOSE_MATCH' && (
                        <Alert
                            variant="info"
                            data-test="payee-verification-info"
                            button={
                                verification?.name && (
                                    <Button
                                        data-test="match-payee-name-control"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setValue(
                                                'payeeName',
                                                verification?.name ?? payeeName,
                                            );
                                        }}
                                    >
                                        Update
                                    </Button>
                                )
                            }
                        >
                            There is a potential typo in payee name{' '}
                        </Alert>
                    )}
                    {verification?.state === 'PARTIAL_MATCH' && (
                        <Alert variant="warning" data-test="payee-verification-info">
                            The account number does not match the payee name
                        </Alert>
                    )}
                    {verification?.state === 'NO_MATCH' && (
                        <Alert variant="error" data-test="payee-verification-info">
                            No matching payee found
                        </Alert>
                    )}
                    <FormField label="Account number">
                        <TextInput
                            {...register('payeeAccountNumber')}
                            data-test="account-number"
                            onChange={(e) => {
                                clearTimeout(debounceRef.current);
                                debounceRef.current = setTimeout(() => {
                                    setValue('payeeAccountNumber', e.target.value.trim());
                                }, 3000);
                            }}
                            onBlur={(e) => {
                                clearTimeout(debounceRef.current);
                                setValue('payeeAccountNumber', e.target.value.trim(), {
                                    shouldValidate: true,
                                });
                            }}
                        />
                    </FormField>
                </form>
            </PageContents>
        </FocusPageLayout>
    );
};
