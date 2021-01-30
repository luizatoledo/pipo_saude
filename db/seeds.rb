# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'json'
# Deleting existing structures
Employee.delete_all
Contract.delete_all
Client.delete_all
Partner.delete_all

# Creating Partners on DB
norte_europa = Partner.create!(name: 'Plano de Saúde NorteEuropa',
                               registration_data: [
                                { "label": 'Nome', "name": 'name', "type": 'text'}.to_json,
                                { "label": 'CPF', "name": 'cpf',  "type": 'text'}.to_json,
                                { "label": 'Data de Admissão', "name": 'admission_date', "type": 'date'}.to_json,
                                { "label": 'E-mail', "name": 'email',  "type": 'text'}.to_json
                              ])
pampulha = Partner.create!(name: 'Plano de Saúde Pampulha Intermédica',
                           registration_data: [
                            { "label": 'Nome', "name": 'name', "type": 'text'}.to_json,
                            { "label": 'CPF', "name": 'cpf',  "type": 'text'}.to_json,
                            { "label": 'Data de Admissão', "name": 'admission_date', "type": 'date'}.to_json,
                            { "label": 'Endereço', "name": 'address',  "type": 'text'}.to_json
                            ])
dental = Partner.create!(name: 'Plano odontológico Dental Sorriso',
                         registration_data: [
                          { "label": 'Nome', "name": 'name', "type": 'text'}.to_json,
                          { "label": 'CPF', "name": 'cpf',  "type": 'text'}.to_json,
                          { "label": 'Peso (kg)', "name": 'weight',  "type": 'number'}.to_json,
                          { "label": 'Altura (cm)', "name": 'height',  "type": 'number'}.to_json
                          ])
mental = Partner.create!(name: 'Plano de Saúde Mente Sã, Corpo São',
                         registration_data: [
                          { "label": 'CPF', "name": 'cpf',  "type": 'text'}.to_json,
                          { "label": 'Horas Meditadas nos Últimos 7 dias', "name": 'meditation_hours', "type": 'number'}.to_json
                          ])

# Creating Clients on DB
acme = Client.create!(name: 'Acme Co')
bank = Client.create!(name: 'Tio Patinhas Bank')

# Creating Contracts connecting Partners and Clients
c1 = Contract.new
c1.partner = norte_europa
c1.client = acme
c1.save!

c2 = Contract.new
c2.partner = dental
c2.client = acme
c2.save!

c3 = Contract.new
c3.partner = pampulha
c3.client = bank
c3.save!

c4 = Contract.new
c4.partner = dental
c4.client = bank
c4.save!

c5 = Contract.new
c5.partner = mental
c5.client = bank
c5.save!




