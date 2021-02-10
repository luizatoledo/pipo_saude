require 'test_helper'

class Api::V1::EmployeesControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
  end

  test "index response should be JSON" do 
    get :index
    assert_equal 'application/json; charset=utf-8', response.content_type
  end

  test "index should display employees from database" do
    # setting one employee to test database
    client = Client.create(name:'test client')
    employee = Employee.new(name:'test employee', email:'test@email.com', cpf:'404.086.460-39')
    employee.client = client
    employee.save
    
    # testing response to match information created in test database
    get :index
    employees = JSON.parse(response.body)
    assert_equal employee.id, employees[0]["attributes"]["id"]
    assert_equal employee.cpf, employees[0]["attributes"]["cpf"]
    assert_equal employee.client.id, employees[0]["attributes"]["client_id"]
  end 

  test "should create employee" do
    client = Client.create(name:'test client')
    
    # by creating a new instance of Employee, the difference of the count from the actual number should be 1, default to assert_difference
    assert_difference('Employee.count') do
      post :create, params: { employee: {name: 'test employee', email:'test@email.com', cpf:'404.086.460-39', client_id: client.id}}, as: :json
    end
   
    # response status should be 200 and content type should be JSON
    assert_response :success
    assert_equal 'application/json; charset=utf-8', response.content_type
  end

end
