import React from 'react';

import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

import Money from 'facturacion_common/src/Money.js';

import ServerErrorText from '../lib/formTable/ServerErrorText';

const ivaLabel = porcentajeIVA => `IVA ${porcentajeIVA}%: $`;
const nuevoLabel = 'Generar Factura';
const editarLabel = 'Guardar Cambios';
const errorMsgStyle = {
  fontSize: '14px',
  textAlign: 'left'
};

const ResultsTable = props => {
  const { isExamen, porcentajeIVA } = props;
  const subtotal = Money.print(props.subtotal);
  const rebaja = Money.print(props.rebaja);
  const impuestos = Money.print(props.impuestos);
  const total = Money.print(props.total);

  const ivaRow = isExamen ? null : (
    <tr>
      <td>
        <strong>{ivaLabel(porcentajeIVA)}</strong>
      </td>
      <td>{impuestos}</td>
    </tr>
  );
  return (
    <div style={{ float: 'right' }}>
      <table
        style={{ width: 'auto', display: 'inline-table', textAlign: 'right' }}
      >
        <tbody>
          <tr>
            <td>
              <strong>Subtotal: $</strong>
            </td>
            <td style={{ paddingLeft: '20px' }}>{subtotal}</td>
          </tr>
          {ivaRow}
          <tr>
            <td>
              <strong>Descuento: $</strong>
            </td>
            <td>{rebaja}</td>
          </tr>
          <tr>
            <td>
              <strong>Total: $</strong>
            </td>
            <td>{total}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const FacturaOptions = props => {
  const { detallado, contable, isExamen, onFacturaDataChanged } = props;

  if (isExamen) return null;
  return (
    <div style={{ width: '420px', float: 'left' }}>
      <Checkbox
        label={'Generar comprobante electrónico'}
        style={{ textAlign: 'left' }}
        checked={contable}
        onCheck={(event, isChecked) => {
          onFacturaDataChanged('contable', isChecked);
        }}
      />
      <Checkbox
        label={'Mostrar Información detallada en cada producto'}
        style={{ textAlign: 'left' }}
        checked={isExamen ? false : detallado}
        disabled={isExamen}
        onCheck={(event, isChecked) => {
          onFacturaDataChanged('detallado', isChecked);
        }}
      />
    </div>
  );
};

const GuardarFacturaButton = props => {
  const {
    nuevo,
    guardando,
    guardarButtonDisabled,
    onGuardarClick,
    subtotal
  } = props;
  const label = nuevo ? nuevoLabel : editarLabel;
  const childItem = guardando ? (
    <CircularProgress />
  ) : (
    <RaisedButton
      label={label}
      primary={true}
      onTouchTap={() => onGuardarClick(subtotal)}
      disabled={guardarButtonDisabled}
    />
  );
  return <div style={{ textAlign: 'center' }}>{childItem}</div>;
};

export default class FacturaResults extends React.Component {
  render() {
    return (
      <div style={{ width: '100%', paddingTop: '6px' }}>
        <ServerErrorText style={errorMsgStyle}>
          {this.props.errorUnidades}
        </ServerErrorText>
        <div style={{ overflow: 'auto' }}>
          <FacturaOptions {...this.props} />
          <ResultsTable {...this.props} />
        </div>
        <GuardarFacturaButton {...this.props} />
      </div>
    );
  }
}

FacturaResults.propTypes = {
  errorUnidades: React.PropTypes.string,
  isExamen: React.PropTypes.bool,
  contable: React.PropTypes.bool,
  guardando: React.PropTypes.bool,
  detallado: React.PropTypes.bool.isRequired,
  rebaja: React.PropTypes.number.isRequired,
  subtotal: React.PropTypes.number.isRequired,
  impuestos: React.PropTypes.number,
  total: React.PropTypes.number.isRequired,
  onGuardarClick: React.PropTypes.func,
  onFacturaDataChanged: React.PropTypes.func.isRequired,
  nuevo: React.PropTypes.bool.isRequired,
  porcentajeIVA: React.PropTypes.number
};

FacturaResults.defaultProps = {
  isExamen: false
};
