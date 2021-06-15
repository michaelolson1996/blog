#!/bin/bash

public_ip_address=$(wget -qO- http://checkip.amazonaws.com)
echo "this computers public ip address is $public_ip_address"
aws ec2 authorize-security-group-ingress --region $AWS_REGION --group-id $AWS_SEC_GROUP_ID --ip-permissions "[{\"IpProtocol\": \"tcp\", \"FromPort\": ${CIRCLECI_VM_PORT}, \"ToPort\": ${AWS_VM_PORT}, \"IpRanges\": [{\"CidrIp\": \"${public_ip_address}/32\"}]}]"

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