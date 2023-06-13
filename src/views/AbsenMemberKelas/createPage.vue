<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>TAMBAH PRESENSI MEMBER KELAS</h4>
                        <hr>
                        <form @submit.prevent="store">
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Instruktur</label>
                                <select name="id_instruktur" id="id_instruktur" class="form-select" v-model="absenMemberKelas.id_instruktur">
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
                                <select name="id_booking_kelas" id="id_booking_kelas" class="form-select" v-model="absenMemberKelas.id_booking_kelas">
                                    <option value="" hidden>Masukan Kelas</option>
                                    <option v-for="(booking_class, id) in booking_classes" :key="id" v-bind:value="booking_class.id">
                                        {{ booking_class.nomor_booking + " - " + booking_class.jadwal_harian.kelas.nama_kelas + " - " + booking_class.jadwal_harian.hari + " - " + booking_class.member.id_member}}
                                    </option>
                                </select>
                                <div v-if="validation.id_booking_kelas" class="mt-2 alert alert-danger"> {{
                                    validation.id_booking_kelas[0] }} </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Member</label>
                                <select name="id_member" id="id_member" class="form-select" v-model="absenMemberKelas.id_member">
                                    <option value="" hidden>Masukan ID Member</option>
                                    <option v-for="(member, id) in members" :key="id" v-bind:value="member.id">
                                        {{ member.id_member + " - " + member.nama }}
                                    </option>
                                </select>
                                <div v-if="validation.id_member" class="mt-2 alert alert-danger"> {{
                                    validation.id_member[0] }} </div>
                            </div>

                            <div class="form-group mb-3"> <label class="form-label">Status Member</label> 
                                <select
                                    class="form-select"
                                    aria-label="Default select example"
                                    v-model="absenMemberKelas.status"
                                    >
                                    <option value="" hidden>Masukan Status Member</option>
                                    <option value="Hadir">Hadir</option>
                                    <option value="Tidak Hadir">Tidak Hadir</option>
                                    </select>
                                <div v-if="validation.status" class="mt-2 alert alert-danger"> {{
                                    validation.status[0] }} </div>
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
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {
    setup() {
        //state departemen 
        const absenMemberKelas = reactive({ 
            id_instruktur : '',
            id_booking_kelas : '',
            id_member : '',
            status : '',
        })
        //state validation 
        const validation = ref([])
        //vue router 
        const router = useRouter()

        const instrukturs = ref([])

        const members = ref([])

        const booking_classes = ref([])

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
            axios.get('https://jesso.ppcdeveloper.com/api/bookingClass') 
            .then(response => { 
                //assign state posts with response data 
                booking_classes.value = response.data.data 
            }).catch(error => {
                 console.log(error.response.data) 
            }) 
        }) 

        onMounted(() => {
            //get API from Laravel Backend 
            axios.get('https://jesso.ppcdeveloper.com/api/member') 
            .then(response => { 
                //assign state posts with response data 
                members.value = response.data.data 
            }).catch(error => {
                 console.log(error.response.data) 
            }) 
        }) 

        //method store 
        function store() { 
            let id_instruktur = absenMemberKelas.id_instruktur
            let id_member = absenMemberKelas.id_member
            let id_booking_kelas = absenMemberKelas.id_booking_kelas
            let status = absenMemberKelas.status
            axios.post('https://jesso.ppcdeveloper.com/api/absenMemberKelas', { 
                id_instruktur : id_instruktur,
                id_member : id_member,
                id_booking_kelas : id_booking_kelas,
                status : status,
            }).then(() => {
                 //redirect ke post index 
                 router.push({ name: 'absenMemberKelas.index' }) }).catch(error => { 
                    //assign state validation with error 
                    validation.value = error.response.data 
                }) 
            }

            return { 
                booking_classes,
                absenMemberKelas, 
                instrukturs,
                members,
                validation, 
                router, 
                store 
         }
    }
}
</script>

<style>
</style>