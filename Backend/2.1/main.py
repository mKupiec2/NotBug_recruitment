from flask import Flask, request, render_template
from dotenv import load_dotenv
import psycopg2
import os

load_dotenv()

app = Flask(__name__)

connection = psycopg2.connect(
  host=os.environ.get("DB_URL"), 
  database=os.environ.get("DB_NAME"),
  user=os.environ.get("DB_USERNAME"),
  password=os.environ.get("DB_PASSWORD"),
)

INSERT_TODO_ITEM = "INSERT INTO todo (title, content) VALUES (%s, %s) RETURNING id"
SELECT_ALL_ITEMS = "SELECT * FROM todo;"
SELECT_TODO_ITEM = "SELECT * FROM todo WHERE id=%s"
DELETE_TODO_ITEM = "DELETE FROM todo WHERE id=%s RETURNING id"


@app.post("/api/items")
def create_item():
  data = request.json
  title = data["title"]
  content = data["content"]

  with connection:
    with connection.cursor() as cursor:
      cursor.execute(INSERT_TODO_ITEM, (title, content, ))
      try:
        id = cursor.fetchone()[0]
      except:
        return {"message": f"Failed creating item {title}"}, 404
  
  return {"message": f"Successfully created item {id}"}, 201


def formatItem(item):
  return {
    "id": item[0],
    "title": item[1],
    "content": item[2],
    "status": item[3]
  }


@app.get("/api/items")
def all_items():
  with connection:
    with connection.cursor() as cursor:
      cursor.execute(SELECT_ALL_ITEMS)
      items = cursor.fetchall()
  
  return {"items": [formatItem(item) for item in items]}, 201 


@app.get("/api/items/<int:id>")
def get_item(id):
  with connection:
    with connection.cursor() as cursor:
      cursor.execute(SELECT_TODO_ITEM, (id, ))
      item = cursor.fetchone()
      if item == None:
        return {"message": f"No item with id {id}"}, 404

  return formatItem(item), 201


@app.delete("/api/items/<int:id>")
def delete_item(id):
  with connection:
    with connection.cursor() as cursor:
      cursor.execute(DELETE_TODO_ITEM, (id, ))
      try:
        removed_id = cursor.fetchone()[0]
      except:
        return {"message": f"No item with id {id}"}, 404

  return {"message": f"Successfully removed item with id {removed_id}"}, 201


@app.put("/api/items/<int:id>")
def edit_item(id):
  data = request.json

  with connection:
    with connection.cursor() as cursor:
      query = ""
      for key in data.keys():
        query += f"{key}='{data[key]}', "
      cursor.execute(f"UPDATE todo SET {query.rstrip(', ')} WHERE id={id} RETURNING id")
      try:
        edited_id = cursor.fetchone()[0]
      except:
        return {"message": f"No item with id {id}"}, 404
  
  return {"message": f"Successfully updated item with id {edited_id}"}, 201


app.run()