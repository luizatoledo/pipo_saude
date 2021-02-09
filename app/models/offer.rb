class Offer < ApplicationRecord
  belongs_to :benefit
  belongs_to :partner
  validates :name, presence: true
end
