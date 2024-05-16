import pika
import processing
from dotenv import load_dotenv
import os

load_dotenv()

connection = pika.BlockingConnection(
    pika.ConnectionParameters(
        host=os.getenv('RABBITMQ_HOST'),
        port=os.getenv('RABBITMQ_PORT'),
        credentials=pika.PlainCredentials(
            os.getenv('RABBITMQ_USERNAME'),
            os.getenv('RABBITMQ_PASSWORD')
        ))
)
channel = connection.channel()

channel.queue_declare(queue='inference', durable=True)

print(' [*] Waiting for messages. To exit press CTRL+C')


def callback(ch, method, properties, body):
    print(f" [x] Received {body.decode()}, starting processing...")
    processing.download_study(body.decode())
    print(" [x] Inference done!")
    ch.basic_ack(delivery_tag=method.delivery_tag)


channel.basic_qos(prefetch_count=1)
channel.basic_consume(queue='inference', on_message_callback=callback)

channel.start_consuming()
