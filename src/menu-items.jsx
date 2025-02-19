const menuItems = {
  items: [
    {
      id: 'ui-table',
      title: 'Admin',
      type: 'group',
      icon: 'icons-group',
      children: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          type: 'item',
          icon: 'feather icon-home',
          url: '/app/dashboard/default'
        },
        {
          id: 'customer',
          title: 'Customer',
          type: 'collapse',
          icon: 'fa fa-user',
          children: [
            {
              id: 'button',
              title: 'Customer List',
              type: 'item',
              url: '/app/customer/default'
            },
            {
              id: 'badges',
              title: 'Active Customer',
              type: 'item',
              url: '/basic/badges'
            },
            {
              id: 'breadcrumb',
              title: 'Non-active Customer',
              type: 'item',
              url: '/basic/breadcrumb-paging'
            },
            {
              id: 'collapse',
              title: 'Regular customer',
              type: 'item',
              url: '/basic/collapse'
            },
            {
              id: 'tabs-pills',
              title: 'Current Customer',
              type: 'item',
              url: '/basic/tabs-pills'
            }
          ]
        }
      ]
    },

    {
      id: 'ui-table',
      title: 'Data',
      type: 'group',
      icon: 'icons-group',
      children: [
        {
          id: 'package',
          title: 'Packages',
          type: 'item',
          icon: 'fa fa-cubes',
          url: '/app/package/default'
        },
        {
          id: 'banner',
          title: 'Banner-List',
          type: 'item',
          icon: 'fa fa-boxes',
          url: '/app/banner/BannerList'
        },
        {
          id: 'category',
          title: 'Category',
          type: 'item',
          icon: 'fa fa-list',
          url: '/app/categorieTable/CategoryList'
        },
        {
          id: 'car brands',
          title: 'Car Brands',
          type: 'item',
          icon: 'fa fa-car',
          url: '/app/carBrand/table'
        },
        {
          id: 'bike Brands',
          title: 'Bike Brands',
          type: 'item',
          icon: 'fa fa-motorcycle',
          url: '/app/bikeBrand/BikeBrand'
        },
        {
          id: 'phone',
          title: 'Phone Brands',
          type: 'item',
          icon: 'fa fa-mobile',
        }
      ]
    }
  ]
};

export default menuItems;
