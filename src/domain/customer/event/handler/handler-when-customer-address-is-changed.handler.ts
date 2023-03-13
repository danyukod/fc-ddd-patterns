import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default class HandlerWhenCustomerAddressIsChangedHandler
    implements EventHandlerInterface<CustomerCreatedEvent> {
    handle(event: CustomerCreatedEvent): void {
        console.log(`Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: ${event.eventData.address.street}, numero ${event.eventData.address.number}, ${event.eventData.address.city}, ${event.eventData.address.zip} `);
    }
}