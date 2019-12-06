import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { localStorage } from 'redux-persist-webextension-storage';
import createSagaMiddleware from 'redux-saga';
import {
  SYNC,
  SYNC_FINISHED,
  SET_USER,
  ADD_ALBUMS,
  SET_ARTISTS,
  RESET,
  SET_SETTINGS,
  SHOW_SETTINGS_MODAL,
  HIDE_SETTINGS_MODAL,
  SHOW_RESET_MODAL,
  HIDE_RESET_MODAL,
} from './actions';
import saga from './sagas';

const persistConfig = {
  key: 'root',
  storage: localStorage,
  stateReconciler: autoMergeLevel2,
};

const initialState = {
  user: null,
  syncing: false,
  syncedOnce: false,
  lastSync: null,
  settingsModalVisible: false,
  resetModalVisible: false,
  artists: {},
  albums: {},
  settings: {
    groups: ['album', 'single', 'compilation', 'appears_on'],
    days: 30,
    market: '',
    uriLinks: false,
  },
};

function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SYNC:
      return {
        ...state,
        syncing: true,
        artists: {},
        albums: {},
      };
    case SYNC_FINISHED:
      return {
        ...state,
        syncing: false,
        syncedOnce: true,
        lastSync: new Date().toISOString(),
      };
    case SET_USER:
      return {
        ...state,
        user: payload.user,
      };
    case SET_ARTISTS:
      return {
        ...state,
        artists: payload.artists.reduce(
          (acc, artist) => ({
            ...acc,
            [artist.id]: artist,
          }),
          {}
        ),
      };
    case ADD_ALBUMS:
      return {
        ...state,
        albums: payload.albums.reduce(
          (acc, album) => {
            if (album.releaseDate < payload.afterDateString) {
              return acc;
            }

            const { meta, ...albumRest } = album;

            if (!acc[album.id]) {
              acc[album.id] = albumRest;
            }

            acc[album.id].groups[meta.group] = [...acc[album.id].groups[meta.group], meta.artistId];

            return acc;
          },
          { ...state.albums }
        ),
      };
    case SET_SETTINGS:
      return {
        ...state,
        settings: {
          ...state.settings,
          ...payload.settings,
        },
      };
    case SHOW_SETTINGS_MODAL:
      return {
        ...state,
        settingsModalVisible: true,
        resetModalVisible: false,
      };
    case HIDE_SETTINGS_MODAL:
      return {
        ...state,
        settingsModalVisible: false,
      };
    case SHOW_RESET_MODAL:
      return {
        ...state,
        resetModalVisible: true,
        settingsModalVisible: false,
      };
    case HIDE_RESET_MODAL:
      return {
        ...state,
        resetModalVisible: false,
      };
    case RESET:
      return {
        ...initialState,
        settings: state.settings,
      };
    default:
      return state;
  }
}

const persistedReducer = persistReducer(persistConfig, reducer);
const sagaMiddleware = createSagaMiddleware();
export const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
export const hydrate = new Promise((resolve) => {
  persistStore(store, null, resolve);
});

sagaMiddleware.run(saga);
