import { bind } from 'decko';

type IChangeStateCallback = (isOpen: boolean) => void;

interface IModalState {
	id: number;
	isOpen: boolean;
	changeStateCallback: IChangeStateCallback;
}

export interface IModalManager {
	id: number;
	onChangeState(isOpen: boolean): void;
	unregister(): void;
}

class ModalManager {
	public static get instance(): ModalManager {
		this._instance = this._instance || new ModalManager();
		return this._instance;
	}
	private static _instance: ModalManager;
	private lastId = 0;
	private states: { [key in number]: IModalState } = {};
	private zStack: IModalState[] = [];

	public registerModal(changeStateCallback: IChangeStateCallback) {
		const id = this.nextId;
		const cbfn = (isOpen: boolean) => {
			changeStateCallback(isOpen);
		};
		this.states[id] = {
			id,
			changeStateCallback: cbfn,
			isOpen: false,
		};

		return {
			id,
			onChangeState: (nextOpenState: boolean) => {
				if (nextOpenState) {
					if (this.zStack.length > 0) {
						this.zStack[this.zStack.length - 1].changeStateCallback(false);
					}

					this.states[id].changeStateCallback(true);
					this.zStack.push(this.states[id]);
					this.states[id].isOpen = true;
				} else {
					if (this.states[id].isOpen) {
						this.zStack.pop();
						this.showTop();
					}
					this.states[id].isOpen = false;
				}
			},
			unregister: () => {
				delete this.states[id];
				if (this.zStack.length > 0) {
					const topModal = this.zStack[this.zStack.length - 1];
					if (topModal.id === id) {
						// Top modal is ours and we need to show next in stack
						this.zStack.pop();
						this.showTop();
					} else {
						// Remove modal from zStack (silently)
						this.zStack = this.zStack.filter((item) => item.id !== id);
					}
				}
			},
		};
	}

	/* @bind
  private get top(): IModalState | null {
    return this.zStack.length > 0 ? this.zStack[this.zStack.length - 1] : null;
  }*/

	@bind
	private showTop() {
		if (this.zStack.length > 0) {
			this.zStack[this.zStack.length - 1].changeStateCallback(true);
		}
	}

	private get nextId() {
		const nextId = ++this.lastId;
		if (nextId > 100) {
			this.lastId = 1;
		}
		return nextId;
	}
}

const instance = ModalManager.instance;
export default instance;
