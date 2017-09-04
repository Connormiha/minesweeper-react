import {combineReducers} from 'redux';
import message from 'flux/message';
import game from 'flux/game';

export default combineReducers({
    message,
    game
});
