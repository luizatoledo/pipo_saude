class Partner < ApplicationRecord
  has_many :contracts, dependent: :destroy
  has_many :clients, through: :contracts, dependent: :destroy
  has_many :employees, through: :clients, dependent: :destroy
end
