import React from 'react';
import bem from 'bem-css-modules';
import style from './settings.styl';

import type {GameType, FieldFillParams} from 'flux/types';

const b = bem(style);
const label = b('label');
const labelText = b('label-text');

type PropsType = {
    game: GameType;
    onChangeFieldWidth: (width: number) => void;
    onChangeFieldHeight: (height: number) => void;
    onChangeFieldMinesCount: (count: number) => void;
    onStartGame: (params: FieldFillParams) => void;
};

type ISettingsInputProps = {
  min: string;
  max: string;
  value: number;
  title: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SettingsInput: React.FunctionComponent<ISettingsInputProps> = (props) => (
  <label className={label}>
    <span className={labelText}>
      {props.title}
    </span>
    <input
      type="number"
      min={props.min}
      max={props.max}
      value={props.value}
      onChange={props.onChange}
    />
  </label>
);

export default class Settings extends React.PureComponent<PropsType> {
  hanldeChangeWidth = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.props.onChangeFieldWidth(parseInt(e.target.value, 10));
  }

  hanldeChangeHeight = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.props.onChangeFieldHeight(parseInt(e.target.value, 10));
  }

  hanldeChangeMinesCount = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.props.onChangeFieldMinesCount(parseInt(e.target.value, 10));
  }

  handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    const {game: {width, height, minesCount}, onStartGame} = this.props;

    e.preventDefault();
    onStartGame({width, height, minesCount});
  }

  render(): React.ReactNode {
    const {width, height, minesCount} = this.props.game;

    return (
      <form
        className={b()}
        onSubmit={this.handleSubmit}
      >
        <SettingsInput
          min="1"
          max="10000"
          value={width}
          title="Cols"
          onChange={this.hanldeChangeWidth}
        />
        <SettingsInput
          min="1"
          max="10000"
          value={height}
          title="Rows"
          onChange={this.hanldeChangeHeight}
        />
        <SettingsInput
          min="1"
          max="100000"
          value={minesCount}
          title="Mines count"
          onChange={this.hanldeChangeMinesCount}
        />
        <input
          type="submit"
          value="Apply"
        />
      </form>
    );
  }
}
