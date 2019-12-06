import React from 'react';
import { useSelector } from 'react-redux';
import { getSyncing, getSyncedOnce } from '../selectors';
import Loading from './Loading';
import Releases from './Releases';
import SpotifySyncButton from './SpotifySyncButton';
import './Content.css';

function Content() {
  const syncing = useSelector(getSyncing);
  const syncedOnce = useSelector(getSyncedOnce);

  if (!syncedOnce) {
    return (
      <div className="content">
        <div className="center has-background-black has-text-weight-semibold">
          <SpotifySyncButton title="Connect Spotify account" className="is-medium" />
        </div>
      </div>
    );
  }

  return <div className="content">{syncing ? <Loading /> : <Releases />}</div>;
}

export default Content;
