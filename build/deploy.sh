#!/bin/bash

ls
tar -zcvf michaelolsonblog.tar.gz ./src/

scp michaelolsonblog.tar.gz ec2-user@michaelolson.blog:/home/ec2-user

ssh ec2-user@michaelolson.blog << HERE

tar -xvzf michaelolsonblog.tar.gz

cd michaelolson.blog

docker-compose down

cd .. && rm -r michaelolson.blog

mv src michaelolson.blog

cp .env michaelolson.blog

cd michaelolson.blog && docker-compose up --build -d

HERE