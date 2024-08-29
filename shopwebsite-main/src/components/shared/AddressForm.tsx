// react
import React, {
    useEffect,
    useMemo,
    useState,
} from 'react';
// third-party
import classNames from 'classnames';
import { FormattedMessage, useIntl } from 'react-intl';
import { useFormContext } from 'react-hook-form';
// application
import { countriesApi } from '~/api';
import { ICountry } from '~/interfaces/country';
import { useDetachableForm } from '~/services/hooks';
import { validateEmail } from '~/services/validators';

export interface IAddressForm {
    firstName: string;
    lastName: string;
    company: string;
    country: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    postcode: string;
    email: string;
    phone: string;
}

interface Props {
    namespace?: string;
    disabled?: boolean;
    idPrefix?: string;
}

export function getAddressFormDefaultValue(initialData: IAddressForm | null = null): IAddressForm {
    return {
        firstName: '',
        lastName: '',
        company: '',
        country: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        postcode: '',
        email: '',
        phone: '',
        ...initialData,
    };
}

function AddressForm(props: Props) {
    const { namespace, disabled, idPrefix } = props;
    const intl = useIntl();
    const formMethods = useFormContext();
    const { errors: errorsProps } = formMethods.formState;
    const errors = namespace ? errorsProps[namespace] : errorsProps;
    const fieldId = idPrefix ? `${idPrefix}-` : '';
    const ns = useMemo(() => (namespace ? `${namespace}.` : ''), [namespace]);
    const [countries, setCountries] = useState<ICountry[] | null>(null);
    const register = useDetachableForm(formMethods, disabled || false);

    // Load countries.
    useEffect(() => {
        let canceled = false;

        countriesApi.getCountries().then((result) => {
            if (canceled) {
                return;
            }

            setCountries(result);
        });

        return () => {
            canceled = true;
        };
    }, []);

    if (countries === null) {
        return null;
    }

    return (
        <React.Fragment>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor={`${fieldId}first-name`}>
                        <FormattedMessage id="INPUT_FIRST_NAME_LABEL" />
                    </label>
                    <input
                        type="text"
                        id={`${fieldId}first-name`}
                        className={classNames('form-control', {
                            'is-invalid': errors?.firstName,
                        })}
                        disabled={disabled}
                        placeholder={intl.formatMessage({ id: 'INPUT_FIRST_NAME_PLACEHOLDER' })}
                        {...register(`${ns}firstName`, { required: true })}
                    />
                    <div className="invalid-feedback">
                        {errors?.firstName?.type === 'required' && (
                            <FormattedMessage id="ERROR_FORM_REQUIRED" />
                        )}
                    </div>
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor={`${fieldId}last-name`}>
                        <FormattedMessage id="INPUT_LAST_NAME_LABEL" />
                    </label>
                    <input
                        type="text"
                        id={`${fieldId}last-name`}
                        className={classNames('form-control', {
                            'is-invalid': errors?.lastName,
                        })}
                        disabled={disabled}
                        placeholder={intl.formatMessage({ id: 'INPUT_LAST_NAME_PLACEHOLDER' })}
                        {...register(`${ns}lastName`, { required: true })}
                    />
                    <div className="invalid-feedback">
                        {errors?.lastName?.type === 'required' && (
                            <FormattedMessage id="ERROR_FORM_REQUIRED" />
                        )}
                    </div>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor={`${fieldId}company-name`}>
                    <FormattedMessage id="INPUT_COMPANY_LABEL" />
                    <span className="text-muted">
                        {' ('}
                        <FormattedMessage id="TEXT_OPTIONAL" />
                        )
                    </span>
                </label>
                <input
                    type="text"
                    id={`${fieldId}company-name`}
                    className="form-control"
                    disabled={disabled}
                    placeholder={intl.formatMessage({ id: 'INPUT_COMPANY_PLACEHOLDER' })}
                    {...register(`${ns}company`)}
                />
            </div>
            <div className="form-group">
                <label htmlFor={`${fieldId}country`}>
                    <FormattedMessage id="INPUT_COUNTRY_LABEL" />
                </label>
                <select
                    id={`${fieldId}country`}
                    className={classNames('form-control', {
                        'is-invalid': errors?.country,
                    })}
                    disabled={disabled}
                    {...register(`${ns}country`, { required: true })}
                >
                    <option value="">{intl.formatMessage({ id: 'INPUT_COUNTRY_PLACEHOLDER' })}</option>
                    {countries && countries.map((country) => (
                        <option key={country.code} value={country.code}>
                            {intl.formatMessage({ id: `COUNTRY_NAME_${country.code}` })}
                        </option>
                    ))}
                </select>
                <div className="invalid-feedback">
                    {errors?.country?.type === 'required' && (
                        <FormattedMessage id="ERROR_FORM_REQUIRED" />
                    )}
                </div>
            </div>
            <div className="form-group">
                <label htmlFor={`${fieldId}address1`}>
                    <FormattedMessage id="INPUT_STREET_ADDRESS_LABEL" />
                </label>
                <input
                    type="text"
                    id={`${fieldId}address1`}
                    className={classNames('form-control', {
                        'is-invalid': errors?.address1,
                    })}
                    disabled={disabled}
                    placeholder={intl.formatMessage({ id: 'INPUT_STREET_ADDRESS_PLACEHOLDER_1' })}
                    {...register(`${ns}address1`, { required: true })}
                />
                <div className="invalid-feedback">
                    {errors?.address1?.type === 'required' && (
                        <FormattedMessage id="ERROR_FORM_REQUIRED" />
                    )}
                </div>

                <label htmlFor={`${fieldId}address2`} className="sr-only">
                    <FormattedMessage id="INPUT_STREET_ADDRESS_LABEL" />
                </label>
                <input
                    type="text"
                    id={`${fieldId}address2`}
                    className="form-control mt-2"
                    disabled={disabled}
                    placeholder={intl.formatMessage({ id: 'INPUT_STREET_ADDRESS_PLACEHOLDER_2' })}
                    {...register(`${ns}address2`)}
                />
            </div>
            <div className="form-group">
                <label htmlFor={`${fieldId}city`}>
                    <FormattedMessage id="INPUT_CITY_LABEL" />
                </label>
                <input
                    type="text"
                    id={`${fieldId}city`}
                    className={classNames('form-control', {
                        'is-invalid': errors?.city,
                    })}
                    disabled={disabled}
                    placeholder={intl.formatMessage({ id: 'INPUT_CITY_PLACEHOLDER' })}
                    {...register(`${ns}city`, { required: true })}
                />
                <div className="invalid-feedback">
                    {errors?.city?.type === 'required' && (
                        <FormattedMessage id="ERROR_FORM_REQUIRED" />
                    )}
                </div>
            </div>
            <div className="form-group">
                <label htmlFor={`${fieldId}state`}>
                    <FormattedMessage id="INPUT_STATE_LABEL" />
                </label>
                <input
                    type="text"
                    id={`${fieldId}state`}
                    className={classNames('form-control', {
                        'is-invalid': errors?.state,
                    })}
                    disabled={disabled}
                    placeholder={intl.formatMessage({ id: 'INPUT_STATE_PLACEHOLDER' })}
                    {...register(`${ns}state`, { required: true })}
                />
                <div className="invalid-feedback">
                    {errors?.state?.type === 'required' && (
                        <FormattedMessage id="ERROR_FORM_REQUIRED" />
                    )}
                </div>
            </div>
            <div className="form-group">
                <label htmlFor={`${fieldId}postcode`}>
                    <FormattedMessage id="INPUT_POSTCODE_LABEL" />
                </label>
                <input
                    type="text"
                    id={`${fieldId}postcode`}
                    className={classNames('form-control', {
                        'is-invalid': errors?.postcode,
                    })}
                    disabled={disabled}
                    placeholder={intl.formatMessage({ id: 'INPUT_POSTCODE_PLACEHOLDER' })}
                    {...register(`${ns}postcode`, { required: true })}
                />
                <div className="invalid-feedback">
                    {errors?.postcode?.type === 'required' && (
                        <FormattedMessage id="ERROR_FORM_REQUIRED" />
                    )}
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-6 mb-0">
                    <label htmlFor={`${fieldId}email`}>
                        <FormattedMessage id="INPUT_EMAIL_ADDRESS_LABEL" />
                    </label>
                    <input
                        type="email"
                        id={`${fieldId}email`}
                        className={classNames('form-control', {
                            'is-invalid': errors?.email,
                        })}
                        disabled={disabled}
                        placeholder={intl.formatMessage({ id: 'INPUT_EMAIL_ADDRESS_PLACEHOLDER' })}
                        {...register(`${ns}email`, { required: true, validate: { email: validateEmail } })}
                    />
                    <div className="invalid-feedback">
                        {errors?.email?.type === 'required' && (
                            <FormattedMessage id="ERROR_FORM_REQUIRED" />
                        )}
                        {errors?.email?.type === 'email' && (
                            <FormattedMessage id="ERROR_FORM_INCORRECT_EMAIL" />
                        )}
                    </div>
                </div>
                <div className="form-group col-md-6 mb-0">
                    <label htmlFor={`${fieldId}phone`}>
                        <FormattedMessage id="INPUT_PHONE_NUMBER_LABEL" />
                    </label>
                    <input
                        type="text"
                        id={`${fieldId}phone`}
                        className={classNames('form-control', {
                            'is-invalid': errors?.phone,
                        })}
                        disabled={disabled}
                        placeholder={intl.formatMessage({ id: 'INPUT_PHONE_NUMBER_PLACEHOLDER' })}
                        {...register(`${ns}phone`, { required: true })}
                    />
                    <div className="invalid-feedback">
                        {errors?.phone?.type === 'required' && (
                            <FormattedMessage id="ERROR_FORM_REQUIRED" />
                        )}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default AddressForm;
