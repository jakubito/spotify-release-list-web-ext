import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { getLastSyncDate, getUser, getSyncedOnce } from '../selectors';
import { showSettingsModal } from '../actions';
import SpotifySyncButton from './SpotifySyncButton';
import './Navbar.css';
import Profile from './Profile';

function Navbar() {
  const syncedOnce = useSelector(getSyncedOnce);
  const lastSyncDate = useSelector(getLastSyncDate);
  const user = useSelector(getUser);
  const dispatch = useDispatch();

  return (
    <nav className="Navbar">
      <div className="title is-4 has-text-light has-text-right is-hidden-mobile">
        Spotify Release List
      </div>
      {syncedOnce && <SpotifySyncButton title="Refresh" icon="fas fa-sync" />}
      {syncedOnce && (
        <div className="last-update has-text-grey is-hidden-touch">
          Last update: {lastSyncDate ? `${formatDistanceToNow(lastSyncDate)} ago` : 'Never'}
        </div>
      )}
      <div className="right">
        {user && <Profile name={user.name} image={user.image} className="is-hidden-touch" />}
        <button
          className="button is-rounded is-dark has-text-weight-semibold"
          onClick={() => dispatch(showSettingsModal())}
        >
          <span className="icon">
            <i className="fas fa-cog"></i>
          </span>
          <span>Settings</span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
