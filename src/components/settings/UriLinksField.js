import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSettings } from '../../selectors';
import { setSettings } from '../../actions';

function UriLinksField() {
  const { uriLinks } = useSelector(getSettings);
  const dispatch = useDispatch();

  const uriLinksChangeHandler = useCallback(
    (event) => dispatch(setSettings({ uriLinks: !!Number(event.target.name) })),
    [dispatch]
  );

  return (
    <div className="field">
      <label className="label has-text-light">Open links in</label>
      <div className="control">
        <div className="field">
          <input
            className="is-checkradio has-background-color is-white"
            id="uriLinksFalse"
            type="radio"
            name="0"
            checked={!uriLinks}
            onChange={uriLinksChangeHandler}
          />
          <label htmlFor="uriLinksFalse">New tab</label>
          <input
            className="is-checkradio has-background-color is-white"
            id="uriLinksTrue"
            type="radio"
            name="1"
            checked={uriLinks}
            onChange={uriLinksChangeHandler}
          />
          <label htmlFor="uriLinksTrue">Desktop app</label>
        </div>
      </div>
    </div>
  );
}

export default UriLinksField;
