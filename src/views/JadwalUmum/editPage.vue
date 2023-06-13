<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>EDIT JADWAL UMUM</h4>
                        <hr>

                        <form @submit.prevent="update">
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Instruktur</label>
                                <select name="id_instruktur" id="id_instruktur" class="form-select" v-model="jadwalUmum.id_instruktur">
                                    <option value="" hidden>Masukan Nama Instruktur</option>
                                    <option v-for="(instruktur, id) in instrukturs" :key="id" v-bind:value="instruktur.id">
                                        {{ instruktur.nama_instruktur }}
                                    </option>
                                </select>
                                <div v-if="validation.id_instruktur" class="mt-2 alert alert-danger"> {{
                                    validation.id_instruktur[0] }} </div>
                            </div>
                            
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Kelas</label>
                                <select name="id_kelas" id="id_kelas" class="form-select" v-model="jadwalUmum.id_kelas">
                                    <option value="" hidden>Masukan Nama Kelas</option>
                                    <option v-for="(classes, id) in kelas" :key="id" v-bind:value="classes.id">
                                        {{ classes.nama_kelas }}
                                    </option>
                                </select>
                                <div v-if="validation.id_kelas" class="mt-2 alert alert-danger"> {{
                                    validation.id_kelas[0] }} </div>
                            </div>

                            <div class="form-group mb-3"> <label class="form-label">Hari</label> 
                                <select
                                    class="form-select"
                                    aria-label="Default select example"
                                    v-model="jadwalUmum.hari"
                                    >
                                    <option value="Senin">Senin</option>
                                    <option value="Selasa">Selasa</option>
                                    <option value="Rabu">Rabu</option>
                                    <option value="Kamis">Kamis</option>
                                    <option value="Jumat">Jumat</option>
                                    <option value="Sabtu">Sabtu</option>
                                    <option value="Minggu">Minggu</option>
                                    </select>
                                <div v-if="validation.hari" class="mt-2 alert alert-danger"> {{
                                    validation.hari[0] }} </div>
                            </div>

                            <div class="form-group mb-3"> <label class="form-label">Sesi</label> 
                                <select
                                    class="form-select"
                                    aria-label="Default select example"
                                    v-model="jadwalUmum.sesi"
                                    >
                                    <option value=1>Sesi 1 Pagi</option>
                                    <option value=2>Sesi 2 Pagi</option>
                                    <option value=3>Sesi 1 Sore</option>
                                    <option value=4>Sesi 2 Sore</option>
                                    </select>
                                <div v-if="validation.sesi" class="mt-2 alert alert-danger"> {{
                                    validation.sesi[0] }} </div>
                            </div>

                            <div class="form-group mb-3"> <label class="form-label">Jam Mulai</label>
                                <select
                                    class="form-select"
                                    aria-label="Default select example"
                                    v-model="jadwalUmum.waktu_mulai"
                                    >
                                    <option value="08:00:00" >08:00:00</option>
                                    <option value="09:30:00" >09:30:00</option>
                                    <option value="17:00:00" >17:00:00</option>
                                    <option value="18:30:00" >18:30:00</option>
                                    </select>
                                <div v-if="validation.waktu_mulai" class="mt-2 alert alert-danger"> {{
                                    validation.waktu_mulai[0] }} </div>
                            </div>
                            <div class="form-group mb-3"> <label class="form-label">Jam Selesai</label>
                                <select
                                    class="form-select"
                                    aria-label="Default select example"
                                    v-model="jadwalUmum.waktu_selesai"
                                    >
                                    <option value="09:30:00" >09:30:00</option>
                                    <option value="11:00:00" >11:00:00</option>
                                    <option value="18:30:00" >18:30:00</option>
                                    <option value="20:00:00" >20:00:00</option>
                                    </select>
                                <div v-if="validation.waktu_selesai" class="mt-2 alert alert-danger"> {{
                                    validation.waktu_selesai[0] }} </div>
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
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

    export default {
        setup() {
            //state jadwalUmum
            const jadwalUmum = reactive({ 
            id_instruktur : '',
            id_kelas : '',
            sesi: '',
            hari : '',
            waktu_mulai: '',
            waktu_selesai: '',
            
        })

        //state validation 
        const validation = ref([])
        //vue router 
        const router = useRouter()
        
        const route = useRoute()

        const instrukturs = ref([])

        const kelas = ref([])

        onMounted(() => {
            //get API from Laravel Backend 
            axios.get('https://jesso.ppcdeveloper.com/api/instruktur') 
            .then(response => { 
                //assign state posts with response data 
                instrukturs.value = response.data.data 
            }).catch(error => {
                 console.log(error.response.data) 
            }) 
        })

        onMounted(() => {
            //get API from Laravel Backend 
            axios.get('https://jesso.ppcdeveloper.com/api/kelas') 
            .then(response => { 
                //assign state posts with response data 
                kelas.value = response.data.data 
            }).catch(error => {
                 console.log(error.response.data) 
            }) 
        })

        onMounted(() => {
            axios.get(`https://jesso.ppcdeveloper.com/api/showJadwalUmum/${route.params.id}`)
                .then(response => {
                    //assign state posts with response data
                    jadwalUmum.id_instruktur = response.data.data.id_instruktur
                    jadwalUmum.id_kelas = response.data.data.id_kelas
                    jadwalUmum.sesi = response.data.data.sesi
                    jadwalUmum.hari = response.data.data.hari
                    jadwalUmum.waktu_mulai = response.data.data.waktu_mulai
                    jadwalUmum.waktu_selesai = response.data.data.waktu_selesai
                }).catch(error => {
                    console.log(error.response.data)
                })
            })

            //method update
            function update() {
                let id_instruktur = jadwalUmum.id_instruktur
                let id_kelas = jadwalUmum.id_kelas
                let sesi = jadwalUmum.sesi
                let hari = jadwalUmum.hari
                let waktu_mulai = jadwalUmum.waktu_mulai
                let waktu_selesai = jadwalUmum.waktu_selesai

                axios.put(`https://jesso.ppcdeveloper.com/api/jadwalUmum/${router.params.id}`, {
                    id_instruktur: id_instruktur,
                    id_kelas: id_kelas,
                    sesi: sesi,
                    hari: hari,
                    waktu_mulai: waktu_mulai,
                    waktu_selesai: waktu_selesai,
                }).then(() => {
                        //redirect ke post index
                        router.push({
                            name: 'jadwalUmum.index'
                        })
                    }).catch(error => {
                        //assign state validation with error
                        validation.value = error.response.data
                    })

            }

            //return
            return {
                kelas,
                instrukturs,
                jadwalUmum,
                validation,
                router,
                update
            }

        }
    }
</script>

<style>

</style>