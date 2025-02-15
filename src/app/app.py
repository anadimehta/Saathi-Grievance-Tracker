from flask import Flask, request, jsonify
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
# ------------------------------
# Data: Grievances (Hardcoded for now)
# ------------------------------
grievances = [
    {
        "id": 1,
        "title": "Pothole on Main Street",
        "description": "There is a big pothole on Main Street that is causing traffic issues.",
        "location": "City Center",
        "category": "Road"
    },
    {
        "id": 2,
        "title": "Street Light Not Working",
        "description": "The street light near my house has not been working for a week.",
        "location": "North District",
        "category": "Lighting"
    },
    {
        "id": 3,
        "title": "Garbage Collection Delay",
        "description": "Garbage has not been collected for several days in my locality.",
        "location": "South District",
        "category": "Sanitation"
    },
    {
        "id": 4,
        "title": "Water Supply Issues",
        "description": "There is a continuous water supply issue in my area for the past week.",
        "location": "West End",
        "category": "Water"
    },
    {
        "id": 5,
        "title": "Public Park Maintenance Issue",
        "description": "The park in downtown is not maintained properly; benches and walking paths are in disrepair.",
        "location": "Downtown",
        "category": "Maintenance"
    },
    {
        "id": 6,
        "title": "Noise Pollution from Construction",
        "description": "Construction noise early in the morning is disturbing residents in my area.",
        "location": "East Side",
        "category": "Noise"
    },
    {
        "id": 7,
        "title": "Unclean Public Restroom",
        "description": "The public restroom near the bus station is unhygienic and requires cleaning.",
        "location": "Central Station",
        "category": "Sanitation"
    },
    {
        "id": 8,
        "title": "Road Blockage Due to Fallen Tree",
        "description": "A fallen tree is blocking the main road, causing severe traffic congestion.",
        "location": "Uptown",
        "category": "Road"
    },
    {
        "id": 9,
        "title": "Illegal Dumping in Neighborhood",
        "description": "There has been illegal dumping of waste in my neighborhood, creating health hazards.",
        "location": "Suburbs",
        "category": "Sanitation"
    },
    {
        "id": 10,
        "title": "Bus Service Delay",
        "description": "Bus service on route 42 is frequently delayed, affecting commuters' schedules.",
        "location": "City Center",
        "category": "Transport"
    },
    {
        "id": 11,
        "title": "Frequent Electricity Outages",
        "description": "The residential area experiences frequent electricity outages that disrupt daily life.",
        "location": "South District",
        "category": "Electricity"
    },
    {
        "id": 12,
        "title": "Broken Sewage Pipe",
        "description": "A broken sewage pipe is causing foul smells and posing health risks in the area.",
        "location": "Industrial Area",
        "category": "Infrastructure"
    },
    {
        "id": 13,
        "title": "Unavailability of Medical Facilities",
        "description": "The local clinic often runs out of essential medicines, affecting patient care.",
        "location": "North District",
        "category": "Health"
    },
    {
        "id": 14,
        "title": "Overgrown Trees Hindering Road Visibility",
        "description": "Overgrown trees on the roadside are blocking street lights and reducing visibility at night.",
        "location": "West End",
        "category": "Maintenance"
    }
]

# ------------------------------
# Prepare the TF-IDF Vectorizer on Existing Grievances
# ------------------------------
def compute_tfidf(corpus):
    vectorizer = TfidfVectorizer(stop_words='english')
    tfidf_matrix = vectorizer.fit_transform(corpus)
    return vectorizer, tfidf_matrix

corpus = [g["description"] for g in grievances]
vectorizer, tfidf_matrix = compute_tfidf(corpus)

# ------------------------------
# API Route for Grievance Submission
# ------------------------------
@app.route("/api/grievance", methods=["POST"])
def process_grievance():
    data = request.get_json()
    grievance_text = data.get("grievance_text", "")
    
    # Transform the submitted text
    new_vector = vectorizer.transform([grievance_text])
    similarities = cosine_similarity(new_vector, tfidf_matrix).flatten()
    
    # Define threshold for similar grievances
    threshold = 0.3
    similar_indices = [i for i, sim in enumerate(similarities) if sim >= threshold]
    similar_grievances = [grievances[i] for i in similar_indices]
    
    return jsonify({
        "new_text": grievance_text,
        "similar_grievances": similar_grievances,
        "similarity_scores": similarities.tolist()
    })

if __name__ == "__main__":
    app.run(debug=True)