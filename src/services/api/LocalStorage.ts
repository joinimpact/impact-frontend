class LocalStorage {
  public static get instance(): LocalStorage {
    this._instance = this._instance || new LocalStorage();
    return this._instance;
  }
  public static get available() {
    const key = `_check.${Date.now()}`;
    const value = `_value.${Date.now()}`;
    try {
      localStorage.setItem(key, value);
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      return false;
    }
  }

  private static _instance: LocalStorage;
  private readonly _available: boolean;

  constructor() {
    this._available = LocalStorage.available;
  }

  public set<T>(key: string, item: T): void {
    if (!this._available) {
      return;
    }

    localStorage.setItem(key, JSON.stringify(item));
  }

  public get<T, D>(key: string, def: D): T | D {
    if (!this._available) {
      return def;
    }

    const data = localStorage.getItem(key);

    try {
      return data ? JSON.parse(data) as T : def;
    } catch (e) {
      console.error(e);
    }

    return def;
  }

  public remove(key: string): void {
    if (!this._available) {
      return;
    }

    localStorage.removeItem(key);
  }
}

const storage = LocalStorage.instance;
export { LocalStorage };
export default storage;
