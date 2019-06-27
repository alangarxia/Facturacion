import React, { Component } from 'react';

import TimePicker from 'material-ui/TimePicker';
import DatePicker from 'material-ui/DatePicker';
import IconButton from 'material-ui/IconButton';
import Backspace from 'material-ui/svg-icons/content/backspace';
import Edit from 'material-ui/svg-icons/image/edit';

import { toReadableDateTime } from 'facturacion_common/src/DateParser.js';

const txtMargin = '35px';
const smallButtonStyle = {
  width: 36,
  height: 36,
  padding: 9,
  verticalAlign: 'middle',
  display: 'inline-block'
};

const smallIconStyle = {
  width: 18,
  height: 18
};

export class DateTimePicker extends Component {
  render() {
    const { onDateChange, onTimeChange, onDeleteClick, value } = this.props;
    return (
      <div style={{ display: 'inline-block', marginRight: txtMargin }}>
        <DatePicker
          style={{ display: 'inline-block' }}
          textFieldStyle={{ width: '90px' }}
          hintText={'Fecha'}
          value={value}
          onChange={onDateChange}
        />
        <TimePicker
          style={{ display: 'inline-block' }}
          textFieldStyle={{ width: '50px' }}
          format="24hr"
          hintText={'Hora'}
          value={value}
          onChange={onTimeChange}
        />
        <IconButton
          iconStyle={smallIconStyle}
          style={smallButtonStyle}
          onClick={onDeleteClick}
        >
          <Backspace />
        </IconButton>
      </div>
    );
  }
}

export class CurrentTime extends Component {
  state = { date: new Date() };

  componentDidMount() {
    this.intervalId = setInterval(
      () => this.setState({ date: new Date() }),
      1000
    );
  }

  handleOnClick = () => {
    clearInterval(this.intervalId);
    this.props.onClick();
  };

  render() {
    const style = {
      display: 'inline-block',
      width: '176px',
      marginRight: txtMargin
    };
    return (
      <div style={style}>
        <span>{toReadableDateTime(this.state.date)}</span>
        <IconButton
          iconStyle={smallIconStyle}
          style={smallButtonStyle}
          onClick={this.handleOnClick}
        >
          <Edit />
        </IconButton>
      </div>
    );
  }
}
