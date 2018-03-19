import Vue from 'vue';
import Router from 'vue-router';
import index from '@/pages/index.vue';

import hospital from '@/pages/hospitalImage/index.vue';
import editHospital from '@/pages/hospitalImage/edit.vue';

import official from '@/pages/officialCircles/index.vue';
import editOfficial from '@/pages/officialCircles/edit.vue';

import tumorIndex from '@/pages/tumorEncyclopedia/index.vue';
import edittum from '@/pages/tumorEncyclopedia/edit.vue';

import drug from '@/pages/drugManagement/index.vue';
import editdrug from '@/pages/drugManagement/edit.vue';

import authentication from '@/pages/attestation/index.vue';
import authentication_user from '@/pages/attestation/examine_user.vue';
import authentication_doctor from '@/pages/attestation/examine_doctor.vue';
import authentication_love from '@/pages/attestation/examine_love.vue';
import authentication_service from '@/pages/attestation/examine_service.vue';
import authentication_service_doctor from '@/pages/attestation/examine_service_doctor.vue';

import advertising from '@/pages/advertising/index.vue';
import editadvertising from '@/pages/advertising/edit.vue';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			component: index
		},

		// 医院
		{
			path: '/hospital',
			component: hospital
		},
		{
			path: '/editHospital/:id',
			component: editHospital
		},

		// 官方圈
		{
			path: '/official',
			component: official
		},
		{
			path: '/editOfficial/:id',
			component: editOfficial
		},

		// 肿瘤
		{
			path: '/tumorIndex',
			component: tumorIndex
		},
		{
			path: '/edittum/:id',
			component: edittum
		},

		// 药物
		{
			path: '/drug',
			component: drug
		},
		{
			path: '/editdrug/:id',
			component: editdrug
		},

		// 认证
		{
			path: '/authentication',
			component: authentication,
			
		},
		{
			path: '/authentication/user/:id',
			component: authentication_user
		},
		{
			path: '/authentication/doctor/:id',
			component: authentication_doctor
		},
		{
			path: '/authentication/love/:id',
			component: authentication_love
		},
		{
			path: '/authentication/service/:id',
			component: authentication_service
		},
		{
			path: '/authentication/service/:id/doctor/:id',
			component: authentication_service_doctor
		},
		
		// 广告
		{
			path: '/advertising',
			component: advertising
		},
		{
			path: '/editadvertising',
			component: editadvertising
		},

	]
});
