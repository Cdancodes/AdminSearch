import React, { Suspense, Fragment, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Loader from './components/Loader/Loader';
import AdminLayout from './layouts/AdminLayout';
import PrivateRoute from "./components/PrivateRoute";
import { BASE_URL } from 'config/constant';
// import { BASE_URL } from './config/constants';

export const renderRoutes = (routes = []) => (
  <Suspense fallback={<Loader />}>
    <Routes>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Element = route.element;

        return (
          <Route
            key={i}
            path={route.path}
            element={
              <Guard>
                {route.protected ? (
                  <PrivateRoute>
                    <Layout>{route.routes ? renderRoutes(route.routes) : <Element props={true} />}</Layout>
                  </PrivateRoute>
                ) : (
                  <Layout>{route.routes ? renderRoutes(route.routes) : <Element props={true} />}</Layout>
                )}
              </Guard>
            }
          />
        );
      })}
    </Routes>
  </Suspense>
);

const routes = [
  {
    exact: 'true',
    path: '/login',
    element: lazy(() => import('./views/auth/signin/SignIn1'))
  },
  {
    exact: 'true',
    path: '/auth/signin-1',
    element: lazy(() => import('./views/auth/signin/SignIn1'))
  },
  {
    exact: 'true',
    path: '/auth/signup-1',
    element: lazy(() => import('./views/auth/signup/SignUp1'))
  },
  {
    path: '*',
    layout: AdminLayout,
    routes: [

      // <======== Package Routes =========>
      {
        exact: 'true',
        path: '/app/showPackage/default/:id',
        element: lazy(() => import('./views/packages/showPackage/ShowPackage')),
        // protected: true
      },
      {
        exact: 'true',
        path: '/app/udpatePackage/default/:id',
        element: lazy(() => import('./views/packages/updatePackage/UpdatePackage')),
        // protected: true
      },
      {
        exact: 'true',
        path: '/app/createPackage/default',
        element: lazy(() => import('./views/packages/createPackage/CreatePackage')),
        // protected: true
      },
      {
        exact: 'true',
        path: '/app/package/default',
        element: lazy(() => import('./views/packages/packageTable/PackageTable')),
        // protected: true
      },


      // <====== Customer Routes =========>
      {
        exact: 'true',
        path: '/app/udpateCustomer/default/:id',
        element: lazy(() => import('./views/customers/updateCustomer/UpdateCustomer')),
        // protected: true
      },
      {
        exact: 'true',
        path: '/app/customer/default',
        element: lazy(() => import('./views/customers/customerList/CustomerTable')),
        // protected: true
      },
      {
        exact: true,
        path: "app/createCustomer/default",
        element: lazy(() => import("./views/customers/createCustomer/CreateCustomer")),
        // protected: true,
      },


      // <====== Bike Routes =========>
      {
        exact: true,
        path: "/app/createBike/default",
        element: lazy(() => import("./views/bikes/createBike/CreateBike")),
        // protected: true,
      },
      {
        exact: true,
        path: '/app/bikeBrand/BikeBrand',
        element: lazy(() => import('./views/bikes/bikeList/BikeBrand')),
        // protected: true
      },
      {
        exact: 'true',
        path: '/app/bikeDetails/default/:id',
        element: lazy(() => import('./views/bikes/showBikeDetails/BikeDetails')),
        // protected: true
      },
      {
        exact: 'true',
        path: '/app/updateBike/default/:id',
        element: lazy(() => import('./views/bikes/updateBike/UpdateBike')),
        // protected: true
      },


      // <======= Car Routes ==========>
      {
        exact: true,
        path: "/app/ShowDetails/default/:id",
        element: lazy(() => import("./views/cars/showDetails/ShowDetails")),
        // protected: true,
      },
      {
        exact: true,
        path: "/app/updateCar/default/:id",
        element: lazy(() => import("./views/cars/updateCar/UpdateCar")),
        // protected: true,
      },
      {
        exact: true,
        path: "/app/createCar/default",
        element: lazy(() => import("./views/cars/createCar/CreateCar")),
        // protected: true,
      },
      {
        exact: 'true',
        path: '/app/carBrand/table',
        element: lazy(() => import('./views/cars/carList/CarBrand')),
        // protected: true
      },


      // <======= Banner Routes ==========>
      {
        exact: true,
        path: "/app/updateBanner/default/:id",
        element: lazy(() => import("./views/banners/updateBanner/UpdateBanner")),
        // protected: true,
      },
      {
        exact: 'true',
        path: '/app/createBanner/default',
        element: lazy(() => import('./views/banners/createBanner/CreateBanner')),
        // protected: true
      },
      {
        exact: true,
        path: '/app/banner/BannerList',
        element: lazy(() => import('./views/banners/bannerList/BannerList')),
        // protected: true
      },
      

      // <======= Brand Routes ==========>
      {
        exact: true,
        path: '/app/createBrand/default/:id/:name',
        element: lazy(() => import('./views/brands/createBrand/CreateBrand')),
        // protected: true
      },
      {
        exact: true,
        path: '/app/createBrand/default/:id',
        element: lazy(() => import('./views/brands/createBrand/CreateBrand')),
        // protected: true
      },
      {
        exact: 'true',
        path: '/app/createBrand/default',
        element: lazy(() => import('./views/brands/createBrand/CreateBrand')),
        // protected: true
      },


      // <======= Category Routes ==========>     
      {
        exact: true,
        path: '/app/createCategory/CreateCategory',
        element: lazy(() => import('./views/categories/createCategory/CreateCategory')),
        // protected: true
      },
      {
        exact: true,
        path: '/app/categorieTable/CategoryList',
        element: lazy(() => import('./views/categories/categorieTable/CategoryList')),
        // protected: true
      },


      // <======= Dashboard Routes ==========>

      {
        exact: 'true',
        path: '/app/dashboard/default',
        element: lazy(() => import('./views/dashboard')),
        // protected: true
      },
      {
        exact: 'true',
        path: '/basic/button',
        element: lazy(() => import('./views/ui-elements/basic/BasicButton')),
        // protected: true
      },
      {
        exact: 'true',
        path: '/basic/badges',
        element: lazy(() => import('./views/ui-elements/basic/BasicBadges')),
        // protected: true
      },
      {
        exact: 'true',
        path: '/basic/breadcrumb-paging',
        element: lazy(() => import('./views/ui-elements/basic/BasicBreadcrumb')),
        // protected: true
      },
      {
        exact: 'true',
        path: '/basic/collapse',
        element: lazy(() => import('./views/ui-elements/basic/BasicCollapse')),
        // protected: true
      },
      {
        exact: 'true',
        path: '/basic/tabs-pills',
        element: lazy(() => import('./views/ui-elements/basic/BasicTabsPills')),
        // protected: true
      },
      {
        exact: 'true',
        path: '/basic/typography',
        element: lazy(() => import('./views/ui-elements/basic/BasicTypography')),
        // protected: true
      },
      {
        exact: 'true',
        path: '/forms/form-basic',
        element: lazy(() => import('./views/forms/FormsElements')),
        // protected: true
      },
      {
        exact: 'true',
        path: '/tables/bootstrap',
        element: lazy(() => import('./views/tables/BootstrapTable')),
        // protected: true
      },
      {
        exact: 'true',
        path: '/charts/nvd3',
        element: lazy(() => import('./views/charts/nvd3-chart')),
        // protected: true
      },
      {
        exact: 'true',
        path: '/maps/google-map',
        element: lazy(() => import('./views/maps/GoogleMaps')),
        // protected: true
      },
      {
        exact: 'true',
        path: '/sample-page',
        element: lazy(() => import('./views/extra/SamplePage')),
        // protected: true
      },
      {
        path: '*',
        exact: 'true',
        element: () => <Navigate to={BASE_URL} />
      }
    ]
  }
];

export default routes;
