.PHONY: anvil_build, anvil_start, anvil_stop

anvil_build:
	docker build -t anvil_node . --no-cache

anvil_start:
	docker run -d -p 8545:8545 anvil_node 

anvil_stop:
	docker kill $$(docker ps -q --filter "ancestor=anvil_node")
