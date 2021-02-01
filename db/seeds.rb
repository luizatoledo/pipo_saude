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
Offer.delete_all
Client.delete_all
Benefit.delete_all
Partner.delete_all

# Creating Partners on DB
norte_europa = Partner.create!(name: 'Norte Europa')
pampulha = Partner.create!(name: 'Pampulha Intermédica')
dental = Partner.create!(name: 'Dental Sorriso')                      
mental = Partner.create!(name: 'Mente Sã, Corpo São')

# Creating Clients on DB
acme = Client.create!(name: 'Acme Co')
bank = Client.create!(name: 'Tio Patinhas Bank')

# Creating Benefits on DB
saude = Benefit.create!(name:"Plano de Saúde")
odonto = Benefit.create!(name:"Plano Odontológico")
saude_mental = Benefit.create!(name:"Plano de Saúde Mental")

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

# Creating Offers conecting Partners and Benefits
o1 = Offer.new(registration_data: [
                                    { "label": 'Nome', "name": 'name', "type": 'text'}.to_json,
                                    { "label": 'CPF', "name": 'cpf',  "type": 'text'}.to_json,
                                    { "label": 'Data de Admissão', "name": 'admission_date', "type": 'date'}.to_json,
                                    { "label": 'E-mail', "name": 'email',  "type": 'text'}.to_json
                                  ])
o1.partner = norte_europa
o1.benefit = saude
o1.name = "#{o1.benefit.name} #{o1.partner.name}"
o1.save!

o2 = Offer.new(registration_data: [
                                    { "label": 'Nome', "name": 'name', "type": 'text'}.to_json,
                                    { "label": 'CPF', "name": 'cpf',  "type": 'text'}.to_json,
                                    { "label": 'Data de Admissão', "name": 'admission_date', "type": 'date'}.to_json,
                                    { "label": 'Endereço', "name": 'address',  "type": 'text'}.to_json
                                  ])
o2.partner = pampulha
o2.benefit = saude
o2.name = "#{o2.benefit.name} #{o2.partner.name}"
o2.save!

o3 = Offer.new(registration_data: [
                                    { "label": 'Nome', "name": 'name', "type": 'text'}.to_json,
                                    { "label": 'CPF', "name": 'cpf',  "type": 'text'}.to_json,
                                    { "label": 'Peso (kg)', "name": 'weight',  "type": 'number'}.to_json,
                                    { "label": 'Altura (cm)', "name": 'height',  "type": 'number'}.to_json
                                  ])
o3.partner = dental
o3.benefit = odonto
o3.name = "#{o3.benefit.name} #{o3.partner.name}"
o3.save!

o4 = Offer.new(registration_data: [
                                    { "label": 'CPF', "name": 'cpf',  "type": 'text'}.to_json,
                                    { "label": 'Horas Meditadas nos Últimos 7 dias', "name": 'meditation_hours', "type": 'number'}.to_json
                                  ])
o4.partner = mental
o4.benefit = saude_mental
o4.name = "#{o4.benefit.name} #{o4.partner.name}"
o4.save!
