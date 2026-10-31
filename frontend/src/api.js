const operations = {
  '+': 'sumar',
  '-': 'restar',
  '*': 'multiplicar',
  '/': 'dividir',
};

function resultFromResponse(text) {
  if (!text.trim()) {
    throw new Error('La API respondió sin incluir un resultado.');
  }

  let value = text;
  try {
    value = JSON.parse(text);
  } catch {
    // Spring may return a plain-text decimal instead of JSON.
  }

  if (typeof value === 'number' || typeof value === 'string') {
    return String(value);
  }

  if (value && typeof value === 'object') {
    const result = value.resultado ?? value.result ?? value.value;
    if (typeof result === 'number' || typeof result === 'string') {
      return String(result);
    }
    if (typeof value.detail === 'string') {
      throw new Error(value.detail);
    }
  }

  throw new Error('La respuesta de la API no contiene un resultado numérico.');
}

async function readError(response) {
  const text = await response.text();
  if (text) {
    try {
      const problem = JSON.parse(text);
      if (typeof problem.detail === 'string') return problem.detail;
      if (typeof problem.title === 'string') return problem.title;
    } catch {
      return text;
    }
  }
  return `La API respondió con el código ${response.status}.`;
}

export async function calculate(first, second, operator) {
  const operation = operations[operator];
  if (!operation) throw new Error('La operación seleccionada no es válida.');

  const params = new URLSearchParams({
    numero1: first,
    numero2: second,
  });
  const response = await fetch(`/api/v1/calculadora/${operation}?${params}`);
  if (!response.ok) throw new Error(await readError(response));
  return resultFromResponse(await response.text());
}

export async function checkApiHealth() {
  const response = await fetch('/health');
  if (!response.ok) throw new Error(`La API respondió con el código ${response.status}.`);
  return true;
}
