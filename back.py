import dataset

from flask import Flask, jsonify, request
app = Flask(__name__)


@app.route('/add', methods=['POST'])
def add_users():
    """
    Adds clients and shops to the respective tables in the data base.
    Returns a json object with, the type (client == True or false), name of client or shop and a status code.
    Status code:
        200 OK if all is OK
        ERROR 500 if something went wrong

    """
    client = request.json['client'] # boolean True for client, False for shop
    
    try:
        db = dataset.connect('sqlite:///etiket_db.db')
        
        if client:

            name = request.json['name']
            mail = request.json['mail']
            passwd = str(request.json['passwd']) # comes already in hash format

            db['Client'].insert(dict(name=name, mail=mail, passwd=passwd))

            status = "200 OK"

        elif not client:

            shop_name = request.json['shop_name']
            owner_name = request.json['owner_name']
            mail = request.json['mail']
            passwd = str(request.json['passwd']) # comes already in hash format
            
            db['Shop'].insert(dict(shop_name=shop_name, owner_name=owner_name, mail=mail, passwd=passwd))
            name = shop_name
            status = "200 OK"
        
    except:
        status = "ERROR 500"
        
    return jsonify({'Name': name,
                    "Client": client,
                    "Status": status,})

@app.route('/fav', methods=['POST'])
def favorites():
    try:
        db = dataset.connect('sqlite:///etiket_db.db')
        shop_id = request.json['shop_id']
        user_id = request.json['user_id']
        
        db['Favorites'].insert(dict(shop_id=shop_id, user_id=user_id))
        status = "200 OK"

        return jsonify({'shop_id': shop_id,
                    "user_id": user_id,
                    "Status": status,})
    except:
        return jsonify({"status": "ERROR 404 User not Found"})

@app.route('/get_fav/<user_id>',methods=['GET'])
def get_fav(user_id):
    try:
        db = dataset.connect('sqlite:///etiket_db.db')
        entry = []
        for shop in db['Favorites']:
            if shop['user_id'] == int(user_id):
                entry.append(shop['shop_id'])
        
        entry_shop = []
        for id in entry:
            shop = db['Shop'].find_one(id=id)
            shop.popitem()
            entry_shop.append(shop)    
        
        return jsonify(entry_shop)
    except:
        return jsonify({"status": "ERROR 404 Favourites not Found"})

@app.route('/get_shops', methods=['GET'])
def get_shops():
    try:
        db = dataset.connect('sqlite:///etiket_db.db')
        entry = []
        for shop in db['Shop']:
            shop.popitem()
            entry.append(shop)

        return jsonify(entry)
    except:
        return jsonify({"status": "ERROR 404 User not Found"})

@app.route('/log_in/<mail>/<passwd>/<client>', methods=['GET'])
def log_in(mail, passwd, client):
    """
    Checks if the client or shop is in the data base.
    Compares the mail and the hash of passwd with the ones on the data base.
    If matches, returns the user info, except the passwd.
    If no math return a Status code.
    Status code:
        ERROR 404 User not found (if user not in the data base)
    
    Receives http request, methog get to the ip:port/log_in/mail/passwd/client
    mail: the email of the user
    passwd: the hash of the user's passwd
    client: a lower case true if is a client, false if is a shop
    """
    
    
    try:
        db = dataset.connect('sqlite:///etiket_db.db')
        print(mail, passwd, client)
        entry = db[client].find_one(mail=mail, passwd=passwd)
        entry.popitem()
        return jsonify(entry)

    except:
        return jsonify({"status":"ERROR 404 User not Found"})




if __name__ == "__main__":
    app.run(host = '127.0.0.1', port = 3000, debug=True)
