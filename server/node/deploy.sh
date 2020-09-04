#!/bin/bash
[ $(id -u) != "0" ] && { echo "Error: 必须使用root用户执行此脚本！"; exit 1; }
python_test(){
	#测速决定使用哪个源
	tsinghua='pypi.tuna.tsinghua.edu.cn'
	pypi='mirror-ord.pypi.io'
	doubanio='pypi.doubanio.com'
	pubyun='pypi.pubyun.com'	
	tsinghua_PING=`ping -c 1 -w 1 $tsinghua|grep time=|awk '{print $8}'|sed "s/time=//"`
	pypi_PING=`ping -c 1 -w 1 $pypi|grep time=|awk '{print $8}'|sed "s/time=//"`
	doubanio_PING=`ping -c 1 -w 1 $doubanio|grep time=|awk '{print $8}'|sed "s/time=//"`
	pubyun_PING=`ping -c 1 -w 1 $pubyun|grep time=|awk '{print $8}'|sed "s/time=//"`
	echo "$tsinghua_PING $tsinghua" > ping.pl
	echo "$pypi_PING $pypi" >> ping.pl
	echo "$doubanio_PING $doubanio" >> ping.pl
	echo "$pubyun_PING $pubyun" >> ping.pl
	pyAddr=`sort -V ping.pl|sed -n '1p'|awk '{print $2}'`
	if [ "$pyAddr" == "$tsinghua" ]; then
		pyAddr='https://pypi.tuna.tsinghua.edu.cn/simple'
	elif [ "$pyAddr" == "$pypi" ]; then
		pyAddr='https://mirror-ord.pypi.io/simple'
	elif [ "$pyAddr" == "$doubanio" ]; then
		pyAddr='http://pypi.doubanio.com/simple --trusted-host pypi.doubanio.com'
	elif [ "$pyAddr" == "$pubyun_PING" ]; then
		pyAddr='http://pypi.pubyun.com/simple --trusted-host pypi.pubyun.com'
	fi
	rm -f ping.pl
}
install_service(){
	echo "Writting system config..."
	wget -O ss_node.service https://raw.githubusercontent.com/bemarkt/scripts/master/server/node/node.service
	chmod 754 ss_node.service && mv ss_node.service /etc/systemd/system
	echo "Starting SS Node Service..."
	systemctl enable ss_node && systemctl start ss_node
}
install_bbr() {
	wget --no-check-certificate https://raw.githubusercontent.com/bemarkt/scripts/master/server/node/bbr.sh && chmod +x bbr.sh && ./bbr.sh
}
install_centos(){
	cd /root
	yum clean all && rm -rf /var/cache/yum && yum update -y
	yum install epel-release -y && yum makecache
	yum install git net-tools htop ntp -y
	systemctl stop ntpd.service && ntpdate us.pool.ntp.org
	systemctl stop firewalld && systemctl disable firewalld
	yum install -y libsodium python36 python36-pip iptables 
	yum -y groupinstall "Development Tools"
	#第一次yum安装 supervisor
	yum -y install supervisor
	supervisord
	#第二次pip3 supervisor是否安装成功
	if [ -z "`pip3`" ]; then
    curl -O https://bootstrap.pypa.io/get-pip.py
		python3 get-pip.py
		rm -rf *.py
	fi
	if [ -z "`ps aux|grep supervisord|grep python`" ]; then
    pip3 install supervisor
    supervisord
	fi
	#第三次检测pip3 supervisor是否安装成功
	if [ -z "`pip3`" ]; then
		if [ -z "`easy_install`"]; then
    wget http://peak.telecommunity.com/dist/ez_setup.py
		python ez_setup.py
		fi		
		easy_install pip3
	fi
	if [ -z "`ps aux|grep supervisord|grep python`" ]; then
    easy_install supervisor
    supervisord
	fi
	pip3 install --upgrade pip setuptools
	ldconfig
	git clone -b manyuser https://github.com/Anankke/shadowsocks-mod.git "/root/shadowsocks"
	cd /root/shadowsocks
	chkconfig supervisord on
	#第一次安装
	python_test
	pip3 install --upgrade pip setuptools
	pip3 install -r requirements.txt -i $pyAddr
	#第二次检测是否安装成功
	if [ -z "`python3 -c 'import requests;print(requests)'`" ]; then
		pip3 install -r requirements.txt #用自带的源试试再装一遍
	fi
	#第三次检测是否成功
	if [ -z "`python3 -c 'import requests;print(requests)'`" ]; then
		mkdir python && cd python
		git clone https://github.com/urllib3/urllib3.git && cd urllib3
		python3 setup.py install && cd ..
		git clone https://github.com/nakagami/CyMySQL.git && cd CyMySQL
		python3 setup.py install && cd ..
		git clone https://github.com/requests/requests.git && cd requests
		python3 setup.py install && cd ..
		git clone https://github.com/pyca/pyopenssl.git && cd pyopenssl
		python3 setup.py install && cd ..
		git clone https://github.com/cedadev/ndg_httpsclient.git && cd ndg_httpsclient
		python3 setup.py install && cd ..
		git clone https://github.com/etingof/pyasn1.git && cd pyasn1
		python3 setup.py install && cd ..
		rm -rf python
	fi
	cd /root/shadowsocks
	cp apiconfig.py userapiconfig.py
	cp config.json user-config.json
}
install_ubuntu(){
	apt-get update -y
	apt-get install supervisor lsof -y
	apt-get install build-essential wget curl -y
	apt-get install iptables git python3 -y
	ldconfig
	if [ -z "`pip3`" ]; then
    curl -O https://bootstrap.pypa.io/get-pip.py
		python3 get-pip.py
		rm -rf *.py
	fi
	if [ -z "`ps aux|grep supervisord|grep python`" ]; then
    pip3 install supervisor
    supervisord
	fi
	#第三次检测pip3 supervisor是否安装成功
	if [ -z "`pip3`" ]; then
		if [ -z "`easy_install`"]; then
    wget http://peak.telecommunity.com/dist/ez_setup.py
		python ez_setup.py
		fi		
		easy_install pip3
	fi
	if [ -z "`ps aux|grep supervisord|grep python`" ]; then
    easy_install supervisor
    supervisord
	fi
	pip3 install cymysql
	cd /root
	git clone -b manyuser https://github.com/Anankke/shadowsocks-mod.git "/root/shadowsocks"
	cd shadowsocks
	pip3 install -r requirements.txt
	chmod +x *.sh
	# 配置程序
	cp apiconfig.py userapiconfig.py
	cp config.json user-config.json
}
install_node_api(){
	clear
	echo
	echo "#########################################################################"
	echo "# SSPanel-Uim后端对接一键脚本                                     	  "
	echo "# Github: https://github.com/bemarkt/scripts/tree/master/server/node     "
	echo "# Author:	bemarkt				Origin Author: 7colorblog                  "
	echo "#########################################################################"
	echo
	#Check Root
	[ $(id -u) != "0" ] && { echo "Error: 必须使用root用户执行此脚本！"; exit 1; }
	#check OS version
	check_sys(){
		if [[ -f /etc/redhat-release ]]; then
			release="centos"
		elif cat /etc/issue | grep -q -E -i "debian"; then
			release="debian"
		elif cat /etc/issue | grep -q -E -i "ubuntu"; then
			release="ubuntu"
		elif cat /etc/issue | grep -q -E -i "centos|red hat|redhat"; then
			release="centos"
		elif cat /proc/version | grep -q -E -i "debian"; then
			release="debian"
		elif cat /proc/version | grep -q -E -i "ubuntu"; then
			release="ubuntu"
		elif cat /proc/version | grep -q -E -i "centos|red hat|redhat"; then
			release="centos"
	  fi
	}
	timedatectl set-timezone Asia/Shanghai
	install_ssr_for_each(){
		check_sys
		if [[ ${release} = "centos" ]]; then
			install_centos
		else
			install_ubuntu
		fi
	}
	# 取消文件数量限制
	sed -i '$a * hard nofile 512000\n* soft nofile 512000' /etc/security/limits.conf
	read -p "请输入面板的域名或ip(例如:https://xxx 或 http://xxx): " USER_DOMAIN
	read -p "请输入面板的TOKEN(例如:mupass): " USER_TOKEN
	read -p "请输入面板的节点id(例如:7): " NODE_ID
	install_ssr_for_each
	cd /root/shadowsocks
	USER_DOMAIN=${USER_DOMAIN:-"http://127.0.0.1"}
	USER_TOKEN=${USER_TOKEN:-"mupass"}
	NODE_ID=${NODE_ID:-"3"}
	echo -e "Modify apiconfig.py...\n"
	sed -i -e "s%WEBAPI_URL = 'https://zhaoj.in'%WEBAPI_URL = '${USER_DOMAIN}'%g" -e "s/WEBAPI_TOKEN = 'glzjin'/WEBAPI_TOKEN = '${USER_TOKEN}'/g" -e "s/NODE_ID = 0/NODE_ID = ${NODE_ID}/g" /root/shadowsocks/userapiconfig.py
	# 启用supervisord
	supervisorctl shutdown
	#某些机器没有echo_supervisord_conf 
	wget -N -P  /etc/ --no-check-certificate https://raw.githubusercontent.com/bemarkt/scripts/master/server/node/supervisord.conf
	/usr/bin/supervisord -c /etc/supervisord.conf
	#iptables
	iptables -F
	iptables -X  
	iptables -I INPUT -p tcp -m tcp --dport 22:65535 -j ACCEPT
	iptables -I INPUT -p udp -m udp --dport 22:65535 -j ACCEPT
	iptables-save >/etc/sysconfig/iptables
	iptables-save >/etc/sysconfig/iptables
	echo 'iptables-restore /etc/sysconfig/iptables' >> /etc/rc.local
	echo "/usr/bin/supervisord -c /etc/supervisord.conf" >> /etc/rc.local
	chmod +x /etc/rc.d/rc.local
	echo "#########################################################################"
	echo "# 安装完成，节点即将安装BBR加速                                      	  "
	echo "# Github: https://github.com/bemarkt/scripts/tree/master/server/node     "
	echo "# Author:	bemarkt				Origin Author: 7colorblog                  "
	echo "#########################################################################"
	install_service
	install_bbr
	reboot now
}
install_node_db(){
	clear
	echo
	echo "#########################################################################"
	echo "# SSPanel-Uim后端对接一键脚本                                     	  "
	echo "# Github: https://github.com/bemarkt/scripts/tree/master/server/node     "
	echo "# Author:	bemarkt				Origin Author: 7colorblog                  "
	echo "#########################################################################"
	echo
	#Check Root
	[ $(id -u) != "0" ] && { echo "Error: 必须使用root用户执行此脚本！"; exit 1; }
	#check OS version
	check_sys(){
		if [[ -f /etc/redhat-release ]]; then
			release="centos"
		elif cat /etc/issue | grep -q -E -i "debian"; then
			release="debian"
		elif cat /etc/issue | grep -q -E -i "ubuntu"; then
			release="ubuntu"
		elif cat /etc/issue | grep -q -E -i "centos|red hat|redhat"; then
			release="centos"
		elif cat /proc/version | grep -q -E -i "debian"; then
			release="debian"
		elif cat /proc/version | grep -q -E -i "ubuntu"; then
			release="ubuntu"
		elif cat /proc/version | grep -q -E -i "centos|red hat|redhat"; then
			release="centos"
	  fi
	}
	timedatectl set-timezone Asia/Shanghai
	install_ssr_for_each(){
		check_sys
		if [[ ${release} = "centos" ]]; then
			install_centos
		else
			install_ubuntu
		fi
	}
	# 取消文件数量限制
	sed -i '$a * hard nofile 512000\n* soft nofile 512000' /etc/security/limits.conf
	read -p "请输入面板数据库地址: " MYSQL_HOST
	read -p "请输入面板数据库库名: " MYSQL_DB 
	read -p "请输入面板数据库用户名: " MYSQL_USER 
	read -p "请输入面板数据库密码: " MYSQL_PASS 
	read -p "请输入面板的节点ID(like:7): " NODE_ID
	install_ssr_for_each
	cd /root/shadowsocks
	echo -e "modify Config.py...\n"
	sed -i "s#'modwebapi'#'glzjinmod'#" /root/shadowsocks/userapiconfig.py #改成数据库对接
	sed -i "s#'zhaoj.in'#'jd.hk'#" /root/shadowsocks/userapiconfig.py #混淆设置
	MYSQL_HOST=${MYSQL_HOST:-"http://127.0.0.1"}
	sed -i "s#MYSQL_HOST = '127.0.0.1'#MYSQL_HOST = '${MYSQL_HOST}'#" /root/shadowsocks/userapiconfig.py
	MYSQL_DB=${MYSQL_DB:-"root"}
	sed -i "s#MYSQL_DB = 'shadowsocks'#MYSQL_DB = '${MYSQL_DB}'#" /root/shadowsocks/userapiconfig.py
	MYSQL_USER=${MYSQL_USER:-"root"}
	sed -i "s#MYSQL_USER = 'ss'#MYSQL_USER = '${MYSQL_USER}'#" /root/shadowsocks/userapiconfig.py
	MYSQL_PASS=${MYSQL_PASS:-"root"}
	sed -i "s#MYSQL_PASS = 'ss'#MYSQL_PASS = '${MYSQL_PASS}'#" /root/shadowsocks/userapiconfig.py
	NODE_ID=${NODE_ID:-"3"}
	sed -i '2d' /root/shadowsocks/userapiconfig.py
	sed -i "2a\NODE_ID = ${NODE_ID}" /root/shadowsocks/userapiconfig.py
	# 启用supervisord
	supervisorctl shutdown
	#某些机器没有echo_supervisord_conf
	wget -N -P  /etc/ --no-check-certificate https://raw.githubusercontent.com/bemarkt/scripts/master/server/node/supervisord.conf
	supervisord
	#iptables
	iptables -F
	iptables -X  
	iptables -I INPUT -p tcp -m tcp --dport 22:65535 -j ACCEPT
	iptables -I INPUT -p udp -m udp --dport 22:65535 -j ACCEPT
	iptables-save >/etc/sysconfig/iptables
	iptables-save >/etc/sysconfig/iptables
	echo 'iptables-restore /etc/sysconfig/iptables' >> /etc/rc.local
	echo "/usr/bin/supervisord -c /etc/supervisord.conf" >> /etc/rc.local
	chmod +x /etc/rc.d/rc.local
	echo "#########################################################################"
	echo "# 安装完成，节点即将安装BBR加速                                      	  "
	echo "# Github: https://github.com/bemarkt/scripts/tree/master/server/node     "
	echo "# Author:	bemarkt				Origin Author: 7colorblog                  "
	echo "#########################################################################"
	install_service
	install_bbr
	reboot now
}
echo
echo "########################################################################"
echo "#                 SSPanel-Uim 后端对接一键脚本                     		"
echo "# Github: https://github.com/bemarkt/scripts/tree/master/server/node"
echo "# Author:	bemarkt"
echo "# 请输入 1 或者 2 选择后端对接方式"
echo "# 1、  WebAPI"
echo "# 2、  DB数据库"
echo "########################################################################"
echo
num=$1
if [ "${num}" == "1" ]; then
    install_node_api 1
else
    stty erase '^H' && read -p " 请输入数字 [1-2]:" num
		case "$num" in
		1)
		install_node_api
		;;
		2)
		install_node_db
		;;
		*)
		echo "请输入正确的数字 [1-2]"
		;;
	esac
fi
