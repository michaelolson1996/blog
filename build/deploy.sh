#!/bin/bash

cd ..

tar -zcvf michaelolsonblog.tar.gz src/

ssh ec2-user@michaelolson.blog tar -xvzf michaelolsonblog.tar.gz
