from flask import Flask, jsonify
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from sqlalchemy.ext.automap import automap_base
import numpy as np
from flask_cors import CORS

engine = create_engine("sqlite:///project3.sqlite")
Base = automap_base()
Base.prepare(autoload_with=engine)

project_3 = Base.classes.data

app = Flask(__name__)
CORS(app)

@app.route("/")
def welcome():
    session = Session(engine)

    results = session.query(project_3).all()

    session.close()

    all_data = []

    for i in results:
        all_data.append({
            'ID':i.ID,
            'State':i.State,
            'State_Abbriviation':i.State_Abbriviation,
            'Health_Condition':i.Health_Condition,
            'Condition_Prevalence_Percent':i.Condition_Prevalence_Percent,
            'Median_AQI':i.Median_AQI,
            'Average_Temperature_F':i.Average_Temperature_F,
            'Percent_Clear_Days':i.Percent_Clear_Days,
            'Latitude':i.Latitude,
            'Longitude':i.Longitude
        })
        
    print(all_data)

    return jsonify(all_data)

if __name__ == '__main__':
    app.run(debug=True)