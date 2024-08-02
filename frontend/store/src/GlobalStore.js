import { makeAutoObservable } from "mobx";

class GlobalStore {
    currentUser = { name: "John Doe", age: 30 };
    cards = [];

    constructor() {
        makeAutoObservable(this);
    }

    setUser(user) {
        this.currentUser = user;
    }

    setProducts(products) {
        this.cards = products;
    }

    clearUser() {
        this.currentUser = {};
    }

    clearProducts() {
        this.cards = [];
    }
}

const globalStore = new GlobalStore();
export default globalStore;
