# Cashcog

This is an (example) application for confirming expenses that
consists of the following services:

- db: a mongodb database

- producer: listens to an external stream of expense events and
  saves them in the database

- server: a fastapi webserver that serves GraphQL requests

- frontend: a react SPA

## Notes

- check roadmap.txt for the finished and planned milestones.

- the GUI translates all amounts to EUR to make it easier to judge whether the expense
  is reasonable. However, the conversion is not actually implemented (this requires
  additional setup of a conversion service). Instead, amounts are just represented as if they
  were already in EUR.

- the docker-compose.yml file and associated Dockerfile files give you
  a minimal setup to try the application locally. After running `docker-compose up` you can
  see the application at localhost:3000

- the docker-compose.dev.yml file and associated Dockerfile.dev files give you
  a developer setup in which the source files are shared with the docker containers.

- I found out that I do not actually need to use async handlers in the producer, but it was interesting
  to find out how this works in Python 3 so I kept it.

- There are currently no kubernetes files and no tests (these would be the next steps)
