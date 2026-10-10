"""
Simple SQLite CRUD Server using Flask & SQLAlchemy ORM
Client Specification Match:
- Table: items (id, name, description, created_at)
- Endpoints:
    POST   /items       -> Create new item
    GET    /items       -> Get all items
    GET    /items/<id>  -> Get single item by id
    PUT    /items/<id>  -> Update item by id
    DELETE /items/<id>  -> Delete item by id
"""

from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os

app = Flask(__name__)

# Database configuration
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(BASE_DIR, 'database.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# ORM Model Definition (Single table with >3 columns)
class Item(db.Model):
    __tablename__ = 'items'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

# Create database tables automatically
with app.app_context():
    db.create_all()

# Root endpoint
@app.route('/', methods=['GET'])
def index():
    return jsonify({
        'status': 'online',
        'message': 'SQLite CRUD Server is running',
        'endpoints': {
            'POST /items': 'Create a new item',
            'GET /items': 'Get all items',
            'GET /items/<id>': 'Get item by id',
            'PUT /items/<id>': 'Update item by id',
            'DELETE /items/<id>': 'Delete item by id'
        }
    }), 200

# 1. CREATE: POST /items
@app.route('/items', methods=['POST'])
def create_item():
    data = request.get_json()
    if not data or 'name' not in data:
        return jsonify({'error': 'Name field is required'}), 400
    
    new_item = Item(
        name=data['name'],
        description=data.get('description', '')
    )
    db.session.add(new_item)
    db.session.commit()
    return jsonify({'message': 'Item created successfully', 'item': new_item.to_dict()}), 201

# 2. READ ALL: GET /items
@app.route('/items', methods=['GET'])
def get_all_items():
    items = Item.query.all()
    return jsonify([item.to_dict() for item in items]), 200

# 3. READ ONE: GET /items/<id>
@app.route('/items/<int:item_id>', methods=['GET'])
def get_item(item_id):
    item = Item.query.get(item_id)
    if not item:
        return jsonify({'error': f'Item with id {item_id} not found'}), 404
    return jsonify(item.to_dict()), 200

# 4. UPDATE: PUT /items/<id>
@app.route('/items/<int:item_id>', methods=['PUT'])
def update_item(item_id):
    item = Item.query.get(item_id)
    if not item:
        return jsonify({'error': f'Item with id {item_id} not found'}), 404
    
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided for update'}), 400
    
    if 'name' in data:
        item.name = data['name']
    if 'description' in data:
        item.description = data['description']
    
    db.session.commit()
    return jsonify({'message': 'Item updated successfully', 'item': item.to_dict()}), 200

# 5. DELETE: DELETE /items/<id>
@app.route('/items/<int:item_id>', methods=['DELETE'])
def delete_item(item_id):
    item = Item.query.get(item_id)
    if not item:
        return jsonify({'error': f'Item with id {item_id} not found'}), 404
    
    db.session.delete(item)
    db.session.commit()
    return jsonify({'message': f'Item {item_id} deleted successfully'}), 200

if __name__ == '__main__':
    print("Server running on http://127.0.0.1:5000")
    app.run(debug=True, port=5000)
