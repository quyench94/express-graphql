# express-graplhql

# Summary
This project build base on requirement https://docs.bizzi.vn/share/7d1d0ce0-f0ee-4087-aba3-61e152f37d99

GraphQL docs: https://6swtpjtcog.execute-api.ap-southeast-1.amazonaws.com/dev/graphql

# Where am i getting stuck
- Some libraries does not support typescript -> Change other library
- Library bcrypt install from MacOS does not work with LinuxOS on AWS Lambda -> setup docker linux and re-build library to get bcrypt support Linux OS

# Requirement

## Before use
- Register new account
- Login to get token and pass it on request headers

## Use case
Design and implement a GraphQL API for a news-system that allows:

- [x] Everyone can get news, categories, publisher

- [x] Each news Publisher will be authenticated so they can create/update/delete their news

## Unauthenticated requests:

- [x] List of news (search, filter, pagination)

- [x] List of category

- [x] List of publisher

- [x] Detail of a news

## Publisher Authenticated request:

- [x] List of their own news

- [x] Create news

- [ ] Update news

- [ ] Delete news

## Webhook:

- [x] Every time news is read by someone, the system will callback to a pre-registered endpoint of the Publisher to notify them.

## Technical requirements

- [x] The API system should be written in TypeScript (you can pick any framework of your choice)

- [x] Should using GraphQL with DataLoader pattern

- [x] API documentation can be generated using your API design

- [x] [Cover 50%] Unit tests should be written and green. 

## Submission:

- [x] Push your project onto a Github / Gitlab repository

- [x] [AWS Lambda] Deploy the system onto a platform of your choice. Be able to deploy your project to a serverless platform (such as AWS Lambda) is a big plus.
---

# Author
quyench (quyech94@gmail.com)
