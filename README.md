## Setup
⚠️ Assurez-vous d'avoir Docker et Git installé ⚠️

### Téléchargement du repository
```
git clone git@github.com:NFL-IT/web.git
cd web
```
### Mise en place des conteneurs
```
docker compose up -d
docker ps
```
Normalement vous verrez 2 (deux) conteneurs:
- web
- base de données (PostgreSQL)

### Ajout des données par défaut dans la BDD
**Users & Clients:**
```
curl localhost:3000/api/login
```
Normalement vous recevrez le "cookie" d'un utilisateur et client de test.

_User Credentials:_
```
Email: test@mail.com
Password: test
```

_Client Credentials:_
```
Email: client@mail.com
Password: client
```

🤓 Un "utilisateur" c'est un administrateur qui a accès à la dashboard du site web. Tandis qu'un "client" c'est un utilisateur qui n'a que accès au client Python.

**Reports:**
```
curl localhost:3000/api/reports/test
```

## Requêtes API
Les exemples sont en Python 3
### Création d'un "report" de type "Scan ports"
```py
import requests

response = requests.post("http://localhost:3000/api/send/report", headers={
    "Content-Type": "application/json"
}, cookies={
    "token": clientToken
}, json={
        "interface": "NomDeLinterface,
        "ip_address": "192.168.1.1",
        "mac_address": "FF:FF:FF:FF:FF:FF",
        "type": "port", # Ne pas changer, ça doit être "port"
        "protocol": "TCP", # TCP ou UDP
        "result": {
            "80": "open",
            "22": "open",
            "139": "closed"
        },
        "status": "good", # "good" ou "bad" c'est pour savoir si selon vous le résultat ("result") est celui qui était attendu ou non. Cette méthode risque de changer.
    })

if response.status_code == 200:
    print("The port scan report has been created")
else:
    print("There was an error creating the scan report")
```

### Création d'un "report" de type "Scan devices"
```py
import requests

response = requests.post("http://localhost:3000/api/send/report", headers={
    "Content-Type": "application/json"
}, cookies={
    "token": clientToken
}, json={
        "interface": "NomDeLinterface,
        "ip_address": "192.168.1.1",
        "mac_address": "FF:FF:FF:FF:FF:FF",
        "type": "device", # Ne pas changer, ça doit être "device"
        "protocol": "TCP", # TCP ou UDP
        "result": [
            {
                "ip": "192.168.1.76",
                "mac": "11:11:11:11:11:11"
            },
            {
                "ip": "192.168.1.52",
                "mac": "12:11:11:11:11:11"
            },
            {
                "ip": "192.168.1.31",
                "mac": "13:11:11:11:11:11"
            }
        ],
        "status": "bad", # "good" ou "bad" c'est pour savoir si selon vous le résultat ("result") est celui qui était attendu ou non. Cette méthode risque de changer.
    })

if response.status_code == 200:
    print("The device scan report has been created")
else:
    print("There was an error creating the scan report")
```