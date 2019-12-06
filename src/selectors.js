import { createSelector } from 'reselect';
import orderBy from 'lodash.orderby';

export const getUser = (state) => state.user;
export const getSyncing = (state) => state.syncing;
export const getSyncedOnce = (state) => state.syncedOnce;
export const getLastSync = (state) => state.lastSync;
export const getArtists = (state) => state.artists;
export const getAlbums = (state) => state.albums;
export const getSettings = (state) => state.settings;
export const getSettingsModalVisible = (state) => state.settingsModalVisible;
export const getResetModalVisible = (state) => state.resetModalVisible;

export const getArtistsCount = createSelector(
  getArtists,
  (artistsMap) => Object.keys(artistsMap).length
);

export const getLastSyncDate = createSelector(getLastSync, (lastSync) =>
  lastSync ? new Date(lastSync) : lastSync
);

const getAlbumsArray = createSelector(getAlbums, (albums) => Object.values(albums));

const getDayPrecisionAlbums = createSelector(getAlbumsArray, (albums) =>
  albums.filter((album) => album.releaseDatePrecision === 'day')
);

const getDayReleasesMap = createSelector(getDayPrecisionAlbums, (albums) =>
  albums.reduce(
    (acc, album) => ({
      ...acc,
      [album.releaseDate]: [...(acc[album.releaseDate] || []), album],
    }),
    {}
  )
);

export const getDayReleasesSortedEntries = createSelector(getDayReleasesMap, (dayReleasesMap) => {
  const entriesOriginal = Object.entries(dayReleasesMap);
  const entriesSortedByDay = orderBy(entriesOriginal, ([day]) => day, 'desc');
  const entries = entriesSortedByDay.map(([day, albums]) => [
    day,
    orderBy(albums, (album) => album.name),
  ]);

  return entries;
});

export const getAnyModalVisible = createSelector(
  getSettingsModalVisible,
  getResetModalVisible,
  (settingsModalVisible, resetModalVisible) => settingsModalVisible || resetModalVisible
);
