#!/bin/bash

list_topics() {
	if command -v docker &>/dev/null; then
		sudo docker exec -it kafka /bin/bash -c "kafka-topics.sh --list --bootstrap-server kafka:9093"
	else
		echo "Error: Docker command not found. Make sure Docker is installed and in your PATH."
	fi
}

describe_topic() {
	topic_name="$1"
	if command -v docker &>/dev/null; then
		echo "Describing Kafka topic: $topic_name"
		sudo docker exec -it kafka /bin/bash -c "kafka-topics.sh --describe --topic $topic_name --bootstrap-server kafka:9093"
	else
		echo "Error: Docker command not found. Make sure Docker is installed and in your PATH."
	fi
}

show-msgs() {
	sudo docker exec -it kafka /bin/bash -c "kafka-console-consumer.sh --bootstrap-server kafka:9093 --topic notify-1  --from-beginning"
}

case "$1" in
list-topics)
	echo "Listing Kafka topics..."
	list_topics
	;;
describe-topic)
	if [ -n "$2" ]; then
		describe_topic "$2"
	else
		echo "Error: Missing topic name. Usage: $0 describe-topic <topic_name>"
		exit 1
	fi
	;;
show-msgs)
	show-msgs
	;;
*)
	echo "Usage: $0 {list-topics|describe-topic <topic_name>}"
	exit 1
	;;
esac
