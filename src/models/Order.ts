type Order = {
    id: number;
    dateTime: Date;
    quantity: number;
    totalValue: number;
    stockName: string;
    executed: boolean;
}

export default Order;