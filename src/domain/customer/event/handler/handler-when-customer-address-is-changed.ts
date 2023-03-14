import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";
import CustomerAddressChangedEvent from "../customer-address-changed.event";

export default class HandlerWhenCustomerAddressIsChanged
    implements EventHandlerInterface<CustomerAddressChangedEvent> {
    handle(event: CustomerAddressChangedEvent): void {
        console.log(`Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: ${event.eventData.address.street}, numero ${event.eventData.address.number}, ${event.eventData.address.city}, ${event.eventData.address.zip} `);
    }
}