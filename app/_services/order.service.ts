import { Injectable } from '@angular/core';

@Injectable()
export class OrderService {
    getAll() {
        return this.getOrders();
    }

    getById(id: number) {
        return this.getOrders().find(order => order.id === id);
    }

    save(order: any) {
        let orders = this.getOrders();

        if (order.id) {
            // update existing product
            for (var i = 0; i < orders.length; i++) {
                if (orders[i].id === order.id) {
                    orders[i] = order;
                    break;
                }
            }
            this.setOrders(order);
        } else {
            // create new product
            // assign id
            var lastOrder = orders[orders.length - 1] || { id: 0 };
            order.id = lastOrder.id + 1;

            // save to local storage
            orders.push(order);
            this.setOrders(orders);
        }
    }

    delete(id: number) {
        let orders = this.getOrders();
        for (var i = 0; i < orders.length; i++) {
            var product = orders[i];
            if (product.id === id) {
                orders.splice(i, 1);
                break;
            }
        }
        this.setOrders(orders);
    }

    // private helper methods
    private getOrders(): any[] {
      console.log(localStorage.getItem('orders'));
        if (!localStorage.getItem('orders')) {
            localStorage.setItem('orders', JSON.stringify([]));
        }

        return JSON.parse(localStorage.getItem('orders'));
    }

    private setOrders(orders: any[]) {
        localStorage.setItem('orders', JSON.stringify(orders));
    }
}
