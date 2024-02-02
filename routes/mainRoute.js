const catsRoutes = require('./catRoute');
const SubCatRoutes = require('./subCatRoute');
const BrandRoutes = require('./brandRoute');
const ProductRoutes = require('./productRoute');
const UserRoutes = require('./userRoute');
const AuthRoutes = require('./authRoute');
const ReviewRoutes = require('./reviewRoute');
const WishlistRoutes = require('./wishlistRoute');
const AddressesRoutes = require('./addressesRoute');
const CouponsRoutes = require('./couponRoute');
const CartRoutes = require('./cartRoute');


const mountRoutes = (app) => {
    app.use('/cats', catsRoutes);
    app.use('/subCats', SubCatRoutes);
    app.use('/brands', BrandRoutes);
    app.use('/products', ProductRoutes);
    app.use('/users', UserRoutes);
    app.use('/auth', AuthRoutes);
    app.use('/reviews', ReviewRoutes);
    app.use('/wishlist', WishlistRoutes);
    app.use('/addresses', AddressesRoutes);
    app.use('/coupons', CouponsRoutes);
    app.use('/cart', CartRoutes);
};


module.exports = mountRoutes;