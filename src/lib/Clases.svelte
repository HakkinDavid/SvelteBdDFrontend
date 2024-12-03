<!-- Este archivo contiene la definición de clases para manejar distintos tipos de filas (Row) en una base de datos.
Proporciona utilidades para validar, actualizar, insertar y eliminar registros, además de soporte para la interacción con procedimientos almacenados. -->
<script context="module">
  // Importa la función 'goto' de la navegación de Svelte para realizar redirecciones.
  // Esta función se utiliza para construir URLs que interactúan con procedimientos almacenados.
  import { goto } from "$app/navigation";
  // Define una clase base para manejar diferentes tipos de filas en una base de datos.
  // Proporciona propiedades y métodos comunes que pueden ser reutilizados o sobrescritos por clases hijas.
  class Row {
    // Define las columnas permitidas para cada tipo de fila.
    // Esto actúa como un esquema para validar y manipular datos.
    static columns = {
      "cliente": new Set(['nombre', 'apellido1', 'apellido2', 'dirección', 'teléfono', 'RFC', 'correo']),
      "empleado": new Set(['nombre', 'apellido1', 'apellido2', 'RFC', 'puesto_id', 'departamento_id', 'jefe_id']),
      "departamento": new Set(['nombre']),
      "vehículo": new Set(['marca', 'modelo', 'año', 'color', 'cliente_id']),
      "catálogo": new Set(['nombre', 'descripción', 'precio_unitario']),
      "factura": new Set(['RFC', 'fecha', 'uso_CFDI', 'monto']),
      "diagnóstico": new Set(['descripción', 'fecha', 'vehículo_id']),
      "refacción": new Set(['catálogo_id', 'subtotal', 'cantidad']),
      "servicio": new Set(['descripción', 'fecha', 'diagnóstico_id', 'mecánico_id', 'garantía_id', 'subtotal']),
      "detalle_orden": new Set(['cliente_id', 'factura_id', 'servicio_id', 'refacción_id', 'promoción_id', 'departamento_id', 'fecha_cobro', 'total']),
      "promoción": new Set(['descuento', 'descripción', 'fecha_inicio', 'fecha_fin'])
    };
    // Propiedad que almacena el tipo de fila (e.g., cliente, empleado, vehículo).
    type = '';
    // Propiedad que indica si el registro ya existe en la base de datos.
    existent = false;
    // Objeto que contiene los datos actuales de la fila.
    data = {};
    // Objeto que contiene una copia de seguridad de los datos iniciales de la fila.
    backup = {};
    
    // Conjunto que rastrea las propiedades modificadas desde el último restablecimiento.
    update_list = new Set();

    // ACCESO
    get existent () {
      return this.existent;
    }
    get ID () {
      return this.data.id;
    }

    // CONSTRUCTOR
    // Constructor de la clase. Recibe un objeto de datos iniciales y el tipo de fila.
    // Inicializa las propiedades y configura un proxy para manejar dinámicamente el acceso y modificación de datos.
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
    // Verifica si una entrada es inválida (nula o indefinida).
    static invalid_input(x) {
      if (typeof x == "undefined") return true;
      return false;
    }

    // Convierte cadenas vacías en valores nulos para mantener consistencia en la base de datos.
    static emptify(x) {
      if (typeof x == "string" && x.length == 0) return null;
      return x;
    }

    // Valida los datos de la fila para detectar posibles errores o inyecciones SQL.
    // Muestra alertas si detecta valores sospechosos o inválidos.
    validate () {
      let valid = true;
      if (isNaN(this.data.id)) valid = false;
      Object.keys(this.data).forEach(element => {
        if (typeof this.data[element] == 'string' && (this.data[element].includes('--') || this.data[element].includes(';') || this.data[element].includes('\'') || this.data[element].includes('\"'))) {
          valid = false;
          alert('Esa inyección SQL, joven.');
        }
      });
      return valid;
    }

    // Restaura los datos de la fila a su estado original.
    // Limpia las modificaciones realizadas desde el último restablecimiento.
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
    // Genera y ejecuta un procedimiento almacenado para actualizar un registro en la base de datos.
    update () {
      if (this.update_list.size < 1) {
        return;
      }
      if (!this.validate()) return;
      let update_string = 'CALL stpUpd_' + this.type + '(' + this.data.id + ', ';
      let i = 0;
      Row.columns[this.type].forEach(
        (prop) => {
          let value = this.data[prop];

          // Verifica si el valor es una fecha y la formatea
          if (value instanceof Date) {
            // Asegúrate de que 'value' esté en formato 'YYYY-MM-DD'
            value = value.toISOString().split('T')[0];
          } else if (typeof value === 'string' && !isNaN(Date.parse(value))) {
            // Convierte la cadena de fecha al formato 'YYYY-MM-DD' si es una cadena de fecha
            value = new Date(value).toISOString().split('T')[0];
          }

          update_string += (value != null ? '\'' : '') + value + (value != null ? '\'' : '') + (i < (Row.columns[this.type].size - 1) ? ', ' : '');
          i++;
        }
      );
      update_string += ')';
      console.log('ACTUALIZACIÓN GENERADA:\n' + update_string);
      goto('/operar/' + encodeURIComponent(update_string));
    }

    // Genera y ejecuta un procedimiento almacenado para insertar un nuevo registro en la base de datos.
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

    // Genera y ejecuta un procedimiento almacenado para eliminar un registro existente en la base de datos.
    delete () {
      if (!this.existent) return;
      if (isNaN(this.data.id)) return;
      if (confirm("Confirma que deseas eliminar el registro [ID: " + this.ID + "] " + (this.nombre_completo ? this.nombre_completo : (this.nombre ? this.nombre : (this.descripción ? this.descripción : this.type))) + ".")) {
        let delete_string = 'CALL stpDel_' + this.type + '(' + this.data.id + ')';
        console.log("ELIMINACIÓN GENERADA:\n" + delete_string);
        goto('/operar/' + encodeURIComponent(delete_string));
      }
    }
  };

  // Define una clase para manejar filas específicas del tipo 'Cliente'.
  // Extiende la funcionalidad base de 'Row' y agrega validaciones adicionales.
  export class Cliente extends Row {
    // PROPIEDADES DINÁMICAS
    // Devuelve el nombre completo del cliente combinando sus nombres y apellidos.
    get nombre_completo () {
      return this.data.nombre + ' ' + this.data.apellido1 + (this.data.apellido2 ? ' ' + this.data.apellido2 : '');
    }

    // CONSTRUCTOR
    constructor (x) {
      super(x, 'cliente');
    }

    // UTILIDADES
    // Valida datos específicos de clientes, como nombre, apellidos, teléfono y correo.
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

      // Validación de teléfono (10 dígitos)
      if (this.data.teléfono && !/^[0-9]{10}$/.test(this.data.teléfono)) {
        alert('El teléfono debe tener exactamente 10 dígitos.');
        valid = false;
      }

      // Validación de correo electrónico
      if (
        this.data.correo &&
        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.data.correo)
      ) {
        alert('El correo electrónico no tiene un formato válido.');
        valid = false;
      }

      return valid;
    }
  };

  // Define una clase para manejar filas específicas del tipo 'Empleado'.
  // Extiende la funcionalidad base de 'Row' y agrega validaciones adicionales.
  export class Empleado extends Row {
    // PROPIEDADES DINÁMICAS
    // Combina los nombres y apellidos del empleado para obtener su nombre completo.
    // Esto es útil para desplegar información de manera más legible.
    get nombre_completo () {
      return this.data.nombre + ' ' + this.data.apellido1 + (this.data.apellido2 ? ' ' + this.data.apellido2 : '');
    }

    // CONSTRUCTOR
    constructor (x) {
      super(x, 'empleado');
    }

    // UTILIDADES
    // Valida los datos específicos de un empleado.
    // Verifica que los campos como nombre, apellidos, RFC y CURP sean válidos.
    // Muestra alertas si algún campo esencial es incorrecto o está vacío.
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

  // Define una clase para manejar filas específicas del tipo 'Departamento'.
  // Extiende la funcionalidad base de 'Row' y agrega validaciones adicionales.
  export class Departamento extends Row {
    // CONSTRUCTOR
    constructor (x) {
      super(x, 'departamento');
    }

    // UTILIDADES
    // Valida los datos de un departamento, como su nombre y descripción.
    // Se asegura de que los valores ingresados cumplan con los requisitos básicos de formato y contenido.
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
  // Clase para manejar filas específicas del tipo 'Vehículo'.
  // Extiende la funcionalidad base de 'Row' y valida datos únicos como matrícula, modelo y marca.
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
    // Valida los datos específicos de un vehículo.
    // Verifica que los campos como matrícula, marca, modelo y año sean válidos.
    // Asegura que los valores cumplan con los estándares establecidos para los registros de vehículos.
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

      // Validación del año
      const currentYear = new Date().getFullYear(); // Obtiene el año actual
      if (this.data.año > currentYear + 1) {
        alert('El año del vehículo no puede ser mayor al año actual más uno.');
        valid = false;
      }

      return valid;
    }
  };
  export class Catálogo extends Row {
    // CONSTRUCTOR
    constructor (x) {
      super(x, 'catálogo');
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

      // Validación del precio unitario
      if (this.data.precio_unitario < 0) {
        alert('El precio unitario debe ser mayor o igual a 0.');
        valid = false;
      }

      return valid;
    }
  };
  export class Factura extends Row {
    // CONSTRUCTOR
    constructor (x) {
      super(x, 'factura');
    }

    // UTILIDADES
    validate () {
      let valid = super.validate();
      switch (null) {
        case this.data.RFC:
          alert('El RFC no puede ser nulo.');
          valid = false;
        break;
        case this.data.fecha:
          alert('La fecha no puede ser nula.');
          valid = false;
        break;
        case this.data.uso_CFDI:
          alert('El uso de CFDI no puede ser nulo.');
          valid = false;
        break;
        case this.data.monto:
          alert('El monto no puede ser nulo.');
          valid = false;
        break;
        default:
        break;
      }

      // Validación de la fecha
      const today = new Date();
      const inputDate = new Date(this.data.fecha);

      if (inputDate > today) {
        alert('La fecha debe ser igual o anterior al día de hoy.');
        valid = false;
      }

      // Validación del monto
      if (this.data.monto < 0) {
        alert('El monto no puede ser negativo.');
        valid = false;
      }

      return valid;
    }
  };
  export class Diagnóstico extends Row {
    // CONSTRUCTOR
    constructor (x) {
      super(x, 'diagnóstico');
    }

    // UTILIDADES
    validate () {
      let valid = super.validate();
      switch (null) {
        case this.data.vehículo_id:
          alert('El ID de vehículo no puede ser nulo.');
          valid = false;
        break;
        case this.data.fecha:
          alert('La fecha no puede ser nula.');
          valid = false;
        break;
        case this.data.descripción:
          alert('La descripción no puede ser nula.');
          valid = false;
        break;
        default:
        break;
      }

      // Validación de la fecha
      const today = new Date(); // Obtiene la fecha actual
      const inputDate = new Date(this.data.fecha); // Convierte la fecha de entrada a objeto Date

      if (inputDate > today) {
        alert('La fecha debe ser igual o anterior al día de hoy.');
        valid = false;
      }

      return valid;
    }
  };

  export class Refacción extends Row {
    // CONSTRUCTOR
    constructor (x) {
      super(x, 'refacción');
    }

    // UTILIDADES
    validate () {
      let valid = super.validate();
      switch (null) {
        case this.data.cantidad:
          alert('La cantidad no puede ser nula.');
          valid = false;
        break;
        default:
        break;
      }

      // Validación del subtotal y la cantidad
      if (this.data.subtotal < 0) {
          alert('El subtotal debe ser mayor o igual a 0.');
          valid = false;
      }
      
      if (this.data.cantidad <= 0) {
          alert('La cantidad debe ser mayor que 0.');
          valid = false;
      }

      return valid;
    }
  };

  export class Servicio extends Row {
    // CONSTRUCTOR
    constructor (x) {
      super(x, 'servicio');
    }

    // UTILIDADES
    validate () {
      let valid = super.validate();
      switch (null) {
        case this.data.subtotal:
          alert('El subtotal no puede ser nulo.');
          valid = false;
        break;
        case this.data.fecha:
          alert('La fecha no puede ser nula.');
          valid = false;
        break;
        default:
        break;
      }

      // Validación del subtotal
      if (this.data.subtotal < 0) {
          alert('El subtotal debe ser mayor o igual a 0.');
          valid = false;
      }
      
      // Validación de la fecha
      const today = new Date();
      const inputDate = new Date(this.data.fecha);

      if (inputDate > today) {
        alert('La fecha debe ser igual o anterior al día de hoy.');
        valid = false;
      }

      return valid;
    }
  };

  export class Orden extends Row {
    // CONSTRUCTOR
    constructor (x) {
      super(x, 'detalle_orden');
    }

    // UTILIDADES
    validate () {
      let valid = super.validate();
      switch (null) {
        case this.data.cliente_id:
          alert('El cliente no puede ser nulo.');
          valid = false;
        break;
        case this.data.departamento_id:
          alert('El departamento no puede ser nulo.');
          valid = false;
        break;
        case this.data.fecha_cobro:
          alert('La fecha no puede ser nula.');
          valid = false;
        break;
        default:
        break;
      }

      // Validación del total
      if (this.data.total < 0) {
          alert('El total debe ser mayor o igual a 0.');
          valid = false;
      }
      
      // Validación de la fecha
      const today = new Date();
      const inputDate = new Date(this.data.fecha_cobro);

      if (inputDate > today) {
        alert('La fecha debe ser igual o anterior al día de hoy.');
        valid = false;
      }

      return valid;
    }
  };

  export class Promoción extends Row {
    // CONSTRUCTOR
    constructor (x) {
      super(x, 'promoción');
    }

    // UTILIDADES
    validate () {
      let valid = super.validate();
      switch (null) {
        case this.data.descuento:
          alert('El descuento no puede ser nulo.');
          valid = false;
        break;
        case this.data.descripción:
          alert('La descripción no puede ser nula.');
          valid = false;
        break;
        case this.data.fecha_inicio:
          alert('La fecha de inicio no puede ser nula.');
          valid = false;
        break;
        case this.data.fecha_fin:
          alert('La fecha de fin no puede ser nula.');
          valid = false;
        break;
        default:
        break;
      }

      // Validación del descuento
      if (this.data.descuento < 0 || this.data.descuento > 100) {
          alert('El descuento debe estar en el rango de 0 a 100.');
          valid = false;
      }
      
      // Validación de las fechas
      const startDate = new Date(this.data.fecha_inicio);
      const endDate = new Date(this.data.fecha_fin);

      if (startDate > endDate) {
        alert('La fecha de inicio ser igual o anterior a la fecha final.');
        valid = false;
      }

      return valid;
    }
  };
</script>