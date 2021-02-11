require 'test_helper'

class EmployeeTest < ActiveSupport::TestCase
  test "should not save employee with name containing special characters" do
    client = Client.create(name:'test client')
    employee = Employee.new(name:'00!*Teste_ Simbolos', email:'test@email.com', cpf:'404.086.460-39')
    employee.client = client
    assert !employee.save, 'Saved employee with name containing special characters'
  end
  
  test "should not save employee without CPF" do
    client = Client.create(name:'test client')
    employee = Employee.new(name:'test employee', email:'test@email.com')
    employee.client = client
    assert !employee.save, 'Saved employee without CPF'
  end

  test "should not save employee with non-unique CPF" do
    client = Client.create(name:'test client')
    employee = Employee.new(name:'test employee', email:'test@email.com', cpf:'404.086.460-39')
    employee.client = client
    employee.save
    employee2 = Employee.new(name:'test employee 2', email:'test2@email.com', cpf:'404.086.460-39')
    employee2.client = client
    assert !employee2.save, 'Saved employee with non unique CPF'
  end

  test "should not save employee with only numbers CPF" do
    client = Client.create(name:'test client')
    employee = Employee.new(name:'test employee', email:'test@email.com', cpf:'40408646039')
    employee.client = client
    assert !employee.save, 'Saved employee with only numbers CPF format'
  end

  test "should not save employee with wrong CPF number of digits" do
    client = Client.create(name:'test client')
    employee = Employee.new(name:'test employee', email:'test@email.com', cpf:'65.251.913-00')
    employee.client = client
    assert !employee.save, 'Saved employee with wrong CPF number of digits'
  end

  test "should not save employee with non-unique email" do
    client = Client.create(name:'test client')
    employee = Employee.new(name:'test employee', email:'test@email.com', cpf:'404.086.460-39')
    employee.client = client
    employee.save
    employee2 = Employee.new(name:'test employee 2', email:'test@email.com', cpf:'479.017.810-25')
    employee2.client = client
    assert !employee2.save, 'Saved employee with non unique email'
  end

  test "should not save employee with wrong email format" do
    client = Client.create(name:'test client')
    employee = Employee.new(name:'test employee', email:'test', cpf:'404.086.460-39')
    employee.client = client
    employee2 = Employee.new(name:'test employee', email:'test@test', cpf:'430.826.680-70')
    employee2.client = client
    employee3 = Employee.new(name:'test employee', email:'test@test.xxxxx', cpf:'137.475.580-03')
    employee3.client = client
    assert (!employee.save && !employee2.save && !employee3.save), 'Saved employee with wrong format email'
  end

  test "should not save employee with less than zero for weight" do
    client = Client.create(name:'test client')
    employee = Employee.new(name:'test employee', email:'test@email.com', cpf:'404.086.460-39', weight: -60)
    employee.client = client
    assert !employee.save, 'Saved employee with weight < 0'
  end

  test "should not save employee with less than zero for height" do
    client = Client.create(name:'test client')
    employee = Employee.new(name:'test employee', email:'test@email.com', cpf:'404.086.460-39', height: -60)
    employee.client = client
    assert !employee.save, 'Saved employee with height < 0'
  end

  test "should not save employee with decimal number for height" do
    client = Client.create(name:'test client')
    employee = Employee.new(name:'test employee', email:'test@email.com', cpf:'404.086.460-39', height: 1.61)
    employee.client = client
    assert !employee.save, 'Saved employee with decimal number for height'
  end

  test "should not save employee with less than zero for meditation_hours" do
    client = Client.create(name:'test client')
    employee = Employee.new(name:'test employee', email:'test@email.com', cpf:'404.086.460-39', meditation_hours: -60)
    employee.client = client
    assert !employee.save, 'Saved employee with meditation_hours < 0'
  end

  test "should not save employee with meditation_hours greater than the maximum hours in 7 days" do
    client = Client.create(name:'test client')
    employee = Employee.new(name:'test employee', email:'test@email.com', cpf:'404.086.460-39', meditation_hours: 169)
    employee.client = client
    assert !employee.save, 'Saved employee with meditation_hours  greater than the maximum hours in 7 days'
  end

end
