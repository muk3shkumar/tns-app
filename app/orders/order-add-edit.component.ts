import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { OrderService, PubSubService } from '../_services/index';

// import slide in/out animation
import { slideInOutAnimation } from '../_animations/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'order-add-edit.component.html',

    // make slide in/out animation available to this component
    animations: [slideInOutAnimation],

    // attach the slide in/out animation to the host (root) element of this component
    host: { '[@slideInOutAnimation]': '' }
})

export class OrderAddEditComponent implements OnInit {
    title = 'Add Product';
    order: any = {};

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private orderService: OrderService,
        private pubSubService: PubSubService) { }

    ngOnInit() {
        let productId = Number(this.route.snapshot.params['id']);
        if (productId) {
            this.title = 'Edit Order';
            this.order = this.orderService.getById(productId);
        }
    }

    saveOrder() {
        // save product
        this.orderService.save(this.order);

        // redirect to users view
        this.router.navigate(['orders']);

        // publish event so list controller can refresh
        this.pubSubService.publish('orders-updated');
    }
}
