# For server

## Deploy node

```shell
yum -y install wget &&
wget -N --no-check-certificate -O node.sh https://raw.githubusercontent.com/bemarkt/scripts/master/server/node/deploy.sh &&
chmod +x node.sh &&
bash node.sh
```