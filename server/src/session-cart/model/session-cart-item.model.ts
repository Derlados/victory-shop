import { Exclude } from "class-transformer";
import { Product } from "src/products/models/product.model";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { SessionCart } from "./session-cart.model";

@Entity('session-cart-items')
export class SessionCartItem {
    @PrimaryColumn({ name: "session_cart_id", type: "bigint", nullable: false })
    cartId: number;

    @PrimaryColumn({ name: "product_id", type: "int", nullable: false })
    productId: number;

    @Column({ type: "int", nullable: false })
    count: number;

    @ManyToOne(() => SessionCart, cart => cart.products, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    @JoinColumn({ name: "session_cart_id" })
    @Exclude()
    cart: SessionCart;

    @ManyToOne(() => Product, product => product.id, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    @JoinColumn({ name: "product_id" })
    @Exclude()
    product: Product;
}