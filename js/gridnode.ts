

class GridNode {
    id: number;
    el: HTMLElement;
    type: string;

    constructor(el, id, type) {
        this.el = el;
        this.id = id;
        this.type = type;

    }

    set nodeType(value) {
        this.type = value;
        this.updateType();
    }

    updateType() {

        this.el.classList.add("grid__block");

        if (this.type === "food") {
            return this.el.classList.add('grid__block--food')
        }
        if (this.type === "snake") {
            return this.el.classList.add("grid__block--snake")
        }
        if (this.type === "grid") {
             this.el.classList.remove("grid__block--snake");
             this.el.classList.remove("grid__block--food");

        }
    }
}

export default GridNode;