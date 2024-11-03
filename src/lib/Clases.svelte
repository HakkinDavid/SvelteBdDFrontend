<script context="module">
  import { goto } from "$app/navigation";
  export class Cliente {
    #existent = false;
    static props_list = new Set(['nombre', 'apellido1', 'apellido2', 'dirección', 'teléfono', 'RFC', 'correo']);
    #data = {};
    #backup = {};
    
    #update_list = new Set();

    // GETTERS
    get existent () {
      return this.#existent;
    }
    get ID () {
      return this.#data.id;
    }
    get nombre () {
      return this.#data.nombre;
    }
    get apellido1 () {
      return this.#data.apellido1;
    }
    get apellido2 () {
      return this.#data.apellido2;
    }
    get dirección () {
      return this.#data.dirección;
    }
    get teléfono () {
      return this.#data.teléfono;
    }
    get RFC () {
      return this.#data.RFC;
    }
    get correo () {
      return this.#data.correo;
    }

    // SETTERS
    set nombre (x) {
      if (Cliente.invalid_input(x)) return;
      this.#data.nombre = Cliente.emptify(x);
      this.#update_list.add('nombre');
    }
    set apellido1 (x) {
      if (Cliente.invalid_input(x)) return;
      this.#data.apellido1 = Cliente.emptify(x);
      this.#update_list.add('apellido1');
    }
    set apellido2 (x) {
      if (Cliente.invalid_input(x)) return;
      this.#data.apellido2 = Cliente.emptify(x);
      this.#update_list.add('apellido2');
    }
    set dirección (x) {
      if (Cliente.invalid_input(x)) return;
      this.#data.dirección = Cliente.emptify(x);
      this.#update_list.add('dirección');
    }
    set teléfono (x) {
      if (Cliente.invalid_input(x)) return;
      this.#data.teléfono = Cliente.emptify(x);
      this.#update_list.add('teléfono');
    }
    set RFC (x) {
      if (Cliente.invalid_input(x)) return;
      this.#data.RFC = Cliente.emptify(x);
      this.#update_list.add('RFC');
    }
    set correo (x) {
      if (Cliente.invalid_input(x)) return;
      this.#data.correo = Cliente.emptify(x);
      this.#update_list.add('correo');
    }
    constructor (x) {
      if (x === null) return;
      this.#existent = true;
      this.#data.id = x.id;

      Cliente.props_list.forEach((prop) => {
        this.#data[prop] = x[prop];
        this.#backup[prop] = x[prop];
      });
    }

    get nombre_completo () {
      return this.#data.nombre + ' ' + this.#data.apellido1 + (this.#data.apellido2 ? ' ' + this.#data.apellido2 : '');
    }

    validate () {
      let valid = true;
      if (isNaN(this.#data.id)) valid = false;
      switch (null) {
        case this.#data.nombre:
          alert('El nombre no puede ser nulo.');
          valid = false;
        break;
        case this.#data.apellido1:
          alert('El apellido 1 no puede ser nulo.');
          valid = false;
        break;
        default:
        break;
      }
      return valid;
    }

    static invalid_input(x) {
      if (typeof x == "undefined" || typeof x == "null") return true;
      return false;
    }

    static emptify(x) {
      if (typeof x == "string" && x.length == 0) return null;
      return x;
    }

    update () {
      if (this.#update_list.size < 1) {
        return;
      }
      if (!this.validate()) return;
      let update_string = 'CALL stpUpd_cliente(' + this.#data.id + ', ';
      let i = 0;
      Cliente.props_list.forEach(
        (prop) => {
          update_string += (this.#data[prop] != null ? '\'' : '') + this.#data[prop] + (this.#data[prop] != null ? '\'' : '') + (i < (Cliente.props_list.size-1) ? ', ' : '');
          i++;
        }
      );
      update_string += ')';
      console.log('ACTUALIZACIÓN GENERADA:\n' + update_string);
      goto('/operar/' + encodeURIComponent(update_string));
    }

    insert () {
      if (this.#existent) return;
      if (!this.validate()) return;
      let insert_string = 'CALL stpIns_cliente(';
      let i = 0;
      Cliente.props_list.forEach(
        (prop) => {
          insert_string += (this.#data[prop] != null ? '\'' : '') + this.#data[prop] + (this.#data[prop] != null ? '\'' : '') + (i < (Cliente.props_list.size-1) ? ', ' : '');
          i++;
        }
      );
      insert_string += ')';

      console.log("INSERCIÓN GENERADA:\n" + insert_string);

      goto('/operar/' + encodeURIComponent(insert_string));
    }

    delete () {
      if (!this.#existent) return;
      if (isNaN(this.#data.id)) return;
      if (confirm("Confirma que deseas eliminar el registro de " + this.nombre_completo + ".")) {
        let delete_string = 'CALL stpDel_cliente(' + this.#data.id + ')';
        console.log("ELIMINACIÓN GENERADA:\n" + delete_string);
        goto('/operar/' + encodeURIComponent(delete_string));
      }
    }

    reset () {
      if (!this.#existent) return;
      if (isNaN(this.#data.id)) return;
      Cliente.props_list.forEach(
        (prop) => {
          this.#data[prop] = this.#backup[prop];
        }
      );
      this.#update_list = new Set();
    }
  };
</script>