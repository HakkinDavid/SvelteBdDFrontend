<script context="module">
  import { goto } from "$app/navigation";
  class Row {
    static columns = {
      "cliente": new Set(['nombre', 'apellido1', 'apellido2', 'dirección', 'teléfono', 'RFC', 'correo']),
      "empleado": new Set(['nombre', 'apellido1', 'apellido2', 'RFC', 'puesto_id', 'departamento_id', 'jefe_id']),
      "departamento": new Set(['nombre']),
      "vehículo": new Set(['marca', 'modelo', 'año', 'color', 'cliente_id']),
      "catalogo": new Set(['nombre', 'descripción', 'precio_unitario'])
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

      return new Proxy(this, {
        get(target, prop) {
          if (prop in target.data) {
            return target.data[prop];
          }
          return target[prop];
        },
        set(target, prop, x) {
          if (prop in target.data) {
            if (Row.invalid_input(x)) return false;
            target.data[prop] = Row.emptify(x);
            target.update_list.add(prop);
            return true;
          }
          else {
            target[prop] = x;
            return true;
          }
        }
      });
    }

    // UTILIDADES
    static invalid_input(x) {
      if (typeof x == "undefined") return true;
      return false;
    }

    static emptify(x) {
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
    // PROPIEDADES DINÁMICAS
    get nombre_completo () {
      return this.data.nombre + ' ' + this.data.apellido1 + (this.data.apellido2 ? ' ' + this.data.apellido2 : '');
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
  export class Empleado extends Row {
    // PROPIEDADES DINÁMICAS
    get nombre_completo () {
      return this.data.nombre + ' ' + this.data.apellido1 + (this.data.apellido2 ? ' ' + this.data.apellido2 : '');
    }

    // CONSTRUCTOR
    constructor (x) {
      super(x, 'empleado');
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
        case this.data.RFC:
          alert('El RFC no puede ser nulo.');
          valid = false;
        break;
        case this.data.puesto_id:
          alert('El ID de puesto no puede ser nulo.');
          valid = false;
        break;
        case this.data.departamento_id:
          alert('El ID de departamento no puede ser nulo.');
          valid = false;
        break;
        default:
        break;
      }
      return valid;
    }
  };
  export class Departamento extends Row {
    // CONSTRUCTOR
    constructor (x) {
      super(x, 'departamento');
    }

    // UTILIDADES
    validate () {
      let valid = super.validate();
      switch (null) {
        case this.data.nombre:
          alert('El nombre no puede ser nulo.');
          valid = false;
        break;
        default:
        break;
      }
      return valid;
    }
  };
  export class Vehículo extends Row {
    // PROPIEDADES DINÁMICAS
    get nombre_completo () {
      return this.data.marca + ' ' + this.data.modelo + ' ' + this.data.año + ' ' + this.data.color;
    }

    // CONSTRUCTOR
    constructor (x) {
      super(x, 'vehículo');
    }

    // UTILIDADES
    validate () {
      let valid = super.validate();
      switch (null) {
        case this.data.marca:
          alert('La marca no puede ser nula.');
          valid = false;
        break;
        case this.data.modelo:
          alert('El modelo no puede ser nulo.');
          valid = false;
        break;
        case this.data.año:
          alert('El año no puede ser nulo.');
          valid = false;
        break;
        case this.data.color:
          alert('El color no puede ser nulo.');
          valid = false;
        break;
        case this.data.cliente_id:
          alert('El dueño no puede ser nulo.');
          valid = false;
        break;
        default:
        break;
      }
      return valid;
    }
  };
  export class Catálogo extends Row {
    // CONSTRUCTOR
    constructor (x) {
      super(x, 'catalogo');
    }

    // UTILIDADES
    validate () {
      let valid = super.validate();
      switch (null) {
        case this.data.nombre:
          alert('El nombre no puede ser nulo.');
          valid = false;
        break;
        case this.data.precio_unitario:
          alert('El precio unitario no puede ser nulo.');
          valid = false;
        break;
        default:
        break;
      }
      return valid;
    }
  };
</script>