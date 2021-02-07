class Benefit < ApplicationRecord
  has_many :offers, dependent: :destroy
end
