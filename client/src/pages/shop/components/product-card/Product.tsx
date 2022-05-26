import { observer } from 'mobx-react-lite';
import React, { FC } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import cart from '../../../../store/cart';
import { IImage } from '../../../../types/IImage';
import { IProduct } from '../../../../types/IProduct';
import ProductMainInfo from '../../../product/components/ProductMainInfo';
import ProductLargeCard from './ProductLargeCard';
import ProductSmallCard from './ProductSmallCard';

export interface ProductProps {
    product: IProduct;
    addToCart: (product: IProduct, count?: number) => void;
    openFullView: (product: IProduct) => void;
    getMainImage: (product: IProduct) => IImage;
}

export interface ProductCardProps extends ProductProps {
    onOpenQuickView: (product: IProduct) => void;
}

interface CreateProductCardProps {
    product: IProduct;
    type: "small" | "large" | "quick-view" | "full-view";
    onOpenQuickView?: (IProduct: IProduct) => void;
}

const Product: FC<CreateProductCardProps> = observer(({ type, product, onOpenQuickView = () => { } }) => {
    window.scrollTo({
        top: 0,
        behavior: "auto"
    })
    const { catalog } = useParams();
    const navigation = useNavigate();

    //TODO
    const openFullView = (product: IProduct) => {
        navigation(`/${catalog}/${product.id}`);
    }

    const addToCart = (product: IProduct, count: number = 1) => {
        cart.addToCart(product, count);
    }

    const getMainImage = (product: IProduct): IImage => {
        return product.images.find(img => img.isMain) ?? product.images[0];
    }

    switch (type) {
        case "small": {
            return (
                <ProductSmallCard
                    product={product}
                    addToCart={addToCart}
                    openFullView={openFullView}
                    onOpenQuickView={onOpenQuickView}
                    getMainImage={getMainImage}
                />
            )
        }
        case "large": {
            return (
                <ProductLargeCard
                    product={product}
                    addToCart={addToCart}
                    openFullView={openFullView}
                    onOpenQuickView={onOpenQuickView}
                    getMainImage={getMainImage}
                />
            )
        }
        case "quick-view": {
            return (
                <ProductMainInfo
                    product={product}
                    addToCart={addToCart}
                    openFullView={openFullView}
                    getMainImage={getMainImage}
                />
            )
        }
        case "full-view": {
            return (
                <ProductMainInfo
                    product={product}
                    addToCart={addToCart}
                    openFullView={openFullView}
                    getMainImage={getMainImage}
                    isExtended={true}
                />
            )
        }
    }
});

export default Product