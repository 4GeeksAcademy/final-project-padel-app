"""
Script to seed mock court data for testing.
Creates several courts in different locations.
"""

import sys
import os

# Add the src directory to the path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'src'))

from api.models import db, Court
from app import app

def seed_courts():
    """Create mock courts for testing"""
    
    with app.app_context():
        # Clear existing courts (optional - be careful in production!)
        print("🗑️  Clearing existing courts...")
        Court.query.delete()
        db.session.commit()
        
        # Create courts with realistic data
        courts_data = [
            {
                "name": "Padel Center Madrid",
                "address": "Calle de Alcalá, 123",
                "latitude": 40.4168,
                "longitude": -3.7038,
                "city": "Madrid",
                "type": "indoor",
                "phone": "+34 911 234 567"
            },
            {
                "name": "Club Deportivo Las Rozas",
                "address": "Avenida de Europa, 45",
                "latitude": 40.4933,
                "longitude": -3.8737,
                "city": "Las Rozas",
                "type": "outdoor",
                "phone": "+34 916 543 210"
            },
            {
                "name": "Padel Pro Barcelona",
                "address": "Passeig de Gràcia, 78",
                "latitude": 41.3851,
                "longitude": 2.1734,
                "city": "Barcelona",
                "type": "indoor",
                "phone": "+34 933 456 789"
            },
            {
                "name": "Centro Padel Valencia",
                "address": "Calle Colón, 56",
                "latitude": 39.4699,
                "longitude": -0.3763,
                "city": "Valencia",
                "type": "outdoor",
                "phone": "+34 963 789 012"
            },
            {
                "name": "Padel Club Majadahonda",
                "address": "Calle de los Pinos, 12",
                "latitude": 40.4733,
                "longitude": -3.8723,
                "city": "Majadahonda",
                "type": "indoor",
                "phone": "+34 916 345 678"
            },
            {
                "name": "Instalaciones Deportivas Pozuelo",
                "address": "Avenida Juan XXIII, 34",
                "latitude": 40.4354,
                "longitude": -3.8139,
                "city": "Pozuelo de Alarcón",
                "type": "outdoor",
                "phone": "+34 917 123 456"
            }
        ]
        
        created_count = 0
        
        for court_data in courts_data:
            court = Court(**court_data)
            db.session.add(court)
            created_count += 1
            print(f"  ✅ Created court: {court_data['name']} ({court_data['city']})")
        
        db.session.commit()
        print(f"\n🎉 Successfully created {created_count} mock courts!")
        print("\n💡 You can now run: pipenv run python seed_matches.py")

if __name__ == "__main__":
    seed_courts()
