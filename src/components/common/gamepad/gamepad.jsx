// @flow
import style from './gamepad.styl';
import React from 'react';
import bem from 'bem-css-modules';

const b = bem(style);

interface IGamepadState {
    gamepads: Gamepad[]
}

export default class GamepadComponent extends React.PureComponent<any, IGamepadState> {
    _handleGamepadConnectedBinded: (e: any) => void;

    constructor(props) {
        super(props);

        this._handleGamepadConnectedBinded = this.handleGamepadConnected.bind(this);

        this.state = {
            gamepads: [...navigator.getGamepads()].filter(Boolean),
        };
    }

    componentDidMount() {
        window.addEventListener('gamepadconnected', this._handleGamepadConnectedBinded);
    }

    componentWillUnmount() {
        window.removeEventListener('gamepadconnected', this._handleGamepadConnectedBinded);
    }

    handleGamepadConnected(e) {
        this.setState({
            gamepads: [...navigator.getGamepads()].filter(Boolean),
        });
    }

    renderControls() {
        return (
            <section className={b()}>
                {
                    this.state.gamepads.map((item) => {
                        return (
                            <div
                                key={item.id}
                            >
                                {item.id}/{item.displayId}/{item.id}
                            </div>
                        );
                    })
                }
            </section>
        );
    }

    render() {
        if (!this.state.gamepads.length) {
            return null;
        }

        return this.renderControls();
    }
}
