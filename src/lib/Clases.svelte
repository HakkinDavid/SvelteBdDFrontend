<script context="module">
  import { goto } from "$app/navigation";
  export class Cliente {
    #existent = false;
    static props_list = new Set(['nombre', 'apellido1', 'apellido2', 'dirección', 'teléfono', 'RFC', 'correo']);

    #id = 0;
    #nombre = null;
    #apellido1 = null;
    #apellido2 = null;
    #dirección = null;
    #teléfono = null;
    #RFC = null;
    #correo = null;
    #update_list = new Set();
    get existent () {
      return this.#existent;
    }
    get ID () {
      return this.#id;
    }
    get nombre () {
      return this.#nombre;
    }
    get apellido1 () {
      return this.#apellido1;
    }
    get apellido2 () {
      return this.#apellido2;
    }
    get dirección () {
      return this.#dirección;
    }
    get teléfono () {
      return this.#teléfono;
    }
    get RFC () {
      return this.#RFC;
    }
    get correo () {
      return this.#correo;
    }
    set nombre (x) {
      if (typeof x == "undefined" || typeof x == "null") return;
      if (typeof x == "string" && x.length == 0) x = null;
      this.#nombre = x;
      this.#update_list.add('nombre');
    }
    set apellido1 (x) {
      if (typeof x == "undefined" || typeof x == "null") return;
      if (typeof x == "string" && x.length == 0) x = null;
      this.#apellido1 = x;
      this.#update_list.add('apellido1');
    }
    set apellido2 (x) {
      if (typeof x == "undefined" || typeof x == "null") return;
      if (typeof x == "string" && x.length == 0) x = null;
      this.#apellido2 = x;
      this.#update_list.add('apellido2');
    }
    set dirección (x) {
      if (typeof x == "undefined" || typeof x == "null") return;
      if (typeof x == "string" && x.length == 0) x = null;
      this.#dirección = x;
      this.#update_list.add('dirección');
    }
    set teléfono (x) {
      if (typeof x == "undefined" || typeof x == "null") return;
      if (typeof x == "string" && x.length == 0) x = null;
      this.#teléfono = x;
      this.#update_list.add('teléfono');
    }
    set RFC (x) {
      if (typeof x == "undefined" || typeof x == "null") return;
      if (typeof x == "string" && x.length == 0) x = null;
      this.#RFC = x;
      this.#update_list.add('RFC');
    }
    set correo (x) {
      if (typeof x == "undefined" || typeof x == "null") return;
      if (typeof x == "string" && x.length == 0) x = null;
      this.#correo = x;
      this.#update_list.add('correo');
    }
    constructor (x) {
      if (x === null) return;
      this.#existent = true;
      this.#id = x.id;
      this.#nombre = x.nombre;
      this.#apellido1 = x.apellido1;
      this.#apellido2 = x.apellido2;
      this.#dirección = x.dirección;
      this.#teléfono = x.teléfono;
      this.#RFC = x.RFC;
      this.#correo = x.correo;
    }

    get nombre_completo () {
      return this.#nombre + ' ' + this.#apellido1 + (this.#apellido2 ? ' ' + this.#apellido2 : '');
    }

    validate () {
      let valid = true;
      if (isNaN(this.#id)) valid = false;
      switch (null) {
        case this.#nombre:
          alert('El nombre no puede ser nulo.');
          valid = false;
        break;
        case this.#apellido1:
          alert('El apellido 1 no puede ser nulo.');
          valid = false;
        break;
        default:
        break;
      }
      return valid;
    }

    update () {
      if (this.#update_list.size < 1) {
        return;
      }
      if (!this.validate()) return;
      let update_string = 'UPDATE cliente SET ';
      let i = 0;
      this.#update_list.forEach((prop) => {
        update_string += prop + ' = ' + (this[prop] != null ? '\'' : '') + this[prop] + (this[prop] != null ? '\'' : '') + (i < (this.#update_list.size-1) ? ', ' : ' ');
        i++;
      });
      update_string += 'WHERE id = ' + this.#id;
      console.log('ACTUALIZACIÓN GENERADA:\n' + update_string);
      goto('/operar/' + encodeURIComponent(update_string));
    }

    insert () {
      if (this.#existent) return;
      if (!this.validate()) return;
      let insert_string = 'INSERT INTO cliente (' + [...Cliente.props_list].join(", ") + ') VALUES (';
      let i = 0;
      Cliente.props_list.forEach(
        (prop) => {
          insert_string += (this[prop] != null ? '\'' : '') + this[prop] + (this[prop] != null ? '\'' : '') + (i < (Cliente.props_list.size-1) ? ', ' : '');
          i++;
        }
      );
      insert_string += ')';

      goto('/operar/' + encodeURIComponent(insert_string));
    }

    delete () {
      if (!this.#existent) return;
      if (isNaN(this.#id)) return;
      if (confirm("Confirma que deseas eliminar el registro de " + this.nombre_completo + ".")) {
        goto('/operar/' + encodeURIComponent('DELETE FROM cliente WHERE id = ' + this.#id));
      }
    }
  };
</script>