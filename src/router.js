//import vue router
import { createRouter, createWebHistory } from 'vue-router'
//define a routes
const routes = [
    {
        path: '/',
        name: 'login',
        component: () => import('@/components/LoginPage.vue'),
    },
    {
        path: '/berandaAdmin',
        name: 'berandaAdmin',
        component: () => import('@/components/BerandaAdmin.vue'),
        children: [
            //Instruktur
            {
                path: "/instruktur",
                name: "instruktur.index",
                component: () => import('@/views/Instruktur/indexPage.vue'),
            },
            {
                path: "/instruktur/create",
                name: "instruktur.create",
                component: () => import('@/views/Instruktur/createPage.vue'),
            },
            {
                path: "/instruktur/edit:id",
                name: "instruktur.edit",
                component: () => import('@/views/Instruktur/editPage.vue'),
            },
        ],

    },
    {
        path: '/berandaMO',
        name: 'berandaMO',
        component: () => import('@/components/BerandaMO.vue'),
        children: [
            //Jadwal Umum
            {
                path: "/jadwalUmum",
                name: "jadwalUmum.index",
                component: () => import('@/views/JadwalUmum/indexPage.vue'),
            },
            {
                path: "/jadwalUmum/create",
                name: "jadwalUmum.create",
                component: () => import('@/views/JadwalUmum/createPage.vue'),
            },
            {
                path: "/jadwalUmum/edit:id",
                name: "jadwalUmum.edit",
                component: () => import('@/views/JadwalUmum/editPage.vue'),
            },

            //Jadwal Harian
            {
                path: "/jadwalHarian",
                name: "jadwalHarian.index",
                component: () => import('@/views/JadwalHarian/indexPage.vue'),
            },
            {
                path: "/jadwalHarian/create",
                name: "jadwalHarian.create",
                component: () => import('@/views/JadwalHarian/createPage.vue'),
            },
            {
                path: "/jadwalHarian/edit:id",
                name: "jadwalHarian.edit",
                component: () => import('@/views/JadwalHarian/editPage.vue'),
            },

            //Izin Instruktur
            {
                path: "/absenInstruktur",
                name: "absenInstruktur.index",
                component: () => import('@/views/AbsenInstruktur/indexPage.vue'),
            },
            {
                path: "/absenInstruktur",
                name: "absenInstruktur.belumDikonfirmasi",
                component: () => import('@/views/AbsenInstruktur/indexNotPage.vue'),
            },

            //Laporan
            {
                path: "/laporanPendapatan",
                name: "laporanPendapatan.index",
                component: () => import('@/views/Laporan/laporanPendapatan.vue'),
            },
            {
                path: "/pendapatanChart",
                name: "pendapatanChart.index",
                component: () => import('@/views/Laporan/pendapatanChart.vue'),
            },
            {
                path: "/laporanKelas",
                name: "laporanKelas.index",
                component: () => import('@/views/Laporan/laporanKelas.vue'),
            },
            {
                path: "/laporanGym",
                name: "laporanGym.index",
                component: () => import('@/views/Laporan/laporanGym.vue'),
            },
            {
                path: "/laporanKinerjaInstruktur",
                name: "laporanKinerjaInstruktur.index",
                component: () => import('@/views/Laporan/laporanKinerjaInstruktur.vue'),
            },
        ],
    },
    {
        path: '/berandaKasir',
        name: 'berandaKasir',
        component: () => import('@/components/BerandaKasir.vue'),
        children: [
            //Member
            {
                path: "/member",
                name: "member.index",
                component: () => import('@/views/Member/indexPage.vue'),
            },
            {
                path: "/member",
                name: "member.indexAll",
                component: () => import('@/views/Member/indexAllPage.vue'),
            },
            {
                path: "/member/create",
                name: "member.create",
                component: () => import('@/views/Member/createPage.vue'),
            },
            {
                path: "/member/edit:id",
                name: "member.edit",
                component: () => import('@/views/Member/editPage.vue'),
            },

            // transaksi
            //Deposit Cash
            {
                path: "/depositCash",
                name: "depositCash.index",
                component: () => import('@/views/DepositCash/indexPage.vue'),
            },
            {
                path: "/depositCash/create",
                name: "depositCash.create",
                component: () => import('@/views/DepositCash/createPage.vue'),
            },
            

            //Deposit Class
            {
                path: "/depositClass",
                name: "depositClass.index",
                component: () => import('@/views/DepositClass/indexPage.vue'),
            },
            {
                path: "/depositClass/create",
                name: "depositClass.create",
                component: () => import('@/views/DepositClass/createPage.vue'),
            },
            {
                path: "/depositClass",
                name: "depositClass.indexAll",
                component: () => import('@/views/DepositClass/indexAllPage.vue'),
            },

            //Aktivasi Member
            {
                path: "/aktivasiMember",
                name: "aktivasiMember.index",
                component: () => import('@/views/AktivasiMember/indexPage.vue'),
            },
            {
                path: "/aktivasiMember/create",
                name: "aktivasiMember.create",
                component: () => import('@/views/AktivasiMember/createPage.vue'),
            },
            
            //presensi
            //absen member kelas
            {
                path: "/absenMemberKelas",
                name: "absenMemberKelas.index",
                component: () => import('@/views/AbsenMemberKelas/indexPage.vue'),
            },
            {
                path: "/absenMemberKelas/create",
                name: "absenMemberKelas.create",
                component: () => import('@/views/AbsenMemberKelas/createPage.vue'),
            },

            //absen member gym
            {
                path: "/absenMemberGym",
                name: "absenMemberGym.index",
                component: () => import('@/views/AbsenMemberGym/indexPage.vue'),
            },
            {
                path: "/absenMemberGym/create",
                name: "absenMemberGym.create",
                component: () => import('@/views/AbsenMemberGym/createPage.vue'),
            },
        ]
    },
    {
        path: '/testBeranda',
        name: 'testBeranda',
        component: () => import('@/components/testBeranda.vue'),
    }
]
//create router
const router = createRouter({
    history: createWebHistory(),
    routes // config routes
})
export default router;