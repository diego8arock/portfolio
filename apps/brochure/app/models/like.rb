class Like
  include Mongoid::Document
  field :ip, type: String
  belongs_to  :bulletinItem
end
