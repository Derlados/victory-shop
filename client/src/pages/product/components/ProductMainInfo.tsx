import { observer, useLocalObservable } from 'mobx-react-lite';
import React, { FC, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import CartButton from '../../../components/CartButton';
import cart from '../../../store/cart';
import { ProductProps } from '../../shop/components/product-card/Product';
import 'swiper/css';

interface LocalStore {
    swiper: any;
    selectedCount: number;
    selectedImage: string;
}

interface ProductMainInfoProps extends ProductProps {
    isExtended?: boolean;
}


const ProductMainInfo: FC<ProductMainInfoProps> = observer(({ product, addToCart, addToFavorite, isExtended = false }) => {
    const localStore = useLocalObservable<LocalStore>(() => ({
        swiper: null,
        selectedCount: 1,
        selectedImage: product.imgs[0]
    }));

    useEffect(() => {
        localStore.selectedCount = 1;
        localStore.selectedImage = product.imgs[0];
        localStore.swiper?.slideToLoop(product.imgs.length - 1, 0);
    }, [product])

    const incrementCount = () => {
        if (localStore.selectedCount < product.count) {
            ++localStore.selectedCount;
        }
    }

    const decrementCount = () => {
        if (localStore.selectedCount > 1) {
            --localStore.selectedCount;
        }
    }

    const handleCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value != '' && +event.target.value >= 1 && +event.target.value <= product.count) {
            localStore.selectedCount = +event.target.value;
        }
    }

    const onAddToCart = () => {
        addToCart(product, localStore.selectedCount);
    }

    const selectImg = (index: number) => {
        localStore.selectedImage = product.imgs[index];
        localStore.swiper?.slideToLoop(index - 1);
    }

    const onIndexChange = (realIndex: number) => {
        const index = ++realIndex;

        if (index == product.imgs.length) {
            localStore.selectedImage = product.imgs[0];
        } else {
            localStore.selectedImage = product.imgs[index];
        }
    }

    return (
        <div className='product__info rlt'>
            <div className='product__images ccc'>
                <div className='product__img-container'>
                    <img className='product__img' src={localStore.selectedImage} />
                    <div className='product__arrow product__arrow_back ccc' onClick={() => localStore.swiper.slidePrev()}>{"❮"}</div>
                    <div className='product__arrow product__arrow_next ccc' onClick={() => localStore.swiper.slideNext()}>{"❯"}</div>
                </div>
                <div className='product__slider-container'>
                    <Swiper
                        className='product__slider'
                        spaceBetween={10}
                        slidesPerView={3}
                        direction="horizontal"
                        initialSlide={product.imgs.length - 1}
                        onRealIndexChange={(sw) => onIndexChange(sw.realIndex)}
                        loop={true}
                        onSwiper={(sw) => localStore.swiper = sw}
                    >
                        {product.imgs.map((img, index) => (
                            <SwiperSlide key={index}>
                                <img className='product__slider-slide' src={img} onClick={() => selectImg(index)} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className='product__arrow product__arrow_back ccc' onClick={() => localStore.swiper.slidePrev()}>{"❮"}</div>
                    <div className='product__arrow product__arrow_next ccc' onClick={() => localStore.swiper.slideNext()}>{"❯"}</div>
                </div>
            </div>
            <div className='product__content clt'>
                <div className='product__title'>{product.title}</div>
                <div className='product__price rlc'>
                    <div className='product__old-price'>{product.oldPrice} ₴</div>
                    <div className='product__current-price'>{product.price} ₴</div>
                </div>
                <div className='product__desc'>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                    Phasellus id nisi quis justo tempus mollis sed et dui. In hac habitasse platea dictumst. Suspendisse ultrices mauris diam. Nullam sed aliquet elit. Mauris consequat nisi ut mauris efficitur lacinia.</div>
                {isExtended &&
                    <div className='description__details rlc'>
                        <ul className='description__list'>
                            <li className='description__list-item description__list-item_attr'>Weight</li>
                            <li className='description__list-item description__list-item_attr'>Dimensions</li>
                            <li className='description__list-item description__list-item_attr'>Materials</li>
                            <li className='description__list-item description__list-item_attr'>Other Info</li>
                        </ul>
                        <ul className='description__list'>
                            <li className='description__list-item description__list-item_val'>400 g</li>
                            <li className='description__list-item description__list-item_val'>10 x 10 x 15 cm</li>
                            <li className='description__list-item description__list-item_val'>60% cotton, 40% polyester</li>
                            <li className='description__list-item description__list-item_val'>American heirloom jean shorts pug seitan letterpress</li>
                        </ul>
                    </div>
                }
                <div className='product__actions rlc'>
                    {!cart.findById(product.id) && <div className='product__count-actions rlc'>
                        <span className='product__count-btn ccc' onClick={decrementCount}>-</span>
                        <input className='product__count ccc' value={localStore.selectedCount} onChange={handleCountChange} type="number" maxLength={3} />
                        <span className='product__count-btn ccc' onClick={incrementCount}>+</span>
                    </div>}
                    <CartButton isActive={cart.findById(product.id) === undefined} onClick={onAddToCart} />
                </div>
                <span className='product__avalibility'>Availibility: <span className='product__avalibility-status product__avalibility-status_green'>{product.count} available</span></span>
                <div className='product__share-actions rlc'>
                    <span className='product__share'>Share: </span>
                    <div className='product__share-action product__share-action_facebook'></div>
                    <div className='product__share-action product__share-action_telegram'></div>
                </div>
            </div>
        </div>
    )
});

export default ProductMainInfo