from locust import HttpUser, task, between
import random

# Simulasi database dalam memori untuk keperluan pengujian
items_db = []

class ItemUser(HttpUser):
    wait_time = between(1, 2)  # Waktu tunggu anta task

    @task
    def create_item(self):
        item_id = random.randint(1, 1000)  # Generate ID secara acak
        item_data = {
            "id": item_id,
            "name": f"Item {item_id}",
            "description": f"This is a description for item {item_id}"
        }
        response = self.client.post("/items/", json=item_data)
        # Simpan item di dalam database lokal untuk dilakukan pengujian selanjutnya
        if response.status_code == 200:
            items_db.append(item_data)

    @task
    def read_items(self):
        self.client.get("/items/")

    @task
    def read_item(self):
        if items_db:  # Pastikan ada item untuk dibaca
            item_id = random.choice(items_db)["id"]
            self.client.get(f"/items/{item_id}")

    @task
    def update_item(self):
        if items_db:  # Pastikan ada item untuk diupdate
            item_to_update = random.choice(items_db)
            updated_item_data = {
                "id": item_to_update["id"],
                "name": item_to_update["name"] + " Updated",
                "description": item_to_update["description"] + " Updated"
            }
            self.client.put(f"/items/{item_to_update['id']}", json=updated_item_data)

    @task
    def delete_item(self):
        if items_db:  # Pastikan ada item untuk dihapus
            item_to_delete = random.choice(items_db)
            # Only remove if the item is in the list
            if item_to_delete in items_db:
                self.client.delete(f"/items/{item_to_delete['id']}")
                items_db.remove(item_to_delete)  # Hapus item dari database lokal


# locust -f locustfile.py --host http://127.0.0.1:8000