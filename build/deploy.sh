#!/bin/bash

ls
tar -zcvf michaelolsonblog.tar.gz ./src/

scp michaelolsonblog.tar.gz ec2-user@michaelolson.blog:/home/ec2-user

ssh ec2-user@michaelolson.blog tar -xvzf michaelolsonblog.tar.gz
