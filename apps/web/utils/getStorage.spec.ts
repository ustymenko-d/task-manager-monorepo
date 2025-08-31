import getStorage from './getStorage';

describe('getStorage', () => {
  const originalLocalStorage = globalThis.localStorage;

  afterEach(() => {
    Object.defineProperty(globalThis, 'localStorage', {
      value: originalLocalStorage,
      writable: true,
      configurable: true,
    });
  });

  it('returns global localStorage when available (client)', () => {
    const fakeLocalStorage = {
      getItem: jest.fn().mockReturnValue('value'),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
      key: jest.fn(),
      length: 0,
    } as unknown as Storage;

    Object.defineProperty(globalThis, 'localStorage', {
      value: fakeLocalStorage,
      writable: true,
      configurable: true,
    });

    const storage = getStorage();

    // Same reference returned
    expect(storage).toBe(fakeLocalStorage);
    // Behaves like the provided storage
    storage.setItem('k', 'v');
    expect(fakeLocalStorage.setItem).toHaveBeenCalledWith('k', 'v');
  });

  it('returns a no-op storage mock when localStorage is absent (SSR)', () => {
    // Remove localStorage from globalThis
    Object.defineProperty(globalThis, 'localStorage', {
      value: undefined,
      writable: true,
      configurable: true,
    });

    const storage = getStorage();

    // Fallback API shape
    expect(typeof storage.getItem).toBe('function');
    expect(typeof storage.setItem).toBe('function');
    expect(typeof storage.removeItem).toBe('function');

    // Expected fallback behaviors
    expect(storage.getItem('missing')).toBeNull();

    // No-ops should not throw
    expect(() => storage.setItem('k', 'v')).not.toThrow();
    expect(() => storage.removeItem('k')).not.toThrow();
  });
});
