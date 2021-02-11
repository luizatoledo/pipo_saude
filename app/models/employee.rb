class Employee < ApplicationRecord
  belongs_to :client
  validates :name, length: { in: 2..50 }, allow_blank: true
  validates :name, format: { with: /\A[a-zA-Z\sà-úÀ-ÚçÇêÊ]+\z/i, message: "Apenas letras são aceitas no nome" }, allow_blank: true
  validates :cpf, presence: true
  validates :cpf, uniqueness: { message: "Esse CPF já existe"}
  validates :cpf, format: { with: /\A[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}\z/, message: "Informe um CPF com 11 dígitos"}
  validates :email, format: { with: /\A[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}(\.[A-Z]{2,4})?\z/i }, allow_blank: true
  validates :email, uniqueness: { message: "Esse e-mail já existe"}
  validates :height, numericality: { only_integer: true, greater_than: 0, message: "Informe um valor numérico positivo sem casas decimais" }, allow_blank: true
  validates :weight, numericality: { greater_than: 0, less_than: 300, message: "Verifique o valor inserido" }, allow_blank: true
  validates :meditation_hours, numericality: { greater_than: 0, less_than_or_equal_to: 168, message: "Informe um valor menor que o total de horas nos últimos 7 dias"}, allow_blank: true
end
