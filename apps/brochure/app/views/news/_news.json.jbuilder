json.extract! news, :id, :title, :body, :picture, :date, :is_active, :created_at, :updated_at
json.url news_url(news, format: :json)
