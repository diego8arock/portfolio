class BulletinItem
  include Mongoid::Document
  field :title, type: String
  field :body, type: String
  field :picture, type: String
  field :date, type: Time
  field :is_active, type: Mongoid::Boolean
  has_many :likes, dependent: :destroy
end
