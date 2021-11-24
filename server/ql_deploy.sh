#!/usr/bin/env bash

# Base on: 青龙一键安装脚本
# GitHub仓库： https://github.com/FlechazoPh/QLDependency

red='\e[91m'
green='\e[92m'
yellow='\e[93m'
magenta='\e[95m'
cyan='\e[96m'
none='\e[0m'

dir_shell=/ql/config
config_shell_path=$dir_shell/config.sh
extra_shell_path=$dir_shell/extra.sh
code_shell_path=$dir_shell/code.sh
task_before_shell_path=$dir_shell/task_before.sh
jdCookie_js=/ql/deps/jdCookie.js

clear
echo -e "\n${green}安装依赖需要时间，请耐心等待! ${none}\n\n"
echo -e "${green}当前node版本(如果没有node，请自行安装): ${none} ${red}`node -v` ${none}"
echo -e "${green}当前npm版本(如果没有npm，请自行安装): ${none} ${red}`npm -v` ${none}\n"
echo -e "当前小鸡为：\n${red}1、国内鸡(默认)\n2、国外鸡 ${none}\n"
read -p "请输入选项数字：" vpsloc
[ -z $vpsloc ] && vpsloc=1
if [ $vpsloc == 2 ]
then
    npm config set registry https://registry.npmjs.org
    echo -e "http://dl-cdn.alpinelinux.org/alpine/v3.12/main\nhttp://dl-cdn.alpinelinux.org/alpine/v3.12/community" > /etc/apk/repositories
    pip config set global.index-url https://pypi.python.org/simple
    github_raw_url="raw.githubusercontent.com"
else
    npm config set registry https://registry.npm.taobao.org
    echo -e "http://mirrors.tuna.tsinghua.edu.cn/alpine/v3.12/main\nhttp://mirrors.tuna.tsinghua.edu.cn/alpine/v3.12/community" > /etc/apk/repositories
    pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
    github_raw_url="raw.githubusercontents.com"
fi
clear
echo -e "${magenta}修复面板错误 ${none}\n"
mkdir -p /run/nginx
echo -e `nginx -c /etc/nginx/nginx.conf`
cd /ql
echo -e "${red} 下载 config.sh | extra.sh | code.sh | task_before.sh 并覆盖（Y/N）：（默认Y）${none}"
read confirm
if [ $confirm == Y ]
then
    wget https://${github_raw_url}/Oreomeow/VIP/main/Conf/Qinglong/config.sample.sh -O $config_shell_path
    wget https://${github_raw_url}/Oreomeow/VIP/main/Tasks/qlrepo/extra.sh -O $extra_shell_path
    wget https://${github_raw_url}/Oreomeow/VIP/main/Scripts/sh/Helpcode2.8/code.sh -O $code_shell_path
    wget https://${github_raw_url}/Oreomeow/VIP/main/Scripts/sh/Helpcode2.8/task_before.sh -O $task_before_shell_path
    wget https://gist.githubusercontent.com/fzls/14f8d1d3ebb2fef64750ad91d268e4f6/raw/jdCookie.js -O $jdCookie_js -x
clear
echo -e "${magenta}开始安装依赖 ${none}\n"
pnpm add -g pnpm

pnpm install -g

npm install -g npm

npm install -g png-js

npm install -g date-fns

npm install -g axios

npm install -g crypto-js

npm install -g ts-md5

npm install -g tslib

npm install -g @types/node

npm install -g requests

npm install -g tough-cookie

npm install -g jsdom

npm install -g download

npm install -g tunnel

npm install -g fs

npm install -g ws

npm install -g form-data

pnpm install -g js-base64

pnpm install -g qrcode-terminal

pnpm install -g silly-datetime

pip3 install requests

cd /ql/scripts/ && apk add --no-cache build-base g++ cairo-dev pango-dev giflib-dev && npm i && npm i -S ts-node typescript @types/node date-fns axios png-js canvas --build-from-source
cd /ql
apk add --no-cache build-base g++ cairo-dev pango-dev giflib-dev && cd scripts && npm install canvas --build-from-source
cd /ql
apk add python3 zlib-dev gcc jpeg-dev python3-dev musl-dev freetype-dev

echo -e "依赖安装完毕...建议${red}重启 Docker ${none}"
exit 0