import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { OrderService, PubSubService } from '../_services/index';

// import fade in animation
import { fadeInAnimation } from '../_animations/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'order-list.component.html',

    // make fade in animation available to this component
    animations: [fadeInAnimation],

    // attach the fade in animation to the host (root) element of this component
    host: { '[@fadeInAnimation]': '' }
})

export class OrderListComponent implements OnInit, OnDestroy {
    orders: any[];
    subscription: Subscription;

    constructor(
        private orderService: OrderService,
        private pubSubService: PubSubService) { }

    deleteProduct(id: number) {
        this.orderService.delete(id);
        this.loadOrders();
    }

    ngOnInit() {
        this.loadOrders();

        // reload products when updated
        this.subscription = this.pubSubService.on('orders-updated').subscribe(() => this.loadOrders());
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }

    private loadOrders() {
        this.orders = this.orderService.getAll();
    }
}
