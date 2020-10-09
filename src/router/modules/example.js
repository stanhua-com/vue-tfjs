// router/modules/example.js

import adminLayout from '@/components/layout/admin.vue'

export default {
  path: '/example',
  name: 'example',
  title: '实例',
  component: adminLayout,
  sort: 1,
  children: [
    {
      path: 'tensor',
      meta: {
        title: '张量 Tensor'
      },
      component: () => import('@/views/example/tensor/index.vue')
    },
    {
      path: 'scalar',
      meta: {
        title: '标量 Scalar'
      },
      component: () => import('@/views/example/scalar/index.vue')
    },
  ]
}
