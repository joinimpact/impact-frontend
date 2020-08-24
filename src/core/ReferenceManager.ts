export default class ReferenceManager<T> {
  private refs: {[key in string]: T} = {};

  public registerRef(id: string, ref: T) {
    if (this.refs.hasOwnProperty(id)) {
      throw new Error(`Can't register ref with id: ${id} due to already registered`);
    }
    this.refs[id] = ref;
  }

  public get(id: string): T | null {
    return this.refs[id];
  }

  public unregisterRef(id: string) {
    delete(this.refs[id]);
  }
}
