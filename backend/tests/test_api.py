from fastapi.testclient import TestClient

from app.main import app


def test_read_myapi_returns_hello_world():
    client = TestClient(app)
    response = client.get("/myapi")

    assert response.status_code == 200
    assert response.json() == {"message": "hello world"}
