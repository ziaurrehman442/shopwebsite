// react
// third-party
import classNames from 'classnames';
// application
import useVehicleForm from '~/services/forms/vehicle';
import { IVehicle } from '~/interfaces/vehicle';
import React, { useRef, useState } from 'react';
import { vehicleApi } from '~/api';
import { FormattedMessage, useIntl } from 'react-intl';

interface Props extends React.HTMLAttributes<HTMLElement> {
    onVehicleChange?: (event: IVehicle | null) => void;
}

function VehicleSelect(props: Props) {
    const cancelVinRequest = useRef(() => {});
const [vinIsLoading, setVinIsLoading] = useState(false);
const [vinError, setVinError] = useState<unknown | null>(null);
const [vehicleByVin, setVehicleByVin] = useState<IVehicle | null>(null);
const intl = useIntl();

    const { onVehicleChange, className, ...rootProps } = props;
    const rootClasses = classNames('vehicle-select', className);
    const form = useVehicleForm({
        onChange: onVehicleChange,
    });
    const handleVinChange = (event: React.FormEvent<HTMLInputElement>) => {
        let canceled = false;
    
        cancelVinRequest.current();
        cancelVinRequest.current = () => {
            canceled = true;
        };
    
        const value = event.currentTarget.value.trim();
    
        setVinIsLoading(value !== '');
    
        if (value === '') {
            setVehicleByVin(null);
            setVinError(null);
            return;
        }
    
        setTimeout(async () => {
            if (value === '' || canceled) {
                return;
            }
    
            try {
                const vehicle = await vehicleApi.getVehicleByVin(value);
    
                if (canceled) {
                    return;
                }
    
                setVehicleByVin(vehicle);
                setVinError(null);
            } catch (error) {
                if (canceled) {
                    return;
                }
    
                setVehicleByVin(null);
                setVinError(error);
            }
    
            setVinIsLoading(false);
        }, 350);
    };
    
    return (
        <div className={rootClasses} {...rootProps}>
            <div className="vehicle-select__list">
                {form.items.map((item, itemIdx) => {
                    const options = item.options as Array<number | string | IVehicle>;
    
                    return (
                        <div
                            key={itemIdx}
                            className={classNames('vehicle-select__item', {
                                'vehicle-select__item--loading': item.loading,
                            })}
                        >
                            <select
                                className="vehicle-select__item-control"
                                aria-label={item.label}
                                name={item.key}
                                value={item.value}
                                disabled={item.disabled}
                                onChange={(e) => form.onItemValueChange(itemIdx, e.target.value)}
                            >
                                <option value="none">{item.placeholder}</option>
                                {options.map((option, optionIdx) => (
                                    <option key={optionIdx} value={form.serializeOption(option, item)}>
                                        {form.serializeOption(option, item)}
                                    </option>
                                ))}
                            </select>
                            <div className="vehicle-select__item-loader" />
                        </div>
                    );
                })}
            </div>
            <div className="vehicle-select__divider">
                <FormattedMessage id="TEXT_OR" />
            </div>
            <div className={classNames('vehicle-select__item', { 'vehicle-select__item--loading': vinIsLoading })}>
                <div className="vehicle-select__item-input">
                    <input
                        type="text"
                        className="form-control"
                        name="vin"
                        aria-label={intl.formatMessage({ id: 'INPUT_VIN_LABEL' })}
                        placeholder={intl.formatMessage({ id: 'INPUT_VIN_PLACEHOLDER' })}
                        onInput={handleVinChange}
                    />
                    <div className="vehicle-select__item-loader" />
                </div>
                {(vehicleByVin || vinError !== null) && (
                    <div className="vehicle-select__item-alert">
                        {vehicleByVin && (
                            <div className="alert alert-sm alert-primary my-0">
                                <FormattedMessage
                                    id="TEXT_ALERT_VEHICLE_FOUND"
                                    values={{ ...vehicleByVin }}
                                />
                            </div>
                        )}
                        {vinError !== null && (
                            <div className="alert alert-sm alert-danger my-0">
                                <FormattedMessage id="TEXT_ALERT_UNABLE_TO_FIND_VEHICLE_BY_VIN" />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
    
}

export default VehicleSelect;
