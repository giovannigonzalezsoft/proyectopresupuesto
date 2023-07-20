class Ingreso extends Dato {
    constructor(descripcion, valor) {
        super(descripcion, valor);
        this._id = Ingreso.counter;
    }
    get id(){
        return this._id;
    }
    static get counter() {
        Ingreso._counter = (Ingreso._counter || 0) + 1;
        return Ingreso._counter;
    }
}
