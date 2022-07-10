import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { SessionCartService } from './session-cart.service';
import { SessionCartController } from './session-cart.controller';
import { DecryptSessionCartMiddleware } from './middlewares/decrypt-session-cart.middleware';
import { SessionCart } from './model/session-cart.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/models/product.model';
import { SessionCartItem } from './model/session-cart-item.model';

@Module({
  imports: [TypeOrmModule.forFeature([SessionCart, SessionCartItem])],
  providers: [SessionCartService],
  controllers: [SessionCartController]
})
export class SessionCartModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(DecryptSessionCartMiddleware)
      .forRoutes({ path: 'session-cart', method: RequestMethod.ALL });
  }
}
