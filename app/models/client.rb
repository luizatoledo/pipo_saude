class Client < ApplicationRecord
  has_many :employees, dependent: :destroy
  has_many :contracts, dependent: :destroy
  has_many :partners, through: :contracts, dependent: :destroy
end
