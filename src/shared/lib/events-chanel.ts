import { connect, Connection, Channel } from "amqplib";

let connection: Connection | undefined = undefined;
export class EventsChannel {
  constructor(private channelName: string) {}

  async getConnection(): Promise<Connection> {
    if (!connection) {
      connection = await connect(process.env.RMQ_URL!);
    }
    return connection;
  }

  async createChannel(): Promise<Channel> {
    const conn = await this.getConnection();
    const channel = await conn.createChannel();
    await channel.assertExchange(this.channelName, "direct", {
      durable: false,
    });
    return channel;
  }

  async consume(
    key: string,
    listener: (data: unknown) => Promise<void> | void
  ) {
    const channel = await this.createChannel();

    const queue = await channel.assertQueue("", { exclusive: true });
    await channel.bindQueue(queue.queue, this.channelName, key);

    const consumer = await channel.consume(queue.queue, async (data) => {
      await listener(JSON.parse(data!.content.toString()));
      channel.ack(data!);
    });

    return () => {
      channel.cancel(consumer.consumerTag);
    };
  }

  async emit(key: string, data: Record<string, unknown>) {
    const channel = await this.createChannel();

    channel.publish(
      this.channelName,
      key,
      Buffer.from(JSON.stringify({ ...data, date: new Date() }))
    );
  }
}
