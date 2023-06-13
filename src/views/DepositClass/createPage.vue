<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>TAMBAH TRANSAKSI DEPOSIT KELAS</h4>
                        <hr>
                        <form @submit.prevent="store">
                            <div class="form-group mb-3">
                             <label for="content" class="form-label">No Transaksi</label>
                                <input class="form-control" disabled v-model="depositClass.nomor_transaksi" placeholder="Nomor Transaksi di Generate Otomatis">
                            </div>

                            <div class="form-group mb-3">
                             <label for="content" class="form-label">Pegawai</label>
                                <input class="form-control" disabled v-model="nama_pegawai">
                            </div>
                            
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Member</label>
                                <select name="id_member" id="id_member" class="form-select" v-model="depositClass.id_member">
                                    <option value="" hidden>Masukan ID Member</option>
                                    <option v-for="(member, id) in members" :key="id" v-bind:value="member.id">
                                        {{ member.id_member + " - " + member.nama }}
                                    </option>
                                </select>
                                <div v-if="validation.id_member" class="mt-2 alert alert-danger"> {{
                                    validation.id_member[0] }} </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Kelas</label>
                                <select name="id_kelas" id="id_kelas" class="form-select" v-model="depositClass.id_kelas">
                                    <option value="" hidden>Masukan Nama Kelas</option>
                                    <option v-for="(classes, id) in kelas" :key="id" v-bind:value="classes.id">
                                        {{ classes.nama_kelas }}
                                    </option>
                                </select>
                                <div v-if="validation.id_kelas" class="mt-2 alert alert-danger"> {{
                                    validation.id_kelas[0] }} </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Jumlah Deposit</label>
                                <input class="form-control" v-model="depositClass.deposit_kelas" placeholder="Masukan Jumlah Deposit">

                                <!--validation-->
                                <div v-if="validation.deposit_kelas" class="mt-2 alert alert-danger">
                                    {{ validation.deposit_kelas[0]}}
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
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {
    setup() {
        const idPegawaiLogged = localStorage.getItem('id');
        const nama_pegawai = localStorage.getItem('nama_pegawai');
        //state departemen 
        const depositClass = reactive({ 
            nomor_transaksi :'', 
            id_pegawai : '',
            id_member : '',
            id_kelas: '',
            deposit_kelas : '',
            masa_berlaku: '',
            
        })
        //state validation 
        const validation = ref([])
        //vue router 
        const router = useRouter()

        const pegawais = ref([])

        const members = ref([])

        const kelas = ref([])

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
            //get API from Laravel Backend 
            axios.get('https://jesso.ppcdeveloper.com/api/pegawai') 
            .then(response => { 
                //assign state posts with response data 
                pegawais.value = response.data.data 
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
            let nomor_transaksi = depositClass.nomor_transaksi
            let id_pegawai = idPegawaiLogged
            let id_member = depositClass.id_member
            let id_kelas = depositClass.id_kelas
            let deposit_kelas = depositClass.deposit_kelas
            let masa_berlaku = depositClass.masa_berlaku
            axios.post('https://jesso.ppcdeveloper.com/api/depositClass', { 
                nomor_transaksi : nomor_transaksi,
                id_pegawai : id_pegawai,
                id_member : id_member,
                id_kelas : id_kelas,
                deposit_kelas : deposit_kelas,
                masa_berlaku : masa_berlaku,
            }).then(() => {
                 //redirect ke post index 
                 router.push({ name: 'depositClass.index' }) }).catch(error => { 
                    //assign state validation with error 
                    validation.value = error.response.data 
                }) 
            }

            return { 
                depositClass, 
                pegawais,
                members,
                kelas,
                validation, 
                router, 
                store,
                idPegawaiLogged,
                nama_pegawai,
         }
    }
}
</script>

<style>
</style>