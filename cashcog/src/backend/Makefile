runserver:
	/start.sh

writeexpenseeventlog:
	env PYTHONPATH=. python3 producer/write_expense_event_log.py

rundevserver:
	/start-reload.sh

pip-compile:
	pip-compile requirements.in -o requirements.txt
	pip-compile requirements.dev.in -o requirements.dev.txt
