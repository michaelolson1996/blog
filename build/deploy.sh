#!/bin/bash

mkdir ~/.aws

touch ~/.aws/credentials

chmod 666 ~/.aws/credentials

cat >~/.aws/credentials <<EOL
[default]
aws_access_key_id=${AWS_USER_ID}
aws_secret_access_key=${AWS_USER_KEY}
EOL

chmod 644 ~/.aws/credentials

aws configure list-profiles

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

current_security_group=$(aws ec2 describe-security-groups --region ${AWS_REGION} --group-id ${AWS_SEC_GROUP_ID})
ip_count=$(echo ${current_security_group} | jq -r '.SecurityGroups[0].IpPermissions | length')
if [ ${ip_count} > 0 ]; then
    for (( n=0; n < $ip_count; n++ ))
    do
    this_port=$(echo ${current_security_group} | jq -r ".SecurityGroups[0].IpPermissions[${n}].FromPort")
    cidr_count=$(echo ${current_security_group} | jq -r ".SecurityGroups[0].IpPermissions[${n}].IpRanges | length")
    for (( c=0; c < $cidr_count; c++ ))
    do
        if [[ $this_port != 80 && $this_port != 443 ]]; then
            this_cidr=$(echo ${current_security_group} | jq -r ".SecurityGroups[0].IpPermissions[${n}].IpRanges[${c}].CidrIp")
            aws ec2 revoke-security-group-ingress --region ${AWS_REGION} --group-id ${AWS_SEC_GROUP_ID} --protocol tcp --port ${this_port} --cidr ${this_cidr}
        fi
    done
    done
fi