<script context="module">
  import { goto } from "$app/navigation";
  class Row {
    static columns = {
      "cliente": new Set(['nombre', 'apellido1', 'apellido2', 'dirección', 'teléfono', 'RFC', 'correo'])
    };
    type = '';
    existent = false;
    data = {};
    backup = {};
    
    update_list = new Set();

    // ACCESO
    get existent () {
      return this.existent;
    }
    get ID () {
      return this.data.id;
    }

    // CONSTRUCTOR
    constructor (x, y) {
      this.type = y;
      if (x === null) x = {id: 0};
      else this.existent = true;
      this.data.id = x.id;

      Row.columns[this.type].forEach((prop) => {
        this.data[prop] = x[prop] || null;
        this.backup[prop] = x[prop] || null;
      });
    }

    // UTILIDADES
    invalid_input(x) {
      if (typeof x == "undefined") return true;
      return false;
    }

    emptify(x) {
      if (typeof x == "string" && x.length == 0) return null;
      return x;
    }

    validate () {
      let valid = true;
      if (isNaN(this.data.id)) valid = false;
      return valid;
    }

    reset () {
      if (!this.existent) return;
      if (isNaN(this.data.id)) return;
      Row.columns[this.type].forEach(
        (prop) => {
          this.data[prop] = this.backup[prop];
        }
      );
      this.update_list = new Set();
    }

    // LLAMADAS A PROCEDIMIENTOS ALMACENADOS
    update () {
      if (this.update_list.size < 1) {
        return;
      }
      if (!this.validate()) return;
      let update_string = 'CALL stpUpd_' + this.type + '(' + this.data.id + ', ';
      let i = 0;
      Row.columns[this.type].forEach(
        (prop) => {
          update_string += (this.data[prop] != null ? '\'' : '') + this.data[prop] + (this.data[prop] != null ? '\'' : '') + (i < (Row.columns[this.type].size-1) ? ', ' : '');
          i++;
        }
      );
      update_string += ')';
      console.log('ACTUALIZACIÓN GENERADA:\n' + update_string);
      goto('/operar/' + encodeURIComponent(update_string));
    }

    insert () {
      if (this.existent) return;
      if (!this.validate()) return;
      let insert_string = 'CALL stpIns_' + this.type + '(';
      let i = 0;
      Row.columns[this.type].forEach(
        (prop) => {
          insert_string += (this.data[prop] != null ? '\'' : '') + this.data[prop] + (this.data[prop] != null ? '\'' : '') + (i < (Row.columns[this.type].size-1) ? ', ' : '');
          i++;
        }
      );
      insert_string += ')';

      console.log("INSERCIÓN GENERADA:\n" + insert_string);

      goto('/operar/' + encodeURIComponent(insert_string));
    }

    delete () {
      if (!this.existent) return;
      if (isNaN(this.data.id)) return;
      if (confirm("Confirma que deseas eliminar el registro de " + this.nombre_completo + ".")) {
        let delete_string = 'CALL stpDel_' + this.type + '(' + this.data.id + ')';
        console.log("ELIMINACIÓN GENERADA:\n" + delete_string);
        goto('/operar/' + encodeURIComponent(delete_string));
      }
    }
  };
  export class Cliente extends Row {
    // ACCESO
    get nombre () {
      return this.data.nombre;
    }
    get apellido1 () {
      return this.data.apellido1;
    }
    get apellido2 () {
      return this.data.apellido2;
    }
    get dirección () {
      return this.data.dirección;
    }
    get teléfono () {
      return this.data.teléfono;
    }
    get RFC () {
      return this.data.RFC;
    }
    get correo () {
      return this.data.correo;
    }

    // PROPIEDADES DINÁMICAS
    get nombre_completo () {
      return this.data.nombre + ' ' + this.data.apellido1 + (this.data.apellido2 ? ' ' + this.data.apellido2 : '');
    }

    // DEFINICIÓN
    set nombre (x) {
      if (super.invalid_input(x)) return;
      this.data.nombre = super.emptify(x);
      this.update_list.add('nombre');
    }
    set apellido1 (x) {
      if (super.invalid_input(x)) return;
      this.data.apellido1 = super.emptify(x);
      this.update_list.add('apellido1');
    }
    set apellido2 (x) {
      if (super.invalid_input(x)) return;
      this.data.apellido2 = super.emptify(x);
      this.update_list.add('apellido2');
    }
    set dirección (x) {
      if (super.invalid_input(x)) return;
      this.data.dirección = super.emptify(x);
      this.update_list.add('dirección');
    }
    set teléfono (x) {
      if (super.invalid_input(x)) return;
      this.data.teléfono = super.emptify(x);
      this.update_list.add('teléfono');
    }
    set RFC (x) {
      if (super.invalid_input(x)) return;
      this.data.RFC = super.emptify(x);
      this.update_list.add('RFC');
    }
    set correo (x) {
      if (super.invalid_input(x)) return;
      this.data.correo = super.emptify(x);
      this.update_list.add('correo');
    }

    // CONSTRUCTOR
    constructor (x) {
      super(x, 'cliente');
    }

    // UTILIDADES
    validate () {
      let valid = super.validate();
      switch (null) {
        case this.data.nombre:
          alert('El nombre no puede ser nulo.');
          valid = false;
        break;
        case this.data.apellido1:
          alert('El apellido 1 no puede ser nulo.');
          valid = false;
        break;
        default:
        break;
      }
      return valid;
    }
  };
</script>