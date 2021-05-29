# demo-react-django

## Steps to get started with this project

1. Clone the repo
2. Install requirements:
    - For Django:
      - `cd backend && pip install -r requirements.txt`
    - For React:
      - `cd frontend && npm install`
3. Migrate the migrations on Django:
      - `cd backend && python manage.py migrate`
4. Start the server:
NOTE: Both servers need to be running at the same time.
    - For Django:
      - `cd backend && python manage.py runserver`
    - For React:
      - `cd frontend && npm start`
5. Visit the server on browser at:
    - For API:
      - http://localhost:8000/
    - For Frontend:
      - http://localhost:3000/
