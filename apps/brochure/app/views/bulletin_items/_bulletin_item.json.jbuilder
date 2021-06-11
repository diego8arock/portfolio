json.extract! bulletin_item, :id, :title, :body, :picture, :date, :is_active, :created_at, :updated_at
json.url bulletin_item_url(bulletin_item, format: :json)
