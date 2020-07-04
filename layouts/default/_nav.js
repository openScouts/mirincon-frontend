export default [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavItem',
        _vShow: false,
        name: 'Dashboard',
        to: '/main',
        fontIcon: 'fas fa-tachometer-alt',
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Menu Principal',
        fontIcon: 'fas os-accion-gestion',
        items: [
          {
            name: 'Eventos',
            to: '/main/eventos',
            fontIcon: 'os-accion-evento',
          },
          {
            name: 'Mi Formacion',
            to: '/main/miformacion',
            fontIcon: 'os-area-ams',
          },
          {
            name: 'Trabajos Practicos',
            to: '/main/trabajos',
            fontIcon: 'fas os-accion-trabajo',
          },
        ],
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Gestión',
        fontIcon: 'fas os-accion-gestion',
        items: [
          {
            name: 'Persona',
            to: '/gestion/persona',
            fontIcon: 'fas os-area-programa',
            acl: 'gestion.persona',
          },
          {
            name: 'Afiliaciones',
            to: '/gestion/afiliacion',
            fontIcon: 'fas os-saac-isologo',
            acl: 'gestion.afiliacion',
          },
          {
            name: 'Legajos',
            to: '/gestion/legajos',
            fontIcon: 'fas os-saac-isologo',
            acl: 'gestion.persona',
          },
        ],
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Programa',
        fontIcon: 'fas os-area-programa',
        items: [
          {
            name: 'Acampe',
            to: '/programa/acampe',
            fontIcon: 'fas os-obj-carpa',
            acl: 'programa.acampe',
          },
        ],
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Eventos',
        fontIcon: 'fas os-accion-evento',
        items: [
          {
            name: 'Administracion',
            to: '/eventos/administracion',
            fontIcon: 'fas os-accion-evento-list',
            acl: 'eventos.administracion',
          },
          {
            name: 'Autorizacion',
            to: '/eventos/autorizacion',
            fontIcon: 'fas fa-unlock-alt',
            acl: 'eventos.autorizacion',
          },
          {
            name: 'Creacion',
            to: '/eventos/creacion',
            fontIcon: 'fas os-accion-evento-add',
            acl: 'eventos.abm',
          },
          {
            name: 'Lugares',
            to: '/eventos/lugares',
            fontIcon: 'fas os-accion-lugar',
            acl: 'eventos.lugares',
          },
        ],
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Formación',
        fontIcon: 'fas os-area-ams',
        items: [
          {
            name: 'Experiencias',
            to: '/formacion/experiencias',
            fontIcon: 'fas os-scout-saludo',
            acl: 'formacion.experiencias',
          },
          {
            name: 'Trabajos',
            to: '/formacion/trabajos',
            fontIcon: 'fas os-accion-trabajo',
            acl: 'formacion.trabajos',
          },
          {
            name: 'Cursantes',
            to: '/formacion/cursantes',
            fontIcon: 'fas os-area-programa',
            acl: 'formacion.cursantes',
          },
          {
            name: 'Habilitaciones',
            to: '/formacion/habilitaciones',
            fontIcon: 'fas os-accion-habilitacion',
            acl: 'formacion.habilitaciones',
          },
          {
            name: 'Carga Manual',
            to: '/formacion/carga_manual',
            fontIcon: 'fas os-camping-llano',
            acl: 'formacion.carga_manual',
          },
          {
            name: 'Maestro Scout',
            to: '/formacion/maestro_scout',
            fontIcon: 'fas os-accion-im',
            acl: 'formacion.maestro_scout',
          },
          {
            name: 'Formadores',
            to: '/formacion/formadores',
            fontIcon: 'fas os-accion-formador',
            acl: 'formacion.formadores',
          },
        ],
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'ADMIN',
        fontIcon: 'cil-star',
        items: [
          {
            name: 'Usuarios',
            to: '/administracion/usuarios/listado',
            fontIcon: 'fas fa-user',
            acl: 'SUPERADMIN',
          },
          {
            name: 'Roles',
            to: '/administracion/usuarios/roles',
            fontIcon: 'fas fa-user',
            acl: 'SUPERADMIN',
          },
          {
            name: 'Tareas',
            to: '/administracion/tareas/index',
            fontIcon: 'fas fa-user',
            acl: 'SUPERADMIN',
          },
          {
            name: 'GetLogApp',
            to: '/GetLoglogs',
            fontIcon: 'fas fa-user',
            acl: 'SUPERADMIN',
          },
        ],
      },
    ],
  },
]
