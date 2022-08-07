
from flask import Flask , request
import pickle
import pandas as pd
api = Flask(__name__)

# @api.route('/profile')
# def my_profile():
#     response_body = {
#         "name": "Nagato",
#         "about" :"Hello! I'm a full stack developer that loves python and javascript"
#     }
#     #  return f"{title}"
#     return response_body

@api.route('/recommend')
def my_profi():
    title = request.args.get('title')
    grocery_dict = pickle.load(open('grocery_dict.pkl', 'rb'))
    grocerys = pd.DataFrame(grocery_dict)
    similarity = pickle.load(open('similarity.pkl', 'rb'))

    grocery_index = grocerys[grocerys['title'] == title].index[0]
    distances = similarity[grocery_index]
    grocery_list = sorted(list(enumerate(distances)), reverse=True, key=lambda x: x[1])[1:6]
    recommended_products = []
    for i in grocery_list:
        recommended_products.append(grocerys.iloc[i[0]].title)
    dict = {}
    keys = range(5)
    for i in keys:
            dict[i] = recommended_products[i]
    # recommended_pro = dict(recommended_products)
    print("The dict is: " ,dict)
    rec = {
        "values": dict
    }
    return rec