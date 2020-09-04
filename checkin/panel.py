# source: https://github.com/ifloppy/ssAutoCheckin

import requests
import json

base_url = input()
user_list = input()
pwd_list = input()
sc_key = input()

user = user_list.split("\n")
pswd = pwd_list.split("\n")


def checkin(email, password):

    email = email.split('@')
    email = email[0] + '%40' + email[1]

    session = requests.session()
    session.get(base_url, verify=False)

    login_url = base_url + '/auth/login'
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    }
    post_data = 'email=' + email + '&passwd=' + password + '&code='
    post_data = post_data.encode()
    session.post(login_url, post_data,
                 headers=headers, verify=False)

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36',
        'Referer': base_url + '/user'
    }
    response = json.dumps(session.post(base_url + '/user/checkin',
                                       headers=headers, verify=False).json(), sort_keys=True,
                          indent=4, ensure_ascii=False)

    print(response)

    desp = f"""
------
### 打卡信息：

```json
{response}
```
"""
    sc_send("Panel-DailyBonus", desp)


def sc_send(text, desp):
    send_url = f"https://sc.ftqq.com/{sc_key}.send"
    headers = {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    }
    params = {
        "text": text,
        "desp": desp
    }

    response = requests.post(send_url, data=params, headers=headers)
    if response.json()["errmsg"] == 'success':
        print("Server酱推送服务成功")
    else:
        print("Server酱推送失败")
        print(json.dumps(response.json(), sort_keys=True,
                         indent=4, ensure_ascii=False))


i = 0
while i < len(user):
    checkin(user[i], pswd[i])
    i += 1
