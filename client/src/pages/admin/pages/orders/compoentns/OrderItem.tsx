import classNames from 'classnames';
import React, { FC } from 'react';
import Checkbox from '../../../../../lib/Checkbox/Checkbox';
import { IOrder, OrderStatus } from '../../../../../types/IOrder';
import orders from '../../../../../store/order'
import { observer, useLocalObservable } from 'mobx-react-lite';

interface OrderItemProps {
    order: IOrder;
}

interface LocalStore {
    extendedInfo: boolean;
}

const OrderItem: FC<OrderItemProps> = observer(({ order }) => {
    const localStore = useLocalObservable<LocalStore>(() => ({
        extendedInfo: false
    }))

    const toggleExInfo = () => {
        localStore.extendedInfo = !localStore.extendedInfo;
    }

    return (
        <li className='orders__item clc'>
            <div className='orders__short-info rlc'>
                <Checkbox className='orders__column-checker' checked={orders.selectedOrderIds.has(order.id)} onChange={() => orders.toggleSelectOrder(order.id)} />
                <span className='orders__column orders__column_value orders__column_small'>{order.id}</span>
                <span className='orders__column orders__column_value'>{order.client}</span>
                <span className='orders__column orders__column_value'>{order.createdAt.toLocaleDateString("ua-UA")} {order.createdAt.toLocaleTimeString("ua-UA")}</span>
                <span className='orders__column orders__column_value'>{order.totalPrice} ₴</span>
                <span className='orders__column orders__column_value'>{order.payment.method}</span>
                <div className='orders__column orders__column_value'>
                    <span className={classNames('orders__status', {
                        'orders__status_red': order.status == OrderStatus.NOT_PROCESSED,
                        'orders__status_yellow': order.status == OrderStatus.PROCESSING,
                        'orders__status_green': order.status == OrderStatus.PROCESSED,
                    })}>{order.status}</span>
                </div>
                <div className={classNames('orders__arrow', {
                    'orders__arrow_active': localStore.extendedInfo
                })} onClick={toggleExInfo}></div>
            </div>
            <div className={classNames('orders__extended-info ctc', {
                'orders__extended-info_visible': localStore.extendedInfo
            })}>
                <div className='rlt'>
                    <div className='orders__ex-info-column'>
                        <div className='orders__ex-info-row orders__ex-info-title'>Загальна інформація</div>
                        <div className='orders__ex-info-row rlt'>
                            <span className='orders__ex-info-text orders__ex-info-text_attr'>Клієнт: </span>
                            <span className='orders__ex-info-text orders__ex-info-text_value'>{order.client}</span>
                        </div>
                        <div className='orders__ex-info-row rlt'>
                            <span className='orders__ex-info-text orders__ex-info-text_attr'>Пошта: </span>
                            <span className='orders__ex-info-text orders__ex-info-text_value'>{order.email ?? 'Не вказано'}</span>
                        </div>
                        <div className='orders__ex-info-row rlt'>
                            <span className='orders__ex-info-text orders__ex-info-text_attr'>Телефон: </span>
                            <span className='orders__ex-info-text orders__ex-info-text_value'>{order.phone}</span>
                        </div>
                        <div className='orders__ex-info-row rlt'>
                            <span className='orders__ex-info-text orders__ex-info-text_attr'>Адреса: </span>
                            <span className='orders__ex-info-text orders__ex-info-text_value'>{order.address}</span>
                        </div>
                    </div>
                    <div className='orders__ex-info-column'>
                        <div className='orders__ex-info-row orders__ex-info-title'>Список товарів</div>
                        {order.orderProducts.map(op => (
                            <div key={`${order.id}-${op.product.id}`} className='orders__ex-info-row rlt'>
                                <span className='orders__ex-info-text orders__ex-info-text_value'>- {op.product.title} X {op.count}<b> - {op.product.price * op.count} ₴</b></span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='orders__total-price rrc'>Загальна сума: <span>{order.totalPrice} ₴</span></div>
            </div>
        </li>
    )
});

export default OrderItem