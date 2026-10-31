import { useCallback, useEffect, useState } from 'react';
import { calculate, checkApiHealth } from './api.js';

const symbols = { '+': '+', '-': '−', '*': '×', '/': '÷' };

const keys = [
  { label: 'AC', action: 'clear', kind: 'utility', ariaLabel: 'Borrar todo' },
  { label: '±', action: 'sign', kind: 'utility', ariaLabel: 'Cambiar signo' },
  { label: '⌫', action: 'backspace', kind: 'utility', icon: 'backspace', iconClass: 'backspace-icon', ariaLabel: 'Borrar último dígito' },
  { label: '÷', action: 'operator', value: '/', kind: 'operator', icon: 'device_hub', iconClass: 'divide-icon', ariaLabel: 'Dividir' },
  { label: '7', action: 'digit' },
  { label: '8', action: 'digit' },
  { label: '9', action: 'digit' },
  { label: '×', action: 'operator', value: '*', kind: 'operator', ariaLabel: 'Multiplicar' },
  { label: '4', action: 'digit' },
  { label: '5', action: 'digit' },
  { label: '6', action: 'digit' },
  { label: '−', action: 'operator', value: '-', kind: 'operator', ariaLabel: 'Restar' },
  { label: '1', action: 'digit' },
  { label: '2', action: 'digit' },
  { label: '3', action: 'digit' },
  { label: '+', action: 'operator', value: '+', kind: 'operator', ariaLabel: 'Sumar' },
  { label: '0', action: 'digit' },
  { label: '.', action: 'decimal', ariaLabel: 'Punto decimal' },
  { label: '=', action: 'equals', kind: 'equals', icon: 'equal', iconClass: 'equals-icon', ariaLabel: 'Igual' },
];

function formatNumber(value) {
  if (value === 'Error') return value;
  const [integer, decimal] = value.split('.');
  const grouped = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return decimal === undefined ? grouped : `${grouped}.${decimal}`;
}

function AppIcon({ children, className = '' }) {
  return <span className={`material-symbols-outlined ${className}`}>{children}</span>;
}

export default function Calculator() {
  const [current, setCurrent] = useState('0');
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [startNewNumber, setStartNewNumber] = useState(false);
  const [history, setHistory] = useState([]);
  const [status, setStatus] = useState('Conectando con la API…');
  const [apiOnline, setApiOnline] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [dark, setDark] = useState(false);

  useEffect(() => {
    let active = true;
    checkApiHealth()
      .then(() => {
        if (active) {
          setApiOnline(true);
          setStatus('En línea');
        }
      })
      .catch(() => {
        if (active) {
          setApiOnline(false);
          setStatus('API no disponible');
        }
      });
    return () => {
      active = false;
    };
  }, []);

  const clear = useCallback(() => {
    setCurrent('0');
    setFirstOperand(null);
    setOperator(null);
    setStartNewNumber(false);
    setError('');
  }, []);

  const enterDigit = useCallback((digit) => {
    setError('');
    setCurrent((previous) => {
      if (startNewNumber || previous === 'Error') return digit;
      if (previous.replace('-', '').replace('.', '').length >= 16) return previous;
      return previous === '0' ? digit : previous + digit;
    });
    setStartNewNumber(false);
  }, [startNewNumber]);

  const enterDecimal = useCallback(() => {
    setError('');
    setCurrent((previous) => {
      if (startNewNumber || previous === 'Error') return '0.';
      return previous.includes('.') ? previous : `${previous}.`;
    });
    setStartNewNumber(false);
  }, [startNewNumber]);

  const chooseOperator = useCallback((nextOperator) => {
    if (current === 'Error') return;
    setFirstOperand(current);
    setOperator(nextOperator);
    setStartNewNumber(true);
    setError('');
  }, [current]);

  const runCalculation = useCallback(async () => {
    if (firstOperand === null || operator === null || busy || current === 'Error') return;
    const secondOperand = startNewNumber ? firstOperand : current;
    setBusy(true);
    setError('');
    setStatus('Calculando…');

    try {
      const result = await calculate(firstOperand, secondOperand, operator);
      if (!Number.isFinite(Number(result))) {
        throw new Error('La API devolvió un resultado numérico no válido.');
      }
      const expression = `${formatNumber(firstOperand)} ${symbols[operator]} ${formatNumber(secondOperand)}`;
      setCurrent(result);
      setFirstOperand(null);
      setOperator(null);
      setStartNewNumber(true);
      setHistory((items) => [
        { id: `${Date.now()}-${items.length}`, expression, result: formatNumber(result) },
        ...items,
      ].slice(0, 20));
      setApiOnline(true);
      setStatus('En línea');
    } catch (calculationError) {
      setError(calculationError.message || 'No fue posible completar el cálculo.');
      setStatus('Error en la operación');
    } finally {
      setBusy(false);
    }
  }, [firstOperand, operator, busy, current, startNewNumber]);

  const handleAction = useCallback((key) => {
    switch (key.action) {
      case 'digit':
        enterDigit(key.label);
        break;
      case 'decimal':
        enterDecimal();
        break;
      case 'operator':
        chooseOperator(key.value);
        break;
      case 'equals':
        runCalculation();
        break;
      case 'clear':
        clear();
        break;
      case 'sign':
        setCurrent((value) => value === '0' || value === 'Error' ? value : value.startsWith('-') ? value.slice(1) : `-${value}`);
        setStartNewNumber(false);
        setError('');
        break;
      case 'backspace':
        setCurrent((value) => value === 'Error' || startNewNumber ? '0' : value.length > 1 ? value.slice(0, -1) : '0');
        setStartNewNumber(false);
        setError('');
        break;
      default:
        break;
    }
  }, [chooseOperator, clear, enterDecimal, enterDigit, runCalculation, startNewNumber]);

  useEffect(() => {
    function onKeyDown(event) {
      if (/^[0-9]$/.test(event.key)) handleAction({ action: 'digit', label: event.key });
      else if (event.key === '.') handleAction({ action: 'decimal' });
      else if (['+', '-', '*', '/'].includes(event.key)) handleAction({ action: 'operator', value: event.key });
      else if (event.key === 'Enter' || event.key === '=') {
        event.preventDefault();
        handleAction({ action: 'equals' });
      } else if (event.key === 'Backspace') handleAction({ action: 'backspace' });
      else if (event.key === 'Escape') handleAction({ action: 'clear' });
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleAction]);

  function restoreHistory(item) {
    setCurrent(item.result.replaceAll(',', ''));
    setFirstOperand(null);
    setOperator(null);
    setStartNewNumber(true);
    setError('');
  }

  async function copyResult() {
    try {
      await navigator.clipboard.writeText(current);
      setStatus('Resultado copiado');
    } catch {
      setError('No se pudo copiar el resultado al portapapeles.');
    }
  }

  return (
    <div className={`app-shell${dark ? ' dark' : ''}`}>
      <header className="topbar">
        <div className="topbar-inner">
          <a className="brand" href="#" aria-label="BlueCompute, inicio">
            <span className="brand-icon"><AppIcon>calculate</AppIcon></span>
            <span>BlueCompute</span>
          </a>
          <nav className="mode-tabs" aria-label="Modos de calculadora">
            <button className="mode-tab active" type="button">Estándar</button>
            <button className="mode-tab" type="button" disabled title="Disponible próximamente">Científica</button>
            <button className="mode-tab" type="button" disabled title="Disponible próximamente">Conversor</button>
            <button className="mode-tab" type="button" disabled title="Disponible próximamente">Preferencias</button>
          </nav>
          <div className="topbar-actions">
            <button className="icon-button" type="button" title="Cambiar tema" aria-label="Cambiar tema" onClick={() => setDark((value) => !value)}>
              <AppIcon>{dark ? 'light_mode' : 'dark_mode'}</AppIcon>
            </button>
            <span className="profile-icon" aria-hidden="true"><AppIcon>person</AppIcon></span>
          </div>
        </div>
      </header>

      <main className="workspace">
        <div className="dashboard">
          <section className="calculator-card" aria-label="Calculadora estándar">
            <div className="card-heading">
              <div className="heading-title"><span className="live-dot" /><h1>Calculadora Estándar</h1></div>
              <div className="heading-actions">
                <span className="mode-badge">DEC</span>
                <button className="icon-button small" type="button" title="Copiar resultado" aria-label="Copiar resultado" onClick={copyResult}>
                  <AppIcon>content_copy</AppIcon>
                </button>
              </div>
            </div>

            <div className="display" aria-live="polite" aria-atomic="true">
              <div className="display-expression">
                {firstOperand !== null && operator ? `${formatNumber(firstOperand)} ${symbols[operator]}` : '\u00a0'}
              </div>
              <output className="display-value">{formatNumber(current)}</output>
              <div className={`display-status${error ? ' error-text' : ''}`}>
                <AppIcon>{error ? 'error' : 'memory'}</AppIcon>
                <span>{error || (busy ? 'Calculando…' : status)}</span>
              </div>
            </div>

            <div className="keypad" aria-label="Teclado de la calculadora">
              {keys.map((key) => (
                <button
                  className={`calc-key ${key.kind || ''} ${key.action === 'operator' && operator === key.value ? 'selected' : ''}`}
                  type="button"
                  key={`${key.action}-${key.label}`}
                  onClick={() => handleAction(key)}
                  disabled={busy}
                  aria-label={key.ariaLabel || key.label}
                >
                  {key.icon ? <AppIcon className={key.iconClass}>{key.icon}</AppIcon> : key.label}
                </button>
              ))}
            </div>

            <div className="calculator-footnote">
              <span><AppIcon>keyboard</AppIcon> Teclado numérico: Enter =, Esc C</span>
              <span className="precision-note">IEEE-754 DP</span>
            </div>
          </section>

          <aside className="side-column">
            <section className="history-card" aria-label="Historial de cálculos">
              <div className="card-heading history-heading">
                <div className="heading-title">
                  <span className="history-icon"><AppIcon>history</AppIcon></span>
                  <h2>Historial</h2>
                </div>
                <button className="clear-history" type="button" onClick={() => setHistory([])} disabled={!history.length}>
                  <AppIcon>delete</AppIcon> Borrar historial
                </button>
              </div>
              <div className="history-list">
                {history.length ? history.map((item) => (
                  <button className="history-item" type="button" key={item.id} onClick={() => restoreHistory(item)}>
                    <span className="history-expression">{item.expression} =</span>
                    <span className="history-result">{item.result}</span>
                  </button>
                )) : (
                  <div className="history-empty">
                    <span className="history-empty-icon"><AppIcon>receipt_long</AppIcon></span>
                    <strong>Sin registros</strong>
                    <span>Las operaciones realizadas aparecerán en esta cinta.</span>
                  </div>
                )}
              </div>
              <div className="history-footer">
                <span><AppIcon>info</AppIcon> Clic en un elemento para recuperarlo</span>
                <strong>{history.length} {history.length === 1 ? 'item' : 'items'}</strong>
              </div>
            </section>

            <section className="operations-banner">
              <div className="operations-mark">Σ</div>
              <div className="operations-copy">
                <strong>Operaciones básicas</strong>
                <span>Aritmética decimal vía API</span>
              </div>
              <div className={`api-state${apiOnline ? ' online' : ''}`}>
                <span className="state-dot" />{apiOnline ? 'En línea' : 'Sin conexión'}
              </div>
            </section>
          </aside>
        </div>
      </main>

      <footer className="page-footer">
        <span>© 2025 BlueCompute Cloud Systems. Todos los derechos reservados.</span>
        <span><AppIcon>bolt</AppIcon> Precision Engine v1.0 <i /> {apiOnline ? 'Listo' : 'Esperando API'}</span>
      </footer>
    </div>
  );
}
