# source: https://github.com/ifloppy/ssAutoCheckin

import requests
import os
requests.packages.urllib3.disable_warnings()

# 此脚本可多个账户签到，一行一个，用户名与密码要对应

# 初始化环境变量开头
base_url = os.environ["panel_website"]
user_list = os.environ["panel_user_list"]
pswd_list = os.environ["panel_pswd_list"]
# 初始化环境变量结尾

if(base_url == "" or user_list == "" or pswd_list == ""):
    print("发生异常，一个或多个环境变量无法读取，请检查您环境变量设定")
    exit()

# 分割账号密码开头
user = user_list.split("\n")
pswd = pswd_list.split("\n")
# 分割账号密码结尾


def qlnotify(desp):
    cur_path = os.path.abspath(os.path.dirname(__file__))
    if os.path.exists(cur_path + "/notify.py"):
        try:
            from notify import send
        except Exception:
            print("加载通知服务失败~")
        else:
            send("机场签到", desp)


def checkin(email, password):

    email = email.split('@')
    email = email[0] + '%40' + email[1]

    session = requests.session()

    session.get(base_url, verify=False)

    login_url = base_url + '/auth/login'
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    }

    post_data = 'email=' + email + '&passwd=' + password + '&code='
    post_data = post_data.encode()
    response = session.post(login_url, post_data,
                            headers=headers, verify=False)

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36',
        'Referer': base_url + '/user'
    }

    response = session.post(base_url + '/user/checkin',
                            headers=headers, verify=False)
    print(response.text)
    msg = (response.json()).get("msg")
    qlnotify(msg)


i = 0
while i < len(user):
    checkin(user[i], pswd[i])
    i += 1
