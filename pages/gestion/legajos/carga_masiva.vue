<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo>Carga Masiva de Legajos</titulo>
    </template>
    <div class="row">
      <div class="col-md-6 col-12">
        <div class="custom-file">
          <input type="file" class="custom-file-input" webkitdirectory mozdirectory @change="validadArchivos" />
          <label class="custom-file-label" for="customFileLang">Seleccionar carpeta con legajos</label>
        </div>
        <hr />
        <button class="btn btn-default" @click="subirArchivos">Subir Legajos</button>
        <hr />
        Se cargaran {{ contador.tamanio }} aproximadamente
        <hr />
        <ul class="list-group">
          <li class="list-group-item list-group-item-primary d-flex justify-content-between align-items-center">
            Total de Archivos procesados
            <span class="badge badge-primary badge-pill">{{ contador.total }}</span>
          </li>
          <li class="list-group-item list-group-item-success d-flex justify-content-between align-items-center">
            Se detectaron correctamente
            <span class="badge badge-primary badge-pill"> {{ contador.correctos }}</span>
          </li>
          <li class="list-group-item list-group-item-danger d-flex justify-content-between align-items-center">
            Archivos con fallas
            <span class="badge badge-primary badge-pill">{{ contador.incorrectos }}</span>
          </li>
        </ul>
      </div>
      <div class="col-md-6 col-12">
        <div class="card card-accent-primary">
          <div class="card-header">Detalle de archivos</div>
          <table class="table b-table table-striped table-hover table-sm b-table-stacked-md">
            <thead class="thead-inverse">
              <tr>
                <th></th>
                <th>Documento</th>
                <th>Archivo</th>
                <th>Formato</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(archivo, index) in archivos"
                :key="index"
                :class="{ 'table-danger': !validadTipo(archivo.archivo) }"
              >
                <td scope="row">{{ index + 1 }}</td>
                <td>{{ archivo.documento }}</td>
                <td style="text-transform: capitalize">{{ archivo.nombre }}</td>
                <td>{{ archivo.extension }}</td>
                <td>
                  <template v-if="archivo.estado"> Reconocido Bien </template>
                  <template v-if="archivo.tamanio > tamanio_maximo"> Archivo MUY PESADO </template>
                  <template v-else> Tipo de archivo desconocido </template>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </ContentWrapper>
</template>
<script>
export default {
  meta: {
    auth: { permiso: 'gestion.persona' },
  },
  components: {},
  data() {
    return {
      files: [],
      tamanio_maximo: 10, // 10000000, // 10 mb
      archivos_tipos: [
        'autorizacion_ingreso_menor',
        'documento_dorso',
        'documento_frente',
        'documento_madre',
        'documento_padre',
        'documento_tutor',
        'ficha_medica',
        'hitoria_clinica',
        'obra_social',
        'partida_nacimiento',
        'salidas_cercanas',
      ],
      archivos: [],
    }
  },
  computed: {
    contador() {
      const correctos = this.archivos.filter((elem) => elem.estado === true)
      const incorrectos = this.archivos.filter((elem) => elem.estado === false)
      const tamanio = correctos.reduce((a, b) => +a + +b.tamanio, 0)
      return {
        total: this.archivos.length,
        correctos: correctos.length,
        incorrectos: incorrectos.length,
        tamanio: this.getTamanio(tamanio),
      }
    },
  },
  methods: {
    validadArchivos(event) {
      const files = event.target.files
      for (let i = 0; i < files.length; i++) {
        this.files.push(files[i])
        const documento = files[i].webkitRelativePath.split('/')[1]
        const archivo = files[i].name.split('.')[0]
        const extension = files[i].name.split('.')[1]
        const tamanio = files[i].size

        const nombre = archivo.replace('_', ' ')
        this.archivos.push({
          documento,
          archivo,
          nombre,
          extension,
          tamanio,
          estado: this.validadTipo(archivo),
        })
      }
    },
    getTamanio(bytes, decimals = 2) {
      if (bytes === 0) return '0 Bytes'
      const k = 1024
      const dm = decimals <= 0 ? 0 : decimals || 2
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return parseFloat((bytes / k ** i).toFixed(dm)) + ' ' + sizes[i]
    },
    validadTipo(archivo) {
      return this.archivos_tipos.includes(archivo)
    },
    subirArchivos() {
      const formData = new FormData()
      formData.append('file', this.files)
      this.$axios.post('/gestion/legajos/carga_masiva', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    },
  },
}
</script>
