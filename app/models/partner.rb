class Partner < ApplicationRecord
  has_many :contracts, dependent: :destroy
  has_many :clients, through: :contracts, dependent: :destroy
  has_many :employees, through: :clients, dependent: :destroy
  has_many :offers, dependent: :destroy
  has_many :benefits, through: :ofers, dependent: :destroy
end
