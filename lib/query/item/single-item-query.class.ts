// config
import { DeliveryClientConfig } from '../../config/delivery-client.config';

// models
import { ItemResponses } from '../../models/item/responses';
import { IContentItem } from '../../interfaces/item/icontent-item.interface';

// services
import { BaseItemQuery } from './base-item-query.class';

// rxjs
import { Observable } from 'rxjs/Rx';

// services
import { QueryService } from '../../services/query.service';

export class SingleItemQuery<TItem extends IContentItem> extends BaseItemQuery<TItem, ItemResponses.DeliveryItemResponse<TItem>> {

    constructor(
        protected config: DeliveryClientConfig,
        protected queryService: QueryService,
        private codename: string
    ) {
        super(config, queryService)

        if (!codename) {
            throw Error(`'codename' has to be configured for 'SingleItemQuery' query`);
        }
    }

     /**
     * Gets the runnable Observable
     */
    get(): Observable<ItemResponses.DeliveryItemResponse<TItem>> {
        return super.runSingleItemQuery(this.codename);
    }

     /**
     * Gets 'Url' representation of query
     */
    toString(): string {
        return super.getSingleItemQueryUrl(this.codename);
    }
}
