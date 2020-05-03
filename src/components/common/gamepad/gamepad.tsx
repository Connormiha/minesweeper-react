import style from './gamepad.styl';
import React from 'react';
import bem from 'bem-css-modules';

const b = bem(style);

interface IGamepadState {
    gamepads: Gamepad[];
}

export default class GamepadComponent extends React.PureComponent<{}, IGamepadState> {
    _handleGamepadConnectedBinded: (e: GamepadEvent) => void;

    constructor(props: {}) {
      super(props);

      this._handleGamepadConnectedBinded = this.handleGamepadConnected.bind(this);

      this.state = {
        gamepads: [...navigator.getGamepads()].filter(Boolean) as Gamepad[],
      };
    }

    componentDidMount(): void {
      window.addEventListener('gamepadconnected', this._handleGamepadConnectedBinded);
    }

    componentWillUnmount(): void {
      window.removeEventListener('gamepadconnected', this._handleGamepadConnectedBinded);
    }

    handleGamepadConnected(): void {
      this.setState({
        gamepads: [...navigator.getGamepads()].filter(Boolean) as Gamepad[],
      });
    }

    renderControls(): React.ReactChild {
      return (
        <section className={b()}>
          {
            this.state.gamepads.map((item) => {
              return (
                <div
                  key={item.id}
                >
                  {item.id}/{item.id}
                </div>
              );
            })
          }
        </section>
      );
    }

    render(): React.ReactNode {
      if (!this.state.gamepads.length) {
        return null;
      }

      return this.renderControls();
    }
}
