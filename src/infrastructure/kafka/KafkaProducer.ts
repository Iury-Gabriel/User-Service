
import { Kafka, Producer } from 'kafkajs';

export default class KafkaProducer {
    private kafka: Kafka;
    private producer: Producer;

    constructor() {
        this.kafka = new Kafka({
            clientId: 'user-service',
            brokers: ['localhost:9092'], // Endereço do broker Kafka
        });
        this.producer = this.kafka.producer();
    }

    async connect(): Promise<void> {
        await this.producer.connect();
    }

    async sendMessage(topic: string, message: any): Promise<void> {
        await this.producer.send({
            topic,
            messages: [{ value: JSON.stringify(message) }],
        });
    }

    async disconnect(): Promise<void> {
        await this.producer.disconnect();
    }
}
