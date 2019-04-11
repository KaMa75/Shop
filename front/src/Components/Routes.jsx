import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Layout from './Layout.jsx';
import MainPage from './MainPage/MainPage.jsx';
import Register from './Register_login/Register.jsx';
import Login from './Register_login/Login.jsx';
import Logout from './Logout.jsx';
import Dashboard from './Dashboard/Dashboard.jsx';
import Shop from './Shop/Shop.jsx';
import ProductDetail from './Shop/ProductDetail.jsx';
import AdminInfo from './Dashboard/AdminInfo.jsx';
import AddProduct from './Dashboard/AddProduct.jsx';
import ManageCategories from './Dashboard/ManageCategories.jsx';

const Routes = (props) => {
    const {userData, categoriesData, addToCategoryList, setAppState} = props;
    return (
        <Layout
            loggedIn={ userData.isAuth }
            typesForMenu={ categoriesData.types }
        >
            <Switch>
                <Route exact path='/' component={ MainPage } />
                <Route exact path='/register' component={ Register } />
                <Route exact path='/shop' render={ () => (
                    <Shop
                        categoriesData={ categoriesData }
                    />
                )} />
                <Route exact path='/product_details/:id' component={ ProductDetail } />
                <Route exact path='/user/dashboard' render={ () => (
                    !userData.isAuth ? (
                        <Redirect to='/login' />
                        ) : (
                            <Dashboard
                                userData={ userData }
                            />
                        )
                )} />
                <Route exact path='/user/user_profile' render={ () => (
                    !userData.isAuth ? (
                        <Redirect to='/login' />
                        ) : (
                            <Dashboard
                                userData={ userData }
                            />
                        )
                )} />
                <Route exact path='/user/cart' render={ () => (
                    !userData.isAuth ? (
                        <Redirect to='/login' />
                        ) : (
                            <Dashboard
                                userData={ userData }
                            />
                        )
                )} />
                <Route exact path='/user/logout' render={ () => (
                    !userData.isAuth ? (
                        <Redirect to='/' />
                    ) : (
                        <Logout
                            setAppState={ setAppState }
                        />
                    )
                )} />
                <Route exact path='/admin/info' render={ () => (
                    !userData.isAdmin ? (
                        <Redirect to='/login' />
                    ) : (
                        <AdminInfo
                            userData={ userData }
                        />
                    )
                )} />
                <Route exact path='/admin/add_product' render={ () => (
                    !userData.isAdmin ? (
                        <Redirect to='/login' />
                    ) : (
                        categoriesData.isLoaded && (
                            <AddProduct
                                userData={ userData }
                                categoriesData={ categoriesData }
                            />
                        )
                    )
                )} />
                <Route exact path='/admin/manage_categories' render={ () => (
                    !userData.isAdmin ? (
                        <Redirect to='/login' />
                    ) : (
                        <ManageCategories
                            userData={ userData }
                            categoriesData={ categoriesData }
                            addToCategoryList={ addToCategoryList }
                        />
                    )
                )} />
                <Route exact path='/login' render={ () => (
                    userData.isAuth ? (
                        <Redirect to='/user/dashboard' />
                    ) : (
                        <Login
                            loggedIn={ userData.isAuth }
                            setAppState={ setAppState }
                        />
                    )
                )} />
            </Switch>
        </Layout>
    );
};

export default Routes;
