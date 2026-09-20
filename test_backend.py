import requests
import json

BASE_URL = "http://127.0.0.1:8000/api/documents/"

def test_endpoints():
    print("--- 1. Testing GET /api/documents/ ---")
    r = requests.get(BASE_URL)
    print("Status:", r.status_code)
    print("Response:", r.json())
    print()

    print("--- 2. Testing POST /api/documents/upload/ ---")
    with open("test_contract_v1.pdf", "rb") as f:
        files = {"file": f}
        data = {"title": "Master Services Agreement v1"}
        r = requests.post(BASE_URL + "upload/", files=files, data=data)
    print("Status:", r.status_code)
    doc1 = r.json()
    print("Uploaded Doc 1 ID:", doc1.get("id"))
    print("Extracted raw_text snippet:", doc1.get("raw_text", "")[:100])
    print()

    print("--- 3. Testing POST /api/documents/upload/ (Doc 2) ---")
    with open("test_contract_v2.pdf", "rb") as f:
        files = {"file": f}
        data = {"title": "Master Services Agreement v2"}
        r = requests.post(BASE_URL + "upload/", files=files, data=data)
    print("Status:", r.status_code)
    doc2 = r.json()
    print("Uploaded Doc 2 ID:", doc2.get("id"))
    print()

    print(f"--- 4. Testing POST /api/documents/{doc1['id']}/ask/ ---")
    payload = {"question": "What is the termination period?"}
    r = requests.post(f"{BASE_URL}{doc1['id']}/ask/", json=payload)
    print("Status:", r.status_code)
    print("Ask Response:", json.dumps(r.json(), indent=2))
    print()

    print("--- 5. Testing POST /api/documents/compare/ ---")
    payload = {"doc1_id": doc1["id"], "doc2_id": doc2["id"]}
    r = requests.post(BASE_URL + "compare/", json=payload)
    print("Status:", r.status_code)
    print("Compare Response:", json.dumps(r.json(), indent=2))
    print()

if __name__ == "__main__":
    test_endpoints()
