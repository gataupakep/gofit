<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>TAMBAH INSTRUKTUR</h4>
                        <hr>
                        <form @submit.prevent="store">

                            <div class="form-group mb-3">
                                <label class="form-label">Nama Instruktur</label>
                                <input type="text" class="form-control" v-model="instruktur.nama_instruktur" placeholder="Masukkan nama instruktur">

                                <!--validation-->
                                <div v-if="validation.nama_instruktur" class="mt-2 alert alert-danger">
                                        {{validation.nama_instruktur[0]}}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Alamat</label>
                                <input class="form-control" v-model="instruktur.alamat" placeholder="Masukkan alamat">

                                <!--validation-->
                                <div v-if="validation.alamat" class="mt-2 alert alert-danger">
                                    {{ validation.alamat[0]}}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Tanggal Lahir</label>
                                <input type="date" class="form-control" v-model="instruktur.tgl_lahir" placeholder="YYYY/MM/dd">

                                <!--validation-->
                                <div v-if="validation.tgl_lahir" class="mt-2 alert alert-danger">
                                    {{ validation.tgl_lahir[0]}}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Gender</label>
                                <select name="gender" id="gender" class="form-select" v-model="instruktur.gender">
                                    <option value="Wanita">Wanita</option>
                                    <option value="Pria">Pria</option>
                                </select>

                                <!-- validation -->
                                <div v-if="validation.gender" class="mt-2 alert alert-danger">
                                    {{ validation.gender[0] }}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">No. Telp</label>
                                <input class="form-control" v-model="instruktur.no_telp" placeholder="Masukkan no. telp">

                                <!--validation-->
                                <div v-if="validation.no_telp" class="mt-2 alert alert-danger">
                                    {{ validation.no_telp[0]}}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Email</label>
                                <input class="form-control" v-model="instruktur.email" placeholder="XXXXX@gmail.com">

                                <!--validation-->
                                <div v-if="validation.email" class="mt-2 alert alert-danger">
                                    {{ validation.email[0]}}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Password</label>
                                <input class="form-control" v-model="instruktur.password" placeholder="Masukan password">

                                <!--validation-->
                                <div v-if="validation.password" class="mt-2 alert alert-danger">
                                    {{ validation.password[0]}}
                                </div>
                            </div>
                  
                            <button type="submit" class="btn btn-primary">SAVE</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { reactive, ref } from 'vue'
    import { useRouter } from 'vue-router'
    import axios from 'axios'

    export default {
        setup() {
            //state instruktur
            const instruktur = reactive({
                id_absen_instruktur: '',
                nama_instruktur: '',
                alamat: '',
                tgl_lahir: '',
                gender: '',
                no_telp: '',
                email: '',
                password: '',
                jumlah_terlambat: '',
            })

            //state validation
            const validation = ref([])
            //vue router
            const router = useRouter()

            //method store
            function store() {
                let id_absen_instruktur = instruktur.id_absen_instruktur
                let nama_instruktur = instruktur.nama_instruktur
                let alamat = instruktur.alamat
                let tgl_lahir = instruktur.tgl_lahir
                let gender = instruktur.gender
                let no_telp = instruktur.no_telp
                let email = instruktur.email
                let password = instruktur.password

                axios.post('https://jesso.ppcdeveloper.com/api/instruktur', {
                    id_absen_instruktur: id_absen_instruktur,
                    nama_instruktur: nama_instruktur,
                    alamat: alamat,
                    tgl_lahir: tgl_lahir,
                    gender: gender,
                    no_telp: no_telp,
                    email: email,
                    password: password,
                }).then(() => {
                        //redirect ke post index
                        router.push({
                            name: 'instruktur.index'
                        })
                    }).catch(error => {
                        //assign state validation with error
                        validation.value = error.response.data
                    })
            }

            //return
            return {
                instruktur,
                validation,
                router,
                store
            }

        }
    }    
</script>

<style>

</style>


