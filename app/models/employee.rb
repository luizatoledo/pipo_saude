class Employee < ApplicationRecord
  belongs_to :client
  validates :cpf, presence: true
  validates :cpf, uniqueness: true
end
