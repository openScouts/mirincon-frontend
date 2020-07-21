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
      name: 'Gestión',
      icon: 'fas os-accion-gestion',
      acl: 'gestion',
      children: [
        {
          name: 'Personas',
          url: '/gestion/personas',
          icon: 'fas os-area-programa',
          acl: 'gestion.personas',
        },
        {
          name: 'Afiliaciones',
          url: '/gestion/afiliacion',
          icon: 'fas os-saac-isologo',
          acl: 'gestion.afiliacion',
        },
        {
          name: 'Funciones',
          url: '/gestion/funciones',
          icon: 'fas os-saac-isologo',
          acl: 'gestion.funciones',
        },
        {
          name: 'Legajos',
          url: '/gestion/legajos',
          icon: 'fas os-saac-isologo',
          acl: 'gestion.legajos',
        },
        {
          name: 'Reportes',
          url: '/gestion/reportes',
          icon: 'fas os-saac-isologo',
          acl: 'gestion.reportes',
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
        },
        {
          name: 'Habilitaciones',
          url: '/formacion/habilitaciones',
          icon: 'fas os-accion-habilitacion',
          acl: 'formacion.habilitaciones',
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
          name: 'Permisos',
          url: '/administrador/usuarios/permisos',
          icon: 'fas fa-user',
          acl: 'administrador.permisos',
        },
      ],
    },
  ],
}
