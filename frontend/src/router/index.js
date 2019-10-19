import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/pages/Login'
import ShowWorkers from '@/pages/ShowWorkers'
import AddWorker from '@/pages/AddWorker'
import EditWorker from '@/pages/EditWorker'
import LoginComponent from '@/components/LoginComponent'
import PasswordReminder from '@/components/PasswordReminder'
import PasswordRemindedInfo from '@/components/PasswordRemindedInfo'
import MyData from '@/pages/MyData'
import ChangePassword from '@/components/ChangePassword'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      children: [
        {
          path: '',
          component: LoginComponent
        },
        {
          path: 'remindpassword',
          name: 'remindpassword',
          component: PasswordReminder
        },
        {
          path: 'remindpasswordinfo',
          name: 'remindpasswordinfo',
          component: PasswordRemindedInfo
        }
      ]
    },
    {
      path: '/admin/showworkers',
      name: 'ShowWorkers',
      component: ShowWorkers
    },
    {
      path: '/admin/addworker',
      name: 'AddWorker',
      component: AddWorker
    },
    {
      path: '/admin/editworker/:id',
      name: 'EditWorker',
      component: EditWorker
    },
    {
      path: '/user/mydata',
      name: 'MyData',
      component: MyData
    },
    {
      path: '/passwordrecovery',
      name: 'ChangePassword',
      component: ChangePassword
    }
  ]
})
