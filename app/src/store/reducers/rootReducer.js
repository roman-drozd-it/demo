import { combineReducers } from 'redux';
import room from './room';
import mingleRooms from './mingleRooms';
import me from './me';
import producers from './producers';
import consumers from './consumers';
import transports from './transports';
import peers from './peers';
import lobbyPeers from './lobbyPeers';
import peerVolumes from './peerVolumes';
import notifications from './notifications';
import toolarea from './toolarea';
import vod from './vod';
import chat from './chat';
import files from './files';
import recorder from './recorder';
import settings from './settings';
import config from './config';
import intl from './intl';

export default combineReducers({
	// intl : intlReducer,
	room,
	mingleRooms,
	me,
	producers,
	consumers,
	transports,
	peers,
	lobbyPeers,
	peerVolumes,
	notifications,
	toolarea,
	chat,
	files,
	recorder,
	vod,
	settings,
	config,
	intl
});
