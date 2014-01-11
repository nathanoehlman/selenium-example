
APPPID=$(shell ps -ef | grep  'node app.js$$' | cut -d' ' -f2)

all: test

launchapp:
ifneq (,$(APPPID))
	@echo "node app.js is already running. Process id: $(APPPID)."
else
	@echo "Starting node app.js ..."
	node app.js &
endif

test: launchapp
	mocha test/simple_test.js test/page_test.js


.PHONY: all test launchapp
