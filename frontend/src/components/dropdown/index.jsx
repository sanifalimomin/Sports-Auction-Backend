import React from 'react';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import useStyles from 'commons/styles';

const TeamDropDown = (props) => {
  const {
    formValue,
    onChangeHandler,
    data,
    idKey,
    valueKey,
    label,
    helperText,
    errorText,
    hasError,
    disabled,
    emptyValue,
    className,
    hideEmptyValue,
    dataTest,
    defaultText,
    hidden,
  } = props;

  const classes = useStyles();
  return (
    <>
      {!hidden && (
        <FormControl
          className={className === '' ? classes.formControl : className}
          error={hasError}
        >
          <InputLabel>{label}</InputLabel>
          <Select
            value={formValue}
            onChange={onChangeHandler}
            disabled={disabled}
            data-test={dataTest}
            hidden
          >
            {!hideEmptyValue && (
              <MenuItem hidden={hideEmptyValue} value={emptyValue}>
                {defaultText}
              </MenuItem>
            )}
            {data.map((d) => (
              <MenuItem value={d[idKey]} key={d[idKey]}>
                {d[valueKey].replaceAll('_', ' ')}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{helperText}</FormHelperText>
          <FormHelperText hidden={!hasError}>{errorText}</FormHelperText>
        </FormControl>
      )}
    </>
  );
};

TeamDropDown.propTypes = {
  hasError: PropTypes.bool,
  disabled: PropTypes.bool,
  hideEmptyValue: PropTypes.bool,
  /* eslint-disable */
  formValue: PropTypes.any,
  onChangeHandler: PropTypes.func,
  data: PropTypes.instanceOf(Array),
  emptyValue: PropTypes.any,
  idKey: PropTypes.string,
  valueKey: PropTypes.string,
  label: PropTypes.string,
  helperText: PropTypes.string,
  errorText: PropTypes.string,
  className: PropTypes.string,
  dataTest: PropTypes.string,
  hidden: PropTypes.bool,
  defaultText: PropTypes.string,
};
TeamDropDown.defaultProps = {
  formValue: '',
  hasError: false,
  disabled: false,
  data: [],
  emptyValue: '0',
  hideEmptyValue: false,
  idKey: 'id',
  valueKey: 'label',
  label: '',
  helperText: '',
  errorText: '',
  className: '',
  dataTest: '',
  hidden: false,
  onChangeHandler: () => {},
  defaultText: 'None',
};

export default TeamDropDown;
