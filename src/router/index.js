import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '*',
    component: () => import('@/page/error/404')
  },
  {
    path: '/',
    component: () => import('@/page/login/login')
  },
  {
    path: '/',
    component: () => import('@/components/main.vue'),
    children: [{
      path: 'home',
      component: () => import('@/page/home/index.vue')
    }]
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/components/main'),
    children: [{
        path: '/admin/admin_user',
        component: () => import('@/page/admin/user.vue')
      },
      {
        path: '/admin/admin_menu',
        component: () => import('@/page/admin/menuManage')
      },
      {
        path: '/admin/admin_power',
        component: () => import('@/page/admin/power')
      },
      {
        path: '/admin/admin_org',
        component: () => import('@/page/admin/org')
      }, {
        path: '/admin/admin_icon',
        component: () => import('@/page/admin/icon')
      },
      {
        path: '/admin/admin_cloud',
        component: () => import('@/page/admin/skyDrive')
      },
      {
        path: '/admin/admin_registration',
        component: () => import('@/page/admin/templateRegistration')
      },
      {
        path: '/admin/admin_management',
        component: () => import('@/page/admin/templateManagement')
      },
      {
        path: '/admin/admin_category',
        component: () => import('@/page/admin/dictionaryCategory')
      },
      {
        path: '/admin/admin_value',
        component: () => import('@/page/admin/dictionaryValue')
      },
      {
        path: '/admin/admin_errorlog',
        component: () => import('@/page/admin/errorLog')
      },
      {
        path: '/admin/admin_optlog',
        component: () => import('@/page/admin/optLog')
      },
      {
        path: '/admin/admin_landingLog',
        component: () => import('@/page/admin/landingLog')
      }, {
        path: '/admin/admin_systemParameter',
        component: () => import('@/page/admin/systemParameter')
      },
      {
        path: '/admin/admin_systemMaintenance',
        component: () => import('@/page/admin/systemMaintenance')
      }, {
        path: '/admin/admin_systemConfig',
        component: () => import('@/page/admin/systemConfig')
      }
    ]
  },

  {
    path: '/',
    component: () => import('@/components/main.vue'),
    children: [{
        path: 'package',
        component: () => import('@/page/interfacePack/interfacePack.vue'),
      },
      {
        path: '/classification',
        component: () => import('@/page/sgmw-ve-api/battery.vue')
      },
      // {
      //   path: '/classification',
      //   component: () => import('@/page/sgmw-ve-api/battery.vue')
      // },
      // {
      //   path: '/classification',
      //   component: () => import('@/page/sgmw-ve-api/battery.vue')
      // },
      // {
      //   path: '/classification',
      //   component: () => import('@/page/sgmw-ve-api/battery.vue')
      // },
      // {
      //   path: '/classification',
      //   component: () => import('@/page/sgmw-ve-api/battery.vue')
      // },
      // {
      //   path: '/classification',
      //   component: () => import('@/page/sgmw-ve-api/battery.vue')
      // },
      // {
      //   path: 'package',
      //   component: () => import('@/page/interfacePack/interfacePack.vue'),
      //   meta:{
      //     name:'sgmw-btms-api',
      //     introduce:'sgmw-btms-api的介绍'
      //   }
      // },
      // {
      //   path: 'package',
      //   component: () => import('@/page/interfacePack/interfacePack.vue'),
      //   meta:{
      //     name:'sgmw-mms-api',
      //     introduce:'sgmw-mms-api的介绍',
      //   }
      // },
      {
        path: 'caller',
        component: () => import('@/page/caller/caller.vue'),
      },
    ],
  }
]

const router = new Router({
  mode: "hash",
  routes: routes
})

export default router
