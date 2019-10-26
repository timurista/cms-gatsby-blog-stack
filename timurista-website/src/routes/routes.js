import HomePage from '../pages/HomePage'
import AboutPage from '../pages/HomePage'
import HomePage from '../pages/HomePage'



const routes = {
    '/': () => <HomePage />,
    '/about': () => <AboutPage />,
    '/blog': () => <ProductOverview />,
    '/blog/:id': ({id}) => <ProductDetails id={id} />
};

export default routes;