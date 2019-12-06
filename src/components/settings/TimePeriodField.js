import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSettings } from '../../selectors';
import { setSettings } from '../../actions';

function TimePeriodField() {
  const { days } = useSelector(getSettings);
  const dispatch = useDispatch();

  const daysChangeHandler = useCallback(
    (event) => dispatch(setSettings({ days: Number(event.target.value) })),
    [dispatch]
  );

  return (
    <div className="field">
      <label className="label has-text-grey-lighter">Time period</label>
      <div className="control has-icons-left">
        <div className="select is-rounded">
          <select value={days.toString()} onChange={daysChangeHandler}>
            <option value="7">Past week</option>
            <option value="30">Past month</option>
            <option value="90">Past 3 months</option>
            <option value="180">Past 6 months</option>
            <option value="365">Past year</option>
          </select>
        </div>
        <span className="icon is-left">
          <i className="fas fa-history"></i>
        </span>
      </div>
    </div>
  );
}

export default TimePeriodField;
