import SendEmailWhenProductIsCreatedHandler
    from "../../product/event/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";
import EventDispatcher from "./event-dispatcher";
import FirstHandlerWhenCustomerIsCreatedHandler
    from "../../customer/event/handler/first-handler-when-customer-is-created.handler";
import SecondHandlerWhenCustomerIsCreatedHandler
    from "../../customer/event/handler/second-handler-when-customer-is-created.handler";
import CustomerCreatedEvent from "../../customer/event/customer-created.event";
import CustomerAddressChangedEvent from "../../customer/event/customer-address-changed.event";
import HandlerWhenCustomerAddressIsChangedHandler
    from "../../customer/event/handler/handler-when-customer-address-is-changed.handler";

describe("Domain events tests", () => {
    it("should register an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(
            eventDispatcher.getEventHandlers["ProductCreatedEvent"]
        ).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
            1
        );
        expect(
            eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
        ).toMatchObject(eventHandler);
    });

    it("should unregister an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(
            eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
        ).toMatchObject(eventHandler);

        eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

        expect(
            eventDispatcher.getEventHandlers["ProductCreatedEvent"]
        ).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
            0
        );
    });

    it("should unregister all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(
            eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
        ).toMatchObject(eventHandler);

        eventDispatcher.unregisterAll();

        expect(
            eventDispatcher.getEventHandlers["ProductCreatedEvent"]
        ).toBeUndefined();
    });

    it("should notify all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        //PRODUCT CREATED EVENT
        const eventSendEmailWhenProductIsCreatedHandler = new SendEmailWhenProductIsCreatedHandler();
        const spyEventHandlerProduct = jest.spyOn(eventSendEmailWhenProductIsCreatedHandler, "handle");
        eventDispatcher.register("ProductCreatedEvent", eventSendEmailWhenProductIsCreatedHandler);

        expect(
            eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
        ).toMatchObject(eventSendEmailWhenProductIsCreatedHandler);

        const productCreatedEvent = new ProductCreatedEvent({
            name: "Product 1",
            description: "Product 1 description",
            price: 10.0,
        });

        // Quando o notify for executado o SendEmailWhenProductIsCreatedHandler.handle() deve ser chamado
        eventDispatcher.notify(productCreatedEvent);

        expect(spyEventHandlerProduct).toHaveBeenCalled();


        //CUSTOMER CREATED EVENT
        const firstHandlerWhenCustomerIsCreatedHandler = new FirstHandlerWhenCustomerIsCreatedHandler();
        const secondHandlerWhenCustomerIsCreatedHandler = new SecondHandlerWhenCustomerIsCreatedHandler();
        const spyEventHandlerCustomerFirst = jest.spyOn(firstHandlerWhenCustomerIsCreatedHandler, "handle");
        const spyEventHandlerCustomerSecond = jest.spyOn(secondHandlerWhenCustomerIsCreatedHandler, "handle");
        eventDispatcher.register("CustomerCreatedEvent", firstHandlerWhenCustomerIsCreatedHandler);
        eventDispatcher.register("CustomerCreatedEvent", secondHandlerWhenCustomerIsCreatedHandler);

        expect(
            eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
        ).toMatchObject(firstHandlerWhenCustomerIsCreatedHandler);

        expect(
            eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
        ).toMatchObject(secondHandlerWhenCustomerIsCreatedHandler);

        const customerCreatedEvent = new CustomerCreatedEvent({
            name: "Customer 1",
            description: "Customer 1 description",
        });

        //Quando o notify for executado o FirstHandlerWhenCustomerIsCreatedHandler.handle() e o SecondHandlerWhenCustomerIsCreatedHandler.handle() devem ser chamados
        eventDispatcher.notify(customerCreatedEvent);
        expect(spyEventHandlerCustomerFirst).toHaveBeenCalled();
        expect(spyEventHandlerCustomerSecond).toHaveBeenCalled();


        //CUSTOMER ADDRESS CHANGED EVENT
        const handlerWhenCustomerAddressIsChangedHandler = new HandlerWhenCustomerAddressIsChangedHandler();
        const spyEventHandlerAddress = jest.spyOn(handlerWhenCustomerAddressIsChangedHandler, "handle");
        eventDispatcher.register("CustomerAddressChangedEvent", handlerWhenCustomerAddressIsChangedHandler);

        expect(
            eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]
        ).toMatchObject(handlerWhenCustomerAddressIsChangedHandler);

        const address = {
            street: "Rua 1",
            number: "1",
            zip: "12345678",
            city: "São Paulo",
        }

        const customerAddressChangedEvent = new CustomerAddressChangedEvent({
            id: "1",
            name: "Customer1",
            address,
        });


        //Quando o notify for executado o HandlerWhenCustomerAddressIsChangedHandler.handle() deve ser chamado
        eventDispatcher.notify(customerAddressChangedEvent)
        expect(spyEventHandlerAddress).toHaveBeenCalled();

    });
});
