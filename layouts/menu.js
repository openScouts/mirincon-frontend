export default {
  items: [
    {
      name: 'Menu Principal',
      icon: 'fas fa-home',
      url: '/main',
      children: [
        {
          name: 'Inscripciones',
          url: '/main/eventos',
          icon: 'os-accion-evento',
        },
        {
          name: 'Mi Formacion',
          url: '/main/miformacion',
          icon: 'os-area-ams',
        },
        {
          name: 'Trabajos Practicos',
          url: '/main/trabajos',
          icon: 'fas os-accion-trabajo',
        },
      ],
    },
    {
      name: 'Eventos',
      icon: 'fas os-accion-evento',
      acl: 'eventos.',
      children: [
        {
          name: 'Administracion',
          url: '/eventos/administracion',
          icon: 'fas os-accion-evento-list',
          acl: 'eventos.administracion',
        },
        {
          name: 'Autorizacion',
          url: '/eventos/autorizacion',
          icon: 'fas fa-unlock-alt',
          acl: 'eventos.autorizacion',
        },
        {
          name: 'Creacion',
          url: '/eventos/creacion',
          icon: 'fas os-accion-evento-add',
          acl: 'eventos.abm',
        },
        {
          name: 'Lugares',
          url: '/eventos/lugares',
          icon: 'fas os-accion-lugar',
          acl: 'eventos.lugares',
        },
      ],
    },
    {
      name: 'Formación',
      icon: 'fas os-area-ams',
      acl: 'formacion',
      children: [
        {
          name: 'Experiencias',
          url: '/formacion/experiencias',
          icon: 'fas os-scout-saludo',
          acl: 'formacion.experiencias',
        },
        {
          name: 'Trabajos',
          url: '/formacion/trabajos',
          icon: 'fas os-accion-trabajo',
          acl: 'formacion.trabajos',
        },
        {
          name: 'Cursantes',
          url: '/formacion/cursantes',
          icon: 'fas os-area-programa',
          acl: 'formacion.cursantes',
        } /*
        {
          name: 'Habilitaciones',
          url: '/formacion/habilitaciones',
          icon: 'fas os-accion-habilitacion',
          acl: 'formacion.habilitaciones',
        }, */,
        {
          name: 'Validaciones',
          url: '/formacion/validacion',
          icon: 'fas os-accion-habilitacion',
          acl: 'formacion.validacion',
        },
        {
          name: 'Carga Manual',
          url: '/formacion/carga_manual',
          icon: 'fas os-camping-llano',
          acl: 'formacion.carga_manual',
        },
        {
          name: 'Maestro Scout',
          url: '/formacion/maestro_scout',
          icon: 'fas os-accion-im',
          acl: 'formacion.maestro_scout',
        },
      ],
    },
    {
      name: 'Membresia',
      icon: 'fas os-accion-gestion',
      acl: 'membresia',
      children: [
        {
          name: 'Personas',
          url: '/membresia/personas',
          icon: 'fas os-area-programa',
          acl: 'membresia.personas',
        },
        {
          name: 'Afiliaciones',
          url: '/membresia/afiliacion',
          icon: 'fas os-saac-isologo',
          acl: 'membresia.afiliacion',
        },
        {
          name: 'Funciones',
          url: '/membresia/funciones',
          icon: 'fab fa-angellist',
          acl: 'membresia.funciones',
        },
        {
          name: 'Legajos',
          url: '/membresia/legajos',
          icon: 'fas fa-file-invoice',
          acl: 'membresia.legajos',
        },
        {
          name: 'Reportes',
          url: '/membresia/reportes',
          icon: 'fas fa-chart-bar',
          acl: 'membresia.reportes',
        },
      ],
    },
    {
      name: 'Gestión',
      icon: 'fas fa-laptop-code',
      acl: 'gestion',
      children: [
        {
          name: 'Insumos',
          url: '/gestion/insumos',
          icon: 'fas fa-dolly-flatbed',
          acl: 'gestion.insumos',
        },
      ],
    },
    {
      name: 'Programa',
      icon: 'fas os-area-programa',
      acl: 'programa',
      children: [
        {
          name: 'Acampe',
          url: '/programa/acampe',
          icon: 'fas os-obj-carpa',
          acl: 'programa.acampe',
        },
        {
          name: 'Ciclos',
          url: '/programa/ciclos',
          icon: 'fas fa-retweet',
          acl: 'programa.ciclos',
        },
      ],
    },

    {
      name: 'ADMIN',
      icon: 'fas fa-users',
      acl: 'administrador',
      children: [
        {
          name: 'Novedades',
          url: '/administrador/novedades',
          icon: 'fas fa-user',
          acl: 'administrador.novedades',
        },
        {
          name: 'Usuarios',
          url: '/administrador/usuarios/listado',
          icon: 'fas fa-user',
          acl: 'administrador.usuarios',
        },
        {
          name: 'Registro Pendiente',
          url: '/administrador/registro_pendiente',
          icon: 'fas fa-user',
          acl: 'administrador.permisos',
        },
        {
          name: 'Permisos',
          url: '/administrador/usuarios/permisos',
          icon: 'fas fa-user',
          acl: 'administrador.permisos',
        },
        {
          name: 'Jobs',
          url: '/administrador/jobs',
          icon: 'fas fa-user',
          acl: 'administrador.permisos',
        },
      ],
    },
  ],
}
