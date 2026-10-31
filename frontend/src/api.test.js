import { afterEach, describe, expect, it, vi } from 'vitest';
import { calculate, checkApiHealth } from './api.js';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('calculate', () => {
  it.each([
    ['+', 'sumar'],
    ['-', 'restar'],
    ['*', 'multiplicar'],
    ['/', 'dividir'],
  ])('sends a request for the %s operation', async (operator, endpoint) => {
    const fetch = vi.fn().mockResolvedValue(new Response('5'));
    vi.stubGlobal('fetch', fetch);

    await expect(calculate('2', '3', operator)).resolves.toBe('5');

    const [url] = fetch.mock.calls[0];
    expect(url).toBe(`/api/v1/calculadora/${endpoint}?numero1=2&numero2=3`);
  });

  it('rejects unsupported operations without making a request', async () => {
    const fetch = vi.fn();
    vi.stubGlobal('fetch', fetch);

    await expect(calculate('2', '3', '%')).rejects.toThrow(
      'La operación seleccionada no es válida.',
    );
    expect(fetch).not.toHaveBeenCalled();
  });

  it('returns a result from a JSON response', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ resultado: 42 }), {
          headers: { 'Content-Type': 'application/json' },
        }),
      ),
    );

    await expect(calculate('40', '2', '+')).resolves.toBe('42');
  });

  it('surfaces API error details', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ detail: 'No se puede dividir entre cero.' }), {
          status: 400,
          headers: { 'Content-Type': 'application/problem+json' },
        }),
      ),
    );

    await expect(calculate('1', '0', '/')).rejects.toThrow(
      'No se puede dividir entre cero.',
    );
  });
});

describe('checkApiHealth', () => {
  it('checks the health endpoint', async () => {
    const fetch = vi.fn().mockResolvedValue(new Response(null, { status: 200 }));
    vi.stubGlobal('fetch', fetch);

    await expect(checkApiHealth()).resolves.toBe(true);
    expect(fetch).toHaveBeenCalledWith('/health');
  });

  it('rejects an unsuccessful health response', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response(null, { status: 503 })),
    );

    await expect(checkApiHealth()).rejects.toThrow(
      'La API respondió con el código 503.',
    );
  });
});
