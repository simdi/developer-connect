module.exports = {
    "host": "https://apmisapitest.azurewebsites.net/",
    "port": "9000",
    "public": "../public/",
    "paginate": {
        "default": 10,
        "max": 100
    },
    "authentication": {
        "secret": "1bd8d67e32fb484a1a4bc92c570cddff5ec6bd42a326f2772c2091ae541fb052be3801d1a352ed96757b96a80533bc3787b14acef6eb3081b487264a16051730f42a00168702813b9b531ebc95611c49c6f47dccce43333612a5023ce3c4f71f076d3a6a8ca6427d0fd1636e602404b1a6aeec9f68f1672237d1f205fe09581f6661c2a3a6953b7f44493f199af3e5909954cd4e0c723ac091ba441ee7413d4a4b8b7d4eb1f74e145dec10bb256f04c2b0793acc508dd8094646b51fe1e97e69447a8f47cf23d5dd831568f123a918b48862b7d66bce45b685dde22a93220af577ed20857e94290c68dd11ad48f47fca9cefc3404bdcd9c746da7b0e6bf78fba",
        "strategies": [
            "jwt",
            "local"
        ],
        "path": "/authentication",
        "service": "users",
        "jwt": {
            "header": {
                "typ": "access"
            },
            "audience": "https://yourdomain.com",
            "subject": "anonymous",
            "issuer": "dev-connect",
            "algorithm": "HS256",
            "expiresIn": "1d"
        },
        "authentication": {
            "secret": "1bd8d67e32fb484a1a4bc92c570cddff5ec6bd42a326f2772c2091ae541fb052be3801d1a352ed96757b96a80533bc3787b14acef6eb3081b487264a16051730f42a00168702813b9b531ebc95611c49c6f47dccce43333612a5023ce3c4f71f076d3a6a8ca6427d0fd1636e602404b1a6aeec9f68f1672237d1f205fe09581f6661c2a3a6953b7f44493f199af3e5909954cd4e0c723ac091ba441ee7413d4a4b8b7d4eb1f74e145dec10bb256f04c2b0793acc508dd8094646b51fe1e97e69447a8f47cf23d5dd831568f123a918b48862b7d66bce45b685dde22a93220af577ed20857e94290c68dd11ad48f47fca9cefc3404bdcd9c746da7b0e6bf78fba",
            "strategies": [
                "jwt",
                "local"
            ],
            "path": "/authentication",
            "service": "users",
            "jwt": {
                "header": {
                    "typ": "access"
                },
                "audience": "https://yourdomain.com",
                "subject": "anonymous",
                "issuer": "dev-connect",
                "algorithm": "HS256",
                "expiresIn": "2d"
            },
            "local": {
                "entity": "user",
                "usernameField": "email",
                "passwordField": "password"
            }
        }
    },
    "mongodb": "mongodb://localhost:27017/devconnect"
};